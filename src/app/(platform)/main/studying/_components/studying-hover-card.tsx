import { ExtendedBlock } from "./studying-block-container";
import StudyingBlockItem from "./studying-block-item";
import { HoverCardDemo } from "./hover-card";

interface StudyingHoverCardProps {
  block: ExtendedBlock;
}

const StudyingHoverCard = ({ block }: StudyingHoverCardProps) => {
  const assignGroupInfo = block.assign_block_groups?.[0];
  const assignMyInfo = assignGroupInfo?.assign_block_users?.[0];
  const lastResult = block.learning_outcomes?.[0];
  const isCountExceeded = checkTryCount();
  const isDeadlinePassed = checkDeadline();
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
          {isDeadlinePassed && <p className="text-red-600">Деадлайн прошел</p>}
          {lastResult && <p>Последний результат, % : {lastResult.grade}</p>}
        </div>
      </HoverCardDemo>
    </>
  );
};

export default StudyingHoverCard;
