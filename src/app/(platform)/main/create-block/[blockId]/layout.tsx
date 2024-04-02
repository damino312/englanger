import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function CreateBlockLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    blockId: string;
  };
}) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.user_id;
  if (!userId) {
    redirect("/login");
  }

  const currentBlock = await db.block.findFirst({
    where: { block_id: Number(params.blockId) },
  });
  if (Number(userId) !== currentBlock?.owner_id) {
    redirect("/main");
  }

  return <div className="w-full min-h-screen bg-slate-100">{children}</div>;
}
