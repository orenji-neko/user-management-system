import type { Request, Response, NextFunction } from "express";
import { expressjwt, Request as JWTRequest } from "express-jwt";
import { env } from "process";
import { prisma } from "../global";
import { Unauthorized } from "./error";

export default function authorize({ admin }: { admin: boolean }) {
  return [
    // authentication
    expressjwt({
      secret: env.JWT_SECRET || "fischl-von-luftschloss-narfidort",
      algorithms: ["HS256"],
    }),
    // authorization
    async (req: JWTRequest, res: Response, next: NextFunction) => {
      const id = req.auth?.id as number;
      const user = await prisma.user.findUnique({ where: { id: id } });

      if (admin && !user?.admin) {
        next(new Unauthorized("Admin only"));
        return;
      }

      next();
    },
  ];
}
