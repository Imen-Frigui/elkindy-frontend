import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/solid";
export default function BackButton({ className, iconColor }) {
  return (
    <Link
      to="/admin/marketplace"
      className={
        "flex  w-max  cursor-pointer items-center justify-center rounded-lg p-2 focus:outline-none  focus:ring-2  focus:ring-gray-800 focus:ring-offset-2 " +
        className
      }
    >
      <ChevronLeftIcon className={"mr-1 inline-block h-5 w-min " + iconColor} />
      Go back
    </Link>
  );
}
