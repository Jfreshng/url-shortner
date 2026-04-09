require('dotenv').config()

const express = require("express")
const { nanoid } = require("nanoid")
const prisma = require("./prisma/prismaClient")

const app = express();
app.use(express.json());



// shorten url:
// strategy get a url generate a nanoId at the point of receiving the url
// save both the url and the generated id to the database
app.post("/shortenUrl/:url", async (req, res) => {
  const { url } = req.params;
  const shortUrl = nanoid(6);

  const newUrl = await prisma.shortUrl.create({
    data: {
      originalUrl: url,
      shortId: shortUrl
    }
  })

  return res.json({
    shortUrl: `http:localhost:4500/${newUrl.shortId}`
  })

  // create a new url payload
  console.log({url})
})

app.get("/urls", async (req, res) => {
  try {
    const servers = await prisma.shortUrl.findMany({});
    res.status(200).send(servers);
  } catch (error) {
    res.status(400).send({ message: "An error occurred"});
  }

})

const PORT = 4500
app.listen(PORT, () => {
  console.log("Server running on ", PORT);
})