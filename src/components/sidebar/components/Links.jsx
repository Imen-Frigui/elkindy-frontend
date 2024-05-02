/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DashIcon from "components/icons/DashIcon";
import axios from "axios";
import routes from "../../../routes";
import { fetchUserData } from "../../../slices/userSlice";
import Loader from "../../button/Loader";
import { useDispatch, useSelector } from "react-redux";
// chakra imports

export function SidebarLinks(props) {
  // Chakra color mode
  let location = useLocation();
  const dispatch = useDispatch();
  const [teacherId, setTeacherId] = useState(null);
  const { userData, isLoading, error } = useSelector((state) => state.user);

  const { routes } = props;



  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
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
        const response = await axios.get('https://elkindy-backend.onrender.com/api/auth/validateSession', config);
        setUserData(response.data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    if (!userData) {
      fetchUserData().then(r => console.log(r, 'userData', userData));
    }

  }, [userData]);

  const isTeacher = userData?.user?.role === 'teacher';
  const isAdmin = userData?.user?.role === 'admin';

  console.log('isTeacher', isTeacher);

  const createLinks = (routes) => {
    return routes.map((route, index) => {
      if (
        route.layout === "/admin" ||
        route.layout === "/auth" ||
        route.layout === "/rtl" ||
        route.layout === "/student"
      ) {
        return (
          <Link key={index} to={route.layout + "/" + route.path}>
            {/* <div className="relative mb-2 mt-10 flex hover:cursor-pointer"> */}
            <li
              className={`${activeRoute(route.path) === true
                ? `flex cursor-pointer items-center p-3 justify-center rounded-3xl space-y-5 mt-3 ml-1 mr-1 ${isTeacher ? 'bg-kindyblue text-white' : isAdmin ? 'bg-kindyorange text-white' : 'bg-kindyorange'
                }`
                : `flex cursor-pointer items-center p-5 space-y-5 mt-3 ml-1 mr-1 ${isTeacher ? 'bg-kindyorange' : isAdmin ? 'bg-kindyblue' : 'bg-kindydarkblue'
                }`
                }`}
              key={index}
            >
              <span
                className={`${activeRoute(route.path) === true
                  ? `font-bold ${isTeacher ? "text-white" : "text-white items-center "} dark:text-white`
                  : "font-medium text-white"
                  }`}
              >
                {route.icon ? route.icon : <DashIcon />}{" "}
              </span>
            </li>
            {/* {activeRoute(route.path) === true ? (
                <div class={`absolute right-0 top-px h-9 w-1 rounded-lg ${isTeacher ? "bg-kindyblue" : "bg-kindyorange"} dark:bg-brand-400`} />
              ) : null} */}
            {/* </div> */}
          </Link>
          /*<Link key={index} to={route.layout + "/" + route.path}>
          <div className="relative mb-2 mt-10 flex hover:cursor-pointer">
            <li
              className="my-[3px] flex cursor-pointer items-center px-4"
              key={index}
            >
              <span
                className={`${
                  activeRoute(route.path) === true
                    ? "font-bold text-kindyorange dark:text-white"
                    : "font-medium text-white"
                }`}
              >
                {route.icon ? route.icon : <DashIcon />}{" "}
              </span>
            </li>
            {activeRoute(route.path) ? (
              <div class="absolute right-0 top-px h-9 w-1 rounded-lg bg-kindyorange dark:bg-brand-400" />
            ) : null}
          </div>
        </Link>*/
        );
      }
    });
  };
  // BRAND
  return createLinks(routes);
}

export default SidebarLinks;
