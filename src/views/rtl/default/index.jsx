import Navbar from "./components/front/Navbar";
import PromoSection from "./components/front/PromoSection";
import ClassSection from "./components/front/ClassSection";
import React from "react";
import EventCards from "../../../layouts/rtl/eventFrontOffice/event";

const Dashboard = () => {
  return (
      <div className="bg-[#F7F5EF]">
          <Navbar />
          <PromoSection />
          <div id="class-section" className="my-4">
            <ClassSection />
          </div>
          <EventCards className="bg-[#F7F5EF]"/>
          {/* <Header/> */}
      </div>
  );
};
export default Dashboard;
