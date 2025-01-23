import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axiosInstance from "../../config/axiosInstance";
import { useUser } from "../../context/UserContext";

// Define the schema using Yup
const addressSchema = yup.object().shape({
    fullName: yup.string().required("Full name is required"),
    phoneNumber: yup
        .string()
        .required("Phone number is required")
        .matches(/^[0-9]{10}$/, "Invalid phone number"),
    addressLine1: yup.string().required("Address Line 1 is required"),
    addressLine2: yup.string(),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    postalCode: yup
        .string()
        .required("Postal code is required")
        .matches(/^[0-9]{6}$/, "Invalid postal code"),
    country: yup.string().required("Country is required"),

});

const Address = ({ handleRadioChange,selectedAddress }) => {
    const { currentUser } = useUser();
    // console.log(currentUser);

    const [addresses, setAddresses] = useState([]);


    const [loading, setLoading] = useState(true);
    const [editingAddress, setEditingAddress] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(addressSchema),
    });

    const fetchAddresses = async () => {
        try {
            const res = await axiosInstance.get(`/address/get-addresses/${currentUser._id}`);
            setAddresses(Array.isArray(res.data.addresses) ? res.data.addresses : []); // Access the 'addresses' property
        } catch (error) {
            console.error("Error fetching addresses:", error);
            setAddresses([]); // Fallback to an empty array on error
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (currentUser) {
            fetchAddresses();
        }
    }, [currentUser]);

    const onSubmit = async (data) => {
        try {
            if (editingAddress) {
                const res = await axiosInstance.put(
                    `/address/update-address/${editingAddress._id}`,
                    data
                );
                setAddresses((prev) =>
                    prev.map((addr) => (addr._id === res.data._id ? res.data : addr))
                );
                alert("Address updated successfully!");
            } else {
                const res = await axiosInstance.post("/address/add-address", {
                    ...data,
                    userId: currentUser._id,
                });
                setAddresses(res.data.address);
                alert("Address added successfully!");
            }
            reset();
            setEditingAddress(null);
        } catch (error) {
            console.error("Error saving address:", error);
            alert("Failed to save address.");
        }
    };

    const handleEdit = (address) => {
        setEditingAddress(address);
        reset(address);
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/address/delete-address/${id}`);
            setAddresses((prev) => prev.filter((addr) => addr._id !== id));

            alert("Address deleted successfully!");
        } catch (error) {
            console.error("Error deleting address:", error);
            alert("Failed to delete address.");
        }
    };


    const handleAddressSelection = (address) => {
        handleRadioChange(address); // Update parent state
    };

    if (loading) return <div>Loading addresses...</div>;

    return (
        <div className="">


            <h3 className="text-2xl font-bold ">Saved Addresses</h3>

            <ul>
                {addresses.map((address) => (
                    <li
                        key={address._id}
                      
                        className={`border p-4 my-2 ${selectedAddress?._id === address._id ? "bg-gray-200" : ""
                            }`}
                    >
                        <input
                            type="radio"
                            name="selectedAddress"
                           
                            checked={selectedAddress?._id === address._id}
                            onChange={() => handleAddressSelection(address) }
                            className="mr-2"
                        />
                        <strong>Name:</strong> {address.fullName}
                        <p>
                            <strong>Phone:</strong> {address.phoneNumber}
                        </p>
                        <p>
                            <strong>Address:</strong> {address.addressLine1}, {address.addressLine2},{" "}
                            {address.city}, {address.state} - {address.postalCode}
                        </p>
                        <p>
                            <strong>Country:</strong> {address.country}
                        </p>

                        <button
                            onClick={() => handleEdit(address)}
                            className="bg-blue-600 text-white px-2 py-1 mr-2"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(address._id)}
                            className="bg-red-600 text-white px-2 py-1"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>






            <h2 className="text-2xl font-bold mb-4">
                {editingAddress ? "Edit Delivery Address" : "Add Delivery Address"}
            </h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 gap-4 max-w-lg mx-auto"
            >
                <input
                    {...register("fullName")}
                    placeholder="Full Name"
                    className="border p-2 w-full"
                />
                {errors.fullName && <p className="text-red-600">{errors.fullName.message}</p>}

                <input
                    {...register("phoneNumber")}
                    placeholder="Phone Number"
                    className="border p-2 w-full"
                />
                {errors.phoneNumber && <p className="text-red-600">{errors.phoneNumber.message}</p>}

                <input
                    {...register("addressLine1")}
                    placeholder="Address Line 1"
                    className="border p-2 w-full"
                />
                {errors.addressLine1 && <p className="text-red-600">{errors.addressLine1.message}</p>}

                <input
                    {...register("addressLine2")}
                    placeholder="Address Line 2 (Optional)"
                    className="border p-2 w-full"
                />

                <input
                    {...register("city")}
                    placeholder="City"
                    className="border p-2 w-full"
                />
                {errors.city && <p className="text-red-600">{errors.city.message}</p>}

                <input
                    {...register("state")}
                    placeholder="State"
                    className="border p-2 w-full"
                />
                {errors.state && <p className="text-red-600">{errors.state.message}</p>}

                <input
                    {...register("postalCode")}
                    placeholder="Postal Code"
                    className="border p-2 w-full"
                />
                {errors.postalCode && <p className="text-red-600">{errors.postalCode.message}</p>}

                <input
                    {...register("country")}
                    placeholder="Country"
                    className="border p-2 w-full"
                />
                {errors.country && <p className="text-red-600">{errors.country.message}</p>}



                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    {editingAddress ? "Update Address" : "Add Address"}
                </button>
            </form>


        </div>
    );
};

export default Address;
