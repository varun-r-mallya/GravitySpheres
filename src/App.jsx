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
      {
        source: "Node 1",
        target: "Node 2",
        color: "#ffffff",
        id: "Link 1",
        directed: true,
      },
      {
        source: "Node 2",
        target: "Node 3",
        color: "#ffffff",
        id: "Link 2",
        directed: true,
      },
      {
        source: "Node 3",
        target: "Node 1",
        color: "#ffffff",
        id: "Link 3",
        directed: true,
      },
    ],
  };

  const [graphData, setGraphData] = useState(GraphData);
  const [clickedNode, setClickedNode] = useState(null);
  const [node1, setNode1] = useState(null);
  const [node2, setNode2] = useState(null);
  const [linkRemove, setLinkRemove] = useState(null);
  const [directed, setDirected] = useState(true);
  const [doubleClickedNode, setDoubleClickedNode] = useState(false);

  useEffect(() => {
    let x = clickedNode;
    setClickedNode(null);
    if (x != null) handleAddNode(x);
  }, [clickedNode]);

  useEffect(() => {
    let x = linkRemove;
    setLinkRemove(null);
    if (x != null) {
      let newLinks = graphData.links.filter((link) => link.id !== x.id);
      setGraphData({ nodes: graphData.nodes, links: newLinks });
    }
  }, [linkRemove]);

  const connectHandle = () => {
    console.log(node1, node2, "logged");
    if (node1 && node2) {
      const newLink = {
        source: node1.id,
        target: node2.id,
        color: "#8301DF",
        id: `Link ${node1.id} to ${node2.id}`,
        directed: directed,
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
        color: "#56ABDE",
      };
      const newLink = {
        source: x ? x.id : graphData.nodes[0].id,
        target: newNode.id,
        color: "#8301DF",
        id: `Link ${graphData.links.length + 1}`,
        directed: directed,
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
        if (node1.id != x.id) {
          setNode2(x);
          if (node1 && node2) {
            connectHandle();
          }
        }
      }
    }
  };

  const orphanNodeAdd = () => {
    const newNode = {
      id: `Node ${graphData.nodes.length + 1}`,
      size: 10,
      color: "#56ABDE",
    };
    const updatedGraphData = {
      nodes: [...graphData.nodes, newNode],
      links: graphData.links,
    };
    setGraphData(updatedGraphData);
  };

  const clickHandler = () => {
    setNode1(null);
    setNode2(null);
    setDoubleClickedNode(!doubleClickedNode);
  };
  const resetState = () => {
    setNode1(null);
    setNode2(null);
  };

  return (
    <div className="App">
      <GraphView
        data={graphData}
        clicker={setClickedNode}
        linkRemove={setLinkRemove}
      />
      <div
        className="buttondiv"
        style={{ display: "flex", flexDirection: "column"}}
      >
        <button
          onClick={clickHandler}
          style={{ backgroundColor: doubleClickedNode ? "#00ff00" : "#ff0000", marginBottom: "10px" }}
        >
          Connect Nodes
        </button>
        <button
          onClick={directed ? () => setDirected(false) : () => setDirected(true)}
          style={{ backgroundColor: directed ? "#00ff00" : "#ff0000", marginBottom: "10px" }}
        >
          Directed
        </button>
        <button onClick={orphanNodeAdd} style={{ marginBottom: "10px" }}>Orphan Node</button>
        {(node1 || node2) && (
          <h4>
            {" "}
            Selected: {node1 && node1.id} {node2 && `and`} {node2 && node2.id}{" "}
          </h4>
        )}
        <div style={{ display: "flex" }}>
          {node1 && node2 && <button onClick={handleAddNode}>Connect</button>}
          {(node1 || node2) && <button onClick={resetState} style={{ marginLeft: "10px" }}>Cancel</button>}
        </div>
      </div>
    </div>
  );
}

export default App;
