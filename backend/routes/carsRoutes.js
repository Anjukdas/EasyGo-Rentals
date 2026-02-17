import express from "express";
import { addCar, getCars } from "../controllers/carController.js";

const router = express.Router();

router.post("/", addCar);   // add car
router.get("/", getCars);   // list cars

export default router;
