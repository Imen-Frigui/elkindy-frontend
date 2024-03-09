import React from 'react';
import '../../../assets/css/StatCard.css'
import courses from '../../../assets/svg/courses.svg';

const StatCard = () => {
    const malePercentage = 61;
    const femalePercentage = 39;
    return (
        <div className="stat-card mb-8">
            <div className="stat-circle">
                <div className="circle-progress"
                     style={{background: `conic-gradient(#006BBE 0% ${malePercentage}%, #EA7D17 ${femalePercentage}% 100%)`}}>
                    <div className="icon-wrapper">
                        <img src={courses} alt="courses" className="icon"/>

                    </div>
                </div>
            </div>
            <div className="stat-details">
                <h3 className="stat-title">STUDENTS</h3>
                <div className="stat-numbers">308</div>
                <div className="stat-genders">
                    <span className="stat-male">MALE (61%)</span>
                    <span className="stat-female">FEMALE (39%)</span>
                </div>
            </div>
        </div>);
};

export default StatCard;
