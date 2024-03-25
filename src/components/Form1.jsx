/* eslint-disable react/prop-types */


const StepForm1 = ({ initialData,  serviceFormData, handleServiceFormChange }) => {
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
         <div className="flex items-center mb-3">
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
         <div className="flex items-center mb-3">
           <input
             type="checkbox"
             id="mssql"
             name="serviceName"
             value="mssql"
             checked={initialData.type === "sqlserver"}
readOnly            
 className="mr-2"

           />
           <label htmlFor="mssql">MSSQL</label>
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
         <div className="flex items-center mb-3">
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
         <div className="flex items-center mb-3">
           <input
             type="checkbox"
             id="mssql"
             name="serviceName"
             value="mssql"
             checked={serviceFormData.serviceName === "mssql"}
             onChange={handleCheckboxChange}
             className="mr-2"
           />
           <label htmlFor="mssql">MSSQL</label>
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
           className="w-full px-3 py-2 border border-gray-500 rounded-md mb-3 font-normal"
           placeholder={
             serviceFormData.serviceName === "mysql"
               ? "mysql"
               : serviceFormData.serviceName === "mssql"
               ? "sqlserver"
               : ""
           }
         />
       </div>
     );
   }
};

export default StepForm1;
