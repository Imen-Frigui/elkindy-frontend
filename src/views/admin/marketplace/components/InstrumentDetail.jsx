import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useInstrumentStore from "store/instrumentStore";
import Gallery from "./InstrumentGallery";
import { Button, BackButton } from "../../../../components";

function InstrumentDetail() {
  const { id } = useParams();
  const { getInstrument, instrument, loading } = useInstrumentStore();

  useEffect(() => {
    const fetchData = async () => {
      await getInstrument(id);
      console.log(instrument);
    };
    fetchData();
  }, [id]);
  return (
    <>
      <div className="mt-6">
        <BackButton />
      </div>
      <div className="mb-20 grid md:mt-5 md:grid-cols-2 md:gap-10">
        <Gallery />
        <div className="grid content-center px-5 md:px-0">
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
