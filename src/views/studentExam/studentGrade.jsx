import React, { useEffect, useState } from 'react';
import StudentBanner from './studentBanner.jsx';
import { fetchStudentgrades } from '../../services/exam/examService';
import nft1 from "assets/img/nfts/grades.jpg";
import {fetchExamsGrades} from '../../services/exam/examService';
import {fetchObservations} from '../../services/exam/examService';
import {teacherUsername} from '../../services/exam/examService';
import io from 'socket.io-client';
import ApexCharts from 'apexcharts';
import { Carousel,IconButton } from "@material-tailwind/react";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
//
import SwipeableViews from 'react-swipeable-views';
/**const CustomArrow = ({ direction, onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      style={{ color: 'blue' }} // Change the color here
    >
      {direction === 'left' ? <ChevronLeft /> : <ChevronRight />}
    </IconButton>
  );
};*/
const StudentExams = ({ studentId }) => {
    const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isDrawerOpen2, setIsDrawerOpen2] = useState(false);
    const [isDrawerOpen3, setIsDrawerOpen3] = useState(false);
    const [grades, setGrades] = useState([]);
    const [username, setUsername] = useState({});
    const [examgrades, setExamGrades] = useState([]);
    const [observations, setObservations] = useState([]);
    const [socket, setSocket] = useState(null);
    const [id, setId] = useState('');
    const colors = ['bg-kindydarkblue ', 'bg-blue-500', 'bg-blue-300'];
    
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


  const getTeacherUserName = async () => {
   
    try {
        const fetchUsername = await teacherUsername(id);
        if (fetchUsername) {
            console.log(fetchUsername);
            setUsername(fetchUsername);
            console.log(username.username);
            console.log(id);
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



const getChartOptions = () => {
    return {
      series: [52.8, 26.8, 20.4],
      colors: ["#1C64F2", "#16BDCA", "#9061F9"],
      chart: {
        height: 420,
        width: "100%",
        type: "pie",
      },
      stroke: {
        colors: ["white"],
        lineCap: "",
      },
      plotOptions: {
        pie: {
          labels: {
            show: true,
          },
          size: "100%",
          dataLabels: {
            offset: -25
          }
        },
      },
      labels: ["Direct", "Organic search", "Referrals"],
      dataLabels: {
        enabled: true,
        style: {
          fontFamily: "Inter, sans-serif",
        },
      },
      legend: {
        position: "bottom",
        fontFamily: "Inter, sans-serif",
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return value + "%"
          },
        },
      },
      xaxis: {
        labels: {
          formatter: function (value) {
            return value  + "%"
          },
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
    }
  }
  
  if (document.getElementById("pie-chart") && typeof ApexCharts !== 'undefined') {
    const chart = new ApexCharts(document.getElementById("pie-chart"), getChartOptions());
    chart.render();
  };
  



const getObservations = async () => {

    try {
        const fetchObserv = await fetchObservations('65de945086e6c9f4fcc6559f');
        if (fetchObserv) {
            console.log(fetchObserv);
           // setObservations(fetchObserv);
                  
        }
      
        fetchObserv.map(async (observation,index) => {
console.log("innnnnn")
          const fetchUsername = await teacherUsername(observation.teacher);
          if (fetchUsername) {
            fetchObserv[index].teacher=fetchUsername.username
              console.log(fetchUsername.username);
              
          }
        });
        setObservations(fetchObserv);


    } catch (error) {
        console.error("Failed to fetch classes:", error);
    }
};
     
    useEffect(() => {
        // Effect hook code here if needed
        getEvalGrades();
        getExamGrades();
        getObservations();
        getTeacherUserName();
        const socket = io('http://localhost:5000');
        setSocket(socket);
        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
       
    }, [id]);

    return (
        <>
         
            <div>
                <StudentBanner setIsDrawerOpen={setIsDrawerOpen} setIsDrawerOpen2={setIsDrawerOpen2} setIsDrawerOpen3={setIsDrawerOpen3} setId={setId} />
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

{isDrawerOpen3 && (
   <div className="fixed inset-0 z-50 overflow-auto backdrop-blur-md flex justify-center items-center">
<div className="max-w-3xl sm:w-full md:w-3/4 lg:w-1/2 mx-auto relative overflow-hidden z-10 bg-white p-2 shadow-md rounded-[20px]">
    <div className="relative">
    <div className="my-1" style={{
      backgroundImage: 'url("https://img.freepik.com/free-vector/blue-baner-design-white-background_1308-91057.jpg?t=st=1714436946~exp=1714440546~hmac=ebd8e93e99bf905c907f542925ef628df6d46a7aec6eeb8b7b88879a05c7ea06&w=1380")',
      backgroundSize: 'cover',
      backgroundPosition: 'center top -80px', // Adjust the 'top' value to move the image up
      backgroundRepeat: 'no-repeat'
    }}>

      {/* Titre "OBSERVATIONS" */}
      <h2 className="text-center text-xl font-bold mb-4 relative">
        
      </h2>
      {/* Reste du contenu */}
      {/* Image */}
      <Carousel 
        enableMouseEvents 
        className="w-96"
        prevArrow={({ handlePrev }) => (
          <IconButton
            variant="text"
            color="black"
            size="lg"
            onClick={handlePrev}
            className="!absolute top-2/4 left-7 -translate-y-2/4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 "
              />
            </svg>
          </IconButton>
        )}
        nextArrow={({ handleNext }) => (
          <IconButton
            variant="text"
            color="black"
            size="lg"
            onClick={handleNext}
            className="!absolute top-2/4 !right-7 -translate-y-2/4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 "
              />
            </svg>
          </IconButton>
        )}
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 w-80 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? "w-8 bg-black" : "w-4 bg-kindydarkblue/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        {observations.map((observation, index) => (
          <div key={index} className="flex items-center justify-center w-96">
            <div className={`relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md overflow-hidden hover:shadow-lg hover:shadow-blue-gray-500/40  p-4 ${colors[index % colors.length]} card-compact hover:bg-base-200 transition-all duration-200 box-shadow:12px_12px hover:box-shadow:4px_4px`}>
              <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-kindyblue to-kindydarkblue">
              <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased absolute bottom-0 left-0 p-6">
  <img src="https://media.istockphoto.com/id/1446149384/photo/3d-illustration-of-handsome-afro-man-david-signing-contract-with-big-pen-online-deal-and-e.jpg?s=612x612&w=0&k=20&c=uo9uLa_Afowyp8jJyCFiWHoL3UtEq3HRWNsLzO3PjPE=" alt="Teacher" className="h-16 w-20 mr-2" />
   your teacher: {observation.teacher}
</h5>

              </div>
              <div className="p-6">
                <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                  {observation.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
      <div className="space-y-2 p-1.5 absolute top-2.5 right-2.5 group h-20 w-20 cursor-pointer items-center justify-center rounded-3xl p-2 hover:bg-slate-200" onClick={() => setIsDrawerOpen3(false)}>
      <span className="block h-1 w-10 origin-center rounded-full bg-kindydarkblue transition-transform ease-in-out group-hover:translate-y-1.5 group-hover:rotate-45"></span>
      <span className="block h-1 w-8 origin-center rounded-full bg-kindydarkblue transition-transform ease-in-out group-hover:w-10 group-hover:-translate-y-1.5 group-hover:-rotate-45"></span>
      {/* Title */}
      <span className="block text-m text-center mx-5 text-kindyblue">Close</span>
    </div>
    </div>
  </div> </div></div>
)}









        </>
    );
}

export default StudentExams;


