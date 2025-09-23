export default function VHSGrain() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        background: 
        `
          repeating-radial-gradient
          (circle at center,
            rgba(255,255,255,0.12) 0px,
            rgba(255,255,255,0.12) 2px,
            transparent 2px,
            transparent 4px
          )
        `,
        animation: "grainMove 0.6s steps(6) infinite",
        mixBlendMode: "overlay",
        opacity: 0.6, // bump this up for more intensity
      }}
    />

    
  );
}