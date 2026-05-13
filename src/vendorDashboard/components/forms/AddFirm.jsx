import React, { useState } from "react";

import { API_URL } from "../../data/apiPath";

const AddFirm = () => {
  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState(null);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleRegionChange = (e) => {
    const value = e.target.value;
    if (region.includes(value)) {
      setRegion(region.filter((item) => item !== value));
    } else {
      setRegion([...region, value]);
    }
  };

  const handleFileChange = (e) => {
    const selectedImg = e.target.files[0];
    setFile(selectedImg);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem("loginToken");
      if (!loginToken) {
        alert("User not authenticated");
        console.error("User not authenticated");
        return;
      }

      const formData = new FormData();
      formData.append("firmName", firmName);
      formData.append("area", area);
      formData.append("offer", offer);

      category.forEach((val) => {
        formData.append("category", val);
      });

      region.forEach((val) => {
        formData.append("region", val);
      });

      formData.append("image", file);

      const url = `${API_URL}/firm/add-firm`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          token: `${loginToken}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Firm added successfully!");
        console.log("Firm added successfully:", data);
        setFirmName("");
        setArea("");
        setCategory([]);
        setRegion([]);
        setOffer("");
        setFile(null);
        const firmId = data.firmId;
        console.log("New Firm ID:", firmId);
        localStorage.setItem("firmId", firmId);
      } else if (data.message == "Vendor can only have one firm") {
        alert("Vendor can only have one firm");
      } else {
        alert("Error adding firm");
        console.error("Failed to add firm:", data.message);
      }
    } catch (error) {
      console.error("Error adding firm:", error);
    }
  };

  return (
    <div className="firm-section">
      <form className="firm-form" onSubmit={handleSubmit}>
        <h2>Add New Firm</h2>

        <label htmlFor="firmName">Firm Name</label>
        <input
          type="text"
          id="firmName"
          value={firmName}
          name="firmName"
          placeholder="Enter firm name"
          required
          onChange={(e) => setFirmName(e.target.value)}
        />

        <label htmlFor="area">Area</label>
        <input
          type="text"
          id="area"
          value={area}
          name="area"
          placeholder="Enter area"
          required
          onChange={(e) => setArea(e.target.value)}
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

        {/* <label htmlFor="region">Region</label>
        <input type="text" id="region" placeholder="Enter region" required /> */}

        <div className="form-field">
          <label className="field-label">Region</label>
          <div className="checkbox-group">
            <div className="checkbox-option">
              <input
                type="checkbox"
                id="south-indian"
                name="region"
                value="south-indian"
                checked={region.includes("south-indian")}
                onChange={handleRegionChange}
              />
              <label htmlFor="south-indian">South Indian</label>
            </div>
            <div className="checkbox-option">
              <input
                type="checkbox"
                id="north-indian"
                name="region"
                value="north-indian"
                checked={region.includes("north-indian")}
                onChange={handleRegionChange}
              />
              <label htmlFor="north-indian">North Indian</label>
            </div>
            <div className="checkbox-option">
              <input
                type="checkbox"
                id="chinese"
                name="region"
                value="chinese"
                checked={region.includes("chinese")}
                onChange={handleRegionChange}
              />
              <label htmlFor="chinese">Chinese</label>
            </div>
            <div className="checkbox-option">
              <input
                type="checkbox"
                id="bakery"
                name="region"
                value="bakery"
                checked={region.includes("bakery")}
                onChange={handleRegionChange}
              />
              <label htmlFor="bakery">Bakery</label>
            </div>
          </div>
        </div>
        <label htmlFor="offer">Offer</label>
        <input
          name="offer"
          value={offer}
          type="text"
          id="offer"
          placeholder="Enter offer details"
          onChange={(e) => setOffer(e.target.value)}
        />
        {/* <div className="form-field">
          <label className="field-label">Best Seller</label>
          <div className="radio-group">
            <div className="radio-option">
              <input
                type="radio"
                id="best-seller-yes"
                name="bestSeller"
                value="yes"
              />
              <label htmlFor="best-seller-yes">Yes</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="best-seller-no"
                name="bestSeller"
                value="no"
              />
              <label htmlFor="best-seller-no">No</label>
            </div>
          </div>
        </div> */}
        <label htmlFor="image">Upload Image</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleFileChange}
        />

        <button type="submit">Add Firm</button>

        {/* <p className="error-message">{error}</p> */}
      </form>
    </div>
  );
};

export default AddFirm;
