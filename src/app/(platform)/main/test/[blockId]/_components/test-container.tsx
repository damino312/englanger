"use client";

import { useAction } from "@/hooks/use-action";
import { BlockData } from "../../../block/[blockId]/page";
import SubblockTest from "./subblock-test";
import { finishBlock } from "@/actions/finish-block";
import { Button } from "@/app/_components/ui/button";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import SubblockPronounce from "./subblock-pronounce";

interface TestContainerProps {
  block: BlockData;
}

type Answer = {
  question_id: number;
  answer_id: number;
};

const TestContainer = ({ block }: TestContainerProps) => {
  const session = useSession();
  const router = useRouter();
  const userId = Number(session.data?.user.user_id);
  const { execute } = useAction(finishBlock, {
    onSuccess: () => {
      toast.success("Тест завершен");
      router.push("/main");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onAction = (formData: FormData) => {
    const answerArray: Answer[] = [];
    for (const [key, value] of formData.entries()) {
      answerArray.push({ question_id: Number(key), answer_id: Number(value) });
    }
    const studentId = userId;
    const blockId = block.block_id;
    execute({
      student_id: studentId,
      block_id: blockId,
      answer_array: answerArray,
    });
  };
  return (
    <>
      <form action={onAction}>
        {block.subblock_orders.map((subblock) => {
          if (subblock.subblock_test_id) {
            return (
              <SubblockTest
                key={subblock.subblock_test_id}
                subblock={subblock}
              />
            );
          }
          if (subblock.subblock_pronounce_id) {
            return (
              <SubblockPronounce
                key={subblock.subblock_pronounce_id}
                subblock={subblock}
              />
            );
          }
        })}
        <Button>Завершить</Button>
      </form>
    </>
  );
};

export default TestContainer;
