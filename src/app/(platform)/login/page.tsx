import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Form from "./_components/form";
import { Link } from "@nextui-org/react";
import { authOptions } from "@/lib/auth";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session?.user.user_id) {
    redirect("/");
  }
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-stone-200 ">
      <div className="p-8 bg-slate-200 max-w-[420px] w-full rounded-2xl shadow-xl">
        <h1 className=" text-center font-bold text-3xl">Вход</h1>
        <Form />
        <div className="flex justify-between mt-2 px-2 ">
          <Link color="primary" className="" href="/register">
            Нет аккаунта
          </Link>
          <Link color="primary" className="" href="/register">
            Забыл пароль
          </Link>
        </div>
      </div>
    </div>
  );
}
