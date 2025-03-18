function Login(){
    return(
        <div className="container mx-auto">
            <div className="grid grid-cols-2 p-20">
                <div className="p-3">
                    <img src="https://cdn.tgdd.vn/2022/10/banner/TGDD-540x270.png" alt=""/>
                </div>
                <div className="rounded-lg shadow-lg bg-white grid  items-center justify-items-center mx-10">
                    <div>
                        <h1 className="text-2xl">Tra cứu thông tin đơn hàng</h1>
                        <form className="mt-6 mb-3">   
                            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-2 flex items-center ps-3 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                                    </svg>                                  
                                </div>
                                <input type="search" id="default-search" className="block w-full p-3 text-center text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50" placeholder="Nhập số điện thoại mua hàng" required />
                            </div>
                        </form>
                        <button  className="px-4 py-3 w-full rounded-full shadow-md bg-[#f96f3a] text-lg text-white font-medium hover:shadow-lg">
                            Tiếp tục
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;