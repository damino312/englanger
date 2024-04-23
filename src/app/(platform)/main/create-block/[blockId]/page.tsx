import { db } from "@/lib/db";
import CreateSubblockContainer from "./_components/create-subblock-container";
import {
  AnswerTest,
  Block,
  QuestionTest,
  SubblockDescription,
  SubblockOrder,
  SubblockTest,
} from "@prisma/client";
import SubblockContainer from "./_components/subblocks-container";
import BlockSaveContainer from "./_components/block-save-container";

export interface BlockData extends Block {
  subblock_orders: SubblockOrderData[];
}

export interface SubblockOrderData extends SubblockOrder {
  subblock_test: SubblockTestData | null;
  subblock_description: SubblockDescription | null;
}

export interface SubblockTestData extends SubblockTest {
  test_questions: QuestionTestData[];
}

export interface QuestionTestData extends QuestionTest {
  answer_tests: AnswerTest[];
}

const CreateBlockPage = async ({ params }: { params: { blockId: string } }) => {
  const blockId = Number(params.blockId);
  const block = await db.block.findUnique({
    where: {
      block_id: blockId,
    },
    include: {
      subblock_orders: {
        include: {
          subblock_test: {
            include: {
              test_questions: {
                include: {
                  answer_tests: true,
                },
              },
            },
          },
          subblock_description: true,
        },
      },
    },
  });

  const subblocksLength = block?.subblock_orders.length;

  return (
    <div className="w-full h-full pb-10">
      <SubblockContainer data={block} />
      <CreateSubblockContainer subblocksLength={subblocksLength} />
      <BlockSaveContainer blockId={blockId} />
    </div>
  );
};

export default CreateBlockPage;
