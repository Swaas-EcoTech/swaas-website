import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminDashboard from "./admin"; 

export default async function AdminProtectedPage() {
  const cookieStore = cookies();
  const isAdmin = cookieStore.get("isAdmin")?.value;
  if (isAdmin !== "true") {
    redirect("/login");
  }
  return <AdminDashboard />;
}