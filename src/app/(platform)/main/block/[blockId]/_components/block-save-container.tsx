"use client";

import { Button } from "@/app/_components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";

const BlockSaveContainer = ({
  blockId,
  subblockCount,
}: {
  blockId: number;
  subblockCount: number;
}) => {
  const router = useRouter();
  const handleSaveBlock = async (blockId: number) => {
    if (!validation(subblockCount)) return;
    try {
      if (!blockId) {
        throw new Error("Block not found");
      }
      const updatedBlock = await axios.post("/api/block/save-block", {
        blockId: blockId,
      });
      router.push("/main/teaching");
      toast.success("Блок сохранен");
    } catch (error) {
      toast.error("Ошибка при сохранении блока");
    }
  };

  const validation = (subblockCount: number) => {
    if (subblockCount === 0) {
      toast.error("Добавьте хотя бы один подблок");
      return false;
    }
    return true;
  };
  return (
    <div className="w-full px-32 flex justify-end">
      <Button onClick={() => handleSaveBlock(blockId)}>Сохранить</Button>
    </div>
  );
};

export default BlockSaveContainer;
