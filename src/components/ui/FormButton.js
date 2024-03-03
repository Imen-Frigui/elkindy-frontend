export default function FormButton({ children, className, disabled }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={
        " disabled:bg-red cursor-pointer rounded-lg py-2 px-4 text-white focus:outline-none" +
        className
      }
    >
      {children}
    </button>
  );
}
