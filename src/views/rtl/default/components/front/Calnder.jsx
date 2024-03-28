import React from 'react';
import Calendar from 'react-calendar';

const Calender = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg my-10" style={{'borderBottom': '6px solid #EA7D17'}}>
            <Calendar/>
        </div>
    );
};

export default Calender;
