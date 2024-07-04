
import prisma from "@/prisma/prisma";
import { User } from "@prisma/client";
import * as jose from 'jose';
import { NextApiRequest, NextApiResponse } from "next";
import { revalidatePath } from "next/cache";

async function handler(req:NextApiRequest, res:NextApiResponse) {
    // Check for secret to confirm this is a valid request
     const slug =req.body.slug
    try {
      // this should be the actual path not a rewritten path
      // e.g. for "/blog/[slug]" this should be "/blog/post-1"
      revalidatePath('/blog/[slug]', 'page')
      return res.json({ revalidated: true })
    } catch (err) {
      // If there was an error, Next.js will continue
      // to show the last successfully generated page
      return res.status(500).send('Error revalidating')
    }
  }

export interface NextApiHandlerExtended_pages {
  (req: NextApiRequest, res: NextApiResponse, user?: User): void;
}
const validateAuth = (
  controller: NextApiHandlerExtended_pages
): NextApiHandlerExtended_pages => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.token || req.headers.authorization;

    if (token) {
      let user;
      try {
        const key = new TextEncoder().encode(process.env.TOKENSECRET);
        const { payload } = await jose.jwtVerify(token, key);
        const id = payload.id as number;
        user = await prisma.user.findUnique({
          where: { id: id },
        });

        if (!user) {
          throw new Error("Not a real User");
        }
      } catch (error) {
        console.log(error);
        return res.status(401).json({ error: "Not Authorized" });
      }
      return controller(req, res, user);
    } else {
      return res.status(401).json({ error: "Not Authorized" });
    }
  };
};

export default validateAuth(handler)