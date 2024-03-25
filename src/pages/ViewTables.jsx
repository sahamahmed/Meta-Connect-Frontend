import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {Link} from 'react-router-dom'

const ViewTables = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/meta-connect/db-metadata-values/${id}`
        );
        setData(response.data);
      } catch (error) {
        setError("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="container mx-auto px-4">
      {error && (
        <h1 className="text-center text-red-400 text-2xl mt-8">{error}</h1>
      )}
      <div className="mt-8">
        {data.map((item) => (
          <div key={item.id} className="border p-4 mb-4 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-2">Table Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-white">TableName:</p>
                <p className="font-semibold">{item.tableName}</p>
              </div>
              <div>
                <p className="text-white">TableType:</p>
                <p className="font-semibold">{item.tableType}</p>
              </div>
              <div>
                <p className="text-white">Deleted from sourceDB:</p>
                <p className="font-semibold">
                  {item.deletedFromSourceDB.toString()}
                </p>
              </div>
              <div>
                <Link
                  className="bg-blue-500 p-2 rounded-md text-white"
                  to={`/view/${id}/colomns/${item.id}`}
                >
                  View Colomns
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewTables;
