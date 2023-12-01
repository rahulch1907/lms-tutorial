"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
    icon: LucideIcon;
    label: string;
    href: string;

}

export const SidebarItem = ({
    icon: Icon,
    label,
    href,
}: SidebarItemProps) => {
    const pathname = usePathname();
    const router = useRouter();

    const isActive = 
      (pathname === "/" && href === "/") ||
      pathname === href ||
      pathname?.startsWith('${href}/');
    
      const onClick = () => {
        router.push(href);
      }


    return (
        <button
          onClick={onClick}
          type="button"
          className={cn(
            "rounded-full flex items-center gap-x-3 text-slate-900 text-md font-[700] pl-8 transition-all hover:text-slate-800 hover:bg-slate-600/20 ",
            isActive && "text-slate-800 bg-sky-400/30 hover:bg-sky-400/30 hover:text-slate-800"
          )}
        >
            <div className="flex items-center py-4 gap-x-3">
              <Icon 
                size={22}
                className={cn(
                    "text-slate-800",
                    isActive && "text-slate-800"
                )}
              /> 
              {label}
            </div> 
            <div 
              className={cn(
                "ml-auto opacity-0 border-2 border-sky-800 h-full transition-all",
                //isActive && "opacity-200"
              )}
            />
        </button>
    )
}