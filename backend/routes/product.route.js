import express from "express";


import { deleteProduct, getProducts, postProduct, postProducts, putProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", postProduct);

router.post("/list", postProducts);

router.put("/:id", putProduct);

router.get("/", getProducts);

router.delete("/:id", deleteProduct);

export default router;
