import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useInstrumentStore from "ZustStore/instrumentStore";
import Gallery from "./InstrumentGallery";
import { Button, BackButton, TradeModal } from "../../../../components";
import { useNavigate } from "react-router-dom";

function InstrumentDetail() {
  const { id } = useParams();
  const { getInstrument, instrument } = useInstrumentStore();
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    } else {
      navigate("/auth/sign-in");
    }
    const fetchData = async () => {
      await getInstrument(id, token);
    };

    fetchData();
  }, [getInstrument, id]);

  const handleExchangeClick = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleItemSelect = (item) => {
    setSelectedItem(item);
  };

  const handleNotification = () => {};

  return (
    <>
      <div className="sticky mt-6">
        <BackButton />
      </div>
      <div className=" grid md:mt-5 md:grid-cols-10 md:gap-2">
        <div className="md:col-span-4">
          <Gallery images={instrument.img} />
        </div>
        <div className=" content-center px-5 md:z-30 md:col-span-5 md:px-0">
          <h2 className="font-bold text-kindyorange">{instrument.brand}</h2>
          <h1 className="my-2 text-3xl font-bold md:text-5xl">
            {instrument.title}
          </h1>
          <p className="my-8 text-navy-800">{instrument.details}</p>
          <div className="my-5 flex flex-wrap items-center">
            <div className="text-orange inline-block rounded text-lg font-bold">
              {instrument.status == "sell" ? (
                <Button
                  text={`${instrument.price} DT `}
                  className={"my-1 mr-2 bg-indigo-50 py-2 text-kindyblue"}
                />
              ) : (
                <Button
                  text={instrument.status}
                  className={"my-1 mr-2 bg-indigo-50 py-2 text-kindyblue"}
                />
              )}
            </div>
          </div>
          <div className="my-4 text-gray-600">
            {instrument.author && (
              <div>
                Posted by: {instrument.author[0].firstName}{" "}
                {instrument.author[0].lastName}
              </div>
            )}
          </div>
          <div>
            <Button
              onClick={handleNotification}
              text={"Contact Owner"}
              className="border-transparent border-1 w-58  rounded-lg bg-kindyorange px-4 py-2 text-white transition  duration-300 hover:border-gray-100 hover:bg-opacity-80  hover:text-white focus:outline-none "
            />
            {instrument.status === "exchange" ? (
              <Button
                onClick={handleExchangeClick}
                text={"Swap"}
                className="border-transparent border-1 w-58  rounded-lg bg-kindyorange px-4 py-2 text-white transition  duration-300 hover:border-gray-100 hover:bg-opacity-80  hover:text-white focus:outline-none "
              />
            ) : instrument.status === "buy" && instrument.price ? (
              <div>Price: ${instrument.price}</div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        {showModal && (
          <TradeModal
            instrument={instrument}
            onSelectItem={handleItemSelect}
            isOpen={setShowModal}
            onClose={handleCloseModal}
            // onRequestExchange={handleExchangeRequest}
            onCloseModal={() => setShowModal(false)}
          />
        )}
      </div>
    </>
  );
}

export default InstrumentDetail;
