import React from "react";
import TemporalForceDirectedGraph from "./TemporalForceDirectedGraph.jsx";
import "./BlogHeading.css";

const BlogHeading = () => {
  return (
    <section className="BlogHeading">
      <div className="inner">
        <h1>
          <span className="top">
            A Comprehensive Visual Guide to{" "}
            <span className="bottom">Graph Traversal Algorithms</span>
          </span>
        </h1>
      </div>
      <div className="chart">
        <TemporalForceDirectedGraph />
      </div>
    </section>
  );
};

export default BlogHeading;