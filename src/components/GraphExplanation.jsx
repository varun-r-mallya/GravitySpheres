import React, { Component } from "react";
import PropTypes from "prop-types";
import "./GraphExplanation.css";

export default class GraphExplanation extends Component {
  static propTypes = {
    explanation: PropTypes.array.isRequired,
  };

  render() {
    let { explanation } = this.props;

    return (
      <div className="explanation">
        <h2>Algorithm Output</h2>
        <ul>
          {explanation.map((line, id) => (
            <li key={`line-${id}`}>{line}</li>
          ))}
        </ul>
      </div>
    );
  }
}
