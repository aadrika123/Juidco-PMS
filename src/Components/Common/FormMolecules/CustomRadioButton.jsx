import React from 'react'

const CustomRadioButton = ({ name, value, checked, onChange, label }) => {
  return (
    <>
      <div className="flex items-center mb-2">
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                id={`${name}-${value}`}
                className="mr-2"
            />
            <label htmlFor={`${name}-${value}`} className="text-gray-700">{label}</label>
        </div>
    </>
  )
}

export default CustomRadioButton
