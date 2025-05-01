import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ActionDropdown = ({ onAction ,id}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleActionClick = (action) => {
    onAction(action);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <div className="border flex">
        <button className="px-4 py-2 border hover:bg-gray-200 hover:text-blue-300" onClick={()=>navigate(`/manager/order/details/${id}`)}>
          view
        </button>
        <button
          className="px-4 py-2 m-0 border hover:bg-gray-200 hover:text-blue-300"
          onClick={() => setOpen(!open)}
        >
          ⌄
        </button>
      </div>

      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md z-10">
          <button
            onClick={() => handleActionClick("print")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            print
          </button>
          <button
            onClick={() => handleActionClick("download")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            download
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionDropdown;
