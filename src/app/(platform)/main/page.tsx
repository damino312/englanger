import { db } from "@/lib/db";
import { LastBlocks } from "./_components/last-blocks";
import { getServerSession } from "next-auth";
import { Block } from "@prisma/client";
import { authOptions } from "@/lib/auth";
const MainPage = async () => {
  const session = await getServerSession(authOptions);

  const userId = Number(session?.user.user_id);
  const groupId = Number(session?.user.group_id);

  if (!userId) {
    return;
  }

  const user = await db.user.findUnique({
    where: {
      user_id: userId,
    },
    select: {
      last_taught_blocks: true,
      last_studied_blocks: true,
    },
  });

  const createdBlocks = await getLastTaughtBlocks();
  const studiedBlocks = await getLastStudiedBlocks();

  async function getLastTaughtBlocks() {
    let createdBlocks: Block[] = [];
    if (user?.last_taught_blocks) {
      const arrayOfBlocks = user.last_taught_blocks.split("|").map(Number);
      createdBlocks = await db.block.findMany({
        where: {
          block_id: {
            in: arrayOfBlocks,
          },
        },
      });
    }
    return createdBlocks;
  }
  async function getLastStudiedBlocks() {
    let studiedBlocks: Block[] = [];
    if (user?.last_studied_blocks) {
      const arrayOfBlocks = user.last_studied_blocks.split("|").map(Number);

      studiedBlocks = await db.block.findMany({
        where: {
          block_id: {
            in: arrayOfBlocks,
          },
          assign_block_groups: {
            some: {
              group_id: groupId,
            },
          },
        },
        include: {
          assign_block_groups: {
            where: {
              group_id: groupId,
            },
            include: {
              assign_block_users: {
                where: {
                  user_id: userId,
                },
              },
            },
          },
          learning_outcomes: {
            where: {
              user_id: userId,
            },
            orderBy: {
              learning_outcome_id: "desc",
            },
          },
        },
      });
    }
    return studiedBlocks;
  }
  return (
    <div className="w-full h-full">
      <div className="w-full h-full px-32 ">
        {studiedBlocks.length > 0 && (
          <>
            <h2 className="text-3xl font-semibold mb-4">
              Что последнее я проходил:
            </h2>
            <LastBlocks blocks={studiedBlocks} type="study" />
          </>
        )}

        {createdBlocks.length > 0 && (
          <>
            <h2 className="text-3xl font-semibold my-4">
              Что последнее я создавал:
            </h2>
            <LastBlocks blocks={createdBlocks} type="teach" />
          </>
        )}
      </div>
    </div>
  );
};

export default MainPage;
