import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import FormPopup from "../components/MapEntities/MappingForm";

const ViewColumns = () => {
  let { id, item } = useParams();
  const [table, setTable] = useState(null);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [isHovered, setIsHovered] = useState(null);

  useEffect(() => {
    setError("");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/meta-connect/db-metadata-values/${id}`
        );
        const table = response.data.find((t) => t.id === parseInt(item));
        if (table) {
          setTable(table);
        } else {
          setError("Table not found");
        }
      } catch (error) {
        setError("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, item]);

  const handleMapEntities = (column) => {
    setSelectedColumn(column);
    setShowForm(true);
  };

  const deleteMapEntities = async (columnId, entityId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/meta-connect/delete/${columnId}/catalog-mapping-column/${entityId}`
      );

      console.log("Entity Deleted", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting entity:", error);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    window.location.reload();
  };

  const handleMouseEnter = (column) => {
    setIsHovered(column);
  };

  const handleMouseLeave = () => {
    setIsHovered(null);
  };

  return (
    <div className="container mx-auto px-4 my-4">
      {error && (
        <h1 className="text-center text-red-400 text-2xl mt-8">{error}</h1>
      )}
      {table && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">{`Columns of Table: ${table.tableName}`}</h2>
          <div className="grid grid-cols-1 gap-4">
            {table.columnList.map((column) => (
              <div
                key={column.id}
                className="border p-4 rounded-md shadow-md bg-white relative"
                onMouseEnter={() => handleMouseEnter(column)}
                onMouseLeave={() => handleMouseLeave()}
              >
                <p className="text-gray-800 font-semibold">Column Name:</p>
                <p>{column.columnName}</p>
                <p className="text-gray-800 font-semibold">Data Type:</p>
                <p>{column.datatype}</p>
                <p className="text-gray-800 font-semibold">Maximum Length:</p>
                <p>{column.maximumCharacterLength}</p>
                <p className="text-gray-800 font-semibold">Nullable:</p>
                <p>{column.isNullable}</p>
                <p className="text-gray-800 font-semibold">
                  Deleted from Source db:
                </p>
                <p>{column.deletedFromSourceDB.toString()}</p>
                {column.columnEntityMapDto.length !== 0 && (
                  <>
                    <p className="text-gray-800 font-semibold">
                      Column-Entity Mapping:
                    </p>
                    {column.columnEntityMapDto.map((entity) => (
                      <div key={entity.id} className="relative inline-block">
                        <p className="m-2">{entity.name}</p>
                        <button
                          className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white p-1 rounded-full flex justify-center items-center"
                          onClick={() =>
                            deleteMapEntities(column.id, entity.id)
                          }
                          style={{ width: "20px", height: "20px" }} 
                        >
                          x
                        </button>
                      </div>
                    ))}
                  </>
                )}
                {isHovered === column && (
                  <button
                    className="absolute bottom-2 right-2 bg-blue-500 text-white py-1 px-2 rounded"
                    onClick={() => handleMapEntities(column)}
                  >
                    Map Entities
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {showForm && selectedColumn && (
        <FormPopup onClose={handleCloseForm} column={selectedColumn} />
      )}
    </div>
  );
};

export default ViewColumns;
