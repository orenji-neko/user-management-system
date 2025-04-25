import type { Request, Response, NextFunction } from "express";

export default function error(
  error: unknown,
  request: Request,
  response: Response,
  next: NextFunction
) {
  
}
