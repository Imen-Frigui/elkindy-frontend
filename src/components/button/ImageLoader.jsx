import React from 'react';
import musicLoaderGif from '../../assets/img/Loading.gif'; // Import your GIF file

const ImageLoader = () => {
  return (
    <div className="flex justify-center items-center h-20">
      <img src={musicLoaderGif} alt="Loading..." className="size-16" />
    </div>
  );
};

export default ImageLoader;
