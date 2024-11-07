import React, { useState } from "react";
import { Button, DropdownToggle } from "react-bootstrap";
export default function Dummy() {
  const [background_color, setBackground_color] = useState("lightblue");
  const [width, setWidth] = useState(200);
  return (
    <div>
      <Button
        type="submit"
        style={{ accentColor: "red" }}
        onClick={() => {
          setBackground_color("gold");
          setWidth(400);
        }}
        className="bg-red-500 px-4 py-2 rounded-md shadow-xl shadow-red-400 mt-2 text-red-50 text-xl hover:bg-slate-500"
      >
        Hire me
      </Button>
      <div
        style={{
          width: width,
          height: 140,

          backgroundColor: "Scrollbar",
        }}
      ></div>
    </div>
  );
}
