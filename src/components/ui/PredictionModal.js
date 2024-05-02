import React, { useState, useEffect } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
const PredictionModal = ({ isOpen, onClose, prediction }) => {
  const [resultText, setResultText] = useState("");
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    if (prediction === 0) {
      setResultText(
        "The prediction suggests that based on the available data, the student is likely to face challenges in passing the final exam."
      );
      setIcon(<XCircleIcon className=" h-[70px] w-[70px]  text-red-500" />);
    } else if (prediction === 1) {
      setResultText(
        "The prediction indicates that the student is likely to pass the final exam."
      );
      setIcon(<CheckCircleIcon className="h-[70px] w-[70px] text-green-500" />);
    } else {
      setResultText("");
      setIcon(null);
    }
  }, [prediction]);

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-25 opacity-100"></div>
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <div
              className="\ scale-100 transform items-center overflow-hidden rounded-2xl bg-white p-6  align-middle opacity-100 shadow-xl transition-all"
              id="headlessui-dialog-panel-:r4:"
              data-headlessui-state="open"
            >
              <div
                className="btn btn-sm btn-circle absolute right-2 top-2"
                onClick={onClose}
              >
                ✕
              </div>
              <div
                isOpen={isOpen}
                onRequestClose={onClose}
                contentLabel="Prediction Modal"
                className="items-center"
                overlayClassName="overlay"
              >
                <div className="flex-col items-center justify-center ">
                  <h2>Student Performance Result</h2>
                  <div className="items-center flex justify-center" >{icon}</div>
                  <p>{resultText}</p>
                </div>
              </div>{" "}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionModal;
