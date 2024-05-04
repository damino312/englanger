import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import StudyingBlockContainer, {
  ExtendedBlock,
} from "./_components/studying-block-container";
import { toast } from "sonner";

const TeachingPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user.user_id) {
    redirect("/login");
  }
  const userId = Number(session?.user.user_id);
  const groupId = Number(session?.user.group_id);
  const roleId = Number(session?.user.role_id);

  // страница видна только ученикам
  if (roleId !== 1) {
    redirect("/main");
  }

  let availableBlocks: ExtendedBlock[] = [];

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
  } catch (error) {
    console.error(error);
    toast.error(
      "Произошла ошибка при получении блоков, повторите попытку позже"
    );
  }

  return (
    <div className="w-full h-full px-32">
      <h1 className=" text-center font-bold text-3xl">Учебные блоки</h1>
      <StudyingBlockContainer blocks={availableBlocks} roleId={roleId} />
    </div>
  );
};

export default TeachingPage;
