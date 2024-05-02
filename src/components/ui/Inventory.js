import React from "react";
import productItems from "utils/Data.js";
import ModelViewer from "./ModelViewer.js";
import LazyLoad from "react-lazyload";
const Inventory = ({ addToWishlist, wishlist, removeFromWishlist }) => {
  return (
    <section className="grid grid-cols-1 w-auto md:grid-cols-3 gap-2 mb-4 items-center ">
      {productItems.map((item, idx) => (
        <LazyLoad key={idx}>
          <ModelViewer
            item={item}
            addToWishlist={addToWishlist}
            wishlist={wishlist}
            removeFromWishlist={removeFromWishlist}
          />
        </LazyLoad>
      ))}
    </section>
  );
};

export default Inventory;
