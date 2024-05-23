import { FaTrashAlt } from "react-icons/fa";
import useProduct from "../../hooks/useProduct";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import axios from "axios"; // For fetching categories

const Product = () => {
    const [product, refetch] = useProduct();
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("recent");

    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        product_name: "",
        image: "",
        quantity: 0,
        supplier_name: "",
        purchase_price: 0,
        sales_price: 0,
        category: ""
    });

    const [selectedCategory, setSelectedCategory] = useState(""); // Step 1


    useEffect(() => {
        // Fetch categories from the backend
        axios.get('http://localhost:8000/category')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        axiosSecure.post('/product', formData)
            .then(response => {
                refetch();
                setShowModal(false);
                Swal.fire("Success", "Product added successfully", "success");
            })
            .catch(error => {
                console.error("Error adding product:", error);
                Swal.fire("Error", "Failed to add product", "error");
            });
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setCurrentPage(1); // Reset pagination when category changes
    };


    const filteredProduct = product
        .filter((item) => item.product_name.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter((item) => selectedCategory === "" || item.category === selectedCategory)
        .sort((a, b) => {
            if (sortOrder === "recent") {
                return new Date(b.timestamp) - new Date(a.timestamp);
            } else {
                return new Date(a.timestamp) - new Date(b.timestamp);
            }
        });

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProduct.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredProduct.length / itemsPerPage);

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/product/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    };

    return (
        <div>
            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-lg text-violet-500 font-bold">
                    Products: {filteredProduct.length}
                </h2>
                <div className="flex justify-center items-center gap-4">
                    <div>
                        {/* UI Component for Category Filter */}
                        <select
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            className="border px-3 py-2 rounded-lg"
                        >
                            <option value="">All Categories</option>
                            {categories.map(category => (
                                <option key={category._id} value={category.name}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <input
                        type="text"
                        placeholder="Search by Product Name"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="border px-3 py-2 rounded-lg"
                    />
                    <select
                        value={sortOrder}
                        onChange={handleSortChange}
                        className="border px-3 py-2 rounded-lg"
                    >
                        <option value="recent">Newest</option>
                        <option value="old">Oldest</option>
                    </select>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="border-b-4 text-violet-500 hover:text-white hover:bg-violet-500 px-3 py-2 rounded-lg border-violet-500"
                >
                    Add Product
                </button>
            </div>

            <table className="table-auto w-full border-collapse">
                <thead>
                    <tr className="border-b border-t">
                        <th className="py-2 px-4 border-r border-l">#</th>
                        <th className="py-2 px-4 border-r">Product Image</th>
                        <th className="py-2 px-4 border-r">Product Name</th>
                        <th className="py-2 px-4 border-r">Category</th>
                        <th className="py-2 px-4 border-r">Quantity</th>
                        <th className="py-2 px-4 border-r">Supplier Name</th>
                        <th className="py-2 px-4 border-r">Purchase Price</th>
                        <th className="py-2 px-4 border-r">Sales Price</th>
                        <th className="py-2 px-4 border-r">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item, index) => (
                        <tr key={item._id} className="border-b">
                            <td className="py-2 px-4 border-r border-l">{index + 1 + indexOfFirstItem}</td>
                            <td className="py-2 px-4 border-r">
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item.image} alt="Product Image" />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="py-2 px-4 border-r">{item.product_name}</td>
                            <td className="py-2 px-4 border-r">{item.category}</td>
                            <td className="py-2 px-4 border-r">{item.quantity}</td>
                            <td className="py-2 px-4 border-r">{item.supplier_name}</td>
                            <td className="py-2 px-4 border-r">${item.purchase_price}</td>
                            <td className="py-2 px-4 border-r">${item.sales_price}</td>
                            <td className="py-2 px-4 border-r">
                                <div className="flex justify-center gap-2">
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="btn btn-ghost btn-lg">
                                        <FaTrashAlt className="text-red-600" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`mx-1 px-3 py-1 border ${currentPage === index + 1 ? 'bg-violet-500 text-white' : 'bg-white text-violet-500'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative transition-transform transform-gpu">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl mb-4 text-violet-500 font-semibold text-center">Add New Product</h2>
                        <form onSubmit={handleFormSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="product_name" className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                                <input
                                    type="text"
                                    name="product_name"
                                    placeholder="Product Name"
                                    value={formData.product_name}
                                    onChange={handleInputChange}
                                    className="input-field w-full px-1 py-1 border rounded-lg border-violet-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                <input
                                    type="text"
                                    name="image"
                                    placeholder="Image URL"
                                    value={formData.image}
                                    onChange={handleInputChange}
                                    className="input-field w-full px-1 py-1 border rounded-lg border-violet-500"
                                />
                            </div>
                            <div className="flex justify-between space-x-4">
                                <div className="w-1/2">
                                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        placeholder="Quantity"
                                        value={formData.quantity}
                                        onChange={handleInputChange}
                                        className="input-field px-1 py-1 rounded-lg border border-violet-500"
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label htmlFor="supplier_name" className="block text-sm font-medium text-gray-700 mb-1">Supplier Name</label>
                                    <input
                                        type="text"
                                        name="supplier_name"
                                        placeholder="Supplier Name"
                                        value={formData.supplier_name}
                                        onChange={handleInputChange}
                                        className="input-field px-1 py-1 border rounded-lg border-violet-500"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between space-x-4">
                                <div className="w-1/2">
                                    <label htmlFor="purchase_price" className="block text-sm font-medium text-gray-700 mb-1">Purchase Price ($)</label>
                                    <input
                                        type="number"
                                        name="purchase_price"
                                        placeholder="Purchase Price"
                                        value={formData.purchase_price}
                                        onChange={handleInputChange}
                                        className="input-field px-1 py-1 rounded-lg border border-violet-500"
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label htmlFor="sales_price" className="block text-sm font-medium text-gray-700 mb-1">Sales Price ($)</label>
                                    <input
                                        type="number"
                                        name="sales_price"
                                        placeholder="Sales Price"
                                        value={formData.sales_price}
                                        onChange={handleInputChange}
                                        className="input-field px-1 py-1 border border-violet-500 rounded-lg"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="input-field w-full px-1 py-1 border border-violet-500 rounded-lg"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(category => (
                                        <option key={category._id} value={category.name}>{category.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="btn border-b-4 text-violet-500 border-violet-500 hover:bg-violet-500 hover:text-white "
                                >
                                    Add Product
                                </button>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="btn border-b-4 text-violet-500 border-red-500 hover:bg-red-500 hover:text-white  ml-2"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


        </div>
    );
};

export default Product;
