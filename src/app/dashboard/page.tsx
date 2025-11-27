import { redirect } from "next/navigation";

export default function DashboardPage() {
  // Redirect to products page since that's the main dashboard functionality
  redirect("/dashboard/products");
}
