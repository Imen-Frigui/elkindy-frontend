import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useExchangeStore from "ZustStore/exchangeStore";
import { Spinner, Box, Text } from "@chakra-ui/react";
import { IncomingTrades } from "components";
import Project from "views/admin/profile/components/Project";
import { Modal } from "components";
import banner from "assets/img/nfts/banner7.jpg";
import Banner1 from "./Banner";
import { LatestTrades } from "components";
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
    fetchLatestTrades(token);
  }, [navigate, fetchLatestTrades]);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Box p="4">
      {loading ? (
        <Spinner />
      ) : (
        <div className="mt-2 grid h-full grid-cols-1 gap-4 md:grid-cols-3 ">
          <div className="md:col-span-2">
            <Banner1
              backgroundImage={banner}
              title="Discover Your Perfect Harmony: Instruments Marketplace"
              subtitle="Exchange, Play, Repeat: Unleash Your Musical Potential"
              button1Link="/admin/marketplace/create"
              button1Text="Post your instrument now"
              button2Link="/admin/marketplace/trades"
              button2Text="My trades"
            />
          </div>
          <LatestTrades trades={recentTrades} />
          <div className=" flex space-x-4">
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
        </div>
      )}
    </Box>
  );
}

export default UserTrades;
