import PropTypes from "prop-types";

function Button({ text, className, onClick }) {
  return (
    <button
      onClick={onClick}
      className={
        " border-transparent rounded-[15px] border-2 px-3 text-sm  transition duration-300  focus:ring-2 " +
        className
      }
    >
      {text}
    </button>
  );
}

Button.ReactPropTypes = {
  text: PropTypes.string,
};

export default Button;
