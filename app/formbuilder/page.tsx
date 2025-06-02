"use client";
import { Editor } from "@/components/DynamicEditor";
import Link from "next/link";
import { useState } from "react";
import EditorPreview from "@/components/EditorPreview";

export default function Page() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="h-screen w-screen p-20">
      {/* <Link
        className="text-blue-300 top-0 left-0 block   text-2xl"
        href={"/preview"}
      >
        Preview
      </Link> */}
      {open ? null : (
        <button className="cursor-pointer" onClick={() => setOpen(true)}>
          Preview
        </button>
      )}
      {open ? <EditorPreview open={open} setOpen={setOpen} /> : <Editor />}
    </div>
  );
}
