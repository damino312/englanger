import { db } from "@/lib/db";
import TestContainer from "./_components/test-container";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { BlockData } from "../../block/[blockId]/page";

const TestPage = async ({ params }: { params: { blockId: string } }) => {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user.user_id);

  const blockId = Number(params.blockId);
  const block = await db.block.findUnique({
    where: {
      block_id: blockId,
    },
    include: {
      subblock_orders: {
        include: {
          subblock_test: {
            include: {
              test_questions: {
                include: {
                  answer_tests: true,
                },
              },
            },
          },
          subblock_description: true,
          subblock_pronounce: {
            include: {
              pronounce_items: true,
            },
          },
        },
      },
    },
  });

  if (!block) {
    redirect("/main");
  }

  try {
    await updateLastBlocksOfUser(blockId, userId);
  } catch (error) {
    console.log(error);
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
          last_studied_blocks: newLastTeachingBlocks,
        },
      });
    }
  }

  return (
    <div className="w-full h-full px-32 pb-10">
      <TestContainer block={block as BlockData} />
    </div>
  );
};

export default TestPage;
