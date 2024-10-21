import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";

const UpdateRoles = () => {
    const users = useLoaderData(); // Loaded user data
    const { email, role } = users; 
    console.log(email);
    const location = useLocation();
    const navigate = useNavigate();
    const [updatedRole, setUpdatedRole] = useState(role); // State for updated role

    const handleRoleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const newRole = form.role.value; // New role from the dropdown

        // Data to send to the backend
        const updatedData = {
            role: newRole, // New role only, as email is in the URL
        };

        // API call to update the role
        fetch(`http://localhost:8000/users/update/${email}`, {
            method: "PATCH", // Change to PATCH
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData), // Only include the role
        })
        .then((res) => res.json())
        .then((data) => {
            if (data?.modifiedCount > 0) {
                Swal.fire("Success", "User role updated successfully", "success");
                navigate(location?.state ? location.state : "/userManage"); // Navigate back to users list
            } else {
                Swal.fire("Error", "Failed to update user role", "error");
            }
        })
        .catch((error) => {
            Swal.fire("Error", "Something went wrong!", "error");
        });
    };

    return (
        <div className="max-w-md mx-auto bg-gray-100 p-5 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-5 text-center">Update User Role</h2>
            <form onSubmit={handleRoleUpdate}>
                <div className="mb-3">
                    <label htmlFor="email" className="block font-medium">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email} // Email is fixed and cannot be changed
                        disabled
                        className="mt-1 block w-full rounded-md shadow-sm h-10 px-2 border border-gray-400"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="role" className="block font-medium">Role</label>
                    <select
                        id="role"
                        name="role"
                        value={updatedRole}
                        onChange={(e) => setUpdatedRole(e.target.value)} // Update the role state
                        className="mt-1 block w-full rounded-md shadow-sm h-10 px-2 border border-violet-500"
                        required
                    >
                        <option value="admin">Admin</option>
                        <option value="editor">Editor</option>
                        <option value="user">User</option>
                    </select>
                </div>
                
                <div className="modal-action">
                    <button className="border-b-4 text-violet-500 hover:text-white hover:bg-violet-500 px-3 py-2 rounded-lg border-violet-500">
                        Update Role
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateRoles;
