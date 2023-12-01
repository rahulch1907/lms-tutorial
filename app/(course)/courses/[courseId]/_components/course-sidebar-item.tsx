"use client";

import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

interface CourseSidebarItemProps {
  label: string;
  id: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
}

export const CourseSidebarItem = ({
  label,
  id,
  isCompleted,
  courseId,
  isLocked,
}: CourseSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const Icon = isLocked ? Lock : isCompleted ? CheckCircle : PlayCircle;
  const isActive = pathname?.includes(id);

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-800 text-sm font-[500] pl-6 transition-all hover:text-slate-700 hover:bg-slate-300/40",
        isActive &&
          "text-slate-900 bg-slate-400/30 hover:bg-slate-200/20 hover:text-slate-700",
        isCompleted &&
          "text-emerald-600 hover:text-emerald-600 bg-emerald-300/20",
        isCompleted && isActive && "bg-emerald-300/20"
      )}
    >
      <div className="flex items-center py-4 gap-x-2">
        <Icon
          size={24}
          className={cn(
            "text-slate-800",
            isActive && "text-slate-700",
            isCompleted && "text-emerald-700"
          )}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
          isActive && "opacity-100",
          isCompleted && "border-emerald-600"
        )}
      />
    </button>
  );
};
