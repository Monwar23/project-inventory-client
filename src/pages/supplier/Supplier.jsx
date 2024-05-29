import { FaTrashAlt } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import useSupplier from "../../hooks/useSupplier";
import Swal from "sweetalert2";

const Supplier = () => {

    const [supplier, refetch] = useSupplier()
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("recent");
    const axiosSecure = useAxiosSecure();
    const [showModal, setShowModal] = useState(false);
    const [newSupplierData, setNewSupplierData] = useState({
        supplier_name: "",
        phone: "",
        email: "",
        date: ""
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

    const filteredSupplier = supplier
        .filter((item) => item.supplier_name.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => {
            if (sortOrder === "recent") {
                return new Date(b.time_added) - new Date(a.time_added);
            } else {
                return new Date(a.time_added) - new Date(b.time_added);
            }
        });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredSupplier.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredSupplier.length / itemsPerPage);

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
                axiosSecure.delete(`/supplier/${id}`)
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

    const handleAddSupplier = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSupplierData({
            ...newSupplierData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosSecure.post('/supplier', newSupplierData)
            .then(response => {
                refetch();
                setShowModal(false);
                Swal.fire("Success", "Supplier added successfully", "success");
                setNewSupplierData({
                    supplier_name: "",
                    phone: "",
                    email: "",
                    date: ""
                });
            })
            .catch(error => {
                console.error("Error adding Supplier:", error);
                Swal.fire("Error", "Failed to add Supplier", "error");
            });
    };

    return (
        <div className="overflow-x-auto">

            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-lg text-violet-500 font-bold">
                    Supplier: {filteredSupplier.length}
                </h2>
                <div className="lg:flex space-y-2 ml-3 justify-center items-center gap-4">
                    <input
                        type="text"
                        placeholder="Search by category name"
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
                    {/* <button
                        className="border-b-4 hover:text-violet-500 px-3 py-2 rounded-lg "
                        onClick={() => setShowDateRangeModal(true)}
                    >
                        <FaFilePdf />
                    </button> */}
                </div>
                <button
                    className="border-b-4 text-violet-500 hover:text-white hover:bg-violet-500 px-3 py-2 rounded-lg border-violet-500"
                    onClick={handleAddSupplier}
                >
                    Add Supplier
                </button>
            </div>

            <table className="table-auto w-full">
                <thead>
                    <tr className="border-t border-b">
                        <th className="text-center border-r border-l p-3">#</th>
                        <th className="text-center border-r p-3">Supplier Name</th>
                        <th className="text-center border-r p-3">Supplier Phone</th>
                        <th className="text-center border-r p-3">Supplier Email</th>
                        <th className="text-center border-r p-3">Date</th>
                        <th className="text-center border-r p-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item, index) => (
                        <tr key={item._id} className=" border-b ">
                            <td className="text-center px-4 py-2 border-r border-l">{index + 1 + indexOfFirstItem}</td>
                            <td className="text-center px-4 py-2 border-r">{item.supplier_name}</td>
                            <td className="text-center px-4 py-2 border-r">{item.phone}</td>
                            <td className="text-center px-4 py-2 border-r">{item.email}</td>
                            <td className="text-center px-4 py-2 border-r">{new Date(item.time_added).toLocaleDateString()}</td>
                            <td className="text-center px-4 py-2 border-r">
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
                <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-lg font-bold mb-4">Add New Supplier</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="supplier_name" className="block mb-1">Supplier Name:</label>
                                <input type="text" id="supplier_name" name="supplier_name" value={newSupplierData.supplier_name} onChange={handleInputChange} className="border px-3 py-2 rounded-lg w-full" required/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone" className="block mb-1">Phone:</label>
                                <input type="text" id="phone" name="phone" value={newSupplierData.phone} onChange={handleInputChange} className="border px-3 py-2 rounded-lg w-full" required/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block mb-1">Email:</label>
                                <input type="email" id="email" name="email" value={newSupplierData.email} onChange={handleInputChange} className="border px-3 py-2 rounded-lg w-full" required/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="date" className="block mb-1">Date:</label>
                                <input type="date" id="date" name="date" value={newSupplierData.date} onChange={handleInputChange} className="border px-3 py-2 rounded-lg w-full" required/>
                            </div>
                            <div className="flex justify-end">
                                <button type="button" onClick={handleModalClose} className="mr-2 px-4 py-2 border rounded-lg">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Supplier;