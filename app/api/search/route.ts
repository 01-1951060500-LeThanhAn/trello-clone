import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { NextApiRequest } from "next";
export async function GET(
  req: NextApiRequest,
  { params }: { params: { cardId: string } }
) {
  try {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { query } = req.query;

    if (typeof query !== "string") {
      throw new Error("Invalid request");
    }

    const searchQuery = await db.card.findMany({
      where: {
        id: params.cardId,
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        list: {
          select: {
            title: true,
          },
        },
      },
    });

    return NextResponse.json({ searchQuery });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
