"use client";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

import { cn } from "@/lib/utils";

interface EditorProps {
  onChange?: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
  className?: string;
}

export default function Editor({ onChange, initialContent, editable = true, className }: EditorProps) {
  const editor = useCreateBlockNote({
    initialContent: initialContent
      ? (() => {
          try {
            return JSON.parse(initialContent);
          } catch (e) {
            // Fallback for plain text or invalid JSON
            return [
              {
                type: "paragraph",
                content: initialContent,
              },
            ];
          }
        })()
      : undefined,
  });

  return (
    <div className={cn("border rounded-md p-4 min-h-[300px]", className)}>
      <BlockNoteView
        editor={editor}
        editable={editable}
        onChange={() => {
          onChange?.(JSON.stringify(editor.document));
        }}
        theme="light"
      />
    </div>
  );
}
