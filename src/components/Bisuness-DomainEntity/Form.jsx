/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const Form = ({initialData}) => {
    const [name , setName] = useState(initialData?.name || '')
    const [description , setDescription] = useState(initialData?.description || '')
    const [error, setError] = useState('')
    const navigate = useNavigate()

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
            data
          )
          .then((response) => {
            console.log("Response:", response.data);
            alert("Form submitted successfully!");
            navigate("/bisuness-domain");
          })
          .catch((error) => {
            console.error("Error submitting form:", error);
            alert("Error submitting form. Please try again later.");
          });
        
      } else {
        axios
          .post(
            "http://localhost:8080/api/meta-connect/business-domain-entity",
            data
          )
          .then((response) => {
            console.log("Response:", response.data);
            alert("Form submitted successfully!");
            navigate("/bisuness-domain");
          })
          .catch((error) => {
            console.error("Error submitting form:", error);
            alert("Error submitting form. Please try again later.");
          });
      }
    }
         
  return (
    <>
      <div className="mt-8 ml-8">
        <button
          onClick={() => navigate("/bisuness-domain")}
          className=" bg-black text-white px-4 py-2 rounded-md"
        >
          Back
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {initialData ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
}

export default Form




  

