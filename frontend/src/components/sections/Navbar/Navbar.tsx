import { useState } from "react"
import {Link} from "react-router-dom"
import {motion} from 'framer-motion'
import useWindowTracker from "@/hooks/useWindowTracker"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import components from "@/utils/comp"
import NavbarMobile from "./NavbarMobile"

export function Navbar() {
    const {windowObj}=useWindowTracker()
    const [isOpen,setIsOpen]=useState<boolean>(false)
     const lineProps:string = `absolute h-0.5 w-6 bg-gray-800 ${isOpen?"bg-white":'bg-black'}  transition-all duration-300`
    const[featuresOpen,setFeatures]=useState<boolean>(false)
  return (
     <div>
      {/* Desktop Navigation */}
      {windowObj.width >= 1024 && (
        <NavigationMenu className="flex" viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Features</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      to={component.to}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link to="/pricing">Pricing</Link>
            </NavigationMenuLink>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link to="/templates">Templates</Link>
            </NavigationMenuLink>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link to="/about">About</Link>
            </NavigationMenuLink>
          </NavigationMenuList>
        </NavigationMenu>
      )}

      {/* Mobile Burger Menu */}
      {windowObj.width < 1024 && (
        <>
          {/* Burger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`relative w-10 h-10 cursor-pointer flex items-center justify-center z-50`}
          >
            {/* Top line */}
            <motion.span
              className={lineProps}
              animate={{
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 0 : -8,
              }}
              transition={{ duration: 0.2 }}
            />
            {/* Middle line */}
            <motion.span
              className={lineProps}
              animate={{
                opacity: isOpen ? 0 : 1,
              }}
              transition={{ duration: 0.2 }}
            />
            {/* Bottom line */}
            <motion.span
              className={lineProps}
              animate={{
                rotate: isOpen ? -45 : 0,
                y: isOpen ? 0 : 8,
              }}
              transition={{ duration: 0.2 }}
            />
          </button>

          {/* Slide-in Mobile Menu */}
          
        </>
      )}
      <NavbarMobile isOpen={isOpen} featuresOpen={featuresOpen} setFeatures={setFeatures}/>
    </div>
  )









}
function ListItem({
  title,
  children,
  to,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { to: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link className='gap-3 flex flex-col ' to={to}>
          <div className="text-sm  leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

export default Navbar
