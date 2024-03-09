import TeacherFormStep1 from 'components/TeacherRegistrationForm/TeacherFormStep1';
import TeacherFormStep2 from 'components/TeacherRegistrationForm/TeacherFormStep2';
import TeacherFormStep3 from 'components/TeacherRegistrationForm/TeacherFormStep3';
import { DefaultStepper } from 'components/stepper/Stepper';
import React, { useState } from 'react';
import useStore from 'store/Registration'; // Import your Zustand store

// Import your stepper component or any UI components you are using

const RegisterPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { formData, updateFormData } = useStore();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = () => {
    console.log('Final submission:', formData);
    // You can handle the final submission here
  };

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <TeacherFormStep1 onNext={handleNext} />;
      case 1:
        return <TeacherFormStep2 onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <TeacherFormStep3 onNext={handleSubmit} onBack={handleBack} />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <div>
      <DefaultStepper activeStep={activeStep} />
      {/* Here, you would use your Material Tailwind CSS Stepper component */}
      {getStepContent(activeStep)}
    </div>
  );
};

export default RegisterPage;
