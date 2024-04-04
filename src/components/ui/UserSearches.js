import React, { useState, useEffect } from "react";
import useInstrumentStore from "ZustStore/instrumentStore";
import ReactTimeAgo from "react-time-ago";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner, DeleteModal } from "components";
import { ToastContainer } from "react-toastify";
import useShowToast from "hooks/useShowToast";

import Card from "components/card";

function UserSearches() {
  const [searches, setSearches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showToast = useShowToast();
  const navigate = useNavigate();

  const getUserSearches = useInstrumentStore((state) => state.getUserSearches);
  const deleteSearch = useInstrumentStore((state) => state.deleteUserSearch);

  useEffect(() => {
    const token = localStorage.getItem("token");

    async function fetchData(token) {
      try {
        setLoading(true);
        const data = await getUserSearches(token);
        setSearches(data.data);
      } catch (error) {
        console.error("Error fetching user searches:", error);
      } finally {
        setLoading(false);
      }
    }

    if (token) {
      setToken(token)
      fetchData(token);
    } else {
      navigate("/auth/sign-in");
    }
  }, [getUserSearches, navigate]);

  const handleDelete = async (id) => {
    try {
      const response = await deleteSearch(id, token);
      console.log(response)
      if (response.success) {
        showToast("Search deleted", "success");
       await getUserSearches(token);
      }
    } catch (error) {
      console.error("error ", error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <Card extra={"w-full p-4 h-full"}>
      <div className="mb-3">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          My alerts
        </h4>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
      />
      <div className="flex w-full flex-wrap">
        {searches && searches.length > 0 ? (
          searches.map((search, index) => (
            <div
              key={index}
              className="mb-4 mr-4 flex h-[25rem] w-[18rem] flex-col justify-between rounded-lg border border-gray-300 p-6"
            >
              <div className="flex flex-col ">
                <h2 className="text-neutral-700 w-full text-lg font-extrabold">
                  You have created an alert with the following criteria:{" "}
                </h2>
                <span className="flex items-center justify-center self-start pr-2 pt-2 align-middle font-bold">
                  <span>
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      className="mr-2 text-gray-600"
                      height="20"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.319 14.4326C20.7628 11.2941 20.542 6.75347 17.6569 3.86829C14.5327 0.744098 9.46734 0.744098 6.34315 3.86829C3.21895 6.99249 3.21895 12.0578 6.34315 15.182C9.22833 18.0672 13.769 18.2879 16.9075 15.8442C16.921 15.8595 16.9351 15.8745 16.9497 15.8891L21.1924 20.1317C21.5829 20.5223 22.2161 20.5223 22.6066 20.1317C22.9971 19.7412 22.9971 19.1081 22.6066 18.7175L18.364 14.4749C18.3493 14.4603 18.3343 14.4462 18.319 14.4326ZM16.2426 5.28251C18.5858 7.62565 18.5858 11.4246 16.2426 13.7678C13.8995 16.1109 10.1005 16.1109 7.75736 13.7678C5.41421 11.4246 5.41421 7.62565 7.75736 5.28251C10.1005 2.93936 13.8995 2.93936 16.2426 5.28251Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                  Search :
                  <span className="self-center pl-1 font-light">
                    {search.searchQuery}
                  </span>
                </span>
                <span className="flex items-center justify-center self-start py-2 align-middle font-bold">
                  <span>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      className="mr-2 text-gray-600 "
                      height="20"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                  Filters :
                </span>
                <div className=" scrollbar-thumb-neutral-100/10 scrollbar-track-gray-50/10 scrollbar-thin h-24 overflow-x-hidden overflow-y-scroll">
                  <div className="my-1 flex flex-wrap">
                    <span
                      id="badge-dismiss-default"
                      className="m-1 inline-flex items-center whitespace-nowrap rounded-md bg-gray-200/70 px-2 py-1 text-sm font-medium text-gray-800 outline outline-1 outline-gray-400"
                    >
                      Status :&nbsp;
                      <strong> {search.status}</strong>
                    </span>
                  </div>
                  <div className="my-1 flex flex-wrap">
                    <span
                      id="badge-dismiss-default"
                      className="m-1 inline-flex items-center whitespace-nowrap rounded-md bg-gray-200/70 px-2 py-1 text-sm font-medium text-gray-800 outline outline-1 outline-gray-400"
                    >
                      Age :&nbsp;
                      <strong> {search.age}</strong>
                    </span>
                  </div>
                </div>
                <ReactTimeAgo
                  date={search.createdAt}
                  className="text-neutral-500 dark:text-white"
                />
              </div>
              <div className="justify-end">
                <div className="mb-4 mt-7 h-[1px] w-full self-center bg-gray-300"></div>
                <div className="my-2 flex w-full">
                  <button
                    onClick={() => navigate("/marketplace")}
                    className="border-neutral-300 text-neutral-600 hover:bg-neutral-100 mr-4 flex w-3/4 justify-center rounded-lg border py-2 font-semibold"
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      className="mr-6 self-center text-gray-600"
                      height="20"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g>
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M1.181 12C2.121 6.88 6.608 3 12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9zM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"></path>
                      </g>
                    </svg>
                    See results
                  </button>
                  <div className="bg-neutral-300 mx-4 h-[30px] max-h-full w-[1px] self-center"></div>
                  <button
                    onClick={toggleModal}
                    className="flex w-1/4 items-center justify-center"
                  >
                    <svg
                      stroke="currentColor"
                      fill="red"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      height="24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g>
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M4 8h16v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8zm2 2v10h12V10H6zm3 2h2v6H9v-6zm4 0h2v6h-2v-6zM7 5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h5v2H2V5h5zm2-1v1h6V4H9z"></path>
                      </g>
                    </svg>
                  </button>
                </div>
              </div>
              {isModalOpen && (
                <DeleteModal
                  isOpen={isModalOpen}
                  onClose={toggleModal}
                  onDelete={() => handleDelete(search._id)}
                />
              )}
            </div>
          ))
        ) : (
          <div>No searches found.</div>
        )}
      </div>
    </Card>
  );
}

export default UserSearches;
