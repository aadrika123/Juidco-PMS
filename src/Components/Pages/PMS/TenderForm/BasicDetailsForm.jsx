import React, { useRef, useState } from "react";
import folder from "@/Components/assets/folder.svg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomCheckboxGroup from "@/Components/Common/FormMolecules/CustomCheckboxGroup";
import RadioButtonsGroup from "@/Components/Common/FormMolecules/RadioButtonsGroup";
import toast from "react-hot-toast";

const BasicDetailsForm = () => {
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

  const tenderType = [
    { label: "Open", value: "open" },
    { label: "Limited", value: "limited" },
    { label: "EOI", value: "eoi" },
    { label: "Auction", value: "auction" },
    { label: "Single", value: "single" },
  ];

  const formOfContract = [
    { label: "Work Contract", value: "work_contract" },
    { label: "Auction", value: "auction" },
    { label: "Service Contract", value: "service_contract" },
    { label: "Buy", value: "buy" },
    { label: "Sell", value: "sell" },
    { label: "Empanelment", value: "empanelment" },
    { label: "Buy & Service", value: "buy_service" },
  ];

  const noOfCovers = [
    { label: "1", value: "one" },
    { label: "2", value: "two" },
    { label: "3", value: "three" },
    { label: "4", value: "four" },
  ];

  const tenderCategory = [
    { label: "Goods", value: "goods" },
    { label: "Works", value: "works" },
    { label: "Services", value: "services" },
  ];

  const allowResubmission = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];
  const allowWithdrawl = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];
  const allowOfflineSubmission = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];

  const paymentMode = [
    { label: "Online", value: "online" },
    { label: "offline", value: "offline" },
  ];
  const offlineBanks = [
    { label: "SS-Small Saving Instrument", value: "ss" },
    { label: "BG-Bank Guarantee", value: "bg" },
    { label: "BC-Bankers Cheque", value: "bc" },
    { label: "DD-Demand Draft", value: "dd" },
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
      <div className='bg-white rounded-xl w-full shadow-md p-4 border border-indigo-200'>
        {/* Heading  */}
        <div className='bg-[#4338ca] text-white w-full rounded p-3 flex'>
          <img src={folder} className='pl-2' />
          <h1 className='pt-1 pl-2 text-xl'>Basic Details</h1>
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
              <Form className='grid grid-cols-2 container mx-auto capitalize space-x-3'>
                <div className='p-4 mb-6 bg-white shadow-xl border border-gray-200 rounded-md'>
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
                      className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-full p-2.5'
                    />
                  </>

                  <CustomCheckboxGroup
                    fields={tenderType}
                    title={"Tender Type"}
                    name={"tender_type"}
                    values={values.checkboxes}
                    handleChange={handleChange}
                    errors={errors.checkboxes}
                    touched={touched.checkboxes}
                  />
                </div>

                <div className='p-4 mb-6 bg-white shadow-xl border border-gray-200 rounded-md'>
                  <CustomCheckboxGroup
                    fields={formOfContract}
                    name={"contract_form"}
                    title={"Form of Contract"}
                    values={values.checkboxes}
                    handleChange={handleChange}
                    errors={errors.checkboxes}
                    touched={touched.checkboxes}
                  />
                </div>

                <div className='p-4 mb-6 bg-white shadow-xl border border-gray-200 rounded-md'>
                  <RadioButtonsGroup
                    fields={noOfCovers}
                    title={"No of Covers"}
                    name={"no_of_covers"}
                    values={values.checkboxes}
                    handleChange={handleChange}
                    errors={errors.checkboxes}
                    touched={touched.checkboxes}
                  />
                </div>

                <div className='p-4 mb-6 bg-white shadow-xl border border-gray-200 rounded-md'>
                  <CustomCheckboxGroup
                    fields={tenderCategory}
                    title={"Tender Category"}
                    name={"tender_category"}
                    values={values.checkboxes}
                    handleChange={handleChange}
                    errors={errors.checkboxes}
                    touched={touched.checkboxes}
                  />
                </div>

                <div className='p-4 mb-6 bg-white shadow-xl border border-gray-200 rounded-md flex'>
                  {/* <div className=""> */}
                  <RadioButtonsGroup
                    fields={allowResubmission}
                    title={"Allow Resubmission"}
                    name={"allow_resubmission"}
                    values={values.checkboxes}
                    handleChange={handleChange}
                    errors={errors.checkboxes}
                    touched={touched.checkboxes}
                  />
                  {/* </div> */}

                  {/* <div className=""> */}
                  <RadioButtonsGroup
                    fields={allowWithdrawl}
                    title={"Allow Withdrawal"}
                    name={"allow_withdrawl"}
                    values={values.checkboxes}
                    handleChange={handleChange}
                    errors={errors.checkboxes}
                    touched={touched.checkboxes}
                  />
                  {/* </div> */}

                  {/* <div className=""> */}
                  <RadioButtonsGroup
                    fields={allowOfflineSubmission}
                    title={"Allow offline Submission"}
                    name={"allow_offline_submission"}
                    values={values.checkboxes}
                    handleChange={handleChange}
                    errors={errors.checkboxes}
                    touched={touched.checkboxes}
                  />
                  {/* </div> */}
                </div>

                <div className='p-4 mb-6 bg-white shadow-xl border border-gray-200 rounded-md row-span-2'>
                  <div className=''>
                    <h1 className='text-[14px] pb-3'>
                      Payment Mode <span className='text-red-500'>*</span>
                    </h1>
                    <div className='flex space-x-4 mb-4'>
                      <label className='flex items-center space-x-2'>
                        <input
                          type='radio'
                          name='tabs'
                          value='online'
                          checked={selectedTab === "online"}
                          onChange={handleTabChange}
                          className='form-radio h-4 w-4 text-blue-600'
                        />
                        <span>Online</span>
                      </label>
                      <label className='flex items-center space-x-2'>
                        <input
                          type='radio'
                          name='tabs'
                          value='offline'
                          checked={selectedTab === "offline"}
                          onChange={handleTabChange}
                          className='form-radio h-4 w-4 text-blue-600'
                        />
                        <span>Offline</span>
                      </label>
                    </div>

                    <div className='tab-content'>
                      {selectedTab === "online" && (
                        <div className='p-5'>
                          <label
                            for='countries'
                            className='block mb-2 text-sm font-medium text-gray-900'
                          >
                            In Online(Banks)
                          </label>
                          <select
                            id='countries'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                          >
                            <option selected>Choose a Bank</option>
                            <option value='US'>Bank Of India</option>
                            <option value='CA'>State Bank Of India</option>
                            <option value='FR'>Canara Bank</option>
                          </select>
                        </div>
                      )}
                      {selectedTab === "offline" && (
                        <div className=''>
                          <RadioButtonsGroup
                            fields={offlineBanks}
                            title={"In offline(Instruments)"}
                            values={values.checkboxes}
                            handleChange={handleChange}
                            errors={errors.checkboxes}
                            touched={touched.checkboxes}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className='p-4 mb-6 bg-white shadow-xl border border-gray-200 rounded-md'>
                  <h1>
                    NIT Document <span className='text-red-500'>*</span>
                  </h1>
                  <p className='text-[10px]'>
                    {" "}
                    (Only .jpg and .pdf files are supported)
                  </p>

                  <div className=''>
                    <div className='relative overflow-x-auto mt-6'>
                      <table className='w-full text-sm text-left rtl:text-right text-gray-500 rounded'>
                        <thead className='text-xs text-white uppercase '>
                          <tr className=' bg-[#4338CA] border-[2px] border-white'>
                            <th scope='col' className='px-6 py-3'>
                              File name
                            </th>
                            <th scope='col' className='px-6 py-3'>
                              Document Size in KB
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className='bg-white border'>
                            <th
                              scope='row'
                              className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap border '
                            >
                              NIT Document.pdf
                            </th>
                            <td className='px-6 py-4'>
                              <p>123 kb</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* <button
                    className="bg-[#4338CA] mt-5 py-2 px-4 text-sm text-white rounded hover:bg-white hover:text-[#4338ca] border hover:border-[#4338ca] flex float-right"
                    onClick={handleUploadDoc}
                  >
                    Upload NIT Document
                  </button> */}

                  <div className='flex justify-end'>
                    {preview != null && (
                      <div className=''>
                        <img
                          src={preview}
                          alt='Image Preview'
                          className='w-[100px] h-auto mt-[20px] border border-indigo-400 rounded mr-5'
                        />
                      </div>
                    )}

                    <div className='mb-4'>
                      <input
                        type='file'
                        accept='.jpg, .jpeg, .pdf .png'
                        className='hidden'
                        ref={inputFileRef}
                        onChange={(e) => imageHandler(e)}
                      />

                      <p className='text-red-500 text-sm m-2'>
                        {/* {props?.imageDoc?.name} */}
                      </p>

                      <div className='flex justify-end'>
                        <button
                          className={`bg-[#4338CA] mt-5 py-2 px-4 text-sm text-white rounded hover:bg-white hover:text-[#4338ca] border hover:border-[#4338ca] flex float-right`}
                          onClick={handleUploadDoc}
                        >
                          Upload NIT Document
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
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
          className='bg-[#4338CA] mt-5 py-2 px-4 text-sm text-white rounded hover:bg-white hover:text-[#4338ca] border hover:border-[#4338ca] flex float-right'
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
    </>
  );
};

export default BasicDetailsForm;
