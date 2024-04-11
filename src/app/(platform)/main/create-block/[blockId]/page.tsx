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

export interface BlockData extends Block {
  subblock_orders: SobblockOrderData[];
}

interface SobblockOrderData extends SubblockOrder {
  subblock_test: SubblockTestData | null;
  subblock_description: SubblockDescription | null;
}

interface SubblockTestData extends SubblockTest {
  test_questions: QuestionTestData[];
}

interface QuestionTestData extends QuestionTest {
  answer_tests: AnswerTest[];
}

const CreateBlockPage = async ({ params }: { params: { blockId: string } }) => {
  const block = await db.block.findUnique({
    where: {
      block_id: Number(params.blockId),
    },
    include: {
      subblock_orders: {
        include: {
          subblock_test: {
            include: {
              test_questions: {
                include: {
                  answer_tests: true
                },
              }
            },
          },
          subblock_description: true,
        },
      },
    },
  });

  const subblocksLength = block?.subblock_orders.length;
  

  return (
    <div>
      <SubblockContainer data={block} />
      <CreateSubblockContainer subblocksLength={subblocksLength} />
    </div>
  );
};

export default CreateBlockPage;
