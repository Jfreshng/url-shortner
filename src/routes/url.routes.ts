console.log("URL ROUTER LOADED");
import { Router } from "express";
import { deleteUrlByIdCont, getUrls, getUrlByIdCont, shortenUrController, updateUrlRecord, getUrlRecordByShortId } from "../controllers/url.controller.js";

const urlRouter = Router();

urlRouter.get('/', getUrls);
urlRouter.get('/:id', getUrlByIdCont);
urlRouter.get('/getByShortUrlId/:shortId', getUrlRecordByShortId)
urlRouter.post('/:shortId', shortenUrController)
urlRouter.put('/', updateUrlRecord)
urlRouter.delete('/:id', deleteUrlByIdCont)

export default urlRouter;