import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import useCategory from "../../hooks/useCategory";
import { useState, useEffect } from "react";
import AddCategoryModal from "./AddCategoryModal";

const Category = () => {
    const [category] = useCategory();
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("recent");
    const itemsPerPage = 10;

    const handleAddCategory = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to the first page on new search
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    // Filter and sort categories
    const filteredCategories = category
        .filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => {
            if (sortOrder === "recent") {
                return new Date(b.start_date) - new Date(a.start_date);
            } else {
                return new Date(a.start_date) - new Date(b.start_date);
            }
        });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

    return (
        <div className="overflow-x-auto">
            <div className="mb-6">
            <h2 className="text-lg text-violet-500  font-bold w-full">
                    Categories : {filteredCategories.length}
                </h2>
                <button
                    className="border-b-4 mt-3 text-violet-500 hover:text-white hover:bg-violet-500 px-3 py-2 rounded-lg border-violet-500"
                    onClick={handleAddCategory}
                >
                    Add Category
                </button>
                
            </div>

            <div className="flex justify-center gap-4 items-center mb-6">
                <input
                    type="text"
                    placeholder="Search by category name"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="border px-3 py-2 rounded-lg"
                />
                <select value={sortOrder} onChange={handleSortChange} className="border px-3 py-2 rounded-lg">
                    <option value="recent">Newest</option>
                    <option value="old">Oldest</option>
                </select>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Category Image</th>
                        <th>Category Name</th>
                        <th>Date</th>
                        <th className="pl-10">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item, index) => (
                        <tr key={item._id}>
                            <th>{index + 1 + indexOfFirstItem}</th>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item.image_url} alt="Category Image" />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>{item.name}</td>
                            <td>{new Date(item.start_date).toLocaleDateString()}</td>
                            <th>
                                <div>
                                    <button className="btn btn-ghost btn-lg">
                                        <FaRegEdit className="text-violet-500" />
                                    </button>
                                    <button className="btn btn-ghost btn-lg">
                                        <FaTrashAlt className="text-red-600" />
                                    </button>
                                </div>
                            </th>
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

            <AddCategoryModal show={showModal} handleClose={handleCloseModal} />
        </div>
    );
};

export default Category;
