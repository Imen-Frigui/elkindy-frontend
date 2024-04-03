import React from "react";
import CategoriesComponent from "./CategoriesComponent";
import Calender from "./Calnder";

const SideBar = ({ categories }) => (
    <aside className="w-1/4">
        <CategoriesComponent />
        <Calender />
    </aside>
);
export default SideBar;