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
    { label: "Fixed", value: "fixed" },
    { label: "Percentage", value: "percentage" },
  ];

  const emdExemption = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];

  const validationSchema = Yup.object({
    tenderFee: Yup.string().required(),
    processingFee: Yup.string().required(),
    tenderFeePayableTo: Yup.string().required(),
    tenderFeePayableAt: Yup.string().required(),
    surcharges: Yup.string().required(),
    otherCharges: Yup.string().required(),
    emdAmount: Yup.string().required(),
    emdPercentage: Yup.string().required(),
    emd_fee: Yup.string().required(),
    emdFeePayableAt: Yup.string().required(),
    emdFeePayableTo: Yup.string().required(),
    emd_exemption: Yup.string().required(),
  });

  const initialValues = {
    tenderFee: "",
    processingFee: "",
    tenderFeePayableTo: "",
    tenderFeePayableAt: "",
    surcharges: "",
    otherCharges: "",
    emdAmount: "",
    emdPercentage: "",
    emd_fee: "",
    emdFeePayableAt: "",
    emdFeePayableTo: "",
    emd_exemption: "",
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
          {({ values, handleChange, errors, touched, resetForm }) => (
            <Form>
              <>
                <div className=' container mx-auto capitalize'>
                  <div className='p-7 mb-6 bg-white shadow-xl border border-gray-200 rounded-md grid grid-cols-2'>
                    <div className=''>
                      <label
                        for='default-input'
                        className={`block mb-2 text-sm font-medium text-gray-900 ${
                          errors.tenderFee &&
                          touched.tenderFee &&
                          "text-red-500"
                        }`}
                      >
                        Tender Fee
                        <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type='text'
                        className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2.5 '
                        placeholder='Tender Fee'
                        name='tenderFee'
                        onChange={handleChange}
                        value={values.tenderFee}
                      />
                    </div>

                    <div className=''>
                      <label
                        for='default-input'
                        className={`block mb-2 text-sm font-medium text-gray-900 ${
                          errors.processingFee &&
                          touched.processingFee &&
                          "text-red-500"
                        }`}
                      >
                        Processing Fee
                        <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type='text'
                        className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2.5'
                        placeholder='Processing Fee'
                        name='processingFee'
                        onChange={handleChange}
                        value={values.processingFee}
                      />
                    </div>

                    <div className=''>
                      <label
                        for='default-input'
                        className={`block mb-2 text-sm font-medium text-gray-900 mt-5 ${
                          errors.tenderFeePayableTo &&
                          touched.tenderFeePayableTo &&
                          "text-red-500"
                        }`}
                      >
                        Tender Fee Payable To
                        <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type='text'
                        className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2.5'
                        placeholder='Tender Fee Payable To'
                        name='tenderFeePayableTo'
                        onChange={handleChange}
                        value={values.tenderFeePayableTo}
                      />
                    </div>

                    <div className=''>
                      <label
                        for='default-input'
                        className={`block mb-2 text-sm font-medium text-gray-900 mt-5 ${
                          errors.tenderFeePayableAt &&
                          touched.tenderFeePayableAt &&
                          "text-red-500"
                        }`}
                      >
                        Tender Fee Payable At
                        <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type='text'
                        className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2.5'
                        placeholder='Tender Fee Payable'
                        name='tenderFeePayableAt'
                        onChange={handleChange}
                        value={values.tenderFeePayableAt}
                      />
                    </div>

                    <div className=''>
                      <label
                        for='default-input'
                        className={`block mb-2 text-sm font-medium text-gray-900 mt-5 ${
                          errors.surcharges &&
                          touched.surcharges &&
                          "text-red-500"
                        }`}
                      >
                        Surcharges
                        <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type='text'
                        className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2.5'
                        placeholder='Surcharges'
                        name='surcharges'
                        onChange={handleChange}
                        value={values.surcharges}
                      />
                    </div>

                    <div className=''>
                      <label
                        for='default-input'
                        className={`block mb-2 text-sm font-medium text-gray-900 mt-5 ${
                          errors.otherCharges &&
                          touched.otherCharges &&
                          "text-red-500"
                        }`}
                      >
                        Other Charges
                        <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type='text'
                        className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2.5'
                        placeholder='Other Charges'
                        name='otherCharges'
                        onChange={handleChange}
                        value={values.otherCharges}
                      />
                    </div>
                  </div>

                  <div className='bg-[#4338ca] text-white w-full rounded p-3 flex shadow-xl'>
                    {/* <img src={fd} className='pl-2' /> */}
                    <h1 className='pt-1 pl-2 text-xl'>EMD Fee Details</h1>
                  </div>

                  <div className='p-7 mb-6 bg-white shadow-xl border border-gray-200 rounded-md grid grid-cols-3 mt-3'>
                    <RadioButtonsGroup
                      fields={emdExemption}
                      title={"EMD Exemption Allowed"}
                      name={"emd_exemption"}
                      values={values.emd_exemption}
                      handleChange={handleChange}
                      errors={errors.emd_exemption}
                      touched={touched.emd_exemption}
                      defaultValue={"no"}
                    />
                  </div>

                  <div className='p-7 mb-6 bg-white shadow-xl border border-gray-200 rounded-md grid grid-cols-2 mt-3'>
                    <div className=''>
                      <RadioButtonsGroup
                        fields={emdFee}
                        title={"EMD Fee"}
                        name={"emd_fee"}
                        values={values.emd_fee}
                        handleChange={handleChange}
                        errors={errors.emd_fee}
                        touched={touched.emd_fee}
                        disabled={values.emd_exemption == "yes"}
                        defaultValue={"fixed"}
                      />
                    </div>

                    {values.emd_fee == "Fixed" ? (
                      <div className=''>
                        <label
                          for='default-input'
                          className={`block mb-2 text-sm font-medium text-gray-900 ${
                            errors.emdAmount &&
                            touched.emdAmount &&
                            "text-red-500"
                          }`}
                        >
                          If EMD Fee is Fixed
                          <span className='text-red-500'>*</span>
                        </label>
                        <input
                          type='text'
                          className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-2/3 p-2.5'
                          placeholder='EMD Amount'
                          name='emdAmount'
                          onChange={handleChange}
                          value={values.emdAmount}
                          disabled={values.emd_exemption == "yes"}
                        />
                      </div>
                    ) : (
                      <div className=''>
                        <label
                          for='default-input'
                          className={`block mb-2 text-sm font-medium text-gray-900 ${
                            errors.emdPercentage &&
                            touched.emdPercentage &&
                            "text-red-500"
                          }`}
                        >
                          If EMD Fee is Percentage
                          <span className='text-red-500'>*</span>
                        </label>
                        <input
                          type='text'
                          className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-2/3 p-2.5'
                          placeholder='EMD Percentage %'
                          name='emdPercentage'
                          onChange={handleChange}
                          value={values.emdPercentage}
                          disabled={values.emd_exemption == "yes"}
                        />
                      </div>
                    )}
                  </div>

                  <div className='p-7 mb-6 bg-white shadow-xl border border-gray-200 rounded-md grid grid-cols-2 mt-3'>
                    <div className=''>
                      <label
                        for='default-input'
                        className={`block mb-2 text-sm font-medium text-gray-900 ${
                          errors.emdFeePayableAt &&
                          touched.emdFeePayableAt &&
                          "text-red-500"
                        }`}
                      >
                        EMD Fee Payable To
                        <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type='text'
                        className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-4/5 p-2.5'
                        placeholder='EMD Fee Payable To'
                        name='emdFeePayableAt'
                        onChange={handleChange}
                        value={values.emdFeePayableAt}
                        disabled={values.emd_exemption == "yes"}
                      />
                    </div>

                    <div className=''>
                      <label
                        for='default-input'
                        className={`block mb-2 text-sm font-medium text-gray-900 ${
                          errors.emdFeePayableTo &&
                          touched.emdFeePayableTo &&
                          "text-red-500"
                        }`}
                      >
                        EMD Fee Payable At
                        <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type='text'
                        className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-4/5 p-2.5'
                        placeholder='EMD Fee Payable At'
                        name='emdFeePayableTo'
                        onChange={handleChange}
                        value={values.emdFeePayableTo}
                        disabled={values.emd_exemption == "yes"}
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
                      onClick={() => resetForm()}
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
  );
};

export default FeeDetailsForm;
