function FormLayout({ children, classes }) {
  return (
    <div
      className={`max-w-screen-xl px-6 grid gap-4 grid-cols-1 md:grid-cols-2 md:px-5 lg:px-5 xl:px-32 py-10 mx-auto bg-gray-100 text-navy-800 rounded-lg shadow-lg  ${classes}`}
    >
      {children}
    </div>
  );
}

export default FormLayout;
