import prisma from "@/prisma/prisma";
import { User } from "@prisma/client";
import * as jose from "jose";
import { cookies } from "next/headers";
export interface NextApiHandlerExtended {
  (req: Request, res: Response, user: User): void;
}
export const validateauth = (
  controller: NextApiHandlerExtended
): NextApiHandlerExtended => {
  return async (req: Request, res: Response) => {
    let user = null;
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    
    if (token) {
      try {
        user = await validateToken(token.value);
        user = await prisma.user.findUnique({
          where: { id: user.id as number },
        });

        if (!user) {
          throw new Error("Not a real User");
        }
      } catch (error) {
        return Response.json({ error }, { status: 500 });
      }
      return controller(req, res, { ...user, password: "" });
    } else {
      return Response.json({ error: "Not Authorized" }, { status: 401 });
    }
  };
};
export const validateToken = async (token: string) => {
  const user = await jose.jwtVerify(
    token,
    new TextEncoder().encode(process.env.TOKENSECRET)
  );
  return user.payload;
};
