import { ZodSchema } from "zod";
import type { NextFunction, Request, Response } from "express";

export interface TypedRequest<Body> extends Request {
  body: Body;
}

export default function validate(schema: ZodSchema<any>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (err: any) {
      res.status(400).json({
        message: "Validation error",
      });
    }
  };
}
