import React from "react";

const DeleteModal = ({ isOpen, onClose, onDelete }) => {
  const handleDelete = async () => {
    onDelete();
    onClose();
  };
  return (
    <div className="z-50">
      {isOpen && (
        <div className="fixed inset-0 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-25 opacity-100"></div>
          <div
            id="headlessui-dialog-:r7:"
            role="dialog"
            aria-modal="true"
            data-headlessui-state="open"
            className=" fixed left-1/2 top-3/4 mx-auto h-full w-[20rem] -translate-x-1/2 -translate-y-1/2 transform lg:top-3/4 lg:h-full lg:w-[50rem]"
          >
            <div className="relative rounded-lg bg-white shadow">
              <button
                type="button"
                onClick={onClose}
                className="absolute right-2.5 top-3 p-1.5 text-sm text-gray-400"
                data-modal-toggle="popup-modal"
              >
                <svg
                  aria-hidden="true"
                  className="fill-primary h-5 w-5 cursor-pointer self-end rounded-full"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <div className="w-full p-3 text-center md:p-14 ">
                <div className="flex flex-wrap lg:flex-nowrap">
                  <div className="flex flex-col justify-evenly">
                    <h3 className="mb-5 text-lg font-bold text-gray-700">
                      Are you sure you want to delete this instrument?
                    </h3>
                    <p className="mx-auto mb-5 w-full text-xs font-normal text-gray-700 lg:text-sm">
                      Deleting this alert will permanently remove it from your
                      list of instruments and will be archived.
                    </p>
                    <button
                      onClick={handleDelete}
                      data-modal-toggle="popup-modal"
                      type="button"
                      className="mb-3 rounded-lg border  border-gray-200 bg-red-600 px-5 py-2.5 text-sm font-bold text-white focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 lg:mb-0"
                    >
                      Delete
                    </button>
                    <button
                      data-modal-toggle="popup-modal"
                      type="button"
                      onClick={onClose}
                      className="rounded-lg border  border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteModal;
