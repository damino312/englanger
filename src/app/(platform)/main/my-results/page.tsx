import { Badge } from "@/app/_components/ui/badge";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface ProcessedGrade {
  block_name: string;
  block_id: number;
  block_max_try?: number;
  block_deadline: Date;
  grade: {
    learning_outcome_id: number;
    grade: number;
    finished_at: Date;
  }[];
}

const MyResultsPage = async () => {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user.user_id);
  const roleId = Number(session?.user.role_id);
  const groupId = Number(session?.user.group_id);

  if (roleId !== 1) {
    redirect("/main");
  }

  const grades = await db.learningOutcome.findMany({
    where: {
      user_id: userId,
    },
    include: {
      block: {
        include: {
          assign_block_groups: {
            where: {
              group_id: groupId,
            },
            take: 1,
          },
        },
      },
    },
    orderBy: {
      learning_outcome_id: "desc",
    },
  });

  const processedGrades: ProcessedGrade[] = [];

  grades.forEach((grade) => {
    const foundValue = processedGrades.find(
      (item) => item.block_id == grade.block_id
    );
    if (!foundValue) {
      processedGrades.push({
        block_name: grade.block.name,
        block_id: grade.block_id,
        block_max_try: grade.block.assign_block_groups?.[0]?.max_try_count,
        block_deadline: grade.block.assign_block_groups?.[0]?.deadline,
        grade: [
          {
            learning_outcome_id: grade.learning_outcome_id,
            grade: grade.grade,
            finished_at: grade.finished_at,
          },
        ],
      });
    } else {
      processedGrades.forEach((item) => {
        if (item.block_id === grade.block_id) {
          item.grade.push({
            learning_outcome_id: grade.learning_outcome_id,
            grade: grade.grade,
            finished_at: grade.finished_at,
          });
        }
      });
    }
  });

  return (
    <div>
      <h2 className=" text-center font-bold text-3xl">Мои результаты</h2>
      <div className="px-32 w-full  flex  ">
        {processedGrades &&
          processedGrades.map((grade, index) => (
            <div key={grade.block_id} className="mb-2">
              <h2 className=" font-semibold text-2xl">
                {index + 1}. {grade.block_name}
              </h2>
              <div className="ml-6 flex flex-col gap-1">
                <h3>
                  {grade?.block_max_try && (
                    <p className="font-semibold">
                      Макс. попыток: {grade.block_max_try}
                    </p>
                  )}
                </h3>
                <h3>
                  {grade?.block_deadline && (
                    <p className="font-semibold">
                      Дедлайн:{" "}
                      {grade.block_deadline.toLocaleString("ru-RU", {
                        timeZone:
                          Intl.DateTimeFormat().resolvedOptions().timeZone,
                      })}
                    </p>
                  )}
                </h3>
                <h3 className="font-semibold">Правильные ответы, %</h3>
                <div className="flex gap-2">
                  {grade.grade.map((item) => (
                    <Badge
                      title={item.finished_at.toLocaleString("ru-RU", {
                        timeZone:
                          Intl.DateTimeFormat().resolvedOptions().timeZone,
                      })}
                      className={cn(
                        item.grade < 50 && "bg-red-500 hover:bg-red-600",
                        item.grade >= 50 && "bg-yellow-500 hover:bg-yellow-600",
                        item.grade >= 80 && "bg-green-500 hover:bg-green-600"
                      )}
                      key={item.learning_outcome_id}
                    >
                      {item.grade}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyResultsPage;
