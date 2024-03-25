/* eslint-disable react/prop-types */


const StepForm2 = ({ connectionFormData, handleConnectionFormChange }) => {
  return (
    <div>
      <label htmlFor="url" className="block mb-2">
        URL:
      </label>
      <input
        type="text"
        id="url"
        name="url"
        value={connectionFormData.url}
        onChange={handleConnectionFormChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
      />
      <div className=" flex flex-row gap-x-2">
        <div>
          <label htmlFor="username" className="block mb-2">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={connectionFormData.username}
            onChange={handleConnectionFormChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={connectionFormData.password}
            onChange={handleConnectionFormChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
          />
        </div>
      </div>
      <label htmlFor="schemaName" className="block mb-2">
        Schema Name:
      </label>
      <input
        type="text"
        id="schemaName"
        name="schemaName"
        value={connectionFormData.schemaName}
        onChange={handleConnectionFormChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
      />
      <label htmlFor="catalogName" className="block mb-2">
        Catalog Name:
      </label>
      <input
        type="text"
        id="catalogName"
        name="catalogName"
        value={connectionFormData.catalogName}
        onChange={handleConnectionFormChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
      />
    </div>
  );
};

export default StepForm2;
