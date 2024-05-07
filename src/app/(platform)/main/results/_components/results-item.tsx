import { displayLocalDate } from "@/lib/utils";
import { ProcessedResult } from "../page";
import { Separator } from "@/app/_components/ui/separator";
import UserItem from "./results-user-item";

interface ResultsItemProps {
  result: ProcessedResult;
}

const ResultsItem = ({ result }: ResultsItemProps) => {
  return (
    <div>
      <div className="flex gap-3 items-end ">
        <h2 className="font-bold text-2xl">{result.block_name}</h2>
        <Separator orientation="vertical" className="h-6 bg-black w-[0.5px]" />
        <p>
          <span className="font-semibold">Деадлайн: </span>
          {displayLocalDate(result.deadline)}
        </p>
        <Separator orientation="vertical" className="h-6 bg-black w-[0.5px]" />
        <p>
          <span className="font-semibold">Макс. время: </span>
          {result.time_limit}
        </p>
      </div>
      <>
        {result.users
          .sort((a, b) => {
            const nameA = a.user_name.toUpperCase();
            const nameB = b.user_name.toUpperCase();

            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          })
          .map((user, index) => (
            <UserItem key={user.user_id} user={user} index={index} />
          ))}
      </>
    </div>
  );
};

export default ResultsItem;
