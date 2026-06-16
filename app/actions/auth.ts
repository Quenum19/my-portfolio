"use server";
import { redirect } from "next/navigation";
import { createSession, destroySession, checkPassword } from "@/lib/auth";

export type LoginState = { error?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const password = String(formData.get("password") || "");
  if (!process.env.ADMIN_PASSWORD) {
    return { error: "ADMIN_PASSWORD n'est pas configuré sur le serveur." };
  }
  if (!checkPassword(password)) {
    return { error: "Mot de passe incorrect." };
  }
  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}
