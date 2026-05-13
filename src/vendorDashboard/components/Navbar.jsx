import React from "react";

const Navbar = ({
  showLoginHandler,
  showRegisterHandler,
  showLogout,
  logoutHandler,
}) => {
  const firmName = localStorage.getItem("vendorFirmName");
  return (
    <div className="nav-section">
      <div className="company">
        <h1>Vendor Dashboard</h1>
      </div>
      {firmName && <div className="firm-name">{firmName}</div>}
      <div className="user-auth">
        {!showLogout ? (
          <>
            <span style={{ cursor: "pointer" }} onClick={showLoginHandler}>
              Login /{" "}
            </span>
            <span style={{ cursor: "pointer" }} onClick={showRegisterHandler}>
              Signup
            </span>
          </>
        ) : (
          <span style={{ cursor: "pointer" }} onClick={logoutHandler}>
            Logout
          </span>
        )}
      </div>
    </div>
  );
};

export default Navbar;
// This is a simple Navbar component for the Suby Vendor Dashboard.
