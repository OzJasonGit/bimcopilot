"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";

const Chart_10 = ({ data, width = 954, height = 954 }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous content

    // Define color scale
    const color = d3.scaleOrdinal(data.children.map((d) => d.name), d3.schemeTableau10);

    // Compute treemap layout
    const root = d3.treemap()
      .tile(d3.treemapSquarify) // Alternative: d3.treemapBinary, d3.treemapDice
      .size([width, height])
      .padding(1)
      .round(true)(
        d3.hierarchy(data)
          .sum((d) => d.value)
          .sort((a, b) => b.value - a.value)
      );

    // Append groups for each leaf
    const leaf = svg
      .selectAll("g")
      .data(root.leaves())
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

    // Append colored rectangles
    leaf
      .append("rect")
      .attr("fill", (d) => {
        let parent = d;
        while (parent.depth > 1) parent = parent.parent;
        return color(parent.data.name);
      })
      .attr("fill-opacity", 0.6)
      .attr("width", (d) => d.x1 - d.x0)
      .attr("height", (d) => d.y1 - d.y0);

    // Append tooltips
    leaf.append("title").text((d) => `${d.data.name}\n${d.value.toLocaleString()}`);

    // Append text labels
    leaf
      .append("text")
      .attr("x", 4)
      .attr("y", 14)
      .attr("fill", "#000")
      .attr("font-size", "12px")
      .text((d) => d.data.name)
      .attr("clip-path", (d, i) => `url(#clip-${i})`);

  }, [data, width, height]);

  return <svg ref={svgRef} width={width} height={height} style={{ maxWidth: "100%", height: "auto" }} />;
};

export default Chart_10;
