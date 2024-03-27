import React from 'react';
import '../../../assets/css/StatCard.css'
import student from '../../../assets/svg/student.svg';

const StatCard = ({ title, totalCount, stats }) => {
    const { malePercentage, femalePercentage } = stats;

    return (
        <div className="stat-card mb-8 bg-white dark:bg-gray-600 shadow-lg rounded-lg overflow-hidden">
            <div className="stat-circle bg-white dark:bg-gray-600">
                <div className="circle-progress"
                     style={{background: `conic-gradient(#006BBE 0% ${malePercentage}%, #EA7D17 ${femalePercentage}% 100%)`}}>
                    <div className="icon-wrapper">
                        <img src={student} alt="Icon" className="icon"/>
                    </div>
                </div>
            </div>
            <div className="stat-details p-4">
                <h3 className="stat-title text-xl font-semibold text-gray-800 dark:text-gray-800">{title.toUpperCase()}</h3>
                <div className="stat-numbers text-2xl font-bold text-gray-900 dark:text-gray-800">{totalCount}</div>
                <div className="stat-genders text-gray-600 dark:text-gray-400">
                    <span className="stat-male">MALE ({malePercentage}%)</span>
                    <span className="stat-female">FEMALE ({femalePercentage}%)</span>
                </div>
            </div>
        </div>
    );
};

export default StatCard;
