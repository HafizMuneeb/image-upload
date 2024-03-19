import React, { useState } from "react";

interface ModalProps {
  imageUrl: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ imageUrl, onClose }) => {
  const [zoom, setZoom] = useState<number>(1);
  const [panPosition, setPanPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleMouseWheel = (e: React.WheelEvent<HTMLImageElement>) => {
    e.preventDefault();

    // Update zoom based on scroll direction
    const newZoom = e.deltaY < 0 ? zoom + 0.1 : zoom - 0.1;
    setZoom(Math.max(1, newZoom));
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();

    // Capture initial mouse position for panning
    let initialX = e.clientX;
    let initialY = e.clientY;

    const handleMouseMove = (event: MouseEvent) => {
      // Calculate panning distance
      const deltaX = event.clientX - initialX;
      const deltaY = event.clientY - initialY;

      // Update pan position
      setPanPosition((prevPanPosition) => ({
        x: prevPanPosition.x + deltaX,
        y: prevPanPosition.y + deltaY,
      }));

      // Update initial mouse position for next iteration
      initialX = event.clientX;
      initialY = event.clientY;
    };

    const handleMouseUp = () => {
      // Remove event listeners when mouse is released
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    // Add event listeners for mouse move and up events
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="max-w-lg w-full p-4 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imageUrl}
          alt="Zoomed Image"
          className="w-full cursor-move"
          style={{
            transform: `scale(${zoom}) translate(${panPosition.x}px, ${panPosition.y}px)`,
            userSelect: "none",
          }}
          onWheel={handleMouseWheel}
          onMouseDown={handleMouseDown}
        />
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-4 p-2 rounded-full bg-gray-300 hover:bg-gray-400 text-gray-700"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Modal;
