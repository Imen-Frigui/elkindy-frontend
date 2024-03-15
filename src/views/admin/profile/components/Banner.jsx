import React, { useEffect, useState } from "react";
import avatar from "assets/img/avatars/avatar11.png";
import banner from "assets/img/profile/banner.png";
import Card from "components/card";
import axios from "axios";

const Banner = ({ userData }) => {


  return (
    <Card extra={"items-center w-full h-full p-[16px] bg-cover"}>
    {/* Background and profile */}
    <div
      className="relative mt-1 flex h-32 w-full items-end justify-center rounded-xl bg-cover"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
        <img className="h-full w-full rounded-full" src={avatar} alt="User Avatar" />
      </div>
    </div>
  
    {/* Name and position */}
    <div className="mt-20 flex flex-col items-center">
      <h4 className="text-xl font-bold text-navy-700 dark:text-white">
        {userData.user.firstName} {userData.user.lastName}
      </h4>
      <p className="text-base font-normal text-gray-600">{userData.user.role}</p>
    </div>
    <div className="text-center">
        <p className="text-xl font-bold text-navy-700 dark:text-white">Email</p>
        <p className="text-lg font-normal text-gray-600">{userData.user.email}</p>
      </div>
  
    {/* Email, Phone, Joined Date */}
    <div className="mt-6 mb-3 flex justify-center gap-7">
  
   
      <div className="text-center">
        <p className="text-xl font-bold text-navy-700 dark:text-white">Joined</p>
        <p className="text-lg font-normal text-gray-600">{new Date(userData.user.registrationDate).toLocaleDateString()}</p>
      </div>
   
      <div className="text-center">
        <p className="text-xl font-bold text-navy-700 dark:text-white">Phone</p>
        <p className="text-lg font-normal text-gray-600">{userData.user.phoneNumber}</p>
      </div>   
     
     
      
    </div>
  </Card>
  
  );
};

export default Banner;
