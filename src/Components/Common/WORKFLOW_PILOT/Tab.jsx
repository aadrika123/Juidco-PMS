import React from 'react'

const Tab = (props) => {
  return (
    <>
    <div onClick={props?.action} className={`cursor-pointer transition-all duration-300 px-6 text-center py-1.5 flex items-center gap-1 ${props?.ind == 0 ? "rounded-l-lg" : 'rounded-r-lg'} ${props?.active ? 'bg-indigo-500 text-white' : 'border-none text-slate-600'}`}>
        <span className={`${props?.active ? "text-white" : "text-indigo-500"}`}>{props?.icon}</span> {props?.label}
    </div>
    </>
  )
}

export default Tab