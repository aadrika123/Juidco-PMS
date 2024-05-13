// Importing necessary dependencies and components
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { RotatingLines } from 'react-loader-spinner'
import moment from "moment";
import AxiosInterceptors from '@/Components/Common/AxiosInterceptors';
import PetRegAPIList from '@/Components/api/PetRegAPIList';
import useSetTitle from '@/Components/Common/useSetTitle'
import { contextVar } from '@/Components/context/contextVar'

// Component for offline payment
const PetOfflinePayment = () => {

    // State variables
    const [loader, setLoader] = useState(false)
    const [applicationFullData, setApplicationFullData] = useState()
    const [somethingWentWrong, setSomethingWentWrong] = useState(false)
    const [paymentMode, setPaymentMode] = useState()
    const [isMakingPayment, setIsMakingPayment] = useState(false)

    // Accessing context for notifications
    const { notify } = useContext(contextVar);

    // Accessing navigation functions
    const navigate = useNavigate()

    const { id } = useParams()
    const { api_PetRegViewApplication, api_petOfflinePayment, header } = PetRegAPIList();

    // Function to set the title of the page
    const fetchApplicationDetails = () => {
        setLoader(true)
        // Fetching application details using Axios
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
    }
    // Setting the title for the page
    useSetTitle("Payment Screen")

    // Effect hook to fetch application details on component mount
    useEffect(() => {
        fetchApplicationDetails()
    }, [])
    // Formik setup for form handling
    const validationSchema = yup.object({
        paymentMode: yup.string().required('select payment mode'),
        remarks: yup.string().required('Enter remarks'),
        branchName: yup.string(),
        cheque_dd_no: yup.string(),
        cheque_dd_date: yup.string(),
        // advanceAmount: yup.string(),
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            paymentMode: '',
            remarks: '',
            bankName: '',
            branchName: '',
            cheque_dd_no: '',
            cheque_dd_date: '',
            applicationId: id,
        },

        onSubmit: (values, resetForm) => {
            // Callback function for form submission
            submitForm(values)
        }
        , validationSchema
    })
    // Handler for form input changes
    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        console.log(name, value)
        // Update paymentMode state when it changes
        { (name == 'paymentMode') && setPaymentMode(value) }

    }
    // formik END
    // Function to submit the form data for offline payment
    const submitForm = (data) => {
        setIsMakingPayment(true)
        // Creating payload for API request
        const payload = {
            "paymentMode": data?.paymentMode,
            "remarks": data?.remarks,
            "bankName": data?.branchName,
            "branchName": data?.remarks,
            "chequeNo": data?.cheque_dd_no,
            "chequeDate": data?.cheque_dd_date,
            "id": id                     //Application Id
        }
        // Making API request for offline payment
        AxiosInterceptors.post(api_petOfflinePayment, payload, header)
            .then((res) => {
                setIsMakingPayment(false)
                if (res.data.status) {
                    notify(res?.data?.message, "success");
                    console.log("Offline Payment Successfully..")
                    fetchApplicationDetails()
                } else {
                    console.log("Failed to make offline payment", res)
                    notify(res?.data?.message, "error");
                }
            })
            .catch((err) => {
                setIsMakingPayment(false)
                console.log("Error while making offline payment", err)
            })

    }
    // JSX for the component
    return (
        <>
            <div className="grid grid-cols-12 mb-20">
                <div className="rounded-md col-span-12">
                    <p className="text-center text-xl font-semibold mx-5 text-gray-700"> YOUR APPLICATION : {applicationFullData?.application_no || "N/A"} </p>
                    {somethingWentWrong == true ? <p className='m-auto mt-10 font-semibold border border-gray-300 text-red-700 bg-red-100 px-5 py-2 rounded shadow w-fit'>Failed to Get Data</p> :
                        <div className="overflow-y-auto">
                            {/* Pet  details */}
                            <div className='bg-white shadow-xl p-4 border border-gray-200 my-3'>
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
                                                <div className='font-bold text-sm text-[#37517e]'>{applicationFullData?.rabies_vac_date ? moment(applicationFullData.rabies_vac_date).format('DD-MM-Y') : "N/A"} </div>
                                            </div>
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

                            {/* Payment Details */}

                            <div className='bg-white shadow-xl p-4 border border-gray-200'>
                                <div className=' border-b-2 py-1 pl-3 font-semibold border-red-400 flex'>
                                    <img src='https://cdn-icons-png.flaticon.com/512/8948/8948774.png' alt="Upload" className='w-5 mr-3 inline text-[#37517e]' />
                                    Payment Details</div>


                                {loader ? <ShimmerEffectInline /> :

                                    <div>
                                        {/* If payment is unpaid status == 0 */}
                                        {applicationFullData?.charges?.paid_status == 0 &&
                                            < div className="bg-white ">
                                                {/* Offline Payment Start */}

                                                <div className=" block w-full rounded-lg bg-white mx-auto ">
                                                    <form onSubmit={formik.handleSubmit} onChange={handleChange} className="p-4 relative">

                                                        <div className="grid grid-cols-12">
                                                            {/* Tax Details */}

                                                            <div className='bg-white col-span-12 flex-1 md:flex md:justify-between pt-6 mb-4 border border-gray-200'>

                                                                <div className="form-group mb-6 md:px-4">
                                                                    <span> Application No. :</span> <span className='font-mono font-semibold'> {applicationFullData?.application_no || "N/A"}</span>
                                                                </div>
                                                                <div className="form-group mb-6 md:px-4">
                                                                    <span> Type :</span> <span className='font-mono font-semibold'> {applicationFullData?.charges?.charge_category_name?.split('_').join(' ') || "N/A"}</span>
                                                                </div>

                                                                <div className="form-group mb-6 md:px-4">
                                                                    <div className='w-full'><span>Total Payable Amount :</span> <span className='font-mono font-semibold text-xl'> ₹{applicationFullData?.charges?.amount || "N/A"} </span></div>
                                                                </div>

                                                            </div>
                                                            {/* Forms */}

                                                            <div className="form-group mb-6 col-span-12 md:col-span-6 md:px-4">
                                                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold"><small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small>Payment Mode</label>
                                                                <select {...formik.getFieldProps('paymentMode')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                                                >
                                                                    <option value="" >Select</option>
                                                                    <option value="CASH" >CASH</option>
                                                                    <option value="CHEQUE" >CHEQUE</option>
                                                                    <option value="DD" >DD</option>
                                                                </select>
                                                                <span className="text-red-600 absolute text-xs">{formik.touched.paymentMode && formik.errors.paymentMode ? formik.errors.paymentMode : null}</span>
                                                            </div>


                                                            <div className="form-group mb-6 col-span-12 md:col-span-6 md:px-4">
                                                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold"><small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small>Remarks</label>
                                                                <input {...formik.getFieldProps('remarks')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer"
                                                                    placeholder="Enter remarks" />
                                                                <span className="text-red-600 absolute text-xs">{formik.touched.remarks && formik.errors.remarks ? formik.errors.remarks : null}</span>
                                                            </div>

                                                            {/* toggle inputs of payment mode */}
                                                            {
                                                                (paymentMode == 'CHEQUE' || paymentMode == 'DD') && <>
                                                                    <div className="form-group mb-6 col-span-12 md:col-span-6 md:px-4">
                                                                        <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold"><small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small>Bank Name</label>
                                                                        <input {...formik.getFieldProps('bankName')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                                                            placeholder="Enter Bank Name." />
                                                                        <span className="text-red-600 absolute text-xs">{formik.touched.bankName && formik.errors.bankName ? formik.errors.bankName : null}</span>
                                                                    </div>
                                                                    <div className="form-group mb-6 col-span-12 md:col-span-6 md:px-4">
                                                                        <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold"><small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small>Branch Name</label>
                                                                        <input {...formik.getFieldProps('branchName')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                                                            placeholder="Enter Branch Name" />
                                                                        <span className="text-red-600 absolute text-xs">{formik.touched.branchName && formik.errors.branchName ? formik.errors.branchName : null}</span>
                                                                    </div>
                                                                    <div className="form-group mb-6 col-span-12 md:col-span-6 md:px-4">
                                                                        <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold"><small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small>Cheque/DD No</label>
                                                                        <input {...formik.getFieldProps('cheque_dd_no')} type="text" placeholder="Enter Check/DD" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                                                        />
                                                                        <span className="text-red-600 absolute text-xs">{formik.touched.cheque_dd_no && formik.errors.cheque_dd_no ? formik.errors.cheque_dd_no : null}</span>
                                                                    </div>
                                                                    <div className="form-group mb-6 col-span-12 md:col-span-6 md:px-4">
                                                                        <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold"><small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small>Cheque/DD Date</label>
                                                                        <input {...formik.getFieldProps('cheque_dd_date')} type="date" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer"
                                                                            placeholder="Enter new ward no." />
                                                                        <span className="text-red-600 absolute text-xs">{formik.touched.cheque_dd_date && formik.errors.cheque_dd_date ? formik.errors.cheque_dd_date : null}</span>
                                                                    </div>
                                                                </>
                                                            }


                                                            {/* line break */}
                                                            <div className='col-span-12'></div>
                                                        </div>


                                                        <div className='col-span-12 md:mt-5 mt-2 pb-5'>
                                                            <div className='flex justify-center'>

                                                                {isMakingPayment ?
                                                                    <RotatingLines
                                                                        strokeColor="grey"
                                                                        strokeWidth="5"
                                                                        animationDuration="0.75"
                                                                        width="30"
                                                                        visible={true}
                                                                    />
                                                                    : <>
                                                                        <button type='button' onClick={() => navigate(-1)} className='mx-3 bg-red-600 hover:bg-red-700 transition duration-200 hover:scale-105 font-normal text-white px-6 py-2 text-sm rounded-sm shadow-xl'>Cancel</button>
                                                                        <button type='submit' className='mx-3 bg-indigo-600 hover:bg-indigo-700 transition duration-200 hover:scale-105 font-normal text-white px-5 py-2 text-sm  rounded-sm shadow-xl'>Pay Now</button>
                                                                    </>
                                                                }
                                                            </div>
                                                        </div>

                                                    </form>
                                                </div>



                                            </div>
                                        }

                                        {/* If payment is pending paid_status == 2 */}
                                        {applicationFullData?.charges?.paid_status == 2 &&
                                            <>     <div className='text-center font-semibold text-yellow-500 mt-2'> Payment verification is pending.</div>
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
                                                                <div className='font-semibold text-sm text-[#37517e]'>1</div>
                                                            </div>
                                                            <div className='flex-1 text-xs'>
                                                                <div className='font-semibold text-sm text-[#37517e] whitespace-nowrap'>{applicationFullData?.transactionDetails?.tran_no || "N/A"}</div>
                                                            </div>
                                                            <div className='flex-1 text-xs'>
                                                                <div className='font-bold text-sm text-[#37517e]'>{applicationFullData?.transactionDetails?.amount || "N/A"}</div>
                                                            </div>
                                                            <div className='flex-1 text-xs'>
                                                                <div className='font-semibold text-sm text-[#37517e]'>{applicationFullData?.transactionDetails?.payment_mode || "N/A"}</div>
                                                            </div>
                                                            <div className='text-xs'>
                                                                <div className='font-semibold text-sm text-[#37517e]'>
                                                                    {applicationFullData?.transactionDetails?.verify_status == 1 && "Paid"}
                                                                    {applicationFullData?.transactionDetails?.verify_status == 2 && "Processing"}
                                                                </div>
                                                            </div>

                                                            <div className='flex-1 text-xs'>
                                                                <div className='font-semibold text-sm text-[#37517e]'> {moment(applicationFullData?.transactionDetails?.created_at, 'YYYY-MM-DD').format('DD-MM-yy') || "N/A"}</div>
                                                            </div>
                                                            <div className='flex-1 text-xs'>
                                                                <div className='font-semibold text-sm text-[#37517e]'>
                                                                    <button onClick={() => navigate(`/pet-payment-receipt/${applicationFullData?.transactionDetails?.tran_no}`)} className="hover:bg-blue-500 whitespace-nowrap border rounded shadow px-5 py-2 border-blue-500 hover:text-white text-blue-500" >Print Receipt</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }

                                                </div>
                                            </>



                                        }

                                        {/* If payment is Success paid_status == 1 */}
                                        {applicationFullData?.charges?.paid_status == 1 &&

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
                                                            <div className='font-semibold text-sm text-[#37517e]'>1</div>
                                                        </div>
                                                        <div className='flex-1 text-xs'>
                                                            <div className='font-semibold text-sm text-[#37517e] whitespace-nowrap'>{applicationFullData?.transactionDetails?.tran_no || "N/A"}</div>
                                                        </div>
                                                        <div className='flex-1 text-xs'>
                                                            <div className='font-bold text-sm text-[#37517e]'>{applicationFullData?.transactionDetails?.amount || "N/A"}</div>
                                                        </div>
                                                        <div className='flex-1 text-xs'>
                                                            <div className='font-semibold text-sm text-[#37517e]'>{applicationFullData?.transactionDetails?.payment_mode || "N/A"}</div>
                                                        </div>
                                                        <div className='text-xs'>
                                                            <div className='font-semibold text-sm text-[#37517e]'>
                                                                {applicationFullData?.transactionDetails?.verify_status == 1 && "Paid"}
                                                                {applicationFullData?.transactionDetails?.verify_status == 2 && "Processing"}
                                                            </div>
                                                        </div>

                                                        <div className='flex-1 text-xs'>
                                                            <div className='font-semibold text-sm text-[#37517e]'> {moment(applicationFullData?.transactionDetails?.created_at, 'YYYY-MM-DD').format('DD-MM-yy') || "N/A"}</div>
                                                        </div>
                                                        <div className='flex-1 text-xs'>
                                                            <div className='font-semibold text-sm text-[#37517e]'>
                                                                <button onClick={() => navigate(`/pet-payment-receipt/${applicationFullData?.transactionDetails?.tran_no}`)} className="hover:bg-blue-500 whitespace-nowrap border rounded shadow px-5 py-2 border-blue-500 hover:text-white text-blue-500" >Print Receipt</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }

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

export default PetOfflinePayment

const ShimmerEffectInline = () => {
    return (

        <>
            <div className="w-full">
                <div className="m-5 space-y-3">

                    <div className="overflow-hidden rounded-lg relative space-y-5 bg-gradient-to-r to-transparent shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-ping before:border-t before:border-gray-400 before:bg-gradient-to-r before:from-transparent before:via-gray-400 before:to-transparent">
                        <div className="h-3 rounded-lg bg-gray-300"></div>
                    </div>
                    <div className="overflow-hidden rounded-lg relative space-y-5 bg-gradient-to-r to-transparent shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-ping before:border-t before:border-gray-400 before:bg-gradient-to-r before:from-transparent before:via-gray-400 before:to-transparent">
                        <div className="h-3 rounded-lg bg-gray-300"></div>
                    </div>
                    <div className="overflow-hidden rounded-lg relative space-y-5 bg-gradient-to-r to-transparent shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-ping before:border-t before:border-gray-400 before:bg-gradient-to-r before:from-transparent before:via-gray-400 before:to-transparent">
                        <div className="h-3 rounded-lg bg-gray-300"></div>
                    </div>
                </div>
            </div>
        </>
    )
}