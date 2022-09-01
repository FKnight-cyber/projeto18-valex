import { Router } from "express";
import { purchase } from "../controllers/paymentController";
import transactionValidation from "../schemas/transactionSchema";

const paymentRouter = Router();

paymentRouter.post('/buy-from/:id',transactionValidation(1),purchase);

export default paymentRouter;