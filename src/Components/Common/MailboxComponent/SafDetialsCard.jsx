//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 24 june 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - SafDetialsCard
//    DESCRIPTION - SafDetialsCard Component
//////////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import propImage from './prop.jpg'
import { GrHomeRounded } from 'react-icons/gr'
import { IoIosCall } from 'react-icons/io'

function SafDetialsCard(props) {
    return (
        <>
            <div className="bg-gray-100">
                <div className="container mx-0 sm:mx-auto mb-0 mt-1 p-1 sm:p-5 ">
                    <div className="md:flex no-wrap md:-mx-2 ">

                        <div className="w-full mx-2 h-36">
                            <div className="bg-white p-3 shadow-xl rounded-sm">
                                <div className="flex items-center pl-0 space-x-2 font-semibold text-gray-900 leading-8 mb-2">
                                    <span clas="text-green-500">
                                        <GrHomeRounded />
                                    </span>
                                    <span className="tracking-wide">SAF Details</span>
                                </div>
                                <div className="text-gray-700">
                                    <div className="grid md:grid-cols-3 text-sm">
                                        <div className="grid grid-cols-2">
                                            <div className="px- py-2 font-semibold">Ward No.</div>
                                            <div className="px- py-2">5</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px- py-2 font-semibold">Application No.</div>
                                            <div className="px- py-2">000123</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px- py-2 font-semibold">Owner Name</div>
                                            <div className="px- py-2">Mark Sandy</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px- py-2 font-semibold">Mobile</div>
                                            <div className="px- py-2">9123254444</div>
                                        </div>



                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold"></div>
                                            <div className="px-4 py-2">
                                                <a className="text-blue-800" href="mailto:jane@example.com"></a>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold"></div>
                                            <div className="px-4 py-2"></div>
                                        </div>
                                    </div>
                                </div>

                            </div>



                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SafDetialsCard
/**
 * Exported to :
 * 1. DetailsTabs Component
 * 
 */