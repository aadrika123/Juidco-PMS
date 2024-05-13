///////////////////////////////////////////////////////////////////////////////////////////////////////////
// 👉 Author      : R U Bharti
// 👉 Component   : MarriageDashboard
// 👉 Status      : Close
// 👉 Description : This component is for marriage home page.
// 👉 Functions   :  
//                  1. fetchApprovedList    -> To fetch approve marriage list.
//                  2. fetchPendingList     -> To fetch pending marriage list.
///////////////////////////////////////////////////////////////////////////////////////////////////////////

// 👉 Importing Packages 👈
import React, { useEffect, useState } from 'react'
import './home.css'
import AxiosInterceptors from '@/Components/Common/AxiosInterceptors'
import ApiHeader from '@/Components/api/ApiHeader'
import ProjectApiList from '@/Components/api/ProjectApiList'
import useSetTitle from '@/Components/Common/useSetTitle'
import { getLocalStorageItemJsonParsed } from '@/Components/Common/localstorage'
import Heading from './Heading'
import ApplicationCard from './ApplicationCard'
import ShortcutCard from './ShortcutCard'
import Table from './Table'
import PetRegAPIList from '@/Components/api/PetRegAPIList'
import { indianAmount, indianDate, nullToNA } from '@/Components/Common/PowerupFunctions'
import { useNavigate } from 'react-router-dom'

function PetRegDashboard() {
const Navigate = useNavigate()
    // 👉 Setting Title 👈
    useSetTitle("Home")

    // 👉 API constants 👈
    // const { approvedList, marriageApplicationList } = ProjectApiList()
    const { api_petDashboardDetails, marriageApplicationList } = PetRegAPIList()

    // 👉 Roles constant 👈
    const allRole = getLocalStorageItemJsonParsed('userDetails')?.roles

    // 👉 State constants 👈
    const [pendingData, setpendingData] = useState(null)
    const [landingDashboardData, setlandingDashboardData] = useState(null)
    const [isLoading, setisLoading] = useState(false)
    const [isLoading2, setisLoading2] = useState(false)

    // 👉 Function 1 👈
    const fetchApprovedList = () => {
        setisLoading(true)
        AxiosInterceptors.post(api_petDashboardDetails, {}, ApiHeader())
            .then(function (response) {
                // console.log('landingDashboardData list data---->', response.data.data)
                setlandingDashboardData(response.data.data)
            })
            .catch(function (error) {
                console.log('errorrr.... ', error);
            })
            .finally(() => setisLoading(false))
    }
// const DashboardData = landingDashboardData?.pendingApplicationCount?.map((item) => (item?.total_pending_application) )
const approveddDatas = landingDashboardData?.approvedApplicationCount?.total_approved_application
const pendingDatas = landingDashboardData?.pendingApplicationCount?.total_pending_application


    // 👉 Function 2 👈
    const fetchPendingList = () => {
        setisLoading2(true)
        AxiosInterceptors.post(marriageApplicationList, {}, ApiHeader())
            .then(function (response) {
                console.log('pending list data', response.data.data)
                setpendingData(response.data.data)
                setisLoading(false)
            })
            .catch(function (error) {
                console.log('errorrr.... ', error);
            })
            .finally(() => setisLoading2(false))
    }

    // 👉 Render to call functions 👈
    useEffect(() => {
        fetchApprovedList()
        fetchPendingList()
    }, [])

    return (
        <>

            {/* 👉 Heading Card 👈 */}
            <Heading
                matchForApply={['JSK']}
                matchForSafWf={['REGISTRAR', 'BACK OFFICE']}
                allRole={allRole}
                heading={"Pet Home Page"}
                subHeading={"Verified Account"}
                changePasswordLink={'/change-password'}
                mainWorkflowLink={'/pet-workflow'}
                // applyLink={'/Pet-Application-apply'}
                applyLink={'/pet-registration'}
            />

            {/* 👉 Middle Cards 👈 */}
            <div class="grid grid-cols-12 items-center mx-10 ">

                {/* 👉 Application Card 👈 */}
                <div class="flex flex-row flex-wrap gap-4 items-start col-span-12 md:col-span-6">
                    <div className="w-full md:w-[40%]">
                        <ApplicationCard
                            heading={"Pending Application"}
                            total={landingDashboardData?.pendingApplicationCount?.total_pending_application}
                            loading={isLoading}
                        />
                    </div>

                    <div className="w-full md:w-[40%]">
                        <ApplicationCard
                            heading={"Approved Application"}
                            total={landingDashboardData?.approvedApplicationCount?.total_approved_application}
                            loading={isLoading2}
                        />
                    </div>

                </div>

                {/* 👉 Shortcuts Card 👈 */}
                <div class="flex flex-col flex-wrap gap-4 justify-center col-span-12 md:col-span-6 md:mt-0 mt-10">
                    <div className="w-full md:w-[50%]">

                        <ShortcutCard
                            heading={"Pet Application List"}
                            path={'/search-pet-registration'}
                        />
                    </div>
                    <div className="w-full md:w-[50%]">

                        <ShortcutCard
                            heading={"Pet Registered  List"}
                            path={'/search-approved-pet-registration'}
                        />
                    </div>

                </div>

            </div>

            {/* 👉 Recent Application Table 👈 */}
            <div className='mx-10 mt-10 md:w-auto w-[80vw] overflow-auto'>
                <div className="font-bold text-md mb-2 flex-1 text-gray-600"># Recent Applications</div>
                <div className="py-0 shadow-xl mt-3">
                        <div className="overflow-x-auto">
                            <div className="inline-block min-w-full overflow-hidden">
                                <table className="min-w-full leading-normal">
                                    <thead className='bg-slate-200'>
                                        <tr className='font-semibold'>
                                            <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm">
                                                #
                                            </th>
                                            <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm">
                                            Application No
                                            </th>
                                            <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm">
                                            Applicant Name
                                            </th>
                                            <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm">
                                            Application Type
                                            </th>
                                            <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm">
                                            Apply Date
                                            </th>
                                            <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm">
                                           Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        { landingDashboardData?.recentApplications?.map((data, index) => (
                                                <tr className="bg-white shadow-lg border-b border-gray-200">
                                                    <td className="px-5 py-2 text-sm text-left">{index + 1}</td>
                                                    <td className="px-5 py-2 text-sm text-left">{nullToNA(data?.application_no)}</td>
                                                    <td className="px-5 py-2 text-sm text-left">{nullToNA(data?.applicant_name)}</td>
                                                    <td className="px-5 py-2 text-sm text-left">{nullToNA(data?.ref_application_type)}</td>
                                                    <td className="px-5 py-2 text-sm text-left">{indianDate(data?.application_apply_date)}</td>

                                                    <td className="px-2 py-2 text-sm text-left">
                                                        <button onClick={() => Navigate(`/viewPetApplication/${data?.ref_application_id}`)} type="button" className="cypress_owner_add_update px-4 py-2 border border-indigo-500 text-indigo-500 font-medium text-xs leading-tight capitalize rounded shadow-xl hover:bg-indigo-700 hover:text-white hover:shadow-lg  active:shadow-lg transition duration-150 ease-in-out cursor-pointer">View</button>
                                                        {/* <button  type="button" className="cypress_owner_add_update px-4 py-2 border border-indigo-500 text-indigo-500 font-medium text-xs leading-tight capitalize rounded shadow-xl hover:bg-indigo-700 hover:text-white hover:shadow-lg  active:shadow-lg transition duration-150 ease-in-out cursor-pointer">View</button> */}
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                        {
                                            landingDashboardData?.recentApplications?.length == 0 &&
                                            <tr><td colSpan={5} className="text-center text-red-500 font-semibold py-4">Record Not Found ...</td></tr>
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                {/* <Table
                    loading={isLoading2}
                    heading={['APPLICATION NO.', 'APPLICATION NAME', 'PHONE NO', 'TYPE', 'APPLIED DATE']}
                    dataKey={['application_no', 'bride_name', 'groom_name', 'marriage_place', 'marriage_date']}
                    data={pendingData?.data ?? []}
                    // viewLink={'/marriage-details/'}
                    viewLink={'/viewPetApplication/'}
                /> */}
            </div>

        </>
    )
}

export default PetRegDashboard