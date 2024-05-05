import { ExtendedBlock } from "./studying-block-container";
import StudyingBlockItem from "./studying-block-item";
import { HoverCardDemo } from "./hover-card";
import { cn } from "@/lib/utils";

interface StudyingHoverCardProps {
  block: ExtendedBlock;
}

const StudyingHoverCard = ({ block }: StudyingHoverCardProps) => {
  const assignGroupInfo = block.assign_block_groups?.[0];
  const assignMyInfo = assignGroupInfo?.assign_block_users?.[0];
  const lastResult = block.learning_outcomes?.[0];
  const isCountExceeded = checkTryCount();
  const isDeadlinePassed = checkDeadline();

  const bestResult = block.learning_outcomes?.reduce((prev, curr) =>
    prev?.grade > curr?.grade ? prev : curr
  );

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
        isContentHidden={!isCountExceeded && !isDeadlinePassed && !lastResult}
        triggerClassName="w-full max-w-[420px] "
        trigger={
          <StudyingBlockItem
            blockId={block.block_id}
            blockName={block.name}
            assignGroupInfo={assignGroupInfo}
            assignMyInfo={assignMyInfo}
            isCountExceeded={isCountExceeded}
            isDeadlinePassed={isDeadlinePassed}
          />
        }
      >
        <div>
          {isCountExceeded && (
            <p className="text-red-600">Попытки закончились</p>
          )}

          <p className={cn(isDeadlinePassed ? "text-red-600" : "")}>
            <span>Дедлайн: </span>
            {assignGroupInfo.deadline.toLocaleString("ru-RU", {
              timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            })}
          </p>
          {bestResult && <p>Лучший результат, % : {bestResult.grade}</p>}
        </div>
      </HoverCardDemo>
    </>
  );
};

export default StudyingHoverCard;
