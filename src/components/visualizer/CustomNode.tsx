import { Handle, Position } from "@xyflow/react";
import Image from "next/image";
import { AwsIcons } from "./AwsIcons";

export default function CustomNode({ data }: { data: any }) {
  console.log("data", data);

  const Icon = AwsIcons[data["service"]];

  console.log("Icon", Icon);
  return (
    <>
      <div className="flex bg-dark text-gray-300 items-center justify-center px-4 py-2 border border-gray-700 rounded-sm text-xs shadow hover:shadow-lg hover:text-white transition-all duration-250">
        <Image
          src={Icon}
          width={20}
          height={20}
          alt="AWS Lambda Icon"
          className="w-5 h-5 p-1 mr-1"
        />
        <p>{data.label}</p>
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </>
  );
}
