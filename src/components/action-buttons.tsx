"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ActionButtonsProps {
  viewUrl?: string;
  editUrl?: string;
  onDelete?: () => void;
  className?: string;
}

export default function ActionButtons({
  viewUrl,
  editUrl,
  onDelete,
  className,
}: ActionButtonsProps) {
  return (
    <div className={cn("flex items-center space-x-0", className)}>
      {viewUrl && (
        <Link href={viewUrl} target="_blank">
          <Button
            variant="secondary"
            size="sm"
            className={cn(
              "focus:z-10",
              editUrl || onDelete ? "rounded-r-none border-r-0" : ""
            )}
          >
            View
          </Button>
        </Link>
      )}
      {editUrl && (
        <Link href={editUrl}>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "focus:z-10",
              viewUrl ? "rounded-l-none" : "",
              onDelete ? "rounded-r-none border-r-0" : ""
            )}
          >
            Edit
          </Button>
        </Link>
      )}
      {onDelete && (
        <Button
          variant="destructive"
          size="sm"
          className={cn(
            "focus:z-10",
            viewUrl || editUrl ? "rounded-l-none border-l-0" : ""
          )}
          onClick={onDelete}
        >
          Delete
        </Button>
      )}
    </div>
  );
}
