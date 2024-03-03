function FormLayout({ children, classes }) {
  return (
    <div
      className={`relative bg-white p-8  shadow sm:rounded  md:rounded-lg  ${classes}`}
    >
      {children}
    </div>
  );
}

export default FormLayout;
