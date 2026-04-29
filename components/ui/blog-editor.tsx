"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, Eye, EyeOff, Maximize2 } from "lucide-react";
import MarkdownRenderer from "@/components/ui/markdown-renderer";

interface BlogEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function BlogEditor({ value, onChange }: BlogEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [preview, setPreview] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const insertAtCursor = (snippet: string) => {
    const ta = textareaRef.current;
    if (!ta) { onChange(value + snippet); return; }
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const next = value.slice(0, start) + snippet + value.slice(end);
    onChange(next);
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(start + snippet.length, start + snippet.length);
    }, 0);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    if (file.size > 5 * 1024 * 1024) { setUploadError("Max 5MB"); return; }
    setUploading(true);
    setUploadError("");
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/blog/upload", { method: "POST", body: formData });
    const json = await res.json();
    setUploading(false);
    if (!res.ok || !json.url) { setUploadError(json.error ?? "Upload failed"); return; }
    const alt = file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
    insertAtCursor(`\n\n![${alt}](${json.url})\n\n`);
  };

  // Toolbar actions
  const wrap = (before: string, after: string, placeholder: string) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = value.slice(start, end) || placeholder;
    insertAtCursor(before + selected + after);
  };

  const tools = [
    { label: "B",  title: "Bold",          action: () => wrap("**", "**", "bold text"),    cls: "font-bold" },
    { label: "I",  title: "Italic",         action: () => wrap("*", "*", "italic text"),    cls: "italic" },
    { label: "H2", title: "Heading 2",      action: () => insertAtCursor("\n## "),           cls: "" },
    { label: "H3", title: "Heading 3",      action: () => insertAtCursor("\n### "),          cls: "" },
    { label: "—",  title: "Divider",        action: () => insertAtCursor("\n\n---\n\n"),     cls: "" },
    { label: "• ", title: "Bullet list",    action: () => insertAtCursor("\n- "),            cls: "" },
    { label: "1.", title: "Numbered list",  action: () => insertAtCursor("\n1. "),           cls: "" },
    { label: '" ', title: "Blockquote",     action: () => insertAtCursor("\n> "),            cls: "" },
    { label: "</>",title: "Code",           action: () => wrap("`", "`", "code"),            cls: "font-mono text-[11px]" },
  ];

  const editorContent = (
    <div className={`flex flex-col ${fullscreen ? "fixed inset-0 z-[9999] bg-[#0f1419] p-4" : ""}`} style={fullscreen ? { height: "100dvh" } : {}}>
      {/* Toolbar */}
      <div className="flex items-center gap-1 flex-wrap px-3 py-2 bg-[#1a1f26] border border-[#F8F8FF]/[0.08] rounded-t-lg border-b-0">
        {tools.map((t) => (
          <button
            key={t.title}
            type="button"
            title={t.title}
            onClick={t.action}
            className={`px-2 py-1 text-xs text-[#B8C5D6]/60 hover:text-[#F8F8FF] hover:bg-[#F8F8FF]/[0.06] rounded transition-colors font-mono cursor-pointer ${t.cls}`}
          >
            {t.label}
          </button>
        ))}

        <div className="w-px h-4 bg-[#F8F8FF]/[0.08] mx-1" />

        {/* Image upload */}
        <button
          type="button"
          title="Insert image"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-1.5 px-2 py-1 text-xs text-[#B8C5D6]/60 hover:text-[#F8F8FF] hover:bg-[#F8F8FF]/[0.06] rounded transition-colors cursor-pointer disabled:opacity-40"
        >
          {uploading ? <Loader2 className="w-3 h-3 animate-spin" /> : <ImagePlus className="w-3 h-3" />}
          Image
        </button>

        {uploadError && <span className="text-xs text-red-400 ml-1">{uploadError}</span>}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Preview toggle */}
        <button
          type="button"
          title={preview ? "Hide preview" : "Show preview"}
          onClick={() => setPreview((p) => !p)}
          className="inline-flex items-center gap-1.5 px-2 py-1 text-xs text-[#B8C5D6]/60 hover:text-[#F8F8FF] hover:bg-[#F8F8FF]/[0.06] rounded transition-colors cursor-pointer"
        >
          {preview ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
          {preview ? "Hide preview" : "Preview"}
        </button>

        <button
          type="button"
          title={fullscreen ? "Exit fullscreen" : "Fullscreen"}
          onClick={() => setFullscreen((f) => !f)}
          className="px-2 py-1 text-xs text-[#B8C5D6]/60 hover:text-[#F8F8FF] hover:bg-[#F8F8FF]/[0.06] rounded transition-colors cursor-pointer"
        >
          <Maximize2 className="w-3 h-3" />
        </button>
      </div>

      {/* Editor + Preview */}
      <div className={`flex border border-[#F8F8FF]/[0.08] rounded-b-lg overflow-hidden ${fullscreen ? "flex-1 min-h-0" : "h-[600px]"}`}>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          data-lenis-prevent
          placeholder={`# Your post title\n\nWrite your content here using Markdown...\n\n## Section heading\n\nParagraph text. Use **bold** and *italic*.\n\n- Bullet point\n\n> Blockquote\n\nUse the Image button above to insert photos anywhere.`}
          className={`bg-[#151a21] text-[#F8F8FF] text-[14px] font-mono leading-relaxed resize-none focus:outline-none p-5 placeholder:text-[#B8C5D6]/20 overflow-y-auto ${
            preview ? "w-1/2 border-r border-[#F8F8FF]/[0.06]" : "w-full"
          } h-full`}
          spellCheck={false}
        />
        {preview && (
          <div
            data-lenis-prevent
            className="w-1/2 bg-[#151a21] overflow-y-auto p-6 h-full"
          >
            {value ? (
              <MarkdownRenderer content={value} />
            ) : (
              <p className="text-[#B8C5D6]/20 text-sm font-body italic">Nothing to preview yet.</p>
            )}
          </div>
        )}
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
    </div>
  );

  return editorContent;
}
