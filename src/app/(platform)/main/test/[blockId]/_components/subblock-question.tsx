"use client";

import { RadioGroup } from "@/app/_components/ui/radio-group";
import { QuestionTestData } from "../../../block/[blockId]/page";
import SubblockAnswer from "./subblock-answer";

const SubblockQuestion = ({
  question,
  index,
}: {
  question: QuestionTestData;
  index: number;
}) => {
  return (
    <div className="mb-2">
      <>
        <span className="font-semibold text-lg">{index + 1}) </span>
        <span className="break-all font-semibold text-lg">
          {question.question}
        </span>
      </>
      <RadioGroup name={String(question.question_test_id)}>
        {question.answer_tests.map((answer) => (
          <SubblockAnswer
            answer={answer}
            index={index}
            key={answer.answer_test_id}
          />
        ))}
      </RadioGroup>
    </div>
  );
};

export default SubblockQuestion;
