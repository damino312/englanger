"use client";

import { cn } from "@/lib/utils";
import { useAction } from "@/hooks/use-action";
import { startBlock } from "@/actions/start-block";
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

  const { execute } = useAction(startBlock, {
    onSuccess: () => {
      router.push("/main/test/" + blockId);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  function onAction() {
    if (
      (isCountExceeded && assignMyInfo?.is_finished === true) ||
      isDeadlinePassed
    ) {
      toast.error("Вам не разрешено начать тестирование");
      return null;
    }

    if (assignMyInfo?.is_finished === false) {
      router.push("/main/test/" + blockId);
      return null;
    }
    execute({
      user_id: Number(session.data?.user.user_id),
      assign_block_group_id: assignGroupInfo?.assign_block_group_id,
      action: assignMyInfo ? "update" : "create",
    });
  }
  return (
    <form action={onAction} className="h-full text-lg">
      <button
        title={blockName}
        disabled={
          (isCountExceeded && assignMyInfo?.is_finished === true) ||
          isDeadlinePassed
        }
        className={cn(
          "p-3 min-h-[120px] h-full  w-full bg-slate-400 rounded-md transition-colors",
          (isCountExceeded && assignMyInfo?.is_finished === true) ||
            isDeadlinePassed
            ? "cursor-not-allowed"
            : "cursor-pointer hover:bg-slate-300"
        )}
      >
        <div className=" text-left h-full flex justify-between flex-col">
          <span className="text-ellipsis" title={blockName}>
            {blockName}
          </span>
          <div className="flex justify-between">
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
            {!assignMyInfo?.is_finished && <span>В процессе</span>}
          </div>
        </div>
      </button>
    </form>
  );
};

export default StudyingBlockItem;
