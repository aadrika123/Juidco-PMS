//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 24 june 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - TimeLine2
//    DESCRIPTION - TimeLine2 Component
//////////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import TimeLIne2List from './TimeLIne2List'
import { useQuery } from "react-query";
import axios from 'axios'
import AxiosInterceptors from '../Common/AxiosInterceptors';

function TimeLine2() {

    const { isLoading, data, isError, error } = useQuery("first-query", () => {
        return AxiosInterceptors.get("http://localhost:3001/timeLine");
    });
    return (
        <>
            <h1 className='text-center bg-gray-200 h-10 grid items-center font-semibold'>Timeline</h1>
            <div className="container bg-white mx-auto w-full h-full">
                <div className="relative wrap overflow-hidden md:p-10 h-full">
                    <div className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border" style={{ "left": "50%" }}></div>
                    <div className="mb-8 flex justify-between items-center w-full right-timeline">
                        <div className="order-1 w-5/12"></div>
                        <div className="z-10 flex items-center order-1 bg-orange-300 shadow-xl w-6 h-6 rounded-full">
                            <h1 className="mx-auto font-semibold text-sm text-white">2</h1>
                        </div>
                        <div className="order-1 bg-orange-200 rounded-lg shadow-xl w-5/12 px-6 py-4">
                            <h3 className="mb-1 font-bold text-gray-800 text-xs">Application Sent To dealing Assistant</h3>
                            <p className="text-sm leading-snug tracking-wide text-gray-600 text-opacity-60 text-xs">20 jan 2022. </p>
                            <p className="text-sm mt-2 leading-snug tracking-wide text-gray-600 text-opacity-100 text-xs">Everything is correct. </p>
                        </div>
                    </div>
                   
                    {/* { !isLoading?
                       data.data.map((data,index)=>
                        <TimeLIne2List position="left-timeline" sender={data.sender} dateTime={data.dateTime} comment={data.comment} activeStatus={data.activeStatus} />
                       ):''
                   } */}
                    {/* <TimeLIne2List />
                    <TimeLIne2List />
                    <TimeLIne2List />
                    <TimeLIne2List /> */}




                </div>
            </div>
        </>
    )
}

export default TimeLine2
/**
 * Exported to :
 * 
 * 
 */