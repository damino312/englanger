"use client";

import { deleteAnswerTest } from "@/actions/delete-answer-test";
import { updateAnswerTest } from "@/actions/update-answer-test";
import { FormTextarea } from "@/app/_components/form/form-textarea";
import { useAction } from "@/hooks/use-action";
import { AnswerTest } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import axios from "axios";

interface SubblockTestAnswerProps {
  answer: AnswerTest;
  questionId: number;
  index: number;
}

const SubblockTestAnswer = ({
  answer,
  questionId,
  index,
}: SubblockTestAnswerProps) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const radioRef = useRef<HTMLInputElement>(null);

  const { execute: executeDeleteAnswerTest } = useAction(deleteAnswerTest, {
    onSuccess: () => {
      toast.success("Ответ удален");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const { execute: executeUpdateAnswerTest } = useAction(updateAnswerTest, {
    onSuccess: () => {
      toast.success("Ответ изменен");
      disableEditing();
      router.refresh();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };

  const disableEditing = () => {
    setIsEditing(false);
  };
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useOnClickOutside(formRef, disableEditing);
  useEventListener("keydown", onKeyDown);

  const onChangeName = (formData: FormData) => {
    const answerTestId = formData.get("answer_test_id");
    const questionTestId = formData.get("question_test_id");

    const name = formData.get("name");
    const order = formData.get("order");
    const isAnswer = formData.get("is_answer");
    executeUpdateAnswerTest({
      answer_test_id: Number(answerTestId),
      name: String(name),
      order: Number(order),
      is_answer: Boolean(isAnswer),
      question_test_id: Number(questionTestId),
      is_changing_right_answer: false,
    });
  };

  const onDeleteQuestionSubmit = (formData: FormData) => {
    const answerTestId = formData.get("answer_test_id");
    executeDeleteAnswerTest({
      answer_test_id: Number(answerTestId),
    });
  };

  const onToggleRightAnswer = async (
    questionId: number,
    answerId: number,
    is_true: boolean
  ) => {
    if (questionId && answerId) {
      try {
        const updatedValue = await axios.post(
          "/api/block/update-right-answer",
          {
            questionId,
            answerId,
          }
        );
        toast.success("Ответ изменился");
        router.refresh();
      } catch (error) {
        toast.error("Ошибка в изменении ответа");
        if (radioRef.current) {
          radioRef.current.checked = false;
        }
      }
    }
  };

  return (
    <div
      key={answer.answer_test_id}
      className="flex items-center mb-2 w-full whitespace-pre text-wrap"
    >
      <div className="flex  items-center">
        <input
          ref={radioRef}
          type="radio"
          id={String(answer.answer_test_id)}
          className="w-10"
          defaultChecked={answer.is_answer}
          name={`question` + questionId}
          onClick={() =>
            onToggleRightAnswer(
              questionId,
              answer.answer_test_id,
              answer.is_answer
            )
          }
        />

        <input type="hidden" name="question_test_id" value={questionId} />
        <input type="hidden" name="order" value={answer.order} />

        <label htmlFor={String(answer.answer_test_id)}>
          <span>{index + 1})</span>
        </label>
        {isEditing ? (
          <form action={onChangeName} ref={formRef}>
            <div className="ml-4 flex w-full gap-4 my-5 ">
              <FormTextarea
                id={answer.answer_test_id.toString()}
                ref={textareaRef}
                name="name"
                defaultValue={answer.name}
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
              name="answer_test_id"
              value={answer.answer_test_id}
            />
            <input type="hidden" name="order" value={answer.order} />
            <input
              type="hidden"
              name="is_answer"
              value={answer.is_answer ? 1 : 0}
            />
            <input type="hidden" name="question_test_id" value={questionId} />
          </form>
        ) : (
          <div className="flex px-2 items-center gap-4 ">
            <p
              className="w-full font-semibold cursor-pointer hover:bg-slate-200 py-1 px-3 rounded-md whitespace-pre text-wrap break-all"
              onClick={enableEditing}
            >
              {answer.name}
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
                  name="answer_test_id"
                  value={answer.answer_test_id}
                />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubblockTestAnswer;

// SubblockTestAnswer.displayName = "SubblockTestAnswer";
