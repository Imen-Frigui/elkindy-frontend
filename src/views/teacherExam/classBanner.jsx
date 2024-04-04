import nft1 from "assets/img/nfts/teacherViolan.jpg";
import { Link } from 'react-router-dom';

const ClassBanner = () => {
  return (
    <div className="mt-8 flex w-full flex-col rounded-[20px] bg-cover px-[30px] py-[30px] md:px-[30px] md:py-[100px] relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${nft1})`, filter: 'blur(1px)', borderRadius: '20px' }}></div>
      
      <div className="w-full relative z-10">
        <h4 className="mb-[14px] max-w-full text-xl font-bold text-kindydarkblue md:w-[64%] md:text-3xl md:leading-[42px] lg:w-[46%] xl:w-[85%] 2xl:w-[75%] 3xl:w-[52%]">
          Welcome to classExams ...
        </h4>
       

        <div className="mt-[36px] flex items-center justify-between gap-4 sm:justify-start 2xl:gap-10">
          <Link to="/rtl/evaluations">
            <p className="text-black linear rounded-xl bg-white px-4 py-2 text-center text-base font-medium transition duration-200 hover:!bg-white/80 active:!bg-white/70">
              Evaluations 
            </p>
          </Link>
          <button
            href=" "
            className="text-base font-medium text-lightPrimary hover:text-lightPrimary 2xl:ml-2"
          >
           
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassBanner;