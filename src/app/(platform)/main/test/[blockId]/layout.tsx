import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function TestLayout({
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
  const groupId = Number(session?.user.group_id);

  if (!userId) {
    redirect("/login");
  }

  const block = await db.block.findUnique({
    where: {
      block_id: blockId,
    },
    include: {
      assign_block_groups: {
        where: { group_id: groupId },
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
  if (
    block?.assign_block_groups.length === 0 ||
    block?.assign_block_groups[0].assign_block_users.length === 0
  ) {
    redirect("/main");
  }
  const myAssignInfo = block?.assign_block_groups[0].assign_block_users[0];
  const blockAssignInfo = block?.assign_block_groups[0];
  const maxTryCount = blockAssignInfo!.max_try_count;
  const currentTryCount = myAssignInfo!.current_try_count;
  const deadline = blockAssignInfo!.deadline;
  const isFinished = myAssignInfo?.is_finished;

  if (deadline < new Date() || (maxTryCount <= currentTryCount && isFinished)) {
    redirect("/main");
  }

  return <div className="w-full min-h-screen bg-slate-100">{children}</div>;
}
