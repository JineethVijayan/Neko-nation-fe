
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import MultiSelect from "./MultiSelect";
import axiosInstance from "../../config/axiosInstance";
import { useParams } from "react-router-dom";


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


const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    price: Yup.number().positive("Price must be greater than zero").required("Price is required"),
    description: Yup.string().required("Description is required"),
    sizes: Yup.array().min(1, "Select at least one size").required("Sizes are required"),
    colors: Yup.array().min(1, "Select at least one color").required("Colors are required"),
    stock: Yup.number().positive("Stock must be greater than zero").required("Stock is required"),
    images: Yup.array().min(1, "Upload at least one image").required("Images are required"),
});

const ProductUpdateForm = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const {
        control,
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const images = watch("images") || [];

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axiosInstance.get(`/product/get-productBy-id/${id}`);
                const product = res.data;
                console.log(product);
                

                setValue("name", product.name);
                setValue("price", product.price);
                setValue("description", product.description);
                setValue("sizes", product.sizes);
                setValue("colors", product.colors);
                setValue("stock", product.stock);
                setValue("images", product.images);
            } catch (error) {
                console.error("Error fetching product data", error);
            }
        };
        fetchProduct();
    }, [id, setValue]);

    const onSubmit = async (data) => {
        setLoading(true);
        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('price', data.price);
        formData.append('description', data.description);
        
     

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

console.log(data.name);
console.log(data.image);


        try {
            const productId = id;
            console.log(formData);
            
            const res = await axiosInstance.put(`/product/update-product/${productId}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("Product updated successfully", res.data);
        } catch (error) {
            console.error("Error updating product", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center pt-24">
            <div className="w-96">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full p-6">
                    <input {...register("name")} placeholder="Enter product name" className="border p-2 w-full" />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                    <input {...register("price")} type="number" placeholder="Enter price" className="border p-2 w-full mt-4" />
                    {errors.price && <p className="text-red-500">{errors.price.message}</p>}

                    <textarea {...register("description")} placeholder="Enter description" className="border p-2 w-full mt-4" />
                    {errors.description && <p className="text-red-500">{errors.description.message}</p>}

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

                    <input {...register("stock")} type="number" placeholder="Enter stocks" className="border p-2 w-full mt-4" />
                    {errors.stock && <p className="text-red-500">{errors.stock.message}</p>}


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
                     

                    <button type="submit" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded">
                        {loading ? "Updating..." : "Update Product"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductUpdateForm;
