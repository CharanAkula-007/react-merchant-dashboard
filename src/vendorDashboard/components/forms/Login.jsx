import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";
const Login = ({ showWelcomeHandler }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Login successful");
        setEmail("");
        setPassword("");
        localStorage.setItem("loginToken", data.token);
        console.log("Login successful:", data);
        showWelcomeHandler();

        const vendorId = data.vendorId;
        const vendorResponse = await fetch(
          `${API_URL}/vendor/single-vendor/${vendorId}`,
        );
        const vendorData = await vendorResponse.json();
        if (vendorResponse.ok) {
          const firmId = vendorData.vendorFirmId;
          console.log("Firm ID:", firmId);
          localStorage.setItem("firmId", firmId);
          const vendorFirmName = vendorData.vendor.firm[0].firmName;
          localStorage.setItem("vendorFirmName", vendorFirmName);
          console.log("Vendor Firm Name:", vendorFirmName);
          window.location.reload();
        }
      } else {
        // Handle login error
        console.error("Login failed:", data);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        {/* {error && <p className="error-message">{error}</p>} */}
      </form>
    </div>
  );
};

export default Login;
