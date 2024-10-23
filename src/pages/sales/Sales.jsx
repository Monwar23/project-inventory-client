import { useState } from "react";
import useSales from "../../hooks/useSales"; // Hook for sales data
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import useCategory from "../../hooks/useCategory";
import useProduct from "../../hooks/useProduct";
import { Link } from "react-router-dom";

const Sales = () => {
    const [sales, refetch] = useSales(); // Fetch sales data
    const [category] = useCategory(); // Fetch categories
    const [products] = useProduct(); // Fetch products
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("recent");
    const axiosSecure = useAxiosSecure();
    const [showModal, setShowModal] = useState(false);
    const [newSalesData, setNewSalesData] = useState({
        customer_name: "",
        category: "",
        product_name: "",
        price: 0,
        quantity: 0,
    });

    const [filteredProducts, setFilteredProducts] = useState([]);

    // Pagination and Sorting Logic
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    const filteredSales = sales
        .filter((item) => item.customer_name.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => {
            if (sortOrder === "recent") {
                return new Date(b.timestamp) - new Date(a.timestamp);
            } else {
                return new Date(a.timestamp) - new Date(b.timestamp);
            }
        });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredSales.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredSales.length / itemsPerPage);

    // Delete Functionality
    const handleDelete = (id) => {
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
                axiosSecure.delete(`/sales/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch(); // Refetch after delete
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };

    // Open and Close Modal for Adding Sales
    const handleAddSales = () => {
        setShowModal(true);
        setNewSalesData({
            customer_name: "",
            category: "",
            product_name: "",
            price: 0,
            quantity: 0,
        });
        setFilteredProducts([]);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    // Handling input and submission of the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSalesData({
            ...newSalesData,
            [name]: value
        });

        // Filter products based on the selected category
        if (name === "category") {
            const filtered = products.filter(product => product.category === value);
            setFilteredProducts(filtered);
            setNewSalesData(prev => ({
                ...prev,
                product_name: "", // Reset product when category changes
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedProduct = products.find(prod => prod.product_name === newSalesData.product_name);
        if (selectedProduct && newSalesData.quantity > selectedProduct.quantity) {
            Swal.fire("Error", "Sales quantity exceeds available product quantity", "error");
            return; // Exit the function if the check fails
        }
        axiosSecure.post('/sales', newSalesData)
            .then(response => {
                refetch(); // Refetch after adding new sales
                setShowModal(false);
                Swal.fire("Success", "Sales item added successfully", "success");
            })
            .catch(error => {
                console.error("Error adding sales:", error);
                Swal.fire("Error", "Failed to add sales", "error");
            });
    };

    return (
        <div className="overflow-x-auto">
            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-lg text-violet-500 font-bold">
                    Sales: {filteredSales.length}
                </h2>
                <div className="space-x-2 space-y-2 ml-3 justify-center items-center gap-4">
                    <input
                        type="text"
                        placeholder="Search by Customer name"
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
                    className="border-b-4 text-violet-500 hover:text-white hover:bg-violet-500 px-3 py-2 rounded-lg border-violet-500"
                    onClick={handleAddSales}
                >
                    Add Sales
                </button>
            </div>

            <table className="table-auto w-full">
                <thead>
                    <tr className="border-t border-b">
                        <th className="text-center border-r border-l p-3">#</th>
                        <th className="text-center border-r p-3">Date</th>
                        <th className="text-center border-r p-3">Customer Name</th>
                        <th className="text-center border-r p-3">Category</th>
                        <th className="text-center border-r p-3">Product Name</th>
                        <th className="text-center border-r p-3">Quantity</th>
                        <th className="text-center border-r p-3">Price</th>
                        <th className="text-center border-r p-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((sale, index) => (
                        <tr key={sale._id} className="border-t border-b">
                            <td className="text-center border-r p-3">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                            <td className="text-center border-r p-3">{new Date(sale.timestamp).toLocaleDateString()}</td>
                            <td className="text-center border-r p-3">{sale.customer_name}</td>
                            <td className="text-center border-r p-3">{sale.category}</td>
                            <td className="text-center border-r p-3">{sale.product_name}</td>
                            <td className="text-center border-r p-3">{sale.quantity} * ${sale.price}</td>
                            <td className="text-center border-r p-3">${sale.total_price}</td>
                            <td className="text-center border-r p-3">
                                <Link to={`/updateSales/${sale._id}`}>
                                <button className="text-blue-500 hover:text-blue-700 mx-1">
                                    <FaRegEdit />
                                </button>
                                </Link>
                                
                                <button 
                                    className="text-red-500 hover:text-red-700 mx-1" 
                                    onClick={() => handleDelete(sale._id)}>
                                    <FaTrashAlt />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`mx-1 px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-violet-500 text-white' : 'bg-white text-violet-500 border-violet-500'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {/* Modal for Adding Sales */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h3 className="text-lg font-bold mb-4 text-center">Add New Sales</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="customer_name" className="block">Customer Name</label>
                                <input
                                    type="text"
                                    id="customer_name"
                                    name="customer_name"
                                    value={newSalesData.customer_name}
                                    onChange={handleInputChange}
                                    className="border px-3 py-2 rounded-lg w-full"
                                    required
                                />
                            </div>
                            <div className="flex gap-5">
                            <div className="mb-4">
                                <label htmlFor="category" className="block">Category</label>
                                <select
                                    id="category"
                                    name="category"
                                    value={newSalesData.category}
                                    onChange={handleInputChange}
                                    className="border px-3 py-2 rounded-lg w-full"
                                    required
                                >
                                    <option value="">Select a category</option>
                                    {category.map(cat => (
                                        <option key={cat._id} value={cat.name}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="product_name" className="block">Product Name</label>
                                <select
                                    id="product_name"
                                    name="product_name"
                                    value={newSalesData.product_name}
                                    onChange={handleInputChange}
                                    className="border px-3 py-2 rounded-lg w-full"
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
                            </div>
                            <div className="mb-4">
                                <label htmlFor="quantity" className="block">Quantity</label>
                                <input
                                    type="number"
                                    id="quantity"
                                    name="quantity"
                                    value={newSalesData.quantity}
                                    onChange={handleInputChange}
                                    className="border px-3 py-2 rounded-lg w-full"
                                    required
                                     min='1'
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="price" className="block">Unit Price</label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={newSalesData.sales_price}
                                    onChange={handleInputChange}
                                    className="border px-3 py-2 rounded-lg w-full"
                                    required
                                    min='1'
                                />
                            </div>
                           
                            <div className="flex justify-end gap-2">
                            <button
                                    type="submit"
                                    className="bg-violet-500 text-white px-4 py-2 rounded-lg"
                                >
                                    Add Sales
                                </button>
                                <button
                                    type="button"
                                    onClick={handleModalClose}
                                    className="bg-gray-400 text-white px-4 py-2 rounded-lg "
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

export default Sales;
