import React, { Component } from "react";
import PropTypes from "prop-types";
import d3 from "d3";
import _ from "lodash";
import cx from "classnames";

import "./GraphHeading.css";

export default class GraphHeading extends Component {
  static propTypes = {
    title: PropTypes.string,
    nodes: PropTypes.array.isRequired,
    algorithms: PropTypes.array.isRequired,
    selectedAlgorithm: PropTypes.string,
    exampleGraphs: PropTypes.object.isRequired,
    selectedExampleGraph: PropTypes.string,
    running: PropTypes.bool.isRequired,
    startNodeId: PropTypes.number.isRequired,
    setStartNodeId: PropTypes.func.isRequired,
    onChangeAlgorithm: PropTypes.func.isRequired,
    onChangeGraph: PropTypes.func.isRequired,
    onClickRun: PropTypes.func.isRequired,
    onClickClear: PropTypes.func.isRequired,
  };

  render() {
    let {
      title,
      nodes,
      algorithms,
      selectedAlgorithm,
      exampleGraphs,
      selectedExampleGraph,
      running,
      startNodeId,
      setStartNodeId,
      onChangeAlgorithm,
      onChangeGraph,
      onClickRun,
      onClickClear,
    } = this.props;

    return (
      <div className="GraphHeading">
        <h1>{title}</h1>
        <form className="heading-form">
          <label className="algorithm">
            Algorithm{" "}
            <select
              className="algorithm"
              value={selectedAlgorithm}
              onChange={onChangeAlgorithm}
            >
              {algorithms.map((algo) => (
                <option value={algo} key={algo}>
                  {algo}
                </option>
              ))}
            </select>
          </label>

          <label className="example-graph">
            Example Graph{" "}
            <select
              className="example-graph"
              value={selectedExampleGraph}
              onChange={onChangeGraph}
            >
              {exampleGraphs.map((graph) => (
                <option value={graph} key={graph}>
                  {graph}
                </option>
              ))}
            </select>
          </label>

          <label className="start-node">
            Start Node{" "}
            <select
              className="start-node"
              value={startNodeId}
              onChange={setStartNodeId}
            >
              {nodes.map((node) => (
                <option value={node.id} key={node.id}>
                  {node.id}
                </option>
              ))}
            </select>
          </label>

          <button
            className={cx("form-button", {
              disabled: running,
              "button-primary": !running,
            })}
            onClick={onClickRun}
          >
            {running ? "Running" : "Run"}
          </button>

          <button
            className={cx("form-button", {
              disabled: running,
              "button-secondary": !running,
            })}
            onClick={onClickClear}
          >
            Clear
          </button>
        </form>
      </div>
    );
  }
}