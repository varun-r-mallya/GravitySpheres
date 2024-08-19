import React from "react";
import BlogHeading from "../components/BlogHeading";
import Introduction from "../components/Introduction";
import GraphVisualise from "./GraphVisualise";
import PseudoCode from "../components/PseudoCode";

const BlogContainer = () => {
  return (
    <>
      <BlogHeading />
      <Introduction />
      <GraphVisualise
        id={1}
        name={"main-visualisation"}
        title={"Graph Traversal Algorithm"}
        selectableAlgorithms={["DFS", "BFS", "TSC", "AP", "BA"]}
        exampleGraph={"directedGraph"}
      />
      <PseudoCode />
    </>
  );
};

export default BlogContainer;
