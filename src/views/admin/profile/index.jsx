import React, { useEffect, useState } from "react";
import Banner from "./components/Banner";
import General from "./components/General";
import Notification from "./components/Notification";
import Project from "./components/Project";
import Storage from "./components/Storage";
import Upload from "./components/Upload";
import axios from "axios";
import EditProfileModal from "./components/EditProfile";
import { UserSearches } from "components";
import Loader from "components/button/Loader";
import ScheduleComponent from "./components/SchedualComponent";
import { fetchUserData } from '../../../slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import StudentForm from "components/ui/StudentForm";
import { UserIcon } from "@heroicons/react/24/solid";

const ProfileOverview = () => {
  const dispatch = useDispatch();
  const { userData, isLoading, error } = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };
  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }
  console.log(userData.user);
  if (error) {
    console.error("Error fetching user data:", error);
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex w-full flex-col items-center gap-7">
      <div className="self-start">
        <button
          onClick={handleEditClick}
          className="mt-20 bg-kindyblue hover:bg-kindyorange text-white font-bold py-2 px-4 rounded-tr-2xl rounded-bl-2xl"
        >
          Edit Profile
        </button>
      </div>
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userData={userData}
      />
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-4">
          <Banner userData={userData} />
        </div>
        <div className="md:col-span-8">
          <ScheduleComponent userData={userData.user} />
        </div>
        <div className="md:col-span-6">
          <Project />
        </div>
        <div className="md:col-span-6">
          <UserSearches />
        </div>
        {userData.user.role === "student" ? <div className="md:col-span-6"><StudentForm studentId={userData.user._id} userData={userData.user} /></div> : null

        }
      </div>

    </div>
  );
};

export default ProfileOverview;
