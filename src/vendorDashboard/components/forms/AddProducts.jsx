import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";

const AddProducts = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [bestseller, setIsBestseller] = useState(false);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleFileChange = (e) => {
    const selectedImg = e.target.files[0];
    setImage(selectedImg);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const loginToken = localStorage.getItem("loginToken");
    const firmId = localStorage.getItem("firmId");

    if (!loginToken || !firmId) {
      alert("User not authenticated or firm not selected.");
      console.error("Missing loginToken or firmId");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("price", price);
      category.forEach((val) => {
        formData.append("category", val);
      });
      formData.append("bestseller", bestseller);
      formData.append("description", description);
      formData.append("image", image);

      const response = await fetch(`${API_URL}/product/add-product/${firmId}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Product added successfully:", data);
        alert("Product added successfully!");
        setProductName("");
        setPrice("");
        setCategory([]);
        setIsBestseller(false);
        setDescription("");
        setImage(null);
        document.getElementById("image").value = ""; // Clear file input
      } else {
        alert(`Error adding product: ${data.message}`);
        console.error("Failed to add product:", data.message);
      }
    } catch (error) {
      alert("Error adding product. Please try again later.");
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="add-products-section">
      <form onSubmit={handleAddProduct} className="product-form">
        <h2>Add New Product</h2>

        <label htmlFor="productName">Product Name</label>
        <input
          type="text"
          id="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Enter product name"
          required
        />

        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price"
          required
        />

        <div className="form-field">
          <label className="field-label">Category</label>
          <div className="checkbox-group">
            <div className="checkbox-option">
              <input
                type="checkbox"
                id="veg"
                checked={category.includes("veg")}
                value="veg"
                onChange={handleCategoryChange}
              />
              <label htmlFor="veg">Veg</label>
            </div>
            <div className="checkbox-option">
              <input
                type="checkbox"
                id="non-veg"
                name="foodPreference"
                value="non-veg"
                checked={category.includes("non-veg")}
                onChange={handleCategoryChange}
              />
              <label htmlFor="non-veg">Non-Veg</label>
            </div>
          </div>
        </div>

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          required
        ></textarea>

        <label htmlFor="image">Upload Image</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleFileChange}
        />

        <div className="checkbox-group">
          <input
            type="checkbox"
            id="bestseller"
            checked={bestseller}
            onChange={(e) => setIsBestseller(e.target.checked)}
          />
          <label htmlFor="bestseller">Mark as Best Seller</label>
        </div>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProducts;
