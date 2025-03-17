import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import GlideCarousel from "../home/Glide";
import ProductCard from "../product/ProductCard";
import config from "../../config";

export default function CategoryView() {
  const { categorySlug  } = useParams();
  const decodedCategorySlug = decodeURIComponent(categorySlug); // Fix encoding issue
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(20);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResponse = await fetch(`${config.API_URL}/categories`);
        const categoryData = await categoryResponse.json();
        const categoriesList = Array.isArray(categoryData) ? categoryData : categoryData.categories || [];
        setCategories(categoriesList);

        const foundCategory = categoriesList.find((cat) => cat.slug === decodedCategorySlug);
        setSelectedCategory(foundCategory || null);

        if (!foundCategory) {
          console.log("Category not found, skipping product fetch.");
          return;
        }

        const productResponse = await fetch(`${config.API_URL}/products`);
        const productData = await productResponse.json();
        const productList = Array.isArray(productData) ? productData : productData.products || [];

        const filteredProducts = productList.filter(
          (product) => String(product.category) === String(foundCategory.id)
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [decodedCategorySlug]);
  
  return (
    <div className="bg-[#f2f4f7]">
      <div className="container mx-auto pb-5">
        {/* Breadcrumb Navigation */}
        <nav className="flex py-3" aria-label="Breadcrumb">
          <ul className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <Link to={`/`} className="inline-flex items-center text-sm font-medium text-black hover:text-blue-600">
                Home
              </Link>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 mx-1 text-black"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                </svg>
                <span className="ms-1 text-sm font-medium text-black">{selectedCategory?.name || "Category"}</span>
              </div>
            </li>
          </ul>
        </nav>

        <GlideCarousel perView={2} />

        <div className="bg-white px-5 py-4 rounded-md shadow-md mt-4">
        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-5 gap-2">
              {products.slice(0, visibleCount).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {visibleCount < products.length && (
              <div className="grid place-items-center mt-5">
                <button
                  onClick={() => setVisibleCount(visibleCount + 15)}
                  className="mt-4 bg-blue-500 text-white py-2 px-16 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Show More
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-500">No products found in this category.</p>
        )}
      </div>
      </div>
    </div>
  );
}
