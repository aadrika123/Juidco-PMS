import React, { useRef, useState } from "react";
import fd from "@/Components/assets/fd.svg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomCheckboxGroup from "@/Components/Common/FormMolecules/CustomCheckboxGroup";
import RadioButtonsGroup from "@/Components/Common/FormMolecules/RadioButtonsGroup";
import toast from "react-hot-toast";

const FeeDetailsForm = () => {

    const inputFileRef = useRef();

  const [selectedTab, setSelectedTab] = useState("online");
  const [preview, setPreview] = useState();
  const [imageDoc, setImageDoc] = useState();

  const handleTabChange = (event) => {
    setSelectedTab(event.target.value);
  };

  const handleUploadDoc = () => {
    inputFileRef.current.click();
  };

  //image validation with file type and size limit
  const imageHandler = (e) => {
    const validExtensions = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ];

    const maxSizeInBytes = 2 * 1024 * 1024; // 2MB in bytes

    const file = e.target.files[0];
    if (!file) {
      return toast.error("No File Selected");
    }

    // Check the file type
    if (!validExtensions.includes(file.type)) {
      toast.error(
        "Invalid file type. Please select a JPG, JPEG, PNG or PDF file."
      );
      e.target.value = ""; // Clear the input
      return;
    }

    // Check the file size
    if (file.size > maxSizeInBytes) {
      toast.error("File size exceeds 2MB. Please select a smaller file.");
      e.target.value = ""; // Clear the input
      return;
    }

    if (file) {
      console.log(file.size, "=========file size");
      // props?.setImageDoc(file);
      console.log(file, "==========file");
      setPreview(URL.createObjectURL(file));
    }
  };

const emdFee = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];

  const emdExemption = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];



  const validationSchema = Yup.object({
    checkboxes: Yup.object({
      gilad: Yup.boolean(),
      jason: Yup.boolean(),
      antoine: Yup.boolean(),
    }).test("at-least-two", "You must select exactly two options", (values) => {
      return Object.values(values).filter(Boolean).length === 2;
    }),
    // Additional form fields and their validation can go here
  });

  const initialValues = {
    checkboxes: {
      gilad: false,
      jason: false,
      antoine: false,
    },
    // Initial values for additional form fields can go here
  };


  return (
    <>

    {/* <div className='bg-white rounded-xl w-full shadow-md p-4 border border-indigo-200'> */}
        {/* Heading  */}
        <div className='bg-[#4338ca] text-white w-full rounded p-3 flex shadow-xl'>
          <img src={fd} className='pl-2' />
          <h1 className='pt-1 pl-2 text-xl'>Tender Fee Details</h1>
        </div>

         {/* Form Starting */}

         <div className=' mt-5 container'>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log("Form values", values);
            }}
          >
            {({ values, handleChange, errors, touched }) => (

                <Form >

                <>
                    <div className=' container mx-auto capitalize'>
                        <div className='p-7 mb-6 bg-white shadow-xl border border-gray-200 rounded-md grid grid-cols-2'>
                          
                          <div className="">

                            <label
                              for='default-input'
                              className='block mb-2 text-sm font-medium text-gray-900 '
                            >
                              Tender Fee
                              <span className='text-red-500'>*</span>
                            </label>
                            <input
                              type='text'
                              className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2.5 '
                              placeholder="Tender Fee"
                            />
                          </div>
                            
                            <div className="">

                            <label
                              for='default-input'
                              className='block mb-2 text-sm font-medium text-gray-900 '
                            >
                              Processing Fee
                              <span className='text-red-500'>*</span>
                            </label>
                            <input
                              type='text'
                              className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2.5'
                              placeholder="Processing Fee"
                            />
                            </div>
                            
                            <div className="">

                            <label
                              for='default-input'
                              className='block mb-2 text-sm font-medium text-gray-900 mt-5'
                            >
                              Tender Fee Payable To
                              <span className='text-red-500'>*</span>
                            </label>
                            <input
                              type='text'
                              className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2.5'
                              placeholder="Tender Fee Payable To"
                            />
                            </div>
                            
                            <div className="">

                            <label
                              for='default-input'
                              className='block mb-2 text-sm font-medium text-gray-900 mt-5'
                            >
                              Tender Fee Payable At
                              <span className='text-red-500'>*</span>
                            </label>
                            <input
                              type='text'
                              className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2.5'
                              placeholder="Tender Fee Payable"
                            />
                            </div>
                            
                            <div className="">

                            <label
                              for='default-input'
                              className='block mb-2 text-sm font-medium text-gray-900 mt-5'
                            >
                              Surcharges
                              <span className='text-red-500'>*</span>
                            </label>
                            <input
                              type='text'
                              className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2.5'
                              placeholder="Surcharges"
                            />
                            </div>
                            
                            <div className="">

                            <label
                              for='default-input'
                              className='block mb-2 text-sm font-medium text-gray-900 mt-5'
                            >
                              Other Charges
                              <span className='text-red-500'>*</span>
                            </label>
                            <input
                              type='text'
                              className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2.5'
                              placeholder="Other Charges"
                            />
                            </div>

                            
                        </div>

                        <div className='bg-[#4338ca] text-white w-full rounded p-3 flex shadow-xl'>
                            {/* <img src={fd} className='pl-2' /> */}
                            <h1 className='pt-1 pl-2 text-xl'>EMD Fee Details</h1>
                        </div>

                        <div className='p-7 mb-6 bg-white shadow-xl border border-gray-200 rounded-md grid grid-cols-3 mt-3'>
                        
                            <div className="">

                            <RadioButtonsGroup
                                fields={emdFee}
                                title={"EMD Fee"}
                                name={"emd_fee"}
                                values={values.checkboxes}
                                handleChange={handleChange}
                                errors={errors.checkboxes}
                                touched={touched.checkboxes}
                            />
                            </div>

                            <div className="">
                            <label
                                    for='default-input'
                                    className='block mb-2 text-sm font-medium text-gray-900'
                                    >
                                    If EMD Fee is Fixed
                                    <span className='text-red-500'>*</span>
                                    </label>
                                    <input
                                    type='text'
                                    className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-2/3 p-2.5'
                                    placeholder="EMD Amount"
                                    />
                            </div>
                            
                            <div className="">
                            <label
                                    for='default-input'
                                    className='block mb-2 text-sm font-medium text-gray-900'
                                    >
                                    If EMD Fee is Percentage
                                    <span className='text-red-500'>*</span>
                                    </label>
                                    <input
                                    type='text'
                                    className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-2/3 p-2.5'
                                    placeholder="EMD Percentage %"
                                    />
                            </div>

                        </div>

                        <div className='p-7 mb-6 bg-white shadow-xl border border-gray-200 rounded-md grid grid-cols-2 mt-3'>

                            <div className="">
                            <label
                                    for='default-input'
                                    className='block mb-2 text-sm font-medium text-gray-900'
                                    >
                                    EMD Fee Payable To
                                    <span className='text-red-500'>*</span>
                                    </label>
                                    <input
                                    type='text'
                                    className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-4/5 p-2.5'
                                    placeholder="EMD Fee Payable"
                                    />
                            </div>

                            <div className="">
                            <label
                                    for='default-input'
                                    className='block mb-2 text-sm font-medium text-gray-900'
                                    >
                                    EMD Fee Payable At
                                    <span className='text-red-500'>*</span>
                                    </label>
                                    <input
                                    type='text'
                                    className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-4/5 p-2.5'
                                    placeholder="EMD Fee Payable"
                                    />
                            </div>

                            <div className="mt-10">
                            <RadioButtonsGroup
                                fields={emdExemption}
                                title={"EMD Exemption Allowed"}
                                name={"emd_exemption"}
                                values={values.checkboxes}
                                handleChange={handleChange}
                                errors={errors.checkboxes}
                                touched={touched.checkboxes}
                            />
                            </div>

                        </div>


                    
                        <div className='mb-5'>
                        <button
                          className='bg-[#4338CA] mt-5 py-2 px-4 text-sm text-white rounded hover:bg-white hover:text-[#4338ca] border hover:border-[#4338ca] flex float-left'
                          onClick='##'
                        >
                          Back
                        </button>

                        <button
                          className='bg-[#4338CA] mt-5 py-2 px-4 text-sm text-white rounded hover:bg-white hover:text-[#4338ca] border border-[#4338ca] flex float-right animate-pulse'
                          onClick='##'
                        >
                          Save & Next
                        </button>

                        <button
                          className='bg-white mt-5 py-2 px-4 text-sm text-black rounded hover:bg-[#4338CA] hover:text-white border border-[#4338ca] mr-5 flex float-right'
                          onClick='##'
                        >
                          Reset
                        </button>
                        </div>

                    </div>

                  </>

                </Form>
            )}
            </Formik>

          </div>
      
    </>
  )
}

export default FeeDetailsForm
