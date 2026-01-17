import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaHome, FaStore, FaStar } from "react-icons/fa";

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.role;

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };


    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const goHome = () => {
        if (role === "SYSTEM_ADMIN") navigate("/admin");
        else if (role === "STORE_OWNER") navigate("/owner");
        else navigate("/user");
    };

    return (
        <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">

            <h1
                className="text-xl font-bold cursor-pointer"
                onClick={goHome}
            >
                StoreRatings
            </h1>


            <div className="flex gap-6 items-center">

                <button
                    onClick={goHome}
                    className="flex items-center gap-2 hover:underline"
                >
                    <FaHome /> Home
                </button>




                {role === "NORMAL_USER" && (
                    <>
                        <button
                            onClick={() => navigate("/user/stores")}
                            className="flex items-center gap-2"
                        >
                            <FaStore /> Stores
                        </button>

                        <button
                            onClick={() => navigate("/user/ratings")}
                            className="flex items-center gap-2"
                        >
                            <FaStar /> My Ratings
                        </button>
                    </>
                )}




                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setOpen(!open)}
                        className="bg-white text-blue-600 p-2 rounded-full hover:bg-gray-100"
                    >
                        <FaUser />
                    </button>

                    {open && (
                        <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-md">
                            <button
                                onClick={() => {
                                    setOpen(false);
                                    navigate("/change-password");
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Change Password
                            </button>

                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
