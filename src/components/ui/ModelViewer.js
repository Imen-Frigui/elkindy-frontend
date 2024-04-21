import React, { useRef, useState, useEffect } from "react";
import LazyLoad from "react-lazyload";
// import "../../Products/ProductList.css";
import QRCode from "qrcode.react";
import Help from "./Help";

const ModelViewer = ({ item, addToWishlist, removeFromWishlist, wishlist }) => {
  const [selectedVariant, setSelectedVariant] = useState("default");
  const [display, setDisplay] = useState(false);
  const [ARSupported, setARSupported] = useState(false);
  const [annotate, setAnnotate] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [showQRPopup, setShowQRPopup] = useState(false);
  let modelViewer1 = {
    backgroundColor: " #ffffff",
    overflowX: "hidden",
    posterColor: "#eee",
    width: "100%",
    height: ARSupported ? "85%" : "75%",
    borderRadius: 15,
  };

  const model = useRef();
  const varient = useRef(null);

  console.log(item);

  function toggle() {
    if (!document.fullscreenElement) {
      model.current.requestFullscreen();
    } else if (document.exitFullscreen) document.exitFullscreen();
  }

  const handleAnnotateClick = (annotation) => {
    const { orbit, target, position } = annotation;
    model.current.cameraTarget = position;
    model.current.orbit = target;
  };

  useEffect(() => {
    if (
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    ) {
      setARSupported(true);
    }
  }, []);
  const handleQRButtonClick = () => {
    setShowQRPopup(true);
  };

  useEffect(() => {
    const modelViewer = model.current;
    modelViewer &&
      modelViewer.addEventListener("load", () => {
        console.log("loaded");
        const availableVariants = modelViewer?.availableVariants;
        console.log(availableVariants);
        for (const variant of availableVariants) {
          const option = document.createElement("option");
          option.value = variant;
          option.textContent = variant;
          varient?.current?.appendChild(option);
        }
        const defaultOption = document.createElement("option");
        defaultOption.value = "Default";
        defaultOption.textContent = "Default";
        varient?.current?.appendChild(defaultOption);
      });

    varient?.current?.addEventListener("input", (event) => {
      modelViewer.variantName =
        event.target.value === "Default" ? null : event.target.value;
    });
  }, []);

  useEffect(() => {
    if (wishlist) {
      const isInWishlist = wishlist.some(
        (wishlistItem) => wishlistItem.id === item.id
      );
      setIsInWishlist(isInWishlist);
    }
  }, [item, wishlist]);
  const handleAddToWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(item.id);
    } else {
      addToWishlist(item);
    }
  };

  return (
    <div className="relative m-1 h-[500px] w-[450px] transition-all duration-1000 ">
      <model-viewer
        key={item.id}
        ref={model}
        style={modelViewer1}
        src={item.modelSrc}
        ios-src={item.iOSSrc}
        alt="A 3D model"
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        auto-rotate
      >
        {ARSupported && (
          <button slot="ar-button"  className=" absolute bottom-12 left-1/2 -translate-x-1/2 transform cursor-pointer rounded-full border border-gray-200 bg-white px-16 py-0 text-xl text-blue-500 transition-colors duration-300 hover:border-gray-300 hover:bg-gray-100 hover:text-blue-600">
            View in your space
          </button>
        )}
        <button
          onClick={handleQRButtonClick}
          className="absolute top-2 grid w-auto cursor-pointer place-items-center bg-black   bg-opacity-25 p-3 text-base font-semibold text-white"
        >
          Preview in AR
          <span className="absolute bottom-5 flex hidden min-h-[30px] min-w-[100px] items-center justify-center rounded-lg bg-black bg-opacity-50 px-5 py-5 text-sm hover:flex hover:w-[55px] hover:items-center hover:justify-center "></span>
        </button>

        <button
          className=" absolute bottom-4 right-16 grid h-8 w-8 cursor-pointer place-items-center rounded-full bg-black bg-opacity-25 text-base font-semibold text-white "
          onClick={toggle}
        >
          &#x26F6;
          <span className="absolute bottom-5 flex hidden min-h-[30px] min-w-[100px] items-center justify-center rounded-lg bg-black bg-opacity-50 px-5 py-5 text-sm hover:flex hover:w-[55px] hover:items-center hover:justify-center ">
            full screen
          </span>
        </button>
        {display ? (
          <>
            <button
              className={document.fullscreenElement ? "close fz" : "close"}
              onClick={() => setDisplay(false)}
            >
              &#10006;
            </button>
            <Help />
          </>
        ) : (
          <>
            <button
              className="absolute bottom-4 right-4 grid h-8 w-8 cursor-pointer place-items-center rounded-full bg-black bg-opacity-25 text-base font-semibold text-white"
              onClick={() => setDisplay(true)}
            >
              ?
              <span className="absolute bottom-5 hidden min-h-[30px] items-center justify-center rounded-lg bg-black bg-opacity-50 px-5 py-5 text-sm"></span>
            </button>
          </>
        )}

        {/* {annotate &&
          item.annotations.map((annotate, idx) => (
            <button
              key={idx}
              class="Hotspot"
              slot={annotate.slot}
              data-position={annotate.position}
              data-normal={annotate.normal}
              data-orbit={annotate.orbit}
              data-target={annotate.target}
              data-visibility-attribute="visible"
              onClick={() => handleAnnotateClick(annotate)}
            >
              <div class="HotspotAnnotation">{annotate.title}</div>
            </button>
          ))} */}

        {/* <div class="controls variant_div">
          <select ref={varient} id="variant"></select>
        </div> */}
      </model-viewer>

      <LazyLoad>
        {/* Card content below the model-viewer */}
        {showQRPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50" />
            <div className="z-50 rounded-lg bg-white p-8 shadow-lg">
              <div className="mb-4 text-xl">Scan QR Code to View in AR</div>
              <p>
                Point your mobile device camera at the QR code below to see this
                model in your space using augmented reality.
              </p>
              <div className="flex justify-center">
                <QRCode
                  id={item.name}
                  value={window.location.href}
                  size={320}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="H"
                  includeMargin
                />
              </div>

              <button
                className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                onClick={() => setShowQRPopup(false)} // Close QR Popup Modal
              >
                Close
              </button>
            </div>
          </div>
        )}
        <div className="qr-sec bg-white">
          {!ARSupported && (
            <div>
              {/* <QRCode
                id={item.name}
                value={window.location.href}
                size={110}
                bgColor="#ffffff"
                fgColor="#000000"
                level="H"
                includeMargin
              /> */}
            </div>
          )}

          {/* <div className="product-details">
            <div>
              <div className="pname">{item.name}</div>
              <div className="rating-sec">
                <div>Rating</div>
                <div>
                  <span className="star">&#9733;</span>
                  <span className="star">&#9733;</span>
                  <span className="star">&#9733;</span>
                  <span>&#9733;</span>
                  <span>&#9733;</span>
                </div>
              </div>
              <div>Rs. 1000</div>
              {!ARSupported && <h5>Scan the QR code for AR View on mobile</h5>}
            </div>
            <button className="add-icon" onClick={handleAddToWishlist}>
              {isInWishlist ? "-" : "+"}
            </button>
          </div> */}
        </div>
      </LazyLoad>
    </div>
  );
};

export default ModelViewer;
