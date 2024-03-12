import { Field, ErrorMessage, useField } from "formik";

function Input({ label, status, className, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className={`my-1 w-full ${className} `}>
      <label>
        {label ? label : ""}
        <input
          className={`bg-light mt-2 mb-1 block w-full rounded-lg py-3 
               px-2 text-gray-500 placeholder-gray-400 placeholder-opacity-60   
               shadow focus:outline-none focus:ring-1 focus:ring-kindyorange
                ${
                  ((status && status.error) || (meta.touched && meta.error)) &&
                  "input-error border-2 border-red-500 bg-red-50 focus:ring-1 focus:ring-red-50  "
                }`}
          {...field}
          {...props}
          autoComplete="on"
        />
      </label>
      <ErrorMessage
        name={field.name}
        component="div"
        className=" text-red-500"
      />
    </div>
  );
}

export default Input;
