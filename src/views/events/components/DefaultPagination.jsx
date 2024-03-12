import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export function DefaultPagination() {
  const [active, setActive] = useState(1);

  const getItemProps = (index) => ({
    style: {
      backgroundColor: active === index ? "#2563EB" : "transparent",
      color: active === index ? "#FFFFFF" : "#2563EB",
      border: "1px solid #2563EB",
    },
    onClick: () => setActive(index),
  });

  const next = () => {
    if (active === 5) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  return (
    <div className="flex items-center gap-4">
      <button
        className="flex items-center gap-2 px-4 py-2 rounded-md"
        onClick={prev}
        disabled={active === 1}
      >
        <FaArrowLeft className="h-4 w-4" /> Previous
      </button>
      <div className="flex items-center gap-2">
        <button {...getItemProps(1)}>1</button>
        <button {...getItemProps(2)}>2</button>
        <button {...getItemProps(3)}>3</button>
        <button {...getItemProps(4)}>4</button>
        <button {...getItemProps(5)}>5</button>
      </div>
      <button
        className="flex items-center gap-2 px-4 py-2 rounded-md"
        onClick={next}
        disabled={active === 5}
      >
        Next <FaArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}
