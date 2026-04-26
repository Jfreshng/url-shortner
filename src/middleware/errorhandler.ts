import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { ApiError } from "../utils/ApiError";


export const  errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {


  // handling prisma errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {

      case "P2002":
        return res.status(409).json({
          status: "Failed",
          message: "Duplicate record"
        });

      case "P2025":
        return res.status(404).json({
          status: "Failed",
          message: "Record not found"
        });

      case "P2003":
        return res.status(400).json({
          status: "Failed",
          message: "Invalid foreign key reference"
        });

      default:
        return res.status(400).json({
          status: "Failed",
          message: "Database error"
        });
    }
  }

  // Api errors
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      status: "Failed",
      message: error.message
    })
  }

  // Unknown Errors
  return res.status(500).json({
    status: "Failed",
    message: "Internal Sever Error"
  });
};