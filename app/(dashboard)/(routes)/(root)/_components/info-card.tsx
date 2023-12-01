import { IconBadge } from "@/components/icon-badge"
import { LucideIcon } from "lucide-react";

interface InfoCardProps {
    numberOfItems: number;
    variant?: "default" | "success";
    label: string;
    icon: LucideIcon;
}
export const InfoCard = ({
    variant,
    icon: Icon,
    numberOfItems,
    label,
}: InfoCardProps) => {
    return (
      <div className="flex items-center p-3 border rounded-full bg-slate-200 gap-x-2">
        <IconBadge variant={variant} icon={Icon} />
        <div>
          <p className="font-medium text-black">{label}</p>
          <p className="text-sm text-gray-700">
            {numberOfItems} {numberOfItems === 1 ? "Course" : "Courses"}
          </p>
        </div>
      </div>
    );
}