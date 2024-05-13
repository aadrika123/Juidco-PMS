import React, { useState } from 'react'
import {MdTag} from 'react-icons/md'
import { nullToNA } from '@/Components/Common/PowerupFunctions'

function PilotWorkflowFullDetailsTab(props) {
    const [editStatus, seteditStatus] = useState(false)
    const [btcStatus, setbtcStatus] = useState(false)
    const [normalState, setnormalState] = useState(true)
    const [selectList, setselectList] = useState([])
    const [selectListToShow, setselectListToShow] = useState([])
   


    const selectAction = (status, key, displayString) => {

        console.log('id...', displayString)
        // return
        // ADD TO LIST IF CHECKED 
        // if (status) {
        let tempSelectList = [...selectList, key]
        let tempSelectListToShow = [...selectListToShow, displayString]

        setselectList(tempSelectList)
        setselectListToShow(tempSelectListToShow)
        // }

        // REMOVE FORM LIST IF UNCHECKED

    }
    console.log('lis....', selectListToShow)
    return (
        <>

           <div class="rounded-lg z-50 w-full " >

                <div className=''>

                    {/* basic details */}
                    {props?.applicationData?.data?.fullDetailsData?.dataArray?.map((data) => (
                        <div className="w-full " >
                            <div className="container mb-0 mt-1 p-2 py-1 ">
                                <div className="md:flex no-wrap md:-mx-2 ">
                                    <div className="w-full ">
                                        <div className="md:p-3  rounded-sm">
                                            <div className="flex items-center pl-0 space-x-2 font-semibold text-gray-900 leading-8 mb-2">
                                                <div className="tracking-wide flex-1"><MdTag className="inline font-semibold" /> {nullToNA(data?.headerTitle)}</div>
                                            </div>
                                            <div className=' rounded-sm border border-gray-500 py-6 bg-white drop-shadow-lg'>
                                                <div className="grid grid-cols-10 space-y-2  pl-4 ">
                                                    {data?.data?.map((data) => (
                                                        <div className='col-span-5 md:col-span-2 text-xs'>
                                                            <div className='font-bold text-sm'>{nullToNA(data?.value)}</div>
                                                            <div className='text-gray-500 flex'>{nullToNA(data?.displayString)}
                                                                {/* {btcStatus && <input onClick={(e) => selectAction(e.target.value, data?.key, data?.displayString)} id={`check${data?.key}`} type="checkbox" className="ml-2 cursor-pointer w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                                                </input>}
                                                                {editStatus && <input id={`input${data?.key}`} value={data?.value} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                                                    placeholder="Enter new ward no." />} */}
                                                            </div>
                                                        </div>
                                                    ))}

                                                </div>

                                            </div>

                                        </div>



                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {
                        props?.applicationData?.data?.fullDetailsData?.tableArray?.map((data) => (
                            <div className="w-full  overflow-x-auto" >
                                <div className="container mb-0 mt-1 md:py-5 py-1 ">
                                    <div className="md:flex no-wrap md:-mx-2 ">
                                        <div className="w-full md:mx-2 ">
                                            <div className="px-1 md:p-3 rounded-sm">
                                                <div className="flex items-center pl-0 space-x-2 font-semibold text-gray-900 leading-8 mb-2">
                                                    <span className="tracking-wide"><MdTag className="inline font-semibold" /> {nullToNA(data?.headerTitle)}</span>
                                                </div>

                                                <>
                                                    <table className='min-w-full leading-normal mt-2 rounded-sm  border border-gray-500 py-6 bg-white drop-shadow-lg'>
                                                        <thead className='font-bold text-left text-sm bg-gray-100 text-gray-600'>
                                                            <tr>
                                                                {/* <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">#</th> */}
                                                                {data?.tableHead?.map((head) => (
                                                                    <th className="px-2 py-3 border-b border-gray-500  text-xs font-bold text-black capitalize text-left">{nullToNA(head)}</th>
                                                                ))}



                                                            </tr>
                                                        </thead>
                                                        <tbody className="text-sm">

                                                            <>
                                                                {data?.tableData?.map((dataIn, index) => (
                                                                    <tr className="bg-white  border-b border-gray-500">
                                                                        {/* <td className="px-2 py-2 text-sm text-left">{index + 1}</td> */}
                                                                        {dataIn?.map((dataIn2) => (
                                                                            <td className="px-2 py-2 text-sm text-left">{nullToNA(dataIn2)}</td>
                                                                        ))}
                                                                    </tr>
                                                                ))}
                                                            </>


                                                        </tbody>
                                                    </table>
                                                </>


                                            </div>



                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>

            </div>
        </>
    )
}

export default PilotWorkflowFullDetailsTab