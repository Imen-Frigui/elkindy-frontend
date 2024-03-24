import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useExchangeStore from "ZustStore/exchangeStore";
import { Spinner, Box,  Text } from "@chakra-ui/react";
import { IncomingTrades } from "components";
import Project from "views/admin/profile/components/Project";
import { Modal } from "components";
function UserTrades() {
  const [token, setToken] = useState("");
  const { exchangesReceived, loading,  fetchReceivedExchangesByItem } =
    useExchangeStore();
  const navigate = useNavigate();
  const [selectedInstrument, setSelectedInstrument] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleInstrumentSelect = async (instrumentId) => {
    setSelectedInstrument(instrumentId);
    await fetchReceivedExchangesByItem(token, instrumentId);
    setShowModal(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    } else {
      navigate("/auth/sign-in");
    }
  }, [navigate]);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Box p="4">
      {loading ? (
        <Spinner />
      ) : (
        <div className="mt-6 flex space-x-4">
          <Project onInstrumentClick={handleInstrumentSelect} />
          <div className="flex space-x-4">
            <Modal isOpen={showModal} onClose={handleCloseModal}>
              {exchangesReceived.length > 0 ? (
                selectedInstrument &&
                exchangesReceived.map((exchange) => (
                  <IncomingTrades key={exchange._id} tradeData={exchange} />
                ))
              ) : (
                <Text>No incoming trades</Text>
              )}
            </Modal>
          </div>
        </div>
      )}
    </Box>
  );
}

export default UserTrades;
