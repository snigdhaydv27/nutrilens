import { Router } from "express";
import { getProductById, registerProduct } from "../controllers/product.controller.js";
import { authenticateUser } from "../middlewares/user.auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
    authenticateUser,
    upload.single("productImage"),
    registerProduct
);

router.route("/:id").post(getProductById);
export default router;