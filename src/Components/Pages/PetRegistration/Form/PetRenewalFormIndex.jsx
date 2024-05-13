// Importing necessary dependencies and components
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useFormik, Formik, Form, ErrorMessage } from 'formik'
import * as yup from 'yup'
import PetRegAPIList from '@/Components/api/PetRegAPIList'
import AxiosInterceptors from '@/Components/Common/AxiosInterceptors'
import { useNavigate, useParams } from 'react-router-dom'
import moment from "moment";
import { contextVar } from '@/Components/context/contextVar';

// Styling object for consistent styles
const style = {
  required: 'text-red-700 font-semibold',
  label: 'text-sm',
  textFiled: 'block w-full h-9 border px-2 border-gray-300 rounded shadow text-gray-700',
  textArea: 'block w-full border px-2 border-gray-300 rounded shadow'
}

// Component for Pet Renewal Form
const PetRenewalFormIndex = (props) => {
  // Extracting parameters from the URL
  const { id } = useParams()

  // State variables
  const [masterData, setMasterData] = useState()
  const { notify } = useContext(contextVar);
  const [isChecked, setIsChecked] = useState(false)
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const [userDetails, setUserDetails] = useState()
  const dialogRef = useRef()
  const navigate = useNavigate();
  const { header, api_PetApproveViewApplication, api_PetApplyRenewalForm, header1 } = PetRegAPIList();

  // ==== Formik Start
  // Form validation schema
  const validationSchema = yup.object({
    doctorName: yup.string().matches(/^[a-zA-Z0-9\s,.:-]+$/, 'Special characters are not allowed').required('Kindly enter a value.'),
    doctorRegNo: yup.string().matches(/^[a-zA-Z0-9\s,.:-]+$/, 'Special characters are not allowed').required('Kindly enter a value.'),
    dateOfRabies: yup.string().required('Kindly enter a value.'),
    dateOfLepVaccine: yup.string().required('Kindly enter a value.'),
  })

  // Initial form values
  const initialValues = {
    doctorName: "",
    doctorRegNo: "",
    dateOfRabies: "",
    dateOfLepVaccine: '',
  }

  // Formik configuration
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values, resetForm) => {
      // Callback function for form submission
      submitForm(values)
      // alert(values)
      console.log("Value.....", values)
    },
    validationSchema
  })

  // Change event handler for form inputs
  const handleChange = (event) => {
    let name = event.target.name
    let value = event.target.value
    setErrorMessage(false)
  };
  // ==== Formik End

  // Function to submit the form data
  const submitForm = (data) => {
    setFormSubmitting(true)
    // Payload for API request
    const payload = {
      // ... (your payload properties)
      "address": data?.address,
      "applyThrough": data?.applyThrough,
      "propertyNo": data?.holdingNo,
      "breed": data?.breed,
      "ownerCategory": data?.categoryApplication,
      "color": data?.color,
      "dateOfLepVaccine": data?.dateOfLepVaccine,
      "dateOfRabiesVac": data?.dateOfRabies,
      "doctorName": data?.doctorName,
      "doctorRegNo": data?.doctorRegNo,
      "mobileNo": data?.mobileNo,
      "panNo": data?.panNo,
      "petBirthDate": data?.petBirthDate,
      "petFrom": data?.petFrom,  // may be some issue
      "petGender": data?.petGender, // check  this
      // "petIdentity": data?.petIdentity,
      "petName": data?.petName,
      "petType": data?.petType,
      "ulbId": data?.ulb,
      "ward": data?.ward,
      "registrationId":id,
      "applicantName": data?.applicantName,
      "mobileNo": data?.mobileNo,
      "email": data?.email,
      "panNo": data?.panNo
    }

    // Making API request for form submission
    AxiosInterceptors.post(api_PetApplyRenewalForm, payload, header)
      .then((res) => {
        setFormSubmitting(false)
        if (res.data.status) {
          setUserDetails(res.data.data)
          openDialogTag()
          console.log("Form applied successfully");
          notify(res?.data?.message, "success");
        } else {
          notify(res?.data?.message, "error");
          setErrorMessage(res?.data?.message)
          console.log("Failed to apply pet registration")
        }
      })
      .catch((err) => {
        setErrorMessage(err?.response?.data?.error)
        notify("Something Went wrong", "error");
        setFormSubmitting(false)
        console.log("Error while applying for pet registration..", err?.response?.data?.error)
      })
  }

  // Function to open a dialog
  const openDialogTag = () => {
    dialogRef.current.showModal()
  }

  // Effect hook to fetch data on component mount
  useEffect(() => {
    AxiosInterceptors.post(api_PetApproveViewApplication, { "registrationId": id }, header1)
      .then((res) => {
        if (res.data.status) {
          setMasterData(res.data.data)
          console.log("pet Renewal data", res.data)
          console.log("pet Renewal data====>", res.data.data.address)
        } else {
          console.log("Error fetching pet master list")
        }
      })
      .catch((err) => {
        console.log("Error while getting pet master list")
      })
  }, [])

  return (
     // JSX for the component
    <>
      <form onSubmit={formik.handleSubmit} onChange={handleChange}>
        <div className='overflow-y-auto'>

          <div className='col-span-12 ml-2 my-2'>
            <div className='text-lg text-left text-gray-600 font-semibold'># Property Details </div>
            {/* <p className='border-b border-gray-500'></p> */}
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-5  bg-white shadow-md rounded-md py-2'>
            <div className='m-3'>
              <label className={style?.label} htmlFor="ulb">ULB </label>
              <input value={masterData?.ulb_name} disabled type="text" name='ulb' className={style?.textFiled} />
              <p className='text-red-500 text-xs'>{formik.touched.ulb && formik.errors.ulb ? formik.errors.ulb : null}</p>
            </div>
            <div className='m-3'>
              <label className={style?.label} htmlFor="applyThrough">Apply Through </label>
              <input disabled value={masterData?.apply_through_name} type="text" className={style?.textFiled} />
              <p className='text-red-500 text-xs'>{formik.touched.applyThrough && formik.errors.applyThrough ? formik.errors.applyThrough : null}</p>
            </div>
            <div className='m-3'>
              <label className={style?.label} htmlFor="holdingNo">Holding / SAF No.</label>
              <input disabled value={masterData?.holding_no == "" ? masterData?.saf_no : masterData?.holding_no} type="text" name='holdingNo' className={style?.textFiled} />
              <p className='text-red-500 text-xs'>{formik.touched.holdingNo && formik.errors.holdingNo ? formik.errors.holdingNo : null}</p>
            </div>
            <div className='m-3'>
              <label className={style?.label} htmlFor="categoryApplication">Category of Application</label>
              <input disabled value={masterData?.application_type} type="text" name='holdingNo' className={style?.textFiled} />
              <p className='text-red-500 text-xs'>{formik.touched.categoryApplication && formik.errors.categoryApplication ? formik.errors.categoryApplication : null}</p>
            </div>
            <div className='m-3'>
              <label className={style?.label} htmlFor="ward">Ward Number</label>
              <input type="text" disabled value={masterData?.ward_name} name='ward' className={style?.textFiled} />
              <p className='text-red-500 text-xs'>{formik.touched.ward && formik.errors.ward ? formik.errors.ward : null}</p>
            </div>
          </div>
          <div className='col-span-12 ml-2 my-2'>
            <div className='text-lg text-left text-gray-600 font-semibold'># Applicant Details</div>
            {/* <p className='border-b border-gray-500'></p> */}
          </div>
          <div className='bg-white shadow-md rounded-md py-2'>
            <div className='grid grid-cols-1 md:grid-cols-4 '>
              <div className='m-3'>
                <label className={style?.label} htmlFor="applicantName">Name of Applicant</label>
                <input disabled value={masterData?.applicant_name} className={style?.textFiled} />
                <p className='text-red-500 text-xs'>{formik.touched.applicantName && formik.errors.applicantName ? formik.errors.applicantName : null}</p>
              </div>
              <div className='m-3'>
                <label className={style?.label} htmlFor="mobileNo">Mobile No</label>
                <input disabled value={masterData?.mobile_no} type="number" name='mobileNo' className={style?.textFiled} />
                <p className='text-red-500 text-xs'>{formik.touched.mobileNo && formik.errors.mobileNo ? formik.errors.mobileNo : null}</p>
              </div>
              <div className='m-3'>
                <label className={style?.label} htmlFor="email">Email</label>
                <input disabled value={masterData?.email} type="email" name='email' className={style?.textFiled} />
                <p className='text-red-500 text-xs'>{formik.touched.email && formik.errors.email ? formik.errors.email : null}</p>
              </div>
              <div className='m-3'>
                <label className={style?.label} htmlFor="panNo">PAN No.</label>
                <input disabled value={masterData?.pan_no} type="text" name='panNo' className={style?.textFiled} />
                <p className='text-red-500 text-xs'>{formik.touched.panNo && formik.errors.panNo ? formik.errors.panNo : null}</p>
              </div>
            </div>
            <div className='m-3'>
              <label className={style?.label} htmlFor="address">Address</label>
              <textarea disabled value={masterData?.address} name='address' maxLength="500" rows="3" className={style?.textArea} ></textarea>
              <p className='text-red-500 text-xs'>{formik.touched.address && formik.errors.address ? formik.errors.address : null}</p>
            </div>
          </div>
          <div className='col-span-12 ml-2 my-2'>
            <div className='text-lg text-left text-gray-600 font-semibold'># Pet Details</div>
            {/* <p className='border-b border-gray-500'></p> */}
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 bg-white shadow-md rounded-md py-2'>
            <div className='m-3'>
              <label className={style?.label} htmlFor="petType">Pet Type</label>
              <input disabled value={masterData?.ref_pet_type} className={style?.textFiled} />
              <p className='text-red-500 text-xs'>{formik.touched.petType && formik.errors.petType ? formik.errors.petType : null}</p>
            </div>
            <div className='m-3'>
              <label className={style?.label} htmlFor="pet_name">Name of Pet</label>
              <input disabled value={masterData?.pet_name} className={style?.textFiled} />
              <p className='text-red-500 text-xs'>{formik.touched.petName && formik.errors.petName ? formik.errors.petName : null}</p>
            </div>
            <div className='m-3'>
              <label className={style?.label} htmlFor="petGender">Gender</label>
              <input disabled value={masterData?.ref_gender} className={style?.textFiled} />
              <p className='text-red-500 text-xs'>{formik.touched.petGender && formik.errors.petGender ? formik.errors.petGender : null}</p>
            </div>
            <div className='m-3'>
              <label className={style?.label} htmlFor="petBirthDate">Date of Birth</label>
              <input disabled value={moment(masterData?.dob).format('DD-MM-Y')} className={style?.textFiled} />
              <p className='text-red-500 text-xs'>{formik.touched.petBirthDate && formik.errors.petBirthDate ? formik.errors.petBirthDate : null}</p>
            </div>
            {/* <div className='m-3'>
              <label className={style?.label} htmlFor="petIdentity">Identity MarK</label>
              <input disabled value={masterData?.identification_mark} maxLength="50" type="text" name='petIdentity' className={style?.textFiled} />
              <p className='text-red-500 text-xs'>{formik.touched.petIdentity && formik.errors.petIdentity ? formik.errors.petIdentity : null}</p>
            </div> */}
            <div className='m-3'>
              <label className={style?.label} htmlFor="breed">Breed</label>
              <input disabled value={masterData?.breed} type="text" name='color' className={style?.textFiled} />
              <p className='text-red-500 text-xs'>{formik.touched.breed && formik.errors.breed ? formik.errors.breed : null}</p>
            </div>
            <div className='m-3'>
              <label className={style?.label} htmlFor="color">Color</label>
              <input disabled value={masterData?.color} type="text" name='color' className={style?.textFiled} />
              <p className='text-red-500 text-xs'>{formik.touched.color && formik.errors.color ? formik.errors.color : null}</p>
            </div>
            <div className='m-3'>
              <label className={style?.label} htmlFor="doctorName">Veterinary Doctor Name<span className={style?.required}>*</span></label>
              <input {...formik.getFieldProps('doctorName')} type="text" maxLength="70" name='doctorName' className={style?.textFiled} />
              <p className='text-red-500 text-xs'>{formik.touched.doctorName && formik.errors.doctorName ? formik.errors.doctorName : null}</p>
            </div>
            <div className='m-3'>
              <label className={style?.label} htmlFor="doctorRegNo">Doctor’s MSVC/VCI number <span className={style?.required}>*</span></label>
              <input {...formik.getFieldProps('doctorRegNo')} type="text" maxLength="70" name='doctorRegNo' className={style?.textFiled} />
              <p className='text-red-500 text-xs'>{formik.touched.doctorRegNo && formik.errors.doctorRegNo ? formik.errors.doctorRegNo : null}</p>
            </div>
            <div className='m-3'>
              <label className={style?.label} htmlFor="dateOfRabies">Date of Rabies<span className={style?.required}>*</span></label>
              <input {...formik.getFieldProps('dateOfRabies')} type="date" name='dateOfRabies' className={style?.textFiled} max={new Date().toISOString().split('T')[0]} />
              <p className='text-red-500 text-xs'>{formik.touched.dateOfRabies && formik.errors.dateOfRabies ? formik.errors.dateOfRabies : null}</p>
            </div>
            <div className='m-3'>
              <label className={style?.label} htmlFor="dateOfLepVaccine">Leptospirosis Vaccination Date<span className={style?.required}>*</span></label>
              <input {...formik.getFieldProps('dateOfLepVaccine')} type="date" name='dateOfLepVaccine' className={style?.textFiled} max={new Date().toISOString().split('T')[0]} />
              <p className='text-red-500 text-xs'>{formik.touched.dateOfLepVaccine && formik.errors.dateOfLepVaccine ? formik.errors.dateOfLepVaccine : null}</p>
            </div>
            <div className='m-3'>
              <label className={style?.label} htmlFor="petFrom">Pet From</label>
              <input disabled value={masterData?.occurrence_types} name='PetFrom' className={style?.textFiled} />
              <p className='text-red-500 text-xs'>{formik.touched.petFrom && formik.errors.petFrom ? formik.errors.petFrom : null}</p>
            </div>
          </div>
        </div>
        <p className='flex mt-3 gap-x-3'>
          <input type="checkbox" checked={isChecked} name="" id="" onChange={(e) => setIsChecked(e.target.checked)} />
          <p className='cursor-pointer select-none' onClick={() => setIsChecked(!isChecked)}>
            I have entered the correct information and agree to the terms and conditions.
          </p>
        </p>
        <p className='text-red-500 font-semibold text-center mt-3'>{errorMessage && errorMessage}</p>
        <div className='flex justify-center my-5'>
          {formSubmitting ? <p>Form Submitting..</p> :
            <button type='submit' disabled={!isChecked} className='disabled:opacity-40 bg-indigo-600 hover:bg-indigo-700 px-8 py-2 text-white rounded shadow'>Submit Application</button>
          }
        </div>
      </form>
      <dialog ref={dialogRef} className="">
        <div className='space-y-2 mb-5'>
          <p className='text-center bg-yellow-300 p-2 font-semibold '> Your Application has submitted successfully</p>
          <p className='text-center'>Application No.  <span className='font-semibold text-lg'>{userDetails?.applicationNo || "N/A"}</span></p>
          <div className='flex justify-center gap-x-5'>
            <button onClick={() => navigate(`/search-pet-registration`)} className='border border-indigo-600 px-2 py-1 rounded shadow hover:bg-indigo-500 hover:text-white'>Dashboard</button>
            <button onClick={() => navigate(`/pet-payment-offline/${userDetails?.id}`)} className='bg-indigo-500 px-2 py-1 rounded shadow text-white hover:bg-indigo-700'>Make Payment</button>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default PetRenewalFormIndex


