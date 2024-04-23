import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const TeachingPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user.user_id) {
    redirect("/login");
  }

  return (
    <div className="w-full h-full px-32">
      <h1 className=" text-center font-bold text-3xl">Учебные блоки</h1>
      <h2 className=" text-center font-bold text-3xl">
        Учебные блоки созданные мной
      </h2>
    </div>
  );
};

export default TeachingPage;
