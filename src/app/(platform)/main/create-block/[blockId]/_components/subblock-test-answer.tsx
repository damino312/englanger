"use client";

import { updateAnswerTest } from "@/actions/update-answer-test";
import { FormInput } from "@/app/_components/form/form-input";
import { Input } from "@/app/_components/ui/input";
import { useAction } from "@/hooks/use-action";
import { AnswerTest } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

const SubblockTestAnswer = ({
  answer,
  questionId,
  index,
}: {
  answer: AnswerTest;
  questionId: number;
  index: number;
}) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

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
      inputRef.current?.focus();
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
    const name = formData.get("name");
    const order = formData.get("order");
    const isAnswer = formData.get("is_answer");
    executeUpdateAnswerTest({
      answer_test_id: Number(answerTestId),
      name: String(name),
      order: Number(order),
      is_answer: Boolean(isAnswer),
    });
  };

  return (
    <div
      key={answer.answer_test_id}
      className="flex justify-start items-center mb-2"
    >
      <input
        type="radio"
        id={String(answer.answer_test_id)}
        className="w-10"
        name={`question_${questionId}`} // Указываем одинаковое имя для всех радио-кнопок
        defaultChecked={answer.is_answer}
      />

      <div className="flex gap-4">
        <label htmlFor={String(answer.answer_test_id)}>
          <span>{index + 1})</span>
        </label>
        {isEditing ? (
          <form action={onChangeName} ref={formRef}>
            <FormInput
              id={String(answer.answer_test_id)}
              defaultValue={answer.name}
              ref={inputRef}
              name="name"
            />
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
          </form>
        ) : (
          <span onClick={enableEditing} className="cursor-pointer">
            {answer.name}
          </span>
        )}
      </div>
    </div>
  );
};

export default SubblockTestAnswer;
