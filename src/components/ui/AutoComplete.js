import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import { Field, ErrorMessage, useField } from "formik";

const brands = [
  { name: "Gibson", year: 1902 },
  { name: "Steinway & Sons", year: 1853 },
  { name: "Fender", year: 1946 },
  { name: "Yamaha", year: 1887 },
  { name: "Korg", year: 1962 },
  { name: "Roland", year: 1972 },
  { name: "Pearl", year: 1946 },
  { name: "DW Drums", year: 1972 },
  { name: "Selmer", year: 1885 },
  { name: "Buffet Crampon", year: 1825 },
  { name: "Vic Firth", year: 1963 },
  { name: "Zildjian", year: 1623 },
  { name: "Taylor", year: 1974 },
  { name: "Ibanez", year: 1908 },
  { name: "Casio", year: 1946 },
];
function AutoSuggestComponent({ form, validate, ...props }) {
  const [field, meta] = useField(props);
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(() => getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: "Search your brand name",
    value,
    onChange: onChange,
    id: field.name,
    name: field.name,
  };

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : brands.filter(
          (br) => br.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const getSuggestionValue = (suggestion) => suggestion.name;

  const renderSuggestion = (suggestion) => (
    <div className="border-1  border bg-white p-3">{suggestion.name}</div>
  );
  const inputStyles = {
    input:
      "bg-light mt-2 mb-1 block w-full rounded py-3 px-2 text-gray-500 placeholder-gray-400 placeholder-opacity-60 shadow focus:outline-none focus:ring-1 focus:ring-kindyorange",
  };
  return (
    <div>
      <Autosuggest
        {...field}
        {...props}
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        highlightFirstSuggestion={true}
        theme={{
          ...inputStyles,
        }}
      />
      <ErrorMessage name={field.name} component="div" className="text-error" />
    </div>
  );
}
export default AutoSuggestComponent;
