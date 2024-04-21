"use client";

import { useAction } from "@/hooks/use-action";
import { SubblockOrderData } from "../../page";
import { createQuestionTest } from "@/actions/create-question-test";
import { useRef, useState } from "react";
import { toast } from "sonner";
import SubblockTestQuestion from "./subblock-test-question";
import { useRouter } from "next/navigation";
import SubblockDeleteForm from "../subblock-delete-form";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormInput } from "@/app/_components/form/form-input";
import { updateSubblockTest } from "@/actions/update-subblock-test";

//TODO ЗАПРЕТИТЬ ДОБАВЛЕНИЕ НОВЫЙ ВОПРОСОВ, ПОКА ДОБАВЛЕНИЕ СТАРОГО В ОБРАБОТКЕ
const SubblockTest = ({
  subblock,
  blockId,
}: {
  subblock: SubblockOrderData;
  blockId: number;
}) => {
  const router = useRouter();

  const [isRenaming, setIsRenaming] = useState<boolean>(false);

  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const addQuestionRef = useRef<HTMLFormElement>(null);

  const { execute: createQuestionTestExecute } = useAction(createQuestionTest, {
    onSuccess: () => {
      router.refresh();
      toast.success("Вопрос добавлен");
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const { execute: updateSubblockTestExecute } = useAction(updateSubblockTest, {
    onSuccess: () => {
      router.refresh();
      toast.success("Название подблока изменено");
      disableRenaming();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const enableRenaming = () => {
    setIsRenaming(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };
  const disableRenaming = () => {
    setIsRenaming(false);
  };
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableRenaming();
    }
  };

  useOnClickOutside(formRef, () => {
    disableRenaming();
  });

  useEventListener("keydown", onKeyDown);

  const onCreatingQuestion = (formData: FormData) => {
    const subblockTestId = formData.get("subblock_test_id");
    const order = formData.get("order");
    createQuestionTestExecute({
      subblock_test_id: Number(subblockTestId),
      order: Number(order),
    });
  };

  const onRenameSubblock = (formData: FormData) => {
    const subblockId = formData.get("subblock_order_id");
    const name = formData.get("name");
    const order = formData.get("order");

    updateSubblockTestExecute({
      subblock_order_id: Number(subblockId),
      name: String(name),
      order: Number(order),
    });
  };

  return (
    <div className="border border-black rounded-2xl p-2 mx-2 mb-8">
      <div className="flex items-center justify-between">
        {isRenaming ? (
          <form
            action={onRenameSubblock}
            ref={formRef}
            className="ml-12 min-w-[150px] max-w-full w-full "
          >
            <FormInput
              id="subblock_id"
              name="name"
              ref={inputRef}
              defaultValue={subblock.name as string}
            />
            <input
              type="hidden"
              name="subblock_order_id"
              value={subblock.subblock_order_id}
            />
            <input type="hidden" name="order" value={subblock.order} />
          </form>
        ) : (
          <div className="w-full flex items-center justify-between">
            <h3
              className="text-2xl ml-12 font-semibold"
              onClick={enableRenaming}
            >
              Название подблока: {subblock.name}
            </h3>
            <SubblockDeleteForm
              subblockId={subblock.subblock_test_id as number}
              type={1}
            />
          </div>
        )}
      </div>

      {subblock.subblock_test?.test_questions
        .sort((a, b) => a.order - b.order)
        .map((question, index) => (
          <SubblockTestQuestion
            key={question.question_test_id}
            question={question}
            blockId={blockId}
            index={index}
          />
        ))}
      <form
        action={onCreatingQuestion}
        className="w-full flex justify-center mb-2 "
        ref={addQuestionRef}
      >
        <button className="min-w-[90px] w-full max-w-2xl flex justify-center bg-slate-100 hover:bg-slate-200 hover:border-slate-200 transition-background cursor-pointer rounded-xl">
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
      </form>
    </div>
  );
};

export default SubblockTest;
