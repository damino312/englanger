"use client";

import { Button } from "@/app/_components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import axios from "axios";
import { useState } from "react";

const BlockSaveContainer = ({ blockId }: { blockId: number }) => {
  const router = useRouter();
  const handleSaveBlock = async (blockId: number) => {
    try {
      if (!blockId) {
        throw new Error("Block not found");
      }
      const updatedBlock = await axios.post("/api/block/save-block", {
        blockId: blockId,
      });
      router.push("/teaching");
      toast.success("Блок сохранен");
    } catch (error) {
      toast.error("Ошибка при сохранении блока");
    }
  };
  return (
    <div className="w-full px-10 flex justify-end">
      <Button onClick={() => handleSaveBlock(blockId)}>Сохранить</Button>
    </div>
  );
};

export default BlockSaveContainer;
