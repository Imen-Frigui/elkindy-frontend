import React, { useEffect, useState } from 'react';
import StudentBanner from './studentBanner.jsx';
import { fetchStudentgrades } from '../../services/exam/examService';
import nft1 from "assets/img/nfts/grades.jpg";
import {fetchExamsGrades} from '../../services/exam/examService';
const StudentExams = () => {
    const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isDrawerOpen2, setIsDrawerOpen2] = useState(false);
    const [grades, setGrades] = useState([]);
    const [examgrades, setExamGrades] = useState([]);
    const getEvalGrades = async () => {

      try {
          const fetchgradeEvaluations = await fetchStudentgrades('65de945086e6c9f4fcc6559f');
          if (fetchgradeEvaluations) {
              console.log(fetchgradeEvaluations);
              setGrades(fetchgradeEvaluations);

          }


      } catch (error) {
          console.error("Failed to fetch classes:", error);
      }
  };


  const getExamGrades = async () => {

    try {
        const fetchgradeExam = await fetchExamsGrades('65de945086e6c9f4fcc6559f');
        if (fetchgradeExam) {
            console.log(fetchgradeExam);
            setExamGrades(fetchgradeExam);

        }


    } catch (error) {
        console.error("Failed to fetch classes:", error);
    }
};
     
    useEffect(() => {
        // Effect hook code here if needed
        getEvalGrades();
        getExamGrades();
       
    }, []);

    return (
        <>
            <div>
                <StudentBanner setIsDrawerOpen={setIsDrawerOpen} setIsDrawerOpen2={setIsDrawerOpen2}/>
            </div>

            <div className="mt-10 flex justify-center">
            <div class="card ">
  <div
    class="relative bg-kindydarkblue w-[800px] sm:w-[250] group transition-all duration-700 aspect-video flex items-center justify-center"
  >
    <div
      class="transition-all flex flex-col items-center py-5 justify-start duration-300 group-hover:duration-1000 bg-white w-full h-full absolute group-hover:-translate-y-16"
    >
      <p class="text-xl sm:text-2xl font-semibold text-gray-500 font-serif">
        Dear Student 
      </p>
      <p class="px-10 text-[10px] sm:text-[12px] text-gray-700 mt-20">
      "we are thrilled to witness your passion for music blossom each day. Your dedication and enthusiasm inspire not only us but also your fellow students. Remember, music is not just about hitting the right notes; it's about expressing emotions, telling stories, and connecting with others on a profound level. Your journey at the music conservatory is an opportunity to explore the depths of your musicality, to push boundaries, and to discover new horizons. Embrace each lesson, cherish every practice session, and above all, let your love for music guide you. I believe in your talent, your potential, and your ability to make beautiful music that will touch hearts and inspire souls. Keep shining, keep playing, and never stop pursuing your dreams. The world awaits the magic only you can create through your music."
      </p>
      <p class="font-serif text-[10px] sm:text-[12px text-gray-700">
        Wishing you a fantastic day ahead!
      </p>
      <p class="font-sans text-[10px] text-gray-700 pt-5">El Kindy</p>
    </div>
    <button
      class="seal bg-rose-500 text-red-800 w-10 aspect-square rounded-full z-40 text-[10px] flex items-center justify-center font-semibold [clip-path:polygon(50%_0%,_80%_10%,_100%_35%,_100%_70%,_80%_90%,_50%_100%,_20%_90%,_0%_70%,_0%_35%,_20%_10%)] group-hover:opacity-0 transition-all duration-1000 group-hover:scale-0 group-hover:rotate-180 border-4 border-rose-900"
    >
      open
    </button>
    <div
      class="tp transition-all duration-1000 group-hover:duration-100 bg-neutral-800 absolute group-hover:[clip-path:polygon(50%_0%,_100%_0,_0_0)] w-full h-full [clip-path:polygon(50%_50%,_100%_0,_0_0)]"
    ></div>
    <div
      class="lft transition-all duration-700 absolute w-full h-full bg-neutral-900 [clip-path:polygon(50%_50%,_0_0,_0_100%)]"
    ></div>
    <div
      class="rgt transition-all duration-700 absolute w-full h-full bg-neutral-800 [clip-path:polygon(50%_50%,_100%_0,_100%_100%)]"
    ></div>
    <div
      class="btm transition-all duration-700 absolute w-full h-full bg-neutral-900 [clip-path:polygon(50%_50%,_100%_100%,_0_100%)]"
    ></div>
  </div>
</div>

            </div>

            {isDrawerOpen && ( 

<div id="drawer-create-course" className="fixed inset-0 flex items-center justify-center z-50 overflow-auto backdrop-blur-md  my-6">
<div className="max-w-3xl sm:w-full md:w-3/4 lg:w-1/2 mx-auto relative overflow-hidden z-10 bg-white p-2 shadow-md rounded-[20px]">
    <div className="relative">
    <img src={nft1} alt="Exam Image" className="w-full rounded-t-lg mb-6" style={{ maxHeight: '200px', objectFit: 'cover', objectPosition:'50% 60%', filter: 'blur(1px)' }} />



    </div>
    <span className="bg-kindydarkblue mx-auto mb-4 inline-block h-1 w-[90px] rounded absolute bottom-0 left-1/2 transform -translate-x-1/2"></span>

    <div className="overflow-y-auto max-h-96 overflow-x-hidden px-4 pb-8">
<table className="w-full max-w-[550px] border-collapse border border-gray-700 mx-auto">
<thead>
    <tr>
        
       <th class="w-1/4 border border-kindydarkblue p-3 text-white bg-kindydarkblue">Evaluation Name</th>
        <th class="w-1/4 border border-kindydarkblue p-3 text-white bg-kindydarkblue">Grade </th>
    </tr>
</thead>
<tbody >
    {grades.length > 0 ? (
        grades.map((student, index) => (
            <tr style={{ borderWidth: '2px', borderColor:'black' }} key={index}>

                <td className="  text-center border-kindydarkblue p-4 text-sm font-normal text-kindydarkblue whitespace-nowrap dark:text-kindydarkblue">
                    <p>{student.examName}</p>
                </td>
                <td className="  text-center border-kindydarkblue p-4 text-sm font-normal text-kindydarkblue whitespace-nowrap dark:text-kindydarkblue">
                    <p>{student.grade}</p>
                </td>
               
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan="2" className="border border-kindydarkblue p-4">No grades found</td>
        </tr>
    )}
</tbody>
</table>
</div>

</div>
<div className="space-y-2 p-1.5 absolute top-2.5 right-2.5 group h-20 w-20 cursor-pointer items-center justify-center rounded-3xl p-2 hover:bg-slate-200" onClick={() => setIsDrawerOpen(false)}>
      <span className="block h-1 w-10 origin-center rounded-full bg-kindydarkblue transition-transform ease-in-out group-hover:translate-y-1.5 group-hover:rotate-45"></span>
      <span className="block h-1 w-8 origin-center rounded-full bg-orange-500 transition-transform ease-in-out group-hover:w-10 group-hover:-translate-y-1.5 group-hover:-rotate-45"></span>
      {/* Title */}
      <span className="block text-m text-center mx-5 text-orange-500">Close</span>
    </div>
</div>
             )}
     


           {isDrawerOpen2 && ( 

<div id="drawer-create-course" className="fixed inset-0 flex items-center justify-center z-50 overflow-auto backdrop-blur-md  my-6">
<div className="max-w-3xl sm:w-full md:w-3/4 lg:w-1/2 mx-auto relative overflow-hidden z-10 bg-white p-2 shadow-md rounded-[20px]">
    <div className="relative">
    <img src={nft1} alt="Exam Image" className="w-full rounded-t-lg mb-6" style={{ maxHeight: '200px', objectFit: 'cover', objectPosition:'50% 60%', filter: 'blur(1px)' }} />



    </div>
    <span className="bg-kindydarkblue mx-auto mb-4 inline-block h-1 w-[90px] rounded absolute bottom-0 left-1/2 transform -translate-x-1/2"></span>

    <div className="overflow-y-auto max-h-96 overflow-x-hidden px-4 pb-8">
<table className="w-full max-w-[550px] border-collapse border border-gray-700 mx-auto">
<thead>
    <tr>
        
       <th class="w-1/4 border border-kindydarkblue p-3 text-white bg-kindydarkblue">Exam Name</th>
        <th class="w-1/4 border border-kindydarkblue p-3 text-white bg-kindydarkblue">Grade </th>
    </tr>
</thead>
<tbody >
    {examgrades.length > 0 ? (
        examgrades.map((student, index) => (
            <tr style={{ borderWidth: '2px', borderColor:'black' }} key={index}>

                <td className="  text-center border-kindydarkblue p-4 text-sm font-normal text-kindydarkblue whitespace-nowrap dark:text-kindydarkblue">
                    <p>{student.examName}</p>
                </td>
                <td className="  text-center border-kindydarkblue p-4 text-sm font-normal text-kindydarkblue whitespace-nowrap dark:text-kindydarkblue">
                    <p>{student.grade}</p>
                </td>
               
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan="2" className="border border-kindydarkblue p-4">No grades found</td>
        </tr>
    )}
</tbody>
</table>
</div>

</div>
<div className="space-y-2 p-1.5 absolute top-2.5 right-2.5 group h-20 w-20 cursor-pointer items-center justify-center rounded-3xl p-2 hover:bg-slate-200" onClick={() => setIsDrawerOpen2(false)}>
      <span className="block h-1 w-10 origin-center rounded-full bg-kindydarkblue transition-transform ease-in-out group-hover:translate-y-1.5 group-hover:rotate-45"></span>
      <span className="block h-1 w-8 origin-center rounded-full bg-orange-500 transition-transform ease-in-out group-hover:w-10 group-hover:-translate-y-1.5 group-hover:-rotate-45"></span>
      {/* Title */}
      <span className="block text-m text-center mx-5 text-orange-500">Close</span>
    </div>
</div>
             )} 

        </>
    );
}

export default StudentExams;


