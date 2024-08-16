import React, { useEffect, useState } from "react";
import "./App.css";
import GraphView from "./Graphview";

function App() {
  let GraphData = {
    nodes: [
      { id: "Node 1", color: "#ff0000" },
      { id: "Node 2", color: "#00ff00" },
      { id: "Node 3", color: "#0000ff" },
    ],
    links: [
      { source: "Node 1", target: "Node 2", color: "#ffffff", id: "Link 1" },
      { source: "Node 2", target: "Node 3", color: "#ffffff", id: "Link 2" },
      { source: "Node 3", target: "Node 1", color: "#ffffff", id: "Link 3" },
    ],
  };
  const [graphData, setGraphData] = useState(GraphData);
  const [clickedNode, setClickedNode] = useState(null);
  const [node1, setNode1] = useState(null);
  const [node2, setNode2] = useState(null);
  const [doubleClickedNode, setDoubleClickedNode] = useState(false);

  const connectHandle = () => {
    console.log(node1, node2, "logged");
    if (node1 && node2) {
      const newLink = {
        source: node1.id,
        target: node2.id,
        color: "#8301DF",
      };
      const updatedGraphData = {
        nodes: graphData.nodes,
        links: [...graphData.links, newLink],
      };
      setGraphData(updatedGraphData);
    }
    setNode1(null);
    setNode2(null);
  };
  const handleAddNode = (x) => {
    if (!doubleClickedNode) {
      const newNode = {
        id: `Node ${graphData.nodes.length + 1}`,
        size: 10,
        color: "#FFFFFF",
      };
      const newLink = {
        source: x ? x.id : graphData.nodes[0].id,
        target: newNode.id,
        color: "#8301DF",
      };
      const updatedGraphData = {
        nodes: [...graphData.nodes, newNode],
        links: [...graphData.links, newLink],
      };
      setGraphData(updatedGraphData);
    } else {
      if (node1 === null) {
        setNode1(x);
      } else {
        setNode2(x);
        if (node1 === node2) {
          setNode1(null);
          setNode2(null);
        }
        if (node1 && node2) {
          connectHandle();
        }
      }
    }
  };

  const clickHandler = () => {
    setDoubleClickedNode(!doubleClickedNode);
  };

  useEffect(() => {
    let x = clickedNode;
    setClickedNode(null);
    if (x != null) handleAddNode(x);
  }, [clickedNode]);

  return (
    <div className="App">
      <GraphView data={graphData} clicker={setClickedNode} />
      <button onClick={clickHandler}>Connect</button>
    </div>
  );
}

export default App;
