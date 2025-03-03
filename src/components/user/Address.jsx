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

const Address = ({ handleRadioChange, selectedAddress }) => {
    const { currentUser } = useUser();
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingAddress, setEditingAddress] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown toggle state

    const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);




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
            const fetchedAddresses = Array.isArray(res.data.addresses) ? res.data.addresses : [];
            setAddresses(fetchedAddresses);

            // Set the first address as the default selected address
            if (fetchedAddresses.length > 0 && !selectedAddress) {
                handleRadioChange(fetchedAddresses[0]);
            }
        } catch (error) {
            console.error("Error fetching addresses:", error);
            setAddresses([]);
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
                setAddresses([...addresses, res.data.address]);
                alert("Address added successfully!");
            }

            fetchAddresses();

            reset();
            setEditingAddress(null);

            setIsAddressFormOpen(false);
        } catch (error) {
            console.error("Error saving address:", error);
            alert("Failed to save address.");
        }
    };

    const toggleAddressForm = () => {
        setIsAddressFormOpen((prev) => !prev);
    };

    const handleEdit = (address) => {
        setEditingAddress(address);
        reset(address); // This ensures form fields are updated
        setIsDropdownOpen(false);
        setIsAddressFormOpen(true);
    };


    useEffect(() => {
        if (editingAddress) {
            reset(editingAddress);
        }
    }, [editingAddress, reset]);



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
        handleRadioChange(address);
        setIsDropdownOpen(false); // Close dropdown after selection
    };

    if (loading) return <div>Loading addresses...</div>;

    return (
        <div className="max-w-lg mx-auto">
            <h3 className="text-2xl font-bold">Shipping Address</h3>

            {
                selectedAddress && <div className="p-5 border rounded-lg my-4 ">

                    <div className="text-xl">
                        <span>Name:</span> {selectedAddress.fullName}
                        <p>
                            <span>Phone:</span> {selectedAddress.phoneNumber}
                        </p>
                        <p>
                            <span>Address:</span> {selectedAddress.addressLine1}, {selectedAddress.addressLine2},{" "}
                            {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.postalCode}
                        </p>
                        <p>
                            <span>Country:</span> {selectedAddress.country}
                        </p>
                    </div>

                </div>
            }

            {/* Dropdown for Saved Addresses */}
            <div className="relative">
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full bg-gray-300 p-3 text-left rounded-lg flex justify-between items-center"
                >
                    Select Address
                    {/* {selectedAddress ? selectedAddress.fullName : "Select Address"} */}
                    <span>{isDropdownOpen ? "▲" : "▼"}</span>
                </button>

                {isDropdownOpen && (
                    <ul className="absolute w-full border bg-white shadow-md mt-2 rounded-lg z-10">
                        {addresses.map((address) => (
                            <li
                                key={address._id}
                                className={`p-4 border-b cursor-pointer ${selectedAddress?._id === address._id ? "bg-gray-200" : ""
                                    }`}
                            >
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="selectedAddress"
                                        checked={selectedAddress?._id === address._id}
                                        onChange={() => handleAddressSelection(address)}
                                        className="mr-2"
                                    />
                                    <div>
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
                                    </div>
                                </label>

                                <div className="mt-2">
                                    <button
                                        onClick={() => handleEdit(address)}
                                        className="bg-blue-600 text-white px-3 py-1 mr-2 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(address._id)}
                                        className="bg-red-600 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>


            {/* Add Address Button */}
            <button
                onClick={toggleAddressForm}
                className=" text-black px-4 py-2  mt-2 w-full bg-gray-300 p-3  rounded-lg hover:bg-black hover:text-white   "
            >
                {isAddressFormOpen ? "Close Form" : "Add Address"}
            </button>

            {/* Address Form - Only Show When isAddressFormOpen is true */}
            {isAddressFormOpen && (
                <div className="border p-4 mt-4">
                    <h2 className="text-2xl font-bold mt-4">
                        {editingAddress ? "Edit Delivery Address" : "Add Delivery Address"}
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 max-w-lg mx-auto">
                        <input {...register("fullName")} placeholder="Full Name" className="border p-2 w-full" />
                        {errors.fullName && <p className="text-red-600">{errors.fullName.message}</p>}

                        <input {...register("phoneNumber")} placeholder="Phone Number" className="border p-2 w-full" />
                        {errors.phoneNumber && <p className="text-red-600">{errors.phoneNumber.message}</p>}

                        <input {...register("addressLine1")} placeholder="Address Line 1" className="border p-2 w-full" />
                        {errors.addressLine1 && <p className="text-red-600">{errors.addressLine1.message}</p>}

                        <input {...register("addressLine2")} placeholder="Address Line 2 (Optional)" className="border p-2 w-full" />
                        <input {...register("city")} placeholder="City" className="border p-2 w-full" />
                        {errors.city && <p className="text-red-600">{errors.city.message}</p>}

                        <input {...register("state")} placeholder="State" className="border p-2 w-full" />
                        {errors.state && <p className="text-red-600">{errors.state.message}</p>}

                        <input {...register("postalCode")} placeholder="Postal Code" className="border p-2 w-full" />
                        {errors.postalCode && <p className="text-red-600">{errors.postalCode.message}</p>}

                        <input {...register("country")} placeholder="Country" className="border p-2 w-full" />
                        {errors.country && <p className="text-red-600">{errors.country.message}</p>}

                        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                            {editingAddress ? "Update Address" : "Add Address"}
                        </button>
                    </form>
                </div>
            )}

        </div>
    );
};

export default Address;
