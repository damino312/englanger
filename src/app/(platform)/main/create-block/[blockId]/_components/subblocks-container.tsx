"use client"
import { Input } from "@nextui-org/react";
import { BlockData } from "../page";
import { useAction } from "@/hooks/use-action";
import { createQuestionTest } from "@/actions/create-question-test";
import { toast } from "sonner";
import { useRef } from "react";

const SubblockContainer = ({ data }: { data: BlockData | null }) => {

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

  if (!data) {
    return null;
  }



  return (
    <div className="my-4  h-full mx-8 border border-black">
      <h1 className=" text-center font-semibold text-2xl">{data.name}</h1>
      {data &&
        data.subblock_orders.map((subblock) => {
          if (subblock.subblock_test_id) {
            return (
              <div key={subblock.subblock_test_id} className="border p-2 mx-2">
                {subblock.subblock_test?.test_questions.map((question) => (
                  <div key={question.question_test_id} className="ml-4 ">
                    <p className="font-semibold mb-1">{question.question}</p>
                    {question.answer_tests.map((answer, index) => (
                      <div
                        key={answer.answer_test_id}
                        className="flex justify-start items-center mb-2"
                      >
                        <input
                          type="radio"
                          id={String(answer.answer_test_id)}
                          className="w-10"
                          name={`question_${question.question_test_id}`} // Указываем одинаковое имя для всех радио-кнопок
                          defaultChecked={answer.is_answer}
                        />
                        <label
                          htmlFor={String(answer.answer_test_id)}
                          className="flex gap-2"
                        >
                          <span>{index + 1})</span> <span>{answer.name}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                ))}
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
                    value={subblock.subblock_test_id}
                  />
                  <input
                    type="hidden"
                    name="order"
                    value={
                      (subblock.subblock_test?.test_questions.length ?? 0) + 1
                    }
                  />
                  <input type="hidden" name="block_id" value={data.block_id} />
                </form>
              </div>
            );
          }
        })}
    </div>
  );
};

export default SubblockContainer;
