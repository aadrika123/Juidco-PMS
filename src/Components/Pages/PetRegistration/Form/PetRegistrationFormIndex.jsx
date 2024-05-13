// Importing necessary dependencies and components
import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import PetRegAPIList from '@/Components/api/PetRegAPIList'
import AxiosInterceptors from '@/Components/Common/AxiosInterceptors'
import { allowCharacterInput } from '@/Components/Common/PowerupFunctions'
import { contextVar } from '@/Components/context/contextVar'
import ApiHeader from '@/Components/api/ApiHeader'

// Styling object for consistent styles
const style = {
  required: 'text-red-700 font-semibold',
  label: 'text-sm',
  textFiled: 'block w-full h-9 border px-2 border-gray-300 rounded shadow text-gray-700',
  textArea: 'block w-full border px-2 border-gray-300 rounded shadow'
}
// Component for Pet Registration Form
const PetRegistrationFormIndex = (props) => {
  // State variables
  const [ulbList, setUlbList] = useState()
  const [wardList, setWardList] = useState()
  const [masterData, setMasterData] = useState()
  const [isChecked, setIsChecked] = useState(false)
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const [userDetails, setUserDetails] = useState()
  const [fetchDataOnBlur, setFetchDataOnBlur] = useState(1)

  // Context for notifications
  const { notify } = useContext(contextVar);
  // API endpoints and headers
  const { header, api_ulbList, api_getUserDetailsByHoldingSaf, api_wardList, api_PetRegistrationApplyForm, api_PetRegistrationMaster, api_ListOfSafHolding, header1 } = PetRegAPIList();
  // const { allowCharacterInput } = PowerupFunctions();

  // ==== Formik Start
  // Form validation schema
  const validationSchema = yup.object({
    // ulb: yup.string().required('Kindly enter a value.'),
    applicantName: yup.string().matches(/^[a-zA-Z0-9\s,.:-]+$/, 'Special characters are not allowed').required('Kindly enter a value.'),
    applyThrough: yup.string().required('Kindly enter a value.'),
    holdingNo: yup.string().required('Kindly enter a value.'),
    categoryApplication: yup.string().required('Kindly enter a value.'),
    ward: yup.string().required('Kindly enter a value.'),
    mobileNo: yup.string().matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits').required('Kindly enter a value.'),
    email: yup.string().email().required('Kindly enter a value.'),
    panNo: yup.string().matches(/^[a-zA-Z0-9\s,.:-]+$/, 'Special characters are not allowed').required('Kindly enter a value.'),
    address: yup.string().matches(/^[a-zA-Z0-9\s,.:-]+$/, 'Special characters are not allowed').required('Kindly enter a value.'),
    petType: yup.string().required('Kindly enter a value.'),
    petName: yup.string().matches(/^[a-zA-Z0-9\s,.:-]+$/, 'Special characters are not allowed').required('Kindly enter a value.'),
    petGender: yup.string().required('Kindly enter a value.'),
    petBirthDate: yup.string().required('Kindly enter a value.'),
    // petIdentity: yup.string().matches(/^[a-zA-Z0-9\s,.:-]+$/, 'Special characters are not allowed').required('Kindly enter a value.'),
    breed: yup.string().matches(/^[a-zA-Z0-9\s,.:-]+$/, 'Special characters are not allowed').required('Kindly enter a value.'),
    color: yup.string().matches(/^[a-zA-Z0-9\s,.:-]+$/, 'Special characters are not allowed').required('Kindly enter a value.'),
    doctorName: yup.string().matches(/^[a-zA-Z0-9\s,.:-]+$/, 'Special characters are not allowed').required('Kindly enter a value.'),
    doctorRegNo: yup.string().matches(/^[a-zA-Z0-9\s,.:-]+$/, 'Special characters are not allowed').required('Kindly enter a value.'),
    dateOfRabies: yup.string().required('Kindly enter a value.'),
    // dateOfLepVaccine: yup.string().required('Kindly enter a value.'),
    petFrom: yup.string().required('Kindly enter a value.'),
  })
  // Initial form values
  const initialValues = {
    // ulb: '',
    applicantName: '',
    applyThrough: '',
    holdingNo: '',
    categoryApplication: '',
    ward: '',
    mobileNo: '',
    email: '',
    panNo: '',
    address: '',
    petType: '',
    petName: '',
    petGender: '',
    petBirthDate: '',
    // petIdentity: '',
    breed: '',
    color: '',
    doctorName: '',
    doctorRegNo: '',
    dateOfRabies: '',
    dateOfLepVaccine: '',
    petFrom: ''
  }
  // Formik configuration
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      // Callback function for form submission
      submitForm(values)
    },
    validationSchema
  })
  // Change event handler for form inputs
  const handleChange = (event) => {
    let name = event.target.name
    let value = event.target.value
    setErrorMessage(false)
    // { name === 'propertyType' && ((value == '1') ? setpropertyTypeStatusToggle(true) : setpropertyTypeStatusToggle(false)) }
    // { name == 'mobileNo' && formik.setFieldValue("mobileNo", allowNumberInput(value, formik.values.mobileNo, 10)) }
    { name == 'color' && formik.setFieldValue("color", allowCharacterInput(value, formik.values.color, 20)) }
    { name == 'doctorName' && formik.setFieldValue("doctorName", allowCharacterInput(value, formik.values.doctorName, 20)) }
    { name == 'breed' && formik.setFieldValue("breed", allowCharacterInput(value, formik.values.breed, 20)) }
    { name == 'petName' && formik.setFieldValue("petName", allowCharacterInput(value, formik.values.petName, 20)) }
    { name == 'doctorName' && formik.setFieldValue("doctorName", allowCharacterInput(value, formik.values.doctorName, 20)) }
  };

  // ==== Formik End

  // Function to submit the form data
  const submitForm = (data) => {
    setFormSubmitting(true)
    const payload = {
      "address": data?.address,
      "applyThrough": data?.applyThrough,
      "propertyNo": data?.holdingNo,
      "breed": data?.breed,
      "ownerCategory": data?.categoryApplication,
      "color": data?.color,
      "dateOfLepVaccine": data?.dateOfLepVaccine,
      "dateOfRabies": data?.dateOfRabies,
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
      // "ulbId": data?.ulb,
      "ward": data?.ward,
      "applicantName": data?.applicantName,
      "mobileNo": data?.mobileNo,
      "email": data?.email,
      "panNo": data?.panNo

    }

    console.log("complete payload", payload)
    // Making API request for form submission
    AxiosInterceptors.post(api_PetRegistrationApplyForm, payload, header)
      .then((res) => {
        setFormSubmitting(false)
        if (res.data.status) {
          // Update state and notify success
          console.log("Form applied successfully");
          props.data(res.data.data)
          console.log("1", res.data.data)
          props.screen(2)
          notify(res?.data?.message, "success");
        } else {
          // Notify error and set error message
          notify(res?.data?.message, "error");
          setErrorMessage(res?.data?.message)
          console.log("Failed to apply pet registration")
        }
      })
      .catch((err) => {
        // Notify error and log details
        setErrorMessage(err?.response?.data?.error)
        notify("Something Went wrong", "error");
        setFormSubmitting(false)
        console.log("Error while applying for pet registration..", err?.response?.data?.error)
      })

  }

  //Get all ulb list
  useEffect(() => {
    AxiosInterceptors.get(api_ulbList, header)
      .then((res) => {
        if (res.data.status) {
          setUlbList(res.data.data)
          console.log("ULB List", res.data)
        } else {
          console.log("Error fetching ulb list")
        }
      })
      .catch((err) => {
        console.log("Error while getting ulb list")
      })
  }, [])

  //Get Ward list by ulb selection
  useEffect(() => {
    AxiosInterceptors.post(api_wardList, {}, ApiHeader())
      // AxiosInterceptors.post(api_wardList, { "ulbId": formik.values.ulb }, header)
      .then((res) => {
        if (res.data.status) {
          setWardList(res.data.data)
          console.log("Ward List", res.data)
        } else {
          console.log("Error fetching Ward list")
        }
      })
      .catch((err) => {
        console.log("Error while getting Ward list")
      })
  }, [])

  //Pet Registration Master Data
  useEffect(() => {
    AxiosInterceptors.post(api_PetRegistrationMaster, {}, header1)
      .then((res) => {
        if (res.data.status) {
          setMasterData(res.data.data)
          console.log("pet master data", res.data)
        } else {
          console.log("Error fetching pet master list")
        }
      })
      .catch((err) => {
        console.log("Error while getting pet master list")
      })
  }, [])

  //Get user Details by holding/saf
  const handleFetchDataFromHoldingSaf = () => {
    console.log("User Details========> 1")
    const payload = {
      "connectionThrough": formik.values.applyThrough,
      "id": formik.values.holdingNo,
      "ulbId": formik.values.ulb
    }
    AxiosInterceptors.post(api_getUserDetailsByHoldingSaf, payload, header)
      .then((res) => {
        console.log("User Details========> 2", res)
        if (res.data.status) {
          setUserDetails(res.data.data)
          //Set Property Data in Prefilled
          formik.setFieldValue("address", res?.data?.data?.prop_address);
          formik.setFieldValue("ward", res?.data?.data?.wardDetails?.wardId);
          formik.setFieldValue("applicantName", res?.data?.data?.owners[0]?.ownerName);
          formik.setFieldValue("mobileNo", res?.data?.data?.owners[0]?.mobileNo);
          formik.setFieldValue("email", res?.data?.data?.owners[0]?.email);

        } else {
          console.log("Error fetching user Details", res)
        }
      })
      .catch((err) => {
        console.log("Error while getting user Details", err)
      })
  }
  // Effect hook to fetch Holding/Saf details on component mount
  useEffect(() => {
    handleFetchDataFromHoldingSaf()
  }, [fetchDataOnBlur, formik.values.applyThrough, formik.values.categoryApplication])
  return (
    <>
      <form onSubmit={formik.handleSubmit} onChange={handleChange}>
        <div className='overflow-y-auto'>

          <div className='col-span-12 ml-2 my-2'>
            <div className='text-lg text-left text-gray-600 font-semibold'># Property Details</div>
            {/* <p className='border-b border-gray-500'></p> */}
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-5  bg-white shadow-md rounded-md py-2'>

            {/* <div className='m-3'>
              <label className={style?.label} htmlFor="ulb">Select ULB <span className={style?.required}>*</span></label>
              <select {...formik.getFieldProps('ulb')} name='ulb' className={style?.textFiled}>
                <option value="">Select</option>
                {
                  ulbList?.map((item, index) => (
                    <option key={index} value={item.id}>{item.ulb_name}</option>
                  ))
                }
              </select>
              <p className='text-red-500 text-xs'>{formik.touched.ulb && formik.errors.ulb ? formik.errors.ulb : null}</p>
            </div> */}
            <div className='m-3'>
              <label className={style?.label} htmlFor="applyThrough">Apply Through<span className={style?.required}>*</span></label>
              <select {...formik.getFieldProps('applyThrough')} name='applyThrough' className={style?.textFiled}>
                <option value="">Select</option>
                {
                  masterData?.registrationThrough?.map((item, index) => (
                    <option key={index} value={item.id}>{item.registration_through}</option>
                  ))
                }
              </select>
              <p className='text-red-500 text-xs'>{formik.touched.applyThrough && formik.errors.applyThrough ? formik.errors.applyThrough : null}</p>
            </div>

            <div className='m-3'>
              <label className={style?.label} htmlFor="holdingNo">Holding / SAF No.<span className={style?.required}>*</span></label>
              <input onBlurCapture={handleFetchDataFromHoldingSaf} {...formik.getFieldProps('holdingNo')} maxLength="25" type="text" name='holdingNo' className={style?.textFiled} />
              <p className='text-red-500 text-xs'>{formik.touched.holdingNo && formik.errors.holdingNo ? formik.errors.holdingNo : null}</p>
            </div>

            <div className='m-3'>
              <label className={style?.label} htmlFor="categoryApplication">Category of Application<span className={style?.required}>*</span></label>
              <select {...formik.getFieldProps('categoryApplication')} name='categoryApplication' className={style?.textFiled}>
                <option value="">Select</option>
                {
                  masterData?.ownertype && masterData?.ownertype?.map((item, index) => (
                    <option key={index} value={item.id}>{item.owner_type}</option>
                  )
              )}
                {/* {
                  masterData?.ownertype && masterData?.ownertype?.map((item, index) => {
                    if (index === 0) {
                      return <option key={index} value={item.id}>{item.owner_type}</option>;
                    } else if (index === 1 && userDetails?.tenanted) {
                      return <option key={index} value={item.id}>{item.owner_type}</option>;
                    }
                    return null; // Exclude other array elements from rendering
                  })
                } */}
              </select>
              <p className='text-red-500 text-xs'>{formik.touched.categoryApplication && formik.errors.categoryApplication ? formik.errors.categoryApplication : null}</p>
            </div>

            <div className='m-3'>
              <label className={style?.label} htmlFor="ward">Ward Number<span className={style?.required}>*</span></label>
              {/* <input type="text" disabled {...formik.getFieldProps('ward')} value={userDetails?.wardDetails?.wardNo} name='ward' className={style?.textFiled} /> */}
              <select {...formik.getFieldProps('ward')} name='ward' className={style?.textFiled}>
                <option value="">Select</option>
                {
                  wardList?.length > 0 && wardList?.map((item, index) => (
                    <option key={index} value={item.id}>{item.ward_name}</option>
                  ))
                }
              </select>
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
                <label className={style?.label} htmlFor="applicantName">Name of Applicant<span className={style?.required}>*</span></label>
                {/* <input disabled={formik.values.categoryApplication != 2} {...formik.getFieldProps('applicantName')} maxLength="70" type="text" name='applicantName' className={style?.textFiled} /> */}
                <input  {...formik.getFieldProps('applicantName')} maxLength="70" type="text" name='applicantName' className={style?.textFiled} />
                <p className='text-red-500 text-xs'>{formik.touched.applicantName && formik.errors.applicantName ? formik.errors.applicantName : null}</p>
              </div>
              <div className='m-3'>
                <label className={style?.label} htmlFor="mobileNo">Mobile No<span className={style?.required}>*</span></label>
                {/* <input disabled={formik.values.categoryApplication != 2} {...formik.getFieldProps('mobileNo')} type="number" maxLength="10" name='mobileNo' className={style?.textFiled} /> */}
                <input  {...formik.getFieldProps('mobileNo')} type="number" maxLength="10" name='mobileNo' className={style?.textFiled} />
                <p className='text-red-500 text-xs'>{formik.touched.mobileNo && formik.errors.mobileNo ? formik.errors.mobileNo : null}</p>
              </div>
              <div className='m-3'>
                <label className={style?.label} htmlFor="email">Email<span className={style?.required}>*</span></label>
                <input  {...formik.getFieldProps('email')} type="email" maxLength="70" name='email' className={style?.textFiled} />
                <p className='text-red-500 text-xs'>{formik.touched.email && formik.errors.email ? formik.errors.email : null}</p>
              </div>
              <div className='m-3'>
                <label className={style?.label} htmlFor="panNo">PAN No.<span className={style?.required}>*</span></label>
                <input {...formik.getFieldProps('panNo')} maxLength="10" type="text" name='panNo' className={style?.textFiled} />
                <p className='text-red-500 text-xs'>{formik.touched.panNo && formik.errors.panNo ? formik.errors.panNo : null}</p>
              </div>

            </div>

            <div className='m-3'>
              <label className={style?.label} htmlFor="address">Address<span className={style?.required}>*</span></label>
              {/* <textarea disabled={formik.values.categoryApplication != 2} {...formik.getFieldProps('address')} name='address' maxLength="500" rows="3" className={style?.textArea} ></textarea> */}
              <textarea  {...formik.getFieldProps('address')} name='address' maxLength="500" rows="3" className={style?.textArea} ></textarea>
              <p className='text-red-500 text-xs'>{formik.touched.address && formik.errors.address ? formik.errors.address : null}</p>
            </div>
          </div>

          <div className='col-span-12 ml-2 my-2'>
            <div className='text-lg text-left text-gray-600 font-semibold'># Pet Details</div>
            {/* <p className='border-b border-gray-500'></p> */}
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 bg-white shadow-md rounded-md py-2'>
            <div className='m-3'>
              <label className={style?.label} htmlFor="petType">Pet Type<span className={style?.required}>*</span></label>
              <select {...formik.getFieldProps('petType')} type="text" name='petType' className={style?.textFiled}>
                <option value="">Select</option>
                <option value="1">Dog</option>
                {/* <option value="2">Cat</option> */}
              </select>
              <p className='text-red-500 text-xs'>{formik.touched.petType && formik.errors.petType ? formik.errors.petType : null}</p>
            </div>
            <div className='m-3'>
              <label className={style?.label} htmlFor="petName">Name of Pet<span className={style?.required}>*</span></label>
              <input {...formik.getFieldProps('petName')} maxLength="50" type="text" name='petName' className={style?.textFiled} />
              <p className='text-red-500 text-xs'>{formik.touched.petName && formik.errors.petName ? formik.errors.petName : null}</p>
            </div>
            <div className='m-3'>
              <label className={style?.label} htmlFor="petGender">Gender<span className={style?.required}>*</span></label>
              <select {...formik.getFieldProps('petGender')} type="text" name='petGender' className={style?.textFiled}>
                <option value="">Select</option>
                {
                  masterData?.petGender?.map((item, index) => (
                    <option key={index} value={item.id}>{item.pet_gender}</option>
                  ))
                }
              </select>
              <p className='text-red-500 text-xs'>{formik.touched.petGender && formik.errors.petGender ? formik.errors.petGender : null}</p>
            </div>
            <div className='m-3'>
              <label className={style?.label} htmlFor="petBirthDate">Date of Birth<span className={style?.required}>*</span></label>
              <input {...formik.getFieldProps('petBirthDate')} type="date" name='petBirthDate' max={new Date().toISOString().split('T')[0]} className={style?.textFiled} />
              <p className='text-red-500 text-xs'>{formik.touched.petBirthDate && formik.errors.petBirthDate ? formik.errors.petBirthDate : null}</p>
            </div>
            {/* <div className='m-3'>
              <label className={style?.label} htmlFor="petIdentity">Identity MarK<span className={style?.required}>*</span></label>
              <input {...formik.getFieldProps('petIdentity')} maxLength="50" type="text" name='petIdentity' className={style?.textFiled} />
              <p className='text-red-500 text-xs'>{formik.touched.petIdentity && formik.errors.petIdentity ? formik.errors.petIdentity : null}</p>
            </div> */}
            <div className='m-3'>
              <label className={style?.label} htmlFor="breed">Breed<span className={style?.required}>*</span></label>
              <input {...formik.getFieldProps('breed')} type="text" maxLength="20" name='breed' className={style?.textFiled} />
              <p className='text-red-500 text-xs'>{formik.touched.breed && formik.errors.breed ? formik.errors.breed : null}</p>
            </div>
            <div className='m-3'>
              <label className={style?.label} htmlFor="color">Color<span className={style?.required}>*</span></label>
              <input {...formik.getFieldProps('color')} type="text" maxLength="20" name='color' className={style?.textFiled} />
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
              <label className={style?.label} htmlFor="dateOfRabies">Last Date of Vaccination<span className={style?.required}>*</span></label>
              <input {...formik.getFieldProps('dateOfRabies')} type="date" name='dateOfRabies' className={style?.textFiled} max={new Date().toISOString().split('T')[0]} />
              <p className='text-red-500 text-xs'>{formik.touched.dateOfRabies && formik.errors.dateOfRabies ? formik.errors.dateOfRabies : null}</p>
            </div>
            <div className='m-3'>
              <label className={style?.label} htmlFor="dateOfLepVaccine">Leptospirosis Vaccination Date<span className={style?.required}></span></label>
              <input {...formik.getFieldProps('dateOfLepVaccine')} type="date" name='dateOfLepVaccine' className={style?.textFiled} max={new Date().toISOString().split('T')[0]} />
              <p className='text-red-500 text-xs'>{formik.touched.dateOfLepVaccine && formik.errors.dateOfLepVaccine ? formik.errors.dateOfLepVaccine : null}</p>
            </div>
            <div className='m-3'>
              <label className={style?.label} htmlFor="petFrom">Pet From<span className={style?.required}>*</span></label>
              <select {...formik.getFieldProps('petFrom')} name='petFrom' className={style?.textFiled} >
                <option value="">Select</option>
                {
                  masterData?.occurenceType?.map((item, index) => (
                    <option key={index} value={item.id}>{item.occurrence_types}</option>
                  ))
                }
              </select>
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
    </>
  )
}

export default PetRegistrationFormIndex


