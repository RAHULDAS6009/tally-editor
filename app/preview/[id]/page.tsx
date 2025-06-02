"use client";
// app/preview/[id]/page.tsx
import { useParams } from "next/navigation";
import PreviewWrapper from "./PreviewWrapper";

export default function Page() {
  const params = useParams();

  if (!params?.id || typeof params.id !== "string") {
    return <div>Invalid ID</div>;
  }

  return <PreviewWrapper id={params.id} />;
}
