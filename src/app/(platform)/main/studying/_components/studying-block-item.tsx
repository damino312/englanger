"use client";

import { cn } from "@/lib/utils";
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
  return (
    <div className="h-full text-lg">
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
            {assignMyInfo?.is_finished === false && <span>В процессе</span>}
          </div>
        </div>
      </button>
    </div>
  );
};

export default StudyingBlockItem;
