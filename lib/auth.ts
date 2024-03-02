import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "./prisma";

export const validateRoute = (handler: any) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.AUTH_TOKEN;

    if (token) {
      let user;

      try {
        const { id }: any = jwt.verify(token, "hello");
        user = await prisma.user.findUnique({ where: { id } });

        if (!user) {
          throw new Error("User not found");
        }
      } catch (error) {
        res.status(401);
        res.json({ error: "Not Authorized" });
        return;
      }
      return handler(req, res, user);
    }
    res.status(401);
    res.json({ error: "Not Authorized" });
  };
};

export const validateToken = (token: any) => {
  const user = jwt.verify(token, "hello");
  return user;
};
