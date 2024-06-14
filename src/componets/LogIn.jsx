import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/users/login", {
        username,
        password,
      });
      if (response.data.success) {
        toast.success("Log in Successfully", { autoClose: 5000 });
        window.location.href = "https://www.amazon.in/";
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("An error occurred during login.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/users/register",
        {
          username,
          email,
          password,
        }
      );
      if (response.data.success) {
        handleLogin(e);
        toast.success("Account Registered Successfully", { autoClose: 3000 });
        window.location.href = "http://localhost:5173";
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage("An error occurred during registration.");
    }
  };

  const toggleNewUser = () => {
    setIsNewUser((prev) => !prev);
    setMessage("");
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div
      className="background-container"
      style={{
        backgroundImage: `url('https://t3.ftcdn.net/jpg/03/75/77/90/360_F_375779088_kjTKvm0iUspPsf4rAX9BeO5dlRnAOyPz.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="container" style={{ width: "300px" }}>
        <div className="content">
          <h2 className="head">{isNewUser ? "Register" : "Login"}</h2>
          {message && <p>{message}</p>}
          <form onSubmit={isNewUser ? handleRegister : handleLogin}>
            <div>
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label>Password:</label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"} // Toggle password visibility
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash}
                  onClick={toggleShowPassword}
                  className="password-icon"
                />{" "}
                &nbsp;show password
              </div>
            </div>
            {isNewUser && (
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            )}
            <button type="submit">{isNewUser ? "Register" : "Login"}</button>
          </form>
          <button onClick={toggleNewUser} className="logo">
            {isNewUser
              ? "Already have an account? Login"
              : "New user? Click here to Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
