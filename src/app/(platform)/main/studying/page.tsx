import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { AssignBlockGroup, AssignBlockUsers, Block } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import StudyingBlockContainer from "./_components/studying-block-container";
import { toast } from "sonner";

const TeachingPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user.user_id) {
    redirect("/login");
  }
  const userId = Number(session?.user.user_id);
  const groupId = Number(session?.user.group_id);
  const roleId = Number(session?.user.role_id);

  let availableBlocks: Block[] = [];

  if (roleId === 1) {
    try {
      availableBlocks = await db.block.findMany({
        where: {
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
        },
      });
    } catch (error) {
      console.error(error);
      toast.error(
        "Произошла ошибка при получении блоков, повторите попытку позже"
      );
    }
  } else if (roleId === 2) {
    availableBlocks = await db.block.findMany({
      where: {
        owner_id: Number(session?.user.user_id),
      },
    });
  }

  return (
    <div className="w-full h-full px-32">
      <>
        {roleId === 1 ? (
          <h1 className=" text-center font-bold text-3xl">Учебные блоки</h1>
        ) : (
          <h2 className=" text-center font-bold text-3xl">
            Учебные блоки созданные мной
          </h2>
        )}
      </>
      <StudyingBlockContainer blocks={availableBlocks} />
    </div>
  );
};

export default TeachingPage;
