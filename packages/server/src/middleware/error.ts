import type { Request, Response, NextFunction } from "express";

export class BadRequest extends Error {
  args: any;

  constructor(msg: string, args?: any) {
    super();
    this.name = "BadRequest";
    this.message = msg;
    this.args = args;
  }
}

export class Unauthorized extends Error {
  args: any;

  constructor(msg: string, args?: any) {
    super();
    this.name = "Unauthorized";
    this.message = msg;
    this.args = args;
  }
}

export default function error(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // 400 Bad Request
  if (err instanceof BadRequest) {
    res.status(400);
    res.json({ message: err.message, errors: err.args });
    return;
  // 401 Unauthorized
  } else if (err instanceof Unauthorized) {
    res.status(401);
    res.json({ message: err.message, errors: err.args });
    return;
  } else {
    res.status(500);
  }

  res.json({ message: err.message });
}
