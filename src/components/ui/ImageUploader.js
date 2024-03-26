import React, { useState, useEffect } from "react";
function ImageUploader({
  handleImageUpload,
  handleSingleImageUpload,
  selectedImages,
  removeImage,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleImageUpload(files);
  };
  return (
    <div className="w-full">
      <div
        className={`relative flex min-h-[170px] min-w-full cursor-pointer items-center justify-center gap-4 rounded-lg border-8 border-dashed border-gray-300 bg-gray-100 text-sm font-bold text-gray-600 ${
          isDragging ? "border-blue-500" : ""
        }`}
        onDragEnter={handleDragEnter}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <label
          htmlFor="imageUpload"
        >
          <input
            type="file"
            id="imageUpload"
            className="hidden"
            onChange={handleImageUpload}
            accept="image/*"
            multiple="true"
          />
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="34"
            width="34"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M3 4V1h2v3h3v2H5v3H3V6H0V4h3zm3 6V7h3V4h7l1.83 2H21c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V10h3zm7 9c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-3.2-5c0 1.77 1.43 3.2 3.2 3.2s3.2-1.43 3.2-3.2-1.43-3.2-3.2-3.2-3.2 1.43-3.2 3.2z"></path>
          </svg>
          <span className="pointer-events-none">Click or drop an image</span>
        </label>
      </div>
      <div
        data-rbd-droppable-id="imageList"
        data-rbd-droppable-context-id="0"
        className="relative mt-4 grid w-full grid-cols-4 gap-3"
      >
        {selectedImages.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image}
              alt={`Uploaded Image ${index + 1}`}
              className="h-48 w-full rounded-lg object-cover"
            />
            <div className="absolute right-1 top-1 -translate-y-1/2 translate-x-1/2">
              <button
                onClick={() => removeImage(index)}
                className="rounded-full bg-kindyorange p-1 text-white"
              >
                <svg
                  stroke="#FFFFFF"
                  fill="#FFFFFF"
                  strokeWidth="0"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  height="14"
                  width="14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={() => document.getElementById("imageUpload").click()}
          class="flex h-[85px] items-center justify-center rounded-lg border border-gray-300 bg-gray-100 text-gray-500"
        >
          <svg
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
            height="36"
            width="36"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ImageUploader;
