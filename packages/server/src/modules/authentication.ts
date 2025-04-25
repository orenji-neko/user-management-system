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
import authorize from "../middleware/authorize";

function generateToken(data: any) {
  const payload: any = data;

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

      const isEqual = await bcrypt.compare(password, user.passwordHash);
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
  )
  // sends verification url to email
  .get(
    "/verify-email",
    async (req: Request, res: Response, next: NextFunction) => {

    }
  )
  // process verification url
  .get(
    "/verify-email",
    async (req: Request, res: Response, next: NextFunction) => {
      const { token } = req.query as { token: string };
      const data = (await jwt.verify(
        token,
        env.JWT_SECRET || "fischl-von-luftschloss-narfidort"
      )) as {
        id: string;
      };

      try {
        const user = await prisma.user.findUnique({
          where: {
            id: parseInt(data.id),
          },
        });
        if (!user) {
          throw new Error();
        }

        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            verified: true,
          },
        });

        res.status(200);
      } catch (err) {
        next(new BadRequest("Invalid verification token"));
      }
    }
  )
  .get(
    "/refresh-token",
    authorize({ admin: false }),
    async (req: Request, res: Response, next: NextFunction) => {}
  );
