import { Router, Request, Response } from "express";
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
    async (req: TypedRequest<z.infer<typeof loginSchema>>, res: Response) => {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({ where: { email: email } });
    }
  )
  .post("/register", (req: Request, res: Response) => {});
