import { ErrorMessage, useField } from "formik";

function TextArea({ status, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="my-1 w-full">
      <textarea
        rows="3"
        className={`bg-light mt-2 mb-1 block w-full rounded py-3 
            px-2 text-gray-500 placeholder-gray-400 placeholder-opacity-60   
            shadow focus:outline-none focus:ring-1 focus:ring-kindyorange
             ${
               ((status && status.error) || (meta.touched && meta.error)) &&
               "input-error"
             }`}
        {...field}
        {...props}
        autoComplete="on"
      />

      <p className={`invisible ${meta.touched && meta.error && "hidden"}`}>
        some text
      </p>
      <ErrorMessage name={field.name} component="div" className="text-error" />
    </div>
  );
}

export default TextArea;
