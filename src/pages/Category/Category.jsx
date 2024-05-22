import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import useCategory from "../../hooks/useCategory";
import { useState } from "react";
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
            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-lg text-violet-500 font-bold">
                    Categories: {filteredCategories.length}
                </h2>
                <div className="flex justify-center items-center gap-4">
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
                </div>
                <button
                    className="border-b-4 text-violet-500 hover:text-white hover:bg-violet-500 px-3 py-2 rounded-lg border-violet-500"
                    onClick={handleAddCategory}
                >
                    Add Category
                </button>
            </div>

            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="w-1/12 px-4 py-2">#</th>
                        <th className="w-2/12 px-4 py-2">Category Image</th>
                        <th className="w-3/12 px-4 py-2">Category Name</th>
                        <th className="w-3/12 px-4 py-2">Date</th>
                        <th className="w-3/12 px-4 py-2 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item, index) => (
                        <tr key={item._id} className="border-t">
                            <td className="px-8 py-2">{index + 1 + indexOfFirstItem}</td>
                            <td className="px-10 py-2">
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item.image_url} alt="Category Image" />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="pl-24 py-2">{item.name}</td>
                            <td className="pl-24 py-2">{new Date(item.start_date).toLocaleDateString()}</td>
                            <td className="px-4 py-2 text-center">
                                <div className="flex justify-center gap-2">
                                    <button className="btn btn-ghost btn-lg">
                                        <FaRegEdit className="text-violet-500" />
                                    </button>
                                    <button className="btn btn-ghost btn-lg">
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

            <AddCategoryModal show={showModal} handleClose={handleCloseModal} />
        </div>
    );
};

export default Category;
