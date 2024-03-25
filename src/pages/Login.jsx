/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useDispatch }from 'react-redux'
import { login } from "../store/authSlice";

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [email , setemail] = useState("")
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()

  function handleSubmit(event) {
    setError("");
    event.preventDefault();
    if (username.trim() == "" || password.trim() == "" || email.trim()== "") {
      setError("All fields are required");
      return;
    }
        axios
          .get("http://localhost:8080/api/meta-connect/login", {
            params: {
              username: username,
              password: password,
              email: email,
            },
          })
          .then((response) => {
            console.log("Response:", response.data);
            
            if (response.data === true) {
                dispatch(login())
                alert("Login successfull!");
                navigate("/database-service");
            }else{
              setError("Check your credentials again")
              return
            }
          })
          .catch((error) => {
            console.error("Error submitting form:", error);
            alert("Error submitting form. Please try again later.");
          });
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg  bg-transparent shadow-md rounded px-8 pt-6 pb-8 my-4 w-full h-full max-h-lg"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.3)", // Transparent white background
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", // Visible shadow
        }}
      >
        {error && <h1 className="text-red-600">{error}</h1>}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email:
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Login{" "}
          </button>
        </div>
      </form>
    </>
  );
}
export default Login;
