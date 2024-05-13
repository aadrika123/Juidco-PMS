import React, { useEffect, useState } from 'react'
import BarLoader from '@/Components/Common/Loaders/BarLoader'
import home from './home.png'
import './home.css'
import DoughnutChart from './DoughnutChart'
import { getCurrentDate, indianDate, nullToZero } from '@/Components/Common/PowerupFunctions'
import AxiosInterceptors from '@/Components/Common/AxiosInterceptors'
import ApiHeader from '@/Components/api/ApiHeader'
import ProjectApiList from '@/Components/api/ProjectApiList'
import useSetTitle from '@/Components/Common/useSetTitle'

function PetDashboard() {

    useSetTitle("Home")

    const { approvedList, marriageApplicationList } = ProjectApiList()

    const [pendingData, setpendingData] = useState(null)
    const [approvedData, setapprovedData] = useState(null)
    const [isLoading, setisLoading] = useState(false)
    const [isLoading2, setisLoading2] = useState(false)

    ///////////{*** FUNCTION TO FETCH DASHBOARD DETAILS***}/////////
    useEffect(() => {
        fetchDashboardData()
    }, [])
    const fetchDashboardData = () => {
        setisLoading(true)
        setisLoading2(true)
        AxiosInterceptors.post(approvedList, {}, ApiHeader())
            .then(function (response) {
                console.log('dashboard data', response.data.data)
                setapprovedData(response.data.data)
            })
            .catch(function (error) {
                console.log('errorrr.... ', error);
            })
            .finally(() => setisLoading(false))

        AxiosInterceptors.post(marriageApplicationList, {}, ApiHeader())
            .then(function (response) {
                console.log('dashboard data', response.data.data)
                setpendingData(response.data.data)
                setisLoading(false)
            })
            .catch(function (error) {
                console.log('errorrr.... ', error);
            })
            .finally(() => setisLoading2(false))
    }
    {
        isLoading && <div className='inline'>
            <BarLoader />
        </div>
    }
    return (
        <>

            <div class="grid grid-cols-12 items-center">

                <h2 class=" mt-6 text-2xl truncate col-span-12 uppercase tracking-wide font-semibold text-center border-b pb-2 mb-6">Pet Registration Dashboard</h2>
                <div class="flex flex-wrap justify-center gap-4 md:gap-6 col-span-12 md:col-span-5 mt-4 md:mb-0 mb-4">
                    <div class="mx-10 w-full transform hover:scale-105 transition duration-300 shadow-xl rounded-lg  bg-white"
                    >
                        <div class="p-5">
                            <div class="flex justify-between">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-[#492dffdd]"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                </svg>
                                <div
                                    class="bg-[#492dffdd] rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-xs">
                                    <span class="flex items-center">{indianDate(getCurrentDate())}</span>
                                </div>
                            </div>
                            <div class="ml-2 w-full flex-1">
                                <div>
                                    <div class="flex justify-between mt-4 pr-4">
                                        <div class="mt-1 text-base text-gray-600">Pending Applications</div>
                                        <div className='font-bold leading-8 text-xl'>
                                            {(isLoading || isLoading2) ? <div class="spinner2"></div> : nullToZero(pendingData?.total)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mx-10 w-full transform hover:scale-105 transition duration-300 shadow-xl rounded-lg  bg-white"
                    >
                        <div class="p-5">
                            <div class="flex justify-between">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-green-400"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                </svg>
                                <div
                                    class="bg-green-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-xs">
                                    <span class="flex items-center">{indianDate(getCurrentDate())}</span>
                                </div>
                            </div>
                            <div class="ml-2 w-full flex-1">
                                <div>
                                    <div class="flex justify-between mt-4 pr-4">
                                        <div class="mt-1 text-base text-gray-600">Approved Applications</div>
                                        <div className='font-bold leading-8 text-xl'>{(isLoading || isLoading2) ? <div class="spinner2"></div> : nullToZero(approvedData?.total)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img src={home} alt="" srcset="" className='md:block hidden drop-shadow-xl shadow-blue-600 hover:scale-105 transition-all duration-300' />
                </div>
                <div className='col-span-12 md:col-span-7 flex justify-center md:pl-72'>

                    {(isLoading || isLoading2) ? <>
                        <div className='flex flex-col gap-2'>
                            <div class="spinner">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            <div className='mt-14 text-center font-semibold italic'>Loading Graph...</div>
                        </div>
                    </> : <>
                        {
                            (nullToZero(pendingData?.total) == '0' && nullToZero(approvedData?.total) == '0') ?
                                <div className='flex justify-center font-semibold w-full'>
                                    No data available to show graph
                                </div>
                                :
                                <DoughnutChart pending={nullToZero(pendingData?.total)} approved={nullToZero(approvedData?.total)} />
                        }
                    </>
                    }
                </div>
            </div>

            {/* <div>
                <h1 className='text-xl text-gray-600 font-bold p-4 mt-4 bg-white rounded leading-5 shadow-lg'>Advertisement Application List</h1>
                <AdvertisementHome />
            </div>
            <div>
                <h1 className='text-xl text-gray-600 font-bold p-4 mt-4 bg-white rounded leading-5 shadow-lg'>Market Section Application List</h1>
                <MarketHome />
            </div> */}

        </>
    )
}

export default PetDashboard