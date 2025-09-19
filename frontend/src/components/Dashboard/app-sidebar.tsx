import * as React from "react"
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  FileUser,
  SaveAll,Briefcase
} from "lucide-react"

import { NavMain } from "@/components/Dashboard/nav-main"
import { NavUser } from "@/components/Dashboard/nav-user"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

import { useSelectorState } from "@/hooks/useReducerHooks"

// This is sample data.
const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Analyze Your Resume",
      url: "/user/dashboard/resume-analyze",
      icon: FileUser,
      isActive: true,
    },
    {
      title: "Saved ATS Scans",
      url: "/user/dashboard/savedats",
      icon: SaveAll,
      
    },
    {
      title: "Match Your Resume",
      url: "#",
      icon: Briefcase,
     
    },

  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const {name,email}=useSelectorState((state)=>state.authState)
    const user={email,name}

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
     
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
