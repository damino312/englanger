"use client";

import { cn } from "@/lib/utils";
import { useAction } from "@/hooks/use-action";
import { createAssignBlockUser } from "@/actions/create-assign-block-user";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AssignBlockGroup, AssignBlockUsers } from "@prisma/client";

interface StudyingBlockItemProps {
  blockId: number;
  blockName: string;
  isDeadlinePassed: boolean;
  isCountExceeded: boolean;
  assignGroupInfo: AssignBlockGroup;
  assignMyInfo: AssignBlockUsers | undefined;
}

const StudyingBlockItem = ({
  blockId,
  blockName,
  isDeadlinePassed,
  isCountExceeded,
  assignGroupInfo,
  assignMyInfo,
}: StudyingBlockItemProps) => {
  const session = useSession();
  const router = useRouter();

  const { execute } = useAction(createAssignBlockUser, {
    onSuccess: () => {
      router.push("/main/test/" + blockId);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  function onAction() {
    if (isCountExceeded || isDeadlinePassed) {
      toast.error("Вам не разрешено начать тестирование");
      return null;
    }

    if (assignMyInfo) {
      router.push("/main/test/" + blockId);
      return null;
    }
    execute({
      user_id: Number(session.data?.user.user_id),
      assign_block_group_id: assignGroupInfo?.assign_block_group_id,
    });
  }
  return (
    <form action={onAction} className="h-full text-lg">
      <button
        title={blockName}
        disabled={isCountExceeded || isDeadlinePassed}
        className={cn(
          "p-3 min-h-[120px] h-full  w-full bg-slate-400 rounded-md transition-colors",
          isCountExceeded || isDeadlinePassed
            ? "cursor-not-allowed"
            : "cursor-pointer hover:bg-slate-300"
        )}
      >
        <div className=" text-left h-full flex justify-between flex-col">
          <span className="text-ellipsis" title={blockName}>
            {blockName}
          </span>
          <div>
            <span>
              Попытки
              <span>
                {" "}
                {assignMyInfo?.current_try_count
                  ? assignMyInfo?.current_try_count
                  : 0}
              </span>
              /<span>{assignGroupInfo?.max_try_count}</span>
            </span>
            {assignMyInfo?.is_finished && !assignMyInfo?.is_finished && (
              <span>В процессе</span>
            )}
          </div>
        </div>
      </button>
    </form>
  );
};

export default StudyingBlockItem;
