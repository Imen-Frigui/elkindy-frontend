import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useShowToast = () => {
  console.log("showing toast");
  const showToast = (message, type = "default") => {
    console.log("showing ");
    toast[type](message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      toastStyle: {
        zIndex: 90, 
      },
    });
  };

  return showToast;
};

export default useShowToast;
