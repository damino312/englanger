import { db } from "@/lib/db";
import TestContainer from "./_components/test-container";
import { redirect } from "next/navigation";

const TestPage = async ({ params }: { params: { blockId: string } }) => {
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

  if (!block) {
    redirect("/main");
  }

  return (
    <>
      <TestContainer block={block} />
    </>
  );
};

export default TestPage;
