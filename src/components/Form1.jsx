/* eslint-disable react/prop-types */
import { SiMysql } from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi";

const StepForm1 = ({
  initialData,
  serviceFormData,
  handleServiceFormChange,
}) => {
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    handleServiceFormChange({
      target: {
        name,
        value: checked ? event.target.value : "",
      },
    });
  };

  if (initialData) {
    console.log(initialData);

    return (
      <div>
        <label className="block mb-2">Service Name:</label>
        <div className="flex flex-row justify-between mb-4">
          {/* MySQL */}
          <div className="flex flex-col justify-center items-center gap-2">
            <SiMysql className="h-20 w-20 border border-black rounded-md px-2 py-1" />
            <div>
              <input
                type="checkbox"
                id="mysql"
                name="serviceName"
                value="mysql"
                checked={initialData.type === "mysql"}
                onChange={handleCheckboxChange}
                readOnly
                className="mr-2"
              />

              <label htmlFor="mysql">MySQL</label>
            </div>
          </div>
          {/* Postgres */}
          <div className="flex flex-col justify-center items-center gap-2">
            <div>
              <BiLogoPostgresql className="h-20 w-20 border border-black rounded-md px-2 py-1 text-blue-950" />
              <input
                type="checkbox"
                id="mssql"
                name="serviceName"
                value="mssql"
                checked={initialData.type === "postgres"}
                readOnly
                className="mr-2"
              />
              <label htmlFor="mssql">Postgres</label>
            </div>
          </div>
        </div>

        <label htmlFor="serviceType" className="block mb-2">
          Service Type:
        </label>
        <input
          type="text"
          id="serviceType"
          name="serviceType"
          value={initialData.type}
          readOnly
          disabled={true}
          className="w-full px-3 py-2 border border-gray-500 rounded-md mb-3 font-normal cursor-not-allowed"
          placeholder={initialData.type}
        />
      </div>
    );
  } else {
    return (
      <div>
        <label className="block mb-2">Service Name:</label>
        <div className="flex flex-row justify-between mb-4">
          {/* MySQL */}
          <div className="flex flex-col justify-center items-center gap-2">
            <SiMysql className="h-20 w-20 border border-black rounded-md px-2 py-1" />
            <div>
              <input
                type="checkbox"
                id="mysql"
                name="serviceName"
                value="mysql"
                checked={serviceFormData.serviceName === "mysql"}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label htmlFor="mysql">MySQL</label>
            </div>
          </div>

          <div className="flex flex-row justify-between">
            {/*  */}
            <div className="flex flex-col justify-center items-center gap-2">
              <BiLogoPostgresql className="h-20 w-20 border border-black rounded-md px-2 py-1 text-blue-950" />
              <div>
                <input
                  type="checkbox"
                  id="postgres"
                  name="serviceName"
                  value="postgres"
                  checked={serviceFormData.serviceName === "postgres"}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label htmlFor="postgres">Postgres</label>
              </div>
            </div>
          </div>
        </div>

        <label htmlFor="serviceType" className="block mb-2">
          Service Type:
        </label>
        <input
          type="text"
          id="serviceType"
          name="serviceType"
          value={serviceFormData.serviceType}
          readOnly
          disabled={true}
          className="w-full px-3 py-2 border border-gray-500 text-gray-400 rounded-md mb-3 font-normal cursor-not-allowed"
          placeholder={
            serviceFormData.serviceName === "mysql"
              ? "mysql"
              : serviceFormData.serviceName === "postgres"
              ? "postgres"
              : ""
          }
        />
      </div>
    );
  }
};

export default StepForm1;
