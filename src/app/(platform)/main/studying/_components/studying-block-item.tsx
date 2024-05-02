"use client";

import { cn } from "@/lib/utils";
import { ExtendedBlock } from "./studying-block-container";
import { useAction } from "@/hooks/use-action";
import { createAssignBlockUser } from "@/actions/create-assign-block-user";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface StudyingBlockItemProps {
  block: ExtendedBlock;
}

const StudyingBlockItem = ({ block }: StudyingBlockItemProps) => {
  const session = useSession();
  const router = useRouter();
  const assignGroupInfo = block.assign_block_groups?.[0];
  const assignMyInfo = assignGroupInfo?.assign_block_users?.[0];
  const isPermitted = checkPermission();
  const isTaking = isTakingTest();

  const { execute } = useAction(createAssignBlockUser, {
    onSuccess: () => {
      toast.success("Тест начат");
      router.push('/main/test/' + block.block_id);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  function checkPermission ()  {
    if (assignMyInfo?.current_try_count === assignGroupInfo.max_try_count)
      return false;
    if (assignGroupInfo.deadline < new Date()) return false;
    return true;
  };

  function isTakingTest() {
    const deadlineTime = assignGroupInfo?.deadline.getTime();
    const createdTime = assignMyInfo?.created_at.getTime();
    const timeLimitMillis = assignGroupInfo?.time_limit * 60 * 1000; 

    if (deadlineTime - createdTime > timeLimitMillis) {
        return true;
    }
    return false;
}

  function onAction () {
    if (!isPermitted) {
      toast.error("Вам не разрешено начать тестирование");
      return null;
    }
    if (isTaking) {
      router.push('/main/test/' + block.block_id);
      return null;
    }
    execute({
      user_id: Number(session.data?.user.user_id), 
      assign_block_group_id: assignGroupInfo?.assign_block_group_id,
    });
  }


  return (
    <form action={onAction}>
      <button
        disabled={!isPermitted}
        className={cn(
          "p-3 h-[140px] max-w-[260px] w-full   bg-slate-200 rounded-md transition-colors",
          isPermitted
            ? "cursor-pointer hover:bg-slate-300"
            : "cursor-not-allowed"
        )}
      >
        <div className=" text-left h-full flex justify-between flex-col">
          <span className="text-ellipsis" title={block.name}>
            {block.name}
          </span>
          <div>
            <span>
              Попытки
              <span>
                {" "}
                {assignMyInfo?.current_try_count
                  ? assignMyInfo.current_try_count
                  : 0}
              </span>
              /<span>{assignGroupInfo.max_try_count}</span>
            </span>
            {isTaking && <span>В процессе</span>}
          </div>
        </div>
      </button>
    </form>
  );
};

export default StudyingBlockItem;
