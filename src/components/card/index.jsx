function Card(props) {
  const { variant, extra, children, ...rest } = props;
  return (
    <div
      className={`!z-5 relative flex flex-col rounded-[20px] shadow-xl transform duration-500 bg-white bg-clip-border  shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none hover:-translate-y-2 cursor-pointer ${extra}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Card;
