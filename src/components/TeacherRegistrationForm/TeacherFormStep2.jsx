import authImg from "assets/img/auth/auth1.png";
import { useDispatch, useSelector } from 'react-redux';
import { updateRegistrationData } from 'slices/authSlice';

const TeacherFormStep2 = ({ onBack, onNext }) => {
    const dispatch = useDispatch();
    const formData = useSelector(state => state.auth.registrationData);


      const handleChange = (e) => {
        const updatedData = { ...formData, [e.target.name]: e.target.value };
        dispatch(updateRegistrationData(updatedData));
    };

    return (
        <div className="flex flex-col lg:flex-row w-full">
            <div className="flex-1 flex flex-col justify-center bg-customBackground dark:bg-gray-800 shadow-lg p-8">
                <h2 className="text-3xl font-bold text-navy-700 dark:text-white mb-6">Step 2: Professional Details</h2>
                <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                    
                    {/* Existing fields like degree selection */}

                    <div>
                        <label htmlFor="specialization" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Specialization:</label>
                        <input
                            type="text"
                            name="specialization"
                            onChange={handleChange}
                            value={formData.specialization || ''}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        />
                    </div>

                    <div>
                        <label htmlFor="teachingExperience" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Teaching Experience (Years):</label>
                        <input
                            type="number"
                            name="teachingExperience"
                            onChange={handleChange}
                            value={formData.teachingExperience || ''}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        />
                    </div>

                    <div>
                        <label htmlFor="coursesTaught" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Courses Taught:</label>
                        <input
                            type="text"
                            name="coursesTaught"
                            onChange={handleChange}
                            value={formData.coursesTaught || ''}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        />
                    </div>

                    {/* Additional Information Checkbox and Input */}

                    <div className="flex justify-between">
                        <button type="button" onClick={onBack} className="px-6 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 rounded-md">Back</button>
                        <button type="button" onClick={onNext} className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md">Next</button>
                    </div>
                </form>
            </div>
            <div className="flex-1 bg-cover bg-center shadow-lg" style={{ backgroundImage: `url(${authImg})`, minHeight: '100%' }}></div>
        </div>
    );
};

export default TeacherFormStep2;