import express from "express";
import { 
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    uploadProductImage,
    getProductsByCategory,
    getFilteredProducts
} from "../controllers/productController.js";
import upload from "../middleware/multer.js"; // Import Multer middleware
const router = express.Router();

router.post("/create", createProduct);
router.get("/get", getAllProducts);
router.get("/get/:id", getProductById);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);
router.post("/:id/upload", upload.array("images", 5), uploadProductImage);

router.get("/category/:category", getProductsByCategory);
router.get("/filter", getFilteredProducts);

export default router;
