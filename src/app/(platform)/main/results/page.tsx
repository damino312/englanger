import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const ResultsPage = async () => {
  const session = await getServerSession(authOptions);
  const roleId = Number(session?.user.role_id);

  if (roleId !== 2) {
    redirect("/main");
  }

  return () => {
    <>results</>;
  };
};

export default ResultsPage;
