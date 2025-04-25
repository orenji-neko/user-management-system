import { ZodError, ZodSchema } from "zod";
import type { NextFunction, Request, Response } from "express";
import { BadRequest } from "./error";

export interface TypedRequest<Body> extends Request {
  body: Body;
}

export default function validate(schema: ZodSchema<any>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (err: any) {
      const _err: ZodError = err;

      next(new BadRequest("Validation error", _err.errors));
    }
  };
}
