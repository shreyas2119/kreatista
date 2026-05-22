"use client";

import dynamic from "next/dynamic";

const MeshGradient = dynamic(
  () => import("@paper-design/shaders-react").then((m) => m.MeshGradient),
  { ssr: false }
);

export default function ServicesShaderBg() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
      <MeshGradient
        className="w-full h-full"
        colors={["#0f1419", "#1a1f26", "#151a21", "#E5E4E2"]}
        speed={1.2}
      />
    </div>
  );
}
