import React, { useRef, useState, useEffect } from "react";
import { ForceGraph2D } from "react-force-graph"; // Adjusted import statement
import * as d3 from "d3-force";

const GraphView = ({ data, clicker, linkRemove }) => {
  const fgRef = useRef();
  const [hoveredNode, setHoveredNode] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    const fg = fgRef.current;

    fg.d3Force("link").distance(60); // Adjusted distance for better spacing
    fg.d3Force("charge").strength(-100); // Adjusted repulsion for more cohesive nodes
    fg.d3Force("collide", d3.forceCollide().radius(10)); // Adjusted radius to reduce overlap
  }, []);

  
  return (
    <div style={{ position: "relative" }}>
      <ForceGraph2D
        ref={fgRef}
        graphData={data}
        linkWidth={(link) => link.value || 2} // Set link width
        linkColor={(link) => link.color || "gray"} // Set link color
        nodeAutoColorBy="id"
        nodeCanvasObject={(node, ctx) => {
          const radius = node.size || 10;
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
          ctx.fillStyle = node.color || "blue";
          ctx.fill();
          ctx.strokeStyle = "black";
          ctx.stroke();
          // Draw node label inside the node only if it is hovered
          if (hoveredNode && hoveredNode.id === node.id) {
            ctx.font = "10px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(node.id, node.x, node.y);
          }
        }}
        linkCanvasObject={(link, ctx) => {
          //draw the link here
          ctx.beginPath();
          ctx.moveTo(link.source.x, link.source.y);
          ctx.lineTo(link.target.x, link.target.y);
          ctx.strokeStyle = link.color || "gray";
          ctx.stroke();

          if (hoveredLink && hoveredLink.id === link.id) {
            // console.log("hovered link", hoveredLink);
            const start = link.source;
            const end = link.target;
            const middleX = (start.x + end.x) / 2;
            const middleY = (start.y + end.y) / 2;
            ctx.font = "0.5rem Monospace";
            ctx.fillStyle = "yellow";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(link.id, middleX, middleY);
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
