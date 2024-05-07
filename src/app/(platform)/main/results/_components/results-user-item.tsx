import { User } from "../page";

interface UserProps {
  user: User;
  index: number;
}
const UserItem = ({ user, index }: UserProps) => {
  const bestResult = user.results.reduce((prev, curr) =>
    prev?.grade > curr?.grade ? prev : curr
  );
  return (
    <div className="flex gap-2">
      <p className="font-semibold">
        {index + 1}. {user.user_name},
      </p>
      <p title="Текущее количество попыток">
        <span className="font-semibold">попыток: </span>
        {user.current_try_count ?? 0}
      </p>
      {bestResult.grade && (
        <p title="Лучший результат">
          <span className="font-semibold">лучший результат, %: </span>
          {bestResult.grade}
        </p>
      )}
    </div>
  );
};

export default UserItem;
