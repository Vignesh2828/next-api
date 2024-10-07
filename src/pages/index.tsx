// pages/entrance.tsx
import React from "react";
import { useRouter } from "next/router";

const Entrance = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login"); // Navigate to login page
  };

  const handleRegisterClick = () => {
    router.push("/register"); // Navigate to registration page
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <h1>Welcome to Our App</h1>
      <p>Please choose an option:</p>
      <div
        style={{
          marginTop: "20px",
        }}
      >
        <button
          onClick={handleLoginClick}
          style={{
            margin: "10px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#0070f3",
            color: "white",
            transition: "background-color 0.3s",
          }}
        >
          Login
        </button>
        <button
          onClick={handleRegisterClick}
          style={{
            margin: "10px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#0070f3",
            color: "white",
            transition: "background-color 0.3s",
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Entrance;
