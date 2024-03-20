// components/Tag.js

import React from "react";

interface props {
  text: string;
  color: string;
}

const Tag = ({ text, color }: props) => {
  const getColorClasses = () => {
    switch (color.toLowerCase()) {
      case "red":
        return "bg-red-500 text-white";
      case "blue":
        return "bg-blue-500 text-white";
      case "green":
        return "bg-green-500 text-white";
      default:
        return "bg-blue-500 text-white"; // Default color if no specific color is defined
    }
  };

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 ${getColorClasses()}`}
    >
      {text}
    </span>
  );
};

export default Tag;
