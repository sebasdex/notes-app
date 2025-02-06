"use client";
import React from "react";
import ArchivedNotes from "@/components/ArchivedNotes";
import { User } from "@supabase/supabase-js";
import { Toaster } from "sonner";

function ArchivedNotesWrapped({ user }: { user: User | null }) {
  return (
    <>
      <Toaster position="top-center" richColors />
      <ArchivedNotes user={user} />
    </>
  );
}

export default ArchivedNotesWrapped;
