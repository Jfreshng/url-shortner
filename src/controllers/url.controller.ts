import { Request, Response } from "express";
import {
  shortenSaveUrl,
  getUrlById,
  getAllUrl,
  deleteUrlById,
  updateUrl,
  getUrlByShortUrl,
  getByClickCount,
  performClickUrl,
  performCustomClick
} from "../services/url.service.js";

import { customClick, updateUrlType, urlInterface } from "../../types/UrlTypes.js";
import { ApiResponse } from "../../types/status.js";
import { ApiError } from "../utils/ApiError.js";


// CREATE
export const shortenUrController = async (
  req: Request,
  res: Response<ApiResponse<urlInterface>>
) => {

  if (!req.body) {
    throw new ApiError(400, "Payload cannot be empty");
  }

  const response = await shortenSaveUrl(req.body);

  res.status(201).json({
    status: "Success",
    message: "Record created successfully",
    data: response
  });
};


// GET BY ID
export const getUrlByIdCont = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<urlInterface>>
) => {

  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    throw new ApiError(400, "Invalid id");
  }

  const response = await getUrlById(id);

  res.status(200).json({
    status: "Success",
    message: "Record retrieved successfully",
    data: response
  });
};


// GET ALL
export const getUrls = async (
  req: Request,
  res: Response<ApiResponse<urlInterface[]>>
) => {

  const response = await getAllUrl();

  res.status(200).json({
    status: "Success",
    message: response.length > 0
      ? "Records retrieved successfully"
      : "No records found",
    data: response
  });
};


// GET BY SHORT ID
export const getUrlRecordByShortId = async (
  req: Request<{ shortId: string }>,
  res: Response<ApiResponse<urlInterface>>
) => {

  const shortId = req.params.shortId;

  if (!shortId) {
    throw new ApiError(400, "ShortId is required");
  }

  const response = await getUrlByShortUrl(shortId);

  res.status(200).json({
    status: "Success",
    message: "Record retrieved successfully",
    data: response
  });
};


// UPDATE
export const updateUrlRecord = async (
  req: Request,
  res: Response<ApiResponse<urlInterface>>
) => {

  const payload: updateUrlType = {
    ...req.body,
    id: Number(req.body.id)
  };

  if (Number.isNaN(payload.id)) {
    throw new ApiError(400, "Invalid id");
  }

  const response = await updateUrl(payload);

  res.status(200).json({
    status: "Success",
    message: "Record updated successfully",
    data: response
  });
};


// DELETE
export const deleteUrlByIdCont = async (
  req: Request<{ id: string }>,
  res: Response
) => {

  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    throw new ApiError(400, "Invalid id");
  }

  await deleteUrlById(id);

  res.status(200).json({
    status: "Success",
    message: "Record deleted successfully"
  });
};


// GET BY CLICK COUNT
export const getRecordsCountsGTE = async (
  req: Request<{ count: string }>,
  res: Response<ApiResponse<urlInterface[]>>
) => {

  const count = Number(req.params.count);

  if (Number.isNaN(count)) {
    throw new ApiError(400, "Count must be a valid number");
  }

  const result = await getByClickCount(count);

  res.status(200).json({
    status: "Success",
    message: "Data retrieved successfully",
    data: result
  });
};


// CLICK (INCREMENT 1)
export const clickUrl = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<urlInterface>>
) => {

  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    throw new ApiError(400, "Invalid id");
  }

  const result = await performClickUrl(id);

  res.status(200).json({
    status: "Success",
    message: "Click successful",
    data: result
  });
};


// CLICK (CUSTOM)
export const clickUrlCustomTimes = async (
  req: Request<{}, {}, customClick>,
  res: Response<ApiResponse<urlInterface>>
) => {

  const result = await performCustomClick(req.body);

  res.status(200).json({
    status: "Success",
    message: "Click successful",
    data: result
  });
};