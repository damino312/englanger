"use client";

import { deleteQuestionTest } from "@/actions/delete-question-test";
import { useAction } from "@/hooks/use-action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface SubblockTestQuestionDeleteFormProps {
  question_test_id: number;
}

const SubblockTestQuestionDeleteForm = ({
  question_test_id,
}: SubblockTestQuestionDeleteFormProps) => {
  const router = useRouter();
  const { execute: executeDeleteQuestionTest } = useAction(deleteQuestionTest, {
    onSuccess: () => {
      toast.success("Вопрос удален");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const onDeleteQuestionSubmit = (formData: FormData) => {
    const questionTestId = formData.get("question_test_id");
    executeDeleteQuestionTest({
      question_test_id: Number(questionTestId),
    });
  };
  return (
    <>
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
            value={question_test_id}
          />
        </button>
      </form>
    </>
  );
};

export default SubblockTestQuestionDeleteForm;
