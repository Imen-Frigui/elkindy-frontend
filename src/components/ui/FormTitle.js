function FormTitle({ children, text }) {
  return (
    <div>
      <h3 className=" text-dark font-jost mb-3 text-2xl font-bold text-kindydarkblue">
        {text}
      </h3>
      {children}
    </div>
  );
}

export default FormTitle;
