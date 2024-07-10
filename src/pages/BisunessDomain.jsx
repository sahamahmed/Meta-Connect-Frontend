import { useEffect } from "react";
import { Link  } from "react-router-dom";
import { useState} from "react";
import axios from "axios";
import AlertDialogSlide from "../components/Modals";
import {useDispatch} from 'react-redux'
import { addbusiness } from "../store/businessSlice";
import { TokenFunction } from "../utils/BearerToken";
import {useNavigate} from "react-router-dom"
import { CiCirclePlus } from "react-icons/ci";
import { LiaUserEditSolid } from "react-icons/lia";
import CustomizedSnackbars from "../components/Notifications";


const BisunessDomain = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false)

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const formattedToken = TokenFunction()
   useEffect(() => {
     if (!formattedToken) {
       navigate("/");
     }
   }, [formattedToken, navigate]);
   
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/meta-connect/business-domain-entities", {
        headers: {
          Authorization: formattedToken,
        },
      })
      .then((response) => {
        setPosts(response.data.content);
      })
      .catch((error) => {
        setError(error.message || "An error occurred while fetching data.");
      });
      
  }, [posts, formattedToken ]);

  useEffect(()=>{
    if (posts) {
          dispatch(addbusiness(posts));
    }
  } , [posts , setPosts , dispatch])

  const handleDelete = async (postId) => {
      try {
        await axios.delete(
          `http://localhost:8080/api/meta-connect/business-domain-entity/${postId}`,
          {
            headers: {
              Authorization: formattedToken,
            },
          }
        );
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      } catch (error) {
        setShowSnackbar(true)
      }
  };

  return (
    <>
      <div className="container mx-auto px-4 mt-20">
        <h1 className="text-2xl text-center my-4">Business Glossary</h1>
        {posts.length === 0 && <h1>No data to show</h1>}

        {showSnackbar && (
          <CustomizedSnackbars message={`Cannot delete already mapped entities`} type={"error"} />
        )}
          <div className=" p-4 rounded-md ">
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
                className=" shadow-md rounded-md p-4 border-b-2 grid grid-cols-3 items-center mb-2 bg-teal-400"
                style={{
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", // Visible shadow
                }}
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
                      pathname: `/business-glossary/update/${post.id}`,
                    }}
                    className="bg-sky-500 text-white px-4 py-2 rounded-md"
                  >
                    <LiaUserEditSolid />
                  </Link>
                  <AlertDialogSlide func={() => handleDelete(post.id)} />
                </div>
              </div>
            ))}
          </div>
      

        <Link to={"/business-glossary/post"} className="fixed bottom-6 right-6">
          <CiCirclePlus className="text-gray-800 h-16 w-16 " />
        </Link>
      </div>
    </>
  );
}

export default BisunessDomain