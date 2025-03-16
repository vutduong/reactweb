function Footer(){
    return(
        <div className="footer bg-gray-100 mt-5 ">
        <div className="container mx-auto py-5">
            <div className="grid grid-cols-4 gap-5">
                <div className="col-span-1">
                    <h3 className="text-lg font-bold">Tổng đài hỗ trợ</h3>
                    <p className="text-sm text-gray-900">Gọi mua: <a href="#" className="text-[#2f80ed]">0123 456789</a> (7:30-22:00)</p>
                    <p className="text-sm text-gray-900">Khiếu nại: <a href="#" className="text-[#2f80ed]">0123 456789</a> (7:30-22:00)</p>
                    <p className="text-sm text-gray-900">Bảo hành: <a href="#" className="text-[#2f80ed]">0123 456789</a> (7:30-22:00)</p>
                </div>
                <div className="col-span-1">
                    <h3 className="text-lg font-bold">Về công ty</h3>
                    <p>
                        <a href="#" className="hover:text-[#2f80ed] duration-300">Giới thiệu công ty (MWG.vn)</a>
                    </p>
                    <p><a href="#" className="hover:text-[#2f80ed] duration-300">Tuyển dụng</a></p>
                    <p><a href="#" className="hover:text-[#2f80ed] duration-300">Gửi góp ý, khiếu nại</a></p>
                </div>
                <div className="col-span-1">
                    <p><a href="#" className="hover:text-[#2f80ed] duration-300">Giới thiệu công ty (MWG.vn)</a></p>
                    <p><a href="#" className="hover:text-[#2f80ed] duration-300">Tuyển dụng</a></p>
                    <p><a href="#" className="hover:text-[#2f80ed] duration-300">Gửi góp ý, khiếu nại</a></p>
                </div>
                <div className="col-span-1">
                    <h3 className="text-lg font-bold">Kết nối với chúng tôi</h3>
                    <a href="#" className="hover:text-[#2f80ed] duration-300">Facebook</a>
                    <a href="#" className="hover:text-[#2f80ed] duration-300">Instagram</a>
                    <a href="#" className="hover:text-[#2f80ed] duration-300">Youtube</a>
                </div>
            </div>
        </div>
    </div>
    )
}
export default Footer;