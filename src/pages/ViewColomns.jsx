import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import FormPopup from "../components/MapEntities/MappingForm";
import { TokenFunction } from "../utils/BearerToken";

const ViewColumns = () => {
  let { id, item } = useParams();
  const [table, setTable] = useState(null);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const formattedToken = TokenFunction()
  const [isHovered, setIsHovered] = useState(null);
  const [rerun, setRerun] = useState(false);

  useEffect(() => {
    setError("");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/meta-connect/db-metadata-values/${id}`,
          {
            headers: {
              Authorization: formattedToken,
            },
          }
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
  }, [id, item, formattedToken, rerun]);

  const handleMapEntities = (column) => {
    setSelectedColumn(column);
    setShowForm(true);
  };

  const deleteMapEntities = async (columnId, entityId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/meta-connect/delete/${columnId}/catalog-mapping-column/${entityId}`,
        {
          headers: {
            Authorization: formattedToken,
          },
        }
      );

      console.log("Entity Deleted", response.data);
      setRerun(prev => !prev)
    } catch (error) {
      console.error("Error deleting entity:", error);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleMouseEnter = (column) => {
    setIsHovered(column);
  };

  const handleMouseLeave = () => {
    setIsHovered(null);
  };

  return (
    <div className="container mx-auto px-4 mb-4 mt-20">
      {error && (
        <h1 className="text-center text-red-400 text-2xl mt-8">{error}</h1>
      )}
      {table && (
        <div className="mt-8">
          <h2 className="text-lg font-bold mb-4">{`Columns of : ${table.tableName}`}</h2>
          <div className="grid grid-cols-3 gap-4">
            {table.columnList.map((column) => (
              <div
                key={column.id}
                className="border p-4 rounded-md shadow-md  relative"
                 style={{
          backgroundColor: "rgba(255, 255, 250, 0.1)", // Transparent white background
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", // Visible shadow
        }}
                onMouseEnter={() => handleMouseEnter(column)}
                onMouseLeave={() => handleMouseLeave()}
              >
                <p className="text-blue-950 font-semibold">Column Name:</p>
                <p className="font-bold">{column.columnName}</p>
                <p className="text-blue-950 font-semibold">Data Type:</p>
                <p className="font-bold">{column.datatype}</p>
                <p className="text-blue-950 font-semibold">Maximum Length:</p>
                <p className="font-bold">{column.maximumCharacterLength}</p>
                <p className="text-blue-950 font-semibold">Nullable:</p>
                <p className="font-bold">{column.isNullable}</p>
                <p className="text-blue-950 font-semibold">
                  Deleted from Source db:
                </p>
                <p className="font-bold">{column.deletedFromSourceDB.toString()}</p>
                {column.columnEntityMapDto.length !== 0 && (
                  <>
                    <p className="text-blue-950 font-semibold">
                      Column-Entity Mapping:
                    </p>
                    {column.columnEntityMapDto.map((entity) => (
                      <div key={entity.id} className="relative inline-block">
                        <p className="m-2 ">{entity.name}</p>
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
        <FormPopup onClose={handleCloseForm} column={selectedColumn} setRerun={setRerun}/>
      )}
    </div>
  );
};

export default ViewColumns;
