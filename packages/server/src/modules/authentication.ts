import { Router, Request, Response, NextFunction, json, urlencoded } from "express";
import jwt from "jsonwebtoken";
import { env } from "process";
import type { User } from "../generated/prisma";
import validate, { type TypedRequest } from "../middleware/validate";
import loginSchema from "../schemas/loginSchema";
import { z } from "zod";
import { prisma } from "../global";

function generateToken(user: User) {
  const payload: User = user;

  const token = jwt.sign(
    payload,
    env.JWT_SECRET || "fischl-von-luftschloss-narfidort",
    {
      algorithm: "HS256",
      expiresIn: "1m",
    }
  );
  return token;
}

export default Router()
  .post(
    "/login",
    validate(loginSchema),
    async (req: TypedRequest<z.infer<typeof loginSchema>>, res: Response, next: NextFunction) => {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({ where: { email: email } });
      if (!user) {
        next(new Error());
        return;
      }

      if (user.passwordHash !== password) {
        next(new Error());
        return;
      }

      const token = generateToken(user);
      res.status(200).json(token);
    }
  )
  .post("/register", (req: Request, res: Response) => {});
