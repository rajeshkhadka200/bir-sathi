import { Router } from "express";
import {
  increaseToken,
  currentPatient,
  setLimit,
} from "../controller/tokenController.js";

const router = Router();
router.post("/increasepatient", increaseToken);
router.get("/getpatient", currentPatient);
router.post("/setlimit", setLimit);
export default router;
