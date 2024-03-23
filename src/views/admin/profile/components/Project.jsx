import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdModeEditOutline } from "react-icons/md";
import image1 from "assets/img/profile/image1.png";
import image2 from "assets/img/profile/image2.png";
import image3 from "assets/img/profile/image3.png";
import Card from "components/card";
import useInstrumentStore from "../../../../ZustStore/instrumentStore";
import guitar from "assets/img/nfts/acoustic-guitar-grey.jpg";
import SwipeToDelete from "react-swipe-to-delete-ios";
import useShowToast from "../../../../hooks/useShowToast";

const Project = () => {
  const [token, setToken] = useState("");

  const fetchUserInstruments = useInstrumentStore(
    (state) => state.fetchUserInstruments
  );
  const deleteInstrument = useInstrumentStore(
    (state) => state.deleteInstrument
  );

  const instruments = useInstrumentStore((state) => state.instruments);
  const loading = useInstrumentStore((state) => state.loading);
  const navigate = useNavigate();
  const showToast = useShowToast();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    } else {
      navigate("/auth/sign-in");
    }
    fetchUserInstruments(token);
  }, [fetchUserInstruments, navigate]);

  const handleDelete = async (instrumentId) => {
    try {
      const response = await deleteInstrument(instrumentId);
      console.log(response);
      if (response.success) {
        showToast("Post deleted", "success");
        fetchUserInstruments(token);
      }
    } catch (error) {
      console.error("error ", error);
    }
  };
  return (
    <Card extra={"w-full p-4 h-full"}>
      <div className="mb-8 w-full">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          My instruments
        </h4>
        <p className="mt-2 text-base text-gray-600">
          Explore and manage your posted instruments in the marketplace. Find
          detailed information about each of your listings below.
        </p>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        instruments.map((instrument, index) => (
          <>
            <SwipeToDelete
              className="mb-3 rounded-3xl bg-navy-800"
              height={100}
              key={instrument._id}
              onDelete={() => handleDelete(instrument._id)}
              transitionDuration={250}
              deleteWidth={75}
              deleteThreshold={75}
              showDeleteAction={true}
              deleteColor="rgba(252, 58, 48, 1.00)"
              deleteText="Delete"
              // onDeleteConfirm={(onSuccess, onCancel) => {
              //   if (window.confirm("Do you really want to delete this item?")) {
              //     onSuccess();
              //   } else {
              //     onCancel();
              //   }
              // }}
            >
              <div className="mb-3 flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <div className="flex items-center">
                  <div className="">
                    <img
                      className="h-[83px] w-[83px] rounded-lg"
                      src={guitar}
                      alt=""
                    />
                  </div>
                  <div className="ml-4">
                    <p className="text-base font-medium text-navy-700 dark:text-white">
                      {instrument.title}
                    </p>
                    <p className="mt-2 text-sm text-gray-600">
                      {instrument.details}
                      <a
                        className="ml-1 font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                        href=" "
                      >
                        See product details
                      </a>
                    </p>
                  </div>
                </div>
                <div className="mr-4 flex items-center justify-center text-gray-600 dark:text-white">
                  <MdModeEditOutline />
                </div>
              </div>
            </SwipeToDelete>
          </>
        ))
      )}
    </Card>
  );
};

export default Project;
