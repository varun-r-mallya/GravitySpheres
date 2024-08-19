import React, { useState } from "react";
import "./PseudoCode.css";

const DFSCode = `
function dfs( graph, node )
  stack = new Stack()
  search(node)

  function search( node )
    if ( !node )
      return

    if ( !node.visited )
      stack.push( node )
      node.visited = true

    if ( graph.nodeHasUnvisitedChildren( node ) )
      search( graph.nextUnvisitedChildOf( node ) )
    else
      search( stack.pop() )`;

const BFSCode = `
function bfs( graph, node )
  stack = new Queue()
  queue.enqueue( node )

  while (queue.notEmpty())
    currentNode = queue.dequeue()

    if (!currentNode.visited)
      currentNode.visited = true

      while ( child = graph.nextUnvisitedChildOf( node ) )
        queue.enqueue( child )`;

const TSCCode = `
function tarjan-scc( graph )
  stack = new Stack()
  visitIndex = 0
  componentIndex = 0

  for ( node in graph )
    if( !v.visitIndex )
      search( node )

  function search( node )
    node.visitIndex = visitIndex
    node.lowLink = visitIndex
    node.onStack = true

    stack.push( node )
    visitIndex = visitIndex + 1

    for ( child in graph.childOf( node ) )
      if ( !child.visitIndex )
        search( child )
        node.lowLink = min( node.lowLink, child.lowLink )
      else if ( child.onStack )
        node.lowLink = min( node.lowLink, child.visitIndex )

    if (node.lowLink == node.visitIndex)
      node.componentIndex = componentIndex
      componentIndex = componentIndex + 1

      do
        member = stack.pop()
        member.onStack = false
        member.componentIndex = node.componentIndex
      while(node !== member)`;

const APSCode = `
function aps( graph, node )
  stack = new Stack()
  visitIndex = 0

  search( node )

  function search( node )
    node.visitIndex = visitIndex
    node.lowLink = visitIndex
    node.childVisitCount = 0

    visitIndex = visitIndex + 1

    for ( child in graph.childOf( node ) )
      if ( !child.visitIndex )
        node.childVisitCount = node.childVisitCount + 1
        child.parent = node
        search( child )

        node.lowLink = min( node.lowLink, child.lowLink )

        if ( !node.parent and node.childVisitCount > 1 )
          node.articulationPoint = true

        if ( node.parent and child.lowLink >= node.visitIndex )
          node.articulationPoint = true

      else if ( child != node.parent )
        node.lowLink = min( node.lowLink, child.visitIndex )`;

const ALGOS = [
  { name: "DFS", code: DFSCode },
  { name: "BFS", code: BFSCode },
  { name: "TCS", code: TSCCode },
  { name: "APS", code: APSCode },
];

const PseudoCode = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="pseudocode">
      <div className="tabs">
        {ALGOS.map((algo, index) => (
          <button
            key={index}
            onClick={() => setSelectedTab(index)}
            className={selectedTab === index ? "active" : ""}
          >
            {algo.name}
          </button>
        ))}
      </div>
      <div className="code-space">
        <pre>{ALGOS[selectedTab].code}</pre>
      </div>
    </div>
  );
};

export default PseudoCode;
