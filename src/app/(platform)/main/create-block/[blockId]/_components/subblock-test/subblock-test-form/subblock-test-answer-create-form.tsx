"use client";

import { createAnswerTest } from "@/actions/create-answer-test";
import { useAction } from "@/hooks/use-action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface SubblockTestAnswerCreateFormProps {
  question_test_id: number;
  order: number;
  answer_tests_length: number;
}

const SubblockTestAnswerCreateForm = ({
  question_test_id,
  order,
  answer_tests_length,
}: SubblockTestAnswerCreateFormProps) => {
  const router = useRouter();

  const { execute: executeCreateAnswerTest } = useAction(createAnswerTest, {
    onSuccess: () => {
      toast.success("Ответ добавлен");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onCreateAnswer = (formData: FormData) => {
    const questionTestId = formData.get("question_test_id");
    const order = formData.get("order");
    executeCreateAnswerTest({
      question_test_id: Number(questionTestId),
      order: Number(order),
    });
  };
  return (
    <>
      <form action={onCreateAnswer}>
        <button className="p-2 group flex items-center justify-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 group-hover:stroke-green-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <p className="group-hover:text-green-600 font-semibold">
            Добавить вопрос
          </p>
        </button>
        <input type="hidden" name="question_test_id" value={question_test_id} />
        <input type="hidden" name="order" value={answer_tests_length + 1} />
      </form>
    </>
  );
};

export default SubblockTestAnswerCreateForm;
