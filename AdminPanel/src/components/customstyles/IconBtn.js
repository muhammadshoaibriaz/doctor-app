import React from "react";
export const Button = ({ onClick, label, icon, onMouseEnter }) => {
  return (
    <button
      className="bg-slate-100 w-10 h-10 flex items-center justify-center rounded-full"
      onClick={onClick}
      title={label}
      onMouseEnter={onMouseEnter}
    >
      {icon}
    </button>
  );
};
