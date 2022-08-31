import { Router } from "express";
import { createCard } from "../controllers/cardController";

const cardRouter = Router();

cardRouter.post('/create-card/:id',createCard);

export default cardRouter;