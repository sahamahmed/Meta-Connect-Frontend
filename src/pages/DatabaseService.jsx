/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AlertDialogSlide from "../components/Modals";
import { useDispatch } from "react-redux";
import { addpost } from "../store/postSlice";
import { TokenFunction } from "../utils/BearerToken";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CustomizedSnackbars from "../components/Notifications";
import { CiCirclePlus } from "react-icons/ci";
import { GrView } from "react-icons/gr";
import { FaDownload } from "react-icons/fa6";
import { FiRefreshCw } from "react-icons/fi";
import { TbDatabaseEdit } from "react-icons/tb";

const DatabaseService = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [extracted , setExtracted ] = useState(null)
  const [refreshed, setRefreshed] = useState({});
  const formattedToken = TokenFunction();   
  const dispatch = useDispatch();
const navigate = useNavigate()
const location = useLocation();
console.log(location.state)

 useEffect(() => {
   if (!formattedToken) {
     navigate("/"); 
   }
 }, [formattedToken, navigate]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/meta-connect/db-configs", {
        headers: {
          Authorization: formattedToken,
        },
      })
      .then((response) => {
        console.log(response.data);
        setPosts(response.data.content)
      })
      .catch((error) => {
        console.error(
          error.message || "An error occurred while fetching data."
        );
      });
  }, [formattedToken]);

  useEffect(() => {
    if (posts) {
      dispatch(addpost(posts));
    }
  }, [posts, setPosts, dispatch]);

  const handleDelete = async (postId) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/meta-connect/db-config/${postId}`,
        {
          headers: {
            Authorization: formattedToken,
          },
        }
      );
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      setError(error.message || "An error occurred while deleting the post.");
    }
  };

  const handleLoad = async (Id) => {
    try {
      axios
        .post(`http://localhost:8080/api/meta-connect/extract/${Id}`,{}, {
          headers: {
            Authorization: formattedToken,
          },
        })
        .then((response) => {
          setExtracted(true)
        })   
        .catch((error) => {
          setError(error.message || "An error occurred while extracting data.");
        });
      setRefreshed((prevState) => ({ ...prevState, [Id]: true }));
    } catch (error) {
      setError(error.message || "An error occurred");
    }
  };

  return (
    <div className="mt-20">
      {extracted && <CustomizedSnackbars message={`Meta Data extracted successfully`} type={"success"} />}
      {error && <CustomizedSnackbars message={`${error}`} type={"error"} />}
      {location.state?.fromLogin && (
        <CustomizedSnackbars
          message={`Sucessfully logged In!`}
          type={"success"}
        />
      )}
      <h1 className="text-2xl text-center my-4">Database Service</h1>
      {posts.length === 0 && <h1>No data to show</h1>}

      <div className="bg-transparent p-4 rounded-md ">
        <div className="grid grid-cols-5 mb-4">
          <h2 className="text-lg font-semibold ml-2 col-span-1">Schema Name</h2>
          <h2 className="text-lg font-semibold ml-2 col-span-1">
            Catalog Name
          </h2>
          <h2 className="text-lg font-semibold ml-2 col-span-1">Type</h2>
        </div>
        {posts?.map((post) => (
          <div
            key={post.id}
            className="bg-teal-400 shadow-md rounded-md p-4 border-2  grid grid-cols-5 items-center"
            style={{ gap: "1rem" }}
          >
            <div className="col-span-1 flex justify-start">
              <h2 className="text-lg font-semibold">{post.schemaName}</h2>
            </div>
            <div className="col-span-1 flex justify-start">
              <h2 className="text-lg font-semibold">{post.catalogName}</h2>
            </div>
            <div className="col-span-1 flex justify-start">
              <h2 className="text-lg font-semibold">{post.type}</h2>
            </div>

            {/*  */}
            <div className="col-span-1 flex justify-end items-center gap-x-4">
              <button
                className="bg-sky-500 text-white px-4 py-2 rounded-md"
                onClick={() => handleLoad(post.id)}
              >
                {refreshed[post.id] ? <FiRefreshCw /> : <FaDownload />}
              </button>
              <Link
                to={{
                  pathname: `/view/${post.id}`,
                }}
                className="bg-sky-500 text-white px-4 py-2 rounded-md"
              >
                <GrView />
              </Link>
            </div>
            {/*  */}

            <div className="col-span-1 flex justify-end items-center gap-x-4">
              <Link
                to={{
                  pathname: `/update-post/${post.id}`,
                }}
                className="bg-sky-500 text-white px-4 py-2 rounded-md"
              >
                <TbDatabaseEdit />
              </Link>
              <AlertDialogSlide func={() => handleDelete(post.id)} />
            </div>
          </div>
        ))}
      </div>

      <Link to={"/post"} className="fixed bottom-6 right-6 ">
        <CiCirclePlus className="text-gray-800 h-16 w-16 " />
      </Link>
    </div>
  );
};

export default DatabaseService;
