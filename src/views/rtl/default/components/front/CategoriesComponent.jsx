import React from 'react';
import { Link } from 'react-router-dom';
import '../../../../../assets/css/App.css'

const categories = [
    { name: 'Drums', link: '/categories/drums' },
    { name: 'Guitar lessons', link: '/categories/guitar-lessons' },
    { name: 'Piano', link: '/categories/piano' },
    { name: 'Violin', link: '/categories/violin' },
    { name: 'Vocals', link: '/categories/vocals' },
];

const CategoriesComponent = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg my-10" style={{'borderBottom': '6px solid #EA7D17'}}>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Categories</h2>
            <div className="divide-y divide-gray-300">
                {categories.map((category) => (
                    <Link
                        key={category.name}
                        to={category.link}
                        className="flex items-center py-2 text-blue-800 hover:text-blue-800 transition-colors duration-200 ease-in-out"
                    >
                        <span className="text-red-500 mr-2">›</span>
                        {category.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoriesComponent;
