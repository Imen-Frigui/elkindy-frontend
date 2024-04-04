import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImg from '../../../../../assets/img/register.png';

const PromoSection = () => {
    return (
        <div
            className="relative text-white"
            style={{
                borderRadius: '5px',
                marginTop: '-100px',
                paddingTop: '100px',
                paddingBottom: '100px',
                height: '360px',
                width:'1000px',
                marginLeft: '250px',
                backgroundImage: `url(${backgroundImg})`,
                backgroundSize: 'cover',
            }}
        >
            <div className="container mx-auto text-center">
            <h2
                className="text-6xl font-medium text-white"
                style={{
                    textShadow: '6px 8px 0px rgba(0, 0, 0, 0.05)'
                }}
            >
                Ignite Musical Mastery
            </h2>
            <p className="text-xl mb-8 px-28 mt-8  text-[#0C4B65]">
                Embark on a journey of musical discovery with our expertly crafted lessons.
                Find the perfect fit for your child's talents and interests
            </p>
            <div className=" space-x-4">
                <Link
                    to="/auth/register/65f376636d40c9845eebb665"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    style={{ borderRadius: '22px 5px' }}
                >
                    Register Now
                </Link>
                <a
                    href="#class-section"
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full"
                    style={{ borderRadius: '22px 5px' }}
                >
                    Explore Classes
                </a>
            </div>
        </div>
        </div>
    );
}

export default PromoSection;
