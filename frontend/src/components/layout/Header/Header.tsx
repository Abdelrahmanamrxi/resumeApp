
import Navbar from '@/components/sections/Navbar/Navbar'
import logo from '../../../assets/CATALYx.png'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='flex flex-row  p-4 items-center w-full justify-between'>
      <img className="lg:w-1/8  md:w-1/5 w-1/4"  src={logo}/>
      <Navbar/>
         <div className='lg:flex hidden  flex-row gap-4'>
          <Button className='px-5 cursor-pointer '>
           <Link to="/signup">
            Get Started
           </Link>
            </Button>
          <Button className='cursor-pointer' variant='secondary'>
            <Link to="/login">
            Sign In
            </Link>
            </Button>
          </div>
          
    </div>
  )
}

export default Header
