import { Router } from "express";
import {
    getAllProducts,
    getProductById,
    createProduct,
    deleteproduct,
    updateproduct
} from "./controllers_product";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id",getProductById);
router.post("/", createProduct);
router.put("/:id", updateproduct);
router.delete("/:id", deleteproduct);

export default router;