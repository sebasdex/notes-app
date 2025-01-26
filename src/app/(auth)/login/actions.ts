"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/config/supabaseServer";

export async function login(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Correo y contraseña son requeridos." };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  if (!data.email || !data.password) {
    return { success: false, error: "Correo y contraseña son requeridos." };
  }

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true, error: null };
}

export async function logOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    redirect("/error");
  }
  redirect("/");
}
