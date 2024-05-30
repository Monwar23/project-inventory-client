import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateSupplier = () => {
    const supplier = useLoaderData()
    const location = useLocation()
    const navigate = useNavigate()

    const {
        _id, supplier_name,
        phone,
        email,
    } = supplier

    const handleUpdate = e => {
        e.preventDefault();
        const form = e.target;
        const supplier_name = form.supplier_name.value
        const phone = form.phone.value
        const email = form.email.value

        const foodData = { supplier_name, phone, email }
        // console.log(foodData);

        fetch(`http://localhost:8000/supplier/${_id}`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(foodData)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data?.modifiedCount > 0) {
                    Swal.fire("Success", "Supplier item added successfully", "success");
                    
                  navigate(location?.state ? location.state : '/supplier')
                   
                }
            })
    }


    return (
        <div className="max-w-2xl mx-auto bg-gray-100 p-5 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-5 text-center">Update Supplier</h2>
            <form onSubmit={handleUpdate}>
                <div className="mb-3">
                    <label htmlFor="supplier_name" className="block font-medium ">Supplier Name</label>
                    <input type="text" id="supplier_name" name="supplier_name" defaultValue={supplier_name} placeholder="Supplier Name" required className="mt-1 block w-full rounded-md shadow-sm h-10 px-2 border border-violet-500" />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="block font-medium ">Phone</label>
                    <input type="number" id="phone" defaultValue={phone} name="phone" placeholder="Phone" className="mt-1 block w-full rounded-md border border-violet-500 shadow-sm h-10 px-2" />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="block font-medium ">Email</label>
                    <input type="email" id="email" defaultValue={email} name="email" placeholder="email" className="mt-1 block w-full rounded-md border border-violet-500 shadow-sm h-10 px-2" />
                </div>

                <div className="modal-action">
                    <button className="border-b-4 text-violet-500 hover:text-white hover:bg-violet-500 px-3 py-2 rounded-lg border-violet-500">Update</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateSupplier;