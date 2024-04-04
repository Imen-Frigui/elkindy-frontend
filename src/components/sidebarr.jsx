import { HiX } from "react-icons/hi";
import Links from "./sidebar/components/Links";
import routes from "routes.js";
import {useEffect, useState} from "react";
import axios from "axios";
import { useSelector} from "react-redux";


function SideBarr({ open, onClose }) {
  const [userData, setUserData] = useState(null);

  const [filteredRoutes, setFilteredRoutes] = useState(routes);


  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);



  const getRoutesForRole = (routes, role) => {
    if (role === 'teacher') {
      const teacherPaths = ['default',  'teacher', 'Schedule'];
      return routes.filter(route => teacherPaths.includes(route.path));
    } else {
      const adminPath = ['default',  'admin', 'marketplace', 'data-tables', 'profile', 'exams', 'events', 'courses', 'assign-teachers', 'class-config', 'create-instrument', 'instrument-detail', 'event-details', 'update-event', 'archived-events', 'users' ];
      return routes.filter(route => adminPath.includes(route.path));
    }
    //return routes;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.get('http://localhost:3000/api/auth/validateSession', config);
        setUserData(response.data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    if (!userData) {
      fetchUserData().then(r => console.log(r, 'userData', userData));
    }
    if (userData) {
      const roleRoutes = getRoutesForRole(routes, userData.user?.role);
      setFilteredRoutes(roleRoutes);
    }
  }, [userData]);

  const isTeacher = userData?.user?.role === 'teacher';
  console.log('isTeacher', isTeacher);
  return (
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
        <div class="ml-6 flex w-12 flex-col  items-center space-y-10 py-6">

          <div className={`border-2 h-screen space-y-48 pt-5 rounded-tl-[40px] rounded-br-[40px] ${
              isTeacher ? 'bg-kindyorange border-kindyorange' : 'bg-kindyblue border-kindyblue'
          } dark:!bg-navy-900`}>            {" "}
            { /* <Links routes={routes}/> */}
            <Links routes={filteredRoutes} />
            <div class="flex items-center justify-center pb-2">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                stroke-width="1.5"
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

export default SideBarr;
