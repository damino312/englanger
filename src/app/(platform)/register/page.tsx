import { getServerSession } from "next-auth";
import Form from "./_components/form";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return <Form />;
}
