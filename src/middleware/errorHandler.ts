
import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import mongoose from "mongoose";

export const errorHandler: ErrorRequestHandler = (
  err,
  _req,
  res,
  _next
) => {
  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
    return;
  }

  if (
    err instanceof mongoose.Error &&
    err.name === "ValidationError"
  ) {
    res.status(400).json({
      success: false,
      message: "Invalid data",
    });
    return;
  }

  if (
    err instanceof mongoose.mongo.MongoServerError &&
    err.code === 11000
  ) {
    res.status(409).json({
      success: false,
      message: "A record with this unique value already exists",
    });
    return;
  }

  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};
