"use client";

import { ExtendedBlock } from "./studying-block-container";
import StudyingBlockItem from "./studying-block-item";
import HoverCardComponent from "./hover-card";
import { cn, displayLocalDate } from "@/lib/utils";
import AlertDialogComponent from "../../_components/alert-dialogue-component";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useAction } from "@/hooks/use-action";
import { startBlock } from "@/actions/start-block";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useHover } from "usehooks-ts";

interface StudyingHoverCardProps {
  block: ExtendedBlock;
}

const StudyingHoverCard = ({ block }: StudyingHoverCardProps) => {
  const session = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const isHover = useHover(ref);
  const { execute } = useAction(startBlock, {
    onSuccess: () => {
      router.push("/main/test/" + block.block_id);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const assignGroupInfo = block.assign_block_groups?.[0];
  const assignMyInfo = assignGroupInfo?.assign_block_users?.[0];
  const isCountExceeded =
    (assignMyInfo?.current_try_count ?? 0) >= assignGroupInfo.max_try_count
      ? true
      : false;
  const isDeadlinePassed = assignGroupInfo.deadline < new Date();
  const duration = assignGroupInfo.time_limit;
  const bestResult = block?.learning_outcomes?.reduce(
    (prev, curr) => (prev.grade > curr.grade ? prev : curr),
    block.learning_outcomes[0]
  );

  function onAction() {
    if (
      (isCountExceeded && assignMyInfo?.is_finished === true) ||
      isDeadlinePassed
    ) {
      toast.error("Вам не разрешено начать тестирование");
      return null;
    }

    if (assignMyInfo?.is_finished === false) {
      router.push("/main/test/" + block.block_id);
      return null;
    }
    execute({
      user_id: Number(session.data?.user.user_id),
      assign_block_group_id: assignGroupInfo?.assign_block_group_id,
      action: assignMyInfo ? "update" : "create",
    });
  }

  return (
    <>
      <HoverCardComponent
        isHover={isHover}
        triggerClassName="w-full max-w-[420px] "
        trigger={
          <div
            ref={ref}
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <StudyingBlockItem
              blockId={block.block_id}
              blockName={block.name}
              assignGroupInfo={assignGroupInfo}
              assignMyInfo={assignMyInfo}
              isCountExceeded={isCountExceeded}
              isDeadlinePassed={isDeadlinePassed}
            />
          </div>
        }
      >
        <>
          {assignMyInfo?.is_finished && isCountExceeded && (
            <p className="text-red-600">Попытки закончились</p>
          )}

          <p className={cn(isDeadlinePassed ? "text-red-600" : "")}>
            <span>Дедлайн: </span>
            {displayLocalDate(assignGroupInfo.deadline)}
          </p>
          {bestResult && <p>Лучший результат: {bestResult.grade}%</p>}
        </>
      </HoverCardComponent>

      <AlertDialogComponent
        title="Начать учебный блок"
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        description={
          !assignMyInfo?.is_finished ? (
            <span>Вы уверены, что хотите продолжить?</span>
          ) : (
            <div className="flex flex-col">
              <span>Вы уверены, что хотите начать?</span>
              <span>Время проохождения: {duration} минут</span>
            </div>
          )
        }
      >
        <form action={onAction}>
          <button className="w-full">
            {!assignMyInfo?.is_finished ? "Продолжить" : "Начать"}
          </button>
        </form>
      </AlertDialogComponent>
    </>
  );
};

export default StudyingHoverCard;
