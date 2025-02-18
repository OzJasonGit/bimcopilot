"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";

const Chart_9 = ({ width = 600, height = 600 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    const color = d3.scaleOrdinal(d3.schemeTableau10);
    const nodes = d3.range(50).map(() => ({
      x: Math.random() * width - width / 2,
      y: Math.random() * height - height / 2,
      r: Math.random() * 10 + 10,
      group: Math.floor(Math.random() * 50),
    }));

    // Central repelling force & collisions
    const simulation = d3
      .forceSimulation(nodes)
      .alphaTarget(0.3) // Stay hot
      .velocityDecay(0.1) // Low friction
      .force("x", d3.forceX().strength(0.01))
      .force("y", d3.forceY().strength(0.01))
      .force("collide", d3.forceCollide().radius((d) => d.r + 1).iterations(3))
      .force("charge", d3.forceManyBody().strength((d, i) => (i === 0 ? -width * 2 / 3 : 0))) // Repelling center
      .on("tick", ticked);

    function ticked() {
      context.clearRect(0, 0, width, height);
      context.save();
      context.translate(width / 2, height / 2);

      nodes.forEach((d) => {
        context.beginPath();
        context.arc(d.x, d.y, d.r, 0, 2 * Math.PI);
        context.fillStyle = color(d.group);
        context.fill();
      });

      context.restore();
    }

    function pointerMoved(event) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left - width / 2;
      const y = event.clientY - rect.top - height / 2;
      nodes[0].fx = x;
      nodes[0].fy = y;
    }

    canvas.addEventListener("pointermove", pointerMoved);
    return () => {
      simulation.stop();
      canvas.removeEventListener("pointermove", pointerMoved);
    };
  }, [width, height]);

  return <canvas ref={canvasRef} width={width} height={height} style={{ display: "block" }} />;
};

export default Chart_9;
