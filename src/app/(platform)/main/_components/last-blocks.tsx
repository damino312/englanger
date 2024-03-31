import { LastBlocksItem } from "./last-blocks-item";

export const LastBlocks = () => {
  return (
    <div className="w-full h-[240px] bg-slate-200 rounded-2xl">
      <div className="flex h-full gap-4 p-4">
        <LastBlocksItem />
        <LastBlocksItem />
        <LastBlocksItem />
        <LastBlocksItem />
      </div>
    </div>
  );
};
