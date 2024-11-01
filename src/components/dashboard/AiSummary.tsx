import { SparklesIcon } from "lucide-react";

export const AiSummary = ({ summary }: { summary: string[] }) => {
  return (
    <div className="mb-4">
      <p className="text-md font-bold mb-4 flex items-center gap-2">
        <SparklesIcon className="h-4 w-4" />
        AI Summary
      </p>
      <div className="flex flex-col gap-2">
        <ul className="list-disc list-inside text-xs">
          {summary.map((item, index) => (
            <li key={index} className="mb-3">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
