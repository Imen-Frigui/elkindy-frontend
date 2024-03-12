import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

function AutoCompleteInput({ options, onChange, value }) {
  const [selected, setSelected] = useState(options[0]);
  const [query, setQuery] = useState("");
  const filteredBrands =
    query === ""
      ? options
      : options.filter((option) =>
          option.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="relative z-50">
      <Combobox value={value} onChange={onChange}>
        <div className="relative ">
          <Combobox.Input
            className="block w-full rounded-lg border-none py-3 pl-4 pr-10 text-sm capitalize leading-5 text-gray-900 shadow focus:outline-none focus:ring-1 focus:ring-kindyorange"
            displayValue={value}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex cursor-pointer  items-center rounded-lg pr-2">
            <SelectorIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox.Options className="ring-black absolute mt-4 max-h-60 w-full divide-y divide-gray-200 overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredBrands.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredBrands.map((option, index) => (
                  <Combobox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-3 pl-10 pr-4 ${
                        active ? "bg-kindyblue text-white" : "text-gray-600"
                      }`
                    }
                    value={option.name}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`${
                            selected ? "font-medium" : "font-normal"
                          } block truncate`}
                        >
                          {option.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-kindyorange"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
export default AutoCompleteInput;
