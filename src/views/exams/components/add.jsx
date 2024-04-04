import React, { useEffect, useState } from 'react';

import { fetchClasses } from '../../../services/exam/examService';
import ButtonComponent from "../../../components/button/ButtonComponnent";
const AddExam = ({ setIsDrawerOpen, handleAddExam, setExamName, name, startDate, setExamStartDate, startHour, setExamStartHour, duration, setExamDuration, teachers, setExamTeachers, classes, setClasses, classe, setExamClass, teacher, setExamTeacher }) => {



    // const [classe, setExamClass] = useState('');
    // const [teacher, setExamTeacher] = useState('');
    // const [teachers, setExamTeachers] = useState([]);
    // const [classes, setClasses] = useState([]);
    const [hours, setHours] = useState('');
    const [hour, setHour] = useState('');
    const [period, setPeriod] = useState('');
    const [minutes, setMinutes] = useState('');
    const today = new Date().toISOString().split('T')[0];
    const handleDrawerClose = () => setIsDrawerOpen(false);
    
    // Formater la date dans le format souhaité
    const selectedHour = parseInt(hour.split(":")[0]);
    

    const period2 = selectedHour < 12 ? 'AM' : 'PM';

    const options = classes;
    useEffect(() => {

   

    }, [hour])



    return (
        <>



            <div className="  dark:bg-gray-800 ">
                <div className=" mt-6 max-w-md w-96 mx-auto  relative overflow-hidden z-10 bg-white p-6 rounded-lg shadow-md before:w-24 before:h-20 before:absolute before:bg-kindyyellow before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-12 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-10 table-drawer mb-6">
                    <h2 className="text-2xl font-bold text-kindydarkblue  ml-24">Add an Exam   </h2>
                </div>
                <div className=" bg-white p-4 rounded-lg shadow-lg w-[500px]">
                    <img src="https://img.freepik.com/free-photo/pencil-mpty-pages-sheet-music_23-2147846239.jpg?t=st=1710294895~exp=1710298495~hmac=fab9842d293a30e7d4392c280c4701bc1a0cd7e274cd6299130a43e08b202d5c&w=996" alt="Exam Image" className="w-full rounded-lg mb-2 top-14" />
                    {/* <button onClick={handleDrawerClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                            <span>Close</span>
                                        </button> */}




                    <form onSubmit={handleAddExam}>
                        <div className="space-y-2">

                            <div class="relative bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-3xl">
                                <input type="text" id="name" value={name} onChange={(e) => setExamName(e.target.value)} placeholder="Exam Name"
                                    class="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-black-50" />

                            </div>



                            <div>
                                <label htmlFor="startDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Date</label>
                                <input type="date" id="startDate" value={startDate} onChange={(e) => setExamStartDate(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    required
                                    min={today} />
                            </div>
                            <div>
                                <label htmlFor="duration" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Duration</label>
                                <div className="flex">
                                    <select
                                        id="hours"
                                        value={hours}
                                        onChange={(e) => {
                                            setExamDuration(`${hours}:${minutes}`);
                                            setHours(e.target.value);
                                            setExamDuration(`${e.target.value}:${minutes}`);
                                        }}
                                        className="mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        required
                                    >
                                        {Array.from({ length: 24 }, (_, i) => (
                                            <option key={i} value={i}>
                                                {`${i.toString().padStart(2, '0')} h`}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="mr-1">:</span>
                                    <select
                                        id="minutes"
                                        value={minutes}
                                        onChange={(e) => {


                                            setMinutes(e.target.value);
                                            setExamDuration(`${hours}:${e.target.value}`);
                                        }}
                                        className="mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        required
                                    >
                                        {Array.from({ length: 60 }, (_, i) => (
                                            <option key={i} value={i}>
                                                {`${i.toString().padStart(2, '0')} m`}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>





                            <div>
                                <label htmlFor="startHour" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Hour</label>
                                <input type="time" id="startHour" value={hour} onChange={(e) => { setHour(e.target.value); setExamStartHour(`${e.target.value}:${period2}`) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                                
                            </div>



                            <div class="flex flex-row items-end">
                                <label htmlFor="class" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Choose The Class  :</label>
                                <select id="class" value={classe} onChange={(e) => setExamClass(e.target.value)} class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-e-0 border-gray-300 dark:border-gray-700 dark:text-white rounded-s-lg  hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800" type="button" style={{ marginLeft: '8px' }}>
                                    <option value="All classes">All Classes</option>
                                    {options.map((classe) => (
                                        <option key={classe} value={classe.name}>
                                            {classe.name}
                                        </option>
                                    ))}
                                </select>
                                <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="class">

                                    </ul>
                                </div>

                            </div>


                            <div class="flex flex-row items-end">
                                <label htmlFor="teacher" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Choose The Teacher  :</label>
                                <select id="teacher" value={teacher} onChange={(e) => setExamTeacher(e.target.value)} class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-e-0 border-gray-300 dark:border-gray-700 dark:text-white rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800" type="button" style={{ marginLeft: '8px' }}>
                                    <option value="All classes">All Teachers</option>
                                    {teachers.map((teacher) => (
                                        <option key={teacher} value={teacher.username}>
                                            {teacher.username}
                                        </option>
                                    ))}
                                </select>
                                <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="class">

                                    </ul>
                                </div>

                            </div>

                            <ButtonComponent type="submit" text="Confirm" color="#0D6BBE"
                            >
                                Confirm
                            </ButtonComponent>
                            {/* <button onClick={handleDrawerClose} className="inline-flex w-full justify-center text-gray-500 items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button> */}
                            <div class="group flex h-20 w-20 cursor-pointer items-center justify-center rounded-3xl  p-2 hover:bg-slate-200">

                                <button onClick={handleDrawerClose} className="ml-4 inline-flex justify-center items-center text-gray-500 bg-kindyyellowlight hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-navy-900 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                            </div>

                        </div>
                    </form>
                </div></div>

        </>)


}
export default AddExam;


