import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminPanel from "./AdminPanel";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("isAdmin")?.value;

  if (isAdmin !== "true") {
    redirect("/login");
  }

  return <AdminPanel />;
}