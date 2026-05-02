import express from "express";
import { getGoals, updateGoals } from "../controllers/goalController.js";

const router = express.Router();

router.get("/", getGoals);
router.put("/", updateGoals);

export default router;