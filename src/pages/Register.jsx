import { useState } from "react";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error , setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    setError("");
    event.preventDefault();

    // Check if any required field is empty
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
      .get("http://localhost:8080/api/meta-connect/users")
      .then((response) => {
        const userList = response.data.content;

        const usernameExists = userList.some(
          (user) => user.userId.username === username
        );
        const emailExists = userList.some(
          (user) => user.userId.email === email
        );

        if (usernameExists) {
          setError("Username is already registered");
          return;
        }
        if (emailExists) {
            setError("Email address is already registered");
            return;
        }

        const data = {
          userId: {
            username: username,
            email: email,
          },
          password: password,
          firstName: firstName,
          lastName: lastName,
        };

        axios
          .post("http://localhost:8080/api/meta-connect/registration", data)
          .then((response) => {
            console.log("Response:", response.data);
            alert("Signup successful!");
            navigate("/login");
          })
          .catch((error) => {
            console.error("Error submitting form:", error);
            alert("Error submitting form. Please try again later.");
          });
      })
      .catch((error) => {
        console.error("Error fetching user list:", error);
        alert("Error fetching user list. Please try again later.");
      });
  };


  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 my-4">
      <form onSubmit={handleSubmit}>
        {error && <h1 className="text-red-600">{error}</h1>}
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
          />
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
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
