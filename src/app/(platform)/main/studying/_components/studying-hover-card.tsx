"use client";

import { ExtendedBlock } from "./studying-block-container";
import StudyingBlockItem from "./studying-block-item";
import { HoverCardDemo } from "./hover-card";
import { cn } from "@/lib/utils";
import AlertDialogComponent from "../../_components/alert-dialogue-component";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAction } from "@/hooks/use-action";
import { startBlock } from "@/actions/start-block";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface StudyingHoverCardProps {
  block: ExtendedBlock;
}

const StudyingHoverCard = ({ block }: StudyingHoverCardProps) => {
  const assignGroupInfo = block.assign_block_groups?.[0];
  const assignMyInfo = assignGroupInfo?.assign_block_users?.[0];
  const isCountExceeded = checkTryCount();
  const isDeadlinePassed = checkDeadline();

  const bestResult = block?.learning_outcomes?.reduce(
    (prev, curr) => (prev.grade > curr.grade ? prev : curr),
    block.learning_outcomes[0] // Используем первый элемент как начальное значение
  );
  const session = useSession();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { execute } = useAction(startBlock, {
    onSuccess: () => {
      router.push("/main/test/" + block.block_id);
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
      router.push("/main/test/" + block.block_id);
      return null;
    }
    execute({
      user_id: Number(session.data?.user.user_id),
      assign_block_group_id: assignGroupInfo?.assign_block_group_id,
      action: assignMyInfo ? "update" : "create",
    });
  }

  function checkTryCount() {
    if (
      (assignMyInfo?.current_try_count ?? 0) >= assignGroupInfo.max_try_count
    ) {
      return true;
    }
    return false;
  }

  function checkDeadline() {
    if (assignGroupInfo.deadline < new Date()) {
      return true;
    }
    return false;
  }
  return (
    <>
      <HoverCardDemo
        triggerClassName="w-full max-w-[420px] "
        trigger={
          <div onClick={() => setIsOpen(true)}>
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
        <div>
          {assignMyInfo?.is_finished && isCountExceeded && (
            <p className="text-red-600">Попытки закончились</p>
          )}

          <p className={cn(isDeadlinePassed ? "text-red-600" : "")}>
            <span>Дедлайн: </span>
            {assignGroupInfo.deadline.toLocaleString("ru-RU", {
              timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            })}
          </p>
          {bestResult && <p>Лучший результат: {bestResult.grade}%</p>}
        </div>
      </HoverCardDemo>

      <AlertDialogComponent
        title="Создание блока"
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        description={
          !assignMyInfo?.is_finished
            ? "Вы уверены, что хотите продолжить?"
            : "Вы уверены, что хотите начать?"
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
