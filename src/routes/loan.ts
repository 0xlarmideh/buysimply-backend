import { Router } from "express";
import { login, logout } from "../controllers/auth";
import {
  getAllLoans,
  getLoansByStatus,
  getUserLoans,
  getExpiredLoans,
  deleteLoan,
} from "../controllers/loan";
import { authenticateJWT } from "../middlewares/authMiddleware";

const router = Router();

router.post("/login", login);
router.post("/logout", logout);

router.get("/loans", getAllLoans);
router.get("/loans/status", authenticateJWT, getLoansByStatus);
router.get("/loans/:userEmail/get", authenticateJWT, getUserLoans);
router.get("/loans/expired", authenticateJWT, getExpiredLoans);
router.delete("/loan/:loanId/delete", authenticateJWT, deleteLoan);

export default router;
