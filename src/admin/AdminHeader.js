import { Link, useNavigate } from 'react-router-dom';
import { adminLogout } from "../auth/AuthService";
import { useState } from "react";

function AdminHeader() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
            adminLogout();
            navigate("/admin/login");
        };
    

    return (
        <nav className=" w-full bg-black">
            <div className="container mx-auto flex py-2 items-center justify-between">
                <div className="flex items-center space-y-2 space-x-2">
                    <Link to="/admin/dashboard" className="text-3xl font-bold text-white ">
                        Home
                    </Link>
                    <div className="relative">
                        <button
                            className="text-lg font-medium text-white hover:text-gray-300 transition"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            Products ▼
                        </button>
                        {isOpen && (
                            <ul className="absolute left-0 mt-2 w-40 bg-white border border-gray-300 shadow-lg rounded-lg text-sm">
                                <li>
                                    <Link
                                        to="/admin/productsmgr"
                                        className="block px-4 py-2 hover:bg-gray-100 transition"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Manage
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/admin/productscategory"
                                        className="block px-4 py-2 hover:bg-gray-100 transition"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Category
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>


                <div className="">
                    <div className="text-white ">
                        <button type="button" className="btn btn-secondary logout-btn hover:text-gray-300 transition" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default AdminHeader;