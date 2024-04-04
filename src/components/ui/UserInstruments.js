import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "components/card/index";
import useInstrumentStore from "ZustStore/instrumentStore";
import useShowToast from "hooks/useShowToast";
import ReactTimeAgo from "react-time-ago";
import { LoadingSpinner } from "components";

function UserInstruments({ onInstrumentClick }) {
  const [token, setToken] = useState("");
  const [filter, setFilter] = useState("all");

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

  const filtered = instruments.filter((instrument) => {
    return instrument.itemStatus === "active";
  });

  return (
    <div className="mb-4  h-full  gap-x-0 gap-y-5 p-6 lg:gap-x-4 xl:gap-x-4">
      <div className=" ">
        <Card extra={"w-full p-4 h-full"}>
          <div className="mb-8 w-full">
            <div className="flex w-full justify-between">
              <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                My instruments
              </h4>
            </div>
            <p className="mt-2 text-base text-gray-600">
              Click on any instrument below to view incoming trade requests and
              manage your listings.{" "}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 space-x-4 md:grid-cols-3">
            {loading ? (
              <p>
                <LoadingSpinner />
              </p>
            ) : filtered.length === 0 ? (
              <div className="flex items-center justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-base font-medium text-navy-700 dark:text-white">
                  No items found.
                </p>
              </div>
            ) : (
              filtered.map((instrument, index) => (
                <>
                  <div
                    className=""
                    onClick={() => onInstrumentClick(instrument._id)}
                  >
                    <label>
                      <div
                        className="lg:card-hover group relative flex h-full rounded-md border-[1px] border-gray-300 "
                        style={{ width: "210px", height: "350px" }}
                      >
                        <div className="border-neutral-100 bg-neutral-100 aspect-grid flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-md pb-2 transition-all">
                          <div className="relative -mb-10 h-full w-full grow">
                            <div className="aspect-video w-full"></div>
                            <img
                              alt="instrument image"
                              loading="lazy"
                              decoding="async"
                              data-nimg="fill"
                              className="bg-neutral-300 h-full w-full object-cover  "
                              src={instrument.img}
                              style={{
                                position: "absolute",
                                height: "100%",
                                width: "100%",
                                inset: "0px",
                                color: "transparent",
                              }}
                            />
                            <div className="border-t-neutral-100 absolute -bottom-4 left-0 right-0 z-[2] h-16 w-full skew-y-6 scale-x-105 border-t bg-white"></div>
                          </div>
                          <div className="false z-10 flex-none px-3 pb-2 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
                            <h2
                              className="card-title font-arabic my-2 line-clamp-2 min-w-full max-w-min text-sm font-medium leading-5 text-gray-800"
                              dir="auto"
                            >
                              {instrument.title}
                            </h2>
                            <span
                              className="card-title my-2 line-clamp-2 min-w-full max-w-min text-xs font-light leading-5 text-gray-800"
                              dir="auto"
                            >
                              {instrument.brand}
                            </span>
                            <div className="mb-3 mt-1 h-[1px] bg-black/5"></div>
                            <div className="text-2xs mb-[1px] flex items-center space-x-1 font-light  text-gray-800">
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                stroke-width="0"
                                viewBox="0 0 512 512"
                                className="text-neutral-300 mr-1"
                                height="11"
                                width="11"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M128,256A128,128,0,1,0,256,384,128,128,0,0,0,128,256Zm379-54.86L400.07,18.29a37.26,37.26,0,0,0-64.14,0L229,201.14C214.76,225.52,232.58,256,261.09,256H474.91C503.42,256,521.24,225.52,507,201.14ZM480,288H320a32,32,0,0,0-32,32V480a32,32,0,0,0,32,32H480a32,32,0,0,0,32-32V320A32,32,0,0,0,480,288Z"></path>
                              </svg>
                              <span className=" text-3xs text-neutral-500 w-3/5 truncate font-medium dark:text-white md:text-xs lg:text-xs">
                                {instrument.status}
                              </span>
                            </div>
                            <div className="text-2xs flex items-center justify-start space-x-1 font-light  text-gray-800">
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                stroke-width="0"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                                className="text-neutral-300 mr-1 "
                                height="11"
                                width="11"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                              <span className="text-3xs text-neutral-500 line-clamp-1 w-3/5 truncate font-medium dark:text-white md:text-xs lg:text-xs">
                                Ben Arous
                              </span>
                              <span className="text-3xs text-neutral-500 line-clamp-1 w-3/5 truncate font-medium dark:text-white md:text-xs lg:text-xs">
                                {" "}
                                <ReactTimeAgo
                                  date={instrument.createdAt}
                                  className="text-neutral-500"
                                />
                              </span>
                            </div>
                            <button className="mt-3 flex-row w-full justify-center rounded-lg border border-gray-300 bg-gray-300 p-2">
                              <span className="text-3xs line-clamp-1 font-medium md:text-xs lg:text-xs">
                                View incoming trade requests
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                </>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default UserInstruments;
