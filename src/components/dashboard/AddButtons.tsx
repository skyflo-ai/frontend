import { Button } from "@/components/ui/button";
import { PlusCircle, X, XCircle } from "lucide-react";
import { useEffect, useRef } from "react";

export function AddInstrumentCard({ text }) {
  return (
    <Button
      variant="outline"
      className="h-full border-dashed border-2 border-gray-700 bg-gray-900 hover:bg-gray-800 hover:border-gray-600"
    >
      <PlusCircle className="h-4 w-4 mr-2" />
      {text}
    </Button>
  );
}

export function AddSectionCard({ text, setIsModalOpen }) {
  return (
    <Button
      variant="outline"
      className="h-[440px] border-dashed border-2 border-gray-700 bg-gray-900 hover:bg-gray-800 hover:border-gray-600"
      onClick={() => setIsModalOpen(true)}
    >
      <PlusCircle className="h-4 w-4 mr-2" />
      {text}
    </Button>
  );
}

export function AddDashboardTabCard({ text, setIsModalOpen }) {
  return (
    <Button
      variant="outline"
      className="h-full text-xs border-dashed border-2 border-gray-700 bg-gray-900 hover:bg-gray-800 hover:border-gray-600"
      onClick={() => setIsModalOpen(true)}
    >
      <PlusCircle className="h-4 w-4 mr-2" />
      {text}
    </Button>
  );
}

export function Modal({ children, onClose, title, setIsModalOpen, onSubmit }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); // Close the modal when clicking outside
      }
    };

    document.addEventListener("keydown", handleEsc);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div
        ref={modalRef}
        className="bg-dark-secondary p-6 rounded-md w-1/4 shadow-xl"
      >
        <div className="flex justify-between">
          <p className="text-sm font-semibold">{title}</p>
          <X className="h-4 w-4 cursor-pointer" onClick={onClose} />
        </div>
        <form onSubmit={onSubmit} className="my-6">
          {children}
        </form>
        <div className="flex justify-end items-center gap-4 w-full">
          <button
            className="flex bg-dark-secondary hover:bg-dark-hover p-2 text-xs font-semibold rounded-md"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="flex bg-button-primary hover:bg-button-hover p-2 text-xs font-semibold rounded-md"
            onClick={() => onSubmit()}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
