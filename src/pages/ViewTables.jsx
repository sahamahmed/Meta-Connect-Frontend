import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {Link} from 'react-router-dom'
import { TokenFunction } from "../utils/BearerToken";

const ViewTables = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const { id } = useParams();
  const formattedToken = TokenFunction()

  useEffect(() => {
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
        setData(response.data);
      } catch (error) {
        setError("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, formattedToken]);

  return (
    <div className="container mt-20 px-4">
      {error && (
        <h1 className="text-center text-red-400 text-2xl mt-8">{error}</h1>
      )}
      <div className="mt-8 grid grid-cols-2 gap-6">
        {data.map((item) => (
          <div
            key={item.id}
            className="border flex flex-col justify-center gap-4 p-4 rounded-md shadow-md shadow-black "
             style={{
          backgroundColor: "rgba(255, 255, 250, 0.1)", // Transparent white background
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", // Visible shadow
        }}
          >
            <h2 className="text-lg font-semibold mb-2 text-center">Table Details</h2>
            <div className=" gap-4">
              
                <p className="font-semibold text-gray-800">Name:</p>
                <p className="">{item.tableName}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Type:</p>
                <p className="">{item.tableType}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">
                  Deleted from sourceDB:
                </p>
                <p className="">{item.deletedFromSourceDB.toString()}</p>
              </div>
              <div className="flex justify-center items-center">
                <Link
                  className="bg-blue-500 p-2 rounded-md text-white "
                  to={`/view/${id}/colomns/${item.id}`}
                >
                  View Columns
                </Link>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default ViewTables;
