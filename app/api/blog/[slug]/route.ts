import prisma from "@/prisma/prisma";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  if (!params.slug) {
    return Response.json("Specify the slug", { status: 400 });
  }
  try {
    const found = await prisma.post.findFirst({
      where: {
        slug: params.slug,
      },
    });
    return Response.json(found, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json("error", { status: 500 });
  }
}
