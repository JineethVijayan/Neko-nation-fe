import React from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";


const MultiSelect = (props) => {


    return (
        <Controller
            name={props.name}
            control={props.control}
            defaultValue={[]} // Ensure default value is an empty array
            render={({ field }) => (
                <Select
                    {...field}
                    options={props.items} // Use the provided colors array
                    isMulti
                    className="mt-6"
                    {...field}
                    styles={{
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: '#ff7b00',

                        }),
                    }}

                    theme={(theme) => ({
                        ...theme,
                        borderRadius: 3,
                        colors: {
                            ...theme.colors,
                            primary25: 'blue',
                            primary: 'red',

                        },
                    })}

                    placeholder={<div>Select {props.name}</div>}
                    onChange={(selectedOptions) => {
                        // Ensure only values are stored
                        field.onChange(selectedOptions ? selectedOptions.map(option => option.value) : []);
                    }}
                    onBlur={field.onBlur} // Include onBlur for react-hook-form integration
                    value={props.items.filter(option => field.value.includes(option.value))} // Set controlled value
                />
            )}
        />

    );
};

export default MultiSelect;


