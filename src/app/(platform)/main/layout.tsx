import { getServerSession } from "next-auth";
import Header from "./_components/header";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user.user_id) {
    redirect("/login");
  }
  const roleId = Number(session?.user.role_id);
  return (
    <div className="w-full min-h-screen bg-slate-100">
      <Header roleId={roleId} />
      {children}
    </div>
  );
}
