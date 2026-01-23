import React from "react";

const Navbar = ({ showLoginHandler, showRegisterHandler }) => {
  return (
    <div className="nav-section">
      <div className="company">
        <h1>Vendor Dashboard</h1>
      </div>
      <div className="user-auth">
        <span style={{ cursor: "pointer" }} onClick={showLoginHandler}>
          Login /{" "}
        </span>
        <span style={{ cursor: "pointer" }} onClick={showRegisterHandler}>
          Signup
        </span>
      </div>
    </div>
  );
};

export default Navbar;
// This is a simple Navbar component for the Suby Vendor Dashboard.
