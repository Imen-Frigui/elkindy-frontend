import { HiX } from "react-icons/hi";
import Links from "./sidebar/components/Links";
import routes from "StudentRoutes.js";

function SideBarrStudent({ open, onClose }) {
  const studentRoutes = routes.filter(route => route.layout === "/student");  return (
    <>
      <div
        className={`sm:none  duration-175 linear fixed left-0 !z-50 flex h-screen items-center justify-center bg-kindygray  transition-all dark:!bg-navy-900 md:!z-50 lg:!z-50 xl:!z-0  ${
          open ? "translate-x-0" : "-translate-x-96"
        } `}
      >
        <span
          className="absolute top-4  right-4 block cursor-pointer xl:hidden"
          onClick={onClose}
        >
          <HiX />
        </span>
        <div className="ml-6 flex w-12 flex-col  items-center space-y-10 py-6">
          <div className="border-kindyOrange h-screen space-y-48 rounded-tl-[40px]  rounded-br-[40px] border-2 bg-kindyStudentBlue pt-5 dark:!bg-navy-900 ">
            {" "}
            <Links routes={studentRoutes} />
            <div className="flex items-center justify-center pb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6 cursor-pointer text-white hover:hover:text-kindyyellow"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBarrStudent;
