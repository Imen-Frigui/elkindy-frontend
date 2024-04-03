import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useExchangeStore from "ZustStore/exchangeStore";
import { IncomingTrades } from "components";
import Project from "views/admin/profile/components/Project";
import { LatestTrades } from "components";
import { ToastContainer } from "react-toastify";
import useShowToast from "hooks/useShowToast";
import { LoadingSpinner } from "components";
import { XMarkIcon } from "@heroicons/react/24/solid";

function UserTrades() {
  const [token, setToken] = useState("");
  const {
    exchangesReceived,
    recentTrades,
    loading,
    fetchReceivedExchangesByItem,
    fetchLatestTrades,
  } = useExchangeStore();
  const navigate = useNavigate();
  const [selectedInstrument, setSelectedInstrument] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const handleInstrumentSelect = async (instrumentId) => {
    setSelectedInstrument(instrumentId);
    await fetchReceivedExchangesByItem(token, instrumentId);
    setShowModal(true);
  };
  const showToast = useShowToast();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    } else {
      navigate("/auth/sign-in");
    }
    fetchLatestTrades(token);
  }, [navigate, fetchLatestTrades]);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="mt-2 grid h-full grid-cols-1 gap-4 md:grid-cols-3">
        <div className="md:col-span-2 ">
          <Project onInstrumentClick={handleInstrumentSelect} />
        </div>
        <div className="md:col-span-1 ">
          {loading ? (
            <LoadingSpinner className={"text-center"} />
          ) : (
            <div className="grid grid-cols-1">
              <LatestTrades trades={recentTrades} />
            </div>
          )}
        </div>
        <div className=" col-span-2 flex space-x-4">
          {showModal && (
            <div
              className={`fixed right-0 top-0 z-40 h-screen w-full max-w-xs space-y-3 overflow-y-auto bg-gray-200 p-4 transition-opacity duration-300 ease-in-out dark:bg-navy-800`}
            >
              <h1>Incoming trades</h1>
              <button
                onClick={() => setShowModal(false)}
                className="bg-transparent absolute right-2.5 top-2.5 rounded-lg p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-navy-800 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <XMarkIcon className="z-10 h-5 w-5 justify-end text-right text-black" />
              </button>
              <div className="space-y-3">
                {loading ? (
                  <LoadingSpinner />
                ) : exchangesReceived.length > 0 ? (
                  selectedInstrument &&
                  exchangesReceived.map((exchange) => (
                    <IncomingTrades
                      key={exchange._id}
                      tradeData={exchange}
                      onCloseModal={handleCloseModal}
                      showToast={showToast}
                    />
                  ))
                ) : (
                  <p>No incoming trades yet.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default UserTrades;
