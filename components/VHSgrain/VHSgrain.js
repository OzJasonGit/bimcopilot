



export default function VHSGrain() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Grain layer */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            repeating-radial-gradient(circle at center,
              rgba(255,255,255,0.12) 0px,
              rgba(255,255,255,0.12) 2px,
              transparent 2px,
              transparent 4px
            )
          `,
          animation: "grainMove 0.6s steps(6) infinite",
          mixBlendMode: "overlay",
          opacity: 0.6,
        }}
      />

      {/* RGB Split - Red */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(255, 0, 0, 0.05)",
          mixBlendMode: "screen",
          transform: "translateX(-1px)",
          animation: "rgbShift 1s infinite alternate",
        }}
      />

      {/* RGB Split - Blue */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(0, 150, 255, 0.05)",
          mixBlendMode: "screen",
          transform: "translateX(1px)",
          animation: "rgbShift 1s infinite alternate-reverse",
        }}
      />
    </div>
  );
}