"use client";

import { useRef, useState } from "react";
import { SubblockOrderData } from "../../page";
import { FormInput } from "@/app/_components/form/form-input";
import { toast } from "sonner";
import { updateSubblockPronounce } from "@/actions/update-subblock-pronounce";
import { useAction } from "@/hooks/use-action";
import SubblockDeleteForm from "../subblock-delete-form";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import SubblockPronounceItem from "./subblock-pronounce-item";
import { createPronounceItem } from "@/actions/create-pronounce-item";
import { useRouter } from "next/navigation";

interface SubblockPronounceProps {
  blockId: number;
  subblock: SubblockOrderData;
}

const SubblockPronounce = ({ blockId, subblock }: SubblockPronounceProps) => {
  const router = useRouter();
  const [isNameEditing, setIsNameEditing] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const { execute: executeUpdateSubblockPronounce } = useAction(
    updateSubblockPronounce,
    {
      onSuccess: () => {
        onDisableChangeTitle();
        toast.success("Название подблока изменено");
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const { execute: executeCreatePronounceItem } = useAction(
    createPronounceItem,
    {
      onSuccess: () => {
        toast.success("Добавлено произношение");
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  useOnClickOutside(titleInputRef, onDisableChangeTitle);
  useEventListener("keydown", onKeyDown);

  function onChangeTitle() {
    setIsNameEditing(true);
    setTimeout(() => {
      titleInputRef.current?.focus();
    });
  }

  function onDisableChangeTitle() {
    setIsNameEditing(false);
    titleInputRef.current?.blur();
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      onDisableChangeTitle();
    }
  }

  function handleChangeTitleAction(formData: FormData) {
    const pronounceSubblockTitle = formData.get("pronounceSubblockTitle");

    executeUpdateSubblockPronounce({
      subblock_pronounce_id: subblock.subblock_pronounce_id as number,
      name: String(pronounceSubblockTitle),
      description: subblock.subblock_pronounce?.description as string | null,
    });
  }
  function handleCreatePronounceItem(formData: FormData) {
    executeCreatePronounceItem({
      subblock_pronounce_id: subblock.subblock_pronounce_id as number,
    });
  }

  return (
    <div className="mx-2 mb-8 border border-black rounded-xl px-4 pt-2 ">
      <div className="mb-4">
        {isNameEditing ? (
          <form
            action={handleChangeTitleAction}
            className="mx-10 max-w-full min-w-[150px] mt-3  "
          >
            <FormInput
              id="pronounceSubblockTitle"
              name="pronounceSubblockTitle"
              ref={titleInputRef}
              defaultValue={subblock.subblock_pronounce?.name as string}
            />
          </form>
        ) : (
          <div className="flex justify-between">
            <h3
              className="text-2xl ml-12 font-semibold text-left break-all"
              onClick={onChangeTitle}
            >
              Название подблока: {subblock.subblock_pronounce?.name}
            </h3>
            <SubblockDeleteForm
              subblockId={subblock?.subblock_pronounce_id as number}
              type={2}
            />
          </div>
        )}
      </div>

      {subblock.subblock_pronounce?.pronounce_items?.map(
        (pronounceItem, index) => (
          <SubblockPronounceItem
            key={pronounceItem.pronounce_item_id}
            subblockPronounceId={pronounceItem.subblock_pronounce_id}
            pronounceItemId={pronounceItem.pronounce_item_id}
            name={pronounceItem.name}
            value={pronounceItem.value}
            index={index}
          />
        )
      )}
      <form
        action={handleCreatePronounceItem}
        className="w-full flex justify-center mt-4 "
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
      </form>
    </div>
  );
};
export default SubblockPronounce;
