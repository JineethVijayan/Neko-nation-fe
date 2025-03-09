// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useUser } from "../../context/UserContext";
// import axiosInstance from "../../config/axiosInstance";

// const UserNavbar = () => {
//     const navigate = useNavigate();
//     const [isOpen, setIsOpen] = useState(false);
//     const [dropdownOpen, setDropdownOpen] = useState(false); // State to control dropdown
//     const [searchQuery, setSearchQuery] = useState("");
//     const [searchResults, setSearchResults] = useState([]);

//     const { currentUser, itemCount, clearUser } = useUser();

//     const handleSearch = async (e) => {
//         e.preventDefault();
//         if (!searchQuery.trim()) return;

//         try {
//             const response = await axiosInstance.get(`/product/search`, {
//                 params: { query: searchQuery },
//             });
//             setSearchResults(response.data.products);
//         } catch (error) {
//             console.error("Error fetching search results:", error);
//         }
//     };

//     const handleKeyDown = (e) => {
//         if (e.key === "Enter") {
//             e.preventDefault();
//             handleSearch();
//         }
//     };

//     const handleSelectResult = (id) => {
//         navigate(`/user/products/${id}`);
//         setSearchQuery("");
//         setSearchResults([]);
//     };

//     const toggleMenu = () => {
//         setIsOpen(!isOpen);
//     };

//     const toggleDropdown = () => {
//         setDropdownOpen(!dropdownOpen);
//     };



//     const handleLogout = async () => {
//         try {
//             const res = await axiosInstance.get('/user/logout');
//             const resData = await res.data;
//             console.log(resData);
//             // setCurrentUser(null)
//             clearUser();
//             setDropdownOpen(false);
//             navigate("/user/signin");
//         } catch (error) {
//             console.error('error logging out :', error)
//         }

//     }

//     const navLinks = [
//         { path: "/", value: "Home" },
//         { path: "/user/products", value: "Products" },
//         { path: "/user/about-us", value: "About Us" },
//         { path: "/user/contact-us", value: "Contact Us" },
//     ];

//     return (
//         <nav className="bg-[#edf6f9] fixed w-full px-4 z-20">
//             <div className="container mx-auto flex justify-between items-center">
//                 <div>
//                     <img
//                         className="w-32 h-auto mx-auto my-4"
//                         src="../images/neko-nation.png"
//                         alt="Logo"
//                     />
//                 </div>

//                 {/* Desktop Navigation */}
//                 <ul className="hidden md:flex space-x-4 text-xl">
//                     {navLinks.map((link, index) => (
//                         <li key={index} className="text-black px-5">
//                             <Link to={link.path}>{link.value}</Link>
//                         </li>
//                     ))}
//                     {/* Search Bar */}
//                     <li>
//                         <form className="relative flex items-center">
//                             <input
//                                 type="text"
//                                 placeholder="Search"
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                                 onKeyDown={handleKeyDown}
//                                 className="p-1 border-b-[1px] border-black text-sm bg-[#edf6f9] focus:outline-none"
//                             />
//                             <button
//                                 type="submit"
//                                 onClick={handleSearch}
//                                 className="absolute right-2 text-black px-2 py-1 rounded text-xs"
//                             >
//                                 <img
//                                     src="../images/search.png"
//                                     alt="Search"
//                                     className="w-4 h-4"
//                                 />
//                             </button>
//                         </form>
//                     </li>
//                     {/* Bag Icon */}
//                     <li className="relative">
//                         <Link to="/user/bag">
//                             <div className="relative flex items-center">
//                                 <img
//                                     src="../images/grocery-store.png"
//                                     alt="Bag"
//                                     className="w-6 h-6"
//                                 />
//                                 {itemCount > 0 && (
//                                     <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
//                                         {itemCount}
//                                     </span>
//                                 )}
//                             </div>
//                         </Link>
//                     </li>
//                     {/* Profile Dropdown */}
//                     <li className="relative">
//                         <div
//                             onClick={toggleDropdown}
//                             className="cursor-pointer flex items-center"
//                         >
//                             <img
//                                 src="../images/user.png"
//                                 alt="Profile"
//                                 className="w-6 h-6"
//                             />
//                         </div>
//                         {dropdownOpen && (
//                             <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow-md w-48">
//                                 {currentUser ? (
//                                     <>
//                                         <Link
//                                             to="/user/profile"
//                                             onClick={() => setDropdownOpen(false)}
//                                             className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
//                                         >
//                                             My Account
//                                         </Link>
//                                         <button
//                                             onClick={handleLogout}
//                                             className="w-full text-left block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
//                                         >
//                                             Logout
//                                         </button>
//                                     </>
//                                 ) : (
//                                     <>
//                                         <Link
//                                             to="/user/signup"
//                                             onClick={() => setDropdownOpen(false)}
//                                             className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
//                                         >
//                                             Sign Up
//                                         </Link>
//                                         <Link
//                                             to="/user/signin"
//                                             onClick={() => setDropdownOpen(false)}
//                                             className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
//                                         >
//                                             Sign In
//                                         </Link>
//                                     </>
//                                 )}
//                             </div>
//                         )}
//                     </li>
//                 </ul>

//                 {/* Mobile Menu */}
//                 <div className="md:hidden">
//                     <button onClick={toggleMenu} className="text-green-800">
//                         <svg
//                             className="w-6 h-6"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                             xmlns="http://www.w3.org/2000/svg"
//                         >
//                             <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M4 6h16M4 12h16m-7 6h7"
//                             ></path>
//                         </svg>
//                     </button>
//                 </div>
//             </div>

//             {isOpen && (
//                 <ul className="md:hidden flex flex-col space-y-2 mt-4">
//                     {navLinks.map((link, index) => (
//                         <li key={index} className="text-green-800 px-5">
//                             <Link to={link.path}>{link.value}</Link>
//                         </li>
//                     ))}
//                 </ul>
//             )}

//             {/* Search Results */}
//             {searchResults.length > 0 && (
//                 <div className="mt-4 bg-white shadow-md p-4 rounded max-h-60 overflow-y-auto">
//                     <h3 className="text-lg font-bold mb-2">Search Results:</h3>
//                     <ul>
//                         {searchResults.map((product) => (
//                             <li
//                                 key={product._id}
//                                 className="border-b py-2 cursor-pointer hover:bg-gray-100"
//                                 onClick={() => handleSelectResult(product._id)}
//                             >
//                                 {product.name}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </nav>
//     );
// };

// export default UserNavbar;











import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import axiosInstance from "../../config/axiosInstance";

const UserNavbar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const { currentUser, itemCount, clearUser } = useUser();

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        try {
            const response = await axiosInstance.get(`/product/search`, {
                params: { query: searchQuery },
            });
            setSearchResults(response.data.products);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
        }
    };

    const handleSelectResult = (id) => {
        navigate(`/user/products/${id}`);
        setSearchQuery("");
        setSearchResults([]);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = async () => {
        try {
            await axiosInstance.get('/user/logout');
            clearUser();
            setDropdownOpen(false);
            navigate("/user/signin");
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const navLinks = [
        { path: "/", value: "Home" },
        { path: "/user/products", value: "Products" },
        { path: "/user/about-us", value: "About Us" },
        { path: "/user/contact-us", value: "Contact Us" },
    ];

    return (
        <nav className="bg-[#edf6f9] fixed w-full px-4 z-20 shadow-md">
            <div className="container mx-auto flex justify-between items-center py-3">
                {/* Logo */}
                <Link to="/">
                    <img
                        className="w-32 h-auto"
                        src="../images/neko-nation.png"
                        alt="Logo"
                    />
                </Link>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex space-x-6 items-center text-lg">
                    {navLinks.map((link, index) => (
                        <li key={index} className="text-black hover:text-gray-700">
                            <Link to={link.path}>{link.value}</Link>
                        </li>
                    ))}

                    {/* Search Bar */}
                    <li>
                        <form className="relative flex items-center">
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="p-1 border-b-[1px] border-black text-sm bg-[#edf6f9] focus:outline-none"
                            />
                            <button
                                type="submit"
                                onClick={handleSearch}
                                className="absolute right-2 text-black px-2 py-1 rounded text-xs"
                            >
                                <img
                                    src="../images/search.png"
                                    alt="Search"
                                    className="w-4 h-4"
                                />
                            </button>
                        </form>
                    </li>

                    {/* Cart Icon */}
                    <li className="relative">
                        <Link to="/user/bag">
                            <div className="relative flex items-center">
                                <img
                                    src="../images/grocery-store.png"
                                    alt="Bag"
                                    className="w-6 h-6"
                                />
                                {itemCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                        {itemCount}
                                    </span>
                                )}
                            </div>
                        </Link>
                    </li>

                    {/* Profile Dropdown */}
                    <li className="relative">
                        <div
                            onClick={toggleDropdown}
                            className="cursor-pointer flex items-center"
                        >
                            <img
                                src="../images/user.png"
                                alt="Profile"
                                className="w-6 h-6"
                            />
                        </div>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow-md w-48">
                                {currentUser ? (
                                    <>
                                        <Link
                                            to="/user/profile"
                                            onClick={() => setDropdownOpen(false)}
                                            className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                                        >
                                            My Account
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to="/user/signup"
                                            onClick={() => setDropdownOpen(false)}
                                            className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                                        >
                                            Sign Up
                                        </Link>
                                        <Link
                                            to="/user/signin"
                                            onClick={() => setDropdownOpen(false)}
                                            className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                                        >
                                            Sign In
                                        </Link>
                                    </>
                                )}
                            </div>
                        )}
                    </li>
                </ul>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-gray-700">
                        <svg
                            className="w-7 h-7"
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

            {/* Mobile Navigation Menu */}
            {isOpen && (
                <ul className="md:hidden flex flex-col space-y-3 bg-[#edf6f9] p-4 rounded-lg">
                    {navLinks.map((link, index) => (
                        <li key={index} className="text-black hover:text-gray-700">
                            <Link to={link.path} onClick={() => setIsOpen(false)}>
                                {link.value}
                            </Link>
                        </li>
                    ))}

                    {/* Cart Icon in Mobile Menu */}
                    <li>
                        <Link to="/user/bag" onClick={() => setIsOpen(false)}>
                            <img
                                src="../images/grocery-store.png"
                                alt="Bag"
                                className="w-6 h-6 inline-block mr-2"
                            />
                             ({itemCount})
                        </Link>
                    </li>

                    {/* Profile Links */}
                    {currentUser ? (
                        <>
                            <Link to="/user/profile" onClick={() => setIsOpen(false)}>
                                My Account
                            </Link>
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/user/signup" onClick={() => setIsOpen(false)}>
                                Sign Up
                            </Link>
                            <Link to="/user/signin" onClick={() => setIsOpen(false)}>
                                Sign In
                            </Link>
                        </>
                    )}
                </ul>
            )}
        </nav>
    );
};

export default UserNavbar;
