
import { IoLogoYoutube } from "react-icons/io";
import { FaFacebook, FaInstagramSquare } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {


  const handleFacebookClick = () => {
    window.open('https://www.facebook.com/ConservatoireElkindy/', '_blank');
  };

  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/conservatoire_el_kindy/', '_blank');
  };

  const handleYoutubeClick = () => {
    window.open('https://www.youtube.com/user/conservatoireelkindy', '_blank');
  };

  return (
    <div className="flex w-full flex-col items-center justify-between px-1 pb-8 pt-3 lg:px-8 xl:flex-row">
      <h5 className="mb-4 text-center text-sm font-medium text-gray-600 sm:!mb-0 md:text-lg">
        <p className="mb-4 text-center text-sm text-gray-600 sm:!mb-0 md:text-base">
          ©{1900 + new Date().getYear()} Conservatoire El Kindy
        </p>
      </h5>
      <div>
        <ul className="flex flex-wrap items-center gap-3 sm:flex-nowrap md:gap-10">
          <li>
            <Link to="https://www.facebook.com/ConservatoireElkindy/" target="_blank">
              <FaFacebook className="text-base font-medium text-gray-600 hover:text-gray-600 cursor-pointer" />
            </Link>
          </li>
          <li>
            <Link to="https://www.instagram.com/conservatoire_el_kindy/" target="_blank">
              <FaInstagramSquare className="text-base font-medium text-gray-600 hover:text-gray-600 cursor-pointer" />
            </Link>
          </li>
          <li>
            <Link to="https://www.youtube.com/user/conservatoireelkindy" target="_blank">
              <IoLogoYoutube className="text-base font-medium text-gray-600 hover:text-gray-600 cursor-pointer" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
