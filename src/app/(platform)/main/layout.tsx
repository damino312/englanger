import { getServerSession } from "next-auth";
import Header from "./_components/header";
import { redirect } from "next/navigation";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="w-full min-h-screen bg-slate-100">
      <Header />
      {children}
    </div>
  );
}
