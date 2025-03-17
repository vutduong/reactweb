import { useState, useEffect } from "react";

function ProductCart({ product, updateQuantity, removeProduct }) {
  const [quantity, setQuantity] = useState(product.quantity);
  const [showPromotions, setShowPromotions] = useState(false);

  useEffect(() => {
    setQuantity(product.quantity); // Sync with parent component state
  }, [product.quantity]);

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantity(product.id, newQuantity);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantity(product.id, newQuantity);
    }
  };

  const handleQuantityChange = (e) => {
    let value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
      updateQuantity(product.id, value);
    }
  };

  return (
    <div className="mt-5 grid grid-cols-8 border-b pb-3">
      <div className="grid col-span-1">
        <img src={product.image?.[0] || "fallback-image.jpg"} className="w-full h-auto" />
      </div>

      <div className="grid col-span-7 ms-2">
        <div className="grid grid-cols-7">
          <button href="#" className="text-sm col-span-6">{product.name}</button>
          <p className="text-red-500 text-sm col-span-1 justify-self-end">
            {product.price * quantity}đ
          </p>
        </div>

        <div className="p-1 mt-2">
          <p className="text-xs bg-gray-100 inline-block p-2 rounded-md">{product.color}</p>
        </div>
        <div>
          <div
            onClick={() => setShowPromotions(!showPromotions)}
            className="cursor-pointer text-xs text-blue-500 p-2 mt-2 rounded-t-md inline-block"
          >
            {product.promotion?.length} Khuyến mãi
          </div>

          {/* Show promotions if `showPromotions` is true */}
          {showPromotions && (
            <div className="ps-1 text-xs rounded-b-md rounded-tr-md bg-gray-100">
              <ul>
                {product.promotion?.map((promo, index) => (
                  <li
                    key={index}
                    className="text-xs p-1 text-[#666] before:content-['•'] before:text-xs before:text-gray-300 before:mr-1"
                  >
                    {promo}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>


        <div className="justify-self-end mt-3">
          <div className="flex">
            <button onClick={() => removeProduct(product.id)} className="me-3 text-xs text-[#6e6e6e]">
              Xoá
            </button>
            <button title="Giảm số lượng" className="border rounded-l-md" onClick={decreaseQuantity}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
              </svg>
            </button>
            <input
              type="text"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-10 text-center p-0 border"
            />
            <button title="Tăng số lượng" className="border rounded-r-md" onClick={increaseQuantity}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCart;
