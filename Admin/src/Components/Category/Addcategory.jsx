import React, { useState } from "react";
import Button from "@mui/material/Button";

function AddCategory() {
    const [categoryName, setCategoryName] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("New Category:", { categoryName, imageUrl });
        setCategoryName("");
        setImageUrl("");
    };

    return (
        <div className="w-[1240px] flex flex-col items-center bg-white shadow-md px-10 p-5 ml-[300px] mr-4">
            <div className="card my-3 p-4 bg-white shadow-lg rounded-lg w-full max-w-lg">
                <div className="text-lg font-semibold text-gray-700 mb-4">Add New Category</div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Category Name:</label>
                        <input 
                            type="text" 
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
                            value={categoryName} 
                            onChange={(e) => setCategoryName(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Image URL:</label>
                        <input 
                            type="text" 
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
                            value={imageUrl} 
                            onChange={(e) => setImageUrl(e.target.value)} 
                            required 
                        />
                    </div>
                    <Button type="submit" variant="contained" color="primary" className="w-full">Add Category</Button>
                </form>
            </div>
        </div>
    );
}

export default AddCategory;
