import banner from "../../../assets/img/banner.jpeg";

const TourBanner = ({ onStartTour }) => {
  return (
    <div
      className="mt-8 flex w-full flex-col rounded-[20px] bg-cover px-[25px] py-[25px] md:px-[25px] md:py-[25px]"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="w-full">
        <h4 className="mb-[14px] max-w-full text-xl font-bold text-white md:w-[64%] md:text-3xl md:leading-[42px] lg:w-[46%] xl:w-[85%] 2xl:w-[75%] 3xl:w-[52%]">
          Learn how to mange your courses with quick and easy steps
        </h4>
        <p className="mb-[40px] max-w-full text-base font-medium text-[#E3DAFF] md:w-[64%] lg:w-[40%] xl:w-[72%] 2xl:w-[60%] 3xl:w-[45%]">
          Explore the features of the courses dashboard and get insights on how to navigate through the platform
        </p>

        <div className="mt-[36px] flex items-center justify-between gap-4 sm:justify-start 2xl:gap-10">
          <button onClick={onStartTour}
              className="text-black linear rounded-xl bg-white px-4 py-2 text-center text-base font-medium transition duration-200 hover:!bg-white/80 active:!bg-white/70">
            Start Tour
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourBanner;
