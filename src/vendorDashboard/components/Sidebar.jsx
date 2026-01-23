import React from 'react'

const Sidebar = ({ showAddFirmHandler, showAddProductsHandler }) => {
  return (
    <div className='sidebar-section'>
        <ul>
            <li onClick={showAddFirmHandler}>Add Firm</li>
            <li onClick={showAddProductsHandler}>Add Product</li>
            <li>All product</li>
            <li>User Details</li>
        </ul>
    </div>
  )
}

export default Sidebar