import React from "react";

export default function ListItem({ icon, label, onClick, style }) {
  return (
    <div
      class="flex items-center h-12 px-5 border-b border-slate-100 hover:bg-slate-100 hover:border-r-4border-blue-900"
      onClick={onClick}
      style={style}
    >
      <p className="text-slate-900">{icon}</p>
      <p className="text-slate-900 ml-3 mt-1 text-sm font-medium">{label}</p>
    </div>
  );
}
