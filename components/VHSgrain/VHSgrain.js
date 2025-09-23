"use client";
import { useEffect, useRef } from "react";

export default function VHSGrain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    function drawNoise() {
      const w = canvas.width;
      const h = canvas.height;
      const imgData = ctx.createImageData(w, h);
      const buffer = new Uint32Array(imgData.data.buffer);

      for (let i = 0; i < buffer.length; i++) {
        // Random grayscale pixel (0–255)
        const val = Math.random() * 255;
        buffer[i] = (255 << 24) | (val << 16) | (val << 8) | val;
      }

      ctx.putImageData(imgData, 0, 0);
    }

    let frame;
    function loop() {
      drawNoise();
      frame = requestAnimationFrame(loop);
    }

    loop();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-15 mix-blend-overlay"
    />
  );
}