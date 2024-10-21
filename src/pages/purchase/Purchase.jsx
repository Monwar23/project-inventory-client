import { useState } from "react";
import usePurchase from "../../hooks/usePurchase";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import useCategory from "../../hooks/useCategory";
import useSupplier from "../../hooks/useSupplier";
import axios from "axios";
import { Link } from "react-router-dom";

const Purchase = () => {
    const [purchase, refetch] = usePurchase();
    const [category] = useCategory();
    const [supplier] = useSupplier();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("recent");
    const axiosSecure = useAxiosSecure();
    const [showModal, setShowModal] = useState(false);
    const [newPurchaseData, setNewPurchaseData] = useState({
        supplier_name: "",
        category: "",
        product_name: "",
        image: "",
        purchase_price: 0,
        sales_price: 0,
        quantity: 0,
    });

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

    const filteredPurchase = purchase
        .filter((item) => item?.supplier_name?.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => {
            if (sortOrder === "recent") {
                return new Date(b.timestamp) - new Date(a.timestamp);
            } else {
                return new Date(a.timestamp) - new Date(b.timestamp);
            }
        });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredPurchase.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredPurchase.length / itemsPerPage);

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
                axiosSecure.delete(`/purchase/${id}`)
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

    const handleAddPurchase = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPurchaseData({
            ...newPurchaseData,
            [name]: value
        });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        const apiKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;

        axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData)
            .then(response => {
                setNewPurchaseData(prevState => ({
                    ...prevState,
                    image: response.data.data.url
                }));
            })
            .catch(error => {
                console.error("Error uploading image:", error);
                Swal.fire("Error", "Failed to upload image", "error");
            });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axiosSecure.post('/purchase', newPurchaseData)
            .then(response => {
                refetch();
                setShowModal(false);
                Swal.fire("Success", "Purchase item added successfully", "success");
                setNewPurchaseData({
                    supplier_name: "",
                    category: "",
                    product_name: "",
                    image: "",
                    purchase_price: 0,
                    sales_price: 0,
                    quantity: 0,
                });
            })
            .catch(error => {
                console.error("Error adding purchase:", error);
                Swal.fire("Error", "Failed to add purchase", "error");
            });
    };

    return (
        <div className="overflow-x-auto">
            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-lg text-violet-500 font-bold">
                    Purchase: {filteredPurchase.length}
                </h2>
                <div className="space-x-2 space-y-2 ml-3 justify-center items-center gap-4">
                    <input
                        type="text"
                        placeholder="Search by Supplier name"
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
                    onClick={handleAddPurchase}
                >
                    Add Purchase
                </button>
            </div>

            <table className="table-auto w-full">
                <thead>
                    <tr className="border-t border-b">
                        <th className="text-center border-r border-l p-3">#</th>
                        <th className="text-center border-r p-3">Date</th>
                        <th className="text-center border-r p-3">Image</th>
                        <th className="text-center border-r p-3">Supplier Name</th>
                        <th className="text-center border-r p-3">Product Name</th>
                        <th className="text-center border-r p-3">Quantity</th>
                        <th className="text-center border-r p-3">Purchase Price</th>
                        <th className="text-center border-r p-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item, index) => (
                        <tr key={item._id} className="border-b">
                            <td className="text-center px-4 py-2 border-r border-l">{index + 1 + indexOfFirstItem}</td>
                            <td className="text-center px-4 py-2 border-r">{new Date(item.timestamp).toLocaleDateString()}</td>
                            <td className="text-center px-4 py-2 border-r"><div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item.image} alt="Product Image" />
                                        </div>
                                    </div>
                                </div></td>
                            <td className="text-center px-4 py-2 border-r">{item.supplier_name}</td>
                            <td className="text-center px-4 py-2 border-r">{item.product_name}</td>
                            <td className="text-center px-4 py-2 border-r">{item.quantity}</td>
                            <td className="text-center px-4 py-2 border-r">${item.purchase_price * item.quantity}</td>
                            <td className="text-center px-4 py-2 border-r">
                                <div className="flex justify-center gap-2">
                                <Link to={`/updatePurchase/${item._id}`}>
                                   <button
                                        className="btn btn-ghost btn-lg">
                                        <FaRegEdit className="text-red-600" />
                                    </button>
                                   </Link>
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
                <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-lg font-bold mb-4 text-center">Add New Purchase</h2>
                        <form onSubmit={handleSubmit}>
                         
                          <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Supplier Name
                                </label>
                                <select
                                    name="supplier_name"
                                    value={newPurchaseData.supplier_name}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border px-3 py-2 rounded-lg"
                                    required
                                >
                                    <option value="">Select Supplier</option>
                                    {supplier.map(supply => (
                                        <option key={supply._id} value={supply.supplier_name}>{supply.supplier_name}</option>
                                    ))}
                                </select>
                            </div>
                           <div className="flex gap-x-2">
                           <div className="mb-4 flex-grow">
                                <label className="block text-sm font-medium text-gray-700">
                                    Category
                                </label>
                                <select
                                    name="category"
                                    value={newPurchaseData.category}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border px-3 py-2 rounded-lg"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {category.map(cat => (
                                        <option key={cat._id} value={cat.name}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4 flex-grow">
                                <label className="block text-sm font-medium text-gray-700">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    name="product_name"
                                    value={newPurchaseData.product_name}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border px-3 py-2 rounded-lg"
                                    required
                                />
                            </div>
                           </div>
                           <div className="flex gap-x-2">
                           <div className="mb-4 flex-grow">
                                <label className="block text-sm font-medium text-gray-700">
                                    Purchase Price
                                </label>
                                <input
                                    type="number"
                                    name="purchase_price"
                                    value={newPurchaseData.purchase_price}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border px-3 py-2 rounded-lg"
                                    required min='1'
                                />
                            </div>
                            <div className="mb-4 flex-grow">
                                <label className="block text-sm font-medium text-gray-700">
                                    Sales Price
                                </label>
                                <input
                                    type="number"
                                    name="sales_price"
                                    value={newPurchaseData.sales_price}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border px-3 py-2 rounded-lg"
                                    required min='1'
                                />
                            </div>
                           </div>
                           <div className="flex gap-x-2">
                           <div className="mb-4 flex-grow">
                                <label className="block text-sm font-medium text-gray-700">
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={newPurchaseData.quantity}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border px-3 py-2 rounded-lg"
                                    required min='1'
                                />
                            </div>
                          
                           </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Image
                                </label>
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleImageUpload}
                                    className="mt-1 block w-full border px-3 py-2 rounded-lg"
                                />
                            </div>
                            {newPurchaseData.image && (
                                <div className="mb-4">
                                    <img src={newPurchaseData.image} alt="Product" className="h-20 w-20 object-cover" />
                                </div>
                            )}
                            <div className="flex justify-end gap-3">
                               
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-violet-500 text-white rounded-lg"
                                >
                                    Add Purchase
                                </button>
                                <button
                                    type="button"
                                    className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
                                    onClick={handleModalClose}
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

export default Purchase;
