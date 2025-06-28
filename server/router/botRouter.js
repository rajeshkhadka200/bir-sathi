import { Router } from "express";
import { botHandler } from "../controller/botController.js";

const router = Router();
router.post("/getmesg", botHandler);

export default router;
