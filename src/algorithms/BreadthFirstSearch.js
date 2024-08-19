import _ from "lodash";
import Promise from "bluebird";

import Queue from "../internals/Queue";
import { promiseWhile } from "./utils";

/**
 * Depth First Search Algorithm Class
 */
export default class BreadthFirstSearch {
  /**
   * @constructor
   *
   * @param  {Array} nodes     An array of NodeModel objects
   * @param  {React/Component} component A React Component
   * @param  {Number} pause
   */
  constructor(nodes, component, pause = 500) {
    this.nodes = nodes;
    this.component = component;
    this.queue = new Queue();
    this.visitOrder = [];
    this.explanation = [];
    this.pause = pause;
  }

  /**
   * Log a message (used for incremental updates about algorithms progress)
   *
   * @param  {String} text
   */
  log(text) {
    console.log(text);
    this.explanation.push(text);
    this.component.setState({
      explanation: _.assign([], this.explanation),
    });
  }

  /**
   * Start the search process
   *
   * @param  {NodeModel} startNode
   *
   * @return {Promise}
   */
  start(startNode) {
    if (!this.nodes || this.nodes.length === 0) {
      this.log(" | No nodes to search!");
      return Promise.reject(new Error("No Nodes to search!"));
    }
    startNode = startNode || this.nodes[0];

    this.log(` | Start at ${startNode.id}`);
    return this.search(startNode)
      .then(() => {
        this.log(" | Queue empty, BFS complete!");
        this.log(" | Search Steps");
        this.log(" | ------------");
        this.visitOrder.forEach((node, id) =>
          this.log(` | Step ${id + 1} -> Node ${node.id}`)
        );
      })
      .catch((e) => {
        this.log(e);
      });
  }

  /**
   * Update the component's state with the nodes array that
   * reflects current status of search
   *
   * @param  {NodeModel} currentNode
   *
   * @return {Promise}
   */
  updateComponent(currentNode, parentId) {
    return Promise.resolve().then(() => {
      let updateState = this.nodes.map((node) => {
        node.current = node.id === currentNode.id;
        if (parentId && node.id === currentNode.id) {
          node.visitedFrom = parentId;
        }
        return node;
      });

      this.component.setState({
        nodes: updateState,
        visitOrder: _.assign([], this.visitOrder),
      });

      return Promise.delay(this.pause);
    });
  }

  /**
   * Search a node
   *
   *  - This function triggers an update to the UI
   *  - If the node has not been visited it marks it as visited
   *  - If the node has no children or all children have been visited it will move back to parent
   *  - If the node has children that are still be visited it will move to next available child
   *
   * @param  {NodeModel} node
   *
   * @return {Promise}
   */
  search(node) {
    if (!node) {
      return;
    }

    return this.updateComponent(node).then(() => {
      if (!node.visited) {
        this.log(` | Enqueued ${node.id}`);
        this.queue.enqueue([node.id, null]);
      }

      return promiseWhile(this.queue.isNotEmpty.bind(this.queue), () => {
        let edge = this.queue.dequeue();
        let currentNode = this.nodes.find((n) => n.id === edge[0]);
        let parentId = null;
        if (!currentNode.visited) {
          parentId = edge[1];
          this.markAsVisited(currentNode);
          this.enqueueUnvisitedChildren(currentNode);
        }

        return this.updateComponent(currentNode, parentId);
      });
    });
  }

  enqueueUnvisitedChildren(parent) {
    let sortedChildren = this.sortChildren(parent);
    sortedChildren.forEach((childId) => {
      let node = this.nodes.find((n) => n.id === childId);
      if (!node.visited) {
        this.log(` | Enqueued ${node.id}`);
        this.queue.enqueue([node.id, parent.id]);
      }
    });
  }

  /**
   * Marks a Node as visited, updates the stack and output order
   *
   * @param  {NodeModel} node
   */
  markAsVisited(node) {
    this.log(` | Visit ${node.id}`);
    node.visited = true;
    this.visitOrder.push(node);
  }

  /**
   * Sorts the children of a NodeModel by natural ordering
   *
   * @param  {NodeModel} node
   *
   * @return {Array}
   */
  sortChildren(node) {
    return node.children.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
  }
}
