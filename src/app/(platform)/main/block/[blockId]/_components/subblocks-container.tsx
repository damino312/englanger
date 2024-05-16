"use client";

import { useRef, useState } from "react";
import { BlockData } from "../page";
import SubblockTest from "./subblock-test/subblock-test";
import { Input } from "@/app/_components/ui/input";
import { toast } from "sonner";
import { updateBlock } from "@/actions/update-block";
import { useAction } from "@/hooks/use-action";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { useRouter } from "next/navigation";
import SubblockPronounce from "./subblock-pronounce";

const SubblockContainer = ({ data }: { data: BlockData | null }) => {
  const router = useRouter();

  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { execute } = useAction(updateBlock, {
    onSuccess: () => {
      setIsEditing(false);
      router.refresh();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onRenameBlock = (formData: FormData) => {
    const blockId = formData.get("blockId");
    const name = formData.get("name");
    execute({ block_id: Number(blockId), name: name as string });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableRenaming();
    }
  };

  const enableRenaming = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableRenaming = () => {
    setIsEditing(false);
  };

  useOnClickOutside(formRef, () => {
    disableRenaming();
  });

  useEventListener("keydown", onKeyDown);

  if (!data) {
    return null;
  }

  return (
    <div className="h-full mx-8">
      {isEditing ? (
        <form action={onRenameBlock} ref={formRef}>
          <Input
            className="h-10 m-2 "
            name="name"
            defaultValue={data.name}
            ref={inputRef}
          />
          <input type="hidden" name="blockId" value={data.block_id} />
        </form>
      ) : (
        <h1
          onClick={enableRenaming}
          className=" text-center font-semibold text-2xl mb-4 break-all"
        >
          Название блока: {data.name}
        </h1>
      )}

      {data &&
        data.subblock_orders
          .sort((a, b) => a.order - b.order)
          .map((subblock) => {
            console.log(subblock);
            if (subblock.subblock_pronounce_id) {
              return (
                <SubblockPronounce
                  blockId={data.block_id}
                  subblock={subblock}
                  key={subblock.subblock_pronounce_id}
                />
              );
            }
            if (subblock.subblock_test_id) {
              return (
                <SubblockTest
                  key={subblock.subblock_test_id}
                  subblock={subblock}
                  blockId={data.block_id}
                />
              );
            }
          })}
    </div>
  );
};

export default SubblockContainer;
