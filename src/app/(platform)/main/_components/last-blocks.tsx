import { Block } from "@prisma/client";
import BlockTeachItem from "../teaching/_components/block-item";
import { ExtendedBlock } from "../studying/_components/studying-block-container";
import StudyingHoverCard from "../studying/_components/studying-hover-card";

interface LastBlocksProps {
  blocks?: Block[] | ExtendedBlock[];
  type: "study" | "teach";
}

export const LastBlocks = ({ blocks, type }: LastBlocksProps) => {
  return (
    <div className="w-full h-[180px] bg-slate-200 rounded-2xl">
      <div className="h-full grid grid-cols-4 gap-4 content-center justify-items-stretch px-8">
        {type === "teach" &&
          blocks &&
          blocks.map((block) => (
            <BlockTeachItem
              key={block.block_id}
              block={block}
              hideExtraFields={true}
            />
          ))}
        {type === "study" &&
          blocks &&
          blocks.map((block) => (
            <StudyingHoverCard
              key={block.block_id}
              block={block as ExtendedBlock}
            />
          ))}
      </div>
    </div>
  );
};
