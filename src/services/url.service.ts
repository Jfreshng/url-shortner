import { prismaInstance } from "../../prisma/prismaClient.js";
import {
  createUrl,
  updateUrlType,
  updateUrlByShortIdType,
  customClick
} from "../../types/UrlTypes.js";
import { nanoid } from "nanoid";
import { ApiError } from "../utils/ApiError.js";


// CREATE
export const shortenSaveUrl = async (payload: createUrl) => {

  if (!payload) {
    throw new ApiError(400, "Payload cannot be null or empty");
  }

  const response = await prismaInstance.shortUrl.create({
    data: {
      ...payload,
      shortId: nanoid(8)
    }
  });

  return response;
};


// GET ALL
export const getAllUrl = async () => {
  return prismaInstance.shortUrl.findMany();
};


// GET BY ID
export const getUrlById = async (id: number) => {

  if (Number.isNaN(id)) {
    throw new ApiError(400, "Invalid id");
  }

  return prismaInstance.shortUrl.findUniqueOrThrow({
    where: { id }
  });
};


// DELETE
export const deleteUrlById = async (id: number) => {

  if (Number.isNaN(id)) {
    throw new ApiError(400, "Invalid id");
  }

  return prismaInstance.shortUrl.delete({
    where: { id }
  });
};


// UPDATE BY ID
export const updateUrl = async (payload: updateUrlType) => {

  if (!payload) {
    throw new ApiError(400, "Payload cannot be null or empty");
  }

  if (Number.isNaN(payload.id)) {
    throw new ApiError(400, "Invalid url id");
  }

  return prismaInstance.shortUrl.update({
    where: { id: payload.id },
    data: {
      originalUrl: payload.originalUrl
    }
  });
};


// UPDATE BY SHORT ID
export const updateByShortUrlId = async (payload: updateUrlByShortIdType) => {

  if (!payload?.shortId) {
    throw new ApiError(400, "shortId is required");
  }

  return prismaInstance.shortUrl.update({
    where: {
      shortId: payload.shortId
    },
    data: {
      originalUrl: payload.originalUrl
    }
  });
};


// GET BY CLICK COUNT
export const getByClickCount = async (count: number) => {

  if (Number.isNaN(count)) {
    throw new ApiError(400, "Invalid count");
  }

  return prismaInstance.shortUrl.findMany({
    where: {
      clickCount: {
        gte: count
      }
    }
  });
};


// GET BY SHORT ID
export const getUrlByShortUrl = async (shortId: string) => {

  if (!shortId) {
    throw new ApiError(400, "ShortUrlId cannot be null");
  }

  const response = await prismaInstance.shortUrl.findFirst({
    where: { shortId }
  });

  if (!response) {
    throw new ApiError(404, `Record with shortId '${shortId}' not found`);
  }

  return response;
};


// INCREMENT CLICK (1)
export const performClickUrl = async (id: number) => {

  if (Number.isNaN(id)) {
    throw new ApiError(400, "Invalid id");
  }

  return prismaInstance.shortUrl.update({
    where: { id },
    data: {
      clickCount: {
        increment: 1
      }
    }
  });
};


// INCREMENT CLICK (CUSTOM)
export const performCustomClick = async (payload: customClick) => {

  const id = Number(payload.id);
  const clicks = Number(payload.clicks);

  if (Number.isNaN(id) || Number.isNaN(clicks)) {
    throw new ApiError(400, "Invalid attributes in payload");
  }

  return prismaInstance.shortUrl.update({
    where: { id },
    data: {
      clickCount: {
        increment: clicks
      }
    }
  });
};