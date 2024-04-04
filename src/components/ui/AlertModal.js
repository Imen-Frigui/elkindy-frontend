import alert from "assets/img/AlertAdded.svg";

function AlertModal({ isOpen, status, age, onClose }) {
  return (
    <div>
      {isOpen && (
        <div class="fixed inset-0 !z-[9999] flex items-center justify-center !overflow-hidden overflow-y-auto overflow-x-hidden !overscroll-none outline-none focus:outline-none">
          <div className="fixed inset-0 bg-black bg-opacity-25 opacity-100"></div>
          <div class="relative z-50 mt-16 flex h-full w-full max-w-md items-center justify-center p-4 md:h-auto lg:mt-0">
            <div class="relative rounded-lg bg-white shadow">
              <div class=" flex flex-col items-center p-3 text-center lg:p-6">
                <button
                  onClick={onClose}
                  className="absolute right-0 top-0 mr-4 mt-2 p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="relative left-0 top-0 h-10 w-10 cursor-pointer self-end fill-red-500 stroke-white lg:-top-2 lg:left-1"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </button>
                <img src={alert} className="w-1/2" />

                <h3 class="mb-5 text-lg font-extrabold text-gray-700 lg:text-2xl ">
                  We have created an alert with the following filters :{" "}
                </h3>
                {status && (
                  <span className="my-1 mr-2 inline-flex items-center rounded-md bg-gray-200/70 px-2 py-1 text-sm font-medium text-gray-800 outline outline-1 outline-gray-400">
                    Status:&nbsp;
                    <strong>{status}</strong>
                  </span>
                )}
                {age && (
                  <span className="my-1 mr-2 inline-flex items-center rounded-md bg-gray-200/70 px-2 py-1 text-sm font-medium text-gray-800 outline outline-1 outline-gray-400">
                    Age:&nbsp;
                    <strong>{age}</strong>
                  </span>
                )}
              </div>
              <a
                class="hover:text-info my-2 flex w-full items-center justify-center border-gray-300 align-middle text-xs font-normal text-gray-700 hover:border-gray-500 "
                href="/profile/?t=myAlerts"
              >
                <span class="self-center">View my saved searches</span>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  class="ml-2 self-center"
                  height="18"
                  width="18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AlertModal;
