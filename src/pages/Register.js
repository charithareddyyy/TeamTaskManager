import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
      await axios.post(
        "http://localhost:8000/api/auth/register",
        formData
      );

      alert("Registration Successful");

      navigate("/");
    } catch (error) {
  console.log(error);

  if (error.response && error.response.data.message) {
    alert(error.response.data.message);
  } else {
    alert("Registration Failed");
  }
}
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
        padding: "20px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "500px" }}>
        
        {/* Logo Section */}
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <h1
            style={{
              fontSize: "42px",
              color: "#4f46e5",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Team Task Manager
          </h1>

          <p
            style={{
              color: "#6b7280",
              fontSize: "16px",
              marginTop: "8px",
              textAlign: "center",
            }}
          >
            Organize • Manage • Track Tasks
          </p>
        </div>

        {/* Register Card */}
        <div
          style={{
            background: "#fff",
            padding: "40px",
            borderRadius: "20px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "35px",
              color: "#111827",
              fontSize: "28px",
              fontWeight: "bold",
            }}
          >
            Create Account
          </h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <button type="submit" style={buttonStyle}>
              Register
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              marginTop: "20px",
              color: "#6b7280",
            }}
          >
            Already have an account?
          </p>

          <div style={{ textAlign: "center" }}>
            <Link
              to="/"
              style={{
                color: "#4f46e5",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Login Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "18px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  fontSize: "16px",
  outline: "none",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  background: "#4f46e5",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  fontSize: "18px",
  fontWeight: "bold",
  cursor: "pointer",
};

export default Register;