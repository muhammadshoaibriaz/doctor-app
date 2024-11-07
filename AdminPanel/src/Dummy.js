import React, { useState } from "react";
const Dummy = () => {
  const [open, setOpen] = useState(false);
  const toggleBtn = () => {
    setOpen(!open);
  };
  return (
    <div>
      <h1>React Modal Example</h1>
      {open && (
        <div className="transition-all duration-1000 shadow-lg bg-white rounded-sm">
          <h1>for ow Open kn</h1>
        </div>
      )}
      <button onClick={toggleBtn}>toggleBtn()</button>
    </div>
  );
};

export default Dummy;
