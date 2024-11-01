import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BellRingIcon, GripHorizontal, TrashIcon } from "lucide-react";
import { useDrag, useDrop } from "react-dnd";
import * as React from "react";
import { throttle } from "lodash"; // Ensure lodash is installed for throttle
import { TooltipProvider } from "@/components/ui/tooltip";
import { FaNewspaper, FaRedditAlien, FaXTwitter } from "react-icons/fa6";
import { RiStockLine } from "react-icons/ri";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ItemType = {
  INSTRUMENT: "instrument",
  NEWS: "news",
};

const sectionIcons = {
  news: <FaNewspaper className="text-white" />,
  subreddit: <FaRedditAlien className="text-white" />,
  x: <FaXTwitter className="text-white" />,
  ticker: <RiStockLine className="text-white" />,
};

// Color schemes for different section types
const themeClasses = {
  news: "bg-gray-800",
  subreddit: "bg-red-800",
  x: "bg-blue-800",
  ticker: "bg-green-800",
};

export function NewsCard({
  title,
  type,
  news,
  index,
  moveNewsSection,
  onDelete,
}) {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: ItemType.NEWS,
    hover: throttle((item, monitor) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      // Do nothing if the dragged item is hovering over itself
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 4;
      const hoverMiddleX2 =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 0.5;

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 4;
      const hoverMiddleY2 = hoverBoundingRect.bottom - hoverBoundingRect.top;

      const clientOffset = monitor.getClientOffset();
      const hoverClientX = clientOffset.x - hoverBoundingRect.left;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Determine if we're dragging horizontally or vertically
      const isHorizontalMove =
        Math.abs(hoverClientX - hoverMiddleX) >
        Math.abs(hoverClientY - hoverMiddleY);

      // Move the item if it's dragged over the middle of the item vertically or horizontally
      if (isHorizontalMove) {
        // Handle horizontal drag (same row)
        if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
          return;
        }
        if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX2) {
          return;
        }
      } else {
        // Handle vertical drag (different rows)
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY2) {
          return;
        }
      }

      // Move the news section (now considering both row and column changes)
      moveNewsSection(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }, 100), // Throttle hover events to improve performance
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemType.NEWS,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Make the entire card draggable preview
  preview(drop(ref));

  return (
    <Card
      className={`relative group ${isDragging ? "opacity-50" : ""}`}
      ref={ref}
    >
      <CardContent className="w-full">
        <header className="text-lg text-center bg-gray-800 rounded-t-md">
          <div className="bg-gray-700 p-1 rounded-t-md flex items-center justify-between">
            {/* Drag Button (Centered) */}
            <Button
              ref={drag} // Only this button initiates the drag action
              variant="ghost"
              size="icon"
              className="h-5 mx-auto hover:cursor-move"
            >
              <GripHorizontal className="h-4 w-4" />
            </Button>

            {/* Right Aligned Icons */}
            <div className="absolute right-0 flex px-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5"
                onClick={onDelete}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <BellRingIcon className="h-3 w-3" />
                    </TooltipTrigger>
                    <TooltipContent side="top">Add Alert</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5"
                onClick={onDelete}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TrashIcon className="h-3 w-3" />
                    </TooltipTrigger>
                    <TooltipContent side="top">Delete</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Button>
            </div>
          </div>
          <div className={`flex w-full items-center ${themeClasses[type]}`}>
            <div className="absolute left-2">{sectionIcons[type]}</div>
            <p className={`p-2 text-sm font-bold tracking-wide flex-grow`}>
              {title}
            </p>
          </div>
        </header>

        <div className="h-72 overflow-auto">
          <ul className="divide-y divide-gray-800">
            {news.map((item, index) => (
              <li key={index} className="p-3">
                <p className="font-semibold text-xs mb-1">{item.title}</p>
                <p className="text-xs text-gray-400">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
