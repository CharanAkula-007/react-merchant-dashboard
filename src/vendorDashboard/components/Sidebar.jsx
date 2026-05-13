import React from "react";

const Sidebar = ({
  showAddFirmHandler,
  showAddProductsHandler,
  showAllProductsHandler,
  showAddFirmForm,
}) => {
  return (
    <div className="sidebar-section">
      <ul>
        {showAddFirmForm && <li onClick={showAddFirmHandler}>Add Firm</li>}
        <li onClick={showAddProductsHandler}>Add Product</li>
        <li onClick={showAllProductsHandler}>All Products</li>
        <li>User Details</li>
      </ul>
    </div>
  );
};

export default Sidebar;
