import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import Card from "components/card";
import useInstrumentStore from "../../ZustStore/instrumentStore";
import { Link } from "react-router-dom";
import { Button } from "../index";
import { useNavigate } from "react-router-dom";

const InstrumentCard = ({ instrument, bidders, image }) => {
  const [liked, setLiked] = useState(instrument.liked || false);
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
  }
  return (
    // <Link to={"/admin/marketplace/instrument/" + instrument._id}>
    <Card
      extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white  ${instrument.extra}`}
    >
      <div className="h-full w-full">
        <div className="relative w-full">
          <img
            src={image}
            className="mb-3 h-1/2 w-full rounded-xl 3xl:h-full 3xl:w-full"
            alt=""
          />
          <button
            onClick={handleLikeClick}
            className="absolute top-3 right-3 flex items-center justify-center rounded-full bg-white p-2 text-red-600 hover:cursor-pointer"
          >
            <div className="flex h-full w-full items-center justify-center rounded-full text-xl hover:bg-gray-50 dark:text-navy-900">
              {!liked ? (
                <IoHeartOutline />
              ) : (
                <IoHeart className="text-red-600" />
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

          <div className="flex flex-row-reverse md:mt-2 lg:mt-0">
            <span className="z-0 ml-px inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#E0E5F2] text-xs text-navy-700 dark:!border-navy-800 dark:bg-gray-800 dark:text-white">
              +5
            </span>
            {bidders.map((avt, key) => (
              <span
                key={key}
                className="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white dark:!border-navy-800"
              >
                <img
                  className="h-full w-full rounded-full object-cover"
                  src={avt}
                  alt=""
                />
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col 2xl:items-start 3xl:flex-row 3xl:items-center 3xl:justify-between">
          <div className="flex">
            <Button
              text={instrument.status}
              className={"my-1 mr-2 bg-indigo-50 py-2 text-kindyblue"}
            />
          </div>
          {/* <button
            href=""
            className="linear rounded-[15px] bg-kindyorange px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
          >
            See instrument
          </button> */}
        </div>
      </div>
    </Card>
    // </Link>
  );
};

export default InstrumentCard;
