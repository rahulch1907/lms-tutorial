import { NavbarRoutes } from "@/components/navbar-routes"
import { MobileSidebar } from "./mobile-sidebar"

export const Navbar = () => {
    return (
        <div className="flex items-center h-full p-4 border-b-2 shadow-md bg-slate-100">
          <MobileSidebar />
          <NavbarRoutes />
        </div>
    )
}