function InstrumentSkeleton() {
  return (
    <div className="3xl:p-![18px] relative flex h-full w-full flex-col rounded-[20px] bg-white bg-clip-border !p-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none">
      <div className=" h-full w-full animate-pulse ">
        <div className="relative w-full">
          <div className="h-14 w-14 rounded-full bg-indigo-50 "></div>
          <img
            className="mb-3 h-1/2 w-full animate-pulse rounded-xl 3xl:h-full 3xl:w-full"
            alt=""
          />
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="w-3/4 space-y-4">
            <div className="h-5 w-1/4 rounded-md bg-indigo-50 "></div>
            <div className="h-4 w-2/3 rounded-md bg-indigo-50 "></div>
            <div className="h-8 w-28 rounded-md bg-indigo-50 "></div>
          </div>
          <div className="h-6 w-6 rounded-full bg-indigo-50"></div>
        </div>
      </div>
    </div>
  );
}

export default InstrumentSkeleton;
