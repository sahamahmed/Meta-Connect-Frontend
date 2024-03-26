/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AlertDialogSlide from "../components/Modals";
import { useDispatch } from "react-redux";
import { addpost } from "../store/postSlice";

const DatabaseService = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [refreshed, setRefreshed] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const formattedToken = `Bearer ${token}`;    

    axios
      .get("http://localhost:8080/api/meta-connect/db-configs", {
        headers: {
          Authorization: formattedToken, // Include formatted token in the Authorization header
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
  }, []);

  useEffect(() => {
    if (posts) {
      dispatch(addpost(posts));
    }
  }, [posts, setPosts, dispatch]);

  const handleDelete = async (postId) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/meta-connect/db-config/${postId}`
      );
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      setError(error.message || "An error occurred while deleting the post.");
    }
  };

  const handleLoad = async (Id) => {
    try {
      axios
        .post(`http://localhost:8080/api/meta-connect/extract/${Id}`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          setError(error.message || "An error occurred while extracting data.");
        });
      setRefreshed((prevState) => ({ ...prevState, [Id]: true }));
    } catch (error) {
      setError(error.message || "An error occurred");
    }
  };

  //   console.log(posts.length);
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl text-center my-4">Database Service</h1>
      {posts.length === 0 && <h1>No data to show</h1>}

      {error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="bg-transparent p-4 rounded-md ">
          <div className="grid grid-cols-4 mb-4">
            <h2 className="text-lg font-semibold ml-2">Schema Name</h2>
            <h2 className="text-lg font-semibold ml-2">Type</h2>
            <h2 className="text-lg font-semibold flex justify-end mr-20">
              Actions
            </h2>
            <h2 className="text-lg font-semibold flex justify-end mr-20">
              Actions
            </h2>
          </div>
          {posts?.map((post) => (
            <div
              key={post.id}
              className="bg-teal-400 shadow-md rounded-md p-4 border-2  grid grid-cols-4 items-center"
              style={{ gap: "1rem" }}
            >
              <div className="col-span-1 flex justify-start">
                <h2 className="text-lg font-semibold">{post.schemaName}</h2>
              </div>

              <div className="col-span-1 flex justify-start">
                <h2 className="text-lg font-semibold">{post.type}</h2>
              </div>

              {/*  */}
              <div className="col-span-1 flex justify-end items-center gap-x-4">
                <button
                  className="bg-sky-500 text-white px-4 py-2 rounded-md"
                  // onClick={() => handleLoad(post.id)}
                >
                  {refreshed[post.id] ? "Refresh" : "Load"}
                </button>
                <Link
                  to={{
                    pathname: `/view/${post.id}`,
                  }}
                  className="bg-sky-500 text-white px-4 py-2 rounded-md"
                >
                  View
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
                  UPDATE
                </Link>
                <AlertDialogSlide func={() => handleDelete(post.id)} />
              </div>
            </div>
          ))}
        </div>
      )}

      <Link
        to={"/post"}
        className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-md"
      >
        Post
      </Link>
    </div>
  );
};

export default DatabaseService;
