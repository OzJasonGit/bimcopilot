"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";

const Chart_8 = ({ width = 400, height = 400 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous SVG
    containerRef.current.innerHTML = "";

    // Create SVG
    const svg = select(containerRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Nodes (circles)
    const numNodes = 25;
    const nodes = d3.range(numNodes).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 10 + 5, // Random radius 5-15
    }));

    // D3 Simulation
    const simulation = d3
      .forceSimulation(nodes)
      .force("x", d3.forceX(width / 2).strength(0.05))
      .force("y", d3.forceY(height / 2).strength(0.05))
      .force("collide", d3.forceCollide().radius((d) => d.r + 2))
      .force("charge", d3.forceManyBody().strength(-10)) // Adjusted repulsion for better movement
      .force("center", d3.forceCenter(width / 2, height / 2)) // Helps keep particles in the middle
      .alpha(1) // Start simulation with high energy
      .alphaDecay(0.01) // Slower decay for longer movement
      .on("tick", ticked);

    // Create Circles
    const circles = svg
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", (d) => d.r)
      .attr("fill", (d, i) => d3.schemeTableau10[i % 10])
      .call(drag(simulation));

    function ticked() {
      circles.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    }

    // Drag behavior
    function drag(simulation) {
      return d3
        .drag()
        .on("start", (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("drag", (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        });
    }

    return () => simulation.stop();
  }, [width, height]);

  return <div ref={containerRef} />;
};

export default Chart_8;
