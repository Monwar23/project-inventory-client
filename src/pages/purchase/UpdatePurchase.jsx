import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useCategory from "../../hooks/useCategory";
import useSupplier from "../../hooks/useSupplier";

const UpdatePurchase = () => {
    const purchase = useLoaderData();
    const location = useLocation();
    const navigate = useNavigate();
    const [category] = useCategory();
    const [supplier] = useSupplier();

    const {
        _id, supplier_name, product_name,image, category: defaultCategory,
        quantity, purchase_price, 
    } = purchase;

    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const supplier_name = form.supplier_name.value;
        const product_name = form.product_name.value;
        // const image=image;
        const category = form.category.value;
        const quantity = form.quantity.value;
        const purchase_price = form.purchase_price.value;

        const purchaseData = {
            supplier_name, product_name, category,  quantity, purchase_price,image 
        };

        fetch(`http://localhost:8000/purchase/${_id}`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(purchaseData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data?.modifiedCount > 0) {
                    Swal.fire("Success", "Purchase updated successfully", "success");
                    navigate(location?.state ? location.state : "/purchase");
                }
            });
    };

    return (
        <div className="max-w-2xl mx-auto bg-gray-100 p-5 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-5 text-center">Update Purchase</h2>
            <form onSubmit={handleUpdate}>
                <div className="mb-3">
                    <label htmlFor="supplier_name" className="block font-medium">Supplier Name</label>
                    <select
                        id="supplier_name"
                        name="supplier_name"
                        defaultValue={supplier_name}
                        className="mt-1 block w-full rounded-md shadow-sm h-10 px-2 border border-violet-500"
                        required
                    >
                        <option value="">Select Supplier</option>
                        {supplier.map(supply => (
                            <option key={supply._id} value={supply.supplier_name}>
                                {supply.supplier_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="product_name" className="block font-medium">Product Name</label>
                    <input
                        type="text"
                        id="product_name"
                        name="product_name"
                        defaultValue={product_name}
                        placeholder="Product Name"
                        required
                        className="mt-1 block w-full rounded-md shadow-sm h-10 px-2 border border-violet-500"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="block font-medium">Category</label>
                    <select
                        id="category"
                        name="category"
                        defaultValue={defaultCategory}
                        className="mt-1 block w-full rounded-md shadow-sm h-10 px-2 border border-violet-500"
                        required
                    >
                        <option value="">Select Category</option>
                        {category.map(cat => (
                            <option key={cat._id} value={cat.name}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div className="mb-3">
                    <label htmlFor="quantity" className="block font-medium">Quantity</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        defaultValue={quantity}
                        placeholder="Quantity"
                        required min='1'
                        className="mt-1 block w-full rounded-md shadow-sm h-10 px-2 border border-violet-500"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="purchase_price" className="block font-medium">Price</label>
                    <input
                        type="number"
                        id="purchase_price"
                        name="purchase_price"
                        defaultValue={purchase_price}
                        placeholder="Purchase Price"
                        required min='1'
                        className="mt-1 block w-full rounded-md shadow-sm h-10 px-2 border border-violet-500"
                    />
                </div>
               
                <div className="modal-action">
                    <button className="border-b-4 text-violet-500 hover:text-white hover:bg-violet-500 px-3 py-2 rounded-lg border-violet-500">
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdatePurchase;
