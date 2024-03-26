/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import axios  from "axios";
import { useState, useEffect } from "react";
import "./stepper.css";
import { TiTick } from "react-icons/ti";
import StepForm1 from "../Form1";
import StepForm2 from "../Form2";
import { useNavigate } from "react-router-dom";

const Stepper = ({ initialData }) => {
  const steps = ["Service Selection", "Connection Details"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const navigate = useNavigate();

  const [serviceSelectionData, setServiceSelectionData] = useState({
    serviceName: initialData?.serviceName || "",
    serviceType: initialData?.serviceType || "",
  });

  const [connectionDetailsData, setConnectionDetailsData] = useState({
    url: initialData?.url || "",
    username: initialData?.username || "",
    password: initialData?.password || "",
    schemaName: initialData?.schemaName || "",
    catalogName: initialData?.catalogName || "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentStep === steps.length) {
      setComplete(true);
      const data = {
        type: serviceSelectionData.serviceType,
        url: connectionDetailsData.url,
        username: connectionDetailsData.username,
        password: connectionDetailsData.password,
        schemaName: connectionDetailsData.schemaName,
        catalogName: connectionDetailsData.catalogName,
      };

      if (initialData) {
        axios.put(`http://localhost:8080/api/meta-connect/db-config/${initialData.id}`, {...data, type:initialData.type})
         .then((response) => {
                  console.log("Response:", response.data);
                  alert("Form submitted successfully!");
                  navigate("/")
                })
            .catch((error) => {
                  console.error("Error submitting form:", error);
                  alert("Error submitting form. Please try again later.");
                });
        
      } else {
        const token = localStorage.getItem("token");
        const formattedToken = `Bearer ${token}`;
        axios
          .post("http://localhost:8080/api/meta-connect/db-config", data, {
            headers: {
              Authorization: formattedToken, // Include formatted token in the Authorization header
            },
          })
          .then((response) => {
            console.log("Response:", response.data);
            alert("Form submitted successfully!");
            navigate("/database-service");
          })
          .catch((error) => {
            console.error("Error submitting form:", error);
            alert("Error submitting form. Please try again later.");
          });

      }
    } else {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  useEffect(() => {
    setServiceSelectionData((prevData) => ({
      ...prevData,
      serviceType:
        prevData.serviceName === "mysql"
          ? "mysql"
          : prevData.serviceName === "mssql"
          ? "sqlserver"
          : "",
    }));
  }, [serviceSelectionData.serviceName]);

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleServiceSelectionFormChange = (event) => {
    const { name, value } = event.target;
    setServiceSelectionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleConnectionDetailsFormChange = (event) => {
    const { name, value } = event.target;
    setConnectionDetailsData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="mt-8 ml-8">
        <button
          onClick={() => navigate("/")}
          className=" bg-black text-white px-4 py-2 rounded-md"
        >
          Back
        </button>
      </div>
      <div className="flex flex-col justify-center items-center gap-y-4 text-black">
        <div className="flex">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`step-item ${currentStep === i + 1 && "active"} ${
                (i + 1 < currentStep || complete) && "complete"
              } `}
            >
              <div className="step">
                {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
              </div>
              <p className="text-gray-100">{step}</p>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-300 p-6 rounded-md shadow-md"
        >
          {currentStep === 1 && (
  <>
    {initialData ? (
      
      <StepForm1 initialData={initialData}/>
    ) : (
      <StepForm1
        serviceFormData={serviceSelectionData}
        handleServiceFormChange={handleServiceSelectionFormChange}
      />
    )}
  </>
)}

          {currentStep === 2 && (
            <StepForm2
              connectionFormData={connectionDetailsData}
              handleConnectionFormChange={handleConnectionDetailsFormChange}
            />
          )}

          <div className="flex justify-center gap-4 mt-4">
            {currentStep !== 1 && (
              <button className="btn " onClick={handleBack}>
                Back
              </button>
            )}
            <button className="btn" type="submit">
              {currentStep === steps.length ? "Finish" : "Next"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Stepper;
