import { useEffect } from "react";
import { Link  } from "react-router-dom";
import { useState} from "react";
import axios from "axios";
import AlertDialogSlide from "../components/Modals";
import {useDispatch} from 'react-redux'
import { addbusiness } from "../store/businessSlice";

const BisunessDomain = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/meta-connect/business-domain-entities")
      .then((response) => {
        setPosts(response.data.content);
      })
      .catch((error) => {
        setError(error.message || "An error occurred while fetching data.");
      });
      
  }, [posts ]);

  useEffect(()=>{
    if (posts) {
          dispatch(addbusiness(posts));
    }
  } , [posts , setPosts , dispatch])

  const handleDelete = async (postId) => {
      try {
        await axios.delete(
          `http://localhost:8080/api/meta-connect/business-domain-entity/${postId}`
        );
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      } catch (error) {
        setError(error.message || "An error occurred while deleting the post.");
      }
  };

  return (
    <>
      
      <div className="container mx-auto px-4">
        <h1 className="text-2xl text-center my-4">Business Domain</h1>
        {posts.length === 0 && <h1>No data to show</h1>}

        {error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <div className="bg-gray-300 shadow-md  p-4 rounded-md ">
            <div className="grid grid-cols-3 mb-4">
              <h2 className="text-lg font-semibold ml-2">Name</h2>
              <h2 className="text-lg font-semibold ml-2">Description</h2>
              <h2 className="text-lg font-semibold flex justify-end mr-20">
                Actions
              </h2>
            </div>
            {posts?.map((post) => (
              <div
                key={post.id}
                className="bg-white shadow-md rounded-md p-4 border-b-2 grid grid-cols-3 items-center"
                style={{ gap: "1rem" }}
              >
                <div className="col-span-1 flex justify-start">
                  <h2 className="text-lg font-semibold">{post.name}</h2>
                </div>

                <div className="col-span-1 flex justify-start">
                  <h2 className="text-lg font-semibold">{post.description}</h2>
                </div>

                <div className="col-span-1 flex justify-end items-center gap-x-4">
                  <Link
                    to={{
                      pathname: `/bisuness-domain/update-post/${post.id}`,
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
          to={"/bisuness-domain/post"}
          className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-md"
        >
          Post
        </Link>
      </div>
    </>
  );
}

export default BisunessDomain