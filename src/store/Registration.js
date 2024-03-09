import create from 'zustand';

const useStore = create(set => ({
  formData: {
    // Personal information
    username: 'Generated',
    firstName: '',
    lastName: '',
    age: '24',
    email: '',
    password: '',
    phoneNumber: '',
    gender: '',
    address: '',
    dateOfBirth: '',
    role: 'teacher',

    // Professional details specific to teachers
    degree: '',
    specialization: '',
    teachingExperience: '',
    coursesTaught: '',
  },
  setFormData: (newData) => set(state => ({ formData: { ...state.formData, ...newData } })),
  resetFormData: () => set({ formData: {} }), // Reset form data after successful registration or when needed
}));

export default useStore;
