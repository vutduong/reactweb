import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import config from "../../../config";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetch(`${config.API_URL}/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setFormData(data);
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (index, field, value, type) => {
    const updatedArray = [...formData[type]];
    updatedArray[index] = value;
    setFormData({ ...formData, [type]: updatedArray });
  };

  const addArrayItem = (type) => {
    setFormData({ ...formData, [type]: [...formData[type], ""] });
  };

  const removeArrayItem = (index, type) => {
    setFormData({ ...formData, [type]: formData[type].filter((_, i) => i !== index) });
  };

  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...formData.info];
    updatedSections[index][field] = value;
    setFormData({ ...formData, info: updatedSections });
  };

  const handleItemChange = (sectionIndex, itemIndex, field, value) => {
    const updatedSections = [...formData.info];
    updatedSections[sectionIndex].items[itemIndex][field] = value;
    setFormData({ ...formData, info: updatedSections });
  };

  const addSection = () => {
    setFormData({ ...formData, info: [...formData.info, { title: "New Section", items: [] }] });
  };

  const removeSection = (index) => {
    setFormData({ ...formData, info: formData.info.filter((_, i) => i !== index) });
  };
  const handlePromotionChange = (index, value) => {
    const updatedPromotions = [...formData.promotion];
    updatedPromotions[index] = value;
    setFormData({ ...formData, promotion: updatedPromotions });
  };

  const addPromotion = () => {
    setFormData({ ...formData, promotion: [...formData.promotion, ""] });
  };

  const removePromotion = (index) => {
    setFormData({ ...formData, promotion: formData.promotion.filter((_, i) => i !== index) });
  };

  const addItem = (sectionIndex) => {
    const updatedSections = [...formData.info];
    updatedSections[sectionIndex].items.push({ label: "New Item", value: "" });
    setFormData({ ...formData, info: updatedSections });
  };

  const removeItem = (sectionIndex, itemIndex) => {
    const updatedSections = [...formData.info];
    updatedSections[sectionIndex].items = updatedSections[sectionIndex].items.filter((_, i) => i !== itemIndex);
    setFormData({ ...formData, info: updatedSections });
  };

  const handleUpdate = () => {
    fetch(`${config.API_URL}/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(() => {
        setProduct(formData);
        setEditMode(false);
        alert("Product updated successfully!");
      })
      .catch((err) => console.error("Error updating product:", err));
  };

  if (!product) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{editMode ? "Edit Product" : "Product Details"}</h1>
        <div className="space-x-2">
          {editMode ? (
            <>
              <button onClick={handleUpdate} className="px-4 py-2 bg-green-500 text-white rounded">Save</button>
              <button onClick={() => setEditMode(false)} className="px-4 py-2 bg-red-500 text-white rounded">Cancel</button>
            </>
          ) : (
            <button onClick={() => setEditMode(true)} className="px-4 py-2 bg-blue-500 text-white rounded">Edit</button>
          )}
          <button onClick={() => navigate("/admin/productsmgr")} className="px-4 py-2 bg-gray-500 text-white rounded">Back</button>
        </div>
      </div>
      <div className="mb-4">
        <label className="font-semibold">Product Name:</label>
        {editMode ? <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded mt-1" /> : <p className="text-gray-700">{product.name}</p>}
      </div>

      {/* Price */}
      <div className="mb-4">
        <label className="font-semibold">Price:</label>
        {editMode ? <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded mt-1" /> : <p className="text-gray-700">${product.price}</p>}
      </div>

      {/* Product Image */}
      <div className="mb-4">
        <label className="font-semibold">Product Image:</label>
        {editMode ? (
          <input type="text" value={formData.image[0]} onChange={(e) => handleArrayChange(0, "image", e.target.value, "image")} className="w-full p-2 border rounded mt-1" />
        ) : (
          <img src={product.image[0]} alt={product.name} className="w-full h-72 object-cover rounded-lg" />
        )}
      </div>

      {/* Thumbnails */}
      <div className="mb-4">
        <label className="font-semibold">Thumbnails:</label>
        {editMode ? (
          <>
            {formData.thumbnail.map((thumb, index) => (
              <div key={index} className="flex space-x-2 mb-1">
                <input type="text" value={thumb} onChange={(e) => handleArrayChange(index, "thumbnail", e.target.value, "thumbnail")} className="w-full p-2 border rounded" />
                <button onClick={() => removeArrayItem(index, "thumbnail")} className="px-3 py-1 bg-red-500 text-white rounded">X</button>
              </div>
            ))}
            <button onClick={() => addArrayItem("thumbnail")} className="px-4 py-2 bg-blue-500 text-white rounded">+ Add Thumbnail</button>
          </>
        ) : (
          <div className="flex space-x-2">
            {product.thumbnail.map((thumb, index) => (
              <img key={index} src={thumb} alt="Thumbnail" className="w-14 h-14 object-cover rounded" />
            ))}
          </div>
        )}
      </div>

      {/* Specifications */}
        <div className="mb-4">
            <h2 className="text-xl font-semibold">Specifications</h2>
            {formData.info.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mt-3 p-3 border rounded bg-gray-50">
                    <div className="flex items-center justify-between">
                        {editMode ? (
                        <input
                            type="text"
                            value={section.title}
                            onChange={(e) => handleSectionChange(sectionIndex, "title", e.target.value)}
                            className="w-full p-2 border rounded font-bold text-lg"
                        />
                        ) : (
                        <h3 className="font-bold text-lg">{section.title}</h3>
                        )}
                        {editMode && (
                        <button
                            onClick={() => removeSection(sectionIndex)}
                            className="ml-3 px-3 py-1 bg-red-500 text-white rounded"
                        >
                            Delete Section
                        </button>
                        )}
                    </div>

                    {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center space-x-2 mt-2">
                        {editMode ? (
                            <>
                            <input
                                type="text"
                                value={item.label}
                                onChange={(e) => handleItemChange(sectionIndex, itemIndex, "label", e.target.value)}
                                className="w-1/3 p-2 border rounded font-semibold"
                            />
                            <input
                                type="text"
                                value={item.value}
                                onChange={(e) => handleItemChange(sectionIndex, itemIndex, "value", e.target.value)}
                                className="w-2/3 p-2 border rounded"
                            />
                            <button
                                onClick={() => removeItem(sectionIndex, itemIndex)}
                                className="px-3 py-1 bg-red-500 text-white rounded"
                            >
                                X
                            </button>
                            </>
                        ) : (
                            <p className="text-gray-700">
                            <span className="font-semibold">{item.label}</span> {item.value}
                            </p>
                        )}
                        </div>
                    ))}

                    {editMode && (
                        <button
                        onClick={() => addItem(sectionIndex)}
                        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
                        >
                        + Add Item
                        </button>
                    )}
                </div>
            ))}
            {editMode && (
                <button onClick={addSection} className="mt-3 px-4 py-2 bg-green-500 text-white rounded">
                + Add Section
                </button>
            )}
        </div>

    {/* Promotions */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Promotions</h2>
        {editMode ? (
          <div>
            {formData.promotion.map((promo, index) => (
              <div key={index} className="flex items-center space-x-2 mt-2">
                <input
                  type="text"
                  value={promo}
                  onChange={(e) => handlePromotionChange(index, e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <button onClick={() => removePromotion(index)} className="px-3 py-1 bg-red-500 text-white rounded">X</button>
              </div>
            ))}
            <button onClick={addPromotion} className="mt-2 px-4 py-2 bg-green-500 text-white rounded">+ Add Promotion</button>
          </div>
        ) : (
          <ul className="list-disc pl-5 text-gray-700">
            {product.promotion.map((promo, index) => (
              <li key={index}>{promo}</li>
            ))}
          </ul>
        )}
      </div>
      {/* Description */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Description</h2>
        {editMode ? <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded mt-1" /> : <p className="text-gray-700">{product.description}</p>}
      </div>
    </div>
  );
};

export default ProductDetail;
