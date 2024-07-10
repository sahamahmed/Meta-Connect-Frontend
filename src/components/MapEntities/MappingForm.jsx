/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState , useEffect} from "react";
import axios from 'axios'
import { TokenFunction } from "../../utils/BearerToken";

const FormPopup = ({ onClose, column , setRerun}) => {
  const [selectedEntities, setSelectedEntities] = useState([]); 
  const [businessEntities, setBusinessEntities] = useState([]);
  const formattedToken = TokenFunction();
    useEffect(() => {
      axios
        .get(
          "http://localhost:8080/api/meta-connect/business-domain-entities",
          {
            headers: {
              Authorization: formattedToken,
            },
          }
        )
        .then((response) => {
          setBusinessEntities(response.data.content);
        })
        .catch((error) => {
          console.log(error.message || "An error occurred while fetching data.");
        });
    }, [ formattedToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    onClose();
    const selectedEntityIds = selectedEntities?.map((selectedEntityName) => {
      const selectedEntity = businessEntities.find(
        (entity) => entity.name === selectedEntityName
      );
      return selectedEntity ? selectedEntity.id : null;
    });

    const validSelectedEntityIds = selectedEntityIds.filter(
      (id) => id !== null
    );
     try {
    const response = await axios.post(
      `http://localhost:8080/api/meta-connect/${column.id}/catalog-mapping-column`,
      validSelectedEntityIds,
      {
        headers: {
          Authorization: formattedToken,
        },
      }
    );

    setRerun(prev => !prev)
    console.log("Mapping column response:", response.data);
  } catch (error) {
    console.error("Error mapping column:", error);
  }
  };


  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    const isSelected = selectedEntities.includes(value);
    setSelectedEntities((prevSelectedEntities) =>
      isSelected
        ? prevSelectedEntities.filter((entity) => entity !== value)
        : [...prevSelectedEntities, value]
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4">Map Entities</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="field1" className="block mb-2">
              Column:
            </label>
            <input
              type="text"
              id="field1"
              disabled={true}
              readOnly
              className="border px-2 py-1 rounded-md"
              placeholder={column.columnName}
            />
          </div>
          {/* Business Entities field */}
          <div className="mb-4">
            <label className="block mb-2">Business Entities:</label>
            {businessEntities.map((entity) => (
              <div key={entity.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={entity.id}
                  name="businessEntity"
                  value={entity.name}
                  className="mr-2"
                  onChange={handleCheckboxChange}
                  checked={selectedEntities.includes(entity.name)}
                />
                <label htmlFor={entity.id}>{entity.name}</label>
              </div>
            ))}
          </div>
          {/* Submit and Close buttons */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormPopup;
