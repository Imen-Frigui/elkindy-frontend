import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "components/card";
import useInstrumentStore from "../../../../ZustStore/instrumentStore";
import useShowToast from "../../../../hooks/useShowToast";
import ReactTimeAgo from "react-time-ago";
import { LoadingSpinner, DeleteModal } from "components";
import { ToastContainer } from "react-toastify";

const Project = ({ onInstrumentClick }) => {
  const [token, setToken] = useState("");
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      if (response.success) {
        showToast("Item deleted", "success");
        fetchUserInstruments(token);
      }
    } catch (error) {
      console.error("error ", error);
    }
  };

  const filtered = instruments.filter((instrument) => {
    if (filter === "all") return true;
    return instrument.itemStatus === filter;
  });
  function getItemStatusColor(status) {
    switch (status) {
      case 'deleted':
        return 'rgba(255, 0, 0, 0.6)';
      case 'traded':
        return 'rgba(0, 128, 0, 0.6)';
      default:
        return '';
    }
  }
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className=" p-6 mb-4 ">
      <div className="">
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
        />
        <Card extra={"w-full p-4 h-full"}>
          <div className="mb-8 w-full">
            <div className="flex justify-between w-full">
              <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                My instruments
              </h4>
              <div className="relative right-5 flex items-center">
                <span class="relative left-8">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    class="text-gray-600"
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </span>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="select text-2xs select-sm select border-1 h-[40px] max-h-full w-full max-w-full rounded-md border-gray-300 bg-gray-100 bg-gray-200/70 pl-10 text-xs font-light  text-gray-600 hover:!text-gray-700 focus:outline-none focus:outline-offset-0 xl:w-fit dark:text-white"
                >
                  <option value="all">Show all</option>
                  <option value="active">Show Active</option>
                  <option value="traded">Show Traded</option>
                  <option value="deleted">Show Deleted</option>
                </select>
              </div>
            </div>
            <p className="mt-2 text-base text-gray-600">
              Explore and manage your posted instruments in the marketplace. Find
              detailed information about each of your listings below.
            </p>
          </div>
          <div className="grid h-full grid-cols-1 md:grid-cols-2 ">
            {loading ? (
              <p><LoadingSpinner /></p>
            ) : filtered.length === 0 ? (
              <div className="flex items-center justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-base font-medium text-navy-700 dark:text-white">
                  No items found.
                </p>
              </div>) : (
              filtered.map((instrument, index) => (
                <>
                  {isModalOpen && <DeleteModal isOpen={isModalOpen} onClose={toggleModal} onDelete={() => handleDelete(instrument._id)} />
                  }
                  <div className="py-3 ">
                    <label>
                      <div className="relative  cursor-pointer rounded-md group h-full border-[1px] border-gray-300 lg:card-hover group-hover:opacity-100  flex " style={{ width: '210px', height: '350px' }}>
                        <div className="absolute top-[35%]  z-10 w-full  pointer-events-none ">
                          <div className="flex space-x-1">
                          </div>
                          {instrument.itemStatus !== 'active' ? (
                            <div>
                              <div
                                className="p-2 text-white text-center"
                                style={{
                                  background: getItemStatusColor(instrument.itemStatus)
                                }}
                              >
                                {instrument.itemStatus}
                              </div>
                            </div>
                          ) : null}
                        </div>
                        <div className="flex flex-col h-full w-full rounded-md overflow-hidden  pb-2   border-neutral-100 bg-neutral-100 aspect-grid cursor-pointer"><div className="relative w-full  h-full grow -mb-10"><div className="w-full  aspect-video"></div>
                          <img alt="instrument image" loading="lazy" decoding="async" data-nimg="fill" className="bg-neutral-300 w-full h-full object-cover  " src={instrument.img} style={{
                            position: 'absolute',
                            height: '100%',
                            width: '100%',
                            inset: '0px',
                            color: 'transparent'
                          }} />
                          <div className="absolute skew-y-6 scale-x-105 -bottom-4 h-16 left-0 right-0 w-full z-[2] bg-white border-t border-t-neutral-100"></div>
                        </div>
                          <div className="pb-2 px-3 z-10 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110 flex-none false">
                            <h2 className="card-title font-arabic text-sm font-medium leading-5 text-gray-800 max-w-min min-w-full line-clamp-2 my-2" dir="auto">{instrument.title}</h2>
                            <span className="card-title text-xs font-light leading-5 text-gray-800 max-w-min min-w-full line-clamp-2 my-2" dir="auto">{instrument.brand}</span>
                            <div className="mt-1 mb-3 h-[1px] bg-black/5"></div>
                            <div className="flex items-center space-x-1 mb-[1px] text-2xs font-light  text-gray-800">
                              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" className="text-neutral-300 mr-1" height="11" width="11" xmlns="http://www.w3.org/2000/svg">
                                <path d="M128,256A128,128,0,1,0,256,384,128,128,0,0,0,128,256Zm379-54.86L400.07,18.29a37.26,37.26,0,0,0-64.14,0L229,201.14C214.76,225.52,232.58,256,261.09,256H474.91C503.42,256,521.24,225.52,507,201.14ZM480,288H320a32,32,0,0,0-32,32V480a32,32,0,0,0,32,32H480a32,32,0,0,0,32-32V320A32,32,0,0,0,480,288Z"></path>
                              </svg>
                              <span className=" truncate text-3xs md:text-xs lg:text-xs w-3/5 font-medium text-neutral-500 dark:text-white">{instrument.status}</span></div>
                            <div className="flex items-center space-x-1 justify-start text-2xs font-light  text-gray-800">
                              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" className="text-neutral-300 mr-1 " height="11" width="11" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                              </svg>
                              <span className="line-clamp-1 truncate text-3xs md:text-xs lg:text-xs w-3/5 font-medium text-neutral-500 dark:text-white">Ben Arous,</span>
                              <span className="line-clamp-1 truncate text-3xs md:text-xs lg:text-xs w-3/5 font-medium text-neutral-500 dark:text-white"> <ReactTimeAgo date={instrument.createdAt} className="text-neutral-500 dark:text-white" /></span>
                            </div>

                            <button onClick={toggleModal}
                              class="flex items-center justify-center w-1/4 mt-3">
                              <svg stroke="currentColor" fill="red" stroke-width="0" viewBox="0 0 28 28" class="text-primary" height="22" width="22" xmlns="http://www.w3.org/2000/svg"><g>
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path d="M4 8h16v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8zm2 2v10h12V10H6zm3 2h2v6H9v-6zm4 0h2v6h-2v-6zM7 5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h5v2H2V5h5zm2-1v1h6V4H9z"></path>
                              </g>
                              </svg>

                            </button>
                          </div>
                        </div>
                      </div>
                    </label>

                  </div>
                </>

              ))
            )}
          </div >
        </Card>
      </div>
    </div>

  );
};

export default Project;
