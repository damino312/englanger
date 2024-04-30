"use client";

import { deleteBlock } from "@/actions/delete-block";
import { ConfirmModal } from "@/app/_components/confirm-modal";
import { useAction } from "@/hooks/use-action";
import { Group } from "@prisma/client";
import clsx from "clsx";
import Link from "next/link";
import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import AssingBlockModal from "./assign-block-modal";
import { AssignBlockData } from "../page";

const BlockItem = ({
  block,
  hideExtraFields = false,
  groups = [],
}: {
  groups?: Group[];
  block: AssignBlockData;
  hideExtraFields?: boolean;
}) => {
  const { pending } = useFormStatus();
  const [openModal, setOpenModal] = useState(false);
  const [openAssignModal, setOpenAssignModal] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const { execute } = useAction(deleteBlock, {
    onSuccess: () => {
      toast.success("Блок удален");
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const onDeleteBlock = (formData: FormData) => {
    const blockId = formData.get("block_id");
    execute({ block_id: Number(blockId) });
  };
  return (
    <>
      <Link
        href={"/main/block/" + block.block_id}
        className={clsx(
          " max-w-[420px] min-h-[120px] h-full font-semibold  rounded-lg shadow-md p-4  transition-background ",
          block.is_saved
            ? "bg-green-300 hover:bg-green-200"
            : "bg-slate-300 hover:bg-slate-200"
        )}
      >
        <div className="flex justify-between items-center">
          {block.is_saved && !hideExtraFields ? (
            <button
              className="border border-transparent rounded-lg  z-10 p-1 font-medium text-xs hover:text-white hover:bg-blue-500 transition-background transition-colors"
              onClick={(ev) => {
                ev.preventDefault();
                setOpenAssignModal(true);
              }}
            >
              Назначить
            </button>
          ) : (
            <span className="text-xs">{block.is_saved ? "" : "Черновик"}</span>
          )}
          <p className=" text-xs">{block.created_at.toLocaleString("ru-RU")}</p>
        </div>
        <div className="min-h-[80px] h-full flex items-center justify-between gap-3">
          <p className="text-lg break-all line-clamp-2" title={block.name}>
            {block.name}
          </p>
          {!hideExtraFields && (
            <form
              action={onDeleteBlock}
              onClick={(e) => e.stopPropagation()}
              ref={formRef}
            >
              <input type="hidden" name="block_id" value={block.block_id} />
              <button
                type="button"
                onClick={(ev) => {
                  ev.preventDefault();
                  setOpenModal(true);
                }}
                className={clsx(
                  " group p-1 border-2 border-transparent hover:border-red-600 rounded-xl",
                  pending ? "border-gray-600 cursor-wait " : "currentColor"
                )}
                disabled={pending}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={clsx(
                    "w-6 h-6 group-hover:stroke-red-600",
                    pending ? "stroke-gray-600 " : "currentColor"
                  )}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                  />
                </svg>
              </button>
              <ConfirmModal
                isOpen={openModal}
                onOpenChange={setOpenModal}
                title="Удалить блок?"
                description="Вы уверены, что хотите удалить этот блок?"
                onSubmit={() => formRef.current?.requestSubmit()}
              />
            </form>
          )}
        </div>
      </Link>
      <AssingBlockModal
        groups={groups}
        isOpen={openAssignModal}
        setIsOpen={setOpenAssignModal}
        blockId={block.block_id}
        assignments={block.assign_block_groups}
      />
    </>
  );
};

export default BlockItem;
