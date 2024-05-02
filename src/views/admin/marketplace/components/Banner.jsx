import { Link } from "react-router-dom";

const Banner1 = ({ backgroundImage, title, subtitle, button1Link, button1Text, button2Link, button2Text, button3Link, button3Text }) => {
  return (
    <div
      className="flex w-full h-full flex-col rounded-[20px] bg-cover px-[25px] py-[30px] "
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full">
        <h4 className="mb-[14px] max-w-full text-xl font-bold text-white w-[85%] md:text-3xl leading-[42px] ">
          {title}
        </h4>
        <p className="mb-[40px] max-w-full text-base font-medium text-[#E3DAFF] md:w-[85%]  ">
          {subtitle}
        </p>

        <div className="mt-[36px] flex items-center justify-between gap-4 sm:justify-start 2xl:gap-10">
          <Link to={button1Link}>
            <button className="linear rounded-xl bg-white px-4 py-2 text-center text-base font-medium text-black transition duration-200 hover:!bg-white/80 active:!bg-white/70">
              {button1Text}
            </button>
          </Link>
          <Link to={button3Link}>
            <button className="linear rounded-xl bg-white px-4 py-2 text-center text-base font-medium text-black transition duration-200 hover:!bg-white/80 active:!bg-white/70">
              {button3Text}
            </button>
          </Link>
          <Link to={button2Link}>
            <button className="linear rounded-xl bg-white px-4 py-2 text-center text-base font-medium text-black transition duration-200 hover:!bg-white/80 active:!bg-white/70">
              {button2Text}
            </button>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Banner1;
