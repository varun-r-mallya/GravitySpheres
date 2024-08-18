import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const TemporalForceDirectedGraph = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const width = 800;
    const height = 600;
    const centerX = width / 2;
    const centerY = height / 2;
    const minNodes = 30;

    let nodes = Array.from({ length: minNodes }, (_, i) => ({ id: i + 1, group: Math.floor(Math.random() * 5) + 1 }));
    let links = nodes.slice(1).map(node => ({ source: 1, target: node.id }));

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(30))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(centerX, centerY))
      .force('gravity', d3.forceRadial(0, centerX, centerY).strength(0.1));

    let link = svg.append('g')
      .attr('class', 'links')
      .selectAll('line');

    let node = svg.append('g')
      .attr('class', 'nodes')
      .selectAll('circle');

    const updateGraph = () => {
      link = link.data(links, d => `${d.source.id}-${d.target.id}`);
      link.exit().remove();
      link = link.enter().append('line')
        .attr('stroke', '#999')
        .attr('stroke-opacity', 0.6)
        .attr('stroke-width', 2)
        .merge(link);

      node = node.data(nodes, d => d.id);
      node.exit().remove();
      node = node.enter().append('circle')
        .attr('r', 5)
        .attr('fill', d => d3.schemeCategory10[d.group % 10])
        .call(d3.drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended))
        .merge(node);

      simulation.nodes(nodes);
      simulation.force('link').links(links);
      simulation.alpha(1).restart();
    };

    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
    });

    const addRandomNode = () => {
      const newId = nodes.length + 1;
      const newNode = { id: newId, group: Math.floor(Math.random() * 5) + 1 };
      nodes.push(newNode);

      const targetNode = nodes[Math.floor(Math.random() * (nodes.length - 1))];
      links.push({ source: newId, target: targetNode.id });

      updateGraph();
    };

    const breakRandomLink = () => {
      if (links.length > minNodes) {
        const indexToRemove = Math.floor(Math.random() * links.length);
        links.splice(indexToRemove, 1);

        // Check if the graph is still connected
        const connectedNodes = new Set();
        const dfs = (nodeId) => {
          connectedNodes.add(nodeId);
          links.forEach(link => {
            if (link.source.id === nodeId && !connectedNodes.has(link.target.id)) {
              dfs(link.target.id);
            } else if (link.target.id === nodeId && !connectedNodes.has(link.source.id)) {
              dfs(link.source.id);
            }
          });
        };
        dfs(1);

        if (connectedNodes.size < nodes.length) {
          // If the graph is disconnected, add a new link to reconnect it
          const disconnectedNode = nodes.find(node => !connectedNodes.has(node.id));
          const connectedNode = nodes[Math.floor(Math.random() * connectedNodes.size)];
          links.push({ source: disconnectedNode.id, target: connectedNode.id });
        }

        updateGraph();
      }
    };

    updateGraph();

    const interval = setInterval(() => {
      if (Math.random() < 0.7 || nodes.length < minNodes) {
        addRandomNode();
      } else {
        breakRandomLink();
      }
    }, 100);

    // Cleanup
    return () => {
      clearInterval(interval);
      simulation.stop();
    };
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default TemporalForceDirectedGraph;