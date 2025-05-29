import { Editor } from "@/components/DynamicEditor";
import Link from "next/link";

export default function Page() {
  return (
    <div className="h-screen">
      <Editor />
      <Link
        className="text-blue-300 bottom-0 left-0 block   text-2xl"
        href={"/preview"}
      >
        Preview
      </Link>
    </div>
  );
}
