"use client";

import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

interface TabButtonProps {
  icon: React.ReactNode;
  label: string;
  tabKey: string;
  activeTab: string;
  index: number; // Add an index prop to track tab order
  onClick: (tabKey: string) => void;
  moveTab: (dragIndex: number, hoverIndex: number) => void; // Add a function to move tabs
}

const ItemType = {
  TAB: "tab",
};

const LeftTabButton: React.FC<TabButtonProps> = ({
  icon,
  label,
  tabKey,
  activeTab,
  index,
  onClick,
  moveTab,
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const isActive = activeTab === tabKey;

  // Drop logic
  const [, drop] = useDrop({
    accept: ItemType.TAB,
    hover(item: { index: number }, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      // Perform drag-and-drop logic based on hover position
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveTab(dragIndex, hoverIndex);
      item.index = hoverIndex; // Update the item's index after moving
    },
  });

  // Drag logic
  const [{ isDragging }, drag] = useDrag({
    type: ItemType.TAB,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref)); // Attach drag and drop refs

  return (
    <button
      ref={ref}
      className={`transition-all duration-300 text-xs font-semibold tracking-wide flex items-center px-2 py-2 rounded-md ${
        isActive
          ? "bg-button-primary text-white"
          : "text-gray-400 hover:bg-dark-secondary hover:text-white"
      } ${isDragging ? "opacity-50" : ""}`} // Add opacity change when dragging
      onClick={() => onClick(tabKey)}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </button>
  );
};

export default LeftTabButton;
