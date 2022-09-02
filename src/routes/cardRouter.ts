import { Router } from "express";
import { createCard,activateCard,getCards,getTransactions,
unblockCard, blockCard, createVirtualCard } from "../controllers/cardController";
import cardValidation from "../schemas/cardSchema";

const cardRouter = Router();

cardRouter.post('/create-card/:id',cardValidation(1),createCard);
cardRouter.post('/create-virtual-card/:id',cardValidation(4),createVirtualCard);
cardRouter.put('/activate-card',cardValidation(2),activateCard);
cardRouter.put('/mycard-block/:id',cardValidation(4),blockCard);
cardRouter.put('/mycard-unblock/:id',cardValidation(4),unblockCard);
cardRouter.get('/mycards',cardValidation(3),getCards);
cardRouter.get('/mycard-transactions/:id',getTransactions);

export default cardRouter;