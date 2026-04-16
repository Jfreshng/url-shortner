import { error } from "node:console";
import { prismaInstance } from "../../prisma/prismaClient.js";
import { createUrl, shortUrlType, updateUrlType, urlInterface } from "../../types/UrlTypes.js";
import { nanoid } from "nanoid";

// create a new url link
export const shortenSaveUrl = async (payload: createUrl) => {
  // create url simply creates a new record and returns the shortened url
  try {
    if (!payload) throw new Error("Payload cannot be null or empty");

    const _payload = {
      ...payload,
      shortId: await nanoid(8).toString(),
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
export const getUrlById = async (id: string) => {
  try {
    if (!id) {
      throw new Error("id cannot be null");
    }
    const _id = Number(id);
    if (typeof(_id) !== 'number') throw `Invalid Id ${id}`;
    const url = await prismaInstance.shortUrl.findUniqueOrThrow({
      where: {id: _id}
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
export const updateUrl = async (payload: updateUrlType) => {
  try {
    if (!payload) {
      throw new Error("Payload cannot be null or empty");
    }

    const _id = Number(payload.id);
    if (typeof(_id) !== 'number') throw new Error("Invalid url id");

    // get record
    const urlRecord = await prismaInstance.shortUrl.findFirst({
      where: {
        id: _id
      }
    })

    if (!urlRecord) throw new Error("Record not found")
    
    // update actual record
    const newData = {
      // ...urlRecord,
      shortId: urlRecord.shortId,
      createdAt: urlRecord.createdAt,
      clickCount: urlRecord.clickCount,
      originalUrl: payload.originalUrl
    }

    // save new record with updated data
    const response = await prismaInstance.shortUrl.update({
      where: {
        id: payload.id
      },
      data: newData
    })

    return response
  } catch (error) {
    throw (error);
  }
}

// get by some other condition

// get by shortUrlId
export const getUrlByShortUrl = async (shortId: string) => {
  try {
      if (!shortId) throw new Error("ShortUrlId cannot be null");

    const response = await prismaInstance.shortUrl.findFirst({
      where: {
        shortId
      }
    })

    if (!response) throw new Error(`Record with ${shortId} not found`)
    
    return response;
  } catch (error) {
    throw error;
  }
}