import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function CreateBlockLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    blockId: string;
  };
}) {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user.user_id);
  const blockId = Number(params.blockId);

  const currentBlock = await getCurrentBlock(blockId);

  if (userId !== currentBlock?.owner_id) {
    redirect("/main");
  }

  await updateLastBlocksOfUser(blockId, userId);

  async function getCurrentBlock(blockId: number) {
    const currentBlock = await db.block.findFirst({
      where: { block_id: blockId },
    });
    return currentBlock;
  }

  async function updateLastBlocksOfUser(blockId: number, userId: number) {
    const user = await db.user.findUnique({
      where: {
        user_id: userId,
      },
      select: {
        last_taught_blocks: true,
      },
    });
    let newLastTeachingBlocks: string | null = null;

    if (!user?.last_taught_blocks) {
      newLastTeachingBlocks = params.blockId;
    } else {
      const arrayOfBlocks = user.last_taught_blocks.split("|");
      if (!arrayOfBlocks.includes(String(blockId))) {
        let newArrayOfBlocks: string[] = [];
        if (arrayOfBlocks.length >= 3) {
          arrayOfBlocks.shift();
        }
        newArrayOfBlocks = [...arrayOfBlocks, ...[String(blockId)]];
        newLastTeachingBlocks = newArrayOfBlocks.join("|");
      }
    }

    if (newLastTeachingBlocks) {
      const updatedUser = await db.user.update({
        where: {
          user_id: userId,
        },
        data: {
          last_taught_blocks: newLastTeachingBlocks,
        },
      });
    }
  }

  return <div className="w-full min-h-screen bg-slate-100">{children}</div>;
}
