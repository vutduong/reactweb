function Footer(){
    return(
        <div className="footer bg-gray-100 mt-5 ">
        <div className="container mx-auto py-5">
            <div className="grid grid-cols-4 gap-5">
                <div className="col-span-1">
                    <h3 className="text-lg font-bold">Tổng đài hỗ trợ</h3>
                    <p className="text-sm text-gray-900">Gọi mua: <button href="#" className="text-[#2f80ed]">0123 456789</button> (7:30-22:00)</p>
                    <p className="text-sm text-gray-900">Khiếu nại: <button href="#" className="text-[#2f80ed]">0123 456789</button> (7:30-22:00)</p>
                    <p className="text-sm text-gray-900">Bảo hành: <button href="#" className="text-[#2f80ed]">0123 456789</button> (7:30-22:00)</p>
                </div>
                <div className="col-span-1">
                    <h3 className="text-lg font-bold">Về công ty</h3>
                    <p>
                        <button href="#" className="hover:text-[#2f80ed] duration-300">Giới thiệu công ty (MWG.vn)</button>
                    </p>
                    <p><button href="#" className="hover:text-[#2f80ed] duration-300">Tuyển dụng</button></p>
                    <p><button href="#" className="hover:text-[#2f80ed] duration-300">Gửi góp ý, khiếu nại</button></p>
                </div>
                <div className="col-span-1">
                    <p><button href="#" className="hover:text-[#2f80ed] duration-300">Giới thiệu công ty (MWG.vn)</button></p>
                    <p><button href="#" className="hover:text-[#2f80ed] duration-300">Tuyển dụng</button></p>
                    <p><button href="#" className="hover:text-[#2f80ed] duration-300">Gửi góp ý, khiếu nại</button></p>
                </div>
                <div className="col-span-1">
                    <h3 className="text-lg font-bold">Kết nối với chúng tôi</h3>
                    <button href="#" className="hover:text-[#2f80ed] duration-300">Facebook</button>
                    <button href="#" className="hover:text-[#2f80ed] duration-300">Instagram</button>
                    <button href="#" className="hover:text-[#2f80ed] duration-300">Youtube</button>
                </div>
            </div>
        </div>
    </div>
    )
}
export default Footer;