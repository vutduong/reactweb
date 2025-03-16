import React, { useState } from "react";

export default function Tabs() {
    const [activeTab, setActiveTab] = useState("news"); // Default tab

    return (
        <div className="fifth-section mt-5">
            <div className="w-full mx-auto bg-white shadow-md rounded-lg mt-3 p-5">
                <div className="flex items-center">
                    <img className="w-10 h-10" src="https://cdnv2.tgdd.vn/webmwg/2024/ContentMwg/images/tet/tgdd/2025/am/icon-title05.png" />
                    <h3 className="text-2xl font-bold">Bài tin</h3>
                </div>

                {/* Tab Navigation */}
                <nav className="flex gap-2 mt-3">
                    <button
                        className={`p-2 text-center font-medium border-2 rounded-lg focus:outline-none
                        ${activeTab === "news" ? "border-blue-500 text-blue-500" : "border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-500"}`}
                        onClick={() => setActiveTab("news")}
                    >
                        24h công nghệ
                    </button>
                    <button
                        className={`p-2 text-center font-medium border-2 rounded-lg focus:outline-none
                        ${activeTab === "qa" ? "border-blue-500 text-blue-500" : "border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-500"}`}
                        onClick={() => setActiveTab("qa")}
                    >
                        Hỏi đáp
                    </button>
                </nav>

                {/* Tab Content */}
                <div className="mt-3">
                    {activeTab === "news" && (
                        <div className="grid grid-cols-4 gap-3">
                            <a href="#" className="news">
                                <img className="w-full rounded-lg mb-2" src="https://cdnv2.tgdd.vn/mwg-static/tgdd/News/Thumb/1574204/cach-dang-ky-goi-cuoc-tet5g-viettel-2638725355739797711.jpg" />
                                <p className="text-sm text-black">Hướng dẫn cách đăng ký gói cước TET5G Viettel...</p>
                            </a>
                            <a href="#" className="news">
                                <img className="w-full rounded-lg mb-2" src="https://cdnv2.tgdd.vn/mwg-static/common/News/Thumb/1574187/gsmarena-poco-x7-thumb638725526753958384.jpg" />
                                <p className="text-sm text-black">Trên tay POCO X7: Ngoại hình bắt mắt...</p>
                            </a>
                        </div>
                    )}

                    {activeTab === "qa" && (
                        <div className="grid grid-cols-4 gap-3">
                            <a href="#" className="qa">
                                <img className="w-full rounded-lg mb-2" src="https://cdn.tgdd.vn//Files/News/2023/09/20/tim-hieu-chi-tiet-ve-gps-bang-tan-kep-tren-dong-thumb-560x292.png" />
                                <p className="text-sm text-black">GPS băng tần kép trên dòng smartphone mới...</p>
                            </a>
                            <a href="#" className="qa">
                                <img className="w-full rounded-lg mb-2" src="https://cdn.tgdd.vn//Files/News/2024/03/19/samsung-galaxy-s25-ultra-khi-nao-ra-mat-gia-bao-thumb-560x292.jpg" />
                                <p className="text-sm text-black">Samsung Galaxy S25 Ultra: Khi nào ra mắt?</p>
                            </a>
                        </div>
                    )}
                </div>
                <div className="grid items-center justify-center py-5">
                    <a href="#"className="text-[#2f80ed]">See more</a>
                </div>
            </div>
        </div>
    );
}
