import { useState } from "react";
import useUsers from "../../hooks/useUsers";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const ManageUser = () => {
    const [users, refetch] = useUsers();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const axiosSecure = useAxiosSecure();

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(users.length / itemsPerPage);

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
                axiosSecure.delete(`/users/${id}`).then(res => {
                    if (res.data.deletedCount > 0) {
                        refetch(); // Refetch after deletion
                        Swal.fire({
                            title: "Deleted!",
                            text: "User has been deleted.",
                            icon: "success"
                        });
                    }
                });
            }
        });
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="overflow-x-auto">
            <h2 className="text-lg text-violet-500 font-bold mb-4">
                Users: {users.length}
            </h2>

            <table className="table-auto w-full">
                <thead>
                    <tr className="border-t border-b">
                        <th className="text-center border-r border-l p-3">#</th>
                        <th className="text-center border-r p-3">Email</th>
                        <th className="text-center border-r p-3">Role</th>
                        <th className="text-center border-r p-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.length > 0 ? (
                        currentUsers.map((user, index) => (
                            <tr key={user._id} className="border-t border-b">
                                <td className="text-center border-r p-3">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                <td className="text-center border-r p-3">{user.email}</td>
                                <td className="text-center border-r p-3">{user.role}</td>
                                <td className="text-center border-r p-3 flex justify-around">
                                    <Link to={`/updateUsers/${user.email}`}>
                                    <button className="text-blue-500 hover:text-blue-700 mx-1">
                                        <FaRegEdit />
                                    </button>
                                    </Link>
                                    
                                    <button 
                                        className="text-red-500 hover:text-red-700 mx-1"
                                        onClick={() => handleDelete(user._id)}
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center py-4">No users found</td>
                        </tr>
                    )}
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
        </div>
    );
};

export default ManageUser;
