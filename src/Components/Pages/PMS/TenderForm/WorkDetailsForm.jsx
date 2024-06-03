import React, { useRef, useState } from "react";
import wd from "@/Components/assets/wd.svg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomCheckboxGroup from "@/Components/Common/FormMolecules/CustomCheckboxGroup";
import RadioButtonsGroup from "@/Components/Common/FormMolecules/RadioButtonsGroup";
import toast from "react-hot-toast";


const WorkDetailsForm = () => {
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

const productCategory = [
    { label: "Civil Works", value: "civil_works" },
    { label: "Electrical Works", value: "elect_works" },
    { label: "Fleet Management ", value: "fleet_mang" },
    { label: "Computer Systems", value: "computer_sys" },
  ];

const contractType = [
    { label: "Tender", value: "tender" },
    { label: "Empanelment", value: "empanelment" },
  ];
  
const tenderValue = [
      { label: "INR", value: "inr" },
      { label: "USA", value: "usa" },
      { label: "EUR", value: "eur" },
    ];
    
const bidValidity = [
    { label: "120", value: "120" },
    { label: "90", value: "90" },
    { label: "60", value: "60" },
    { label: "30", value: "30" },
    { label: "other", value: "other" },
];

const preBidMeeting = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
];

const tendererClass = [
    { label: "A", value: "a" },
    { label: "B", value: "b" },
    { label: "C", value: "c" },
    { label: "D", value: "d" },
    { label: "E", value: "e" },
];
const tendererClass2 = [
    { label: "I", value: "i" },
    { label: "II", value: "ii" },
    { label: "III", value: "iii" },
    { label: "IV", value: "iv" },
    { label: "V", value: "v" },
    { label: "others", value: "others" },
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
          <img src={wd} className='pl-2' />
          <h1 className='pt-1 pl-2 text-xl'>Work Item Details</h1>
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

                <Form className=' container mx-auto capitalize'>
                {/* <Form className='grid grid-cols-2 container mx-auto capitalize space-x-3'> */}
                <div className='p-7 mb-6 bg-white shadow-xl border border-gray-200 rounded-md'>
                  <>
                    <label
                      for='default-input'
                      className='block mb-2 text-sm font-medium text-gray-900'
                    >
                      Tender Reference No{" "}
                      <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='text'
                      className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-1/3 p-2.5'
                      placeholder="Reference No"
                    />
                    
                    <label
                      for='default-input'
                      className='block mb-2 mt-3 text-sm font-medium text-gray-900'
                    >
                      Work Discriptiion
                      <span className='text-red-500'>*</span>
                    </label>
                    <textarea
                      type='text'
                      className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-full h-28 p-2.5'
                      placeholder="Work Discriptiion"
                    />
                    
                    <label
                      for='default-input'
                      className='block mb-2 mt-3 text-sm font-medium text-gray-900'
                    >
                      Pre Qualification Details
                      <span className='text-red-500'>*</span>
                    </label>
                    <textarea
                    placeholder="Tender Fee, EMD, Affidavit"
                      type='text'
                      className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-full h-20 p-2.5'
                    />
                  </>
                </div>

                
                <div className='p-7 mb-6 bg-white shadow-xl border border-gray-200 rounded-md'>
                  <>
                    <CustomCheckboxGroup
                    fields={productCategory}
                    title={"Product Category "}
                    name={"product_category"}
                    values={values.checkboxes}
                    handleChange={handleChange}
                    errors={errors.checkboxes}
                    touched={touched.checkboxes}
                  />
                    
                    <label
                      for='default-input'
                      className='block mb-2 mt-5 text-sm font-medium text-gray-900'
                    >
                      Product Sub Category 
                      <span className='text-red-500'>*</span>
                    </label>
                    <textarea
                      type='text'
                      className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-full h-28 p-2.5'
                      placeholder="Sub Category"
                    />
                  </>
                </div>


                <div className='p-7 mb-6 bg-white shadow-xl border border-gray-200 rounded-md flex justify-between'>
                  <>

                  <RadioButtonsGroup
                    fields={contractType}
                    title={"Contract Type"}
                    name={"contract_type"}
                    values={values.checkboxes}
                    handleChange={handleChange}
                    errors={errors.checkboxes}
                    touched={touched.checkboxes}
                  />
                  
                  <RadioButtonsGroup
                    fields={tenderValue}
                    title={"Tender Value"}
                    name={"tender_values"}
                    values={values.checkboxes}
                    handleChange={handleChange}
                    errors={errors.checkboxes}
                    touched={touched.checkboxes}
                  />
                  
                  <RadioButtonsGroup
                    fields={bidValidity}
                    title={"Bid Validity (Days)"}
                    name={"bid_validity"}
                    values={values.checkboxes}
                    handleChange={handleChange}
                    errors={errors.checkboxes}
                    touched={touched.checkboxes}
                  />

                  </>
                </div>
                
                <div className='p-7 mb-6 bg-white shadow-xl border border-gray-200 rounded-md grid grid-cols-3'>
                  
                    <div>
                        <label
                            for='default-input'
                            className='block mb-2 text-sm font-medium text-gray-900'
                            >
                            Completion Period in Months
                            <span className='text-red-500'>*</span>
                            </label>
                            <input
                            type='text'
                            className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-2/3 p-2.5'
                            placeholder="Completion Period "
                            />
                    </div>

                    <div>
                        <label
                            for='default-input'
                            className='block mb-2 text-sm font-medium text-gray-900'
                            >
                            Location (Work/Services/Items)
                            <span className='text-red-500'>*</span>
                            </label>
                            <input
                            type='text'
                            className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-2/3 p-2.5'
                            placeholder="Location"
                            />
                    </div>
                    
                    <div>
                        <label
                            for='default-input'
                            className='block mb-2 text-sm font-medium text-gray-900'
                            >
                            Pin Code
                            <span className='text-red-500'>*</span>
                            </label>
                            <input
                            type='number'
                            className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-2/3 p-2.5'
                            placeholder="Pin Code"
                    />
                  </div>

                </div>
               
               
                <div className='p-7 mb-6 bg-white shadow-xl border border-gray-200 rounded-md'>
                  
                <RadioButtonsGroup
                    fields={preBidMeeting}
                    title={"Pre Bid Meeting"}
                    name={"pre_bid"}
                    values={values.checkboxes}
                    handleChange={handleChange}
                    errors={errors.checkboxes}
                    touched={touched.checkboxes}
                  />


                    <label
                      for='default-input'
                      className='block mb-2 mt-7 text-sm font-medium text-gray-900'
                    >
                      Pre Bid Meeting Place
                      <span className='text-red-500'>*</span>
                    </label>
                    <textarea
                      type='text'
                      className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-full h-28 p-2.5'
                      placeholder="Meeting Place"
                    />
                   
                   
                    <label
                      for='default-input'
                      className='block mb-2 mt-3 text-sm font-medium text-gray-900'
                    >
                      Pre Bid Meeting Address
                      <span className='text-red-500'>*</span>
                    </label>
                    <textarea
                      type='text'
                      className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-full h-28 p-2.5'
                      placeholder="Meeting Address"
                    />
                    

                </div>
               
               
                <div className='p-7 mb-6 bg-white shadow-xl border border-gray-200 rounded-md'>
                
                    <label
                      for='default-input'
                      className='block mb-2  text-sm font-medium text-gray-900'
                    >
                      Bid Opening Place
                      <span className='text-red-500'>*</span>
                    </label>
                    <textarea
                      type='text'
                      className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-full h-28 p-2.5'
                      placeholder="Bid Opening Place"
                    />
            
                </div>
               
                <div className="flex space-x-3">
                    
                <div className='p-7 mb-6 bg-white shadow-xl border border-gray-200 rounded-md w-1/2'>
                
                <CustomCheckboxGroup
                    fields={tendererClass}
                    title={"Tenderer Class"}
                    name={"tenderer_class"}
                    values={values.checkboxes}
                    handleChange={handleChange}
                    errors={errors.checkboxes}
                    touched={touched.checkboxes}
                  />
                
                <CustomCheckboxGroup
                    fields={tendererClass2}
                    // title={"Tenderer Class"}
                    // important={"*"}
                    name={"tenderer_class"}
                    values={values.checkboxes}
                    handleChange={handleChange}
                    errors={errors.checkboxes}
                    touched={touched.checkboxes}
                  />

                
                <label
                      for='default-input'
                      className='block mb-2 mt-7 text-sm font-medium text-gray-900'
                    >
                      Inviting Officer Name
                      <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='text'
                      className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-full  p-2.5'
                      placeholder="Inviting Officer Name"
                    />
            
                </div>
               
                <div className='p-7 mb-6 bg-white shadow-xl border border-gray-200 rounded-md w-1/2 flex flex-col justify-center item-center'>
                
                    <label
                      for='default-input'
                      className='block mb-2  text-sm font-medium text-gray-900'
                    >
                      Inviting Officer Address
                      <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='text'
                      className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-full p-2.5'
                      placeholder="Bid Opening Place"
                    />

                    
                    <label
                      for='default-input'
                      className='block mb-2 mt-7 text-sm font-medium text-gray-900'
                    >
                      Inviting Officer Phone/Email
                      <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='text'
                      className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-full p-2.5'
                      placeholder="Inviting Officer Name"
                    />
            
                </div>

                </div>


                </Form>

            )}
            </Formik>

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
        {/* </div> */}
    </>
  )
}

export default WorkDetailsForm
