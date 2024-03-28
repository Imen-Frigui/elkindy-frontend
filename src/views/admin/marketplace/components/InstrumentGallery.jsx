import { useState } from "react";

import image from "../../../../assets/img/nfts/acoustic-guitar-grey.jpg";

import closeIcon from "../../../../assets/svg/icon-close.svg";
import iconPrevious from "../../../../assets/svg/icon-previous.svg";
import iconNext from "../../../../assets/svg/icon-next.svg";

const displayed_images = [
  { img: image, thumbnail: image },
  { img: image, thumbnail: image },
  { img: image, thumbnail: image },
  { img: image, thumbnail: image },
];

const active_thumbnail_class = " outline outline-4 outline-orange ";

function Gallery({images}) {
  const numImages = displayed_images.length;
  const [CurrentImageIndex, setCurrentImageIndex] = useState(0);
  const [ModalVisible, SetModalVisiblity] = useState(false);

  const goPreviousImage = () => {
    if (CurrentImageIndex === 0) {
      setCurrentImageIndex(numImages - 1);
    } else {
      setCurrentImageIndex(CurrentImageIndex - 1);
    }
  };

  const goNextImage = () => {
    setCurrentImageIndex((CurrentImageIndex + 1) % numImages);
  };

  let thumbnails = displayed_images.map((image, index) => (
    <div className="flex ">
      <button
        onClick={() => setCurrentImageIndex(index)}
        className={
          (index === CurrentImageIndex ? active_thumbnail_class : "") +
          "rounded-lg bg-white bg-clip-border"
        }
        key={index}
      >
        <img
          src={image.thumbnail}
          className=" w-10 rounded-lg hover:opacity-50 "
          alt="gallery button"
        />
      </button>
    </div>
  ));

  return (
    <aside className=" z-20 h-full items-center md:fixed md:z-10 lg:fixed">
      {/* <button onClick={() => SetModalVisiblity(true)} className=" w-25 "> */}
      <div className="flex justify-start md:w-[1050px]">
        <img
          src={images}
          className="mb-5 w-1/4 md:rounded-lg "
          alt="product"
        />
      </div>

      {/* </button> */}

      {/* <div className="relative mb-10  md:mb-0 md:hidden">
        <img src={image} alt="product" />
        <button
          onClick={goPreviousImage}
          className="absolute left-0 top-1/2 ml-2 h-10 w-10 rounded-full bg-white"
        >
          <img src={iconPrevious} className="mx-auto " alt="left arrow" />
        </button>
        <button
          onClick={goNextImage}
          className="absolute right-0 top-1/2 mr-2 h-10 w-10 rounded-full bg-white"
        ></button>
        <img src={iconNext} className="mx-auto" alt="left arrow" />
      </div> */}

      <div className="flex w-1/2 justify-start space-x-2 md:flex-row ">
        {thumbnails}
      </div>

      {/* <div
        className={
          (ModalVisible ? "" : "hidden") +
          " bg-black/[.8] fixed left-0 top-0 z-20 h-full w-full overflow-auto"
        }
      >
        <div className="mx-auto max-w-screen-sm ">
          <div className="relative px-6 text-right">
            <button
              onClick={() => SetModalVisiblity(false)}
              className="mb-8 h-6 w-6"
            >
              <svg
                className="hover:fill-orange fill-[#69707D]"
                viewBox="0 0 14 15"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
                  fill-rule="evenodd"
                />
              </svg>
            </button>
            <button
              onClick={goPreviousImage}
              className="absolute left-0 top-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-white align-middle"
            >
              <svg
                className="hover:stroke-orange stroke-[#1D2026] p-5"
                viewBox="0 0 12 18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 1 3 9l8 8"
                  stroke-width="3"
                  fill="none"
                  fill-rule="evenodd"
                />
              </svg>
            </button>
            <button
              onClick={goNextImage}
              className="absolute right-0 top-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-white align-middle"
            >
              <svg
                className="hover:stroke-orange stroke-[#1D2026] p-5"
                viewBox="0 0 13 18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m2 1 8 8-8 8"
                  stroke-width="3"
                  fill="none"
                  fill-rule="evenodd"
                />
              </svg>
            </button>

            <img className="mx-auto rounded-xl" src={image} alt="product" />
          </div>
          <div className="mt-10 mb-5 grid grid-cols-4 gap-4 md:mb-0 md:px-10">
            {thumbnails}
          </div>
        </div>
      </div> */}
    </aside>
  );
}

export default Gallery;
