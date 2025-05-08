
import React from 'react';
import { Controller } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';

const CreatableMultiselect = ({ name, control, items }) => {
    return (
        <div>
            <Controller
                name={name}
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                    <CreatableSelect
                        {...field}
                        isMulti
                        className='mt-5'
                        options={items}
                        placeholder="Select or type a color"
                        onChange={(selected) => field.onChange(selected)}
                        value={field.value}
                        styles={{
                            control: (base) => ({
                                ...base,
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

                        onBlur={field.onBlur}
                    />
                )}
            />
            
        </div>
    );
};

export default CreatableMultiselect;

