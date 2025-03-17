import React, { useState, useEffect } from "react";
import ProductCart from "../product/ProductCart";
import { PaymentOption } from "./PaymentOption";
import config from "../../config";

function Cart() {
    const [activeTab, setActiveTab] = useState("tab1");
    const [products, setProducts] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState(localStorage.getItem("paymentMethod") || "");
    const [showExtraMethods, setShowExtraMethods] = useState(false);
    const [isAgreed, setIsAgreed] = useState(false);

    useEffect(() => {
        const fetchCartProducts = async () => {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];

            // Fetch product details for cart items using ID
            const fetchedProducts = await Promise.all(
                cart.map(async (item) => {
                    const response = await fetch(`${config.API_URL}/products/${item.id}`);
                    const product = await response.json();
                    return { ...product, quantity: item.quantity };
                })
            );

            setProducts(fetchedProducts);
        };

        fetchCartProducts();
    }, []);

    const totalPrice = products.reduce((sum, product) => sum + product.price * product.quantity, 0);

    const updateQuantity = (id, newQuantity) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id ? { ...product, quantity: newQuantity } : product
            )
        );

        // Update localStorage
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const updatedCart = cart.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const removeProduct = (id) => {
        const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);

        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const updatedCart = cart.filter((item) => item.id !== id);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const handlePaymentChange = (method) => {
        setSelectedPayment(method);
        localStorage.setItem("paymentMethod", method);
    };


    return (
        <div className="bg-[#f0f0f0] justify-center grid">
            <div className="w-[600px]">
                <div className=" border-b">
                    <div className="grid grid-cols-12 my-3">
                        <svg className="w-5 h-5 text-[#101828]" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" fill="none" viewBox="0 0 24 24"><path
                                stroke="currentColor" strokeLinecap="round"
                                strokeLinejoin="round" strokeWidth="2"
                                d="m15 19-7-7 7-7"></path></svg>
                        <div
                            className="items-center justify-center grid col-span-10">
                            <button className="text-base font-bold">Giỏ Hàng</button>
                        </div>
                    </div>
                    <div className="bg-[#f0f0f0]">
                        <div className="w-full">
                            <div className="flex">
                                <label
                                    className={`tab-label flex items-center w-1/2 justify-center cursor-pointer px-4 py-2 transition bg-white rounded-t-lg ${activeTab === "tab1" ? "border-b-2 border-blue-500" : "bg-transparent"
                                        }`}
                                    onClick={() => setActiveTab("tab1")}
                                >
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-gray-400 rounded-full flex justify-center items-center bg-white">
                                            <div className={`w-2 h-2 rounded-full ${activeTab === "tab1" ? "bg-blue-500" : "bg-transparent"}`} />
                                        </div>
                                        <span>Giao tận nơi</span>
                                    </div>
                                </label>

                                <label
                                    className={`tab-label flex items-center w-1/2 justify-center cursor-pointer px-4 py-2 transition bg-white rounded-t-lg ${activeTab === "tab2" ? "border-b-2 border-blue-500" : "bg-transparent"
                                        }`}
                                    onClick={() => setActiveTab("tab2")}
                                >
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-gray-400 rounded-full flex justify-center items-center bg-white">
                                            <div className={`w-2 h-2 rounded-full ${activeTab === "tab2" ? "bg-blue-500" : "bg-transparent"}`} />
                                        </div>
                                        <span>Nhận tại siêu thị</span>
                                    </div>
                                </label>
                            </div>

                            <div className="p-4 bg-white rounded-b-md">
                                {activeTab === "tab1" && <div>
                                    <div
                                        className="px-4 pt-4 rounded-b-md bg-white">
                                        <div
                                            className="p-2 border rounded-lg border-dotted border-blue-500 bg-[#f0f0f0]">
                                            <a href="#">
                                                <p
                                                    className="text-sm text-blue-500">
                                                    Vui lòng cung cấp thông tin
                                                    nhận hàng
                                                </p>
                                                <div className="flex items-center">
                                                    <div
                                                        className="w-4 h-4 bg-no-repeat inline-block align-middle bg-[url('https://cdn.tgdd.vn/mwgcart/v2/vue-pro/img/cart_common_sprite.f121af278046a05746c86c585.png')] bg-[length:602px_553px] bg-[-195px_-478px]"></div>
                                                    <p className="ms-1"> Phường ABC
                                                        2, Quận Bắc Từ Liêm, Hà
                                                        Nội</p>
                                                </div>
                                            </a>
                                        </div>

                                        {products && products.length > 0 ? (
                                            products.map((product) => <ProductCart key={product.id} product={product} updateQuantity={updateQuantity}
                                                removeProduct={removeProduct} />)
                                        ) : (
                                            <p className="text-center text-gray-500">Không có sản phẩm nào.</p>
                                        )}
                                    </div>

                                    <div className="p-4 mt-1 rounded-md bg-white">
                                        <div className="flex justify-between">
                                            <h3 className="text-base font-bold">Tổng
                                                tiền</h3>
                                            <p
                                                className="text-base font-bold">{totalPrice.toLocaleString("vi-VN").replace(/,/g, ".")}đ</p>
                                        </div>
                                    </div>

                                    <div className="payment-method p-4 mt-3 rounded-md bg-white">
                                        <p className="font-bold text-base">Hình thức thanh toán</p>

                                        <PaymentOption value="store" label="Thanh toán tại siêu thị gần nhất" selectedPayment={selectedPayment} onChange={handlePaymentChange} />
                                        <PaymentOption value="bank" label="Chuyển khoản ngân hàng" selectedPayment={selectedPayment} onChange={handlePaymentChange} />
                                            {showExtraMethods && (
                                                <>
                                                    <PaymentOption value="atm" label="Qua thẻ ATM (có Internet Banking)" selectedPayment={selectedPayment} onChange={handlePaymentChange} />
                                                    <PaymentOption value="visa" label="Qua thẻ quốc tế" selectedPayment={selectedPayment} onChange={handlePaymentChange} />
                                                    <PaymentOption value="momo" label="Ví MoMo" selectedPayment={selectedPayment} onChange={handlePaymentChange} />
                                                </>
                                            )}
                                            <div className="cursor-pointer text-sm text-blue-500 mt-2 rounded-t-md inline-block"
                                                onClick={() => setShowExtraMethods(!showExtraMethods)}>
                                                {showExtraMethods ? "Ẩn hình thức thanh toán khác" : "3 hình thức thanh toán khác"}
                                            </div>
                                        <div className="flex items-center mt-3">
                                            <input
                                                id="default-checkbox"
                                                type="checkbox"
                                                checked={isAgreed}
                                                onChange={() => setIsAgreed(!isAgreed)}
                                                className="w-4 h-4 text-blue-600 border-gray-200 rounded-sm"
                                            />
                                            <label htmlFor="default-checkbox" className="ms-2 text-sm">
                                                Tôi đồng ý với Chính sách xử lý dữ liệu cá nhân
                                            </label>
                                        </div>
                                        <button
                                            className={`py-1 px-6 mt-2 rounded-lg text-white text-sm w-full h-[40px] ${selectedPayment && isAgreed ? "bg-[#FC7600]" : "bg-gray-400 cursor-not-allowed"
                                                }`}
                                            disabled={!selectedPayment || !isAgreed}
                                        >
                                            Đặt hàng
                                        </button>
                                    </div>
                                </div>}
                                {activeTab === "tab2" && <div
                                    className=" p-4 bg-white">
                                    <div>
                                        <div
                                            className="p-2 border rounded-lg border-dotted border-blue-500 bg-[#f0f0f0]">
                                            <a href="#" className="flex items-center gap-1">
                                                <div className="w-4 h-4 bg-no-repeat inline-block align-middle bg-[url('//cdn.tgdd.vn/mwgcart/v2/vue-pro/img/cart_common_sprite.f121af278046a05746c86c585.png')] bg-[length:602px_553px] bg-[-177px_-478px]"></div>

                                                <p className="text-sm text-blue-500">
                                                    Vui lòng chọn siêu thị nhận hàng
                                                </p>
                                            </a>

                                        </div>
                                        {products && products.length > 0 ? (
                                            products.map((product) => <ProductCart key={product.id} product={product} updateQuantity={updateQuantity}
                                                removeProduct={removeProduct} />)
                                        ) : (
                                            <p className="text-center text-gray-500">Không có sản phẩm nào.</p>
                                        )}
                                        {/* <div
                                            className=" mt-5 grid grid-cols-8 border-b pb-3">
                                            <div className="grid col-span-1">
                                                <img
                                                    src="https://cdn.tgdd.vn/Products/Images/44/285963/hp-240-g9-i5-6l1y2pa-thumb-1-400x400.jpg"
                                                />
                                            </div>
                                            <div className="grid col-span-7 ms-2">
                                                <div className="grid grid-cols-7">
                                                    <a href="#"
                                                        className="text-sm col-span-6">Laptop
                                                        HP 240 G9 i5
                                                        1235U/8GB/512GB/Win11
                                                        (6L1Y2PA)</a>
                                                    <p
                                                        className="text-red-500 text-sm justify-self-end">4.190.000đ</p>
                                                </div>
                                                <div className="p-1 mt-2">
                                                    <p
                                                        className="text-xs bg-gray-100 inline-block p-2 rounded-md">
                                                        Màu Bạc</p>
                                                </div>

                                                <div>
                                                    <div
                                                        className="toggleButton cursor-pointer text-xs text-blue-500 p-2 mt-2 rounded-t-md inline-block">
                                                        3 Khuyến mãi
                                                    </div>
                                                    <div
                                                        className="dropdownContent ps-1 text-xs rounded-b-md rounded-tr-md bg-gray-100 hidden">
                                                        <ul>
                                                            <li
                                                                className="text-xs p-1 text-[#666] before:content-['•'] before:text-xs before:text-gray-300  before:mr-1">
                                                                Phiếu mua hàng
                                                                100.000đ áp dụng
                                                                mua balo, túi
                                                                chống sốc
                                                            </li>
                                                            <li
                                                                className="text-xs p-1 pl-1 text-[#666] before:content-['•'] before:text-xs before:text-gray-300  before:mr-1">
                                                                Nhập mã
                                                                VNPAYTGDD1 giảm
                                                                từ 40,000đ đến
                                                                150,000đ (áp
                                                                dụng tùy giá trị
                                                                đơn hàng) khi
                                                                thanh toán qua
                                                                VNPAY-QR
                                                            </li>
                                                            <li
                                                                className="text-xs p-1 text-[#666] before:content-['•'] before:text-xs before:text-gray-300  before:mr-1">
                                                                Thu cũ đổi mới:
                                                                Giảm thêm đến
                                                                500,000Đ (Không
                                                                áp dụng kèm ưu
                                                                đãi thanh toán
                                                                qua cổng, mua
                                                                kèm)
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div
                                                    className="justify-self-end mt-3">
                                                    <div className="flex">
                                                        <button
                                                            className="me-3 text-xs text-[#6e6e6e]">Xoá</button>
                                                        <button title="Giảm số lượng"
                                                            className="border rounded-l-md">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth="1.5"
                                                                stroke="currentColor"
                                                                className="size-6">
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M5 12h14" />
                                                            </svg>
                                                        </button>
                                                        <input aria-label="1" type="text"
                                                            className="w-7 text-center border"
                                                        />
                                                        <button title="Tăng số lượng"
                                                            className="border rounded-r-md">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth="1.5"
                                                                stroke="currentColor"
                                                                className="size-6">
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M12 4.5v15m7.5-7.5h-15" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}

                                    </div>

                                    <div className="p-4 mt-1 rounded-md bg-white">
                                        <div className="flex justify-between">
                                            <h3 className="text-base font-bold">Tổng
                                                tiền</h3>
                                            <p
                                                className="text-base font-bold">{totalPrice.toLocaleString()}đ</p>
                                        </div>
                                    </div>

                                    <div className="payment-method p-4 mt-3 rounded-md bg-white">
                                        <p className="font-bold text-base">Hình thức thanh toán</p>

                                        <PaymentOption value="store" label="Thanh toán tại siêu thị gần nhất" selectedPayment={selectedPayment} onChange={handlePaymentChange} />
                                        <PaymentOption value="bank" label="Chuyển khoản ngân hàng" selectedPayment={selectedPayment} onChange={handlePaymentChange} />
                                            {showExtraMethods && (
                                                <>
                                                    <PaymentOption value="atm" label="Qua thẻ ATM (có Internet Banking)" selectedPayment={selectedPayment} onChange={handlePaymentChange} />
                                                    <PaymentOption value="visa" label="Qua thẻ quốc tế" selectedPayment={selectedPayment} onChange={handlePaymentChange} />
                                                    <PaymentOption value="momo" label="Ví MoMo" selectedPayment={selectedPayment} onChange={handlePaymentChange} />
                                                </>
                                            )}
                                            <div className="cursor-pointer text-sm text-blue-500 mt-2 rounded-t-md inline-block"
                                                onClick={() => setShowExtraMethods(!showExtraMethods)}>
                                                {showExtraMethods ? "Ẩn hình thức thanh toán khác" : "3 hình thức thanh toán khác"}
                                            </div>
                                        <div className="flex items-center mt-3">
                                            <input
                                                id="default-checkbox"
                                                type="checkbox"
                                                checked={isAgreed}
                                                onChange={() => setIsAgreed(!isAgreed)}
                                                className="w-4 h-4 text-blue-600 border-gray-200 rounded-sm"
                                            />
                                            <label htmlFor="default-checkbox" className="ms-2 text-sm">
                                                Tôi đồng ý với Chính sách xử lý dữ liệu cá nhân
                                            </label>
                                        </div>
                                        <button
                                            className={`py-1 px-6 mt-2 rounded-lg text-white text-sm w-full h-[40px] ${selectedPayment && isAgreed ? "bg-[#FC7600]" : "bg-gray-400 cursor-not-allowed"
                                                }`}
                                            disabled={!selectedPayment || !isAgreed}
                                        >
                                            Đặt hàng
                                        </button>
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Cart;