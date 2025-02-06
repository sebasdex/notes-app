import { NextResponse } from "next/server";
import { createClient } from "@/config/supabaseServer";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    const userID = data?.user?.id;
    if (error || !userID) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }
    const { data: trashNotes, error: notesError } = await supabase
      .from("newNotes")
      .select("*")
      .eq("user_id", userID)
      .eq("isDeleted", true)
      .eq("isArchived", false)
      .order("date", { ascending: false })
      .order("hour", { ascending: false });
    if (notesError) throw notesError;
    return NextResponse.json({ trashNotes }, { status: 200 });
  } catch (error) {
    console.error("❌ Error en API:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
