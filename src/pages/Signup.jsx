/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from 'axios'
import CustomizedSnackbars from "../components/Notifications";

const Signup = ({ toggleForm }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registered, setRegistered] = useState(null)
  const [notregistered, setnotRegistered] = useState(false)
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    setError("");
    event.preventDefault();

    if (
      username.trim() === "" ||
      password.trim() === "" ||
      email.trim() === "" ||
      firstName.trim() === "" ||
      lastName.trim() === ""
    ) {
      setError("All fields are required");
      return;
    }
    axios
      .post("http://localhost:8080/api/meta-connect/registration", {
        userName: username,
        password: password,
      })
      .then((response) => {
        console.log("Response:", response.data);
        setRegistered(true)
        setTimeout(()=>{
                  toggleForm();
        }, 2000)
      })
      .catch((error) => {
        console.log(error)
        setnotRegistered(true)
      });
  };

  return (
    <div
      className="max-w-lg  bg-transparent shadow-md rounded px-8 pt-6 pb-8 my-4 w-full"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.3)", // Transparent white background
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", // Visible shadow
      }}
    >
      {notregistered && (
        <CustomizedSnackbars
          message={`Failed, please try again`}
          type={"error"}
        />
      )}
      {registered && (
        <CustomizedSnackbars
          message={`User registered, Kindly Login`}
          type={"success"}
        />
      )}
      <form onSubmit={handleSubmit}>
        <h1 className="text-teal-400 text-center text-3xl font-bold uppercase">
          Register
        </h1>
        {error && <h1 className="text-red-600 text-center">{error}</h1>}

        <div className=" flex flex-row justify-between items-center">
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.5)", // Transparent white background
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)", // Visible shadow
              }}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.5)", // Transparent white background
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)", // Visible shadow
              }}
            />
          </div>
        </div>

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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.5)", // Transparent white background
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)", // Visible shadow
            }}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
