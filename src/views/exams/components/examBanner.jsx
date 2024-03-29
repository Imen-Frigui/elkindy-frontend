import nft1 from "assets/img/nfts/exams2.jpg";


const ExamBanner = () => {
  return (
    <div className="mt-8 flex w-full flex-col rounded-[20px] bg-cover px-[30px] py-[30px] md:px-[30px] md:py-[56px] relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${nft1})`, filter: 'blur(2px)', borderRadius: '20px' }}></div>
      
      <div className="w-full relative z-10">
        <h4 className="mb-[14px] max-w-full text-xl font-bold text-navy-900 md:w-[64%] md:text-3xl md:leading-[42px] lg:w-[46%] xl:w-[85%] 2xl:w-[75%] 3xl:w-[52%]">
          Welcome to Exams .....
        </h4>
        <p className="mb-[40px] max-w-full text-base font-medium text-gray-100 md:w-[64%] lg:w-[40%] xl:w-[72%] 2xl:w-[60%] 3xl:w-[45%]"> 
          Explore All the Exams 
        </p>

        <div className="mt-[36px] flex items-center justify-between gap-4 sm:justify-start 2xl:gap-10">
          
         
        </div>
      </div>
    </div>
  );
};

export default ExamBanner;

