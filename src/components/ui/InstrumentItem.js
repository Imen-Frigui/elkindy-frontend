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
    <div
      className={` mb-3 flex w-full cursor-pointer flex-row items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none ${
        selected
          ? ` border-4 border-kindyorange bg-kindyblue`
          : `border-transparent`
      }`}
      onClick={handleClick}
    >
      <div>
        <div className="flex items-center justify-end bg-white">
          <div>
            <img className="h-22 w-full  rounded-lg" src={item.img} alt="" />
          </div>
          <div className="ml-4">
            <p className="text-base font-medium text-navy-700 dark:text-white">
              {item.title}
            </p>
            <p className="mt-2 text-sm text-gray-600">
              {item.details}
              <a
                className="ml-1 font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                href="# "
              >
                Edit product
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className=" flex justify-end">
        {selected ? (
          <CheckIcon className="h-5 w-5 rounded-3xl bg-kindyorange text-white" />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default InstrumentItem;
