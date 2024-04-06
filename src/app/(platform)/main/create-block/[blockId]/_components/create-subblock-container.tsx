"use client";

import { useState } from "react";
import SubblockPicker from "./subblock-picker";
import { useParams, useRouter } from "next/navigation";
import { useAction } from "@/hooks/use-action";
import { createSubblockTest } from "@/actions/create-subblock-test";
import { toast } from "sonner";

const CreateSubblockContainer = () => {
  const params = useParams();
  const router = useRouter();

  const [showSubblockPicker, setShowSubblockPicker] = useState<boolean>(false);
  const [selectedSubblockId, setSelectedSubblockId] = useState<number>(0);

  const { execute: executeCreateSubblockTest } = useAction(createSubblockTest, {
    onSuccess: () => {
      setSelectedSubblockId(0);
      setShowSubblockPicker(false);
      toast.success("Тестовый блок создан");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onTestSubmit = (formData: FormData) => {
    const blockId = formData.get("blockId");
    const subblockId = formData.get("selectedSubblockId");
    console.log(blockId);

    executeCreateSubblockTest({
      blockId: Number(blockId),
      subblockTypeId: Number(subblockId),
      name: "test",
      order: 1,
    });
  };
  const onDescriptionSubmit = (formData: FormData) => {};
  const onPronounicationSubmit = (formData: FormData) => {};

  const onSubmit = (formData: FormData) => {
    const subblockId = formData.get("selectedSubblockId");
    if (Number(subblockId) === 1) onTestSubmit(formData);
    if (Number(subblockId) === 2) onDescriptionSubmit(formData);
    if (Number(subblockId) === 3) onPronounicationSubmit(formData);
  };
  return (
    <div className="w-full flex justify-center px-10">
      <form action={onSubmit} className="flex flex-col items-center">
        {showSubblockPicker && (
          <SubblockPicker setSelectedSubblockId={setSelectedSubblockId} />
        )}
        <div
          className="w-[420px] border-b border-x rounded-b-md  shadow-xl  flex justify-center py-3  bg-slate-100 hover:bg-slate-200 hover:border-slate-200  transition-background cursor-pointer   "
          onClick={() => setShowSubblockPicker(!showSubblockPicker)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-14 h-14"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        <input type="hidden" name="blockId" value={params.blockId} />
        <input
          type="hidden"
          name="selectedSubblockId"
          value={selectedSubblockId}
        />
      </form>
    </div>
  );
};

export default CreateSubblockContainer;
