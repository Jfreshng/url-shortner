console.log("URL Controller LOADED");
import { Request, Response } from "express";
import { shortenSaveUrl, getUrlById, getAllUrl, deleteUrlById } from "../services/url.service.js";
import { urlInterface } from "../../types/UrlTypes.js";
import { responseTypeInterface } from "../../types/status.js";

export const shortenUrController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    if (!payload) throw new Error("Payload cannot be empty please enter a valid payload");
    const response = await shortenSaveUrl(payload);


    if (!response) res.status(400).send({
      status: "Failed",
      Message: `Some error occurred ${response}`
    })

    res.status(201).send({
      status: "Failed",
      message: "Record Created successfully",
      data: response
    })
  } catch (error) {
    // throw error;
    res.status(400).send({
      status: "Failed",
      message: `Some error occurred ${error}`
    })
  }
}

export const getUrlByIdCont = async (req: Request<{id: number }>, res: Response) => {
  try {
    const _id = req.params.id;

    if (!_id) throw new Error("Please provide a valid id");

    const response = await getUrlById(_id);
    if (response) return res.status(200).send(response);
    return res.status(404).send({
      message: "Not found",
    });
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      message: error instanceof Error ? error.message : "Unknown error"
    }); 
  }
}

export const getUrls = async (req: Request, res: Response) => {
  console.log("currently here");
  try {
    const response = await getAllUrl();

    if (response) {
      return res.status(200).send({
        message: "Success",
        data: response
      })
    }
    return res.status(400).send({
      Status: "Failed",
      Message: "No Data found",
      data: null
    })
  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: `An Error occurred, ${error}`
    })
  }
}

export const deleteUrlByIdCont = async (req: Request<{ id: number}>, res: Response) => {
  try {
    const _id = req.params.id;
    if (!_id)  return res.status(400).send({
      status: "Failed",
      message: "Id cannot be null",
    })

    const deleteStatus = await deleteUrlById(_id);
    if (deleteStatus) res.status(200).send({
      status: "Success",
      message: "Record deleted successfully"
    })
    return res.status(400).send({
      status: "Failed",
      message: "Some error occurred"
    })
  } catch (error) {
    return res.status(400).send({
      message: error
    })
  }
}