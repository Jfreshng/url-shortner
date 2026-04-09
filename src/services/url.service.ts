import { error } from "node:console";
import { prismaInstance } from "../../prisma/prismaClient.js";
import { createUrl, urlInterface } from "../../types/UrlTypes.js";
import { nanoid } from "nanoid";

// create a new url link
export const shortenSaveUrl = async (payload: createUrl) => {
  // create url simply creates a new record and returns the shortened url
  try {
    if (!payload) throw new Error("Payload cannot be null or empty");

    const _payload: createUrl = {
      ...payload,
      // shortId: await nanoid(8).toString(),
      shortId: 'Rando'
    }

    console.log(_payload)
    // do validation if any is required
    const response = await prismaInstance.shortUrl.create({
      data: _payload
    })

    if (response) return response

  } catch (error) {
    throw error
  }
}

// get all
export const getAllUrl = async () => {
  try {
    const urls = await prismaInstance.shortUrl.findMany();
    return urls
  } catch (error) {
    throw error;
  }
}

// get one
export const getUrlById = async (id: number) => {
  try {
    if (!id) {
    throw new Error("id cannot be null");
  }
  const url = await prismaInstance.shortUrl.findUniqueOrThrow({
    where: {id}
  })
  return url;
  } catch (error) {
    throw error
  }
}

// delete service
export const deleteUrlById = async (id: number) => {
  try {
    if (!id) throw new Error("Id cannot be null, please enter a valid id");
    
    // find record by id
    const record = prismaInstance.shortUrl.findFirst({
      where: {
        id
      }
    })

    if (!record) throw new Error("Record no found");

    const deletedRecord = await prismaInstance.shortUrl.delete({
      where: {
        id
      }
    })

    if (!deletedRecord) throw new Error("Error couldn't delete");
    return true

  } catch (error) {
    throw error
  }
}

// update one

// get by some other condition