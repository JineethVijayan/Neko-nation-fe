import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosInstance";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Bag = () => {
    const { currentUser, loading: userLoading, itemCount, setItemCount } = useUser();

    const [bag, setBag] = useState({ items: [], totalPrice: 0 });
    const [loading, setLoading] = useState(true);
    const [bagId, setBagId] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const getBag = async () => {
            if (!currentUser?._id) return; // Ensure currentUser exists before making API calls

            try {
                const userId = currentUser._id;
                console.log("Fetching bag for user:", userId);

                const res = await axiosInstance.get(`/bag/get-bag/${userId}`);
                const resData = res.data;
                console.log("Bag data fetched:", resData);

                setBag(resData.bag);
                setItemCount(resData.bag.totalItems);
                setBagId(resData.bag._id);
            } catch (error) {
                console.error("Error fetching bag:", error);
            } finally {
                setLoading(false);
            }
        };

        // **Wait until user loading is complete before fetching the bag**
        if (!userLoading) {
            if (currentUser) {
                getBag();
            } else {
                setLoading(false); // Stop loading if no user
            }
        }
    }, [currentUser, userLoading]);


    if (loading) {
        return (
            <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
            </div>
        )
    }


    if (!bag?.items?.length) return <div>Your bag is empty.</div>;

    const handleUpdateBagItem = async (itemId, newSize, newColor, newQuantity) => {
        try {
            const res = await axiosInstance.put("/bag/update-bagitem", {
                userId: currentUser._id,
                itemId,
                size: newSize,
                color: newColor,
                quantity: newQuantity,
            });

            if (res.data) {
                setBag(res.data.bag); // Update bag state with the latest data
                setItemCount(res.data.bag.totalItems);
            }
        } catch (error) {
            console.error("Error updating bag item:", error);
            toast.error("Failed to update bag item");
        }
    };

    const deleteBagItem = async (itemId) => {
        try {
            const userId = currentUser._id;
            const res = await axiosInstance.post(`/bag/delete-item`, { userId, itemId });
            console.log(res.data);

            setBag(res.data.bag);
            setItemCount(res.data.bag.totalItems);
        } catch (error) {
            console.error("Error deleting bag item:", error);
            toast.error('Error deleting bag item')
            throw error;
        }
    };

    const handleClick = () => {
        navigate(`/order-details/${bagId}`);
    };

    return (
        <div className="pt-24">
            <div>
                {bag.items?.map((item) => (
                    <div key={item._id} className=" justify-self-center">
                        <div className="grid grid-cols-8  items-center border p-4 relative justify-between ">

                            {/* Product Name */}
                            <div className=" ms-56 absolute top-6 col-span-6 text-center">
                                <h3 className=" text-xl font-medium ">{item.product.name}</h3>
                            </div>

                            {/* Product Image */}
                            <div className="ms-10  col-span-1 w-24 h-auto">
                                <img
                                    src={item.product?.images?.[0]}
                                    className="w-full h-24 object-contain"
                                    alt={item.product.name}
                                />
                            </div>

                            <div className=" col-span-5 flex flex-row ms-20  mt-10 justify-between">
                                {/* Size Selector */}
                                <div className=" w-22 ">
                                    <label>
                                        Size:
                                        <select
                                            value={item.size}
                                            onChange={(e) =>
                                                handleUpdateBagItem(item._id, e.target.value, item.color, item.quantity)
                                            }
                                        >
                                            {item.product.sizes?.map((size) => (
                                                <option key={size} value={size}>
                                                    {size}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </div>

                                {/* Color Selector */}
                                <div className="w-26">
                                    <label>
                                        Color:
                                        <select
                                            value={item.color}
                                            onChange={(e) =>
                                                handleUpdateBagItem(item._id, item.size, e.target.value, item.quantity)
                                            }
                                        >
                                            {item.product.colors?.map((color) => (
                                                <option key={color} value={color}>
                                                    {color}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </div>



                                {/* Quantity Controls */}
                                <div className=" w-40">
                                    <p>
                                        Quantity:
                                        <button
                                            className="px-2 mx-1 border"
                                            onClick={() =>
                                                handleUpdateBagItem(item._id, item.size, item.color, item.quantity - 1)
                                            }
                                        >
                                            -
                                        </button>
                                        {item.quantity}
                                        <button
                                            className="px-2 mx-1 border"
                                            onClick={() =>
                                                handleUpdateBagItem(item._id, item.size, item.color, item.quantity + 1)
                                            }
                                        >
                                            +
                                        </button>
                                    </p>
                                </div>


                                {/* Price */}
                                <div className="w-24">
                                    <p>Price: ₹{item.product.price}</p>
                                </div>


                            </div>

                            {/* Delete Button */}
                            <div className="col-span-1  ms-44 ">
                                <button className="w-16 h-16" onClick={() => deleteBagItem(item._id)}>

                                    <img
                                        src="../images/delete.png"
                                        alt="Search"
                                        className="w-4 h-4" />

                                </button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            <div className="justify-self-end mt-5 me-10 w-96">
                <div className="flex justify-between">
                    <h3 className="mb-10">Subtotal</h3>
                    <h3>₹{bag.totalPrice}</h3>
                </div>
                <button
                    onClick={handleClick}
                    className="bg-black text-white p-2 hover:bg-slate-900 w-full mb-10"
                >
                    Proceed to Buy
                </button>
            </div>
        </div>
    );
};

export default Bag;
