import { Router } from "express";
import { recharge } from "../controllers/rechargeController";
import transactionValidation from "../schemas/transactionSchema";

const rechargeRouter = Router();

rechargeRouter.post('/recharge-card/:id',transactionValidation(2),recharge);

export default rechargeRouter;