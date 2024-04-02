import React, { useEffect, useState } from "react";
import useInstrumentStore from "../../ZustStore/instrumentStore";
import useExchangeStore from "../../ZustStore/exchangeStore";
import { useNavigate } from "react-router-dom";
import { InstrumentItem, LoadingSpinner } from "..";
import useSocketStore from "../../ZustStore/socketStore";
import useShowToast from "../../hooks/useShowToast";
import { ToastContainer } from "react-toastify";
import { Spinner } from "@chakra-ui/react";
function ExchangeModal({ instrument, onCloseModal }) {
  const [token, setToken] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [includeMoney, setIncludeMoney] = useState(false);
  const [moneyOffered, setMoneyOffered] = useState("");

  const navigate = useNavigate();
  const showToast = useShowToast();

  const instruments = useInstrumentStore((state) => state.instruments);
  const loading = useInstrumentStore((state) => state.loading);
  const { socket } = useSocketStore();

  const { createExchange, setError, error } = useExchangeStore();

  const fetchUserInstruments = useInstrumentStore(
    (state) => state.fetchUserInstruments
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    } else {
      navigate("/auth/sign-in");
    }
    fetchUserInstruments(token);
    console.log(socket);
  }, [navigate]);

  const handleSelectItem = (item) => {
    setSelectedItem(selectedItem === item ? null : item);
  };
  const handleCheckboxChange = () => {
    setIncludeMoney(!includeMoney);

    if (!includeMoney) {
      setMoneyOffered("");
    }
  };

  const handleNotification = () => {
    const message = "Someone is interested in exchanging instruments with you";
    socket.emit("sendNotification", {
      senderId: "user",
      receiverId: instrument.author[0]._id,
      instrument: instrument,
      message: message,
    });
  };

  const onRequestExchange = async () => {
    try {
      if (!selectedItem) {
        // setError("Please select an item before requesting exchange.");
        showToast("Please select an item before requesting exchange.", "error");
        return;
      }
      if (
        includeMoney &&
        (!moneyOffered || isNaN(moneyOffered) || moneyOffered <= 0)
      ) {
        showToast("Please enter a valid amount of money.", "error");
        return;
      }
      let exchangeData = {
        receiver: instrument.author[0]._id,
        senderInstrument: selectedItem,
        receiverInstrument: instrument,
      };
      if (includeMoney && moneyOffered) {
        exchangeData.moneyProposed = moneyOffered;
      } else {
        delete exchangeData.moneyProposed;
      }
      const res = await createExchange(exchangeData, token);
      handleNotification();
      showToast("Exchange request sent successfully.", "success");
      setTimeout(() => {
        onCloseModal();
      }, 1000);
    } catch (error) {
      showToast(error.message, "error");
    }
  };
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
      />
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:h-screen sm:align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block transform overflow-hidden rounded-lg bg-kindygray text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <div className="bg-kindygray px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="md:items-centers sm:flex sm:items-start md:flex">
              <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3
                  className="text-lg font-medium leading-6 text-gray-900"
                  id="modal-title"
                >
                  Select Item for Exchange
                </h3>
                <div className="mt-2">
                  <div className="space-y-4">
                    {loading ? (
                      <LoadingSpinner />
                    ) : instruments.length === 0 ? (
                      <p>You don't have any instruments yet.</p>
                    ) : (
                      instruments.map((item) => (
                        <InstrumentItem
                          key={item._id}
                          item={item}
                          selected={item === selectedItem}
                          onSelectItem={handleSelectItem}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-start px-3 py-4">
              <input
                type="checkbox"
                checked={includeMoney}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label>Include Money</label>
              {includeMoney && (
                <div className="relative w-full">
                  <input
                    type="number"
                    placeholder="Enter price in dinars"
                    value={moneyOffered}
                    onChange={(e) => setMoneyOffered(e.target.value)}
                    step=".10"
                    min="0"
                    oninput="this.value = Math.abs(this.value)"
                    className="bg-light mb-1 mt-2 block w-full rounded-lg px-2 
                    py-3 text-gray-500 placeholder-gray-400 placeholder-opacity-60   
                    shadow focus:outline-none focus:ring-1 focus:ring-kindyorange"
                  />

                  <div class="pointer-events-none absolute inset-0 flex w-full items-center justify-between gap-2 pl-[1.1rem]">
                    <span></span>
                    <div class="text-2xs mr-3 mt-1 rounded-md bg-gray-200 px-3 py-2 font-bold text-gray-700">
                      DT
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="bg-kindygray px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6  ">
            <button
              onClick={onRequestExchange}
              type="button"
              className="border-transparent inline-flex w-full justify-center rounded-md border bg-kindyorange px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-opacity-80 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
            >
              Request Swap
            </button>
            <button
              onClick={onCloseModal}
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExchangeModal;
