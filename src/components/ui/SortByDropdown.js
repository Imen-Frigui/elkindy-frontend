import { Fragment } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { Listbox, Transition } from "@headlessui/react";

const sortText = (s) => {
  switch (s) {
    case "":
      return "Most Recent";
    case "-likeScore":
      return "Most Likes";
    case "likeScore":
      return "Least Likes";
    default:
      return "Most Recent";
  }
};
function SortByDropdown({ options, onChange, value }) {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <Listbox.Button className=" flex w-48 cursor-pointer items-center rounded py-3 text-sm  font-medium text-gray-50 focus:outline-none ">
          <span className="mr-1 block truncate capitalize dark:text-navy-700">
            {sortText(value)}
          </span>
          <span className="pointer-events-none flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="ring-black absolute mt-4 max-h-60 w-full divide-y divide-gray-200 overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-opacity-5 focus:outline-none dark:text-navy-700 sm:text-sm">
            {options.map((option, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `${active ? "text-kindyblue " : "text-gray-600"}
                        relative cursor-pointer select-none py-3  px-6`
                }
                value={option}
              >
                {({ selected, _ }) => (
                  <>
                    <span
                      className={`${
                        selected ? "font-medium" : "font-normal"
                      } block truncate`}
                    >
                      {sortText(option)}
                    </span>
                    {selected ? (
                      <span
                        className={`absolute inset-y-0 right-0 flex items-center pr-3`}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

export default SortByDropdown;
