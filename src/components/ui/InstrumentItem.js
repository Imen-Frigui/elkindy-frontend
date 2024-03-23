import React, { useEffect, useState } from "react";
import guitar from "assets/img/nfts/acoustic-guitar-grey.jpg";

function InstrumentItem({ item,selected, onSelectItem }) {
  const handleClick = () => {
    if (selected) {
      onSelectItem(null);
    } else {
      onSelectItem(item);
    }
  };

  return (
    <div
      className={`mb-3 flex w-full cursor-pointer items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none ${
        selected
          ? ` border-4 border-kindyorange bg-kindyblue`
          : `border-transparent`
      }`}
      onClick={handleClick}
    >
      <div>
        <div className="flex items-center bg-white">
          <div>
            <img className="h-[83px] w-[83px] rounded-lg" src={guitar} alt="" />
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
    </div>
  );
}

export default InstrumentItem;
