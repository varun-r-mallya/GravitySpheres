import React, { useRef, useState, useEffect } from "react";
import { ForceGraph2D } from "react-force-graph";
import * as d3 from "d3-force";

const notVisitedColor = "#fceaff";
const visitedColor = "#a78fc3";
const hoverColor = "#a6f5d3";
const linkColor = "#64baaa";

const GraphView = ({ data, clicker, linkRemove }) => {
  const fgRef = useRef();
  const [hoveredNode, setHoveredNode] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    const fg = fgRef.current;

    // Set link distance based on the link weight
    fg.d3Force("link").distance((link) => {
      const minDistance = 50;
      const maxDistance = 200;
      const distance = minDistance * (link.weight || 1);
      return Math.min(maxDistance, distance);
    });

    fg.d3Force("charge").strength(-100);
    fg.d3Force("collide", d3.forceCollide().radius(10));
  }, [data]);

  return (
    <div style={{ position: "relative" }}>
      <ForceGraph2D
        ref={fgRef}
        graphData={data}
        nodeCanvasObject={(node, ctx) => {
          const baseRadius = 10;
          const hoverRadius = 12; // Increase radius on hover

          const radius = hoveredNode && hoveredNode.id === node.id ? hoverRadius : baseRadius;

          ctx.beginPath();
          ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
          ctx.fillStyle = notVisitedColor;
          ctx.fill();

          // Display label if node is hovered
          if (hoveredNode && hoveredNode.id === node.id) {
            ctx.fillStyle = hoverColor;
            ctx.fill();

            ctx.font = "10px Arial";
            ctx.fillStyle = "#7444db";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(node.id, node.x, node.y);
          }
        }}
        nodePointerAreaPaint={(node, color, ctx) => {
          const detectionRadius = 12; // Increase hover detection radius

          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(node.x, node.y, detectionRadius, 0, 2 * Math.PI, false);
          ctx.fill();
        }}
        linkCanvasObject={(link, ctx) => {
          ctx.beginPath();
          ctx.moveTo(link.source.x, link.source.y);
          ctx.lineTo(link.target.x, link.target.y);
          ctx.strokeStyle = linkColor;
          ctx.lineWidth = 1;
          ctx.stroke();

          if (link.directed) {
            const angle = Math.atan2(
              link.target.y - link.source.y,
              link.target.x - link.source.x
            );
            const offset = 10;

            const arrowX = link.target.x - offset * Math.cos(angle);
            const arrowY = link.target.y - offset * Math.sin(angle);

            ctx.beginPath();
            const arrowWidth = 9;
            const arrowHeight = arrowWidth;

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
        linkDirectionalParticles={0}
        onLinkClick={(link) => {
          linkRemove(link);
        }}
        onLinkHover={(link) => setHoveredLink(link)}
        onNodeHover={(node) => setHoveredNode(node)}
        onNodeClick={(node) => {
          clicker(node);
        }}
      />
    </div>
  );
};

export default GraphView;
