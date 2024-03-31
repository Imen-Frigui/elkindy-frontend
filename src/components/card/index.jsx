function Card(props) {
  const { variant, extra, children, ...rest } = props;
  return (
    <div
      className={`!z-5 relative flex flex-col rounded-[20px] shadow-xl  bg-white bg-clip-border  shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none  cursor-pointer ${extra}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Card;
