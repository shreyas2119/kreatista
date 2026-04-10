"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";

interface ImageUploaderProps {
  onInsert: (markdownSnippet: string) => void;
}

export default function ImageUploader({ onInsert }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Max file size is 5MB.");
      return;
    }

    setError("");
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/blog/upload", { method: "POST", body: formData });
    const json = await res.json();

    if (!res.ok || !json.url) {
      setError(json.error ?? "Upload failed.");
      setUploading(false);
      return;
    }

    // Insert as markdown image with filename as alt text
    const alt = file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
    onInsert(`\n![${alt}](${json.url})\n`);
    setUploading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        title="Insert image"
        className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-[#B8C5D6]/70 bg-[#1a1f26] border border-[#F8F8FF]/[0.08] rounded-lg hover:text-[#E5E4E2] hover:border-[#E5E4E2]/20 transition-colors disabled:opacity-50 font-body"
      >
        {uploading ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : (
          <ImagePlus className="w-3.5 h-3.5" />
        )}
        {uploading ? "Uploading..." : "Insert Image"}
      </button>

      {error && (
        <span className="flex items-center gap-1 text-xs text-red-400 font-body">
          <X className="w-3 h-3" />
          {error}
        </span>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
