import express from "express"
import dotenv from 'dotenv'
import urlRouter from "./src/routes/url.routes";

import { Request, Response } from "express";

dotenv.config();    // inject config in current environment
const PORT = 9000;

const app = express();
app.use(express.json());
app.use('/url', urlRouter)

app.get('/', (req: Request, res: Response) => {
  return res.status(200).send({
    status: "Success",
    message: "test api endpoint",
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
})