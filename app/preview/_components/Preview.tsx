"use client";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useAppSelector } from "@/hook";
import { schema } from "@/components/TextEditor";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { PartialBlock } from "@blocknote/core";
import { ParamValue } from "next/dist/server/request/params";

export default function Preview({ id }: { id: string }) {
  const [blocks, setBlocks] = useState<PartialBlock[] | null>([
    { type: "paragraph" },
  ]);
  const params = useParams();
  console.log(id);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`http://localhost:5000/form/${id}`);
      setBlocks(JSON.parse(res.data.form.blocks));
    }
    fetchData();
  }, [params.id]); // Only depend on params.id (NOT blocks!)

  // Wait until blocks are loaded
  if (!blocks) return <div>Loading...</div>;

  const editor = useCreateBlockNote({
    schema,
    initialContent: blocks,
  });

  return <BlockNoteView editor={editor} editable={false} />;
}
