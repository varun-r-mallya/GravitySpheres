import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";

// Simulation will be stopped after 8 sec
const simulationTimeout = new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, 25000);
});

const temporalForceDirectedGraph = ({
  svgId = "temporal-force-directed-graph",
  width = 928,
  height = 680,
  invalidation = simulationTimeout,
} = {}) => {
  const svg = d3
    .create("svg")
    .attr("id", svgId)
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .attr("style", "max-width: 100%; height: auto;");

  let link = svg
    .append("g")
    .attr("stroke", "#64baaa")
    .attr("stroke-opacity", 0.6)
    .selectAll("line");

  let node = svg
    .append("g")
    .attr("stroke", "#fceaff")
    .attr("stroke-width", 1.5)
    .selectAll("circle");

  const ticked = () => {
    node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);
  };

  const update = ({ nodes, links }) => {
    node = node
      .data(nodes, (d) => d.id)
      .join("circle")
      .attr("r", 5)
      .attr("fill", (d) => d.group);

    link = link
      .data(links, (d) => `${d.source.id}-${d.target.id}`)
      .join("line");

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(30)
      )
      .force("charge", d3.forceManyBody().strength(-50))
      .force("center", d3.forceCenter(0, 0))
      .on("tick", ticked);

    invalidation.then(() => simulation.stop());
  };

  return Object.assign(svg.node(), { update });
};

const TemporalForceDirectedGraph = () => {
  const [data, setData] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const rawData = await d3.text("data.json");
      const parsedData = JSON.parse(rawData, (key, value) =>
        key === "start" || key === "end" ? new Date(value) : value
      );
      setData(parsedData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      const chart = temporalForceDirectedGraph();

      const contains = ({ start, end }, time) => start <= time && time < end;

      const times = d3
        .scaleTime()
        .domain([
          d3.min(data.nodes, (d) => d.start),
          d3.max(data.nodes, (d) => d.end),
        ])
        .ticks(1000)
        .filter((time) => data.nodes.some((d) => contains(d, time)));

      console.log(times.length);

      const update = (index) => {
        const time = times[index];
        const nodes = data.nodes.filter((d) => contains(d, time));
        const links = data.links.filter((d) => contains(d, time));
        chart.update({ nodes, links });
      };

      chartRef.current.appendChild(chart);

      let index = 0;
      const interval = setInterval(() => {
        update(index);
        index = (index + 1) % times.length;
      }, 100);

      console.log(index);

      // Cleanup interval on component unmount
      return () => clearInterval(interval);
    }
  }, [data]);

  return <div ref={chartRef}></div>;
};

export default TemporalForceDirectedGraph;
