"use client";

import { SubblockOrderData } from "@/app/(platform)/main/block/[blockId]/page";
import SubblockPronounceItem from "./subblock-pronounce-item";

const SubblockPronounce = ({ subblock }: { subblock: SubblockOrderData }) => {
  return (
    <>
      {subblock.subblock_pronounce?.pronounce_items?.map((item) => (
        <SubblockPronounceItem key={item.pronounce_item_id} item={item} />
      ))}
    </>
  );
};

export default SubblockPronounce;
