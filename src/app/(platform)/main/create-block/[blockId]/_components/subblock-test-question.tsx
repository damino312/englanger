"use client";

import { QuestionTestData } from "../page";
import SubblockTestAnswer from "./subblock-test-answer";

const SubblockTestQuestion = ({question}: {question: QuestionTestData}) => {
    return (
      <div className="ml-4 ">
        <p className="font-semibold mb-1">{question.question}</p>
        {question.answer_tests.map((answer, index) => (
          <SubblockTestAnswer
            key={answer.answer_test_id}
            answer={answer}
            questionId={question.question_test_id}
            index={index}
          />
        ))}
      </div>
    );
}
export default SubblockTestQuestion