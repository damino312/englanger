"use client";

import { QuestionTestData } from "../page";
import SubblockTestAnswer from "./subblock-test-answer";
import { useRef, useState } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { useAction } from "@/hooks/use-action";
import { updateQuestionTest } from "@/actions/update-question-test";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteQuestionTest } from "../../../../../../actions/delete-question-test/index";
import { createAnswerTest } from "@/actions/create-answer-test";
import { FormInput } from "@/app/_components/form/form-input";

const SubblockTestQuestion = ({
  question,
  blockId,
}: {
  question: QuestionTestData;
  blockId: number;
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

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

  const { execute: executeDeleteQuestionTest } = useAction(deleteQuestionTest, {
    onSuccess: () => {
      toast.success("Вопрос удален");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: exectueCreateAnswerTest } = useAction(createAnswerTest, {
    onSuccess: () => {
      toast.success("Ответ добавлен");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };
  const disableEditing = () => {
    setIsEditing(false);
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

  const onDeleteQuestionSubmit = (formData: FormData) => {
    const questionTestId = formData.get("question_test_id");
    executeDeleteQuestionTest({
      question_test_id: Number(questionTestId),
    });
  };

  const onCreateAnswer = (formData: FormData) => {
    const questionTestId = formData.get("question_test_id");
    const order = formData.get("order");
    exectueCreateAnswerTest({
      question_test_id: Number(questionTestId),
      order: Number(order),
    });
  };

  return (
    <div className="ml-4 ">
      {isEditing ? (
        <form action={onChangeQuestionNameSubmit} ref={formRef}>
          <FormInput
            id={question.question_test_id.toString()}
            ref={inputRef}
            className="min-w-[100px] my-5"
            name="question"
            defaultValue={question.question}
          />
          <input
            type="hidden"
            value={question.question_test_id}
            name="question_test_id"
          />
          <input type="hidden" value={blockId} name="block_id" />
        </form>
      ) : (
        <div className="flex gap-4 items-center my-3">
          <p
            className="font-semibold cursor-pointer hover:bg-slate-200 py-1 px-3 rounded-md "
            onClick={enableEditing}
          >
            {question.question}
          </p>
          <form action={onDeleteQuestionSubmit}>
            <button className="group p-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7 group-hover:stroke-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <input
                type="hidden"
                name="question_test_id"
                value={question.question_test_id}
              />
            </button>
          </form>
        </div>
      )}

      {question.answer_tests
        .sort((a, b) => a.order - b.order)
        .map((answer, index) => (
          <SubblockTestAnswer
            key={answer.answer_test_id}
            answer={answer}
            questionId={question.question_test_id}
            index={index}
          />
        ))}
      <form action={onCreateAnswer}>
        <button className="ml-1 mt-1 p-2 group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7 group-hover:stroke-green-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
        <input
          type="hidden"
          name="question_test_id"
          value={question.question_test_id}
        />
        <input
          type="hidden"
          name="order"
          value={question.answer_tests.length + 1}
        />
      </form>
    </div>
  );
};
export default SubblockTestQuestion;
