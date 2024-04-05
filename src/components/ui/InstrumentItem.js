import React from "react";
import guitar from "assets/img/nfts/acoustic-guitar-grey.jpg";
import { CheckIcon } from "@heroicons/react/24/solid";

function InstrumentItem({ item, selected, onSelectItem }) {
  const handleClick = () => {
    if (selected) {
      onSelectItem(null);
    } else {
      onSelectItem(item);
    }
  };

  return (
    // <div
    //   className={` mb-3 flex w-full cursor-pointer flex-row items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none ${
    //     selected
    //       ? ` border-4 border-kindyorange bg-kindyblue`
    //       : `border-transparent`
    //   }`}
    //   onClick={handleClick}
    // >
    //   <div>
    //     <div className="flex items-center justify-end bg-white">
    //       <div>
    //         <img className="h-22 w-full  rounded-lg" src={item.img} alt="" />
    //       </div>
    //       <div className="ml-4">
    //         <p className="text-base font-medium text-navy-700 dark:text-white">
    //           {item.title}
    //         </p>
    //         <p className="mt-2 text-sm text-gray-600">
    //           {item.details}
    //           <a
    //             className="ml-1 font-medium text-brand-500 hover:text-brand-500 dark:text-white"
    //             href="# "
    //           >
    //             Edit product
    //           </a>
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    //   <div className=" flex justify-end">
    //     {selected ? (
    //       <CheckIcon className="h-5 w-5 rounded-3xl bg-kindyorange text-white" />
    //     ) : (
    //       <div></div>
    //     )}
    //   </div>
    // </div>
    <div
      className={` mb-3 flex cursor-pointer flex-row items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none ${
        selected
          ? ` border-4 border-kindyorange bg-kindyblue`
          : `border-transparent`
      }`}
      onClick={handleClick}
    >
      <label>
        <div className="lg:card-hover group relative h-full rounded-md border-[1px] border-gray-300 p-3 ">
          <div className="border-neutral-100 bg-red bg-neutral-100 aspect-grid flex h-full w-full cursor-pointer flex-row items-start overflow-hidden rounded-md pb-2 transition-all">
            <div className="relative -mb-10  h-1/2 w-1/2 ">
              <div className="aspect-video w-1/2"></div>
              <img
                alt="instrument image"
                loading="lazy"
                decoding="async"
                data-nimg="fill"
                className="bg-neutral-300 h-full w-full  "
                src={item.img}
              />
            </div>
            <div className=" z-10 w-full px-3 pb-2 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
              <h2
                className="card-title font-arabic my-2 line-clamp-2 min-w-full max-w-min text-sm font-medium leading-5 text-gray-800"
                dir="auto"
              >
                {item.title}
              </h2>
              <span
                className="card-title my-2 line-clamp-2 min-w-full max-w-min text-xs font-light leading-5 text-gray-800"
                dir="auto"
              >
                {item.brand}
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
                <span className=" text-3xs text-neutral-500 w-3/5 truncate font-medium md:text-xs lg:text-xs">
                  {item.status}
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
                <span className="text-3xs text-neutral-500 line-clamp-1 w-3/5 truncate font-medium md:text-xs lg:text-xs">
                  Ben Arous
                </span>
                <div className=" items-end">
                  {selected ? (
                    <CheckIcon className="h-5 w-5 rounded-3xl bg-kindyorange text-white" />
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </label>
    </div>
  );
}

export default InstrumentItem;
