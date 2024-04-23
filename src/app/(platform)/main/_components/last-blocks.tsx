import { Block } from "@prisma/client";
import { LastBlocksItem } from "./last-blocks-item";
import BlockItem from "../teaching/_components/block-item";

interface LastBlocksProps {
  blocks?: Block[];
}

export const LastBlocks = ({ blocks }: LastBlocksProps) => {
  return (
    <div className="w-full h-[180px] bg-slate-200 rounded-2xl">
      <div className="h-full grid grid-cols-4 gap-4 content-center justify-items-stretch px-8">
        {blocks &&
          blocks.map((block) => (
            <BlockItem key={block.block_id} block={block} hideDelete={true} />
          ))}
      </div>
    </div>
  );
};
