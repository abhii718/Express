import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router();
router.route("/register").post(registerUser);

// router.get("/hello", (req, res) => {
//     res.send("Hello, world from user.routes.js!");
// });

export default router;
