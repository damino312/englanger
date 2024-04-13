"use client"

import { useAction } from "@/hooks/use-action";
import { SubblockOrderData } from "../page";
import { createQuestionTest } from "@/actions/create-question-test";
import { useRef } from "react";
import { toast } from "sonner";
import SubblockTestQuestion from "./subblock-test-question";

//TODO ЗАПРЕТИТЬ ДОБАВЛЕНИЕ НОВЫЙ ВОПРОСОВ, ПОКА ДОБАВЛЕНИЕ СТАРОГО В ОБРАБОТКЕ
const SubblockTest = ({subblock, blockId} : {subblock: SubblockOrderData, blockId: number}) => {

  const addQuestionRef = useRef<HTMLFormElement>(null);

  const {execute: createQuestionTestExecute} = useAction(createQuestionTest, {
    onSuccess: () => {
      toast.success("Вопрос добавлен");
    },
    onError: (error) => {
      toast.error(error);
    },
  })

  const onCreatingQuestion = (formData: FormData) => {
    const subblockTestId = formData.get("subblock_test_id");
    const order = formData.get("order");
    const blockId = formData.get("block_id");
    createQuestionTestExecute({
      subblock_test_id: Number(subblockTestId),
      order: Number(order),
      block_id: Number(blockId)
    })
  }
  return (
    <div className="border p-2 mx-2">
      {subblock.subblock_test?.test_questions.sort( (a, b) => a.order - b.order).map((question) => 
        <SubblockTestQuestion key={question.question_test_id} question={question} blockId={blockId} />
      )}
      <form
        action={onCreatingQuestion}
        className="w-full flex justify-center mb-2 "
        ref={addQuestionRef}
      >
        <button className="min-w-[90px] flex justify-center  rounded-b-md  bg-slate-100 hover:bg-slate-200 hover:border-slate-200 transition-background cursor-pointer rounded-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
        <input
          type="hidden"
          name="subblock_test_id"
          value={subblock.subblock_test_id as number}
        />
        <input
          type="hidden"
          name="order"
          value={(subblock.subblock_test?.test_questions.length ?? 0) + 1}
        />
        <input type="hidden" name="block_id" value={blockId} />
      </form>
    </div>
  );
};

export default SubblockTest;
