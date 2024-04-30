import React, { useEffect, useState } from 'react';
import { fetchClassesTeacher } from '../../services/exam/examService';
import ButtonComponent from "../../components/button/ButtonComponnent";
import { fetchStudentClasses } from '../../services/exam/examService';
import { createObs } from '../../services/exam/examService';
import { fetchstudentObs } from '../../services/exam/examService';
import { fetchObservations } from '../../services/exam/examService';
import nft1 from "assets/img/nfts/teacherViolan.jpg";

const Observationclass = ({ setIsDrawerOpenClass }) => {

  const [teacherClasses, setTeacherClasses] = useState([]);
  const [isDrawerOpen4, setIsDrawerOpen4] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [text, setText] = useState('');
  const [studentclass, setStudentclass] = useState({});
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [observation, setObservation] = useState([]);
  const [student, setStudent] = useState();
  const [teacher, setTeacher] = useState();
  const [description, setDescription] = useState('');

  const [studentobs, setStudentobs] = useState();


  const handleDrawerClose = () => setIsDrawerOpen4(false);
  const handleAddObs2 = async (examData) => {
    try {
      const newExam = await createObs(examData);
      console.log('New exam added:', newExam);

      // Mettre à jour la liste des examens avec le nouvel examen ajouté
      setObservation(observation => [...observation, newExam]);

      // Mettre à jour la liste filtrée pour refléter les changements
    } catch (error) {
      console.error('Error adding exam:', error);
    }
  };

  const handleAddObs = async (event) => {
    event.preventDefault();

    try {
      const student = studentobs;
      const teacher = "6601738a95f6e1c274e23004";
      const examData = { student, teacher, description };
      // Utiliser les valeurs correctes des états
      await handleAddObs2(examData);
      console.log('New exam added:', examData);
      // Faire quelque chose avec le nouvel examen ajouté, par exemple actualiser la liste des examens
      handleDrawerClose();
    } catch (error) {
      console.error('Error adding exam:', error);
    }
  };

  const getclassStudents = async () => {
    try {
      const fetchstudents = await fetchStudentClasses(name); // Assurez-vous que name est correctement passé
      if (fetchstudents) { // Utilisez fetchstudents plutôt que fetchStudentClasses pour vérifier s'il y a des étudiants
        console.log(fetchstudents);
        setStudentclass(fetchstudents);
      }
    } catch (error) {
      console.error("Failed to fetch classes:", error);
    }
  };


  const getObsStudent = async () => {

    try {
      const fetchObs = await fetchstudentObs(username);
      if (fetchObs) {
        console.log(fetchObs);
        setStudentobs(fetchObs);

      }


    } catch (error) {
      console.error("Failed to fetch classes:", error);
    }
  };

  const getTeacherClasses = async () => {

    try {
      const fetchClasses = await fetchClassesTeacher();
      if (fetchClassesTeacher) {
        console.log(fetchClasses);
        setTeacherClasses(fetchClasses);

      }


    } catch (error) {
      console.error("Failed to fetch classes:", error);
    }
  };

  const handleEmojiClick = (emoji) => {
    setDescription(description + emoji); // Append emoji to the current description
  };



  useEffect(() => {
    getTeacherClasses();
    if (name) {
      getclassStudents();

    }
    getObsStudent();
  }, [name, username]);

  return (
    <>
     <div className={`relative flex justify-center  ${isDrawerOpen ? 'backdrop-blur-lg' : ''}`}>
  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 w-full max-w-[550px]">
          <thead className="bg-gray-50 dark:bg-gray-700 mx-10">
            <tr className="" >
              <th scope="col" className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white mx-11">ClassName</th>
              <th scope="col" className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">Show Students</th>

            </tr>
          </thead>
          <tbody className="bg-opacity-5 dark:bg-gray-800 max-h-96">
            {teacherClasses.map(student => (
              <tr key={student._id} role="row">
                <td className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-kindydarkblue">
                  <p className="font-bold">{student.name}</p>
                </td>

                <td className="p-4 whitespace-nowrap">
                  <ButtonComponent text="Show" color="rgb(12 75 101 / var(--tw-text-opacity))" onClick={() => {
                    setIsDrawerOpen(true);
                    setName(student.name);
                    //setIsDrawerOpenClass(false)

                  }} >
                    Show Students
                  </ButtonComponent>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isDrawerOpen && (
        <div id="drawer-create-course" className="fixed inset-0 flex items-center justify-center z-50 overflow-auto backdrop-blur-3xl  my-6">
          <div className="overflow-hidden shadow sm:rounded-lg mt-4 w-3/6 relative  ">
            <img
              src="https://img.freepik.com/free-vector/kids-playing-musical-instrument_1308-100231.jpg?t=st=1713644480~exp=1713648080~hmac=82a7978915aea997c3d05360feaf120536622b4ee265a092c4a2bd62a18cbdcb&w=1380"
              alt="Exam Image"
              className="w-full rounded-lg mb-2 mt-6"
            />


            <div className="z-10 relative">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 bg-baground">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr className="">
                    <th scope="col" className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">Students</th>
                    <th scope="col" className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">Take Note</th>
                  </tr>
                </thead>
                <tbody className="bg-opacity-5 dark:bg-gray-800 max-h-96">
                  {studentclass && studentclass.students && studentclass.students.map(student => (
                    <tr key={student}>
                      <td className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-kindydarkblue">
                        <p className="font-bold">{student}</p>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <ButtonComponent text="Take Note" color="rgb(12 75 101 / var(--tw-text-opacity))" onClick={() => { setIsDrawerOpen4(true); setUsername(student) }}>
                          Observation
                        </ButtonComponent>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div></div>


          <div className="space-y-2 p-1.5 absolute top-32 right-40 group h-20 w-20 cursor-pointer items-center justify-center rounded-3xl p-2 hover:bg-slate-200" onClick={() => setIsDrawerOpen(false)}>
            <span className="block h-1 w-10 origin-center rounded-full bg-kindydarkblue transition-transform ease-in-out group-hover:translate-y-1.5 group-hover:rotate-45"></span>
            <span className="block h-1 w-8 origin-center rounded-full bg-orange-500 transition-transform ease-in-out group-hover:w-10 group-hover:-translate-y-1.5 group-hover:-rotate-45"></span>
            {/* Title */}
            <span className="block text-m text-center mx-5 text-orange-500">Close</span>
          </div>
        </div>
      )}

      {isDrawerOpen4 && (
        <div id="drawer-create-course" className="fixed inset-0 flex items-center justify-center z-50 overflow-auto backdrop-blur-md">
          <div className="bg-cover bg-center h-full w-full absolute inset-0" style={{ backgroundImage: `url('')` }}></div>
          <div className="space-y-2 p-1.5 absolute top-3.5 right-2.5 group h-20 w-20 cursor-pointer items-center justify-center rounded-3xl p-2 hover:bg-slate-200 p-4" onClick={() => setIsDrawerOpen4(false)}>
            <span className="block h-1 w-10 origin-center rounded-full bg-kindydarkblue transition-transform ease-in-out group-hover:translate-y-1.5 group-hover:rotate-45"></span>
            <span className="block h-1 w-8 origin-center rounded-full bg-orange-500 transition-transform ease-in-out group-hover:w-10 group-hover:-translate-y-1.5 group-hover:-rotate-45"></span>
            {/* Title */}
            <span className="block text-m text-center mx-5 text-orange-500">Close</span>
          </div>
          <form onSubmit={handleAddObs}>
            <div className="bg-slate-800 bg-opacity-90 border border-slate-700 grid grid-cols-6 gap-2 rounded-xl p-2 text-sm relative w-96">
              <h1 className="text-center text-slate-600 text-xl font-bold col-span-6">Send Observation</h1>
              <div className="col-span-6">
                <textarea
                  className="bg-slate-700 text-slate-300 h-28 placeholder-slate-300 placeholder-opacity-50 border border-slate-600 w-full resize-none outline-none rounded-lg p-2 duration-300 focus:border-slate-300"
                  placeholder="Your observation..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              {/* Boutons avec emojis */}
              <button
                type="button" 
                className="col-span-1 flex justify-center items-center rounded-lg p-2 duration-300 bg-slate-700 hover:border-slate-300 focus:bg-blue-600 border border-slate-600"
                onClick={() => handleEmojiClick('😄')} // Insérer l'emoji 😄
              >
                😄
              </button>
              <button
                type="button" 
                className="col-span-1 flex justify-center items-center rounded-lg p-2 duration-300 bg-slate-700 hover:border-slate-300 focus:bg-blue-600 border border-slate-600"
                onClick={() => handleEmojiClick('😔')} // Insérer l'emoji 😔
              >
                😔
              </button>

              <button type="submit" className="col-span-2 stroke-slate-300 bg-slate-700 stroke-blue-200 bg-blue-600 border border-slate-600 rounded-lg p-2 duration-300 flex justify-center items-center" >
                <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
                  <path d="M7.39999 6.32003L15.89 3.49003C19.7 2.22003 21.77 4.30003 20.51 8.11003L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.91999 14.08L7.39999 13.24C1.68999 11.34 1.68999 8.23003 7.39999 6.32003Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M10.11 13.6501L13.69 10.0601" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}






    </>
  );




}
export default Observationclass;