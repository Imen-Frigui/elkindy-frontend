import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useShowToast = () => {
  const showToast = (message, type = "default") => {
    toast[type](message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return showToast;
};

export default useShowToast;
