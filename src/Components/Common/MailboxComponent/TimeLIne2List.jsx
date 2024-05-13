//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 24 june 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - TimeLIne2List
//    DESCRIPTION - TimeLIne2List Component
//////////////////////////////////////////////////////////////////////////////////////
import React from 'react'

function TimeLIne2List(props) {
    return (
        <>
            <div className="container  mx-auto w-full h-full">
                <div className="relative wrap overflow-hidden md:p-2 md:pl-2 h-full">
                    <div className="mb-1 relative  justify-between items-center w-full ">
                        <div className="order-1 w-5/12"></div>
                        <div className="z-10 absolute -top-2 -left-2 flex items-center order-1 bg-orange-400 shadow-xl w-6 h-6 rounded-full text-white">
                            <h1 className="mx-auto font-semibold text-sm">{props.index}</h1>
                        </div>
                        <div className="grid grid-cols-12 order-1 bg-sky-100 rounded-lg shadow-xl w-10/12 px-6 py-2">
                            <div className='col-span-12 md:col-span-8'> <h3 className="mb-1 font-bold text-gray-800 text-xs">{props.title}</h3></div>
                            <div className="col-span-12 md:col-span-2"> <p className="text-sm leading-snug tracking-wide text-gray-600 text-opacity-60 text-xs">{props.date} </p></div>
                            <div className="col-span-12 md:col-span-12"><p className="text-sm leading-snug tracking-wide text-gray-600 text-opacity-100 text-xs">{props.comment}</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TimeLIne2List
/**
 * Exported to :
 * 1. WorkFlowTrack Component
 * 
 */