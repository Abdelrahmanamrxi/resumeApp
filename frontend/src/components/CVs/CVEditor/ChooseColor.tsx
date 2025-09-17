
import { Brush } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select"
import { colors } from '../constants/constant'
interface ColorProps {
    addTextColor:(color:string)=>void
    addAccentColor:(color:string)=>void
}


function ChooseColor({addTextColor,addAccentColor}:ColorProps) {
  return (
    <div>
        <h4 className='font-semibold  mb-2 text-sm flex items-center gap-1'>
        <Brush size={14}/> Color </h4>
        <div className='flex flex-row gap-3'>

         <Select onValueChange={(color)=>{addTextColor(color)}}>
      <SelectTrigger className="w-1/3">
        <SelectValue placeholder="Text Color" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
       {colors.map((color)=>{
        return <SelectItem  value={color}>{color.toLocaleUpperCase()}</SelectItem>
       })}
        </SelectGroup>
      
      </SelectContent>
    </Select>
      <Select onValueChange={(color)=>{addAccentColor(color)}}>
      <SelectTrigger className="w-1/3">
        <SelectValue placeholder="Accent Color" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
       {colors.map((color)=>{
        return  <SelectItem  value={color}>{color.toLocaleUpperCase()}</SelectItem>
       })}
        </SelectGroup>
      
      </SelectContent>
    </Select>
        </div>
        
      
    </div>
  )
}

export default ChooseColor
