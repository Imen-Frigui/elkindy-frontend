import React from "react";

const ShareModal = ({ isOpen, onClose }) => {
  const handleCopyLink = () => {
    const urlItem = window.location.href;
    navigator.clipboard.writeText(urlItem);

    document.getElementById("copyButton").style.display = "none";
    document.getElementById("copiedButton").style.display = "inline-block";
  };
  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-25 opacity-100"></div>
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <div
              className="\ scale-100 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle opacity-100 shadow-xl transition-all"
              id="headlessui-dialog-panel-:r4:"
              data-headlessui-state="open"
            >
              <div
                className="btn btn-sm btn-circle absolute right-2 top-2"
                onClick={onClose}
              >
                ✕
              </div>
              <h3
                className="mb-2 text-lg font-bold leading-6"
                id="headlessui-dialog-title-:r5:"
                data-headlessui-state="open"
              >
                Share item
              </h3>
              <div className="flex flex-wrap justify-center gap-6 py-4">
                <span className="bg-transparent hover:bg-slate-50 flex cursor-pointer flex-col items-center rounded-2xl px-2 py-6 text-sm font-medium">
                  <button
                    id="copyButton"
                    className="flex flex-col items-center justify-center text-blue-500"
                    onClick={handleCopyLink}
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      height="20"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z"></path>
                      <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z"></path>
                    </svg>
                    <span className="text-3xs mt-1 text-black">Copy link</span>
                  </button>
                  <span
                    className="flex flex-col items-center justify-center text-green-500"
                    id="copiedButton"
                    style={{ display: "none" }}
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      height="20"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                      <path
                        fill-rule="evenodd"
                        d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="text-3xs mt-1">Copied</span>
                  </span>
                </span>

                <button
                  aria-label="facebook"
                  className="react-share__ShareButton !bg-transparent hover:!bg-slate-50 flex !cursor-pointer flex-col items-center !rounded-2xl !px-2 !py-6 !text-sm !font-medium"
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    padding: "0px",
                    font: "inherit",
                    color: "inherit",
                    cursor: "pointer",
                  }}
                >
                  <svg viewBox="0 0 64 64" width="20" height="20">
                    <circle cx="32" cy="32" r="31" fill="#3b5998"></circle>
                    <path
                      d="M34.1,47V33.3h4.6l0.7-5.3h-5.3v-3.4c0-1.5,0.4-2.6,2.6-2.6l2.8,0v-4.8c-0.5-0.1-2.2-0.2-4.1-0.2 c-4.1,0-6.9,2.5-6.9,7V28H24v5.3h4.6V47H34.1z"
                      fill="white"
                    ></path>
                  </svg>
                  <p className="mt-1">Facebook</p>
                </button>
                <button
                  aria-label="facebookmessenger"
                  className="react-share__ShareButton !bg-transparent hover:!bg-slate-50 flex !cursor-pointer flex-col items-center !rounded-2xl !px-2 !py-6 !text-sm !font-medium"
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    padding: "0px",
                    font: "inherit",
                    color: "inherit",
                    cursor: "pointer",
                  }}
                >
                  <svg viewBox="0 0 64 64" width="20" height="20">
                    <circle cx="32" cy="32" r="31" fill="#2196F3"></circle>
                    <path
                      d="M 53.066406 21.871094 C 52.667969 21.339844 51.941406 21.179688 51.359375 21.496094 L 37.492188 29.058594 L 28.867188 21.660156 C 28.339844 21.207031 27.550781 21.238281 27.054688 21.730469 L 11.058594 37.726562 C 10.539062 38.25 10.542969 39.09375 11.0625 39.613281 C 11.480469 40.027344 12.121094 40.121094 12.640625 39.839844 L 26.503906 32.28125 L 35.136719 39.679688 C 35.667969 40.132812 36.457031 40.101562 36.949219 39.609375 L 52.949219 23.613281 C 53.414062 23.140625 53.464844 22.398438 53.066406 21.871094 Z M 53.066406 21.871094"
                      fill="white"
                    ></path>
                  </svg>
                  <p className="mt-1">Messenger</p>
                </button>
                <button
                  aria-label="whatsapp"
                  className="react-share__ShareButton !bg-transparent hover:!bg-slate-50 flex !cursor-pointer flex-col items-center !rounded-2xl !px-2 !py-6 !text-sm !font-medium"
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    padding: "0px",
                    font: "inherit",
                    color: "inherit",
                    cursor: "pointer",
                  }}
                >
                  <svg viewBox="0 0 64 64" width="20" height="20">
                    <circle cx="32" cy="32" r="31" fill="#25D366"></circle>
                    <path
                      d="m42.32286,33.93287c-0.5178,-0.2589 -3.04726,-1.49644 -3.52105,-1.66732c-0.4712,-0.17346 -0.81554,-0.2589 -1.15987,0.2589c-0.34175,0.51004 -1.33075,1.66474 -1.63108,2.00648c-0.30032,0.33658 -0.60064,0.36247 -1.11327,0.12945c-0.5178,-0.2589 -2.17994,-0.80259 -4.14759,-2.56312c-1.53269,-1.37217 -2.56312,-3.05503 -2.86603,-3.57283c-0.30033,-0.5178 -0.03366,-0.80259 0.22524,-1.06149c0.23301,-0.23301 0.5178,-0.59547 0.7767,-0.90616c0.25372,-0.31068 0.33657,-0.5178 0.51262,-0.85437c0.17088,-0.36246 0.08544,-0.64725 -0.04402,-0.90615c-0.12945,-0.2589 -1.15987,-2.79613 -1.58964,-3.80584c-0.41424,-1.00971 -0.84142,-0.88027 -1.15987,-0.88027c-0.29773,-0.02588 -0.64208,-0.02588 -0.98382,-0.02588c-0.34693,0 -0.90616,0.12945 -1.37736,0.62136c-0.4712,0.5178 -1.80194,1.76053 -1.80194,4.27186c0,2.51134 1.84596,4.945 2.10227,5.30747c0.2589,0.33657 3.63497,5.51458 8.80262,7.74113c1.23237,0.5178 2.1903,0.82848 2.94111,1.08738c1.23237,0.38836 2.35599,0.33657 3.24402,0.20712c0.99159,-0.15534 3.04985,-1.24272 3.47963,-2.45956c0.44013,-1.21683 0.44013,-2.22654 0.31068,-2.45955c-0.12945,-0.23301 -0.46601,-0.36247 -0.98382,-0.59548m-9.40068,12.84407l-0.02589,0c-3.05503,0 -6.08417,-0.82849 -8.72495,-2.38189l-0.62136,-0.37023l-6.47252,1.68286l1.73463,-6.29129l-0.41424,-0.64725c-1.70875,-2.71846 -2.6149,-5.85116 -2.6149,-9.07706c0,-9.39809 7.68934,-17.06155 17.15993,-17.06155c4.58253,0 8.88029,1.78642 12.11655,5.02268c3.23625,3.21036 5.02267,7.50812 5.02267,12.06476c-0.0078,9.3981 -7.69712,17.06155 -17.14699,17.06155m14.58906,-31.58846c-3.93529,-3.80584 -9.1133,-5.95471 -14.62789,-5.95471c-11.36055,0 -20.60848,9.2065 -20.61625,20.52564c0,3.61684 0.94757,7.14565 2.75211,10.26282l-2.92557,10.63564l10.93337,-2.85309c3.0136,1.63108 6.4052,2.4958 9.85634,2.49839l0.01037,0c11.36574,0 20.61884,-9.2091 20.62403,-20.53082c0,-5.48093 -2.14111,-10.64081 -6.03239,-14.51915"
                      fill="white"
                    ></path>
                  </svg>
                  <p className="mt-1">Whatsapp</p>
                </button>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareModal;
