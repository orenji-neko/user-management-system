import { Router, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "process";
import type { User } from "../generated/prisma";
import validate, { type TypedRequest } from "../middleware/validate";
import loginSchema from "../schemas/loginSchema";
import { z } from "zod";
import { prisma } from "../global";
import registerSchema from "../schemas/registerSchema";
import bcrypt from "bcrypt";
import { BadRequest, Unauthorized } from "../middleware/error";

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
    async (
      req: TypedRequest<z.infer<typeof loginSchema>>,
      res: Response,
      next: NextFunction
    ) => {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({ where: { email: email } });
      if (!user) {
        next(new Error());
        return;
      }

      const isEqual = await bcrypt.compare(password, user.passwordHash)
      if (!isEqual) {
        next(new Unauthorized("Invalid password"));
        return;
      }

      const token = generateToken(user);
      res.status(200).json({ token: token });
    }
  )
  .post(
    "/register",
    validate(registerSchema),
    async (
      req: TypedRequest<z.infer<typeof registerSchema>>,
      res: Response,
      next: NextFunction
    ) => {
      const { email, password, firstName, lastName, title } = req.body;
      try {
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
          data: {
            email: email,
            title: title,
            lastName: lastName,
            firstName: firstName,
            passwordHash: passwordHash,
          },
        });
        res.status(201).json(user);
        return;
      } catch (err) {
        next(new BadRequest("Failed to register user"));
      }
    }
  );
