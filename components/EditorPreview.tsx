"use client"; // this registers <Editor> as a Client Component
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useAppSelector } from "@/hook";
import { schema } from "./TextEditor";
import { useEffect } from "react";
import { redirect } from "next/navigation";

// Our <Editor> component we can reuse later
export default function EditorPreview() {
  // Creates a new editor instance.
  const blocks = useAppSelector((state) => state.blocks.blocks);
  console.log();
  if (blocks.length === 0) {
    console.log("no block");
    redirect("/formbuilder");
  }

  const editor = useCreateBlockNote({
    schema: schema,
    initialContent: blocks,
  });

  // Renders the editor instance using a React component.
  return <BlockNoteView editor={editor} editable={false} />;
}
