"use client";

import { deleteBlock } from "@/actions/delete-block";
import { useAction } from "@/hooks/use-action";
import { Block } from "@prisma/client";
import clsx from "clsx";
import Link from "next/link";
import { toast } from "sonner";

const BlockItem = ({ block }: { block: Block }) => {
  const { execute } = useAction(deleteBlock, {
    onSuccess: () => {
      toast.success("Block deleted");
    },
    onError: () => {
      toast.error("Failed to delete block");
    },
  });
  const onDeleteBlock = (formData: FormData) => {
    const blockId = formData.get("block_id");
    execute({ block_id: Number(blockId) });
  };
  return (
    <Link
      href={"/main/create-block/" + block.block_id}
      className={clsx(
        "min-w-[320px] h-full font-semibold  rounded-lg shadow-md p-4  transition-background flex items-center justify-between",
        block.is_saved
          ? "bg-green-400 hover:bg-green-300"
          : "bg-slate-300 hover:bg-slate-200"
      )}
    >
      <p>{block.name}</p>
      <form action={onDeleteBlock} onClick={(e) => e.stopPropagation()}>
        <input type="hidden" name="block_id" value={block.block_id} />
        <button className=" group p-1 border-2 border-transparent hover:border-red-600 rounded-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6 group-hover:stroke-red-600"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
            />
          </svg>
        </button>
      </form>
    </Link>
  );
};

export default BlockItem;
