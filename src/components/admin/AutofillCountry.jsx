"use client";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import countryOptions from "../../data/country"; // Static import for SSR consistency

const AutofillCountry = ({ control, name, errors }) => {
  const [options, setOptions] = useState([]);
  const [mounted, setMounted] = useState(false); // To track the mounting state

  useEffect(() => {
    setMounted(true); // Ensure the component only renders after the first mount
    setOptions(countryOptions); // Set options on the client-side
  }, []);

  // Prevent rendering before the component is mounted
  if (!mounted) {
    return null;
  }

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={{ required: "Country name is required" }}
      render={({ field }) => (
        <div>
          <Select
            {...field}
            options={options}
            placeholder="Select a country"
            isSearchable
            onChange={(selectedOption) => field.onChange(selectedOption)} // Use the entire selectedOption object
            value={
              field.value
                ? options.find((option) => option.value === field.value)
                : null
            } // Ensure the selected option is visible
            styles={{
              control: (base) => ({
                ...base,
                borderColor: errors[name] ? "red" : base.borderColor,
              }),
              menu: (base) => ({
                ...base,
                zIndex: 9999, // Increase the zIndex of the dropdown menu
              }),
              option: (base) => ({
                ...base,
                zIndex: 9999, // Ensure individual options have a higher zIndex
              }),
            }}
          />
          {errors[name] && (
            <p style={{ color: "red", marginTop: "5px" }}>
              {errors[name]?.message}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default AutofillCountry;
