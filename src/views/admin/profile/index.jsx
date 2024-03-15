import { useEffect, useState } from "react";
import Banner from "./components/Banner";
import General from "./components/General";
import Notification from "./components/Notification";
import Project from "./components/Project";
import Storage from "./components/Storage";
import Upload from "./components/Upload";
import axios from "axios";
import EditProfileModal from "./components/EditProfile";

const ProfileOverview = () => {

  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };


  useEffect(() => {
    const fetchUserData = async () => {
      try {
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

        const response = await axios.get('http://localhost:3000/api/auth/validateSession', config);
        //validate session hia eli ta3tik el user info ki ta3tiha token!!
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>; // Or any other fallback UI
  }

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
        <div className="col-span-4 lg:!mb-0">
          <Banner userData={userData}  />
        </div>

        <div className="col-span-3 lg:!mb-0">
          <Storage />
        </div>

        <div className="z-0 col-span-5 lg:!mb-0">
          <Upload />
        </div>
      </div>
      {/* all project & ... */}

      <div className="grid h-full grid-cols-1 gap-5 lg:!grid-cols-12">
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-4">
          <Project />
        </div>
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5">
          <General />
        </div>

        <div className="col-span-5 lg:col-span-12 lg:mb-0 3xl:!col-span-3">
          <Notification />
        </div>
        <div>
  <button onClick={handleEditClick}>Edit Profile</button>
  <EditProfileModal 
    isOpen={isModalOpen} 
    onClose={() => setIsModalOpen(false)} 
    userData={userData} 
  />
</div>
      </div>
      
    </div>
  );
};

export default ProfileOverview;
