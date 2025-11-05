import React, { useState ,useContext} from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Button from "@mui/material/Button";
import { DialogContext } from "../../App";
import AddCategory from "../../Components/Category/Addcategory";

function SubCategory() {
    const [subCategories, setSubCategories] = useState([
        { id: 1, name: "Smartphones", category: "Electronics", image: "https://via.placeholder.com/50" },
        { id: 2, name: "Laptops", category: "Computers", image: "https://via.placeholder.com/50" },
        { id: 3, name: "Keyboards", category: "Accessories", image: "https://via.placeholder.com/50" },
        { id: 4, name: "Smartwatches", category: "Wearables", image: "https://via.placeholder.com/50" },
        { id: 5, name: "Microwave Ovens", category: "Home Appliances", image: "https://via.placeholder.com/50" },
        { id: 6, name: "Sofas", category: "Furniture", image: "https://via.placeholder.com/50" },
        { id: 7, name: "Novels", category: "Books", image: "https://via.placeholder.com/50" },
        { id: 8, name: "T-Shirts", category: "Clothing", image: "https://via.placeholder.com/50" }
    ]);
    const { openDialog } = useContext(DialogContext);

    return (
        <div className="w-[1240px] flex items-center justify-between mb-5 bg-white shadow-md px-10 p-5 ml-[300px] mr-4">
            <div className="card my-3 p-4 bg-white shadow-lg rounded-lg w-full">
                <div className="flex items-center justify-between mb-4">
                    <div className="text-lg font-semibold text-gray-700">Subcategory Management</div>
                    <Button variant="contained" color="primary"
                    
                    onClick={() => openDialog(<AddCategory/>)}
                    >Add Subcategory</Button>
                </div>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-3">Image</th>
                                <th className="px-6 py-3">Image URL</th>
                                <th className="px-6 py-3">Subcategory Name</th>
                                <th className="px-6 py-3">Category</th>
                                <th className="px-6 py-3 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subCategories.map((subCategory) => (
                                <tr key={subCategory.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className="px-6 py-4">{subCategory.id}</td>
                                    <td className="px-6 py-4">
                                        <img src={subCategory.image} alt={subCategory.name} className="w-12 h-12 rounded-md object-cover" />
                                    </td>
                                    <td className="px-6 py-4">{subCategory.image}</td>
                                    <td className="px-6 py-4">{subCategory.name}</td>
                                    <td className="px-6 py-4">{subCategory.category}</td>
                                    <td className="px-6 py-4 text-center flex justify-center space-x-4">
                                        <button className="text-blue-500 hover:text-blue-700" title="Edit"><FaEdit size={18} /></button>
                                        <button className="text-red-500 hover:text-red-700" title="Delete"><FaTrash size={18} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default SubCategory;
