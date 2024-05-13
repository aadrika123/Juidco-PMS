// Importing necessary dependencies and components
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import moment from "moment";
import pdfImage from '@/assets/Images/pdf.png'
import petIcon from './pet-house.png'
import PetRegDeleteModal from '../PetRegDeleteModal';
import PetRegAPIList from '@/Components/api/PetRegAPIList.js';
import ShimmerEffectInline from '@/Components/Common/Loaders/ShimmerEffectInline';
import AxiosInterceptors from '@/Components/Common/AxiosInterceptors';
import EditPetDetailsForm from './EditPetDetailsForm';
import useSetTitle from '@/Components/Common/useSetTitle';

// Component for viewing details of a pet application
const ViewPetApplication = () => {
    // Hook to set the title of the page
    useSetTitle("View Pet Application")

    // Hook for programmatic navigation and getting the application ID from the URL parameters
    const navigate = useNavigate()
    const { id } = useParams()

    // State variables for managing application data, deletion, and editing
    const [applicationFullData, setApplicationFullData] = useState()
    const [dataTobeDeleted, setDataTobeDeleted] = useState();
    const [editPetData, setEditPetData] = useState(false)
    const [loader, setLoader] = useState(false)
    const [somethingWentWrong, setSomethingWentWrong] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const editPetApplicationRef = useRef()

    // API endpoints for fetching pet application details
    const { api_PetRegViewApplication, header } = PetRegAPIList();

    // Effect hook to fetch application data when the component mounts
    useEffect(() => {
        setLoader(true)
        AxiosInterceptors.post(api_PetRegViewApplication, { "applicationId": id }, header)
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

    // Function to handle deletion of the application
    const handleDeleteApplication = (data) => {
        setDataTobeDeleted(data)
        // setOpenDeleteModal(prev => prev + 1)
        setOpenDeleteModal(true)
    }

    // Function to open the edit pet details modal
    const openDialogModal = () => {
        editPetApplicationRef.current.showModal()
        setEditPetData(applicationFullData)
    }

    // Assume user data is stored in local storage as a JSON string
    const userDataString = localStorage.getItem('userDetails');
    console.log("object", userDataString)
    // Parse the JSON string into an object
    const userDetails = JSON.parse(userDataString);

    // Check if userData is not null and has roles
    if (userDetails && userDetails.roles) {
        // Iterate over roles and perform actions
        userDetails.roles.forEach(function (role) {
            // Perform actions based on role
            if (role == 'BACK OFFICE') {
                console.log('User has Back Office role.');
            } else if (role == 'FRONT OFFICE') {
                console.log('User has Front Office role.');
            }
            // Add more conditions as needed
        });
    } else {
        console.log('User data or roles not found in local storage.');
    }



    return (
        <>
            {openDeleteModal && <PetRegDeleteModal setOpenDeleteModal={setOpenDeleteModal} dataTobeDeleted={dataTobeDeleted} />}
            {/* <PetRegTopButtons active="application" consumerNo={applicationFullData?.application_no} /> */}
            <div className="col-span-2 space-y-2">
                {applicationFullData?.payment_status == 1 ? <p className="text-xl font-serif">Your application is at : <span className="font-semibold">{applicationFullData?.roleName}</span></p> : <>{applicationFullData?.payment_status == 2 ? <p className="text-xl font-serif"> Your application payment is under : <span className="font-semibold">verification</span></p> : ''}</>}
                <p className="text-xl font-serif">Application No : <span className="font-semibold ">{applicationFullData?.application_no}</span></p>
                {/* <button onClick={() => navigate(-1)} className={`font-semibold md:text-base text-xs bg-indigo-500 text-white border border-indigo-500  px-4 py-1 shadow-lg hover:scale-105 rounded-sm`} >Back</button> */}
            </div>
            <div className="grid grid-cols-12 mb-20">
                {/* <BreadCrumb title="abc" /> */}
                <div className="rounded-md col-span-12">
                    {/* <p className="text-center text-xl font-semibold mx-5 text-gray-700"> YOUR PENDING APPLICATION : {applicationFullData?.applicationDetails?.application_no ? applicationFullData?.applicationDetails?.application_no : "N/A"} </p> */}
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
                                {/* {
                                    applicationFullData?.payment_status == 0 && applicationFullData?.application_type == "New_Apply" ?
                                        <div className='space-x-5 flex justify-end'>
                                            <button className='bg-sky-600 hover:bg-sky-500 text-white px-5 py-1 rounded shadow flex justify-end ' onClick={openDialogModal}>Edit Application</button>
                                            <button onClick={() => handleDeleteApplication({ "application_no": applicationFullData?.application_no, "id": applicationFullData?.id })} type='button' className='bg-red-600 hover:bg-red-500 text-white px-5 py-1 rounded shadow'>Delete Application</button>

                                        </div> : ""
                                } */}
                                {
                                    ( userDetails?.roles?.includes('BACK OFFICE') ||
                                        (userDetails?.roles?.length == 0 &&
                                            applicationFullData?.payment_status == 0 &&
                                            applicationFullData?.application_type == "New_Apply" &&
                                            applicationFullData?.application_status == "Pending")) && // Extra condition added
                                    <div className='space-x-5 flex justify-end'>
                                        <button className='bg-sky-600 hover:bg-sky-500 text-white px-5 py-1 rounded shadow flex justify-end ' onClick={openDialogModal}>Edit Application</button>
                                        {/* <button onClick={() => handleDeleteApplication({ "application_no": applicationFullData?.application_no, "id": applicationFullData?.id })} type='button' className='bg-red-600 hover:bg-red-500 text-white px-5 py-1 rounded shadow'>Delete Application</button> */}
                                    </div>
                                }





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
                                                    <div className='font-bold text-sm text-[#37517e]'>{applicationFullData?.dob ? moment(applicationFullData.dob).format('DD-MM-Y') : "N/A"}</div>
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
                                                <div className='font-bold text-sm text-[#37517e]'>{applicationFullData?.rabies_vac_date ? moment(applicationFullData.rabies_vac_date).format('DD-MM-Y') : "N/A"}</div>

                                            </div>
                                            {/* <div className='flex-1 text-xs'>
                                                <div className='text-[#37517e]'>Date of Rabies</div>
                                                <div className='font-bold text-sm text-[#37517e]'> {applicationFullData?.rabies_vac_date  ? moment(applicationFullData.rabies_vac_date).format('DD-MM-YYYY') : "N/A"}</div>     
                                            </div> */}

                                            <div className='flex-1 text-xs'>
                                                <div className='text-[#37517e]'>Leptospirosis Vaccination Date</div>
                                                <div className='font-bold text-sm text-[#37517e]'>{applicationFullData?.leptospirosis_vac_date ? moment(applicationFullData.leptospirosis_vac_date).format('DD-MM-Y') : "N/A"}</div>
                                            </div>
                                            <div className='flex-1 text-xs'>
                                                <div className='text-[#37517e]'>Pet From</div>
                                                <div className='font-bold text-sm text-[#37517e]'>{applicationFullData?.occurrence_types ? applicationFullData?.occurrence_types : "N/A"}</div>
                                            </div>
                                        </div>

                                    </div>
                                }
                            </div>


                            {/* Document details */}
                            {loader ? <ShimmerEffectInline /> : applicationFullData?.documentDetails?.doc_upload_status &&
                                <div className='bg-white shadow-xl p-4 border border-gray-200 my-5'>
                                    <h1 className='px-1 font-semibold font-serif text-xs text-[#37517e]'><img src='https://cdn-icons-png.flaticon.com/512/2029/2029957.png' alt="pin" className='w-5 inline text-[#37517e]' /> Document Details</h1>

                                    <table className='min-w-full leading-normal mt-2 bg-white'>
                                        <thead className='font-bold text-left text-sm border text-[#37517e] bg-sky-100'>
                                            <tr>
                                                <th className="px-2 py-3 border-b border-gray-200 text-xs uppercase text-left">#</th>
                                                <th className="px-2 py-3 border-b border-gray-200 text-xs uppercase text-left">Document Name</th>
                                                <th className="px-2 py-3 border-b border-gray-200 text-xs uppercase text-left">Status</th>
                                                <th className="px-2 py-3 border-b border-gray-200 text-xs uppercase text-left">Preview</th>
                                                <th className="px-2 py-3 border-b border-gray-200 text-xs uppercase text-left">View </th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm">
                                            <>
                                                {applicationFullData?.documentDetails?.documentsList?.map((items, i) => (
                                                    <tr className="bg-white shadow-lg border-b border-gray-200">
                                                        <td className="px-2 py-2 text-sm text-left text-[#37517e]">{i + 1}</td>
                                                        <td className="px-2 py-2 text-sm text-left text-[#37517e]">{items?.docName ? items?.docName : "N/A"}</td>
                                                        <td className="px-2 py-2 text-sm text-left text-[#37517e]">{items?.uploadDoc == "" ? <p className="text-red-400 font-semibold">NotUpload</p> : <p className="text-green-400 font-semibold">Uploaded</p>}</td>
                                                        <td className="px-2 py-2 text-sm text-left text-[#37517e]">

                                                            {items?.uploadDoc?.doc_path?.split('.').pop() == "pdf" ? <img className="h-10 w-10 border rounded shadow-md" src={pdfImage} /> :
                                                                items?.uploadDoc?.doc_path ? <img className="h-10 w-10 border rounded shadow-md" src={items?.uploadDoc?.doc_path} /> : "N/A"}

                                                        </td>
                                                        <td className="px-2 py-2 text-sm text-left text-[#37517e]">{items?.uploadDoc?.doc_path ?
                                                            <button
                                                                // onClick={() => handleViewUploadedDoc(items?.uploadDoc?.doc_path, items?.uploadDoc?.docName)}
                                                                className="bg-indigo-600 text-white px-2 py-1 rounded">View</button> : <button disabled className="bg-indigo-200 text-white px-2 py-1 rounded">View</button>}</td>
                                                    </tr>
                                                ))}
                                            </>

                                        </tbody>
                                    </table>
                                    {/*
                                    <div>
                                        <div className="text-center">
                                            <p>Please Upload Document</p>
                                        </div>
                                        <div className="flex justify-center">
                                            <button onClick={() => navigate(`/apply-pet-registration/document-upload/${id}`)} className="px-2 py-1 bg-indigo-600 text-sm text-white">Upload Document</button>
                                        </div>
                                    </div> */}
                                </div>
                            }

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
                                    <div className="text-center text-indigo-600">
                                        <div>
                                            <div className="text-center">
                                                <p>Please Make Payment </p>
                                            </div>
                                            <div className="flex justify-center">
                                                <button onClick={() => navigate(`/pet-payment-offline/${id}`)}
                                                    className="px-2 py-1 bg-indigo-600 text-sm text-white">Pay Now</button>
                                            </div>
                                        </div>
                                    </div>
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
            <dialog ref={editPetApplicationRef}>
                <div className='z-50  '>
                    {/* Pet  details */}
                    <EditPetDetailsForm editPetApplicationRef={editPetApplicationRef} applicationFullData={editPetData} applicationFullData1={applicationFullData} />
                </div>
            </dialog>
            {
                applicationFullData?.payment_status == 0 &&
                <div className='space-x-5 flex justify-center'>
                    <button onClick={() => handleDeleteApplication({ "application_no": applicationFullData?.application_no, "id": applicationFullData?.ref_application_id })} type='button' className='bg-red-600 hover:bg-red-500 text-white px-5 py-1 rounded shadow'>Delete Application</button>
                </div>
            }
        </>
    )
}

export default ViewPetApplication