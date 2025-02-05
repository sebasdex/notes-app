import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/config/supabaseServer";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user?.id) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }
    const userId = data.user.id;
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { error: "ID de la nota requerido" },
        { status: 400 }
      );
    }
    const { error: deleteError } = await supabase
      .from("newNotes")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (deleteError) {
      throw deleteError;
    }

    return NextResponse.json(
      { message: "✅ Nota eliminada correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error al eliminar la nota:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
