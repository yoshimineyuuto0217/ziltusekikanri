import { EyeIcon, EyeOffIcon } from 'lucide-react'
import React from 'react'

interface switchProps {
icon:boolean,
setIcon:React.Dispatch<React.SetStateAction<boolean>>
}

const EyeButton = ({icon,setIcon}:switchProps ) => {
  return (
    <button type="button" className="text-black-50 absolute top-1/2 -translate-y-1/2 p-3 right-1" onClick={()=>setIcon((prev)=> !prev)}>
              {icon ? <EyeOffIcon size={20} /> : <EyeIcon size={20} /> }
            </button>
  )
}

export default EyeButton