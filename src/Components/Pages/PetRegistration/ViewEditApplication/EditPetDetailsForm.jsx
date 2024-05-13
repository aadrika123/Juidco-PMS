// Importing necessary dependencies and components
import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'
import { contextVar } from '@/Components/context/contextVar';
import ApiHeader from '@/Components/api/ApiHeader';
import AxiosInterceptors from '@/Components/Common/AxiosInterceptors';
import PetRegAPIList from '@/Components/api/PetRegAPIList';

// Styling object for consistent styles
const style = {
    required: 'text-red-700 font-semibold',
    label: 'text-sm',
    textFiled: 'block w-full h-9 border px-2 border-gray-300 rounded shadow text-gray-700',
    textArea: 'block w-full border px-2 border-gray-300 rounded shadow'
}
// Component for Pet Edit Form
export default function EditPetDetailsForm(props) {
    const applicationFullData = props?.applicationFullData;
    const [masterData, setMasterData] = useState()
    const [errorMessage, setErrorMessage] = useState(false)
    const { notify } = useContext(contextVar);
    const { id, appId } = useParams()
    console.log("pet data in Edit pet details")
    const navigate = useNavigate()
    const { api_PetRegistrationMaster, api_peteditdetails, header1 } = PetRegAPIList();
    const header = ApiHeader()

    // ==== Formik Start
    const validationSchema = yup.object({
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
        dateOfLepVaccine: yup.string().required('Kindly enter a value.'),
        petFrom: yup.string().required('Kindly enter a value.'),
    })
    const initialValues = {
        petType: applicationFullData?.pet_type,
        petName: applicationFullData?.pet_name,
        petGender: applicationFullData?.sex,
        petBirthDate: applicationFullData?.dob,
        // petIdentity: applicationFullData?.identification_mark,
        breed: applicationFullData?.breed,
        color: applicationFullData?.color,
        doctorName: applicationFullData?.vet_doctor_name,
        doctorRegNo: applicationFullData?.doctor_registration_no,
        dateOfRabies: applicationFullData?.rabies_vac_date,
        dateOfLepVaccine: applicationFullData?.leptospirosis_vac_date,
        petFrom: applicationFullData?.occurrence_type_id
    }
    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        onSubmit: (values) => {
            // submitForm(values)
            updatePetDetails(values);

        },
        validationSchema
    })
    const handleChange = (event) => {
        let name = event.target.name
        let value = event.target.value
        setErrorMessage(false)
        // { name == 'mobileNo' && formik.setFieldValue("mobileNo", allowNumberInput(value, formik.values.mobileNo, 10)) }
    };
    // ==== Formik End

    //for update 
    const updatePetDetails = (data) => {
        // setFormSubmitting(true);

        const payload = {
            id: id,
            petType: data.petType,
            petName: data.petName,
            petGender: data.petGender,
            petBirthDate: data.petBirthDate,
            //   petIdentity: data.petIdentity,
            breed: data.breed,
            color: data.color,
            doctorName: data.doctorName,
            doctorRegNo: data.doctorRegNo,
            dateOfRabies: data.dateOfRabies,
            dateOfLepVaccine: data.dateOfLepVaccine,
            petFrom: data.petFrom,
        };

        // Make a PUT request to update the data
        axios
            .post(api_peteditdetails, payload, header1)
            .then((res) => {

                // setFormSubmitting(false);
                if (res.data.status) {
                    console.log("Form updated successfully");
                    props?.editPetApplicationRef.current.close()
                    window.location.reload();
                    notify(res?.data?.message, "success");

                    //   props.data(res.data.data);
                    console.log("Updated data:", res.data.data);
                    // Close the modal after successful submission
                } else {
                    notify(res?.data?.message, "error");
                    setErrorMessage(res?.data?.message);
                    console.log("Failed to update pet details");
                }
            })
            .catch((err) => {
                setErrorMessage(err?.response?.data?.error);
                console.log("Error while updating pet details:", err?.response?.data?.error);
            });
    };
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

    return (
        <div>

            <div className=' l p-4  my-3 relative '>
                <div className='absolute top-2 right-3 cursor-pointer hover:underline'>
                    < AiOutlineClose className='text-2xl hover:bg-slate-300 shadow-lg' onClick={(() => props?.editPetApplicationRef.current.close())} />
                </div>
                <h1 className='px-1 font-semibold font-serif text-xs mt-2 text-[#37517e]'>
                    {/* <img src={petIcon} alt="Pet Detail" className='w-5 inline text-[#37517e]' />  */}
                    Pet Details</h1>


                <form onSubmit={formik.handleSubmit} onChange={handleChange}>

                    <div className='grid grid-cols-1 md:grid-cols-4 py-2'>
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
                    <p className='text-red-500 font-semibold text-center mt-3'>{errorMessage && errorMessage}</p>
                    <div className='flex justify-center my-5'>

                        <button type='submit' className='disabled:opacity-40 bg-indigo-600 hover:bg-indigo-700 px-8 py-2 text-white rounded shadow'>Submit Application</button>


                    </div>
                </form>
            </div>


        </div>
    );
}