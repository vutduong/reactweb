import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../../config";

const ProductsManager = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${config.API_URL}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await fetch(`${config.API_URL}/products/${id}`, { method: "DELETE" });
        setProducts(products.filter((product) => product.id !== id));
        alert("Product deleted successfully!");
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">📦 Product List</h2>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          onClick={() => navigate("/add-product")}
        >
          + Add Product
        </button>
      </div>

      <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-md">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 sticky">
            <tr className="text-left">
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Image</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border">Price ($)</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border">
                <td className="p-3 border text-center">{product.id}</td>
                <td className="p-3 border">{product.name}</td>
                <td className="p-3 border text-center">
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-3 border text-center">{product.category}</td>
                <td className="p-3 border text-center font-bold text-green-600">${product.price}</td>
                <td className="p-3 border text-center space-x-2">
                  <button
                    className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    onClick={() => navigate(`/admin/productinfo/${product.id}`)}>
                    Details & Edit
                  </button>
                  
                  <button
                    className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    onClick={() => handleDelete(product.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsManager;
