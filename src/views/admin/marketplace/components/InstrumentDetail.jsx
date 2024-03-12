import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useInstrumentStore from "store/instrumentStore";
import Gallery from "./InstrumentGallery";
import { Button, BackButton } from "../../../../components";
import { io } from "socket.io-client";

function InstrumentDetail() {
  const { id } = useParams();
  const { getInstrument, instrument, loading } = useInstrumentStore();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await getInstrument(id);
      console.log(instrument);
    };
    setSocket(io("http://localhost:5000"));
    fetchData();
  }, [id]);

  const handleNotification = () => {
    const message = "Someone is interested in exchanging instruments with you";
    socket.emit("sendNotification", {
      senderName: "user",
      receiverName: "post.username",
      instrument: instrument,
      message: message,
    });
  };

  return (
    <>
      <div className="sticky mt-6">
        <BackButton />
      </div>
      <div className=" grid md:mt-5 md:grid-cols-10 md:gap-2">
        <div className="md:col-span-4">
          <Gallery />
        </div>
        <div className=" content-center px-5 md:z-50 md:col-span-5 md:px-0">
          <h2 className="font-bold text-kindyorange">{instrument.brand}</h2>
          <h1 className="my-2 text-3xl font-bold md:text-5xl">
            {instrument.title}
          </h1>
          <p className="my-8 text-navy-800">{instrument.details}</p>
          <div className="my-5 flex flex-wrap items-center">
            <div className="text-orange inline-block rounded text-lg font-bold">
              <Button
                text={instrument.status}
                className={"my-1 mr-2 bg-indigo-50 py-2 text-kindyblue"}
              />
            </div>
          </div>
          <div>
            <Button
              onClick={handleNotification}
              text={"Contact Owner"}
              className="border-transparent border-1 w-58  rounded-lg bg-kindyorange py-2 px-4 text-white transition  duration-300 hover:border-gray-100 hover:bg-opacity-80  hover:text-white focus:outline-none "
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default InstrumentDetail;
