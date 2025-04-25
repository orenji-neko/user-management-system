import { Router, Request, Response, NextFunction } from "express";
import authorize from "../middleware/authorize";
import { prisma } from "../global";
import userSchema from "../schemas/userSchema";
import validate, { TypedRequest } from "../middleware/validate";
import { z } from "zod";
import bcrypt from "bcrypt";
import { BadRequest } from "../middleware/error";

export default Router()
  .get("/", authorize({ admin: true }), async (req: Request, res: Response) => {
    const users = (await prisma.user.findMany()).map((user) => ({
      ...user,
      role: user.admin ? "admin" : "user"
    }));
    res.status(200).json(users);
  })
  .post(
    "/",
    authorize({ admin: true }),
    validate(userSchema),
    async (
      req: TypedRequest<z.infer<typeof userSchema>>,
      res: Response,
      next: NextFunction
    ) => {
      try {
        const { email, password, lastName, firstName, role, title } = req.body;
        
        if(!password) {
          throw new BadRequest("Missing password");
        }

        const user = await prisma.user.create({
          data: {
            email: email,
            lastName: lastName,
            firstName: firstName,
            title: title,
            passwordHash: await bcrypt.hash(password, 10),
            admin: req.body.role.toLowerCase() === "admin",
          },
          select: {
            id: true,
            email: true,
            title: true,
            lastName: true,
            firstName: true,
            passwordHash: false,
            admin: true,
          },
        });

        res.status(201).json(user);
      } catch (err) {
        next(new BadRequest("Failed to create user"));
      }
    }
  )
  .put(
    "/:id",
    authorize({ admin: true }),
    validate(userSchema),
    async (
      req: TypedRequest<z.infer<typeof userSchema>>,
      res: Response,
      next: NextFunction
    ) => {
      const id = req.params.id;

      try {
        const { email, password, lastName, firstName, title } = req.body;

        const tmp = await prisma.user.findUnique({ where: { id: parseInt(id) } });

        const user = await prisma.user.update({
          where: {
            id: parseInt(id),
          },
          data: {
            email: email,
            lastName: lastName,
            firstName: firstName,
            title: title,
            passwordHash: password ? await bcrypt.hash(password, 10) : tmp?.passwordHash,
            admin: req.body.role.toLowerCase() === "admin",
          },
          select: {
            id: true,
            email: true,
            title: true,
            lastName: true,
            firstName: true,
            passwordHash: false,
            admin: true,
          },
        });

        res.status(201).json(user);
      } catch (err) {
        next(new BadRequest("Failed to update user"));
      }
    }
  )
  .delete(
    "/:id",
    authorize({ admin: true }),
    async (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id;

      try {
        const user = await prisma.user.delete({
          where: {
            id: parseInt(id),
          },
          select: {
            id: true,
            email: true,
            title: true,
            lastName: true,
            firstName: true,
            passwordHash: false,
            admin: true,
          },
        });

        res.status(201).json(user);
      } catch (err) {
        next(new BadRequest("Failed to create user"));
      }
    }
  );
