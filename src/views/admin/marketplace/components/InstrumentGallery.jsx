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
      <div className="flex justify-start md:w-[1050px]">
        <img
          src={images}
          className="mb-5 w-1/4 md:rounded-lg "
          alt="product"
        />
      </div>
      <div className="flex w-1/2 justify-start space-x-2 md:flex-row ">
        {thumbnails}
      </div>

    </aside>
  );
}

export default Gallery;
