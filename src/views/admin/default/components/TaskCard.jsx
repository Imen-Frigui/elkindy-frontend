import CardMenu from "components/card/CardMenu";
import React from "react";
import Checkbox from "components/checkbox";

import { MdDragIndicator, MdCheckCircle } from "react-icons/md";
import { FaCalendarCheck } from "react-icons/fa";



import Card from "components/card";


const TaskCard = () => {
  return (
    <Card extra="pb-7 p-[20px]">
      {/* task header */}
      <div className="relative flex flex-row justify-between">
        <div className="flex items-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-100 dark:bg-white/5">
            <FaCalendarCheck className="h-6 w-6 text-kindydarkblue dark:text-white" />
          </div>
          <h4 className="ml-4 text-xl font-bold text-navy-700 dark:text-white">
            Upcoming Events
          </h4>
        </div>
        <CardMenu />
      </div>

      {/* task content */}

      <div className="h-full w-full">
        <div className="mt-5 flex items-center justify-between p-2">
          <div className="flex items-center justify-center gap-2">
            <Checkbox />
            <p className="text-base font-bold text-navy-700 dark:text-white">
            Final Year Event
            </p>
          </div>
          <div>
            <MdDragIndicator className="h-6 w-6 text-navy-700 dark:text-white" />
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between p-2">
          <div className="flex items-center justify-center gap-2">
            <Checkbox />
            <p className="text-base font-bold text-navy-700 dark:text-white">
            Charity Event
            </p>
          </div>
          <div>
            <MdDragIndicator className="h-6 w-6 text-navy-700 dark:text-white" />
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between p-2">
          <div className="flex items-center justify-center gap-2">
            <Checkbox />
            <p className="text-base font-bold text-navy-700 dark:text-white">
            Summer Jam
            </p>
          </div>
          <div>
            <MdDragIndicator className="h-6 w-6 text-navy-700 dark:text-white" />
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between p-2">
          <div className="flex items-center justify-center gap-2">
            <Checkbox />
            <p className="text-base font-bold text-navy-700 dark:text-white">
            Final Year Party
            </p>
          </div>
          <div>
            <MdDragIndicator className="h-6 w-6 text-navy-700 dark:text-white" />
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between p-2">
          <div className="flex items-center justify-center gap-2">
            <Checkbox />
            <p className="text-base font-bold text-navy-700 dark:text-white">
            Palestine event
            </p>
          </div>
          <div>
            <MdDragIndicator className="h-6 w-6 text-navy-700 dark:text-white" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
