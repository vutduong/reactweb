import React, { useState, useEffect } from "react";
import config from "../../config";

const RecentlyWatched = () => {
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    const fetchRecentlyViewedProducts = async () => {
      const storedSlugs = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
      if (storedSlugs.length === 0) return;

      try {
        const fetchedProducts = await Promise.all(
          storedSlugs.map(async (slug) => {
            const response = await fetch(`${config.API_URL}/products?slug=${slug}`);
            const products = await response.json();
            return products[0]; // JSON Server returns an array, so get the first match
          })
        );

        setRecentProducts(fetchedProducts.filter(Boolean)); // Remove undefined values
      } catch (error) {
        console.error("Error fetching recently viewed products:", error);
      }
    };

    fetchRecentlyViewedProducts();
  }, []);

  const removeProduct = (slug) => {
    const storedSlugs = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    const updatedSlugs = storedSlugs.filter((s) => s !== slug);
    localStorage.setItem("recentlyViewed", JSON.stringify(updatedSlugs));
    setRecentProducts((prevProducts) => prevProducts.filter((product) => product.slug !== slug));
  };
  

  // Clear all recently watched products
  const clearAll = () => {
    setRecentProducts([]);
    localStorage.removeItem("recentlyViewed");
  };

  return (
    recentProducts.length > 0 && (
      <div className="bg-white px-6 py-5 rounded-lg shadow-md mt-6 border border-gray-300">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold mb-2 text-gray-800">Sản phẩm đã xem</h2>
          <button onClick={clearAll} className="text-gray-500 rounded-lg">
            Xóa lịch sử
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {recentProducts.map((product) => (
            <div key={product.slug} className="relative flex bg-white p-2 rounded-lg border">
              <button
                onClick={() => removeProduct(product.slug)}
                className="absolute top-1 right-2 bg-red-500 text-white p-1 rounded-full text-xs hover:bg-red-600 transition"
              >
                ✖
              </button>
              <img
                src={product.image[0]} // Fix: Use the first image
                className="w-16 h-auto object-cover rounded-md"
                alt={product.name}
              />
              <div className="ms-2">
                <p className="text-xs font-normal mr-4">{product.name}</p>
                <p className="text-red-500 font-bold text-sm">{product.price}₫</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
  
};

export default RecentlyWatched;
