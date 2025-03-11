import React from 'react'

interface RegisterProps {
    name:string;
    disabled?: boolean;
    className?: string;
};

const Button = (props:RegisterProps) => {
  return (
    <div className="text-right block">
            <button type="submit" className={props.className}>
              {props.name}
            </button>
          </div>
  )
}

export default Button