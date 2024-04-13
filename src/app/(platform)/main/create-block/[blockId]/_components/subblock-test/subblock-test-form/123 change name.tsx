"use client";

import { updateQuestionTest } from "@/actions/update-question-test";
import { useAction } from "@/hooks/use-action";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface SubblockTestQuestionChangeNameFormProps {
  disableEditing: () => void;
  enableEditing: () => void;
  question_test_id: number;
  order: number;
  block_id: number;
  question: string;
}

const SubblockTestQuestionChangeNameForm = ({
  disableEditing,
  enableEditing,
  question_test_id,
  order,
  block_id,
  question,
}: SubblockTestQuestionChangeNameFormProps) => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const { execute: executeUpdateQuestionTest } = useAction(updateQuestionTest, {
    onSuccess: () => {
      toast.success("Вопрос изменен");
      disableEditing();
      router.refresh();
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useOnClickOutside(formRef, disableEditing);
  useEventListener("keydown", onKeyDown);
  const onChangeQuestionNameSubmit = (formData: FormData) => {
    const questionTestId = formData.get("question_test_id");
    const order = formData.get("order");
    const blockId = formData.get("block_id");
    const question = formData.get("question");
    executeUpdateQuestionTest({
      question_test_id: Number(questionTestId),
      order: Number(order),
      block_id: Number(blockId),
      question: String(question),
    });
  };
  return (
    <>
      <form action={onChangeQuestionNameSubmit} ref={formRef}>
        <div className="flex gap-4 my-5 ">
          <FormTextarea
            id={question.question_test_id.toString()}
            ref={textareaRef}
            name="question"
            defaultValue={question.question}
          />
          <div className="flex flex-col justify-between items-center">
            <button
              type="submit"
              className="group hover:border-green-400 border-transparent border-2 rounded-full p-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 group-hover:stroke-green-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={disableEditing}
              className="group hover:border-red-400 border-transparent border-2 p-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 group-hover:stroke-red-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <input
          type="hidden"
          value={question.question_test_id}
          name="question_test_id"
        />
        <input type="hidden" value={blockId} name="block_id" />
      </form>
      ) : (
      <div className="flex gap-4 my-3 items-center">
        <p
          className="font-semibold cursor-pointer hover:bg-slate-200 py-1 px-3 rounded-md whitespace-pre text-wrap break-all"
          onClick={enableEditing}
        >
          {question.question}
        </p>
        <SubblockTestQuestionDeleteForm
          question_test_id={question.question_test_id}
        />
      </div>
    </>
  );
};
