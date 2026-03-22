"use client"

export default function PaperShaderBackground({
  speed = 1.0,
}: {
  speed?: number
}) {
  return (
    <div className="w-full h-full absolute inset-0 bg-black">
      {/* Animated gradient background */}
      <div 
        className="w-full h-full absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(135deg, #000000 0%, #1a1a1a 25%, #8b5cf6 50%, #1a1a1a 75%, #000000 100%)",
          backgroundSize: "400% 400%",
          animation: `gradientShift ${20 / speed}s ease infinite`,
        }}
      />
      
      {/* Mesh overlay pattern */}
      <div 
        className="w-full h-full absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Lighting overlay effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/3 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: `${3 / speed}s` }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-violet-400/15 rounded-full blur-2xl animate-pulse"
          style={{ animationDuration: `${2 / speed}s`, animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-violet-600/10 rounded-full blur-xl animate-pulse"
          style={{ animationDuration: `${4 / speed}s`, animationDelay: "0.5s" }}
        />
      </div>
    </div>
  )
}
