// import React, { useRef, useState, useEffect } from "react";
// import ForceGraph3D from "react-force-graph-3d";
// import * as d3 from "d3-force";
// import * as THREE from 'three';

// const GraphView = ({ data }) => {
//   const fgRef = useRef();
//   const [hoveredNode, setHoveredNode] = useState(null);

//   useEffect(() => {
//     const fg = fgRef.current;

//     fg.d3Force("link").distance(60); // Increased distance for better spacing
//     fg.d3Force("charge").strength(-200); // Reduced repulsion for more cohesive nodes
//     fg.d3Force("radial", d3.forceRadial(80)); // Adjusted radial gravity for a tighter cluster
//     fg.d3Force("center").x(0).y(0).z(0); // Center the graph
//     fg.d3Force("collide", d3.forceCollide().radius(6)); // Slightly increased radius to reduce overlap
//   }, []);

//   return (
//     <div style={{ position: 'relative' }}>
//       <ForceGraph3D
//         ref={fgRef}
//         graphData={data}
//         linkWidth={link => link.value || 2} // Set link width
//         linkColor={link => link.color || 'gray'} // Set link color
//         nodeAutoColorBy="id"
//         nodeThreeObject={node => {
//           const radius = node.size || 10;
//           const geometry = new THREE.SphereGeometry(radius, 16, 16);
//           const material = new THREE.MeshBasicMaterial({ color: node.color });
//           return new THREE.Mesh(geometry, material);
//         }}
//         linkDirectionalParticles={7} // Reduced particles for a cleaner look
//         linkDirectionalParticleSpeed={(d) => d.value * 0.002} // Increased speed for smoother motion
//         onNodeHover={node => setHoveredNode(node)} // Update hovered node state
//         onNodeClick={node => console.log('Node clicked:', node)} // For debugging purposes
//       />
//       {hoveredNode && (
//         <div style={{
//           position: 'absolute',
//           left: '10px',
//           top: '10px',
//           backgroundColor: 'white',
//           border: '1px solid black',
//           padding: '5px',
//           borderRadius: '4px',
//           boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
//           color: 'black',
//           zIndex: 1000,
//           pointerEvents: 'none'
//         }}>
//           <strong>Node ID:</strong> {hoveredNode.id}
//         </div>
//       )}
//     </div>
//   );
// };

// export default GraphView;

import React, { useRef, useState, useEffect } from "react";
import { ForceGraph2D } from "react-force-graph"; // Adjusted import statement
import * as d3 from "d3-force";

const GraphView = ({ data }) => {
  const fgRef = useRef();
  const [hoveredNode, setHoveredNode] = useState(null);

  useEffect(() => {
    const fg = fgRef.current;

    fg.d3Force("link").distance(60); // Adjusted distance for better spacing
    fg.d3Force("charge").strength(-200); // Adjusted repulsion for more cohesive nodes
    fg.d3Force("collide", d3.forceCollide().radius(6)); // Adjusted radius to reduce overlap
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <ForceGraph2D
        ref={fgRef}
        graphData={data}
        linkWidth={link => link.value || 2} // Set link width
        linkColor={link => link.color || 'gray'} // Set link color
        nodeAutoColorBy="id"
        nodeCanvasObject={(node, ctx) => {
          const radius = node.size || 10;
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
          ctx.fillStyle = node.color || 'blue';
          ctx.fill();
          ctx.strokeStyle = 'black';
          ctx.stroke();
        }}
        linkDirectionalParticles={0} // No particles in 2D
        onNodeHover={node => setHoveredNode(node)} // Update hovered node state
        onNodeClick={node => console.log('Node clicked:', node)} // For debugging purposes
      />
      {hoveredNode && (
        <div style={{
          position: 'absolute',
          left: '10px',
          top: '10px',
          backgroundColor: 'white',
          border: '1px solid black',
          padding: '5px',
          borderRadius: '4px',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
          color: 'black',
          zIndex: 1000,
          pointerEvents: 'none'
        }}>
          <strong>Node ID:</strong> {hoveredNode.id}
        </div>
      )}
    </div>
  );
};

export default GraphView;
