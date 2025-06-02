// app/preview/[id]/PreviewWrapper.tsx
"use client";

import dynamic from "next/dynamic";

const Preview = dynamic(() => import("../_components/Preview"), {
  ssr: false,
  loading: () => <div>Loading preview...</div>,
});

export default function PreviewWrapper({ id }: { id: string }) {
  return <Preview id={id} />;
}
