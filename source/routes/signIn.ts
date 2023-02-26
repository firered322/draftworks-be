import express from "express";
import controller from "../controllers/userAuth/signIn/signIn";

const router = express.Router();

router.post("/signIn", controller.signIn);

export = router;
