import React, { useState } from "react";
import "./App.css";
import GraphView from "./Graphview";

function App() {
  let GraphData = {
    nodes: [
      { id: "Node 1", size: 10, color: "#ff0000" },
      { id: "Node 2", size: 10, color: "#00ff00" },
      { id: "Node 3", size: 10, color: "#0000ff" },
    ],
    links: [
      { source: "Node 1", target: "Node 2", color: "#ffffff" },
      { source: "Node 2", target: "Node 3", color: "#ffffff" },
      { source: "Node 3", target: "Node 1", color: "#ffffff" },
    ],
  };
  const [graphData, setGraphData] = useState(GraphData);

  const handleAddNode = () => {
    const newNode = { id: `Node ${graphData.nodes.length + 1}`, size: 10, color: "#FFFFFF" };
    const newLink = { source: graphData.nodes[0].id, target: newNode.id, color: "#FFFFFF" };
    const updatedGraphData = {
      nodes: [...graphData.nodes, newNode],
      links: [...graphData.links, newLink],
    };
    setGraphData(updatedGraphData);
  };

  return (
    <div className="App">
      <GraphView data={graphData} />
      <button onClick={handleAddNode}>Add Node</button>
    </div>
  );
}

export default App;
