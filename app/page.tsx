import { redirect } from "next/navigation";

export default function Index(): never {
    redirect("/home"); // Use replace() to avoid navigation history issues
}
