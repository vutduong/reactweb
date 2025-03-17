import { useState } from "react";

const ProductTab = ({ productInfo, description }) => {
  const [activeTab, setActiveTab] = useState("product-info");

  return (
    <div className="p-5 bg-white rounded-lg xl:mt-6">
      <div className="grid place-content-center">
        <nav className="grid grid-cols-2 gap-3">
          <button
            className={`px-12 tab-btn border-gray-400 text-center font-medium border-2 rounded-lg 
            hover:text-blue-500 hover:border-blue-500 focus:outline-none ${
              activeTab === "product-info" ? "text-blue-500 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab("product-info")}
          >
            Thông số kỹ thuật
          </button>
          <button
            className={`p-2 tab-btn border-gray-400 text-center font-medium border-2 rounded-lg 
            hover:text-blue-500 hover:border-blue-500 focus:outline-none ${
              activeTab === "product-preview" ? "text-blue-500 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab("product-preview")}
          >
            Bài viết đánh giá
          </button>
        </nav>
      </div>

      <div className="mt-4">
        {activeTab === "product-info" && <ProductInfo productInfo={productInfo} />}
        {activeTab === "product-preview" && <ProductReview description={description} />}
      </div>
    </div>
  );
};

const ProductInfo = ({ productInfo }) => {
  if (!productInfo || productInfo.length === 0) {
    return <p>Không có thông tin sản phẩm.</p>;
  }

  return (
    <div className="tab-content grid grid-cols-1 gap-3">
      {productInfo.map((section, index) => (
        <Dropdown key={index} title={section.title}>
          {section.items.map((item, idx) => (
            <DropdownItem key={idx} label={item.label} value={item.value} link={item.link} />
          ))}
        </Dropdown>
      ))}
    </div>
  );
};

const ProductReview = ({ description }) => (
  <div className="tab-content p-4 bg-gray-100 rounded-lg">
    {description ? (
      <p className="text-gray-700">{description}</p>
    ) : (
      <p className="text-gray-600">Chưa có bài viết đánh giá nào.</p>
    )}
  </div>
);

const Dropdown = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block w-full">
      <button
        className="productDropdownButton text-black bg-gray-200 hover:bg-gray-400 font-medium rounded-lg text-sm px-5 py-3.5 text-center inline-flex items-center justify-between w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <svg
          className={`w-2.5 h-2.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        className={`productDropdown overflow-hidden transition-all duration-300 ease-in-out bg-white ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

const DropdownItem = ({ label, value, link }) => (
  <div className="grid grid-cols-3 border-b border-gray-300 p-3">
    <div className="col-span-1">
      {link ? (
        <button className="text-blue-500">
          {label}
        </button>
      ) : (
        <p>{label}</p>
      )}
    </div>
    <div className="col-span-2">
      <p>{value}</p>
    </div>
  </div>
);

export default ProductTab;
