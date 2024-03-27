import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../../../assets/svg/logo.svg';
import img from '../../../../../assets/img/img.png';


const Navbar = () => {
    return (

    <header
            className="relative bg-cover bg-center text-white"
            style={{
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '500px',
            }}
        >
            <nav className="flex justify-between items-center px-28 py-10">
                <Link
                    to="/login"
                    style={{
                        width: '135px',
                        height: '37px',
                        left: 'calc(50% - 135px/2 + 462.5px)',
                        top: 'calc(50% - 37px/2 - 358.5px)',
                        background: '#006BBE',
                        borderRadius: '22px 5px',
                    }}
                    className="flex items-center justify-center text-white font-bold transition duration-300 hover:bg-blue-700"
                >
                    LOGIN
                </Link>

                <div className="flex justify-between md:flex space-x-28">
                    <Link to="/" className="hover:underline">Home</Link>
                    <Link to="/about" className="hover:underline">About School</Link>
                    <Link to="/gallery" className="hover:underline">Gallery</Link>
                    <Link to="/elkindy-band" className="hover:underline">El Kindy Band</Link>
                </div>

                <Link to="/" className="flex items-center">
                    <img src={logo} alt="El Kindy Conservatoire" className="h-12 mr-4"/>
                </Link>
            </nav>
            <div className="text-center absolute w-full mt-10">
                <h1 className="text-5xl font-script text-yellow-400"
                    style={{fontFamily: 'Dancing Script, cursive', textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'}}>
                    From First Note to Ovation - El Kindy Guides the Way
                </h1>
            </div>
        </header>
    );
};

export default Navbar;
