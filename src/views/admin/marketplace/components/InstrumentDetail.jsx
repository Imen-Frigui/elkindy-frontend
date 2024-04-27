import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useInstrumentStore from "ZustStore/instrumentStore";
import useChatStore from "ZustStore/chatStore";
import { fetchUserData } from 'slices/userSlice';
import { useDispatch, useSelector } from "react-redux";

import Gallery from "./InstrumentGallery";
import {
  Button,
  BackButton,
  TradeModal,
  ShareModal,
} from "../../../../components";
import { useNavigate } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import { UserIcon, ClockIcon } from "@heroicons/react/24/solid";

function InstrumentDetail() {
  const { id } = useParams();
  const { getInstrument, instrument } = useInstrumentStore();
  const { sendMessage } = useChatStore();
  const userData = useSelector(state => state.user.userData);

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [token, setToken] = useState("");
  const [showNumber, setShowNumber] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(id);
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/auth/sign-in");
      return;
    }
    const fetchData = async () => {
      try {
        await getInstrument(id, token);
      } catch (error) {
        console.error("Error fetching", error);
      }
    };

    fetchData();
    console.log(instrument);
  }, [id, navigate]);

  const handleExchangeClick = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleItemSelect = (item) => {
    setSelectedItem(item);
  };
  const handleShowNumber = () => {
    setShowNumber(!showNumber);
  };
  const copyPhoneNumber = () => {
    const phoneNumber = instrument.author[0].phoneNumber;
    navigator.clipboard.writeText(phoneNumber);
    document.getElementById("copyButton").style.display = "none";
    document.getElementById("copiedButton").style.display = "inline-block";
  };

  const handleWhatsappContact = () => {
    const urlItem = window.location.href;
    const message = encodeURIComponent(urlItem);
    const url = `https://wa.me/${instrument.author[0].phoneNumber}?text=${message}`;
    window.open(url, "_blank");
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleStartChat = async () => {
    dispatch(fetchUserData());
    const user = userData.user._id;
    const token = localStorage.getItem("token");
    await sendMessage(token, {
      message: "Hello, I'm interested in your instrument. Can we discuss further? Here is the instrument i want: "+  window.location.href,
      recipientId: instrument.author[0]._id,
    });
  }

  return (

    <>
      {instrument && (
        <div>
          <div className="sticky mt-6">
            <BackButton />
          </div>
          <div className=" grid md:mt-5 md:grid-cols-10 md:gap-2">
            <div className="md:col-span-4 ml-20">
              <Gallery images={instrument.img} />
            </div>
            <div className=" content-center px-5 md:z-30 md:col-span-5 md:px-0">
              <h1 className="my-2 text-3xl font-bold md:text-5xl dark:text-white">
                {instrument.title}
              </h1>
              <div>
                <h2 className="font-bold text-kindyorange">{instrument.brand}</h2>

              </div>
              <div className="mt-3  space-y-2">
                <h4 className="font-bold">Description</h4>
                <p className=" text-navy-800 dark:text-white">{instrument.details}</p>
              </div>

              <div className="my-5 flex flex-wrap items-center">
                <div className="text-orange inline-block rounded text-lg font-bold">
                  {instrument.status === "sell" ? (
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
                  <Button
                    text={"age " + instrument.age}
                    className={"my-1 mr-2 bg-indigo-50 py-2 text-kindyblue"}
                  />
                </div>
              </div>
              <div class="items-left lg:items-lest flex w-full flex-col justify-between px-3 align-middle lg:flex-row ">
                <div class=" mr-2 flex w-fit flex-col pb-4 md:flex-col">
                  <div class="flex flex-col justify-center">
                    <div class="mx-auto flex items-center justify-center transition-transform active:scale-90"></div>
                  </div>
                  <div class=" ml-1 items-center  md:flex">
                    <div class="flex flex-col">
                      <div class="flex flex-col items-center md:flex-row lg:flex-row">
                        <div class="avatar relative mb-2 md:mb-4 lg:mb-0 ">
                          <div class="mask mask-squircle absolute left-[-1px] top-[-1px] w-[72px] bg-white"></div>
                          <div class="mask mask-squircle w-[70px]">
                            {" "}
                            <UserIcon className="text-gray-400" />
                          </div>
                        </div>
                        <div class="ml-0 flex flex-col md:ml-4 lg:ml-4">
                          <span class="text-2xs mt-0 font-light text-gray-500 md:mt-0 lg:mt-4">
                            <div class="mb-3 flex  flex-col">
                              <span class="text-center text-xs font-normal leading-5 text-blue-500 md:text-start lg:text-start">
                                User
                              </span>
                              <span class="text-center text-sm font-semibold capitalize text-gray-700 md:text-start lg:text-start">
                                {instrument.author[0].firstName}{" "}
                                {instrument.author[0].lastName}{" "}
                              </span>
                              <div class="mb-1 flex flex-wrap items-center justify-center space-x-1 text-blue-800/60 md:justify-start lg:justify-start ">
                                <span class="text-xs font-medium">
                                  3 post(s)
                                </span>
                                <svg
                                  stroke="currentColor"
                                  fill="currentColor"
                                  strokeWidth="0"
                                  viewBox="0 0 20 20"
                                  aria-hidden="true"
                                  height="16"
                                  width="16"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                                </svg>
                              </div>
                            </div>
                            <div class="mb-1 flex w-full  items-start space-x-1 text-blue-800/60 md:w-[100%]">
                              <ClockIcon className="mr-2 h-4 w-4 text-gray-600 " />
                              <span class="text-center text-xs font-medium md:text-start lg:text-start">
                                <ReactTimeAgo
                                  date={instrument.createdAt}
                                  className="text-gray-600"
                                />{" "}
                              </span>
                            </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="ml-0 mr-0 flex w-[80vw] flex-col justify-center gap-y-1  px-0 md:col-[none] lg:ml-auto lg:w-[25vw]">
                  <button
                    onClick={handleStartChat}
                    aria-label="Chat with the seller"
                    className="btn btn !border-slate-200 !bg-transparent hover:!bg-slate-100 !my-1 !w-full rounded-lg border-none bg-blue-100  p-3 !px-2  font-bold  normal-case  text-blue-500 hover:bg-blue-200"
                  >
                    <span class="flex  h-full w-full flex-row items-center justify-center gap-x-0 gap-y-[2.5px] md:gap-x-2">
                      <span class="ml-0 mr-0">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 512 512"
                          class="mr-2"
                          height="22"
                          width="22"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M144 464a16 16 0 01-16-16v-64h-24a72.08 72.08 0 01-72-72V120a72.08 72.08 0 0172-72h304a72.08 72.08 0 0172 72v192a72.08 72.08 0 01-72 72H245.74l-91.49 76.29A16.05 16.05 0 01144 464z"></path>
                        </svg>
                      </span>
                      <span class="flex align-middle">
                        Chat with the seller
                      </span>
                    </span>
                  </button>
                  <button
                    aria-label="Chat on WhatsApp."
                    className="btn btn !border-slate-200 !bg-transparent hover:!bg-slate-100 !my-1
                  !w-full rounded-lg   border-none
                  bg-blue-100  p-3 !px-2  font-bold  normal-case  text-blue-500 hover:bg-blue-200"
                    onClick={handleWhatsappContact}
                  >
                    <span class="flex  h-full w-full flex-row items-center justify-center gap-x-0 gap-y-[2.5px] md:gap-x-2">
                      <span class="ml-0 mr-0">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 512 512"
                          class="mr-2"
                          height="22"
                          width="22"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M260.062 32C138.605 32 40.134 129.701 40.134 250.232c0 41.23 11.532 79.79 31.559 112.687L32 480l121.764-38.682c31.508 17.285 67.745 27.146 106.298 27.146C381.535 468.464 480 370.749 480 250.232 480 129.701 381.535 32 260.062 32zm109.362 301.11c-5.174 12.827-28.574 24.533-38.899 25.072-10.314.547-10.608 7.994-66.84-16.434-56.225-24.434-90.052-83.844-92.719-87.67-2.669-3.812-21.78-31.047-20.749-58.455 1.038-27.413 16.047-40.346 21.404-45.725 5.351-5.387 11.486-6.352 15.232-6.413 4.428-.072 7.296-.132 10.573-.011 3.274.124 8.192-.685 12.45 10.639 4.256 11.323 14.443 39.153 15.746 41.989 1.302 2.839 2.108 6.126.102 9.771-2.012 3.653-3.042 5.935-5.961 9.083-2.935 3.148-6.174 7.042-8.792 9.449-2.92 2.665-5.97 5.572-2.9 11.269 3.068 5.693 13.653 24.356 29.779 39.736 20.725 19.771 38.598 26.329 44.098 29.317 5.515 3.004 8.806 2.67 12.226-.929 3.404-3.599 14.639-15.746 18.596-21.169 3.955-5.438 7.661-4.373 12.742-2.329 5.078 2.052 32.157 16.556 37.673 19.551 5.51 2.989 9.193 4.529 10.51 6.9 1.317 2.38.901 13.531-4.271 26.359z"></path>
                        </svg>
                      </span>
                      <span class="flex align-middle">Chat on WhatsApp</span>
                    </span>
                  </button>
                  <span class=" lg:block ">
                    {showNumber ? (
                      <div class="mt-1 flex gap-1">
                        <div class="h-12 w-full items-center justify-center rounded-md bg-gray-100 px-4 font-bold  lg:flex">
                          <span class="flex h-full w-full flex-row items-center gap-1">
                            <span class="flex w-full justify-center gap-2 text-sm sm:mr-0.5">
                              <a class="text-gray-600" href="tel:+216">
                                +216 {instrument.author[0].phoneNumber}
                              </a>
                            </span>
                          </span>
                        </div>
                        <span class="h-12 w-12 flex-grow items-center justify-center rounded-md bg-blue-100 text-blue-500 hover:text-blue-600   lg:flex">
                          <button
                            id="copyButton"
                            class="flex flex-col items-center justify-center p-2 text-blue-500"
                            onClick={copyPhoneNumber}
                          >
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth="0"
                              viewBox="0 0 20 20"
                              aria-hidden="true"
                              height="19"
                              width="19"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z"></path>
                              <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z"></path>
                            </svg>
                            <span class="text-3xs">Copy</span>
                          </button>
                          <span
                            class="h-12 w-12 flex-grow items-center justify-center rounded-md bg-green-100 text-blue-500 hover:text-blue-600 lg:flex"
                            id="copiedButton"
                            style={{ display: "none" }}
                          >
                            <span class="flex flex-col items-center justify-center p-2 text-green-500">
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                                height="19"
                                width="19"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                                <path
                                  fillRule="evenodd"
                                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                              <span class="text-3xs">Copied</span>
                            </span>
                          </span>
                        </span>
                      </div>
                    ) : (
                      <button
                        aria-label="Show number"
                        onClick={handleShowNumber}
                        className="btn btn !border-slate-200 !bg-transparent hover:!bg-slate-100 !my-1
                !w-full rounded-lg   border-none
                bg-blue-100  p-3 !px-2  font-bold  normal-case  text-blue-500 hover:bg-blue-200"
                      >
                        <span class="flex  h-full w-full flex-row items-center justify-center gap-x-0 gap-y-[2.5px] md:gap-x-2">
                          <span class="ml-0 mr-0">
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth="0"
                              viewBox="0 0 16 16"
                              class="mr-4"
                              height="22"
                              width="22"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                              ></path>
                            </svg>
                          </span>
                          <span class="flex align-middle">Show number</span>
                        </span>
                      </button>
                    )}
                  </span>
                  {instrument.status === "exchange" ? (
                    <span class=" lg:block ">
                      <button
                        onClick={handleExchangeClick}
                        aria-label="Trade with the user"
                        className="btn btn !border-slate-200 !bg-transparent hover:!bg-slate-100 text-blue-500hover:bg-blue-200
                  !my-1 !w-full rounded-lg
                  border-none bg-blue-100 p-3 !px-2 font-bold normal-case"
                      >
                        <span class="flex  h-full w-full flex-row items-center justify-center gap-x-0 gap-y-[2.5px] md:gap-x-2">
                          <span class="ml-0 mr-0">
                            <svg
                              fill="#3B82F6"
                              strokeWidth="0"
                              class="mr-4"
                              height="22"
                              width="22"
                              version="1.1"
                              id="Layer_1"
                              viewBox="0 0 423.755 423.755"
                            >
                              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                              <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></g>
                              <g id="SVGRepo_iconCarrier">
                                <g>
                                  <path d="M43.84,281.457c-18.585-44.869-18.586-94.29,0-139.159c10.649-25.709,26.678-48.152,46.86-66.135l60.86,60.86V15.099 H29.635l39.88,39.88c-64.293,58.426-88.5,153.2-53.391,237.959c14.167,34.202,37.07,64.159,66.234,86.634 c28.275,21.789,61.873,36.201,97.162,41.677l4.601-29.646C120.778,381.774,68.337,340.597,43.84,281.457z"></path>{" "}
                                  <path d="M407.516,292.938c21.652-52.272,21.652-109.848,0-162.12c-14.167-34.202-37.071-64.159-66.234-86.633 C313.007,22.395,279.409,7.983,244.12,2.507l-4.601,29.646c63.342,9.829,115.783,51.005,140.28,110.146 c18.586,44.869,18.586,94.29,0,139.159c-10.649,25.709-26.678,48.152-46.859,66.135l-60.86-60.86v121.924h121.924l-39.801-39.801 C377.118,348.099,395.334,322.348,407.516,292.938z"></path>{" "}
                                </g>
                              </g>
                            </svg>
                          </span>
                          <span class="flex align-middle text-blue-500">
                            Swap with the user
                          </span>
                        </span>
                      </button>
                    </span>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
              <button
                class="btn undefined btn bg-transparent hover:!bg-slate-100
    !w-fit rounded-lg  border-none !px-2 font-bold  normal-case  text-blue-500"
                onClick={toggleModal}
              >
                <span class="flex  h-full w-full flex-row items-center justify-center gap-x-0 gap-y-[2.5px] md:gap-x-2">
                  <span class="ml-0 mr-0">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 512 512"
                      class="text-blue-500 hover:text-blue-800"
                      height="18"
                      width="18"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M503.691 189.836L327.687 37.851C312.281 24.546 288 35.347 288 56.015v80.053C127.371 137.907 0 170.1 0 322.326c0 61.441 39.581 122.309 83.333 154.132 13.653 9.931 33.111-2.533 28.077-18.631C66.066 312.814 132.917 274.316 288 272.085V360c0 20.7 24.3 31.453 39.687 18.164l176.004-152c11.071-9.562 11.086-26.753 0-36.328z"></path>
                    </svg>
                  </span>
                  <span class="flex align-middle">
                    <span class=" text-xs  xl:block">Share the item</span>
                  </span>
                </span>
              </button>
              <ShareModal isOpen={isModalOpen} onClose={toggleModal} />
            </div>
            {showModal && (
              <TradeModal
                instrument={instrument}
                onSelectItem={handleItemSelect}
                isOpen={setShowModal}
                onClose={handleCloseModal}
                onCloseModal={() => setShowModal(false)}
              />
            )}
          </div>
        </div>
      )}{" "}
    </>
  );
}

export default InstrumentDetail;
