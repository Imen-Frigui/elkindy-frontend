import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

function Modal({ isOpen, onClose, children }) {
  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto ${isOpen ? "" : "hidden"}`}
    >
      <div className="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:h-screen sm:align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className={`inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle ${
            isOpen ? "sm:p-6" : "sm:p-4"
          }`}
        >
          <button
            onClick={onClose}
            className="flex text-gray-400 hover:text-gray-600  focus:outline-none md:flex-row"
          >
            <XMarkIcon className="z-10 h-6 w-6 justify-end text-right text-black" />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
