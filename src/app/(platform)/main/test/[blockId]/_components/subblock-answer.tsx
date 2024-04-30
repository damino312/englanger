"use client";

import { Label } from "@/app/_components/ui/label";
import { RadioGroupItem } from "@/app/_components/ui/radio-group";
import { AnswerTest } from "@prisma/client";

interface SubblockTestAnswerProps {
  answer: AnswerTest;
  index: number;
}

const SubblockAnswer = ({ answer, index }: SubblockTestAnswerProps) => {
  return (
    <div className="flex gap-3 items-center">
      <RadioGroupItem
        value={String(answer.answer_test_id)}
        id={"a" + String(answer.answer_test_id)}
      />
      <Label
        htmlFor={"a" + String(answer.answer_test_id)}
        className="break-all text-lg font-normal"
      >
        {answer.name}
      </Label>
    </div>
  );
};

export default SubblockAnswer;
