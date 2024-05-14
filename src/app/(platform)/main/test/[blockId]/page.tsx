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
          subblock_pronounce: true,
        },
      },
    },
  });

  if (!block) {
    redirect("/main");
  }

  return (
    <div className="w-full h-full px-32">
      <TestContainer block={block as any} />
    </div>
  );
};

export default TestPage;
