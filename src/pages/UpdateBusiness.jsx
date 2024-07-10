import Form from "../components/Bisuness-DomainEntity/Form"
import { useParams } from "react-router-dom";
import {useSelector} from "react-redux"

const UpdateBusiness = () => {
    const { id } = useParams();
    const postData = useSelector((state) => state.business.businessData);
    let initialData = postData?.filter((p) => p.id == id);
 initialData = initialData[0]
  return (
    <div>
        <h1 className="text-2xl text-center my-4 text-gray-800 ">Update form</h1>
        <Form initialData={initialData} />
    </div>
  )
}

export default UpdateBusiness