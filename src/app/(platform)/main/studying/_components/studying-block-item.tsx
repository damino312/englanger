"use client";

import { ExtendedBlock } from "./studying-block-container";

interface StudyingBlockItemProps {
  block: ExtendedBlock;
}

const StudyingBlockItem = ({ block }: StudyingBlockItemProps) => {
  const assignGroupInfo = block.assign_block_groups?.[0];
  const assignMyInfo = assignGroupInfo?.assign_block_users?.[0];
  console.log(assignGroupInfo);
  return (
    <div className="h-[180px] max-w-[300px] bg-slate-200 rounded-md">
      <div className="flex justify-between">
        <span>{block.name}</span>
        <span>
          Попытки
          {assignMyInfo?.current_try_count ? assignMyInfo.current_try_count : 0}
          / <span>{assignGroupInfo.max_try_count}</span>
        </span>
      </div>
    </div>
  );
};

export default StudyingBlockItem;
