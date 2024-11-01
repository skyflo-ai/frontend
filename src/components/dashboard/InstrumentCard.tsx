import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import React from "react";
import { useDrop, useDrag } from "react-dnd";
import { GripVertical, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ItemType = {
  INSTRUMENT: "instrument",
};

export function InstrumentCard({
  id,
  index,
  title,
  value,
  change,
  icon,
  moveInstrument,
  onDelete,
}) {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: ItemType.INSTRUMENT,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveInstrument(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType.INSTRUMENT,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const isPositive = change.startsWith("+");
  return (
    <div
      ref={ref}
      className={`bg-gray-900 relative group ${isDragging ? "opacity-50" : ""}`}
    >
      <Card>
        <CardContent className="p-3 flex justify-between items-center">
          <div className="absolute top-1 right-1 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <GripVertical className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-red-500"
              onClick={onDelete}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div>
            <div className="flex items-center gap-1 mb-1">
              {icon}
              <h2 className="text-xs font-medium">{title}</h2>
            </div>
            <div className="text-lg font-bold">{value}</div>
          </div>
          <p
            className={`text-xs ${
              isPositive ? "text-green-500" : "text-red-500"
            } flex items-center`}
          >
            {isPositive ? (
              <ArrowUpIcon className="h-3 w-3 mr-1" />
            ) : (
              <ArrowDownIcon className="h-3 w-3 mr-1" />
            )}
            {change}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
