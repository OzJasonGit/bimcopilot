"use client";
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function OrientationCompass({ azimuth }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const size = 200;
    const radius = size / 2;

    const svg = d3
      .select(ref.current)
      .attr("width", size)
      .attr("height", size)
      .attr("viewBox", `0 0 ${size} ${size}`)
      .style("font-family", "sans-serif");

    svg.selectAll("*").remove(); // clear old drawings

    // Circle
    svg.append("circle")
      .attr("cx", radius)
      .attr("cy", radius)
      .attr("r", radius - 5)
      .attr("fill", "#f9fafb")
      .attr("stroke", "#111827")
      .attr("stroke-width", 2);

    // North arrow
    svg.append("line")
      .attr("x1", radius)
      .attr("y1", radius)
      .attr("x2", radius)
      .attr("y2", 20)
      .attr("stroke", "red")
      .attr("stroke-width", 3);

    svg.append("text")
      .attr("x", radius)
      .attr("y", 15)
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .text("N");

    // Azimuth arrow
    const angle = (azimuth - 90) * (Math.PI / 180);
    const x2 = radius + (radius - 20) * Math.cos(angle);
    const y2 = radius + (radius - 20) * Math.sin(angle);

    svg.append("line")
      .attr("x1", radius)
      .attr("y1", radius)
      .attr("x2", x2)
      .attr("y2", y2)
      .attr("stroke", "blue")
      .attr("stroke-width", 3)
      .attr("marker-end", "url(#arrow)");

    // Arrowhead
    svg.append("defs")
      .append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 0 10 10")
      .attr("refX", 5)
      .attr("refY", 5)
      .attr("markerWidth", 4)
      .attr("markerHeight", 4)
      .attr("orient", "auto-start-reverse")
      .append("path")
      .attr("d", "M 0 0 L 10 5 L 0 10 z")
      .attr("fill", "blue");
  }, [azimuth]);

  return <svg ref={ref}></svg>;
}