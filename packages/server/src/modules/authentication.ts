import { Router, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "process";
import type { User } from "../generated/prisma";
import validate, { type TypedRequest } from "../middleware/validate";
import loginSchema from "../schemas/loginSchema";
import registerSchema from "../schemas/registerSchema";
import { z } from "zod";
import { prisma } from "../global";
import bcrypt from "bcrypt";
import { BadRequest, Unauthorized } from "../middleware/error";
import authorize from "../middleware/authorize";
import sendEmail from "../utils/email";

/**
 * Generate a JWT token.
 * For security, filter out sensitive fields before signing.
 */
function generateToken(data: any) {
  const { passwordHash, ...payload } = data;
  return jwt.sign(
    payload,
    env.JWT_SECRET || "fischl-von-luftschloss-narfidort",
    {
      algorithm: "HS256",
      expiresIn: "10m",
    }
  );
}

export default Router()
  // LOGIN endpoint
  .post(
    "/login",
    validate(loginSchema),
    async (
      req: TypedRequest<z.infer<typeof loginSchema>>,
      res: Response,
      next: NextFunction
    ) => {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return next(new BadRequest("User not found"));
      }

      // Prevent login if the user's email is not verified
      if (!user.verified) {
        return next(
          new Unauthorized(
            "Email not verified. Please verify your email before logging in."
          )
        );
      }

      const isEqual = await bcrypt.compare(password, user.passwordHash);
      if (!isEqual) {
        return next(new Unauthorized("Invalid password"));
      }

      const token = generateToken(user);
      res.status(200).json({
        token,
        user: {
          ...user,
          role: user.admin ? "admin" : "user",
        },
      });
    }
  )
  // REGISTER endpoint
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
            email,
            title,
            lastName,
            firstName,
            passwordHash,
          },
        });
        res.status(201).json(user);
      } catch (err) {
        next(new BadRequest("Failed to register user"));
      }
    }
  )
  // Endpoint to send verification URL via email (demo version)
  // In production, this token should be sent via an email service.
  .get(
    "/verify-email/send",
    async (req: Request, res: Response, next: NextFunction) => {
      const { email } = req.query as { email: string };
      if (!email) {
        return next(new BadRequest("Email is required"));
      }
      try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          return next(new BadRequest("User not found"));
        }
        const verificationToken = jwt.sign(
          { id: user.id },
          env.JWT_SECRET || "fischl-von-luftschloss-narfidort",
          { algorithm: "HS256", expiresIn: "1h" }
        );
        await sendEmail({
          to: email,
          subject: "Sign-up verification API - Verify Email",
          html: `
            <h4>Verify Email</h4> 
            <p>Thanks for registering!</p> 
            <a>http://localhost:5173/api/verify-email?token=${verificationToken}</a>`,
        });

        res.status(200).json({
          message: "Verification email sent",
        });
      } catch (err) {
        next(new BadRequest("Failed to send verification email"));
      }
    }
  )
  // Endpoint to process email verification via URL token.
  .get(
    "/verify-email",
    async (req: Request, res: Response, next: NextFunction) => {
      const { token } = req.query as { token: string };
      if (!token) {
        return next(new BadRequest("Verification token is required"));
      }
      try {
        const data = jwt.verify(
          token,
          env.JWT_SECRET || "fischl-von-luftschloss-narfidort"
        ) as { id: string };
        const user = await prisma.user.findUnique({
          where: { id: parseInt(data.id) },
        });
        if (!user) {
          throw new Error("User not found");
        }
        await prisma.user.update({
          where: { id: user.id },
          data: { verified: true },
        });
        res.status(200).json({ message: "Email verified successfully" });
      } catch (err) {
        next(new BadRequest("Invalid verification token"));
      }
    }
  )
  .get(
    "/verify-authentication",
    authorize({ admin: false }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const jwtRequest = req as any;
        const userId = jwtRequest.auth?.id;

        if (!userId) {
          return next(new Unauthorized("Invalid token, no user data found"));
        }

        const user = await prisma.user.findUnique({
          where: { id: Number(userId) },
        });

        if (!user) {
          return next(new Unauthorized("User not found"));
        }

        res.status(200).json({
          ...user,
          role: user.admin ? "admin" : "user",
        });
      } catch (err) {
        next(err);
      }
    }
  )
  // Refresh token endpoint: reissue a new token for authenticated users.
  .get(
    "/refresh-token",
    authorize({}),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const jwtRequest = req as any; // Type adjustment as express-jwt attaches `auth`
        const userId = jwtRequest.auth?.id;
        if (!userId) {
          return next(new Unauthorized("Invalid token, no user data found"));
        }
        const user = await prisma.user.findUnique({
          where: { id: Number(userId) },
        });
        if (!user) {
          return next(new Unauthorized("User not found"));
        }
        const newToken = generateToken(user);
        res.status(200).json({ token: newToken });
      } catch (err) {
        next(err);
      }
    }
  );
