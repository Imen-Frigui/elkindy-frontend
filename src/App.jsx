import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
const App = () => {
  return (
    <Routes>
      <Route path="auth/*" element={<AuthLayout />} />
      <Route path="admin/*" element={<AdminLayout />} />
      <Route path="rtl/*" element={<RtlLayout />} />
      <Route path="/" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default App;

/*
// eslint-disable-next-line no-unused-vars
import React from "react";
import './tailwind.output.css';
import logo from './assets/Kindy_logo.png';
function App() {
    const colors = [
        { name: 'kindy-blue', hex: '#0D6BBE', rgb: 'rgb(58, 67, 116)', hsl: 'hsl(231, 33%, 34%)' },
        { name: 'kindy-dark-blue', hex: '#0C4B65', rgb: 'rgb(100, 113, 150)', hsl: 'hsl(224, 20%, 49%)' },
        { name: 'kindy-light-blue', hex: '#D0EAFF', rgb: 'rgb(247, 248, 253)', hsl: 'hsl(230, 60%, 98%)' },
        { name: 'kindy-orange', hex: '#F98100', rgb: 'rgb(173, 31, 234)', hsl: 'hsl(282, 83%, 52%)' },
        { name: 'kindy-yellow', hex: '#FCCB67', rgb: 'rgb(242, 244, 255)', hsl: 'hsl(231, 100%, 97%)' },
        { name: 'kindy-white', hex: '#FFFFFF', rgb: 'rgb(255, 255, 255)', hsl: 'hsl(0, 0%, 100%)' },
    ];
  return (
      < >
          <div className="p-8">
              <header className="flex justify-center mb-8 items-center">
                  <img src={logo} className='w-32 h-36 items-center mr-4' alt='logo'/>
                  <h1 className="text-3xl font-bold text-font-color font-jost">El Kindy Design System</h1>
              </header>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                  {colors.map((color) => (
                      <div key={color.name} className="flex flex-col items-center p-4">
                          <div className={`w-44 h-24 rounded-s-md`} style={{backgroundColor: color.hex}}></div>
                          <p className="mt-2 font-jost text-sm">hex {color.hex}</p>
                          <p className="mt-1 font-jost text-xs">rgb {color.rgb}</p>
                          <p className="mt-1 font-jost text-xs">hsl {color.hsl}</p>
                      </div>
                  ))}
              </div>
          </div>
      </>
  )
}

export default App
>>>>>>> 867a458b46c0750caf9d672b58bf840081676c96
*/
