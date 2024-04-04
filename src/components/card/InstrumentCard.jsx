import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import Card from "components/card";
import useInstrumentStore from "../../ZustStore/instrumentStore";
import { Link } from "react-router-dom";
import { Button } from "../index";
import { useNavigate } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";

const InstrumentCard = ({ instrument, bidders, image }) => {
  const [liked, setLiked] = useState(instrument.liked || false);
  const [likeScore, setLikeScore] = useState(instrument.likeScore);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const { likePost } = useInstrumentStore();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    } else {
      navigate("/auth/sign-in");
    }
  }, [navigate]);
  async function handleLikeClick() {
    const response = await likePost(instrument._id, token);
    setLiked(!liked);
    setLikeScore(response.likeScore);
  }
  return (
    <Card
      extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white    ${instrument.extra}`}
    >
      <div className="h-full w-full  transition duration-300 ease-in-out hover:-translate-y-0 hover:translate-x-2 hover:scale-105  ">
        <div className="relative w-full ">
          <img
            src={instrument.img}
            className="mb-3 h-1/2 w-full rounded-xl 3xl:h-full 3xl:w-full"
            alt=""
          />
          <button
            onClick={handleLikeClick}
            className="absolute right-3 top-3 flex items-center justify-center rounded-full bg-white p-2 text-red-600 hover:cursor-pointer"
          >
            <div className="flex h-full w-full items-center justify-center rounded-full text-lg hover:bg-gray-50 dark:text-navy-900">
              {!liked ? (
                <IoHeartOutline />
              ) : (
                <div>
                  <IoHeart className="text-red-600" />
                  <span className="text-xs">{likeScore}</span>
                </div>
              )}
            </div>
          </button>
        </div>
        <div className="mb-3 flex items-center justify-between px-1 md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between">
          <div className="mb-2">
            <Link to={"/admin/marketplace/instrument/" + instrument._id}>
              <p className="text-lg font-bold text-navy-700 dark:text-white">
                {instrument.title}
              </p>
            </Link>
            <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
              Brand: {instrument.brand}
            </p>
            <p className="mt-1 text-sm font-medium text-navy-700 md:mt-2">
              {instrument.details}
            </p>
          </div>

        </div>

        <div className="flex items-center justify-between md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col 2xl:items-start 3xl:flex-row 3xl:items-center 3xl:justify-between">
          <div className="flex">
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
          </div>
          <ReactTimeAgo date={instrument.createdAt} className="text-gray-600" />{" "}
        </div>
      </div>
    </Card>
  );
};

export default InstrumentCard;
