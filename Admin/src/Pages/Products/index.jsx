import Button from "@mui/material/Button";
import React, { useState, useContext } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { DialogContext } from "../../App";

function Products() {
    const { openDialog } = useContext(DialogContext); // Access the dialog functions
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const categories = ["All", "Electronics", "Computers", "Accessories", "Wearables"];
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;

    const products = Array.from({ length: 20 }, (_, index) => ({
        id: index + 1,
        name: `Product ${index + 1}`,
        brand: "BrandX",
        color: "Black",
        rating: 4.5,
        reviews: 120,
        description: "High-quality product with great features.",
        category: categories[index % categories.length],
        subcategory: "SubcategoryX",
        stock: index % 2 === 0 ? "In Stock" : "Low Stock",
        price: `$${(index + 1) * 10}`,
        date: "2025-03-15",
        image: "https://via.placeholder.com/100"
    }));

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const currentProducts = filteredProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    return (
        <div className="w-[1240px] flex items-center justify-between mb-5 bg-white shadow-md px-10 p-5 ml-[300px] mr-4">
            <div className="card my-3 p-4 bg-white shadow-lg rounded-lg">
                <div className="flex items-center justify-between mb-4">
                    <div className="text-lg font-semibold text-gray-700">Product Management</div>
                    <div className="flex space-x-4">
                        <select
                            className="p-2 border rounded"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Export</button>
                        <button 
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            onClick={openDialog} // Open dialog on button click
                        >
                            Add Product
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th className="px-4 py-3"><input type="checkbox" className="w-4 h-4 text-blue-600" /></th>
                                <th className="px-6 py-3">Product Details</th>
                                <th className="px-6 py-3">Category</th>
                                <th className="px-6 py-3">Subcategory</th>
                                <th className="px-6 py-3">Stock Status</th>
                                <th className="px-6 py-3">Price</th>
                                <th className="px-6 py-3">Added Date</th>
                                <th className="px-6 py-3 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentProducts.map((product) => (
                                <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className="px-4 py-4"><input type="checkbox" className="w-4 h-4 text-blue-600" /></td>
                                    <td className="px-6 py-4 flex items-center space-x-4">
                                        <img src={product.image} alt={product.name} className="w-16 h-16 rounded-md object-cover" />
                                        <div>
                                            <a href={`/product/${product.id}`} className="text-lg font-semibold text-gray-800 hover:text-blue-500">
                                                {product.name}
                                            </a>
                                            <p className="text-sm text-gray-500">ID: {product.id} • {product.brand}</p>
                                            <p className="text-sm text-gray-600">Color: {product.color} • ⭐ {product.rating} ({product.reviews} reviews)</p>
                                            <p className="text-xs text-gray-500">{product.description}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{product.category}</td>
                                    <td className="px-6 py-4">{product.subcategory}</td>
                                    <td className={`px-6 py-4 ${product.stock === "In Stock" ? "text-green-500" : product.stock === "Low Stock" ? "text-yellow-500" : "text-red-500"}`}>
                                        {product.stock}
                                    </td>
                                    <td className="px-6 py-4">{product.price}</td>
                                    <td className="px-6 py-4">{product.date}</td>
                                    <td className="px-6 py-4 text-center flex justify-center space-x-4">
                                        <button className="text-green-500 hover:text-green-700" title="View Details"><FaEye size={18} /></button>
                                        <button className="text-blue-500 hover:text-blue-700" title="Edit"><FaEdit size={18} /></button>
                                        <button className="text-red-500 hover:text-red-700" title="Delete"><FaTrash size={18} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
                </div>
            </div>
        </div>
    );
}

export default Products;
