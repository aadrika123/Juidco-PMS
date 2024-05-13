//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 14 july 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - PropertySafWorkflowTimeline (closed)
//    DESCRIPTION - PropertySafWorkflowTimeline Component
/////////////////////////////////////////////////////////////////////////////////////////////

import { indianDate, nullToNA } from '@/Components/Common/PowerupFunctions'
import React from 'react'
import { GrHomeRounded } from 'react-icons/gr'
import { TbCalendarTime } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'


function PilotWorkflowDataCard(props) {

    const dayPassed = (value) => {

        function indDate(dateString) {
            const [day, month, year] = dateString.split('-');
            return new Date(`${month}-${day}-${year}`);
        }

        const doneDate = indDate(value)

        // Calculate the current date
        const currentDate = new Date();

        // Calculate the time difference in milliseconds
        const timeDifference = currentDate - doneDate;

        // Calculate the number of days
        const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        console.log(`%c${daysPassed} days have passed since ${value}`, 'color: green; background-color: black; font-size: 1.5rem; padding: 5px 20px');

        if (value !== '') {
            return `${daysPassed ?? '0'} `;
        } else {
            return `0 `;
        }
    }

    return (
        <>
             <div className="">
                <div className="m-4">
                    <div className="md:flex no-wrap gap-2">
                        {/* <div className="w-full md:w-3/12 mx-2 md:shadow-lg flex md:justify-center items-center border-2 border-red-50 md:shadow-red-100 bg-white "> */}
                            <div className="bg-slate-50 md:items-center w-full md:w-3/12 my-auto md:shadow-md border-2 border-pink-100 md:shadow-pink-100 py-10 rounded">
                                <div className='text-black font-bold text-2xl leading-8 text-center'>{nullToNA(props?.applicationData?.data?.application_no)}</div>
                                <div className="image overflow-hidden md:text-center">
                                </div>
                                <div className="image overflow-hidden md:text-center mt-3 md:mt-10 bg-sky-50 border border-sky-200 py-4 mx-4 rounded-sm">
                                    <div className='text-base font-semibold text-gray-600'>Application Date</div>
                                    <div className='text-gray-700 font-bold text-2xl leading-8'>{indianDate(props?.applicationData?.data?.apply_date)}</div>
                                </div>

                                <div className=' overflow-hidden md:text-center mt-3 md:mt-10 flex items-center justify-center'>
                                    <TbCalendarTime size={48} className='text-gray-700' />
                                    <span className='ml-2 text-3xl font-bold text-gray-800'>{dayPassed(indianDate(props?.applicationData?.data?.apply_date))} <span className='text-base'>days passed</span></span>
                                </div>
                            </div>

                        {/* </div> */}
                        {/* <div className="w-full md:w-9/12 mx-2 h-auto"> */}
                            <div className="bg-slate-50 w-full md:w-9/12 md:p-3 md:shadow-md rounded flex flex-col justify-center border-2 border-blue-100 md:shadow-blue-100">
                                <div className="flex items-center md:pl-2 space-x-2 font-semibold text-gray-900 leading-8">
                                    <span clas="text-green-500 ">
                                        <GrHomeRounded className='font-bold' size={20} />
                                    </span>
                                    <span className="tracking-wide text-xl">{nullToNA(props?.applicationData?.data?.fullDetailsData?.cardArray?.headerTitle)}</span>
                                    {props?.applicationData?.data?.parked == true && <span className='float-right text-right text-red-600 px-4  border border-red-500 rounded-lg'>Back to Citizen Case</span>}
                                </div>


                                {/* DETAILS DATA */}
                                <div className="text-gray-700 py-2 md:py-4">
                                    <div className=" text-sm flex flex-wrap">
                                        {
                                            props?.applicationData?.data?.fullDetailsData?.cardArray?.data?.map((data) => (
                                                <div className="flex md:w-1/3 w-full">
                                                    <div className="md:px-1 py-2 font-semibold">{nullToNA(data?.displayString)} : </div>
                                                    <div className=" py-2">{nullToNA(data?.value)}</div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className='pb-2 mt-2 pl-2 flex'>
                                        {props?.permissions?.can_view_form && <button className={`float-left mr-4 border border-indigo-500 text-indigo-500 px-4 py-1 hover:shadow-xl transition-all duration-200 text-sm shadow-indigo-400 rounded-sm hover:bg-indigo-500 hover:text-white whitespace-nowrap`} onClick={() => window.open(`${props?.workflow?.fullDetailsUrl}/${props?.id}`, '_blank')}>View Full Details</button>}
                                        {/* <button className={`float-left mr-4 bg-white border border-indigo-500 text-indigo-500 px-4 py-1 shadow-lg hover:scale-105 rounded-sm hover:bg-indigo-500 hover:text-white`} onClick={() => navigate(`${props?.workflow?.fullDetailsUrl}/${props?.id}/workflow/${props?.tabIndex}`)}>View Full Details</button> */}
                                        {props?.permissions?.can_edit && props?.boxType == 'inbox' && <button className={`float-right mr-4 border border-indigo-500 text-indigo-500 px-4 py-1 hover:shadow-xl transition-all duration-400 text-sm shadow-indigo-200 rounded-sm hover:bg-indigo-500 hover:text-white whitespace-nowrap`} onClick={() => window.open(`${props?.workflow?.formUrl}/${props?.id}`, '_blank')}>Edit Form</button>}
                                        {/* {props?.boxType=='inbox' && <button className={`float-right mr-4 bg-white border border-indigo-500 text-indigo-500 px-4 py-1 shadow-lg hover:scale-105 rounded-sm hover:bg-indigo-500 hover:text-white whitespace-nowrap`} onClick={() => window.open(`${props?.workflow?.fullEdit}/${props?.id}`, '_blank')}>Full Edit Form</button>} */}
                                    </div>
                                </div>

                            </div>
                        {/* </div> */}
                    </div>
                    <div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default PilotWorkflowDataCard
/**
 * Exported to :
 * 1. PropertySafDetailsTabs Component
 * 
 */