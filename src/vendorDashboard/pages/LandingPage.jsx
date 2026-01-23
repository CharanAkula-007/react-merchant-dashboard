import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Login from "../components/forms/Login";
import Register from "../components/forms/Register";
import AddFirm from "../components/forms/AddFirm";
import AddProducts from "../components/forms/AddProducts";
import { useState } from "react";
import Welcome from "../components/Welcome";

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showAddFirm, setShowAddFirm] = useState(false);
  const [showAddProducts, setShowAddProducts] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const showLoginHandler = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowAddFirm(false);
    setShowAddProducts(false);
    setShowWelcome(false);
  };
  const showRegisterHandler = () => {
    setShowLogin(false);
    setShowRegister(true);
    setShowAddFirm(false);
    setShowAddProducts(false);
    setShowWelcome(false);
  };

  const showAddFirmHandler = () => {
    setShowAddFirm(true);
    setShowAddProducts(false);
    setShowLogin(false);
    setShowRegister(false);
    setShowWelcome(false);
  };

  const showAddProductsHandler = () => {
    setShowAddProducts(true);
    setShowAddFirm(false);
    setShowLogin(false);
    setShowRegister(false);
    setShowWelcome(false);
  };
  const showWelcomeHandler = () => {
    setShowWelcome(true);
    setShowLogin(false);
    setShowRegister(false);
    setShowAddFirm(false);
    setShowAddProducts(false);
  };

  return (
    <>
      <section className="landing-page">
        <Navbar
          showLoginHandler={showLoginHandler}
          showRegisterHandler={showRegisterHandler}
        />
        <div className="collections">
          <Sidebar
            showAddFirmHandler={showAddFirmHandler}
            showAddProductsHandler={showAddProductsHandler}
          />
          {showLogin ? (
            <Login showWelcomeHandler={showWelcomeHandler} />
          ) : showRegister ? (
            <Register showLoginHandler={showLoginHandler} />
          ) : showAddFirm ? (
            <AddFirm />
          ) : showAddProducts ? (
            <AddProducts />
          ) : showWelcome ? (
            <Welcome />
          ) : null}
        </div>
      </section>
    </>
  );
};

export default LandingPage;
