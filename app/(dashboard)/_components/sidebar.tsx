import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

export const Sidebar = () => {
    return ( 
        <div className="flex flex-col h-full overflow-y-auto border-r shadow-lg bg-slate-200">
            <div className="p-6">
                <Logo />
            </div>
            <div className="flex flex-col w-full">
                <SidebarRoutes />

            </div>
        </div>
     )
}


 
