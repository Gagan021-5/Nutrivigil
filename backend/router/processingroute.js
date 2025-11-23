import express from "express";
import upload from "../middleware/upload.js";
import { analyzeFood } from "../controller/analyze.js";
const router = express.Router();

router.post("/", upload.single("image"), analyzeFood);


export default router;