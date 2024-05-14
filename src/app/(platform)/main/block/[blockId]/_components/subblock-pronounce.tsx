"use client";

import { SubblockOrderData } from "../page";

interface SubblockPronounceProps {
  blockId: number;
  subblock: SubblockOrderData;
}

const SubblockPronounce = ({ blockId, subblock }: SubblockPronounceProps) => {
  return (
    <div className="mx-2 p-4 border border-black rounded-xl">
      <p className="text-xl font-bold text-center">
        {subblock.subblock_pronounce?.name}
      </p>
    </div>
  );
};

export default SubblockPronounce;
