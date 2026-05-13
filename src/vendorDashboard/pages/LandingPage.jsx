import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Login from "../components/forms/Login";
import Register from "../components/forms/Register";
import AddFirm from "../components/forms/AddFirm";
import AddProducts from "../components/forms/AddProducts";
import { useEffect, useState } from "react";
import Welcome from "../components/Welcome";
import AllProducts from "../components/AllProducts";

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showAddFirm, setShowAddFirm] = useState(false);
  const [showAddProducts, setShowAddProducts] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [showAddFirmForm, setShowAddFirmForm] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("loginToken");
    if (token) {
      setShowLogout(true);
    }

    const firmId = localStorage.getItem("firmId");
    if (firmId) {
      setShowAddFirmForm(false);
    }
  }, []);
  const logoutHandler = () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("loginToken");
      localStorage.removeItem("firmId");
      localStorage.removeItem("vendorFirmName");
      setShowLogout(false);
      setShowAddFirmForm(true);
    }
  };

  const showLoginHandler = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowAddFirm(false);
    setShowAddProducts(false);
    setShowWelcome(false);
    setShowAllProducts(false);
  };
  const showRegisterHandler = () => {
    setShowLogin(false);
    setShowRegister(true);
    setShowAddFirm(false);
    setShowAddProducts(false);
    setShowWelcome(false);
    setShowAllProducts(false);
  };

  const showAddFirmHandler = () => {
    if (showLogout) {
      setShowAddFirm(true);
      setShowLogin(false);
      setShowRegister(false);
      setShowAddProducts(false);
      setShowWelcome(false);
      setShowAllProducts(false);
    } else {
      alert("Please login to add a firm.");
      setShowLogin(true);
    }
  };

  const showAddProductsHandler = () => {
    if (showLogout) {
      setShowAddProducts(true);
      setShowLogin(false);
      setShowRegister(false);
      setShowAddFirm(false);
      setShowWelcome(false);
      setShowAllProducts(false);
    } else {
      alert("Please login to add products.");
      setShowLogin(true);
    }
  };
  const showWelcomeHandler = () => {
    setShowWelcome(true);
    setShowLogin(false);
    setShowRegister(false);
    setShowAddFirm(false);
    setShowAddProducts(false);
    setShowAllProducts(false);
  };
  const showAllProductsHandler = () => {
    setShowAllProducts(true);
    setShowWelcome(false);
    setShowLogin(false);
    setShowRegister(false);
    setShowAddFirm(false);
    setShowAddProducts(false);
  };
  return (
    <>
      <section className="landing-page">
        <Navbar
          showLogout={showLogout}
          logoutHandler={logoutHandler}
          showLoginHandler={showLoginHandler}
          showRegisterHandler={showRegisterHandler}
        />
        <div className="collections">
          <Sidebar
            showAddFirmForm={showAddFirmForm}
            showAddFirmHandler={showAddFirmHandler}
            showAddProductsHandler={showAddProductsHandler}
            showAllProductsHandler={showAllProductsHandler}
          />
          {showAddFirm && showLogout && <AddFirm />}
          {showAddProducts && showLogout && <AddProducts />}
          {showWelcome && showLogout && <Welcome />}
          {showAllProducts && showLogout && <AllProducts />}
          {showLogin && <Login showWelcomeHandler={showWelcomeHandler} />}
          {showRegister && <Register showLoginHandler={showLoginHandler} />}
        </div>
      </section>
    </>
  );
};

export default LandingPage;
