import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import GlideCarousel from './Glide';
import ProductCard from '../product/ProductCard';
import Tabs from './Tabs';
import Discount from './Discount';
import { Link } from "react-router-dom";
import RecentlyWatched from "./RecentlyWatched";
import config from "../../config";

function Home() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]); // Fetched categories
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [activeSlide, setActiveSlide] = useState(0);

    // Fetch categories from API and limit to 5
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${config.API_URL}/categories`);
                // Limit to 5 categories
                const limitedCategories = response.data.slice(0, 5);
                setCategories(limitedCategories);
                if (limitedCategories.length > 0) {
                    setSelectedCategory(limitedCategories[0].id); // Default to first category's id
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${config.API_URL}/products`);
                setProducts(response.data);
            } catch (err) {
                console.error("Error fetching products:", err);
            }
        };
        fetchProducts();
    }, []);

    // When the selected category changes, reset the active slide to 0.
    useEffect(() => {
        setActiveSlide(0);
    }, [selectedCategory]);

    // Filter products based on the selected category ID
    const filteredProducts = selectedCategory
        ? products.filter(
            (product) =>
                String(product.category) === String(selectedCategory)
        )
        : [];

    // Helper function to split an array into chunks of given size
    const chunkArray = (arr, size) => {
        const chunks = [];
        for (let i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size));
        }
        return chunks;
    };

    // Group products into slides with 12 products
    const slides = useMemo(() => {
        return chunkArray(filteredProducts, 12);
      }, [filteredProducts]);

    const handlePrev = () => {
        setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    return (
        <>
            <div className="home pb-2 relative grid bg-left-bottom bg-[size:100%] bg-fixed bg-[url('https://cdnv2.tgdd.vn/webmwg/2024/ContentMwg/images/tet/tgdd/2025/am/bg-main.png')]">
                <div className="container mx-auto">
                    <div className="xl:mt-8 relative">
                        <RecentlyWatched />
                        <div className=" flex flex-row justify-between relative mb-5 mt-5">
                            <div className="flex items-center">
                                <img className="w-10 h-10" src="https://cdnv2.tgdd.vn/webmwg/2024/ContentMwg/images/tet/tgdd/2025/am/icon-title01.png" />
                                <h3 className="text-2xl font-bold">Khuyến mãi Online</h3>
                            </div>
                            <img className="w-72 absolute right-0 top-[-20px]" src="https://cdnv2.tgdd.vn/webmwg/2024/ContentMwg/images/tet/tgdd/2025/am/icon-bgmenu-dt.png" />
                        </div>

                        <div className="first-section-tab shadow-md bg-white rounded-lg">
                            <div
                                className="first-section-nav grid items-center gap-2 xl:grid-cols-5 border-b border-gray-300"
                                id="fullWidthTab"
                                role="tablist"
                            >
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`py-2 text-center ${selectedCategory === category.id
                                            ? "text-blue-500 font-bold border-b-2 border-blue-500"
                                            : "text-gray-500"
                                            }`}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                            <div id="fullWidthTabContent">
                                {slides.length > 0 ? (
                                    <div className="first-section-products xl:pt-4" role="tabpanel">
                                        <div className="relative w-full overflow-hidden pb-4">
                                            <div
                                                className="flex transition-transform duration-700 ease-in-out"
                                                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                                            >
                                                {slides.map((slide, index) => (
                                                    <div key={index} className="w-full flex-shrink-0 px-7">
                                                        <div className="grid grid-rows-2 grid-cols-6 gap-2">
                                                            {slide.map((product) => (
                                                                <ProductCard key={product.id} product={product} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={handlePrev}
                                                className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                                            >
                                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-slate-300/30 group-hover:bg-white/50 dark:group-hover:bg-slate-200 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                                    <svg
                                                        className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 6 10"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M5 1 1 5l4 4"
                                                        />
                                                    </svg>
                                                    <span className="sr-only">Previous</span>
                                                </span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleNext}
                                                className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                                            >
                                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-slate-300/30 group-hover:bg-white/50 dark:group-hover:bg-slate-200 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                                    <svg
                                                        className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 6 10"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="m1 9 4-4-4-4"
                                                        />
                                                    </svg>
                                                    <span className="sr-only">Next</span>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="col-span-full text-center py-4">
                                        Không có sản phẩm trong danh mục này.
                                    </p>
                                )}
                            </div>

                        </div>

                        <GlideCarousel />

                        <div className="third-section shadow-md mt-5">
                            <div className="third-section-tab bg-white rounded-lg pt-1">
                                <div className="flex items-center gap-2 m-2">
                                    <img className="w-10 h-10 " src="https://cdnv2.tgdd.vn/webmwg/2024/ContentMwg/images/tet/tgdd/2025/am/icon-title02.png" />
                                    <h3 className="text-2xl font-bold">Gợi ý cho bạn</h3>
                                </div>
                                <div className="third-section-product px-7">
                                    <div className="grid auto-rows-auto grid-cols-6 gap-2">
                                        {products.map((product) => (
                                            <ProductCard key={product.id} product={product} />
                                        ))}
                                    </div>
                                    <div className="grid items-center justify-center py-5">
                                        <Link to="#" className="text-[#2f80ed]">See more</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="forth-section mt-5">
                            <div className="flex items-center m-2 gap-2">
                                <img className="w-10 h-10" src="https://cdnv2.tgdd.vn/webmwg/2024/ContentMwg/images/tet/tgdd/2025/am/icon-title04.png" />
                                <h3 className="text-2xl font-bold">Gian hàng ưu đãi</h3>
                            </div>
                            <div className="grid grid-cols-4 gap-7">
                                <Discount />
                                <Link to="#">
                                    <img className="rounded-lg" src="https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/57/c4/57c41ab8b773afaf7ed75ca00512c473.png" />
                                </Link>
                                <Link to="#">
                                    <img className="rounded-lg" src="https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/39/29/39296a6d0d1ff6f2be6099e41d88b18b.png" />
                                </Link>
                                <Link to="#">
                                    <img className="rounded-lg" src="https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/79/00/7900765bcf302de807c9e11c2dd5d851.png" />
                                </Link>
                            </div>
                        </div>

                        <Tabs />
                    </div>
                </div>
            </div>
        </>
    );
}
export default Home;