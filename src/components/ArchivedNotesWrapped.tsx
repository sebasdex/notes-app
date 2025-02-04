"use client";
import React from "react";
import ArchivedNotes from "@/components/ArchivedNotes";
import { User } from "@supabase/supabase-js";

function ArchivedNotesWrapped({ user }: { user: User | null }) {
  return <ArchivedNotes user={user} />;
}

export default ArchivedNotesWrapped;
