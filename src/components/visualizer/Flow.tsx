import { useState, useCallback, useEffect, useMemo } from "react";
import { ReactFlow, Controls, Background } from "@xyflow/react";
import {
  ReactFlowProvider,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
  useNodesInitialized,
  getNodesBounds,
  getViewportForBounds,
} from "@xyflow/react";

import { toPng } from "html-to-image";

import "@xyflow/react/dist/style.css";
import Dagre from "@dagrejs/dagre";
import CustomEdge from "./CustomEdge";
import CustomNode from "./CustomNode";

import { GrPowerReset } from "react-icons/gr";
import { RiDownloadLine } from "react-icons/ri";

import { downloadImage } from "@/lib/utils";

function Flow({ flowData, isLoading }: { flowData: any; isLoading: boolean }) {
  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-full w-full">
          <div className="flex items-center justify-center animate-gradient bg-gradient-to-r from-gray-300 via-gray-500 to-gray-800 bg-clip-text text-transparent text-base">
            {/* <Loader2 className="w-4 h-4 animate-spin mr-2 text-gray-400" /> */}
            <p>Generating Flow</p>
            <div className="dots w-12"></div>
          </div>
        </div>
      ) : flowData ? (
        <RenderedFlow flowData={flowData} />
      ) : (
        <div className="flex items-center justify-center h-full w-full">
          <div className="flex items-center justify-center animate-gradient bg-gradient-to-r from-gray-300 via-gray-500 to-gray-800 bg-clip-text text-transparent text-base">
            {/* <Loader2 className="w-4 h-4 animate-spin mr-2 text-gray-400" /> */}
            <p>Generating Flow</p>
            <div className="dots w-12"></div>
          </div>
        </div>
      )}
    </>
  );
}

const RenderedFlow = ({ flowData }: { flowData: any }) => {
  console.log("flowData", flowData);
  const [nodes, setNodes] = useState(flowData["nodes"]);
  const [edges, setEdges] = useState(flowData["edges"]);

  return (
    <ReactFlowProvider>
      <LayoutFlow initialNodes={nodes} initialEdges={edges} />
    </ReactFlowProvider>
  );
};

const getLayoutedElements = (nodes: any, edges: any, options: any) => {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: options.direction });

  edges.forEach((edge: any) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node: any) =>
    g.setNode(node.id, {
      ...node,
      width: node.measured?.width || 0,
      height: node.measured?.height || 0,
    })
  );

  Dagre.layout(g);

  return {
    nodes: nodes.map((node: any) => {
      const position = g.node(node.id);
      const x = position.x - (node.measured?.width || 0) / 2;
      const y = position.y - (node.measured?.height || 0) / 2;

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};

const LayoutFlow = ({
  initialNodes,
  initialEdges,
}: {
  initialNodes: any;
  initialEdges: any;
}) => {
  const { fitView, getNodes } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const nodesInitialized = useNodesInitialized();
  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);
  const connectionLineStyle = { stroke: "#ffffff" };
  const imageWidth = 3840; // 3840, 1024
  const imageHeight = 2160; // 2160, 768
  const fitViewOptions = {
    padding: 0.2,
  };
  const proOptions = { hideAttribution: true };

  const edgeTypes = {
    custom: CustomEdge,
  };

  const layoutElements = (direction: string) => {
    const layouted = getLayoutedElements(nodes, edges, { direction });

    setNodes([...layouted.nodes]);
    setEdges([...layouted.edges]);
  };

  const layoutElementsWithFitView = (direction: string) => {
    const layouted = getLayoutedElements(nodes, edges, { direction });

    setNodes([...layouted.nodes]);
    setEdges([...layouted.edges]);

    window.requestAnimationFrame(() => {
      fitView(fitViewOptions);
    });
  };

  useEffect(() => {
    layoutElementsWithFitView("LR");
  }, [nodesInitialized]);

  const onLayout = useCallback(
    (direction: string) => {
      layoutElements(direction);
    },
    [nodes, edges, fitView]
  );

  // Use onNodesChange to detect when nodes are updated or changed
  const handleNodesChange = useCallback(
    (changes) => {
      onNodesChange(changes);
    },
    [onNodesChange]
  );

  const downloadImageClicked = () => {
    const nodesBounds = getNodesBounds(getNodes());
    const viewport = getViewportForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,
      2.5,
      0.2
    );

    toPng(document.querySelector(".react-flow__viewport"), {
      backgroundColor: "#0F0F14",
      width: imageWidth,
      height: imageHeight,
      style: {
        width: imageWidth,
        height: imageHeight,
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
      },
    }).then(downloadImage);
  };

  const resetView = () => {
    fitView(fitViewOptions);
  };

  const defaultEdgeOptions = {
    animated: true,
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={handleNodesChange}
      onEdgesChange={onEdgesChange}
      edgeTypes={edgeTypes}
      nodeTypes={nodeTypes}
      fitView
      colorMode="dark"
      connectionLineStyle={connectionLineStyle}
      attributionPosition="bottom-left"
      defaultEdgeOptions={defaultEdgeOptions}
      proOptions={proOptions}
    >
      <Background />
      <Controls />
      <Panel position="top-right" className="flex gap-2">
        <button
          className="bg-dark-secondary text-gray-400 hover:text-white border border-gray-600 hover:bg-dark-navbar hover:border-gray-400 text-sm font-semibold tracking-wide py-2 px-4 rounded-md transition-all duration-250"
          onClick={() => onLayout("LR")}
        >
          <div className="flex items-center gap-2">
            <GrPowerReset className="w-4 h-4" />
            <p>Reset</p>
          </div>
        </button>
        <button
          className="bg-dark-secondary text-gray-400 hover:text-white border border-gray-600 hover:bg-dark-navbar hover:border-gray-400 text-sm font-semibold tracking-wide py-2 px-4 rounded-md transition-all duration-250"
          onClick={downloadImageClicked}
        >
          <div className="flex items-center gap-2">
            <RiDownloadLine className="w-4 h-4" />
            <p>Download</p>
          </div>
        </button>
      </Panel>
    </ReactFlow>
  );
};

export default Flow;
