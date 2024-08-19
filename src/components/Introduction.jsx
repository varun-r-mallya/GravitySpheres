import React from "react";
import "./Introduction.css";

const Introduction = () => {
  return (
    <div className="introduction">
      <h2 className="title">Introduction</h2>

      <p>
        {" "}
        Students often struggle with understanding complex graph algorithms due
        to their abstract nature and the difficulty of visualizing the
        underlying processes. Concepts like traversal, shortest paths, and graph
        connectivity involve intricate operations that can be challenging to
        grasp without a concrete representation. Textbook explanations and
        pseudocode can be overwhelming, leaving students confused about how
        algorithms work step-by-step and how they manipulate graph structures.
        This confusion can hinder their ability to debug their own
        implementations and fully comprehend the theoretical foundations of
        these algorithms.
      </p>

      <p>
        {" "}
        A graph algorithms visualizer addresses these challenges by providing a
        dynamic, visual representation of algorithms in action. By graphically
        displaying the traversal of nodes, edge weights, and intermediate
        states, these tools make the abstract operations of algorithms more
        tangible and easier to follow. Students can interact with the visualizer
        to observe how algorithms evolve in real time, which clarifies the
        impact of each operation and aids in debugging. This visual approach not
        only enhances comprehension but also makes learning more engaging and
        intuitive, helping students grasp complex concepts and apply them
        effectively.
      </p>

      <div className="instruction">
        <h2 style={{ fontWeight: "400" , textAlign: "center"}}>Create your own graph</h2>
        <ul>
          <li>
            <strong>Directed/Undirected:</strong> toggle the directed button to
            decide wether the next edge created would be directed or undirected.
          </li>
          <li>
            <strong>Weighted/Unweighted:</strong> toggle the weighted button to
            decide wether the next edge created would be weighted or unweighted.
            (By default the weight is considered 1).
          </li>
          <li>
            Use the <strong>Orphan node</strong> button to create orphan nodes.
            Alternatively you can <strong>click on an existing node</strong> to
            create a new node connected to that node.
          </li>
          <li>
            <strong>Click on an edge</strong> to delete it.
          </li>
          <li>
            You can drag around nodes and play with them, you can also drag
            around the graph and increase / decrease its size
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Introduction;
