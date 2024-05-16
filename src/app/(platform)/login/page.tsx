import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Form from "./_components/form";
import { authOptions } from "@/lib/auth";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session?.user.user_id) {
    redirect("/");
  }
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-slate-200 ">
      <div className="p-8 bg-white max-w-[420px] w-full rounded-2xl shadow-xl">
        <h1 className=" text-center font-bold text-3xl">Вход</h1>
        <Form />
        <div className="flex justify-between mt-2  ">
          <Button variant={"link"} asChild>
            <Link href="/register">Нет аккаунта</Link>
          </Button>
          <Button variant={"link"} asChild>
            <Link href="/register">Забыл пароль</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
