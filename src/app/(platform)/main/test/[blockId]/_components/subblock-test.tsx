"use client";

import { SubblockOrderData } from "@/app/(platform)/main/block/[blockId]/page";
import SubblockQuestion from "./subblock-question";

const SubblockTest = ({ subblock }: { subblock: SubblockOrderData }) => {
  return (
    <div>
      <p className="text-xl font-bold text-center">{subblock.name}</p>
      <div className="flex flex-col">
        {subblock.subblock_test?.test_questions.map((question, index) => (
          <SubblockQuestion
            index={index}
            key={question.question_test_id}
            question={question}
          />
        ))}
      </div>
    </div>
  );
};

export default SubblockTest;
