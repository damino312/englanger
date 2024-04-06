import { db } from "@/lib/db";
import CreateSubblock from "./_components/create-subblock-container";
import {
  Block,
  SubblockDescription,
  SubblockOrder,
  SubblockTest,
} from "@prisma/client";
import SubblockContainer from "./_components/subblocks-container";

export interface BlockData extends Block {
  subblock_orders: SobblockOrderData[];
}

interface SobblockOrderData extends SubblockOrder {
  subblock_test: SubblockTest | null;
  subblock_description: SubblockDescription | null;
}

const CreateBlockPage = async ({ params }: { params: { blockId: string } }) => {
  const block: BlockData | null = await db.block.findUnique({
    where: {
      block_id: Number(params.blockId),
    },
    include: {
      subblock_orders: {
        include: {
          subblock_test: true,
          subblock_description: true,
        },
      },
    },
  });

  return (
    <div>
      <SubblockContainer data={block} />
      <CreateSubblock />
    </div>
  );
};

export default CreateBlockPage;
