import Button from "@mui/material/Button";
import React, { useState, useContext } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { DialogContext } from "../../App";

function Users() {
    const { openDialog } = useContext(DialogContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 6;

    const users = Array.from({ length: 20 }, (_, index) => ({
        id: index + 1,
        name: `User ${index + 1}`,
        email: `user${index + 1}@example.com`,
        role: index % 2 === 0 ? "Admin" : "Customer",
        status: index % 2 === 0 ? "Active" : "Inactive",
        dateJoined: "2025-03-15",
        avatar: "https://via.placeholder.com/100"
    }));

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const currentUsers = filteredUsers.slice(
        (currentPage - 1) * usersPerPage,
        currentPage * usersPerPage
    );

    return (
        <section className="max-w-6xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-10 border border-gray-200 w-full">
            <div className="flex flex-col md:flex-row justify-between items-center mb-5 px-4">
                <h2 className="text-lg font-semibold text-gray-700">User Management</h2>
                <button 
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={openDialog}
                >
                    Add User
                </button>
            </div>

            <div className="mb-4 px-4">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th className="px-4 py-3">#</th>
                            <th className="px-6 py-3">User Details</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3 hidden md:table-cell">Role</th>
                            <th className="px-6 py-3 hidden md:table-cell">Status</th>
                            <th className="px-6 py-3 hidden lg:table-cell">Date Joined</th>
                            <th className="px-6 py-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((user) => (
                            <tr key={user.id} className="bg-white border-b">
                                <td className="px-4 py-4">{user.id}</td>
                                <td className="px-6 py-4 flex items-center space-x-4">
                                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                                    <div>
                                        <span className="text-lg font-semibold text-gray-800">{user.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4 hidden md:table-cell">{user.role}</td>
                                <td className={`px-6 py-4 hidden md:table-cell ${user.status === "Active" ? "text-green-500" : "text-red-500"}`}>{user.status}</td>
                                <td className="px-6 py-4 hidden lg:table-cell">{user.dateJoined}</td>
                                <td className="px-6 py-4 text-center flex justify-center space-x-2">
                                    <button className="text-green-500 hover:text-green-700" title="View Details"><FaEye size={16} /></button>
                                    <button className="text-blue-500 hover:text-blue-700" title="Edit"><FaEdit size={16} /></button>
                                    <button className="text-red-500 hover:text-red-700" title="Delete"><FaTrash size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-4 space-x-2">
                <button 
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="px-3 py-1">Page {currentPage} of {totalPages}</span>
                <button 
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </section>
    );
}

export default Users;
