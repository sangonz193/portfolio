import { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Santiago's Portfolio",
}

export default function Page() {
  redirect("/me")
}
