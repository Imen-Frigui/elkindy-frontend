import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProfileModal = ({ isOpen, onClose, userData }) => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.number().typeError('Phone must be a number'),
    password: Yup.string(),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: userData.user.firstName,
      lastName: userData.user.lastName,
      email: userData.user.email,
      phone: userData.user.phoneNumber,
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const userId = userData.user._id;
        const config = {
          headers: {
            'Content-Type': 'application/json',
            // Include other headers as needed, like an authorization token
          },
        };

        const updatedData = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phoneNumber: values.phone,
          ...(values.password && { password: values.password }),
        };

        const response = await axios.put(`http://localhost:3000/api/users/updateUser/${userId}`, updatedData, config);

        console.log('User updated successfully:', response.data);
        window.location.reload();
      } catch (error) {
        console.error('Error updating the user:', error);
        // Handle errors, e.g., show error messages
      }
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={formik.handleSubmit} className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {/* Fields here */}
            {/* Example for First Name Field */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                First Name
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                     id="firstName" 
                     name="firstName" 
                     type="text" 
                     onChange={formik.handleChange} 
                     onBlur={formik.handleBlur}
                     value={formik.values.firstName}
                     required />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="text-red-500 text-xs mt-1">{formik.errors.firstName}</div>
              ) : null}
            </div>

            {/* Add other fields similarly */}
            {/* Last Name Field */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                Last Name
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     id="lastName"
                     name="lastName"
                     type="text"
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     value={formik.values.lastName}
                     required />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="text-red-500 text-xs mt-1">{formik.errors.lastName}</div>
              ) : null}
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     id="email"
                     name="email"
                     type="email"
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     value={formik.values.email}
                     required />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>
              ) : null}
            </div>

            {/* Phone Field */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                Phone
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     id="phone"
                     name="phone"
                     type="text"  /* Changed type to text to avoid HTML5 validation and rely on Yup */
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     value={formik.values.phone} />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="text-red-500 text-xs mt-1">{formik.errors.phone}</div>
              ) : null}
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                     id="password"
                     name="password"
                     type="password"
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     value={formik.values.password} />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-xs mt-1">{formik.errors.password}</div>
              ) : null}
            </div>

            {/* Confirm Password Field */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     id="confirmPassword"
                     name="confirmPassword"
                     type="password"
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     value={formik.values.confirmPassword} />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div className="text-red-500 text-xs mt-1">{formik.errors.confirmPassword}</div>
              ) : null}
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Save Changes
              </button>
              <button className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
