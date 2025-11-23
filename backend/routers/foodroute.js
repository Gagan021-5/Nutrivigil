import express from "express";
import upload from "../middleware/upload.js";
import {analyzeFood} from "../controller/analyze.js"
const foodrouter = express.Router();

foodrouter.post("/", upload.single("image"), analyzeFood);


export default foodrouter;