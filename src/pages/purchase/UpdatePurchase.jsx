import { useLoaderData } from "react-router-dom";

const UpdatePurchase = () => {
    const purchase=useLoaderData()
    return (
        <div>
            <h2>{purchase._id}</h2>
        </div>
    );
};

export default UpdatePurchase;