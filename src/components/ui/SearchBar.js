import { useRef } from "react";
import { useNavigate } from "react-router-dom";
export default function SearchBar() {
  const navigate = useNavigate();
  const input = useRef();
  const form = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/admin/marketplace/?search=${input.current.value}`);
    form.current.reset();
  };
  return (
    <div className="">
      <form className="" onSubmit={submitHandler} ref={form}>
        <input
          className="w-58 mb-4 mt-4 rounded-lg  bg-lightPrimary py-2 px-4 text-navy-700 shadow-xl shadow-shadow-500 outline-none ring-kindyorange ring-offset-2 ring-offset-kindyorange  focus:ring-2 dark:!bg-navy-800 dark:shadow-none md:w-72 "
          type="text"
          placeholder="Search instrument..."
          ref={input}
        />
      </form>
    </div>
  );
}
