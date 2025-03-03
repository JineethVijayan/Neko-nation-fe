import React from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import MultiSelect from "./MultiSelect";
import axiosInstance from "../../config/axiosInstance";

const categories = [
    { value: "T-Shirt", label: "T-Shirt" },
    { value: "Hoodie", label: "Hoodie" },
    { value: "Pants", label: "Pants" },
    { value: "Jacket", label: "Jacket" },
    { value: "Accessories", label: "Accessories" },
];

const subcategory = [
    
    { value: "Regularfit-Tshirt", label: "Regularfit-Tshirt" },
    { value: "Oversized-Tshirt", label: "Oversized-Tshirt" },
    { value: "Printed-Shirt", label: "Printed-Shirt" },
    { value: "Casual-Shirt", label: "Casual-Shirt" },
]

const interests = [
    { value: "Culture", label: "Culture" },
    { value: "Movies", label: "Movies" },
    { value: "Sports", label: "Sports" },
    { value: "Anime", label: "Anime" },
    { value: "Music", label: "Music" },
]
    
 

const gender =[
    { value: "Men", label: "Men" },
    { value: "Women", label: "Women" },
    { value: "Unisex", label:"Unisex" },
]

const sizes = [
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
    { value: "XXL", label: "XXL" },
];

const colors = [
    { value: "Red", label: "Red" },
    { value: "Blue", label: "Blue" },
    { value: "Green", label: "Green" },
    { value: "Black", label: "Black" },
    { value: "White", label: "White" },
];

const tags = [
    { value: "anime", label: "Anime" },
    { value: "streetwear", label: "Streetwear" },
    { value: "casual", label: "Casual" },
]


const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    price: Yup.number()
        .typeError("Price must be a number")
        .positive("Price must be greater than zero")
        .required("Price is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    subcategory:Yup.string().optional(),
    interests:Yup.string().optional(),
    gender: Yup.string().required("gender is required"),
    sizes: Yup.array()
        .min(1, "Select at least one size")
        .required("Sizes are required"),
    colors: Yup.array()
        .min(1, "Select at least one color")
        .required("Colors are required"),
    stock: Yup.number()
        .typeError("Stock must be a number")
        .positive("Stock must be greater than zero")
        .required("Stock is required"),

    images: Yup.array()

        .min(1, "Upload at least one image") // Ensure at least one image is uploaded
        .required("Images are required"), // Ensure the images field is not empty
    tags: Yup.array().optional(),

});

const CreateProducts = () => {
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const images = watch("images") || []; // Watch for 'images', defaulting to []

    const onSubmit = async (data) => {

        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('price', data.price);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('gender', data.gender);
        formData.append('subcategory',data.subcategory);
        formData.append('interests',data.interests);

        data.sizes.forEach((size,index)=>{
            formData.append('sizes',size)
        });

        data.colors.forEach((color,index)=>{
            formData.append('colors',color)
        });
       
        
        formData.append('stock', data.stock);

        // Append multiple images
        data.images.forEach((image, index) => {
            formData.append('images', image); // Append each file
        });

        data.tags.forEach((tag,index)=>{
            formData.append('tags',tag)
        })


        try {
            const res = await axiosInstance.post('/product/create-product',formData,
                {
                    withCredentials:true,
                    headers:{
                        "Content-Type":"multipart/form-data",
                    },
                }
            );

            const resData = await res.data;

            console.log(resData);
            

        } catch (error) {
            
        }


    };

    return (

        <div className="flex justify-center items-center pt-24 ">

            <div className="w-96">
                <form onSubmit={handleSubmit(onSubmit)} className="  className=' w-full  p-6'">

                    {/* Name */}

                    <div>

                        <input {...register("name")} placeholder="Enter product name" className=' border border-[#ff7b00] focus:border-[#ffea00] focus:outline-none focus:ring-1 focus:ring-[#ffc300] rounded-sm p-1.5 w-full' />
                        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
                    </div>

                    {/* Price */}

                    <div>

                        <input {...register("price")} type="number" placeholder="Enter price" className='mt-6 border border-[#ff7b00] focus:border-[#ffea00] focus:outline-none focus:ring-1 focus:ring-[#ffc300] rounded-sm p-1.5 w-full' />
                        {errors.price && <p style={{ color: "red" }}>{errors.price.message}</p>}
                    </div>

                    {/* Description */}

                    <div>

                        <textarea {...register("description")} placeholder="Enter description" rows={1} className='mt-6 border border-[#ff7b00] focus:border-[#ffea00] focus:outline-none focus:ring-1 focus:ring-[#ffc300] rounded-sm p-1.5 w-full' />
                        {errors.description && (
                            <p style={{ color: "red" }}>{errors.description.message}</p>
                        )}
                    </div>

                    {/* Category */}

                    <div>

                        <Controller
                            name='category'
                            control={control}
                            defaultValue=''
                            render={({ field }) => (
                                <Select
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

                                    options={categories} // Use the provided colors array
                                    placeholder={<div>Select Categories</div>}
                                    onChange={(selectedOptions) => {
                                        // Ensure only values are stored
                                        field.onChange(selectedOptions ? selectedOptions.value : '');
                                    }}
                                    onBlur={field.onBlur} // Include onBlur for react-hook-form integration
                                    value={categories.find(option => option.value === field.value)} // Set controlled value
                                />
                            )}
                        />
                        {errors.category && (
                            <p style={{ color: "red" }}>{errors.category.message}</p>
                        )}
                    </div>


                    {/* subcategory */}

                    <div>

                        <Controller
                            name='subcategory'
                            control={control}
                            defaultValue=''
                            render={({ field }) => (
                                <Select
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

                                    options={subcategory} // Use the provided colors array
                                    placeholder={<div>Select subcategory</div>}
                                    onChange={(selectedOptions) => {
                                        // Ensure only values are stored
                                        field.onChange(selectedOptions ? selectedOptions.value : '');
                                    }}
                                    onBlur={field.onBlur} // Include onBlur for react-hook-form integration
                                    value={subcategory.find(option => option.value === field.value)} // Set controlled value
                                />
                            )}
                        />
                        {errors.subcategory && (
                            <p style={{ color: "red" }}>{errors.subcategory.message}</p>
                        )}
                    </div>


  {/* interests */}

  <div>

<Controller
    name='interests'
    control={control}
    defaultValue=''
    render={({ field }) => (
        <Select
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

            options={interests} // Use the provided colors array
            placeholder={<div>Select interests</div>}
            onChange={(selectedOptions) => {
                // Ensure only values are stored
                field.onChange(selectedOptions ? selectedOptions.value : '');
            }}
            onBlur={field.onBlur} // Include onBlur for react-hook-form integration
            value={interests.find(option => option.value === field.value)} // Set controlled value
        />
    )}
/>
{errors.interests && (
    <p style={{ color: "red" }}>{errors.interests.message}</p>
)}
</div>


                    {/* gender */}

                    <div>

                        <Controller
                            name='gender'
                            control={control}
                            defaultValue=''
                            render={({ field }) => (
                                <Select
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

                                    options={gender} // Use the provided colors array
                                    placeholder={<div>Select gender</div>}
                                    onChange={(selectedOptions) => {
                                        // Ensure only values are stored
                                        field.onChange(selectedOptions ? selectedOptions.value : '');
                                    }}
                                    onBlur={field.onBlur} // Include onBlur for react-hook-form integration
                                    value={gender.find(option => option.value === field.value)} // Set controlled value
                                />
                            )}
                        />
                        {errors.gender && (
                            <p style={{ color: "red" }}>{errors.gender.message}</p>
                        )}
                    </div>


                    {/* Sizes */}

                    <div>

                        <MultiSelect items={sizes} name='sizes' control={control} />
                        {errors.sizes && (
                            <p style={{ color: "red" }}>{errors.sizes.message}</p>
                        )}
                    </div>

                    {/* Colors */}

                    <div>


                        <MultiSelect items={colors} name='colors' control={control} />
                        {errors.colors && (
                            <p style={{ color: "red" }}>{errors.colors.message}</p>
                        )}
                    </div>

                    {/* Stock */}
                    <div>

                        <input {...register("stock")} type="number" placeholder="Enter stocks" className='mt-6 border border-[#ff7b00] focus:border-[#ffea00] focus:outline-none focus:ring-1 focus:ring-[#ffc300] rounded-sm p-1.5 w-full' />
                        {errors.stock && (
                            <p style={{ color: "red" }}>{errors.stock.message}</p>
                        )}
                    </div>

                    {/* Images */}

                    <div>
                        {/* <label>Images   </label> */}
                        <Controller
                            name="images"
                            control={control}
                            defaultValue={[]}
                            rules={{
                                validate: (files) =>
                                    files.length <= 6 || "You can only upload a maximum of 6 images.",
                            }}
                            render={({ field }) => (
                                <input
                                    type="file"
                                    multiple
                                    className='mt-6 border border-[#ff7b00] focus:border-[#ffea00] focus:outline-none focus:ring-1 focus:ring-[#ffc300] rounded-sm p-1.5 w-full'
                                    accept="image/*"
                                    onChange={(e) => {
                                        const selectedFiles = Array.from(e.target.files);
                                        const updatedFiles = [...images, ...selectedFiles];

                                        if (updatedFiles.length > 6) {
                                            alert("You can only upload a maximum of 6 images.");
                                        } else {
                                            setValue("images", updatedFiles); // Update the images array
                                        }
                                    }}
                                />
                            )}
                        />
                        {errors.images && (
                            <p style={{ color: "red" }}>{errors.images.message}</p>
                        )}
                    </div>

                    <div>
                        {/* <h4>Selected Images:</h4> */}
                        <ul>
                            {images.map((image, index) => (
                                <li key={index}>{image.name}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Tags */}
                    <div>

                        <MultiSelect items={tags} name='tags' control={control} />
                    </div>

                    <div className="flex justify-center mb-10">

                        <button type="submit" className='mt-6 px-2 py-1.5   bg-[#ff7b00] text-white hover:bg-[#ffea00] hover:text-black rounded'>Add Product</button>

                    </div>
                </form>

            </div>
        </div>
    );
};

export default CreateProducts;







