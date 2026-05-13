import React, { useState, useEffect } from "react";
import { API_URL } from "../data/apiPath";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const productsHandler = async () => {
    const firmId = localStorage.getItem("firmId");
    try {
      const response = await fetch(`${API_URL}/product/${firmId}/products`);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setProducts(data);
        console.log("Products fetched successfully:", data);
      } else {
        console.error("Failed to fetch products:", data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProductById = async (productId) => {
    try {
      const response = await fetch(
        `${API_URL}/product/delete-product/${productId}`,
        {
          method: "DELETE",
        },
      );
      if (response.ok) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId),
        );

        alert("Product deleted successfully!");
      }
      const data = await response.json();
      console.log("we are in try", data);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  useEffect(() => {
    productsHandler();
    console.log("Products state after fetch:", products);
  }, []);

  return (
    <div className="product-table-container">
      <h2>All Products</h2>

      {!products || products.length === 0 ? (
        <p>No products available to display.</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Category</th>
              <th>Best Seller</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item._id}>
                <td>{item.productName}</td>
                <td>₹{item.price}</td>
                <td>
                  {item.image ? (
                    <img
                      // Construct the absolute URL. Adjust "/uploads/" if your backend path differs.
                      src={`${API_URL}/uploads/${item.image}`}
                      alt={item.productName}
                      className="table-product-image"
                    />
                  ) : (
                    // Fallback UI if item.image is null or undefined
                    <div className="image-placeholder">No Image</div>
                  )}
                </td>
                <td>{item.category ? item.category.join(", ") : "N/A"}</td>
                <td>{item.bestSeller ? "Yes" : "No"}</td>
                <td>{item.description}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteProductById(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default AllProducts;
