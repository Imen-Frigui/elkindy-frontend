
import nft1 from "assets/img/nfts/teacherViolan.jpg";
import React, {  useState } from 'react';
import { Link } from 'react-router-dom';
import TableEvalution from './table.jsx';

import ClassBanner from './table.jsx';


const TeacherBanner = ({filteredStudents ,ButtonComponent ,setIsDrawerOpen2 , setstudents , setUserName ,setIsDrawerOpen ,setstudentName , AllClasses}) => {

  const [isDrawerOpenAdd, setIsDrawerOpenAdd] = useState(false);
  const [isDrawerOpenexam, setIsDrawerOpenexam] = useState(false);
  return (
    <div className="mt-8 flex w-full flex-col rounded-[20px] bg-cover px-[30px] py-[50px] md:px-[50px] md:py-[340px] relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center " style={{ backgroundImage: `url(${nft1})`, filter: 'blur(4px)', borderRadius: '20px' }}></div>
      <div class="flex"  >
  <div className="w-full relative z-10 ml-64">
    <h4 className="mb-[14px] max-w-full text-xl font-bold text-white md:w-[64%] md:text-3xl md:leading-[42px] lg:w-[46%] xl:w-[85%] 2xl:w-[75%] 3xl:w-[52%]">
      Evaluations Section .....
    </h4>
    <p className="mb-[40px] max-w-full text-base font-medium text-gray-100 md:w-[64%] lg:w-[40%] xl:w-[72%] 2xl:w-[60%] 3xl:w-[45%]"> 
      Explore All Evaluation 
    </p>
 
    <div className="mt-[36px] flex items-center justify-between gap-4 sm:justify-start 2xl:gap-10">
     
        <button className="text-black linear rounded-xl bg-white px-4 py-2 text-center text-base font-medium transition duration-200 hover:!bg-white/80 active:!bg-white/70" onClick={() => { setIsDrawerOpenAdd(true);}}>
         Add an Evaluation
        </button>
        {isDrawerOpenAdd && (
          <div id="drawer-create-course" className="fixed inset-0 flex items-center justify-center z-50 overflow-auto backdrop-blur-md">
            <div className="overflow-hidden shadow sm:rounded-lg mt-4 w-3/6 relative">
              <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundColor :'white', borderRadius: '20px', filter: 'blur(5px)', opacity: '0.4' }}></div>
              <div className="z-10 relative">
                <TableEvalution filteredStudents={filteredStudents} ButtonComponent={ButtonComponent} setIsDrawerOpen2={setIsDrawerOpen2} setstudents={setstudents} setUserName={setUserName} setIsDrawerOpen={setIsDrawerOpen} setstudentName={setstudentName} AllClasses={AllClasses} />
              </div>
            </div>
            {/* Close button */}
            <div className="space-y-2 p-1.5 absolute top-32 right-40 group h-20 w-20 cursor-pointer items-center justify-center rounded-3xl p-2 hover:bg-slate-200" onClick={() => setIsDrawerOpenAdd(false)}>
              <span className="block h-1 w-10 origin-center rounded-full bg-kindydarkblue transition-transform ease-in-out group-hover:translate-y-1.5 group-hover:rotate-45"></span>
              <span className="block h-1 w-8 origin-center rounded-full bg-orange-500 transition-transform ease-in-out group-hover:w-10 group-hover:-translate-y-1.5 group-hover:-rotate-45"></span>
              {/* Title */}
              <span className="block text-m text-center mx-5 text-orange-500">Close</span>
            </div>
          </div>
        )}
    </div>
  </div>

  <div className="w-full relative  -ml-16 ">
    <h4 className="mb-[14px] max-w-full text-xl font-bold text-white md:w-[64%] md:text-3xl md:leading-[42px] lg:w-[46%] xl:w-[85%] 2xl:w-[75%] 3xl:w-[52%]">
        Exams section ...
    </h4>
    <p className="mb-[40px] max-w-full text-base font-medium text-gray-100 md:w-[64%] lg:w-[40%] xl:w-[72%] 2xl:w-[60%] 3xl:w-[45%]"> 
        Explore All the Exams 
    </p>

    <div className="mt-[36px] flex items-center justify-center gap-4 sm:justify-start 2xl:gap-10">
    <Link to="/admin/teacher/examClass">
        <button className="text-black linear rounded-xl bg-white px-4 py-2 text-center text-base font-medium transition duration-200 hover:!bg-white/80 active:!bg-white/70" onClick={() => { setIsDrawerOpenexam(true);}}>
        Exams grades
        </button>
        </Link>
    </div>

    
  </div>

      </div>
    </div>
  );
};



export default TeacherBanner;

