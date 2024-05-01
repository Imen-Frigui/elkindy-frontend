import React from 'react';
import musicLoaderGif from '../../assets/img/Loading.gif' ;

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-20">
      <img src={musicLoaderGif} alt="Loading..." className="size-20" />
    </div>
  );
};

export default Loader;
