import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react"; // MUI alternative

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    // State for each dropdown section
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (section) => {
        setOpenDropdown(openDropdown === section ? null : section);
    };

    return (
        <div className="bg-stone-200  sm:text-center sm:grid sm:grid-cols-4 sm:gap-10 p-8 mt-8">
            {/* Logo & Copyright */}
            <div className="mb-10 sm:mb-0">
                <img
                    className="w-32 h-auto sm:mx-0 mx-auto my-4"
                    src="../images/neko-nation.png"
                    alt="Logo"
                />
                <p className="mt-12">© {currentYear} Neko Nation Pvt. Ltd. All Rights Reserved.</p>
            </div>

            {/* Company Section */}
            <div className="mb-10 sm:mb-0">
                <button className="flex justify-between w-full sm:block font-semibold"
                    onClick={() => toggleDropdown("company")}>
                    <h1>COMPANY</h1>
                    <span className="sm:hidden">
                        {openDropdown === "company" ? <ChevronUp /> : <ChevronDown />}
                    </span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openDropdown === "company" ? "max-h-40" : "max-h-0"} sm:max-h-none`}>
                    <div className="flex flex-col space-y-2 mt-2">
                        <Link to="/about-us">About Us</Link>
                        <Link to="/contact">Contact</Link>
                        <Link to="/careers">Careers</Link>
                        <Link to="/partner">Partner with Us</Link>
                    </div>
                </div>
            </div>

            {/* Social Section */}
            <div className="mb-10 sm:mb-0">
                <button className="flex justify-between w-full sm:block font-semibold"
                    onClick={() => toggleDropdown("social")}>
                    <h1>SOCIAL</h1>
                    <span className="sm:hidden">
                        {openDropdown === "social" ? <ChevronUp /> : <ChevronDown />}
                    </span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openDropdown === "social" ? "max-h-40" : "max-h-0"} sm:max-h-none`}>
                    <div className="flex flex-col space-y-2 mt-2">
                        <Link to="https://www.instagram.com/nekonation__/">Instagram</Link>
                        <Link to="/facebook">Facebook</Link>
                        <Link to="/linkedin">LinkedIn</Link>
                        <Link to="/twitter">Twitter</Link>
                    </div>
                </div>
            </div>

            {/* Privacy & Terms Section */}
            <div className="mb-10 sm:mb-0">
                <button className="flex justify-between w-full sm:block font-semibold"
                    onClick={() => toggleDropdown("privacy")}>
                    <h1>PRIVACY & TERMS</h1>
                    <span className="sm:hidden">
                        {openDropdown === "privacy" ? <ChevronUp /> : <ChevronDown />}
                    </span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openDropdown === "privacy" ? "max-h-40" : "max-h-0"} sm:max-h-none`}>
                    <div className="flex flex-col space-y-2 mt-2">
                        <Link to="/faqs">FAQs</Link>
                        <Link to="/privacy-policy">Privacy Policy</Link>
                        <Link to="/terms-of-service">Terms of Service</Link>
                        <Link to="/cancellation-policy">Cancellation Policy</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
