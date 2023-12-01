"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { isTeacher } from "@/lib/teacher";


export const NavbarRoutes = () => {
    const { userId } = useAuth();
    const pathname = usePathname();

    const isTeacherPage = pathname?.startsWith("/teacher");
    const isPlayerPage = pathname?.includes("/courses");
    const isSearchPage = pathname === "/search";

    return (
      <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
        <div className="flex ml-auto gap-x-2">
          {isTeacherPage || isPlayerPage ? (
            <Link href="/">
              <Button size="sm" variant="ghost" className="text-white bg-blue-700 rounded-full hover:text-white hover:bg-blue-700">
                <LogOut className="w-4 h-4 mr-2" />
                Exit
              </Button>
            </Link>
          ) : isTeacher(userId) ? (
            <Link href="/teacher/courses">
              <Button size="sm" variant="ghost" className="text-sm text-white bg-blue-700 rounded-full hover:bg-blue-700 hover:text-white">
                Teacher mode
              </Button>
            </Link>
          ) : null }
          <UserButton afterSignOutUrl="/" />
        </div>
      </>
    );
}