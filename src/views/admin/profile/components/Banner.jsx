import React, { useState, useEffect } from "react";
import avatarPlaceholder from "assets/img/1d04a87b8e6cf2c3829c7af2eccf6813.jpg"; // Default avatar
import banner from "assets/img/profile/banner.png";
import Card from "components/card";
import axios from "axios";

const Banner = ({ userData }) => {
  const [avatar, setAvatar] = useState(userData.user.image || avatarPlaceholder);
  const [userBanner, setUserBanner] = useState(banner);

  useEffect(() => {
    if (userData.user.banner) {
      // Assuming userData.user.banner contains the URL of the user's banner image
      setUserBanner(userData.user.banner);
    }
  }, [userData.user.banner]);

  const handleAvatarDoubleClick = () => {
    document.getElementById('avatarInput').click();
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      // FormData to encapsulate the file for sending
      const formData = new FormData();
      formData.append('image', file);

      try {
        // Adjust the URL and endpoint as necessary
        const response = await axios.patch(`http://localhost:3000/api/users/${userData.user._id}/upload-image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            // Include other headers as necessary, e.g., Authorization if required
          },
        });

        // Assuming the response includes the updated user data with the new avatar URL
        setAvatar(response.data.profilePic);
        window.location.reload()
      } catch (error) {
        console.error('Error uploading image:', error);
        // Handle error, e.g., show a notification to the user
      }
    }
  };

  return (
    <Card extra={"items-center w-full h-full p-[16px] bg-cover"}>
      <div
        className="relative mt-1 flex h-32 w-full items-end justify-center rounded-xl bg-cover"
        style={{ backgroundImage: `url(${userBanner})` }}
      >
        <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
          <img
            className="h-full w-full rounded-full"
            src={avatar}
            alt="User Avatar"
            onDoubleClick={handleAvatarDoubleClick}
          />
          <input type="file" id="avatarInput" style={{ display: 'none' }} onChange={handleAvatarChange} accept="image/*" />
        </div>
      </div>
      {/* Name and position */}
      <div className="mt-20 flex flex-col items-center">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          {userData.user.firstName} {userData.user.lastName}
        </h4>
        <p className="text-base font-normal text-gray-600">
          {userData.user.role}
        </p>
      </div>
      <div className="text-center">
        <p className="text-xl font-bold text-navy-700 dark:text-white">Email</p>
        <p className="text-lg font-normal text-gray-600">
          {userData.user.email}
        </p>
      </div>

      {/* Email, Phone, Joined Date */}
      <div className="mb-3 mt-6 flex justify-center gap-7">
        <div className="text-center">
          <p className="text-xl font-bold text-navy-700 dark:text-white">
            Joined
          </p>
          <p className="text-lg font-normal text-gray-600">
            {new Date(userData.user.registrationDate).toLocaleDateString()}
          </p>
        </div>

        <div className="text-center">
          <p className="text-xl font-bold text-navy-700 dark:text-white">
            Phone
          </p>
          <p className="text-lg font-normal text-gray-600">
            {userData.user.phoneNumber}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default Banner;
