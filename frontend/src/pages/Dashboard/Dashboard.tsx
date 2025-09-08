import { useSelectorState } from "@/hooks/useReducerHooks"
import { AppSidebar } from "../../components/Dashboard/app-sidebar"
import { Outlet } from "react-router-dom"
import { Separator } from "../../components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../../components/ui/sidebar"

export default function Dashboard() {
  const {name}=useSelectorState((state)=>state.authState)
  return (
    <SidebarProvider>
      <AppSidebar  />
      <SidebarInset>
        <header className="flex h-16  shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex  items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
           <h1 className="text-lg font-sans ">Welcome, {name}</h1>
          </div>
        </header>
        <div className="flex flex-1 grad flex-col gap-4 p-4 pt-0">
        <Outlet/>
          </div>
      </SidebarInset>
    </SidebarProvider>
            
   
  )
}
