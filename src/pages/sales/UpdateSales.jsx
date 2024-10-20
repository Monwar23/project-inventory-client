import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import useCategory from "../../hooks/useCategory"; // Ensure you have this hook
import useProduct from "../../hooks/useProduct"; // Ensure you have this hook

const UpdateSales = () => {
    const sales = useLoaderData();
    const location = useLocation();
    const navigate = useNavigate();
    const [categories] = useCategory(); // Fetch categories
    const [products] = useProduct(); // Fetch products
    const [filteredProducts, setFilteredProducts] = useState([]);
    
    const {
        _id, customer_name, customer_phone, product_name,
        category, quantity, price,
    } = sales;

    useEffect(() => {
        // Filter products when category changes or component mounts
        const filtered = products.filter(prod => prod.category === category);
        setFilteredProducts(filtered);
    }, [category, products]);

    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const customer_name = form.customer_name.value;
        const customer_phone = form.customer_phone.value;
        const product_name = form.product_name.value;
        const category = form.category.value;
        const quantity = form.quantity.value;
        const price = form.price.value;

        const salesData = {
            customer_name, customer_phone, product_name, 
            category, quantity, price
        };

        fetch(`http://localhost:8000/sales/${_id}`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(salesData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data?.modifiedCount > 0) {
                    Swal.fire("Success", "Sales updated successfully", "success");
                    navigate(location?.state ? location.state : "/sales");
                }
            });
    };

    return (
        <div className="max-w-2xl mx-auto bg-gray-100 p-5 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-5 text-center">Update Sales</h2>
            <form onSubmit={handleUpdate}>
                <div className="mb-3">
                    <label htmlFor="customer_name" className="block font-medium">Customer Name</label>
                    <input
                        type="text"
                        id="customer_name"
                        name="customer_name"
                        defaultValue={customer_name}
                        placeholder="Customer Name"
                        required
                        className="mt-1 block w-full rounded-md shadow-sm h-10 px-2 border border-violet-500"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="customer_phone" className="block font-medium">Customer Phone</label>
                    <input
                        type="tel"
                        id="customer_phone"
                        name="customer_phone"
                        defaultValue={customer_phone}
                        placeholder="Customer Phone"
                        required
                        className="mt-1 block w-full rounded-md shadow-sm h-10 px-2 border border-violet-500"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="block font-medium">Category</label>
                    <select
                        id="category"
                        name="category"
                        defaultValue={category} // Set default value
                        className="mt-1 block w-full rounded-md shadow-sm h-10 px-2 border border-violet-500"
                        required
                        onChange={(e) => {
                            const selectedCategory = e.target.value;
                            const filtered = products.filter(prod => prod.category === selectedCategory);
                            setFilteredProducts(filtered);
                        }}
                    >
                        <option value="">Select a category</option>
                        {categories.map(cat => (
                            <option key={cat._id} value={cat.name}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="product_name" className="block font-medium">Product Name</label>
                    <select
                        id="product_name"
                        name="product_name"
                        defaultValue={product_name} // Set default value
                        className="mt-1 block w-full rounded-md shadow-sm h-10 px-2 border border-violet-500"
                        required
                    >
                        <option value="">Select a product</option>
                        {filteredProducts.map(prod => (
                            <option key={prod._id} value={prod.product_name}>
                                {prod.product_name}
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
                    <label htmlFor="price" className="block font-medium">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        defaultValue={price}
                        placeholder="Price"
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

export default UpdateSales;
