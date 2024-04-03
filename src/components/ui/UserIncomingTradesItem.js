import React, { useState } from "react";
import Card from "components/card";
import TradeItem from "./TradeItem";
import { useNavigate } from "react-router-dom";
import {
  EnvelopeIcon,
  PhoneIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import useExchangeStore from "ZustStore/exchangeStore";
import useSocketStore from "ZustStore/socketStore";
// import Modal from "./Modal";
import { RatingComponent } from "react-rating-emoji";
import "react-rating-emoji/dist/index.css";

import Modal from "./Modal";

const IncomingTrades = ({
  tradeData,
  onCloseModal,
  showToast,
  onOpenRatingModal,
}) => {
  const { updateTradeStatus } = useExchangeStore();
  const { socket } = useSocketStore();
  const [showModal, setShowModal] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const token = localStorage.getItem("token");
  const [selectedReason, setSelectedReason] = useState("");
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  const handleRating = async (newRating) => {
    try {
      setRating(newRating);
      await updateTradeStatus(
        token,
        tradeData._id,
        "accepted",
        null,
        newRating
      );
      handleNotification("accepted");
      onCloseModal();
      showToast("Trade accepted", "success");
    } catch (error) {
      showToast("Error occurred try again later", "error");
    }
  };
  const handleAcceptTrade = async () => {
    setShowRating(true);
  };

  const handleRejectTrade = async () => {
    setShowModal(true);
  };

  const handleNotification = (status) => {
    socket.emit("sendTradeStatus", {
      receiverId: tradeData.sender.id,
      status: status,
    });
  };
  const handleSubmitDeclineReason = async () => {
    await updateTradeStatus(token, tradeData._id, "rejected", selectedReason);
    handleNotification("rejected");
    onCloseModal();
    showToast("Trade rejected", "warn");
  };
  const reasons = [
    "Instrument not suitable",
    "Unavailable for trade",
    "Condition disagreement",
    "Low money offer",
    "Change of plans",
    "Not interested anymore",
    "Other",
  ];
  const handleReasonChange = (event) => {
    const selectedReason = event.target.value;
    setSelectedReason(selectedReason);
  };
  return (
    <>
      {showModal && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
            <div className="rounded-t border-b border-solid border-gray-200 p-5">
              <h3 className="text-lg font-semibold">Reason for Declining</h3>
            </div>
            <div className="relative flex-auto p-6">
              {reasons.map((reason, index) => (
                <div key={index} className="mb-2">
                  <input
                    type="radio"
                    id={`reason-${index}`}
                    value={reason}
                    name="reason"
                    onChange={handleReasonChange}
                  />
                  <label htmlFor={`reason-${index}`} className="ml-2">
                    {reason}
                  </label>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-end rounded-b border-t border-solid border-gray-200 p-6">
              <button
                className="mb-1 mr-1 rounded bg-red-600 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-red-700"
                type="button"
                onClick={handleSubmitDeclineReason}
              >
                Confirm Decline
              </button>
            </div>
          </div>
        </Modal>
      )}

      <Card extra={"flex md:flex-row items-center w-auto h-full p-[5px]"}>
        <div className="ml-3 ">
          <div className=" mt-1 flex justify-center rounded-xl">
            <TradeItem
              item={tradeData.sender.senderInstrument}
              status={tradeData.status}
              data={tradeData}
            />
          </div>
          {tradeData.moneyProposed !== 0 && (
            <div className="w-dull flex items-center justify-center rounded-xl bg-green-50 text-green-500">
              + {tradeData.moneyProposed}DT
            </div>
          )}

          {tradeData.status === "requested" && (
            <div className="mt-3 flex justify-end space-x-2  ">
              <div className=" rounded-lg bg-green-500 p-1 text-white">
                <button
                  className="flex items-center"
                  onClick={handleAcceptTrade}
                >
                  <CheckIcon className="h-4 w-4 rounded-lg bg-green-500 text-white" />
                  Accept trade
                </button>
              </div>
              <div className=" rounded-lg bg-red-500 p-1 text-white">
                <button
                  className="flex items-center "
                  onClick={handleRejectTrade}
                >
                  <XMarkIcon className="h-4 w-4 rounded-lg bg-red-500 text-white" />
                  Decline
                </button>
              </div>
            </div>
          )}
        </div>
      </Card>
      {showRating && (
        <Modal isOpen={showRating} onClose={() => setShowRating(false)}>
          <div className="mt-3">
            <p className="mb-2 text-lg font-semibold">
              Rate your trading experience:
            </p>
            <RatingComponent
              rating={rating}
              className={"flex justify-evenly"}
              onClick={handleRating}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default IncomingTrades;
