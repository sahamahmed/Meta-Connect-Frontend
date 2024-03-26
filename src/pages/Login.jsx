/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useDispatch }from 'react-redux'
import { login } from "../store/authSlice";

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()

  function handleSubmit(event) {
    setError("");
    event.preventDefault();
    if (username.trim() == "" || password.trim() == "" ) {
      setError("All fields are required");
      return;
    }
        axios
          .post("http://localhost:8080/api/meta-connect/authenticate", 
            {
              userName: username,
              password: password,
            },
          )
          .then((response) => {
            console.log("Response:", response.data);

            if (response.data) {
              localStorage.setItem("token", response.data);
              dispatch(login());
              alert("Login successfull!");
              navigate("/database-service");
            } else {
              setError("Check your credentials again");
              return;
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
        className="max-w-lg  bg-transparent shadow-md rounded px-8 pt-6 pb-8 my-4 w-full h-full"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.3)", // Transparent white background
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", // Visible shadow
        }}
      >
        <h1 className="text-teal-400 text-center text-3xl font-bold uppercase ">
          Login
        </h1>
        {error && <h1 className="text-red-600 text-center">{error}</h1>}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.5)", // Transparent white background
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)", // Visible shadow
            }}
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
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.5)", // Transparent white background
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)", // Visible shadow
            }}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-teal-400 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          >
            Login{" "}
          </button>
        </div>
      </form>
    </>
  );
}
export default Login;
