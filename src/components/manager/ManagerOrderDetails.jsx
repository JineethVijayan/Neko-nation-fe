import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '../../config/axiosInstance';
import { useParams } from 'react-router-dom';

const ManagerOrderDetails = () => {
    const { id } = useParams();

    const [order, setOrder] = useState({});
    const [items, setItems] = useState([]);
    const [price, setPrice] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState({});
    const [loading, setLoading] = useState(true);

    // Reference to printable content
    const printRef = useRef(null);

    useEffect(() => {
        const getOrder = async () => {
            try {
                setLoading(true);
                const orderId = id;
                const res = await axiosInstance.get(`/order/get-orderByUserId/${orderId}`);
                const resData = res.data;

                setOrder(resData.order);
                setItems(resData.order.bag.items);
                setPrice(resData.order.bag.totalPrice);
                setName(resData.order.user.firstName);
                setAddress(resData.order.address);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        getOrder();
    }, [id]);

    // Custom print function without react-to-print
    const handlePrint = () => {
        if (!printRef.current) {
            console.error("Print container not found");
            return;
        }

        const printContent = printRef.current.innerHTML;
        const originalContent = document.body.innerHTML;

        // Create a print-specific stylesheet
        const printStyles = `
            @media print {
                body * {
                    visibility: hidden;
                }
                #print-container, #print-container * {
                    visibility: visible;
                }
                #print-container {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                }
            }
        `;

        // Create a new window for printing
        const printWindow = window.open('', '_blank');
        
        if (!printWindow) {
            alert("Please allow pop-ups for this website to print");
            return;
        }

        // Set up the print window
        printWindow.document.write(`
            <html>
                <head>
                    <title>Customer Details</title>
                    <style>${printStyles}</style>
                </head>
                <body>
                    <div id="print-container">
                        ${printContent}
                    </div>
                </body>
            </html>
        `);

        printWindow.document.close();
        
        // Wait for content to load before printing
        printWindow.onload = function() {
            printWindow.focus();
            printWindow.print();
            // Close the window after printing (or when print dialog is closed)
            printWindow.onafterprint = function() {
                printWindow.close();
            };
        };
    };

    return (
        <div className='pt-24'>
            <div className='grid grid-flow-col grid-cols-6 gap-4 m-4'>
                <div className='col-span-4 min-h-[500px] border rounded'>
                    <h1 className='border rounded p-4 font-bold'>Order Details</h1>

                    {items.map((item) => (
                        <div key={item._id} className="justify-self-center">
                            <div className="grid grid-cols-8 items-center border p-4 relative justify-between">
                                {/* Product Name */}
                                <div className="ms-56 absolute top-6 col-span-6 text-center">
                                    <h3 className="text-xl font-medium">{item.product.name}</h3>
                                </div>

                                {/* Product Image */}
                                <div className="ms-10 col-span-1 w-24 h-auto">
                                    <img
                                        src={item.product?.images?.[0]}
                                        className="w-full h-24 object-contain"
                                        alt={item.product.name}
                                    />
                                </div>

                                <div className="col-span-5 flex flex-row ms-20 mt-10 justify-between w-full">
                                    {/* Size */}
                                    <div className="w-56">
                                        <p>Size: {item.size}</p>
                                    </div>

                                    {/* Color */}
                                    <div className="w-56 ms-10">
                                        <p>Color: {item.color}</p>
                                    </div>

                                    {/* Quantity */}
                                    <div className="w-56 ms-10">
                                        <p>Quantity: {item.quantity}</p>
                                    </div>

                                    {/* Price */}
                                    <div className="w-80 ms-10">
                                        <p>Total Price: ₹{item.product.price}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="justify-self-end mt-5 me-10 w-96">
                        <div className="flex justify-between">
                            <h3 className="mb-10">Subtotal</h3>
                            <h3>₹{price}</h3>
                        </div>
                    </div>
                </div>

                <div className='col-span-2'>
                    <h1 className='border rounded p-4 font-bold'>Customer</h1>

                    {/* Print content container */}
                    <div className='rounded w-96 border'>
                        <div  className="print-section">
                            {!loading && address?.addressLine1 ? (
                                <>
                                    <div className='border rounded p-4 font-semibold flex justify-between'>
                                        <div className='flex'>
                                            <img src="/images/account.png" className="w-6 h-6" alt="user icon" />
                                            <h1 className='ms-3'>{name}</h1>
                                        </div>
                                        <div>
                                            <span className='text-xl'>&gt;</span>
                                        </div>
                                    </div>

                                    <div className='border rounded p-4' ref={printRef}>
                                        <h1 className='font-bold mb-3'>Shipping Address</h1>
                                        <p>{address.addressLine1}</p>
                                        {address.addressLine2 && <p>{address.addressLine2}</p>}
                                        <p>{address.city}, {address.state}, {address.country}</p>
                                        <p>{address.postalCode}</p>
                                    </div>
                                </>
                            ) : (
                                <div className="p-4 text-center text-gray-400">
                                    {loading ? 'Loading customer details...' : 'No address information available'}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Print button */}
                    <button
                        onClick={handlePrint}
                        disabled={loading || !address?.addressLine1}
                        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 ml-4 mt-4 disabled:opacity-50"
                    >
                        {loading ? 'Loading...' : 'Print Customer Details'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManagerOrderDetails;