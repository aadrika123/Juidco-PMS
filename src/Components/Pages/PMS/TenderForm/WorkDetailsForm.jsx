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
    tenderReference_No: Yup.string().required(),
    workDiscription: Yup.string().required(),
    pre_qualification_details: Yup.string().required(),
    product_category: Yup.array().min(1).required(),
    productSubCategory: Yup.string().required(),
    contract_type: Yup.string().required(),
    tender_values: Yup.string().required(),
    bid_validity: Yup.string().required(),
    completionPeriod: Yup.string().required(),
    location: Yup.string().required(),
    pinCode: Yup.string().min(6, "must be 6 digits").required(),
    pre_bid: Yup.string().required(),
    preBidMeeting: Yup.string().required(),
    preBidMeetingAdd: Yup.string().required(),
    bidOpeningPlace: Yup.string().required(),
    tenderer_class: Yup.array().min(1).required(),
    invstOffName: Yup.string().required(),
    invstOffAdd: Yup.string().required(),
    invstOffEmail_Ph: Yup.string().required(),
  });

  // Initial values for additional form fields can go here
  const initialValues = {
    tenderReference_No: "",
    workDiscription: "",
    pre_qualification_details: "",
    product_category: [],
    productSubCategory: "",
    contract_type: "",
    tender_values: "",
    bid_validity: "",
    completionPeriod: "",
    location: "",
    pinCode: "",
    pre_bid: "",
    preBidMeeting: "",
    preBidMeetingAdd: "",
    bidOpeningPlace: "",
    tenderer_class: [],
    invstOffName: "",
    invstOffAdd: "",
    invstOffEmail_Ph: "",
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
          {({
            values,
            handleChange,
            errors,
            touched,
            resetForm,
            setFieldValue,
          }) => (
            <Form>
              <>
                <div className=' container mx-auto capitalize'>
                  <div className='p-7 mb-6 bg-white shadow-xl border border-gray-200 rounded-md'>
                    <>
                      <label
                        for='default-input'
                        className={`block mb-2 text-sm font-medium text-gray-900 ${
                          errors.tenderReference_No &&
                          touched.tenderReference_No &&
                          "text-red-500"
                        }`}
                      >
                        Tender Reference No{" "}
                        <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type='text'
                        className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-1/3 p-2.5'
                        placeholder='Reference No'
                        name='tenderReference_No'
                        onChange={handleChange}
                        value={values.tenderReference_No}
                      />

                      <label
                        for='default-input'
                        className={`block mb-2 mt-3 text-sm font-medium text-gray-900 ${
                          errors.workDiscription &&
                          touched.workDiscription &&
                          "text-red-500"
                        }`}
                      >
                        Work Discriptiion
                        <span className='text-red-500'>*</span>
                      </label>

                      <div className=' relative'>
                        <textarea
                          name='workDiscription'
                          type='text'
                          className=' bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-full h-28 p-2.5'
                          placeholder='Work Discriptiion'
                          value={values.workDiscription}
                          onChange={(e) => {
                            if (values.workDiscription.length < 300) {
                              handleChange(e);
                            }
                          }}
                        />

                        <span
                          className={`absolute bottom-2 right-3 text-xs bg-gray-50 ${
                            300 === values.workDiscription.length &&
                            "text-red-500"
                          }`}
                        >
                          {values.workDiscription?.length} / {300}
                        </span>
                      </div>

                      <label
                        for='default-input'
                        className={`block mb-2 mt-3 text-sm font-medium text-gray-900 ${
                          errors.pre_qualification_details &&
                          touched.pre_qualification_details &&
                          "text-red-500"
                        }`}
                      >
                        Pre Qualification Details
                        <span className='text-red-500'>*</span>
                      </label>

                      <div className='relative'>
                        <textarea
                          name='pre_qualification_details'
                          type='text'
                          className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-full h-20 p-2.5'
                          placeholder='Tender Fee, EMD, Affidavit'
                          value={values.pre_qualification_details}
                          onChange={(e) => {
                            if (values.pre_qualification_details.length < 300) {
                              handleChange(e);
                            }
                          }}
                        />

                        <span
                          className={`absolute bottom-2 right-3 text-xs bg-gray-50 ${
                            300 === values.pre_qualification_details.length &&
                            "text-red-500"
                          }`}
                        >
                          {values.pre_qualification_details?.length} / {300}
                        </span>
                      </div>
                    </>
                  </div>

                  <div className='p-7 mb-6 bg-white shadow-xl border border-gray-200 rounded-md'>
                    <>
                      <CustomCheckboxGroup
                        fields={productCategory}
                        title={"Product Category "}
                        name={"product_category"}
                        values={values.product_category}
                        handleChange={handleChange}
                        errors={errors.product_category}
                        touched={touched.product_category}
                        setFieldValue={setFieldValue}
                        value={values.product_category}
                      />

                      <div className='relative'>
                        <label
                          for='default-input'
                          className={`block mb-2 mt-5 text-sm font-medium text-gray-900 ${
                            errors.productSubCategory &&
                            touched.productSubCategory &&
                            "text-red-500"
                          }`}
                        >
                          Product Sub Category
                          <span className='text-red-500'>*</span>
                        </label>
                        <textarea
                          name='productSubCategory'
                          type='text'
                          className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-full h-28 p-2.5'
                          placeholder='Sub Category'
                          onChange={(e) => {
                            if (values.productSubCategory.length < 300) {
                              handleChange(e);
                            }
                          }}
                          value={values.productSubCategory}
                        />
                        <span
                          className={`absolute bottom-2 right-3 text-xs bg-gray-50 ${
                            300 === values.productSubCategory.length &&
                            "text-red-500"
                          }`}
                        >
                          {values.productSubCategory?.length} / {300}
                        </span>
                      </div>
                    </>
                  </div>

                  <div className='p-7 mb-6 bg-white shadow-xl border border-gray-200 rounded-md flex justify-between'>
                    <>
                      <RadioButtonsGroup
                        fields={contractType}
                        title={"Contract Type"}
                        name={"contract_type"}
                        values={values.contract_type}
                        handleChange={handleChange}
                        errors={errors.contract_type}
                        touched={touched.contract_type}
                        setFieldValue={setFieldValue}
                      />

                      <RadioButtonsGroup
                        fields={tenderValue}
                        title={"Tender Value"}
                        name={"tender_values"}
                        values={values.tender_values}
                        handleChange={handleChange}
                        errors={errors.tender_values}
                        touched={touched.tender_values}
                        setFieldValue={setFieldValue}
                      />

                      <RadioButtonsGroup
                        fields={bidValidity}
                        title={"Bid Validity (Days)"}
                        name={"bid_validity"}
                        values={values.bid_validity}
                        handleChange={handleChange}
                        errors={errors.bid_validity}
                        touched={touched.bid_validity}
                        setFieldValue={setFieldValue}
                      />
                    </>
                  </div>

                  <div className='p-7 mb-6 bg-white shadow-xl border border-gray-200 rounded-md grid grid-cols-3'>
                    <div>
                      <label
                        for='default-input'
                        className={`block mb-2 text-sm font-medium text-gray-900 ${
                          errors.completionPeriod &&
                          touched.completionPeriod &&
                          "text-red-500"
                        }`}
                      >
                        Completion Period in Months
                        <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type='number'
                        className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-2/3 p-2.5'
                        placeholder='Completion Period'
                        name='completionPeriod'
                        onChange={handleChange}
                        value={values.completionPeriod}
                      />
                    </div>

                    <div>
                      <label
                        for='default-input'
                        className={`block mb-2 text-sm font-medium text-gray-900 ${
                          errors.location && touched.location && "text-red-500"
                        }`}
                      >
                        Location (Work/Services/Items)
                        <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type='text'
                        className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-2/3 p-2.5'
                        placeholder='Location'
                        name='location'
                        onChange={handleChange}
                        value={values.location}
                      />
                    </div>

                    <div>
                      <label
                        for='default-input'
                        className={`block mb-2 text-sm font-medium text-gray-900 ${
                          errors.pinCode && touched.pinCode && "text-red-500"
                        }`}
                      >
                        Pin Code
                        <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type='number'
                        className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-2/3 p-2.5'
                        placeholder='Pin Code'
                        name='pinCode'
                        onChange={handleChange}
                        value={values.pinCode}
                      />
                      <p className='text-red-500 text-xs '>
                        {touched.pinCode && errors.pinCode
                          ? errors.pinCode
                          : null}
                      </p>
                    </div>
                  </div>

                  <div className='p-7 mb-6 bg-white shadow-xl border border-gray-200 rounded-md'>
                    <RadioButtonsGroup
                      fields={preBidMeeting}
                      title={"Pre Bid Meeting"}
                      name={"pre_bid"}
                      values={values.pre_bid}
                      handleChange={handleChange}
                      errors={errors.pre_bid}
                      touched={touched.pre_bid}
                      setFieldValue={setFieldValue}
                    />

                    <label
                      for='default-input'
                      className={`block mb-2 mt-7 text-sm font-medium text-gray-900 ${
                        errors.preBidMeeting &&
                        touched.preBidMeeting &&
                        "text-red-500"
                      }`}
                    >
                      Pre Bid Meeting Place
                      <span className='text-red-500'>*</span>
                    </label>

                    <div className='relative'>
                      <textarea
                        type='text'
                        className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-full h-28 p-2.5'
                        placeholder='Meeting Place'
                        name='preBidMeeting'
                        value={values.preBidMeeting}
                        onChange={(e) => {
                          if (values.preBidMeeting.length < 300) {
                            handleChange(e);
                          }
                        }}
                      />

                      <span
                        className={`absolute bottom-2 right-3 text-xs bg-gray-50 ${
                          300 === values.preBidMeeting.length && "text-red-500"
                        }`}
                      >
                        {values.preBidMeeting?.length} / {300}
                      </span>
                    </div>

                    <label
                      for='default-input'
                      className={`block mb-2 mt-3 text-sm font-medium text-gray-900 ${
                        errors.preBidMeetingAdd &&
                        touched.preBidMeetingAdd &&
                        "text-red-500"
                      }`}
                    >
                      Pre Bid Meeting Address
                      <span className='text-red-500'>*</span>
                    </label>

                    <div className='relative'>
                      <textarea
                        type='text'
                        className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-full h-28 p-2.5'
                        placeholder='Meeting Address'
                        name='preBidMeetingAdd'
                        value={values.preBidMeetingAdd}
                        onChange={(e) => {
                          if (values.preBidMeeting.length < 300) {
                            handleChange(e);
                          }
                        }}
                      />
                      <span
                        className={`absolute bottom-2 right-3 text-xs bg-gray-50 ${
                          300 === values.preBidMeetingAdd.length &&
                          "text-red-500"
                        }`}
                      >
                        {values.preBidMeetingAdd?.length} / {300}
                      </span>
                    </div>
                  </div>

                  <div className='p-7 mb-6 bg-white shadow-xl border border-gray-200 rounded-md'>
                    <label
                      for='default-input'
                      className={`block mb-2  text-sm font-medium text-gray-900 ${
                        errors.bidOpeningPlace &&
                        touched.bidOpeningPlace &&
                        "text-red-500"
                      }`}
                    >
                      Bid Opening Place
                      <span className='text-red-500'>*</span>
                    </label>

                    <div className='relative'>
                      <textarea
                        type='text'
                        className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-full h-28 p-2.5'
                        placeholder='Bid Opening Place'
                        name='bidOpeningPlace'
                        value={values.bidOpeningPlace}
                        onChange={(e) => {
                          if (values.preBidMeeting.length < 300) {
                            handleChange(e);
                          }
                        }}
                      />
                      <span
                        className={`absolute bottom-2 right-3 text-xs bg-gray-50 ${
                          300 === values.bidOpeningPlace.length &&
                          "text-red-500"
                        }`}
                      >
                        {values.bidOpeningPlace?.length} / {300}
                      </span>
                    </div>
                  </div>

                  <div className='flex space-x-3'>
                    <div className='p-7 mb-6 bg-white shadow-xl border border-gray-200 rounded-md w-1/2'>
                      <CustomCheckboxGroup
                        fields={tendererClass}
                        title={"Tenderer className"}
                        name={"tenderer_class"}
                        values={values.tenderer_class}
                        handleChange={handleChange}
                        errors={errors.tenderer_class}
                        setFieldValue={setFieldValue}
                        touched={touched.tenderer_class}
                      />

                      <CustomCheckboxGroup
                        fields={tendererClass2}
                        // title={"Tenderer className"}
                        // important={"*"}
                        name={"tenderer_class"}
                        values={values.tenderer_class}
                        handleChange={handleChange}
                        errors={errors.tenderer_class}
                        setFieldValue={setFieldValue}
                        touched={touched.tenderer_class}
                      />

                      <label
                        for='default-input'
                        className={`block mb-2 mt-7 text-sm font-medium text-gray-900 ${
                          errors.invstOffName &&
                          touched.invstOffName &&
                          "text-red-500"
                        }`}
                      >
                        Inviting Officer Name
                        <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type='text'
                        className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-full  p-2.5'
                        placeholder='Inviting Officer Name'
                        name='invstOffName'
                        onChange={handleChange}
                        value={values.invstOffName}
                      />
                    </div>

                    <div className='p-7 mb-6 bg-white shadow-xl border border-gray-200 rounded-md w-1/2 flex flex-col justify-center item-center'>
                      <label
                        for='default-input'
                        className={`block mb-2  text-sm font-medium text-gray-900  ${
                          errors.invstOffAdd &&
                          touched.invstOffAdd &&
                          "text-red-500"
                        }`}
                      >
                        Inviting Officer Address
                        <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type='text'
                        className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-full p-2.5'
                        placeholder='Bid Opening Place'
                        name='invstOffAdd'
                        onChange={handleChange}
                        value={values.invstOffAdd}
                      />

                      <label
                        for='default-input'
                        className={`block mb-2 mt-7 text-sm font-medium text-gray-900 ${
                          errors.invstOffEmail_Ph &&
                          touched.invstOffEmail_Ph &&
                          "text-red-500"
                        }`}
                      >
                        Inviting Officer Phone/Email
                        <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type='text'
                        className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-full p-2.5'
                        placeholder='Inviting Officer Name'
                        name='invstOffEmail_Ph'
                        onChange={handleChange}
                        value={values.invstOffEmail_Ph}
                      />
                    </div>
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
                    type='submit'
                  >
                    Save & Next
                  </button>

                  <button
                    className='bg-white mt-5 py-2 px-4 text-sm text-black rounded hover:bg-[#4338CA] hover:text-white border border-[#4338ca] mr-5 flex float-right'
                    onClick={() => resetForm()}
                  >
                    Reset
                  </button>
                </div>
              </>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default WorkDetailsForm;
