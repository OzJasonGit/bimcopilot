


export default function VHSGrain() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        background: `
          repeating-radial-gradient(circle at center,
            rgba(255,255,255,0.05) 0px,
            rgba(255,255,255,0.05) 1px,
            transparent 1px,
            transparent 2px
          )
        `,
        animation: "grainMove 1s steps(4) infinite",
        mixBlendMode: "overlay",
      }}
    />
  );
}