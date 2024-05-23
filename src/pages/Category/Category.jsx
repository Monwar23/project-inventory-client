import { FaFilePdf, FaTrashAlt } from "react-icons/fa";
import useCategory from "../../hooks/useCategory";
import { useState } from "react";
import AddCategoryModal from "./AddCategoryModal";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import CategoryPDFDocument from "../../components/CategoryPDFDocument";
import DateRangeModal from "../../components/DateRangeModal";

const Category = () => {
    const [category, refetch] = useCategory();
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("recent");
    const [showDateRangeModal, setShowDateRangeModal] = useState(false);
    const itemsPerPage = 10;
    const axiosSecure = useAxiosSecure();

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
        setCurrentPage(1);
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

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
                axiosSecure.delete(`/category/${id}`)
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

    const handleDownload = async (startDate, endDate) => {
        const filteredForPDF = category
            .filter((item) => {
                const itemDate = new Date(item.start_date);
                return itemDate >= startDate && itemDate <= endDate;
            });

        const blob = await pdf(<CategoryPDFDocument categories={filteredForPDF} />).toBlob();
        saveAs(blob, 'categories.pdf');
    };

    return (
        <div className="overflow-x-auto">
            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-lg text-violet-500 font-bold">
                    Categories: {filteredCategories.length}
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
                    <button
                        className="border-b-4 hover:text-violet-500 px-3 py-2 rounded-lg "
                        onClick={() => setShowDateRangeModal(true)}
                    >
                        <FaFilePdf />
                    </button>
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
                    <tr className="border-t border-b">
                        <th className="text-center border-r border-l p-3">#</th>
                        <th className="text-center border-r p-3">Category Image</th>
                        <th className="text-center border-r p-3">Category Name</th>
                        <th className="text-center border-r p-3">Date</th>
                        <th className="text-center border-r p-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item, index) => (
                        <tr key={item._id} className=" border-b ">
                            <td className="text-center px-4 py-2 border-r border-l">{index + 1 + indexOfFirstItem}</td>
                            <td className="text-center px-4 py-2 border-r">
                                <div className="flex items-center justify-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item.image_url} alt="Category Image" />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="text-center px-4 py-2 border-r">{item.name}</td>
                            <td className="text-center px-4 py-2 border-r">{new Date(item.start_date).toLocaleDateString()}</td>
                            <td className="text-center px-4 py-2 border-r">
                                <div className="flex justify-center gap-2">
                                    <button onClick={() => handleDelete(item._id)} className="btn btn-ghost btn-lg">
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
            <DateRangeModal
                show={showDateRangeModal}
                handleClose={() => setShowDateRangeModal(false)}
                handleDownload={handleDownload}
            />
        </div>
    );
};

export default Category;
