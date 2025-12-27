"use client";

import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

interface PostContentProps {
  content: string;
}

export default function PostContent({ content }: PostContentProps) {
  return (
    <Editor
      initialContent={content}
      editable={false}
      className="border-none p-0 min-h-0"
    />
  );
}
