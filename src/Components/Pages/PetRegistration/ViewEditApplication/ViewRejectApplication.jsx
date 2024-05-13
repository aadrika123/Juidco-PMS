// Importing necessary dependencies and components
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import moment from "moment";
import petIcon from './pet-house.png'
import PetRegAPIList from '@/Components/api/PetRegAPIList.js';
import ShimmerEffectInline from '@/Components/Common/Loaders/ShimmerEffectInline';
import AxiosInterceptors from '@/Components/Common/AxiosInterceptors';
import useSetTitle from '@/Components/Common/useSetTitle';

// Component for viewing details of a rejected pet application
const ViewRejectApplication = () => {

// Hook to set the title of the page
    useSetTitle("View Pet Application")

// Hook for programmatic navigation and getting the application ID from the URL parameters
    const navigate = useNavigate()
    const { id } = useParams()

// State variables for managing application data, loading state, and error state
    const [applicationFullData, setApplicationFullData] = useState()
    const [loader, setLoader] = useState(false)
    const [somethingWentWrong, setSomethingWentWrong] = useState(false)

    // API endpoints for fetching rejected pet application details
    const { api_PetRejectedViewApplication, header } = PetRegAPIList();

    // Effect hook to fetch application data when the component mounts
    useEffect(() => {
        setLoader(true)
        AxiosInterceptors.post(api_PetRejectedViewApplication, { "registrationId": id }, header)
            .then((res) => {
                setLoader(false)
                if (res.data.status) {
                    setApplicationFullData(res.data.data)
                } else {
                    setApplicationFullData(null)
                    console.log("Failed to fetch application data")
                }
            })
            .catch((err) => {
                setLoader(false)
                console.log("Error while getting application data")
            })
    }, [])
    console.log("applicationFullData", applicationFullData)
    return (
        <>
            <div className="flex justify-between">
                <p className="text-xl">Application No : <span className="font-semibold">{applicationFullData?.application_no}</span></p>
            </div>
            <div className="grid grid-cols-12 mb-20">
                <div className="rounded-md col-span-12">
                    {applicationFullData?.current_role_name && <p className="text-center text-green-600 font-semibold"> Your Application Submitted. Currently at {applicationFullData?.current_role_name}</p>}
                    {somethingWentWrong == true ? <p className='m-auto mt-10 font-semibold border border-gray-300 text-red-700 bg-red-100 px-5 py-2 rounded shadow w-fit'>Failed to Get Data</p> :
                        <div className="overflow-y-auto">

                            {/* Property  details */}
                            <div className='bg-white shadow-xl p-4 border border-gray-200 my-3'>
                                <h1 className='px-1 font-semibold font-serif text-xs mt-2 text-[#37517e]'><img src='https://cdn-icons-png.flaticon.com/512/609/609803.png' alt="pin" className='w-5 inline text-[#37517e]' /> Property Address & Details</h1>
                                {loader ? <ShimmerEffectInline /> :

                                    <div className='mt-2'>
                                        <div className="flex space-x-10 pl-4 ">
                                            <div className='flex-1 text-xs'>
                                                <div className='text-[#37517e]'>ULB Name</div>
                                                <div className='font-semibold text-sm text-[#37517e]'>{applicationFullData?.ulb_name ? applicationFullData?.ulb_name : "N/A"}</div>
                                            </div>
                                            <div className='flex-1 text-xs'>
                                                <div className='text-[#37517e]'>Ward No</div>
                                                <div className='font-bold text-sm text-[#37517e]'>{applicationFullData?.ward_name ? applicationFullData?.ward_name : "N/A"}</div>
                                            </div>
                                            <div className='flex-1 text-xs'>
                                                <div className='text-[#37517e]'>Apply Through</div>
                                                <div className='font-bold text-sm text-[#37517e]'>{applicationFullData?.apply_through_name ? applicationFullData?.apply_through_name : "N/A"}</div>
                                            </div>

                                            <div className='flex-1 text-xs'>
                                                <div className='text-[#37517e]'>Category of Application</div>
                                                <div className='font-bold text-sm text-[#37517e]'>{applicationFullData?.ref_application_type ? applicationFullData?.ref_application_type : "N/A"}</div>
                                            </div>
                                            {applicationFullData?.holding_no &&
                                                <div className='flex-1 text-xs'>
                                                    <div className='text-[#37517e]'>Holding No</div>
                                                    <div className='font-bold text-sm text-[#37517e]'>{applicationFullData?.holding_no ? applicationFullData?.holding_no : "N/A"}</div>
                                                </div>
                                            }
                                            {applicationFullData?.saf_no &&
                                                < div className='flex-1 text-xs'>
                                                    <div className='text-[#37517e]'>SAF No</div>
                                                    <div className='font-bold text-sm text-[#37517e]'>{applicationFullData?.saf_no ? applicationFullData?.saf_no : "N/A"}</div>
                                                </div>
                                            }
                                        </div>
                                        <div></div>
                                        {/* coressponding address */}
                                        <div className="col-span-4 grid grid-cols-5 justify-center items-center">
                                            <div className="col-span-2 flex justify-center items-center w-full h-[1px] bg-gray-400"></div>
                                            <div className='flex justify-center items-center'><label className="form-check-label text-gray-800"> <small className="block mt-1 text-xs text-gray-400 inline md:px-4 font-mono text-center">Complete Address</small></label></div>
                                            <div className="col-span-2 flex justify-center items-center w-full h-[1px] bg-gray-400"></div>
                                        </div>

                                        <div className="px-4">
                                            <div className='flex text-xs'>
                                                <div className='flex-1 text-xs'>
                                                    <div className='text-[#37517e]'>Address</div>
                                                    <div className='font-bold text-sm text-[#37517e]'>{applicationFullData?.address ? applicationFullData?.address : "N/A"}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                            {/* Pet  details */}
                            <div className='bg-white shadow-xl p-4 border border-gray-200 my-3'>
                                <h1 className='px-1 font-semibold font-serif text-xs mt-2 text-[#37517e]'><img src={petIcon} alt="Pet Detail" className='w-5 inline text-[#37517e]' /> Pet Details</h1>
                                {loader ? <ShimmerEffectInline /> :
                                    <div className='mt-2 space-y-5'>
                                        <div className="flex space-x-10 pl-4 ">
                                            <div className='flex-1 text-xs'>
                                                <div className='text-[#37517e]'>Pet Type</div>
                                                <div className='font-semibold text-sm text-[#37517e]'>{applicationFullData?.pet_type ? applicationFullData?.pet_type == 1 && "Dog" : "N/A"}</div>
                                            </div>
                                            <div className='flex-1 text-xs'>
                                                <div className='text-[#37517e]'>Name of Pet</div>
                                                <div className='font-bold text-sm text-[#37517e]'>{applicationFullData?.pet_name ? applicationFullData?.pet_name : "N/A"}</div>
                                            </div>
                                            <div className='flex-1 text-xs'>
                                                <div className='text-[#37517e]'>Gender</div>
                                                <div className='font-bold text-sm text-[#37517e]'>
                                                    {applicationFullData?.sex == 1 && "Male"}
                                                    {applicationFullData?.sex == 2 && "Female"}
                                                    {!applicationFullData?.sex && "N/A"}
                                                </div>
                                            </div>
                                            <div className='flex-1 text-xs'>
                                                <div className='text-[#37517e]'>Date of Birth</div>
                                                <div className='font-bold text-sm text-[#37517e]'>
                                                    <div className='font-bold text-sm text-[#37517e]'>{applicationFullData?.dob  ? moment(applicationFullData.dob).format('DD-MM-Y') : "N/A"}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex space-x-10 pl-4 ">
                                            {/* <div className='flex-1 text-xs'>
                                                <div className='text-[#37517e]'>Identity Mark</div>
                                                <div className='font-semibold text-sm text-[#37517e]'>{applicationFullData?.identification_mark ? applicationFullData?.identification_mark : "N/A"}</div>
                                            </div> */}
                                            <div className='flex-1 text-xs'>
                                                <div className='text-[#37517e]'>Breed</div>
                                                <div className='font-bold text-sm text-[#37517e]'>{applicationFullData?.breed ? applicationFullData?.breed : "N/A"}</div>
                                            </div>
                                            <div className='flex-1 text-xs'>
                                                <div className='text-[#37517e]'>Color</div>
                                                <div className='font-bold text-sm text-[#37517e]'>{applicationFullData?.color ? applicationFullData?.color : "N/A"}</div>
                                            </div>
                                            <div className='flex-1 text-xs'>
                                                <div className='text-[#37517e]'>Veterinary Doctor Name</div>
                                                <div className='font-bold text-sm text-[#37517e]'>{applicationFullData?.vet_doctor_name ? applicationFullData?.vet_doctor_name : "N/A"}</div>
                                            </div>
                                            <div className='flex-1 text-xs'>
                                            </div>
                                        </div>
                                        <div className="flex space-x-10 pl-4 ">
                                            <div className='flex-1 text-xs'>
                                                <div className='text-[#37517e]'>Doctor’s MSVC/VCI number</div>
                                                <div className='font-semibold text-sm text-[#37517e]'>{applicationFullData?.doctor_registration_no ? applicationFullData?.doctor_registration_no : "N/A"}</div>
                                            </div>
                                            <div className='flex-1 text-xs'>
                                                <div className='text-[#37517e]'>Date of Rabies</div>
                                                <div className='font-bold text-sm text-[#37517e]'>{applicationFullData?.rabies_vac_date  ? moment(applicationFullData.rabies_vac_date).format('DD-MM-Y') : "N/A"}</div>
                                               
                                            </div>
                                            {/* <div className='flex-1 text-xs'>
                                                <div className='text-[#37517e]'>Date of Rabies</div>
                                                <div className='font-bold text-sm text-[#37517e]'> {applicationFullData?.rabies_vac_date  ? moment(applicationFullData.rabies_vac_date).format('DD-MM-YYYY') : "N/A"}</div>     
                                            </div> */}
                                            <div className='flex-1 text-xs'>
                                                <div className='text-[#37517e]'>Leptospirosis Vaccination Date</div>
                                                <div className='font-bold text-sm text-[#37517e]'>{applicationFullData?.leptospirosis_vac_date  ? moment(applicationFullData.leptospirosis_vac_date).format('DD-MM-Y') : "N/A"}</div>
                                            </div>
                                            <div className='flex-1 text-xs'>
                                                <div className='text-[#37517e]'>Pet From</div>
                                                <div className='font-bold text-sm text-[#37517e]'>{applicationFullData?.occurrence_types ? applicationFullData?.occurrence_types : "N/A"}</div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                            {/* owner details */}
                            <div className='bg-white shadow-xl p-4 border border-gray-200 my-5'>
                                <h1 className='px-1 font-semibold font-serif text-xs text-[#37517e]'><img src='https://cdn-icons-png.flaticon.com/512/2029/2029957.png' alt="pin" className='w-5 inline text-[#37517e]' /> Owner Details</h1>
                                {loader ? <ShimmerEffectInline /> :
                                    <table className='min-w-full leading-normal mt-2 bg-white'>
                                        <thead className='font-bold text-left text-sm border text-[#37517e] bg-sky-100'>
                                            <tr>
                                                <th className="px-2 py-3 border-b border-gray-200 text-xs uppercase text-left">#</th>
                                                <th className="px-2 py-3 border-b border-gray-200 text-xs uppercase text-left">Owner Name</th>
                                                {/* <th className="px-2 py-3 border-b border-gray-200 text-xs uppercase text-left">Father Name</th> */}
                                                <th className="px-2 py-3 border-b border-gray-200 text-xs uppercase text-left">Mobile No.</th>
                                                <th className="px-2 py-3 border-b border-gray-200 text-xs uppercase text-left">Email </th>
                                                <th className="px-2 py-3 border-b border-gray-200 text-xs uppercase text-left">PAN No</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm">
                                            <>
                                                {/* {applicationFullData?.ownerDetails?.map((items, i) => ( */}
                                                <tr className="bg-white shadow-lg border-b border-gray-200">
                                                    <td className="px-2 py-2 text-sm text-left text-[#37517e]">1</td>
                                                    <td className="px-2 py-2 text-sm text-left text-[#37517e]">{applicationFullData?.applicant_name ? applicationFullData?.applicant_name : "N/A"}</td>
                                                    {/* <td className="px-2 py-2 text-sm text-left text-[#37517e]">{applicationFullData?.guardian_name ? applicationFullData?.guardian_name : "N/A"}</td> */}
                                                    <td className="px-2 py-2 text-sm text-left text-[#37517e]">{applicationFullData?.mobile_no ? applicationFullData?.mobile_no : "N/A"}</td>
                                                    <td className="px-2 py-2 text-sm text-left text-[#37517e]">{applicationFullData?.email ? applicationFullData?.email : "N/A"}</td>
                                                    <td className="px-2 py-2 text-sm text-left text-[#37517e]">{applicationFullData?.pan_no ? applicationFullData?.pan_no : "N/A"}</td>
                                                </tr>
                                                {/* ))} */}
                                            </>
                                        </tbody>
                                    </table>
                                }
                            </div>
                            {/* Payment Details */}
                            <div className='bg-white shadow-xl p-4 border border-gray-200'>
                                <h1 className='px-1 font-semibold font-serif text-xs mt-2 text-[#37517e]'><img src='https://cdn-icons-png.flaticon.com/512/8948/8948774.png' alt="Upload" className='w-5 inline text-[#37517e]' /> Payment Details</h1>
                                {loader ? <ShimmerEffectInline /> : applicationFullData?.payment_status == 0 ?
                                    ""
                                    :
                                    <div className='mt-2'>
                                        <div className="flex space-x-10 pl-4 ">
                                            <div className='text-xs'>
                                                <div className='text-[#37517e]'>Sl.</div>
                                            </div>
                                            <div className='flex-1 text-xs'>
                                                <div className='text-[#37517e]'>Trans No</div>
                                            </div>
                                            <div className='flex-1 text-xs'>
                                                <div className='text-[#37517e]'>Amount</div>
                                            </div>
                                            <div className='flex-1 text-xs'>
                                                <div className='text-[#37517e]'>Payment Mode</div>
                                            </div>
                                            <div className=' text-xs'>
                                                <div className='text-[#37517e]'>Status</div>
                                            </div>
                                            <div className='flex-1 text-xs'>
                                                <div className='text-[#37517e]'>Payment Date</div>
                                            </div>
                                            <div className='flex-1 text-xs'>
                                                <div className='text-[#37517e]'>Action</div>
                                            </div>
                                        </div>
                                        {applicationFullData?.transactionDetails &&
                                            <div className="flex space-x-10 pl-4 my-2 border-y-gray-200">
                                                <div className='text-xs'>
                                                    <div className='font-semibold text-sm text-[#37517e]'>1.</div>
                                                </div>
                                                <div className='flex-1 text-xs'>
                                                    <div className='font-semibold text-sm whitespace-nowrap text-[#37517e]'>{applicationFullData?.transactionDetails?.tran_no || "N/A"}</div>
                                                </div>
                                                <div className='flex-1 text-xs'>
                                                    <div className='font-bold text-sm text-[#37517e]'>{applicationFullData?.transactionDetails?.amount || "N/A"}</div>
                                                </div>
                                                <div className='flex-1 text-xs'>
                                                    <div className='font-semibold text-sm text-[#37517e]'>{applicationFullData?.transactionDetails?.payment_mode || "N/A"}</div>
                                                </div>
                                                <div className='text-xs'>
                                                    <div className='font-semibold text-sm text-[#37517e]'>
                                                        Paid
                                                    </div>
                                                </div>
                                                <div className='flex-1 text-xs'>
                                                    <div className='font-semibold text-sm text-[#37517e]'>{moment(applicationFullData?.transactionDetails?.created_at).format('DD-MM-yy') || "N/A"}</div>
                                                </div>
                                                <div className='flex-1 text-xs'>
                                                    <div className='font-semibold text-sm text-[#37517e]'>
                                                        <button className="border px-3 py-1 rounded shadow border-blue-500 hover:bg-blue-500 hover:text-white text-blue-500 whitespace-nowrap" onClick={() => navigate(`/pet-payment-receipt/${applicationFullData?.transactionDetails?.tran_no}`)}>Print Receipt</button>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    }
                </div>
            </div >
        </>
    )
}

export default ViewRejectApplication