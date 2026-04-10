"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, X, CheckCircle } from "lucide-react";

interface CoverImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
}

export default function CoverImageUploader({ value, onChange }: CoverImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(value);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) { setError("Only image files allowed."); return; }
    if (file.size > 10 * 1024 * 1024) { setError("Max file size is 10MB."); return; }

    setError("");
    setUploading(true);

    // Show local preview immediately
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/blog/cover-upload", { method: "POST", body: formData });
    const json = await res.json();

    URL.revokeObjectURL(localUrl);

    if (!res.ok || !json.url) {
      setError(json.error ?? "Upload failed.");
      setPreview(value);
      setUploading(false);
      return;
    }

    setPreview(json.url);
    onChange(json.url);
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

  const handleClear = () => {
    setPreview("");
    onChange("");
    setError("");
  };

  return (
    <div className="space-y-2">
      {/* Preview */}
      {preview ? (
        <div className="relative group rounded-xl overflow-hidden bg-[#1a1f26] border border-[#F8F8FF]/[0.08] aspect-video">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Cover preview" className="w-full h-full object-cover" />
          {uploading && (
            <div className="absolute inset-0 bg-[#0f1419]/70 flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-[#E5E4E2] animate-spin" />
            </div>
          )}
          {!uploading && (
            <div className="absolute inset-0 bg-[#0f1419]/0 group-hover:bg-[#0f1419]/50 transition-all flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="px-3 py-1.5 bg-[#E5E4E2] text-[#0f1419] text-xs font-semibold rounded-lg font-body"
              >
                Replace
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="px-3 py-1.5 bg-red-500/20 text-red-400 text-xs font-semibold rounded-lg font-body"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Drop zone */
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-[#F8F8FF]/[0.08] bg-[#151a21] hover:border-[#E5E4E2]/20 hover:bg-[#1a1f26] transition-all cursor-pointer aspect-video"
        >
          {uploading ? (
            <Loader2 className="w-6 h-6 text-[#B8C5D6]/40 animate-spin" />
          ) : (
            <>
              <ImagePlus className="w-7 h-7 text-[#B8C5D6]/30" />
              <div className="text-center">
                <p className="text-sm text-[#B8C5D6]/50 font-body">Click or drag to upload cover image</p>
                <p className="text-xs text-[#B8C5D6]/25 font-body mt-1">PNG, JPG, WEBP · Max 10MB</p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Manual URL input */}
      <div className="flex gap-2">
        <input
          type="url"
          value={value}
          onChange={(e) => { onChange(e.target.value); setPreview(e.target.value); }}
          placeholder="Or paste an image URL..."
          className="flex-1 bg-[#151a21] border border-[#F8F8FF]/[0.08] rounded-lg px-3 py-2 text-[#F8F8FF] text-sm font-body placeholder:text-[#B8C5D6]/20 focus:outline-none focus:border-[#E5E4E2]/30 transition-colors"
        />
        {value && (
          <button type="button" onClick={handleClear} className="p-2 text-[#B8C5D6]/30 hover:text-red-400 transition-colors">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-400 font-body flex items-center gap-1.5">
          <X className="w-3 h-3" /> {error}
        </p>
      )}

      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />
    </div>
  );
}
