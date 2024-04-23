import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(res: NextRequest, req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const data = await res.json();
    const { blockId } = data;

    const updateBlock = await db.block.update({
      where: {
        block_id: blockId,
      },
      data: {
        is_saved: true,
      },
    });
    return Response.json(updateBlock);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
