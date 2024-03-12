import React, { useState } from 'react';
import TeacherFormStep1 from 'components/TeacherRegistrationForm/TeacherFormStep1';
import TeacherFormStep2 from 'components/TeacherRegistrationForm/TeacherFormStep2';
import TeacherFormStep3 from 'components/TeacherRegistrationForm/TeacherFormStep3';
import StudentFormStep1 from 'components/StudentRegistrationForm/StudentStep1';

const RegisterPage = () => {
    const [activeTab, setActiveTab] = useState('teacher');
    const [activeStep, setActiveStep] = useState(0);

   
  
    
    
    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);
    const handleSubmit = () => console.log('Submit form data here');

    const getStepContent = (stepIndex) => {
        switch (activeTab) {
            case 'teacher':
                switch (stepIndex) {
                    case 0: return <TeacherFormStep1 onNext={handleNext} />;
                    case 1: return <TeacherFormStep2 onNext={handleNext} onBack={handleBack} />;
                    case 2: return <TeacherFormStep3 onNext={handleSubmit} onBack={handleBack} />;
                    default: return 'Unknown step';
                }
            case 'student':
                return <StudentFormStep1 onNext={handleSubmit} />;
            default:
                return null;
        }
    };

    return (
        <div className="p-5">
            <div className="flex border-b">
                <div 
                    className={`mr-8 pb-2 cursor-pointer ${activeTab === 'teacher' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`} 
                    onClick={() => setActiveTab('teacher')}
                >
                    Teacher
                </div>
                <div 
                    className={`pb-2 cursor-pointer ${activeTab === 'student' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`} 
                    onClick={() => setActiveTab('student')}
                >
                    Student
                </div>
            </div>
            <div className="mt-5">
                {getStepContent(activeStep)}
            </div>
        </div>
    );
};

export default RegisterPage;