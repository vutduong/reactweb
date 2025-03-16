import { Link } from 'react-router-dom';
import '../App.css';
import React, {useState, useEffect, useMemo } from "react";
import HeaderCategory from './category/HeaderCategory';

function Header({ cart }) {
    const [categories, setCategories] = useState([]);
    const cartCount = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart])
    
    useEffect(() => {
        fetch("http://localhost:5000/categories")
          .then((res) => res.json())
          .then((data) => setCategories(data))
          
          .catch((error) => console.error("Error fetching categories:", error));
          
      }, []);
    return (
        <>
        <div className="header-top sticky z-50 top-0 bg-yellow-500 w-full">
            <div
                className="header container mx-auto flex items-center py-2 justify-between">
                <Link to="/">
                    <img className="w-64"
                        src="https://cdnv2.tgdd.vn/webmwg/2024/ContentMwg/images/tet/tgdd/2025/am/logo_desktop.png"
                        />
                </Link>
                <form className="max-w-md ">
                    <label htmlFor="default-search"
                        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative w-96">
                        <div
                            className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none ">
                            <svg className="w-4  text-gray-500 dark:text-gray-400"
                                xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 20 20">
                                <path stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round" strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="default-search"
                            className="block w-full py-2 ps-10 text-sm rounded-full"
                            placeholder="Search..." required />
                    </div>
                </form>
                <Link to={`/login`} type="button"
                    className="px-5 py-2 text-base text-center inline-flex items-center text-black font-light hover:bg-orange-300 rounded-full ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" strokeWidth="1.5"
                        stroke="currentColor" className="size-6 pe-1">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    Sign in
                </Link>
                <Link to={`/Cart`} className="relative px-5 py-2 text-base text-center inline-flex items-center text-black font-light hover:bg-orange-300 rounded-full ">
                <span className="absolute inline-flex items-center justify-center w-3 h-3 text-xs font-light text-white bg-red-500  border-white rounded-full top-[9px] end-[53px]  dark:border-gray-900">{cartCount}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                    Cart
                </Link>
                <button type="button"
                    className="px-5 py-2 text-base text-center inline-flex items-center text-black font-light hover:bg-orange-200 bg-orange-300 rounded-full w-72">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" strokeWidth="1.5"
                        stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    Location
                </button>
            </div>
        </div>

        <div className="header-down  bg-yellow-500">
            <div className="header container mx-auto flex items-center justify-between">
                {categories.length > 0
                    ? categories.map((category) => <HeaderCategory key={category.id} category={category} />)
                    : <p>Loading...</p>}
            </div>
        </div>
        </>
    )
}
export default Header;