import { prismaInstance } from "../../prisma/prismaClient.js";
import { createUrl, updateUrlType, updateUrlByShortIdType, customClick } from "../../types/UrlTypes.js";
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
    if (Number.isNaN(_id)) throw `Invalid Id ${id}`;
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
    if (!Number.isInteger(id)) throw new Error("Invalid id");

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

export const updateUrl = async (payload: updateUrlType) => {

  if (!payload) {
    throw new Error("Payload cannot be null or empty");
  }

  const _id = Number(payload.id);

  if (Number.isNaN(_id)) {
    throw new Error("Invalid url id");
  }

  const response = await prismaInstance.shortUrl.update({
    where: {
      id: _id
    },
    data: {
      originalUrl: payload.originalUrl
    }
  });

  return response;
}

export const updateByShortUrlId = async (payload: updateUrlByShortIdType) => {
  try {
    const { shortId } = payload
    const updateResult = await prismaInstance.shortUrl.update({
      where: {
        shortId
      },
      data: {
        originalUrl: payload.originalUrl
      }
    })
  } catch (error) {
    throw new Error(`An error occurred ${error}`);
  }
}

// get by some other condition 
// get by click count -> returns records where clickCount is greater than or equal to the count passed as argument
export const getByClickCount = async (count: number) => {
  try {
    const result = await prismaInstance.shortUrl.findMany({
      where: {
        clickCount: {
          gte: count
        }
      }
    })
    return result
  } catch (error) {
    throw new Error(`An error occurred ${error}`);
  }
}

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

export const performClickUrl = async (id: string) => {
  try {
    const _id = Number(id);

    if (Number.isNaN(_id)) throw new Error(`Invalid Id ${id}`);

    const clickResult = await prismaInstance.shortUrl.update({
      where: {
        id: _id
      },
      data: {
        clickCount: {
          increment: 1
        }
      }
    })

    return clickResult;

  } catch (error) {
    throw new Error(`An Error occurred ${error}`)
  }
}

export const performCustomClick = async (payload: customClick) => {
  try {
    const { id, clicks } = payload;
    const _id = Number(id)
    const _clicks = Number(clicks)
    if (Number.isNaN(_id) || Number.isNaN(_clicks)) throw new Error("Invalid attribute in payload");
    const result = await prismaInstance.shortUrl.update({
      where: {
        id: _id
      },
      data: {
        clickCount: {
          increment: _clicks
        }
      }
    });

    return result;
  } catch (error) {
    throw new Error(`An Error occurred ${error}`);
  }
}