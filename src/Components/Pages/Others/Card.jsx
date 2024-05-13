import React from 'react'

const Card = (props) => {
  return (
    <>
        <div className='rounded-md drop-shadow-md h-full w-full md:w-[20vw] 2xl:w-[15vw] border bg-gray-50'>

            <div className="h-[30vh] relative group overflow-clip">
                <img src={props?.logo} className='hue-rotate-[200deg] rounded-t-md h-full w-full object-cover' alt="" srcset="" />
                <div className='animate__animated animate__fadeInDown animate__faster absolute hidden bg-transparent backdrop-blur-[3px] h-full w-full top-0 left-0 group-hover:flex justify-center items-center'>
                    <span onClick={() => props?.action()} className='hover:bg-white px-4 py-1 text-xs cursor-pointer bg-blue-500 text-white drop-shadow-lg hover:text-blue-500 border border-blue-500 hover:drop-shadow-lg'>View</span>
                </div>
            </div>

            <div className="h-max flex justify-between gap-2 p-4 ">
                <div className='flex flex-col'>
                    <span className='font-semibold uppercase mb-1'>{props?.heading}</span>
                    <span className='text-xs'>{props?.desc}</span>
                </div>
                <div>
                    <button onClick={() => props?.action()} className='bg-white px-4 py-1 text-xs cursor-pointer border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:drop-shadow-lg'>View</button>
                </div>
            </div>

        </div>
    </>
  )
}

export default Card