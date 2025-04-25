import { ZodError, ZodSchema } from "zod";
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
      const _err: ZodError = err;

      res.status(400).json({
        errors: _err.errors
      });
    }
  };
}
