"use client";
import { Editor } from "@/components/DynamicEditor";
import Link from "next/link";
import { useState } from "react";
import EditorPreview from "@/components/EditorPreview";
import { useAppSelector } from "@/hook";
import axios from "axios";

export default function Page() {
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const blocks = useAppSelector((state) => state.blocks.blocks);
  async function onPublish() {
    await axios.post(
      "http://localhost:5000/form",
      {
        title,
        blocks: JSON.stringify(blocks),
      },
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.Zjk3MGQwNWEtOTRlNC00NTJlLWI5ZmEtY2ZkNGQ5ZWEwM2M2.iuOekLpTVbJIZhUONWeDA9Bczqz1JZeANnWjVG00Grc",
        },
      }
    );
  }
  return (
    <div className="h-screen w-screen p-20">
      <div className="p-2 border ">
        <label> Title </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
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
      <button onClick={onPublish}>Publish</button>
      {open ? <EditorPreview open={open} setOpen={setOpen} /> : <Editor />}
    </div>
  );
}
