console.log("URL ROUTER LOADED");
import { Router } from "express";
import { deleteUrlByIdCont, getUrls, getUrlByIdCont, shortenUrController } from "../controllers/url.controller.js";

const urlRouter = Router();

urlRouter.get('/', getUrls);
urlRouter.get('/:id', getUrlByIdCont)
urlRouter.post('/', shortenUrController)
urlRouter.delete('/:id', deleteUrlByIdCont)

export default urlRouter;