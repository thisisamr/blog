import prisma from "@/prisma/prisma";

export async function GET(req: Request, res: Response) {
  return Response.json(await prisma.post.findMany({}), { status: 200 });
}
