import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ResultsContainer from "./_components/results-container";

type UsersResult = {
  grade: number;
  finished_at: Date;
};

export interface ResultsUser {
  user_id: number;
  user_name: string;
  current_try_count: number;
  assign_block_group_id: number;
  results: UsersResult[];
}

interface ResultsGroup {
  group_id: number;
  group_name: string;
  users: ResultsUser[];
}

export interface ProcessedResult {
  block_id: number;
  block_name: string;
  max_try_count: number;
  deadline: Date;
  time_limit: number;
  groups: ResultsGroup[];
}

interface Result {
  block_id: number;
  block_name: string;
  user_id: number;
  name: string;
  group_id: number;
  current_try_count: number;
  deadline: Date;
  time_limit: number;
  max_try_count: number;
  grade: number;
  finished_at: Date;
  assign_block_group_id: number;
  group_name: string;
}

const ResultsPage = async () => {
  const session = await getServerSession(authOptions);
  const roleId = Number(session?.user.role_id);
  const userId = Number(session?.user.user_id);

  if (roleId !== 2) {
    redirect("/main");
  }

  const results: Result[] = await db.$queryRaw`select
	b.block_id,
	b."name" as block_name,
	u.user_id,
	u.name,
	u.group_id,
	u.group_name,
	abu.current_try_count,
	abg.deadline,
	abg.time_limit,
	abg.max_try_count,
	abg.assign_block_group_id,
	lo.grade,
	lo.finished_at 
from
	"Block" b
join "AssignBlockGroup" abg 
on
	abg.block_id = b.block_id
join (
	select
		u.user_id,
		g.group_id,
		g.name as group_name,
		u.name
	from
		"Group" g
	join "User" u 
on
		u.group_id = g.group_id
	where
		u.role_id = 1) as u
on
	u.group_id = abg.group_id
left join "AssignBlockUsers" abu 
on
	u.user_id = abu.user_id and abu.assign_block_group_id = abg.assign_block_group_id
left join "LearningOutcome" lo 
on lo.user_id = u.user_id and lo.block_id = b.block_id 
where b.owner_id = ${userId}`;

  const processedResults: ProcessedResult[] = [];

  // Преобразуем данные в вид для вывода
  results.forEach((result) => {
    const ifBlockExists = processedResults.some(
      (item) => item.block_id === result.block_id
    );

    const user = {
      user_id: result.user_id,
      user_name: result.name,
      current_try_count: result.current_try_count,
      assign_block_group_id: result.assign_block_group_id,
      results: [
        {
          grade: result.grade,
          finished_at: result.finished_at,
        },
      ],
    };

    const group = {
      group_id: result.group_id,
      group_name: result.group_name,
      users: [user],
    };

    if (!ifBlockExists) {
      processedResults.push({
        block_id: result.block_id,
        block_name: result.block_name,
        max_try_count: result.max_try_count,
        deadline: result.deadline,
        time_limit: result.time_limit,
        groups: [group],
      });
    } else {
      const resultsIndex = processedResults.findIndex(
        (item) => item.block_id === result.block_id
      );
      if (resultsIndex !== -1) {
        const groups: ResultsGroup[] = processedResults[resultsIndex].groups;
        const groupIndex = groups.findIndex(
          (item) => item.group_id === result.group_id
        );

        if (groupIndex !== -1) {
          const users = groups[groupIndex].users;
          const usersIndex = users.findIndex(
            (item) => item.user_id === result.user_id
          );
          if (usersIndex !== -1) {
            users[usersIndex].results.push({
              grade: result.grade,
              finished_at: result.finished_at,
            });
          } else {
            users.push(user);
          }
        } else {
          groups.push(group);
        }
      } else {
        throw new Error("Почему то не нашел индекс processedResults");
      }
    }
  });

  return (
    <>
      <ResultsContainer results={processedResults} />
    </>
  );
};

export default ResultsPage;
