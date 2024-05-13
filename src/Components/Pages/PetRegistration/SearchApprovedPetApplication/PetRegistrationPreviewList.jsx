import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import PetRegAPIList from '@/Components/api/PetRegAPIList';
import AxiosInterceptors from '@/Components/Common/AxiosInterceptors';

const PetRegistrationPreviewList = () => {
    const [applicationList, setApplicationList] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const {api_petRegistrationsPreviewList, header } = PetRegAPIList()
    const navigate = useNavigate()
     const {registration_id} =useParams()
    const fetchApplicationList = () => {
        setIsLoading(true)
        AxiosInterceptors.post(api_petRegistrationsPreviewList, {registrationId: registration_id}, header)
            .then((res) => {
                setIsLoading(false)
                if (res.data.status) {
                    setApplicationList(res.data.data)
                    console.log("list of applied list", res.data.data)
                } else {
                    console.log("Failed to get application list", res.data.data)
                }
            })
            .catch((err) => {
                console.log("Error while getting applied list", err)
                setIsLoading(false)
            })
    }
    useEffect(() => {
        fetchApplicationList()
    }, [])
    if (isLoading) return "Loading..";
    if (!applicationList?.length) return  <h1 className='text-center border border-red-200 rounded my-5'>No Data Found.</h1>
    return (
        <>
            <div className='w-full ml-2 md:ml-0 mb-10'>
                <p className='font-manrope md:my-4 '>Total Renewal List : <span className='font-semibold'>{applicationList?.length}</span></p>
                <div className='hidden md:block bg-gray-200 text-gray-700 py-3 font-semibold rounded-md'>
                    <div className='grid grid-cols-12 items-center'>
                        <p className='px-2 col-span-3 whitespace-nowrap'>Registration No</p>
                        <p className='px-2 col-span-2'>Applicant Name</p>
                        <p className='px-1 col-span-2'>Type</p>
                        <p className='px-2 col-span-2 whitespace-nowrap'>From Date</p>
                        <p className='px-2 col-span-2 whitespace-nowrap'>To Date</p>
                        <p className='px-2 col-span-1'>Action</p>
                    </div>
                </div>
                <div className='overflow-y-auto h-screen mb-40 md:mr-0 mr-5 '>
                    {applicationList && applicationList?.map((item, index) => (
                        <div className='w-full border border-gray-300 rounded-md my-2 bg-white cursor-pointer'
                         >
                            <div className=' flex md:grid grid-cols-12 items-center justify-between border-b border-gray-100'>
                                <p className="px-2 py-2 break-all font-manrope font-semibold col-span-3 text-xs md:text-base">
                                    {item?.application_no}
                                </p>
                                <p className="hidden md:block px-2 py-2 break-all col-span-2">
                                    {item?.applicant_name}
                                </p>
                                <p className="px-1 py-1 break-words  flex col-span-2 text-xs md:text-base">
                                    {/* {item?.current_status} */} Renewal
                                </p>
                               
                                <p className="hidden md:block  py-2 col-span-2">
                                    {moment(item?.validFrom, 'YYYY-MM-DD').format('DD-MMM-yy')}
                                </p>
                                <p className="hidden md:block  py-2 col-span-2">
                                    {moment(item?.validUpto, 'YYYY-MM-DD').format('DD-MMM-yy')}
                                </p>
                                <p className='mr-1 px-2 md:px-3 py-1 col-span-1 rounded text-xs md:text-sm text-white bg-indigo-500 hover:bg-indigo-600 text-center'onClick={() => navigate(`/viewPreviewApplication/${item?.id}`)} >View</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default PetRegistrationPreviewList