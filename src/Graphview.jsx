import React, { useRef, useState, useEffect } from "react";
import { ForceGraph2D } from "react-force-graph"; // Adjusted import statement
import * as d3 from "d3-force";

function minimum(a, b) {
  return a < b ? a : b;
}

const notVisitedColor = "#fceaff";
const visitedColor = "#a78fc3";
const hoverColor = "#7b49cc";
const linkColor = "#64baaa";

const GraphView = ({ data, clicker, linkRemove }) => {
  const fgRef = useRef();
  const [hoveredNode, setHoveredNode] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    const fg = fgRef.current;

    fg.d3Force("link").distance(100); // Adjusted distance for better spacing
    fg.d3Force("charge").strength(-100); // Adjusted repulsion for more cohesive nodes
    fg.d3Force("collide", d3.forceCollide().radius(10)); // Adjusted radius to reduce overlap
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <ForceGraph2D
        ref={fgRef}
        graphData={data}
        nodeCanvasObject={(node, ctx) => {
          const radius = 10;
          const hoverRadius = radius * 1.5; // Increased hover area radius

          // Draw the larger circle for hover detection
          ctx.beginPath();
          ctx.arc(node.x, node.y, hoverRadius, 0, 2 * Math.PI, false);
          ctx.strokeStyle = "rgba(0,0,0,0)"; // Transparent stroke for hover detection
          ctx.lineWidth = 1; // Set line width to ensure detection
          ctx.stroke();

          // Draw the actual node
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
          ctx.fillStyle = notVisitedColor;
          ctx.fill();
          // Draw node label inside the node only if it is hovered
          if (hoveredNode && hoveredNode.id === node.id) {
            // Change node style
            ctx.fillStyle = hoverColor;
            ctx.fill();

            ctx.font = "10px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(node.id, node.x, node.y - hoverRadius);
          }
        }}
        linkCanvasObject={(link, ctx) => {
          ctx.beginPath();
          ctx.moveTo(link.source.x, link.source.y);
          ctx.lineTo(link.target.x, link.target.y);
          ctx.strokeStyle = linkColor;
          ctx.lineWidth = 1; // Set individual link width
          ctx.stroke();

          // Check if the link is directed
          if (link.directed) {
            const angle = Math.atan2(
              link.target.y - link.source.y,
              link.target.x - link.source.x
            );
            const offset = 10; // Move arrowhead back by this distance

            // Calculate new target coordinates for arrowhead
            const arrowX = link.target.x - offset * Math.cos(angle);
            const arrowY = link.target.y - offset * Math.sin(angle);

            // Draw an arrowhead
            ctx.beginPath();
            const arrowWidth = 9; // Set individual link width
            const arrowHeight = arrowWidth; // Calculate arrowhead height based on link width

            ctx.moveTo(arrowX, arrowY);
            ctx.lineTo(
              arrowX - arrowHeight * Math.cos(angle - Math.PI / 6),
              arrowY - arrowHeight * Math.sin(angle - Math.PI / 6)
            );
            ctx.lineTo(
              arrowX - arrowHeight * Math.cos(angle + Math.PI / 6),
              arrowY - arrowHeight * Math.sin(angle + Math.PI / 6)
            );
            ctx.lineTo(arrowX, arrowY);
            ctx.lineTo(
              arrowX - arrowHeight * Math.cos(angle - Math.PI / 6),
              arrowY - arrowHeight * Math.sin(angle - Math.PI / 6)
            );
            ctx.fillStyle = linkColor;
            ctx.fill();
          }

          if (hoveredLink && hoveredLink.id === link.id) {
            const start = link.source;
            const end = link.target;
            const middleX = (start.x + end.x) / 2;
            const middleY = (start.y + end.y) / 2;
            ctx.font = "0.5rem Monospace";
            ctx.fillStyle = "offwhite";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("(" + link.weight + ")", middleX, middleY);
          }
        }}
        linkDirectionalParticles={0} // No particles in 2D
        onLinkClick={(link) => {
          linkRemove(link);
        }}
        onLinkHover={(link) => setHoveredLink(link)} // Update hovered link state
        onNodeHover={(node) => setHoveredNode(node)} // Update hovered node state
        onNodeClick={(node) => {
          clicker(node);
        }}
      />
    </div>
  );
};

export default GraphView;
