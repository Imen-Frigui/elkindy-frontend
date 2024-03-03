import Icon from "../../assets/svg/illustration-empty.svg";
import { Link } from "react-router-dom";
function NoData() {
  return (
    <div className="flex items-center justify-center bg-white py-20 px-36">
      <div className="my-4 flex flex-col items-center text-center">
        <img src={Icon} className="mb-12" alt="no data illustration" />
        <div className="mb-10">
          <h3 className="mb-4 text-2xl font-bold">
            There is no instrument yet.
          </h3>
          <p className="text-gray-500">
            Have a musical instrument you want to showcase?
            <br />
            Share it with the community and let others discover the joy of your
            musical find!
          </p>
        </div>
        <Link
          to="/admin/marketplace/create"
          className="bg-kindyorange border-transparent rounded-lg border-2 py-2 px-4 text-gray-50 transition  duration-300 hover:border-gray-100 hover:bg-opacity-80  hover:text-white focus:outline-none "
        >
          + Post instrument
        </Link>
      </div>
    </div>
  );
}

export default NoData;
