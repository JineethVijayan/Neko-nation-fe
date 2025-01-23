import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import axiosInstance from "../../config/axiosInstance";

const UserNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    
    const navigate = useNavigate();
    const { currentUser, itemCount } = useUser();

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!searchQuery.trim()) return; // Avoid empty searches

        try {
            const response = await axiosInstance.get(`/product/search`, {
                params: { query: searchQuery },
            });
            setSearchResults(response.data.products); // Update search results
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent the default form submission
            handleSearch();
        }
    };

    const handleSelectResult = (id) => {
        navigate(`/user/products/${id}`); // Navigate to the ProductDetail component
        setSearchQuery(""); // Clear the search input
        setSearchResults([]); // Clear the search results
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navLinks = [
        {
            path: "/",
            value: "Home",
        },
        {
            path: "/user/products",
            value: "Products",
        },
        {
            path: "/user/about-us",
            value: "About-us",
        },
        {
            path: "/user/contact-us",
            value: "Contact-us",
        },
        {
            value: (
                <form className="relative flex items-center ms-16">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="p-1 border-b-[1px] border-black text-sm bg-[#edf6f9] focus:outline-none"
                    />
                    <button
                        type="submit"
                        onClick={handleSearch}
                        onKeyDown={handleKeyDown} // Trigger search on Enter key
                        className="absolute right-2 text-black px-2 py-1 rounded text-xs"
                    >
                        <img
                            src="../public/images/search.png"
                            alt="Search"
                            className="w-4 h-4"
                        />
                    </button>
                </form>
            ),
        },
        {
            path: "/user/bag",
            value: (
                <div className="relative flex items-center">
                    <img
                        src="../public/images/grocery-store.png"
                        alt="Bag"
                        className="w-6 h-6"
                    />
                    {!itemCount ? null : (
                        <span className="ml-2 absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {itemCount}
                        </span>
                    )}
                </div>
            ),
        },
        ...(currentUser
            ? [
                {
                    path: "/user/profile",
                    value: (
                        <div className="flex items-center">
                            <img
                                src="../public/images/user.png"
                                alt="Profile"
                                className="w-6 h-6"
                            />
                        </div>
                    ),
                },
            ]
            : [
                {
                    path: "/user/signup",
                    value: "Signup/Signin",
                },
            ]),
    ];

    return (
        <nav className="bg-[#edf6f9] fixed w-full px-4 z-20">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <img
                        className="w-32 h-auto mx-auto my-4"
                        src="../images/neko-nation.png"
                        alt="Logo"
                    />
                </div>

                <ul className="hidden md:flex space-x-4 text-xl">
                    {navLinks.map((link, index) => (
                        <Link key={index} to={link.path}>
                            <li className="text-black px-5">{link.value}</li>
                        </Link>
                    ))}
                </ul>

                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-white focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6 text-green-800"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>

            {isOpen && (
                <ul className="md:hidden flex flex-col space-y-2 mt-4">
                    {navLinks.map((link, index) => (
                        <Link key={index} to={link.path}>
                            <li className="text-green-800 px-5">{link.value}</li>
                        </Link>
                    ))}
                </ul>
            )}




            {/* Display Search Results */}
            {searchResults.length > 0 && (
                <div className="mt-4 bg-white shadow-md p-4 rounded max-h-60 overflow-y-auto">
                    <h3 className="text-lg font-bold mb-2">Search Results:</h3>
                    <ul>
                        {searchResults.map((product) => (
                            <li
                                key={product._id}
                                className="border-b py-2 cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSelectResult(product._id)}
                            >
                                {product.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default UserNavbar;
