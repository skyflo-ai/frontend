"use client";

import { useState } from "react";
import * as React from "react";
import { GripVertical, AlignJustify } from "lucide-react";
import { FaNewspaper, FaReddit, FaTwitter, FaChartLine } from "react-icons/fa";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  stockMarketNewsData,
  instrumentsData,
  dashboardTabsData,
  chatSuggestions,
} from "./data";
import { NewsCard } from "./NewsCard";
import LeftTabButton from "../stockview/LeftTabButton";
import { AddSectionCard, AddDashboardTabCard } from "./AddButtons";
import { Modal } from "./AddButtons";
import { ChatInterface } from "../ChatInterface";

export function Dashboard() {
  const [instruments, setInstruments] = React.useState(instrumentsData);
  const [newsSections, setNewsSections] = React.useState(stockMarketNewsData);
  const [dashboardTabs, setDashboardTabs] = React.useState(dashboardTabsData);
  const [activeTab, setActiveTab] = useState(dashboardTabs[0].name);

  const [newDashboardName, setNewDashboardName] = useState("");
  const [isNewDashboardModalOpen, setIsNewDashboardModalOpen] = useState(false);

  const [newSectionName, setNewSectionName] = useState("");
  const [isNewSectionModalOpen, setIsNewSectionModalOpen] = useState(false);
  const [newSectionSelectedOption, setNewSectionSelectedOption] = useState("");

  const [isNewSectionDropdownOpen, setIsNewSectionDropdownOpen] =
    useState(false);

  const newSectionOptions = [
    {
      value: "news",
      label: "News",
      icon: <FaNewspaper className="inline-block mr-2" />,
    },
    {
      value: "subreddit",
      label: "Subreddit",
      icon: <FaReddit className="inline-block mr-2" />,
    },
    {
      value: "x",
      label: "X",
      icon: <FaTwitter className="inline-block mr-2" />,
    },
    {
      value: "ticker",
      label: "Instrument",
      icon: <FaChartLine className="inline-block mr-2" />,
    },
  ];

  const handleNewSectionSelect = (option) => {
    setNewSectionSelectedOption(option.label);
    setIsNewSectionDropdownOpen(false);
  };

  const moveNewsSection = (dragIndex, hoverIndex) => {
    const draggedNews = newsSections[dragIndex];
    const updatedNewsSections = [...newsSections];
    updatedNewsSections.splice(dragIndex, 1);
    updatedNewsSections.splice(hoverIndex, 0, draggedNews);
    setNewsSections(updatedNewsSections);
  };

  const deleteNewsSection = (index) => {
    setNewsSections(newsSections.filter((_, i) => i !== index));
  };

  const moveTab = (dragIndex, hoverIndex) => {
    const draggedTab = dashboardTabs[dragIndex];
    const updatedTabs = [...dashboardTabs];
    updatedTabs.splice(dragIndex, 1);
    updatedTabs.splice(hoverIndex, 0, draggedTab);
    setDashboardTabs(updatedTabs);
  };

  const handleSubmit = () => {
    if (newDashboardName.trim() === "") {
      return;
    }
    setDashboardTabs([...dashboardTabs, { name: newDashboardName }]);
    setNewDashboardName("");
    setIsNewDashboardModalOpen(false);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex w-full min-h-screen bg-gray-950 text-gray-100">
        {/* Left Sidebar */}
        <div className="w-48">
          <div className="px-3 sticky top-0 flex flex-col border-border border-r h-screen">
            <div className="">
              <p className="flex items-center text-sm font-bold mt-5">
                <AlignJustify className="h-4 w-4 ml-1 mr-2" />
                Dashboards
              </p>
            </div>
            <div className="flex flex-col mt-5 mx-0 space-y-2">
              {dashboardTabs.map((tab, index) => (
                <LeftTabButton
                  key={index}
                  index={index}
                  icon={<GripVertical className="h-4 w-4" />}
                  label={tab.name}
                  tabKey={tab.name}
                  activeTab={activeTab}
                  moveTab={moveTab}
                  onClick={setActiveTab}
                />
              ))}
              <div className="m-4"></div>
              <AddDashboardTabCard
                text="Create Dashboard"
                setIsModalOpen={setIsNewDashboardModalOpen}
              />
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto h-full">
          <div className="">
            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsSections.map((section, index) => (
                <NewsCard
                  key={index}
                  type={section.type}
                  index={index}
                  title={section.title}
                  news={section.news}
                  moveNewsSection={moveNewsSection}
                  onDelete={() => deleteNewsSection(index)}
                />
              ))}
              <AddSectionCard
                text="Add Section"
                setIsModalOpen={setIsNewSectionModalOpen}
              />
            </main>
          </div>
        </div>

        <ChatInterface suggestions={chatSuggestions} />

        {/* New Dashboard Modal */}
        {isNewDashboardModalOpen && (
          <Modal
            onClose={() => setIsNewDashboardModalOpen(false)}
            title="Create a New Dashboard"
            setIsModalOpen={setIsNewDashboardModalOpen}
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              className="w-full bg-dark-secondary p-2 text-xs rounded-md border border-border focus:outline-none focus:border-border-focus"
              placeholder="Enter Dashboard Name"
              onChange={(e) => setNewDashboardName(e.target.value)}
              autoFocus
            />
          </Modal>
        )}

        {/* New Section Modal */}
        {isNewSectionModalOpen && (
          <Modal
            onClose={() => setIsNewSectionModalOpen(false)}
            title="Add Section"
            setIsModalOpen={setIsNewSectionModalOpen}
            onSubmit={handleSubmit}
          >
            {/* Dropdown with icons */}
            <div className="relative mb-4">
              <button
                type="button"
                onClick={() =>
                  setIsNewSectionDropdownOpen(!isNewSectionDropdownOpen)
                }
                className="w-full bg-dark-secondary p-2 text-xs rounded-md border border-border focus:outline-none focus:border-border-focus flex justify-between items-center"
              >
                {newSectionSelectedOption}
                {newSectionSelectedOption ? (
                  <span className="mr-2">&#9662;</span>
                ) : (
                  <span className="text-gray-400">Select Source</span>
                )}
              </button>
              {isNewSectionDropdownOpen && (
                <div className="absolute w-full bg-dark-secondary border border-border mt-1 rounded-md z-10">
                  {newSectionOptions.map((option) => (
                    <div
                      key={option.value}
                      className="p-2 flex items-center hover:bg-dark-hover cursor-pointer text-xs"
                      onClick={() => handleNewSectionSelect(option)}
                    >
                      {option.icon}
                      <span>{option.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Input field */}
            <input
              type="text"
              className="w-full bg-dark-secondary p-2 text-xs rounded-md border border-border focus:outline-none focus:border-border-focus"
              placeholder="Enter Section Name"
              onChange={(e) => setNewSectionName(e.target.value)}
              autoFocus
            />
          </Modal>
        )}
      </div>
    </DndProvider>
  );
}
