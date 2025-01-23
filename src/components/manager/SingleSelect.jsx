import React from 'react'
import { Controller } from 'react-hook-form';
import Select from 'react-select/base';

const SingleSelect = (props) => {
  return (
    <Controller
    name={props.name}
    control={props.control}
    defaultValue=''
    render={({ field }) => (
        <Select
            {...field}
            options={props.items} // Use the provided colors array

            onChange={(selectedOptions) => {
                // Ensure only values are stored
                field.onChange(selectedOptions ? selectedOptions.value : '');
            }}
            onBlur={field.onBlur} // Include onBlur for react-hook-form integration
            value={props.items.find(option => option.value === field.value)} // Set controlled value
            onMenuOpen={props.onMenuOpen}

        />
    )}
/>
  )
}

export default SingleSelect
