"use client"
import { useAppDispatch } from "@/hooks/useReducerHooks"
import { removeAccessToken } from "@/slices/authReducer"
import { useNavigate } from "react-router-dom"
import {
  BadgeCheck,
  ChevronsUpDown,
  LogOut,
  Loader
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import api from "@/middleware/interceptor"
import { useState } from "react"
import { AxiosError } from "axios"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
  }
}) {

  const { isMobile } = useSidebar()
  const[isLoading,setLoading]=useState<boolean>(false)
  const[error,setError]=useState<string>('')
  const dispatch=useAppDispatch()
  const navigate=useNavigate()

  const handleLogOut=async()=>{
      setLoading(true)
    try{
      const response=await api.post('/auth/logout')
      if(response.data){
        dispatch(removeAccessToken())
        navigate('/')
      }
    }
    catch(err){
      if(err instanceof AxiosError){
        if(err.code==='ERR_NETWORK') 
        setError("Couldn't establish a connection with the server")
        else
        setError(err.response?.data.message)
      }
      
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
               
                <AvatarFallback className="rounded-lg">{user.name.split("")[0]}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1  text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
               
                  <AvatarFallback className="rounded-lg">{user.name.split("")[0]}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
             
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
             
           
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex flex-col">

              
              <button className="cursor-pointer gap-2 flex flex-row items-center" onClick={handleLogOut}> {!isLoading?(<p className="flex flex-row gap-2 items-center"> <LogOut/> Sign Out</p> ):
              (
                <p className="flex flex-row items-center gap-2">Signing out.. <Loader className="animate-spin"/></p>
              )
            } </button>
              {error&&<p className="errorMessage mt-2">[ERROR]: {error}..</p>}
            </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
