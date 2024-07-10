/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { TokenFunction } from "../../utils/BearerToken";
import axios  from "axios";
import { useState, useEffect } from "react";
import "./stepper.css";
import { TiTick } from "react-icons/ti";
import StepForm1 from "../Form1";
import StepForm2 from "../Form2";
import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { ClipLoader } from "react-spinners";

const Stepper = ({ initialData }) => {
  const steps = ["Service Selection", "Connection Details"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const [loading , setLoading] = useState(false)
  const navigate = useNavigate();
  const formattedToken = TokenFunction()
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
    setLoading(true)
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
        axios.put(`http://localhost:8080/api/meta-connect/db-config/${initialData.id}`, {...data, type:initialData.type},{
            headers: {
              Authorization: formattedToken, 
            },
          })
         .then((response) => {
                  console.log("Response:", response.data);
                  alert("Form submitted successfully!");
                  navigate("/database-service")
                })
            .catch((error) => {
                  console.error("Error submitting form:", error);
                  alert("Error submitting form. Please try again later.");
                });
        
      } else {
        
        axios
          .post("http://localhost:8080/api/meta-connect/db-config", data, {
            headers: {
              Authorization: formattedToken,
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
          })
          .finally(() => setLoading(false));

      }
    } else {
      setCurrentStep((prevStep) => prevStep + 1);
      setLoading(false)
    }
  };

  useEffect(() => {
    setServiceSelectionData((prevData) => ({
      ...prevData,
      serviceType:
        prevData.serviceName === "mysql"
          ? "mysql"
          : prevData.serviceName === "postgres"
          ? "postgres"
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
      <div className="mt-16 ml-8 pb-12">
        <div className="flex flex-col justify-center items-center gap-6">
          <h1 className="text-center text-2xl ">
            DATABASE SERVICES
          </h1>
          <div className=" flex flex-row justify-center ">
            <IoChevronBack
              onClick={() => navigate("/database-service")}
              className=" text-gray-800 h-16 w-16 cursor-pointer px-4 py-2 rounded-md"
            />

            <div className="flex flex-col justify-center items-center gap-y-4 text-black">
              <div className="flex">
                {steps.map((step, i) => (
                  <div
                    key={i}
                    className={`step-item ${
                      currentStep === i + 1 && "active"
                    } ${(i + 1 < currentStep || complete) && "complete"} `}
                  >
                    <div className="step">
                      {i + 1 < currentStep || complete ? (
                        <TiTick size={24} />
                      ) : (
                        i + 1
                      )}
                    </div>
                    <p className="text-gray-800">{step}</p>
                  </div>
                ))}
              </div>

              <form
                onSubmit={handleSubmit}
                className=" bg-slate-300 p-6 rounded-md shadow-md"
                
              >
                {loading && (
                  <div className="loading-overlay w-full text-center ">
                    <ClipLoader color="#0000ff" loading={true} size={50} />
                  </div>
                )}
                {currentStep === 1 && (
                  <>
                    {initialData ? (
                      <StepForm1 initialData={initialData} />
                    ) : (
                      <StepForm1
                        serviceFormData={serviceSelectionData}
                        handleServiceFormChange={
                          handleServiceSelectionFormChange
                        }
                      />
                    )}
                  </>
                )}

                {currentStep === 2 && (
                  <StepForm2
                    connectionFormData={connectionDetailsData}
                    handleConnectionFormChange={
                      handleConnectionDetailsFormChange
                    }
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Stepper;
