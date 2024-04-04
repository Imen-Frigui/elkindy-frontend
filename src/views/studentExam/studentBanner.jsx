import nft1 from "assets/img/nfts/Allstudents.jpg";
import { Link } from 'react-router-dom';

const StudentBanner = () => {
  return (
    <div className="mt-8 flex w-full flex-col rounded-[20px] bg-cover px-[30px] py-[30px] md:px-[30px] md:py-[56px] relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${nft1})`, filter: 'blur(4px)', borderRadius: '20px' }}></div>
      
      <div className="w-full relative z-10">
        <h4 className="mb-[14px] max-w-full text-xl font-bold text-white md:w-[64%] md:text-3xl md:leading-[42px] lg:w-[46%] xl:w-[85%] 2xl:w-[75%] 3xl:w-[52%]">
          Welcome to your Exams and Evaluations page :
        </h4>
        <p className="mb-[40px] max-w-full text-base font-medium text-[#E3DAFF] md:w-[64%] lg:w-[40%] xl:w-[72%] 2xl:w-[60%] 3xl:w-[45%]">
                  "  Music is like candy , you throw away the rappers  "
        </p>

        <div className="mt-[36px] flex items-center justify-between gap-4 sm:justify-start 2xl:gap-10">
          <Link to="">
          <button
            href=" "
            className="text-base font-medium text-lightPrimary hover:text-lightPrimary 2xl:ml-2"
          >
           Check your Exams Grades
          </button>
          </Link>
          <button
            href=" "
            className="text-base font-medium text-lightPrimary hover:text-lightPrimary 2xl:ml-2"
          >
           Check your Evaluations Grades
          </button>


          <button
            href=" "
            className="text-base font-medium text-lightPrimary hover:text-lightPrimary 2xl:ml-2"
          >
           Check your observations
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentBanner;
