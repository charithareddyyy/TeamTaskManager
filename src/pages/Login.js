import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/login",
        formData
      );

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");
      navigate("/dashboard");
    } catch (error) {
      alert("Login Failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #667eea, #764ba2)",
        fontFamily: "Arial",
        position: "relative",
      }}
    >
      {/* Project Title */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            color: "#ffffff",
            marginBottom: "8px",
            fontWeight: "bold",
            letterSpacing: "1px",
          }}
        >
          Team Task Manager
        </h1>

        <p
          style={{
            color: "#e5e7eb",
            fontSize: "18px",
          }}
        >
          Organize • Manage • Track Tasks
        </p>
      </div>

      {/* Login Card */}
      <div
        style={{
          width: "420px",
          background: "#ffffff",
          padding: "50px",
          marginTop: "120px",
          borderRadius: "25px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "40px",
            color: "#333",
            fontSize: "56px",
          }}
        >
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            Login
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "30px",
            color: "#555",
            fontSize: "18px",
          }}
        >
          Don't have an account?
        </p>

        <div style={{ textAlign: "center" }}>
          <Link
            to="/register"
            style={{
              color: "#5a4bff",
              fontWeight: "bold",
              fontSize: "18px",
              textDecoration: "none",
            }}
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "18px",
  marginBottom: "25px",
  borderRadius: "15px",
  border: "1px solid #d1d5db",
  fontSize: "18px",
  outline: "none",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "18px",
  background: "linear-gradient(to right, #4f46e5, #5a4bff)",
  color: "#fff",
  border: "none",
  borderRadius: "15px",
  fontSize: "20px",
  fontWeight: "bold",
  cursor: "pointer",
};

export default Login;