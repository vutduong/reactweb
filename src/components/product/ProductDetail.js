import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import ProductGlide from "./ProductGlide";
import ProductTab from "../product/ProductTab";
import config from "../../config";

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [images, setImages] = useState([]);
    const [thumbnailImages, setThumbnailImages] = useState([]);
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState(null);

    const addToCart = () => {
        const cartItem = {
            id: product.id,
            quantity: quantity,
        };

        // Check if the cart already exists in localStorage
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = existingCart.some(item => item.id === product.id)
            ? existingCart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
            )
            : [...existingCart, cartItem];

        localStorage.setItem('cart', JSON.stringify(updatedCart));
        // product.setCart(updatedCart);
        alert(`${product.name} added to the cart!`);
        // window.location.reload();
    };

    useEffect(() => {
        const fetchProductDetails = async () => {
          try {
            const response = await fetch(`${config.API_URL}/products/${id}`);
            const data = await response.json();

            setProduct(data);
            setImages(data.image || []);
            setThumbnailImages(data.thumbnail || []);
            setProductData(data.info || []); // Ensure correct field name
            console.log("Full Product Data:", data);


            let recentProducts = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
            recentProducts = recentProducts.filter((prodId) => prodId !== id); // Remove duplicates
            recentProducts.unshift(id); // Add new product at the beginning
            if (recentProducts.length > 4) recentProducts.pop();
            localStorage.setItem("recentlyViewed", JSON.stringify(recentProducts));
          } catch (error) {
            console.error("Error fetching product details:", error);
          } finally {
            setLoading(false);
          }
        };

        fetchProductDetails();
    }, [id]);

    if (loading) return <p>Loading product details...</p>;
    if (!product) return <p>Product not found</p>;

  return (
    <div className="productDetail bg-[#f2f4f7]">
        <div className="container mx-auto">
            <nav className="flex py-3 " aria-label="Breadcrumb">
                <ul className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li className="inline-flex items-center">
                        <a href="#" className="inline-flex items-center text-sm font-medium text-black hover:text-blue-600">
                        <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                        </svg>
                        Home
                        </a>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">
                        <svg className="rtl:rotate-180  w-3 h-3 mx-1 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                        </svg>
                        <span className="ms-1 text-sm font-medium text-black">productDetail</span>
                        </div>
                    </li>
                </ul>
            </nav>

            <div className="product-name">
                <h1 className="text-xl font-bold">Điện thoại iPhone 16 Pro Max 256GB</h1>
            </div>
            
            <div className="grid grid-cols-5 gap-4 my-5">
                <div className=" col-span-3">
                <ProductGlide thumbnailImages={thumbnailImages} />

                    <div className=" py-5 px-3 bg-white rounded-lg mt-6">
                        <h2 className="pb-4 text-base font-bold">Thế Giới Di Động cam kết</h2>
                        <div className="divide-y divide-gray-300">
                            <div className="grid grid-cols-2 gap-3 p-2">
                              <div className="col-span-1 py-2 inline-flex items-center">
                                <img className="w-8" src="https://cdnv2.tgdd.vn/pim/cdn/images/202412/icon sp kem theo142836105202.png" />
                                <p className="text-sm ml-2.5 pl-[5px]">Sản phẩm mới (Cần thanh toán trước khi mở hộp).</p>
                              </div>
                              <div className="col-span-1 py-2 inline-flex items-center">
                                <img className="w-8" src="https://cdnv2.tgdd.vn/pim/cdn/images/202412/icon sp kem theo142836105202.png" />
                                <p className="text-sm ml-2.5 pl-[5px]">Bộ sản phẩm gồm: Hộp, Sách hướng dẫn, Cáp, Cây lấy sim</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3 p-2">
                              <div className="col-span-1 py-2 inline-flex items-center">
                                <img className="w-8" src="https://cdnv2.tgdd.vn/pim/cdn/images/202410/Exchange232102.png" />
                                <p className="text-sm ml-2.5 pl-[5px]">Hư gì đổi nấy <span className="font-bold">12 tháng</span> tại 2961 siêu thị toàn quốc (miễn phí tháng đầu) <a href="#">Xem chi tiết</a></p>
                              </div>
                              <div className="col-span-1 py-2 inline-flex items-center">
                                <img className="w-8" src="https://cdnv2.tgdd.vn/pim/cdn/images/202410/icon%20bao%20hanh170837.png" />
                                <p className="text-sm ml-2.5 pl-[5px]">Bảo hành <span className="font-bold">chính hãng điện thoại 1 năm</span> tại các trung tâm bảo hành hãng <a href="#">Xem địa chỉ bảo hành</a></p>
                              </div>
                            </div>
                          </div>
                          
                          
                    </div>

                    <ProductTab productInfo={productData} description={product.description} />


                </div>


                <div className="col-span-2">
                    <div className="bg-white rounded-lg p-5">
                        <img src="https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/5b/49/5b49321d55dde19cc5e7f87a34c1e11a.png" />
                        <div className="mt-3">
                            <button className="bg-white border rounded-lg px-4 py-2 focus:text-blue-500 ">256GB</button>
                            <button className="bg-white border rounded-lg px-4 py-2 focus:text-blue-500 ">512GB</button>
                            <button className="bg-white border rounded-lg px-4 py-2 focus:text-blue-500 ">1TB</button>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                            <a href="#" className="inline-flex items-center space-x-2 bg-white border rounded-full py-1 px-4 focus:text-blue-500">
                              <div className="w-4 h-4 rounded-full border border-[#eaecf0] bg-[#C4AB97]"></div>
                              <p>Titan Sa Mạc</p>
                            </a>
                            <a href="#" className="inline-flex items-center space-x-2 bg-white border rounded-full py-1 px-4 focus:text-blue-500">
                              <div className="w-4 h-4 rounded-full border border-[#eaecf0] bg-[#F2F1EB]"></div>
                              <p> Titan trắng</p>
                            </a>
                            <a href="#" className="inline-flex items-center space-x-2 bg-white border rounded-full py-1 px-4 focus:text-blue-500">
                              <div className="w-4 h-4 rounded-full border border-[#eaecf0] bg-[#3F4042]"></div>
                              <p> Titan đen</p>
                            </a>
                            <a href="#" className="inline-flex items-center space-x-2 bg-white border rounded-full py-1 px-4 focus:text-blue-500">
                              <div className="w-4 h-4 rounded-full border border-[#eaecf0] bg-[#BAB4A9]"></div>
                              <p> Titan tự nhiên</p>
                            </a>
                            
                        </div>
                        <div className="rounded-t-lg mt-4 p-2 bg-[url('https://cdnv2.tgdd.vn/webmwg/2024/ContentMwg/images/scenario/olgr-dt-min.png')]">
                            <p className="text-[#fff200] p-1 font-bold text-2xl">{product.price}</p>
                        </div>
                        <div className="bg-[#f75b00] rounded-b-lg pb-2 px-2">
                            <div className="bg-white rounded-lg p-2">
                                <div className="rounded-lg border border-[#f9fafb]">
                                    <div className="bg-[#f9fafb] rounded-t-lg p-2">
                                        <p className="font-bold">Khuyến mãi  trị giá 1.050.000₫</p>
                                        <p className="text-xs">Giá và khuyến mãi có thể kết thúc sớm hơn dự kiến</p>
                                    </div>
                                        <div className="max-w-md pt-4 px-2 space-y-1 text-gray-500 list-inside dark:text-gray-400">
                                            <div className="promotion">
                                                <div className="bg-[#4a90e2] mt-1.5 rounded-full text-white text-[11px] inline-block h-4 w-4 leading-4 text-center float-left">
                                                    1
                                                </div>
                                                <p className="pl-6 text-black m-0">Tặng phiếu mua hàng mua AirPods và Apple Watch trị giá 500,000đ</p>
                                            </div>
                                            <div className="promotion">
                                                <div className="bg-[#4a90e2] mt-1.5 rounded-full text-white text-[11px] inline-block h-4 w-4 leading-4 text-center float-left">
                                                    2
                                                </div>
                                                <p className="pl-6 text-black m-0">Phiếu mua hàng mua sản phẩm giá niêm yết từ 5 triệu thuộc các nhóm TAI NGHE - LOA hãng HARMAN KARDON, JBL,MONSTER, KLIPSCH, MARSHALL, SONY; Smartwatch hãng HUAWEI, GARMIN, SAMSUNG, IMOO, OPPO, AMAZFIT trị giá 500.000đ</p>
                                            </div>
                                            <div className="promotion">
                                                <div className="bg-[#4a90e2] mt-1.5 rounded-full text-white text-[11px] inline-block h-4 w-4 leading-4 text-center float-left">
                                                    3
                                                </div>
                                                <p className="pl-6 text-black m-0">Phiếu mua hàng áp dụng mua tất cả sim có gói Mobi, Itel, Local, Vina và VNMB trị giá 50,000đ</p>
                                            </div>
                                            <div className="promotion">
                                                <div className="bg-[#4a90e2] mt-1.5 rounded-full text-white text-[11px] inline-block h-4 w-4 leading-4 text-center float-left">
                                                    4
                                                </div>
                                                <p className="pl-6 text-black m-0">Nhập mã VNPAYTGDD1 giảm từ 40,000đ đến 150,000đ (áp dụng tùy giá trị đơn hàng) khi thanh toán qua VNPAY-QR.</p>
                                            </div>
                                        </div>

                                </div>
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                    <button className="grid justify-items-center border py-1 border-blue-500 rounded-lg"  onClick={addToCart}>
                                        <svg className="w-5 h-5 text-gray-800 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"/>
                                      </svg>
                                      Thêm vào giỏ
                                    </button>
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
                
            </div>

    </div>
  );
}
export default ProductDetail;