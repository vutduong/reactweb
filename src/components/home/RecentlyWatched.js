import React, { useState, useEffect } from "react";

const RecentlyWatched = () => {
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    const fetchRecentlyViewedProducts = async () => {
      const storedIds = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
      if (storedIds.length === 0) return;

      try {
        const fetchedProducts = await Promise.all(
          storedIds.map(async (id) => {
            const response = await fetch(`http://localhost:5000/products/${id}`);
            return response.json();
          })
        );

        setRecentProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching recently viewed products:", error);
      }
    };

    fetchRecentlyViewedProducts();
  }, []);

  // Remove a single product
  const removeProduct = (id) => {
    const updatedList = recentProducts.filter((product) => product.id !== id);
    setRecentProducts(updatedList);

    const updatedIds = updatedList.map((product) => product.id);
    localStorage.setItem("recentlyViewed", JSON.stringify(updatedIds));
  };

  // Clear all recently watched products
  const clearAll = () => {
    setRecentProducts([]);
    localStorage.removeItem("recentlyViewed");
  };

  return (
    <div className="bg-white px-6 py-5 rounded-lg shadow-md mt-6 border border-gray-300">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold mb-2 text-gray-800">Sản phẩm đã xem</h2>
      <button
            onClick={clearAll}
            className=" text-gray-500 rounded-lg "
          >
            Xóa lịch sử
          </button></div>
      {recentProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-4 gap-2">
            {recentProducts.map((product) => (
              <div key={product.id} className="relative flex bg-white p-2 rounded-lg border">
                <button
                  onClick={() => removeProduct(product.id)}
                  className="absolute top-1 right-2 bg-red-500 text-white p-1 rounded-full text-xs hover:bg-red-600 transition"
                >
                  ✖
                </button>
                <img
                  src={product.image}
                  className="w-16 h-auto object-cover rounded-md"
                />
                <div className="ms-2">
                <p className="text-xs font-normal mr-4">{product.name}</p>
                <p className="text-red-500 font-bold text-sm">{product.price}₫</p>
                </div>
              </div>
            ))}
          </div>
          
        </>
      ) : (
        <p className="text-center text-gray-500">No recently viewed products.</p>
      )}
    </div>
  );
};

export default RecentlyWatched;
