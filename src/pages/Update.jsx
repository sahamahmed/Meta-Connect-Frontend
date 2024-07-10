import {useSelector} from 'react-redux'
import Stepper from "../components/Stepper/Stepper";
import { useParams } from 'react-router-dom';

const UpdatePost = () => {
    const {id} = useParams()
    const postData = useSelector((state) => state.post.postData);
  let initialData = postData?.filter((p)=> p.id == id)
  initialData = initialData[0] 
  console.log(initialData)

  return (
    <div>
      <h1 className='text-2xl text-center my-4 text-gray-900'>Update Post</h1>
      {postData && <Stepper initialData={initialData} />}
    </div>
  );
};

export default UpdatePost;
