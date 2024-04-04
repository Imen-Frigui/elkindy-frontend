import nft1 from "assets/img/nfts/Nft8.jpg";
import { Link } from 'react-router-dom';

const EventDetailsBanner = () => {
  return (
    <div className="mt-8 flex w-full flex-col rounded-[20px] bg-cover px-[30px] py-[30px] md:px-[30px] md:py-[56px] relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${nft1})`, filter: 'blur(3px)', borderRadius: '20px' }}></div>
      
      <div className="w-full relative z-10">
        <h4 className="mb-[14px] max-w-full text-xl font-bold text-white md:w-[64%] md:text-3xl md:leading-[42px] lg:w-[46%] xl:w-[85%] 2xl:w-[75%] 3xl:w-[52%]">
          Welcome to Event Details
        </h4>
        <p className="mb-[40px] max-w-full text-base font-medium text-[#E3DAFF] md:w-[64%] lg:w-[40%] xl:w-[72%] 2xl:w-[60%] 3xl:w-[45%]">
          Explore the details of this event and manage it effortlessly.
        </p>

        <div className="mt-[36px] flex items-center justify-between gap-4 sm:justify-start 2xl:gap-10">
          <Link to="/admin/events">
            <button className="text-black linear rounded-xl bg-white px-4 py-2 text-center text-base font-medium transition duration-200 hover:!bg-white/80 active:!bg-white/70">
              Manage Events
            </button>
          </Link>
          <Link to="https://www.youtube.com/user/conservatoireelkindy" target="_blank">
            <button className="text-base font-medium text-lightPrimary hover:text-lightPrimary 2xl:ml-2">
              Watch Video
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsBanner;
