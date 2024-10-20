import { FaFilePdf, FaRegEdit, FaTrashAlt } from "react-icons/fa";
import useProduct from "../../hooks/useProduct";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import axios from "axios";
import { pdf } from "@react-pdf/renderer";
import ProductPDFDocument from "../../components/ProductPDFDocument";
import { saveAs } from 'file-saver';
import useSupplier from "../../hooks/useSupplier";
import { Link } from "react-router-dom";


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
    const [selectedCategory, setSelectedCategory] = useState("");
    const [supplier] = useSupplier()
    // const [supplierName, setSupplierName] = useState("");


    useEffect(() => {
        axios.get('http://localhost:8000/category')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
            });
    }, []);

    const handleDownload = async () => {
        const blob = await pdf(<ProductPDFDocument products={product} />).toBlob();
        saveAs(blob, 'products.pdf');
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        const apiKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;

        axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData)
            .then(response => {
                setFormData(prevState => ({
                    ...prevState,
                    image: response.data.data.url
                }));
            })
            .catch(error => {
                console.error("Error uploading image:", error);
                Swal.fire("Error", "Failed to upload image", "error");
            });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        axiosSecure.post('/product', formData)
            .then(response => {
                refetch();
                setShowModal(false);
                Swal.fire("Success", "Product added successfully", "success");
                setFormData({
                    product_name: "",
                    image: "",
                    quantity: 0,
                    supplier_name: "",
                    purchase_price: 0,
                    sales_price: 0,
                    category: ""
                });
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
        setCurrentPage(1);
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
                    <div className="flex justify-center gap-4">
                        {/* Button for PDF download */}
                        <button
                            onClick={handleDownload}
                            className="border-b-4 hover:text-violet-500 px-3 py-2 rounded-lg "
                        >
                            <FaFilePdf />
                        </button>
                    </div>
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
                                   <Link to={`/updateProduct/${item._id}`}>
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
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
                        <h2 className="text-lg font-bold mb-4 text-center">Add Product</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    name="product_name"
                                    value={formData.product_name}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border px-3 py-2 rounded-lg" required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Image
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="mt-1 block w-full border px-3 py-2 rounded-lg" required
                                />
                            </div>
                            <div className="flex gap-x-3">
                                <div className="mb-4 flex-grow">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Quantity
                                    </label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border px-3 py-2 rounded-lg" required min='1'
                                    />
                                </div>
                                <div className="mb-4 flex-grow">
                                <label className="block text-sm font-medium text-gray-700">
                                        Supplier 
                                    </label>
                                    <select
                                        name="supplier_name"
                                        value={formData.supplier_name}
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
                            </div>


                            <div className="flex gap-x-3">
                                <div className="mb-4 flex-grow">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Purchase Price
                                    </label>
                                    <input
                                        type="number"
                                        name="purchase_price"
                                        value={formData.purchase_price}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border px-3 py-2 rounded-lg" required min='1'
                                    />
                                </div>
                                <div className="mb-4 flex-grow">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Sales Price
                                    </label>
                                    <input
                                        type="number"
                                        name="sales_price"
                                        value={formData.sales_price}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border px-3 py-2 rounded-lg" required min='1'
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Category
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border px-3 py-2 rounded-lg" required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(category => (
                                        <option key={category._id} value={category.name}>{category.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-end gap-4">

                                <button
                                    type="submit"
                                    className="bg-violet-500 text-white px-4 py-2 rounded-lg"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="border px-4 py-2 rounded-lg"
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
