import React, {  useState } from 'react';
import ButtonComponent from "../../../components/button/ButtonComponnent";

const UpdateExam = ({handleSubmit , selectedExamIdForUpdate , handleDrawerClose2 , updatedExamName ,setUpdatedExamName ,updatedExamStartDate ,setUpdatedExamStartDate ,updatedExamDuration , setUpdatedExamDuration , updatedExamHour , setUpdatedExamHour , updatedExamClass , setUpdatedExamClass , updatedExamTeacher , setUpdatedExamTeacher , handleDrawerClose}) => {

    const [hour, setHour] = useState('');
    const period2 = hour >= 12 ? 'PM' : 'AM';
    
   

    const formatDate2 = (dateString) => {
     
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const defaultHour = updatedExamHour ? updatedExamHour.split(":").slice(0, 2).join(":") : "";
   
    return (
        <>
      
  <div className="flex items-center mb-6 ">
                                        <div className="max-w-md w-96 mx-auto  relative overflow-hidden z-10 bg-white p-6 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-kindyyellow before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12 table-drawer">
                                            <h2 className="text-2xl font-bold text-kindydarkblue mb-6">Update Exam <img src="https://img.freepik.com/premium-vector/hand-drawn-headphones-music-notes-realistic-notebook-page_53562-7929.jpg?w=740" alt="Exam Image" className="w-full rounded-lg mb-6" /></h2>
                                        </div>
                                        <form onSubmit={(e) => handleSubmit(e, selectedExamIdForUpdate)}>
                                            <div className="mb-4" >
                                                <div
                                                    class="group flex h-0 w-0 cursor-pointer items-center justify-center rounded-3xl  p-2 hover:bg-slate-200"
                                                    onClick={handleDrawerClose2}
                                                >
                                                    <div class="space-y-2  p-1.5 absolute top-2.5 right-2.5 ">
                                                        <span class="block h-1 w-10 origin-center rounded-full bg-kindydarkblue transition-transform ease-in-out group-hover:translate-y-1.5 group-hover:rotate-45"></span>
                                                        <span class="block h-1 w-8 origin-center rounded-full bg-orange-500 transition-transform ease-in-out group-hover:w-10 group-hover:-translate-y-1.5 group-hover:-rotate-45"></span>
                                                    </div>

                                                </div>
                                                <div className="max-w-md w-full mx-auto -my-16 px-4 relative overflow-hidden z-10 bg-white p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-kindyyellow before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12 table-drawer">
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                                        <div class="mb-4 flex flex-col ">
                                                            <label class="block text-sm font-medium text-navy-900" for="updatedName">Updated Name</label>
                                                            <input type="text" id="updatedName" value={updatedExamName} onChange={(e) => setUpdatedExamName(e.target.value)}
                                                                class="mt-1 p-2 w-full bg-transparent border-gray-600 rounded-md text-kindydarkblue" name="updatedName" />
                                                        </div>




                                                        <div className="mb-4">
                                                            <label className="block text-sm font-medium text-navy-900" htmlFor="updatedStartDate">Updated Start Date</label>
                                                            <input type="date" id="updatedStartDate" value={formatDate2(updatedExamStartDate)} onChange={(e) => setUpdatedExamStartDate(e.target.value)}
                                                                className="mt-1 p-2 w-full bg-white border-gray-600 rounded-md text-kindydarkblue"
                                                                name="updatedStartDate"
                                                            />
                                                        </div>

                                                        <div className="mb-4">
                                                            <label className="block text-sm font-medium text-navy-900" htmlFor="updatedDuration">Updated Duration</label>
                                                            <input type="text" id="updatedDuration" value={updatedExamDuration} onChange={(e) => setUpdatedExamDuration(e.target.value)}
                                                                className="mt-1 p-2 w-full bg-white border-gray-600 rounded-md text-kindydarkblue"
                                                                name="updatedDuration"
                                                            />
                                                        </div>

                                                        <div className="mb-4">
                                                            <label className="block text-sm font-medium text-navy-900" htmlFor="updatedExamHour">Updated StartHour</label>
                                                            <input
                                                                type="time"
                                                                id="updatedExamHour"
                                                                value={defaultHour}
                                                                onChange={(e) => { setHour(e.target.value); setUpdatedExamHour(`${e.target.value}:${period2}`) }}
                                                                className="mt-1 p-2 w-full bg-white border-gray-600 rounded-md text-kindydarkblue"
                                                                name="updatedHour"
                                                            />
                                                        </div>


                                                        <div className="mb-4">
                                                            <label className="block text-sm font-medium text-navy-900" htmlFor="updatedClass">Updated Class</label>
                                                            <input type="text" id="updatedClass" value={updatedExamClass} onChange={(e) => setUpdatedExamClass(e.target.value)}
                                                                className="mt-1 p-2 w-full bg-white border-gray-600 rounded-md text-kindydarkblue"
                                                                name="updatedClass"
                                                            />
                                                        </div>

                                                        <div className="mb-4">
                                                            <label className="block text-sm font-medium text-navy-900" htmlFor="updatedTeacher">Updated Teacher</label>
                                                            <input type="text" id="updatedTeacher" value={updatedExamTeacher} onChange={(e) => setUpdatedExamTeacher(e.target.value)}
                                                                className="mt-1 p-2 w-full bg-white border-gray-600 rounded-md text-kindydarkblue"
                                                                name="updatedTeacher"
                                                            />
                                                        </div>

                                                        <div class="flex justify-end">
                                                            <button onClick={handleDrawerClose}
                                                                class="bg-kindyyellowlight text-black px-2 py-1 font-semibold rounded-md hover:opacity-100 w-20 h-10" type="submit"
                                                                style={{ borderRadius: '22px 0px' }}
                                                            >
                                                                Update
                                                            </button>
                                                        </div>
                                                    </div></div>

                                            </div>
                                        </form>
                                    </div>
  



</>)
}

export default UpdateExam;