import express from "express";
import { productController } from "../controllers/productController.js";

const router = express.Router();

router.get("/filter-products", productController.filterProducts);
router.get("/featured-products", productController.getFeaturedProducts);
router.get("/detail/:type/:name", productController.getDetailProduct);
router.post("/create", productController.createProducts);
router.delete("/destroy-all", productController.destroyAllProducts);

export default router;
