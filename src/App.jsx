import React, { useEffect, useState } from "react";
import "./App.css";
import GraphView from "./Graphview";

function GraphDisplay(GraphData) {
  const [graphData, setGraphData] = useState(GraphData);
  const [clickedNode, setClickedNode] = useState(null);
  const [node1, setNode1] = useState(null);
  const [node2, setNode2] = useState(null);
  const [linkRemove, setLinkRemove] = useState(null);
  const [directed, setDirected] = useState(false);
  const [doubleClickedNode, setDoubleClickedNode] = useState(false);
  const [weighted, setWeighted] = useState(false);
  const [weight, setWeight] = useState(1);

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
    if (node1 && node2) {
      const newLink = {
        source: node1.id,
        target: node2.id,
        id: `Link (${graphData.links.length + 1})`,
        directed: directed,
        weight: weight,
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
        id: `[${graphData.nodes.length + 1}]`,
        size: 10,
      };
      const newLink = {
        source: x ? x.id : graphData.nodes[0].id,
        target: newNode.id,
        id: `Link ${graphData.links.length + 1}`,
        directed: directed,
        weight: weight,
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
      id: `[${graphData.nodes.length + 1}]`,
      size: 10,
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
      <div className="CanvasArea">
        <GraphView
          data={graphData}
          clicker={setClickedNode}
          linkRemove={setLinkRemove}
        />
        <div
          className="buttondiv"
        >
          <button
            onClick={clickHandler}
            className={`controls ${doubleClickedNode ? 'on' : ''}`}
          >
            Connect Nodes
          </button>
          <button
            onClick={() => setDirected(!directed)}
            className={`controls ${directed ? 'on' : ''}`}
          >
            Directed
          </button>
          <button
            onClick={() => setWeighted(!weighted)}
            className={`controls ${weighted ? 'on' : ''}`}
          >
            Weighted
          </button>
          <button
            onClick={orphanNodeAdd}
            className="controls"
          >
            Orphan Node
          </button>
          {(node1 || node2) && (
            <h4>
              {" "}
              Edge from: {node1?.id} {node2 && `to:`} {node2?.id}{" "}
            </h4>
          )}
          <div style={{ display: "flex" }}>
            {node1 && node2 && <button onClick={handleAddNode}>Connect</button>}
            {weighted && node1 && node2 && (
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight((e.target.value))}
                style={{ marginBottom: "10px" }}
              />
            )}
            {(node1 || node2) && (
              <button onClick={resetState} style={{ marginLeft: "10px" }}>
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


function App() {
  let GraphData = {
    nodes: [
      { id: "[1]"},
      { id: "[2]"},
      { id: "[3]"},
    ],
    links: [
      {
        source: "[1]",
        target: "[2]",
        id: "Link 1",
        directed: false,
        weight: 1,
      },
      {
        source: "[2]",
        target: "[3]",
        id: "Link 2",
        directed: false,
        weight: 1,
      },
      {
        source: "[3]",
        target: "[1]",
        id: "Link 3",
        directed: false,
        weight: 1,
      },
    ],
  };

  return GraphDisplay(GraphData);
}

export default App;
