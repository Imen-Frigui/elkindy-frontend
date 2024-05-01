import React from "react";

const Help = () => {
  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 bg-opacity-75 rounded-lg px-4 py-2 text-white text-sm">
      <div className="text-lg font-bold mb-2">ORBIT NAVIGATION</div>
      <div className="mb-2">
        <span className="font-bold">Move camera:</span> 1-finger drag or Left Mouse Button
      </div>
      <div className="mb-2">
        <span className="font-bold">Pan:</span> 2-finger drag or Right Mouse Button or SHIFT+ Left Mouse Button
      </div>
      <div className="mb-2">
        <span className="font-bold">Zoom on object:</span> Double-tap or Double-click on object
      </div>
      <div className="mb-2">
        <span className="font-bold">Zoom out:</span> Double-tap or Double-click on background
      </div>
      <div>
        <span className="font-bold">Zoom:</span> Pinch in/out or Mousewheel or CTRL + Left Mouse Button
      </div>
    </div>
  );
};

export default Help;
