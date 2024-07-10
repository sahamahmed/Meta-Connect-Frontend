/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { TokenFunction } from '../../utils/BearerToken';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { IoChevronBack } from "react-icons/io5";

const Form = ({initialData}) => {
    const [name , setName] = useState(initialData?.name || '')
    const [description , setDescription] = useState(initialData?.description || '')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const formattedToken = TokenFunction();
    useEffect(() => {
      if (!formattedToken) {
        navigate("/");
      }
    }, [formattedToken, navigate]);

    function handleSubmit(event){
        setError("")
        event.preventDefault()
        if (name.trim() == "" || description.trim() == "") {
            setError("All fields are required")
            return
        }
        console.log(name , description)
        const data = {
            name: name,
            description: description
        }
if (initialData) {
        axios
          .put(
            `http://localhost:8080/api/meta-connect/business-domain-entity/${initialData.id}`,
            data,
            {
              headers: {
                Authorization: formattedToken,
              },
            }
          )
          .then((response) => {
            console.log("Response:", response.data);
            alert("Form submitted successfully!");
            navigate("/business-glossary");
          })
          .catch((error) => {
            console.error("Error submitting form:", error);
            alert("Error submitting form. Please try again later.");
          });
        
      } else {
        axios
          .post(
            "http://localhost:8080/api/meta-connect/business-domain-entity",
            data,
            {
              headers: {
                Authorization: formattedToken,
              },
            }
          )
          .then((response) => {
            console.log("Response:", response.data);
            alert("Form submitted successfully!");
            navigate("/business-glossary");
          })
          .catch((error) => {
            console.error("Error submitting form:", error);
            alert("Error submitting form. Please try again later.");
          });
      }
    }
         
  return (
    <>
      <div className="mt-28 ml-4 pb-12">
        <div className="flex justify-center">
          <IoChevronBack
            onClick={() => navigate("/business-glossary")}
            className=" text-gray-800 h-16 w-16 cursor-pointer px-4 py-2 rounded-md"
          />
          <form
            onSubmit={handleSubmit}
            className="max-w-md rounded px-8 pt-6 pb-8 mb-4 "
            style={{
          backdropFilter: "blur(5px)",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          boxShadow: "0 0 8px rgba(255, 255, 255, 0.7)",
        }}
          >
            {initialData ? (
              <h1 className="text-center">UPDATE ENTITY</h1>
            ) : (
              <h1 className="text-center">CREATE ENTITY</h1>
            )}
            {error && <h1 className="text-red-600">{error}</h1>}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Description:
              </label>
              <input
                type="text"
                id="description"
                name="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto"
              >
                {initialData ? "Update" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Form




  

