import { Input } from "@material-tailwind/react";
import authImg from "assets/img/auth/register2.jpg";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData } from "slices/registrationSlice";
import * as Yup from 'yup';
import { TagsInput } from "react-tag-input-component";
// Define validation schema
 import '../StudentRegistrationForm/tags.css';

const validationSchema = Yup.object().shape({
  specialization: Yup.string().required('Specialization is required'),
  teachingExperience: Yup.number().required('Teaching Experience is required'),
  coursesTaught: Yup.string().required('Courses Taught is required'),
  dateOfBirth: Yup.date().required('Date of Birth is required'),
});

const TeacherFormStep2 = ({ onBack, onNext }) => {
    const [selected, setSelected] = useState([]);
    const dispatch = useDispatch();
    const formData = useSelector(state => state.registration.formData);
    const [errors, setErrors] = React.useState({});

    const validationSchema = Yup.object().shape({
        specialization: Yup.array().min(1, 'Specialization is required').required('Specialization is required'),
        teachingExperience: Yup.number().required('Teaching Experience is required'),
        coursesTaught: Yup.string().required('Courses Taught is required'),
        dateOfBirth: Yup.date().required('Date of Birth is required'),
        degree: Yup.string().required('degree is required')
      });


    const handleChange = (e) => {
        const { name, value } = e.target;

        // Dispatch the updated value for the specific field that changed.
        dispatch(updateFormData({ field: name, value: value }));
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: null // or null, or ''
          }));
    };
    const handleTagsChange = (tags) => {
        console.log(formData)
        setSelected(tags);
        dispatch(updateFormData({ field: 'specialization', value: tags }));
      };
    useEffect(() => {
        console.log(formData);
      }, [formData]);

    const handleSubmit = async () => {
      try {
        // Validate form data
        await validationSchema.validate(formData, { abortEarly: false });
        // Proceed to the next step if validation succeeds
        onNext();
      } catch (error) {
        // Handle validation errors
        const validationErrors = {};
        error.inner.forEach(err => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      }
    };
   

    return (
        <div className="flex flex-col lg:flex-row w-full">
        <div className="flex-1 flex flex-col justify-center bg-lightblue dark:bg-gray-800 shadow-lg p-8">
            <h2 className="text-3xl font-bold text-navy-700 dark:text-white mb-6">Step 2: Professional Details</h2>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                
                {/* Existing fields like degree selection */}
 
 <label htmlFor="teachingExperience" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Specialization</label>
 <div
      className="bg-gray-50">
                <TagsInput
                
                beforeAddValidate={(tag) => {
                    if (tag.length < 3) {
                        <p className="text-red-500 text-sm mt-1">error taille</p>
                        return false;
                    }
                    return true;
                }}

               
                classNames={{
                    container: ".rti--container",
                    tag: "bg-blue-500 text-blue rounded-lg px-2 py-1 mr-2 dark:text-gray-300 dark:bg-gray-700",
                    input: "border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring focus:border-blue-500"
                }}
                value={selected}
                onChange={handleTagsChange}
                name="Specialization"
                placeHolder="piano, guitar, violin, etc."
                />  
                <em className="text-sm text-gray-500">Press enter or comma to add new tag</em>
                {errors.specialization && <p className="text-red-500 text-sm mt-1">{errors.specialization}</p>}
            </div>
                        

                <div>
                    <label htmlFor="teachingExperience" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Teaching Experience (Years):</label>
                    <input
                        type="number"
                        name="teachingExperience"
                        onChange={handleChange}
                        value={formData.teachingExperience || ''}
                        placeholder="e.g. 5, 10, 15, etc..."
                        className="bg-white/0 border border-gray-300 text-gray-900 text-sm rounded px-3 py-3 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
             />  
                 {errors.teachingExperience && <p className="text-red-500 text-sm mt-1">{errors.teachingExperience}</p>}
                                   
              </div>

                <div>
                    <label htmlFor="coursesTaught" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Courses Taught:</label>
                    <input
                        type="text"
                        name="coursesTaught"
                        onChange={handleChange}
                        value={formData.coursesTaught || ''}
                        placeholder="e.g. Music Theory, Piano, Guitar, etc..."
                        className={`bg-white/0 border border-gray-300 text-gray-900 text-sm rounded px-3 py-3 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${errors.coursesTaught ? 'border-red-500' : ''}`}
                    />
                                     {errors.coursesTaught && <p className="text-red-500 text-sm mt-1">{errors.coursesTaught}</p>}

                </div>
                <label htmlFor="coursesTaught" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">degree</label>
                <input
                        type="text"
                        name="degree"
                        placeholder="bechlor, master, phd etc..."
                        className={`bg-white/0 border border-gray-300 text-gray-900 text-sm rounded px-3 py-3 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${errors.degree ? 'border-red-500' : ''}`}
                        value={formData.degree || ''}
                        onChange={handleChange}
                    />
                      {errors.degree && <p className="text-red-500 text-sm mt-1">{errors.degree}</p>}


                <div className="flex justify-between">
                <button 
    type="button" 
    onClick={onBack} 
    className="px-6 py-2 border border-white/0 text-kindyblue bg-white/0 hover:bg-kindyblue rounded-tl-2xl rounded-br-2xl hover:text-white hover:border-blue-700 rounded-md"
>
    Back
</button>

<button 
    type="button" 
    onClick={handleSubmit} 
    className="px-6 py-2 hover:text-white hover:bg-kindyorange bg-white/0 border-2 rounded-tl-2xl rounded-br-2xl  text-kindyorange border-kindyorange hover:border-2 rounded-md h"
>
    Next
</button>

                </div>
            </form>
        </div>
        <div className="flex-1 bg-cover bg-center shadow-lg" style={{ backgroundImage: `url(${authImg})`, minHeight: '100%' }}></div>
    </div>
);
};

export default TeacherFormStep2;
