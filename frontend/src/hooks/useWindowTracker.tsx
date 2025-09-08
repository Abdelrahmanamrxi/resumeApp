import {useState,useEffect} from 'react'
interface WindowObject{
 width:number,
 height:number
}
const useWindowTracker = () => {
    const[windowObj,setWindow]=useState<WindowObject>({
        width:0,
        height:0
    })
    useEffect(()=>{
        const handleResize=()=>{
            setWindow({
                width:window.innerWidth,
                height:window.innerHeight
            })
        }
        handleResize()
        window.addEventListener("resize",handleResize)
        return ()=>{
            window.removeEventListener('resize',handleResize)
        }
    },[])
  return { windowObj , setWindow }
}

export default useWindowTracker
