import { Router } from "express";
import { purchase,purchaseOnline } from "../controllers/paymentController";
import transactionValidation from "../schemas/transactionSchema";

const paymentRouter = Router();

paymentRouter.post('/buy-store/:id',transactionValidation(1),purchase);
paymentRouter.post('/buy-online/:id',transactionValidation(3),purchaseOnline);

export default paymentRouter;