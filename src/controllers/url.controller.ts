import { Request, Response } from "express";
import { shortenSaveUrl, getUrlById, getAllUrl, deleteUrlById, updateUrl, getUrlByShortUrl, getByClickCount, performClickUrl, performCustomClick } from "../services/url.service.js";
import { customClick, updateUrlType, urlInterface } from "../../types/UrlTypes.js";
import { ApiResponse } from "../../types/status.js";

export const shortenUrController = async (req: Request, res: Response<ApiResponse<urlInterface>>) => {
  try {
    const payload = req.body;
    if (!payload) throw new Error("Payload cannot be empty please enter a valid payload");
    const response = await shortenSaveUrl(payload);


    if (!response) res.status(400).send({
      status: "Failed",
      message: `Some error occurred ${response}`
    })

    res.status(201).send({
      status: "Success",
      message: "Record Created successfully",
      data: response
    })
  } catch (error) {
    // throw error;
    res.status(400).json({
      status: "Failed",
      message: `Some error occurred ${error}`
    })
  }
}

export const getUrlByIdCont = async (req: Request<{id: string }>, res: Response<ApiResponse<urlInterface>>) => {
  try {
    const _id = req.params.id;

    if (!_id) throw new Error("Please provide a valid id");

    const response = await getUrlById(_id);
    if (response) return res.status(200).send({
      status: "Success",
      message: "Record Retrieved successfully",
      data: response
    });
    return res.status(404).send({
      status: "Failed",
      message: "Not found",
    });
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      message: error instanceof Error ? error.message : "Unknown error"
    }); 
  }
}

export const getUrls = async (req: Request, res: Response<ApiResponse<urlInterface [] | null>>) => {
  try {
    const response = await getAllUrl();

    if (response) {
      return res.status(200).send({
        status: "Success",
        message: response.length > 0 ? "Records retrieved successfully" : "No record found",
        data: response
      })
    }
    return res.status(400).send({
      status: "Failed",
      message: "No Data found",
      data: null
    })
  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: `An Error occurred, ${error}`
    })
  }
}

export const getUrlRecordByShortId = async (req: Request<{ shortId: string }>, res: Response<ApiResponse<urlInterface | null>>) => {
  try {
    const _shortId = req.params.shortId;
    const _res = await getUrlByShortUrl(_shortId);

    if (!_res) throw "Error"
    
    res.status(200).send({
      status: "Success",
      message: "Record Retrieved successfully",
      data: _res
    })

  } catch (error: any) {
    res.status(400).send({
      status: "Failed",
      message: error.message || "Some errors occurred"
      // errorMessage: error
    })
  }
}

export const updateUrlRecord = async (req: Request, res: Response<ApiResponse<urlInterface>>) => {
  try {
    const payload: updateUrlType = req.body;

    if (!payload) {
      throw new Error("Payload cannot be null");
    }

    const response = await updateUrl(payload);

    return res.status(200).json({
      status: "Success",
      message: "Record Updated Successfully",
      data: response
    });

  } catch (error: any) {
    return res.status(400).send({
      status: "Failed",
      message: error.message || "Some errors occurred"
    });
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

export const getRecordsCountsGTE = async (
  req: Request<{ count: number }>, 
  res: Response<ApiResponse<urlInterface[] | null>>
) => {
  try {
    const { count } = req.params;

    if (Number.isNaN(count)) throw new Error("Invalid Parameter, Count must be a valid integer");
    const _count = Number(count);

    const result = await getByClickCount(_count);

    res.status(200).json({
      status: "Success",
      message: "Data retrieved successfully",
      data: result,
    })
  } catch (error) {
    return res.status(400).json({
      status: "Failed",
      message: `An error occurred ${error}`
    });
  }
}

export const clickUrl = async (req: Request<{ id: string }>, res: Response<ApiResponse<urlInterface | null>>) => {
  try {
    const id = req.params.id;
    // if (!id) throw new Error("Invalid id");
    if (!id) {
      return res.status(400).json({
        status: "Failed",
        message: "Invalid id",
        data: null
      });
    }
    const result = await performClickUrl(id);

    res.status(200).json({
      status: "Success",
      message: "Click Successful",
      data: result
    })

  } catch (error: any) {
    res.status(400).send({
      status: "Failed",
      message: "An error occurred",
      errorMessage: error
    })
  }
}

export const clickUrlCustomTimes = async (req: Request<{}, {}, customClick>, 
  res: Response<ApiResponse<urlInterface | null>>
) => {
  try {
    const payload = req.body;

    console.log(payload)

    const result = await performCustomClick(payload);

    res.status(200).json({
      status: "Success",
      message: "Click Successful",
      data: result
    });

  } catch (error: any) {
    res.status(400).send({
      status: "Failed",
      message: "An error occurred",
      errorMessage: error.message
    })
  }
}