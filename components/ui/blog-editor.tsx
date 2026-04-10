"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { ImagePlus } from "lucide-react";
import type { ICommand } from "@uiw/react-md-editor";

// Dynamically import to avoid SSR issues (editor uses browser APIs)
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[480px] bg-[#151a21] border border-[#F8F8FF]/[0.08] rounded-lg animate-pulse" />
  ),
});

interface BlogEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function BlogEditor({ value, onChange }: BlogEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Store the insert callback from the command context
  const insertFnRef = useRef<((text: string) => void) | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    if (file.size > 5 * 1024 * 1024) {
      alert("Max file size is 5MB.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/blog/upload", { method: "POST", body: formData });
    const json = await res.json();

    if (!res.ok || !json.url) {
      alert(json.error ?? "Upload failed.");
      return;
    }

    const alt = file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
    const snippet = `\n\n![${alt}](${json.url})\n\n`;

    if (insertFnRef.current) {
      insertFnRef.current(snippet);
    } else {
      onChange(value + snippet);
    }
  };

  // Custom image upload toolbar command
  const imageUploadCommand: ICommand = {
    name: "image-upload",
    keyCommand: "image-upload",
    buttonProps: { "aria-label": "Insert image", title: "Insert image" },
    icon: (
      <span className="flex items-center gap-1 text-[11px]">
        <ImagePlus size={13} />
        <span>Image</span>
      </span>
    ),
    execute: (state, api) => {
      // Store the insert function so the file input callback can use it
      insertFnRef.current = (text: string) => {
        api.replaceSelection(text);
      };
      fileInputRef.current?.click();
    },
  };

  return (
    <div data-color-mode="dark" data-lenis-prevent>
      <style>{`
        .w-md-editor {
          background: #151a21 !important;
          border: 1px solid rgba(248,248,255,0.08) !important;
          border-radius: 0.5rem !important;
          color: #F8F8FF !important;
          box-shadow: none !important;
        }
        .w-md-editor-toolbar {
          background: #1a1f26 !important;
          border-bottom: 1px solid rgba(248,248,255,0.06) !important;
          padding: 8px 12px !important;
          min-height: 48px !important;
        }
        .w-md-editor-toolbar li > button {
          color: rgba(184,197,214,0.75) !important;
          border-radius: 4px !important;
          width: 32px !important;
          height: 32px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        .w-md-editor-toolbar li > button:hover {
          color: #F8F8FF !important;
          background: rgba(248,248,255,0.08) !important;
        }
        .w-md-editor-toolbar li > button svg {
          width: 18px !important;
          height: 18px !important;
        }
        .w-md-editor-toolbar-divider {
          background: rgba(248,248,255,0.08) !important;
          height: 20px !important;
          margin: 0 4px !important;
        }
        .w-md-editor-text-pre > code,
        .w-md-editor-text-input,
        .w-md-editor-text {
          font-family: "Fira Code", "Cascadia Code", monospace !important;
          font-size: 15px !important;
          line-height: 1.85 !important;
          color: #F8F8FF !important;
          caret-color: #E5E4E2 !important;
          padding: 20px 24px !important;
        }
        .w-md-editor-preview {
          background: #151a21 !important;
          border-left: 1px solid rgba(248,248,255,0.06) !important;
        }
        .wmde-markdown {
          background: transparent !important;
          color: rgba(184,197,214,0.85) !important;
          font-size: 15px !important;
          line-height: 1.8 !important;
        }
        .wmde-markdown h1, .wmde-markdown h2, .wmde-markdown h3 {
          color: #F8F8FF !important;
          border-bottom-color: rgba(248,248,255,0.06) !important;
        }
        .wmde-markdown a { color: #E5E4E2 !important; }
        .wmde-markdown blockquote {
          border-left-color: rgba(229,228,226,0.3) !important;
          color: rgba(184,197,214,0.65) !important;
        }
        .wmde-markdown code {
          background: rgba(26,31,38,0.8) !important;
          color: #E5E4E2 !important;
        }
        .wmde-markdown pre {
          background: #1a1f26 !important;
          border: 1px solid rgba(248,248,255,0.06) !important;
        }
        .wmde-markdown img {
          border-radius: 8px;
          max-width: 100%;
        }
        .w-md-editor-fullscreen {
          z-index: 9999 !important;
        }
      `}</style>

      <MDEditor
        value={value}
        onChange={(v) => onChange(v ?? "")}
        height={680}
        commands={[
          // Re-export default commands + our custom one
          ...require("@uiw/react-md-editor").commands.getCommands(),
          require("@uiw/react-md-editor").commands.divider,
          imageUploadCommand,
        ]}
        extraCommands={[
          require("@uiw/react-md-editor").commands.codeEdit,
          require("@uiw/react-md-editor").commands.codeLive,
          require("@uiw/react-md-editor").commands.codePreview,
          require("@uiw/react-md-editor").commands.divider,
          require("@uiw/react-md-editor").commands.fullscreen,
        ]}
        preview="edit"
        visibleDragbar={false}
        textareaProps={{
          placeholder: "# Your post title\n\nWrite your content here using Markdown...\n\n## Section heading\n\nParagraph text. Use **bold** and *italic*.\n\n- Bullet point\n\n> Blockquote\n\nUse the Image button in the toolbar to insert photos anywhere.",
        }}
      />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
