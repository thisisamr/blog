import prisma from "@/prisma/prisma";
// Opt out of caching for all data requests in the route segment
export const dynamic = 'force-dynamic'
export async function GET(req: Request) {

  return Response.json(await prisma.post.findMany({}), { status: 200 });
}
