"use client";

import { AnswerTest } from "@prisma/client";

const SubblockTestAnswer = ({answer, questionId, index}: {answer: AnswerTest, questionId: number, index: number}) => {
    return (
        <div
            key={answer.answer_test_id}
            className="flex justify-start items-center mb-2"
          >
            <input
              type="radio"
              id={String(answer.answer_test_id)}
              className="w-10"
              name={`question_${questionId}`} // Указываем одинаковое имя для всех радио-кнопок
              defaultChecked={answer.is_answer}
            />
            <label
              htmlFor={String(answer.answer_test_id)}
              className="flex gap-2"
            >
              <span>{index + 1})</span> <span>{answer.name}</span>
            </label>
          </div>
    )
}

export default SubblockTestAnswer