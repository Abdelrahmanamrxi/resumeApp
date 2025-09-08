
import { AnimatePresence,motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ChevronRightIcon } from 'lucide-react'
import components from '@/utils/comp'
import { Link } from 'react-router-dom'
import logo from '../../../assets/CATALYx.png'
import type React from 'react'
type Props={
    isOpen:boolean
    featuresOpen:boolean,
    setFeatures:React.Dispatch<React.SetStateAction<boolean>>
}
const NavbarMobile = ({isOpen,featuresOpen,setFeatures}:Props) => {
  return (
   <AnimatePresence>
   
            {isOpen && (
                
              <motion.div
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 300 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 70,
                  duration: 0.8,
                }}
                className="fixed top-0 right-0 w-full h-full text-white 
                           bg-black/90 backdrop-blur-lg shadow-lg z-40 
                           p-8 flex flex-col space-y-6 pt-20 overflow-y-auto"
              >
                

                {/* Auth Buttons */}
                <Button className="mt-14">Sign In</Button>
                <Button variant="secondary">Sign Up</Button>

                {/* Nav Links */}
                <nav className="mt-5 text-lg">
                  <ul className="flex flex-col gap-4 ">
                    <li 
                     onClick={()=>{setFeatures(!featuresOpen)}}
                    className="flex cursor-pointer 0 flex-row items-center justify-between">
                      <p className="font-semibold hover:opacity-70 font-sans text-xl" >Features</p>
                       <motion.div
                      animate={{ rotate: featuresOpen ? 90 : 0 }}
                      transition={{ duration: 0.25 }}>
                           <ChevronRightIcon size={25} />
                        </motion.div>
                      
                    </li>
                      {featuresOpen && (
                        <AnimatePresence mode="wait">

                        <li className="flex mt-3 gap-5  flex-col">
                          {components.map((comp)=>{
                            return(
                              <motion.div
                             initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                            duration: 0.5,
                            ease: [0.25, 0.1, 0.25, 1] // ease-in-out cubic-bezier
                              }}  
                               className="flex gap-3 flex-col border border-white p-5 rounded-md">
                              <Link className="font-medium text-md" to={comp.to}>{comp.title}</Link>
                              <p className="text-sm mb-2 font-thin ">{comp.description}</p>
                              </motion.div>
                              
                            )
                          })}
                          </li>
                            </AnimatePresence>
                        )}
                        <li className="list">
                          Pricing
                        </li>
                        <li className="list">
                          About
                        </li>
                  </ul>
                </nav>
             <img className={`w-32 h-32  invert ${featuresOpen?'relative':'absolute'} bottom-0`} src={logo}/>   
              </motion.div>
                           
            )}
          </AnimatePresence>
  )
}

export default NavbarMobile
