import React, { useRef, useState } from "react";
import folder from "@/Components/assets/folder.svg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomCheckboxGroup from "@/Components/Common/FormMolecules/CustomCheckboxGroup";
import RadioButtonsGroup from "@/Components/Common/FormMolecules/RadioButtonsGroup";
import toast from "react-hot-toast";
import FileButton from "@/Components/Common/FileButtonUpload/FileButton";
import ImageDisplay from "@/Components/Common/FileButtonUpload/ImageDisplay";

const BasicDetailsForm = () => {
  const inputFileRef = useRef();

  const [preview, setPreview] = useState();
  const [imageDoc, setImageDoc] = useState();
  const [imgErr, setImgErr] = useState(false);

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

  const offlineBanks = [
    { label: "SS-Small Saving Instrument", value: "ss" },
    { label: "BG-Bank Guarantee", value: "bg" },
    { label: "BC-Bankers Cheque", value: "bc" },
    { label: "DD-Demand Draft", value: "dd" },
  ];

  const validationSchema = Yup.object({
    tenderReference_No: Yup.string().required(),
    tender_type: Yup.object().required(),
    contract_form: Yup.object().required(),
    tender_category: Yup.object().required(),
    allow_resubmission: Yup.string().required(),
    allow_withdrawl: Yup.string().required(),
    allow_offline_submission: Yup.string().required(),
    payment_mode: Yup.string().required(),
    offline_banks: Yup.string().when("payment_mode", {
      is: "offline",
      then: (schema) => schema.required("offline"),
      otherwise: (schema) => schema.optional("Required field"),
    }),
    onlinePyment_mode: Yup.string().when("payment_mode", {
      is: "online",
      then: (schema) => schema.required("Choose a bank"),
      otherwise: (schema) => schema.optional(),
    }),
  });

  // Initial values for additional form fields can go here
  const initialValues = {
    tenderReference_No: "",
    tender_type: "",
    contract_form: "",
    tender_category: "",
    allow_resubmission: "",
    allow_withdrawl: "",
    allow_offline_submission: "",
    payment_mode: "online",
    offline_banks: "",
    onlinePyment_mode: "",
  };

  return (
    <>
      <div className='bg-[#4338ca] text-white w-full rounded p-3 flex shadow-xl'>
        <img src={folder} className='pl-2' />
        <h1 className='pt-1 pl-2 text-xl'>Basic Details</h1>
      </div>

      <div className=' mt-5 container'>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            if (imageDoc == null || imageDoc == undefined || imageDoc == "") {
              setImgErr(true);
              return toast.error("Please upload valid documents");
            }
            setImgErr(false);
            console.log("Form values", values);
          }}
        >
          {({ values, handleChange, errors, touched }) => (
            <Form>
              <>
                <div className='grid grid-cols-2 container mx-auto capitalize '>
                  <div className='p-4 mr-2 mb-6 bg-white shadow-xl border border-gray-200 rounded-md'>
                    <>
                      <label
                        htmlFor='tenderReference_No'
                        className={`block mb-2 text-sm font-medium text-gray-900 ${
                          errors.tenderReference_No && "text-red-500"
                        }`}
                      >
                        Tender Reference No{" "}
                        <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type='text'
                        className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-full p-2.5'
                        name='tenderReference_No'
                        value={values.tenderReference_No}
                        onChange={handleChange}
                      />
                    </>
                    <div className='mt-3'>
                      <CustomCheckboxGroup
                        fields={tenderType}
                        title={"Tender Type"}
                        name={"tender_type"}
                        values={values.tender_type}
                        handleChange={handleChange}
                        errors={errors.tender_type}
                        touched={touched.tender_type}
                        important={"*"}
                      />
                    </div>
                  </div>

                  <div className='p-3 mb-6 bg-white shadow-xl border border-gray-200 rounded-md'>
                    <CustomCheckboxGroup
                      fields={formOfContract}
                      name={"contract_form"}
                      title={"Form of Contract"}
                      values={values.contract_form}
                      handleChange={handleChange}
                      errors={errors.contract_form}
                      touched={touched.contract_form}
                      important={"*"}
                    />
                  </div>

                  <div className='p-4 mr-2 mb-6 bg-white shadow-xl border border-gray-200 rounded-md'>
                    <CustomCheckboxGroup
                      fields={tenderCategory}
                      title={"Tender Category"}
                      name={"tender_category"}
                      values={values.tender_category}
                      handleChange={handleChange}
                      errors={errors.tender_category}
                      touched={touched.tender_category}
                      important={"*"}
                    />
                  </div>

                  <div className='p-4  mb-6 bg-white shadow-xl border border-gray-200 rounded-md flex justify-between gap-3'>
                    <RadioButtonsGroup
                      fields={allowResubmission}
                      title={"Allow Resubmission"}
                      name={"allow_resubmission"}
                      values={values.allow_resubmission}
                      handleChange={handleChange}
                      errors={errors.allow_resubmission}
                      touched={touched.allow_resubmission}
                    />

                    <RadioButtonsGroup
                      fields={allowWithdrawl}
                      title={"Allow Withdrawal"}
                      name={"allow_withdrawl"}
                      values={values.allow_withdrawl}
                      handleChange={handleChange}
                      errors={errors.allow_withdrawl}
                      touched={touched.allow_withdrawl}
                    />

                    <RadioButtonsGroup
                      fields={allowOfflineSubmission}
                      title={"Allow offline Submission"}
                      name={"allow_offline_submission"}
                      values={values.allow_offline_submission}
                      handleChange={handleChange}
                      errors={errors.allow_offline_submission}
                      touched={touched.allow_offline_submission}
                    />
                  </div>

                  {/* document upload */}
                  <div className='p-4 mr-2 mb-6 bg-white shadow-xl border border-gray-200 rounded-md'>
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
                                {imageDoc?.name || "No file Added"}
                              </th>
                              <td className='px-6 py-4'>
                                <p>
                                  {Math.round((imageDoc?.size / 1024) * 100) /
                                    100 || 0}{" "}
                                  kb
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        {imgErr && (
                          <span className='text-red-400 text-xs'>
                            Valid documents are required
                          </span>
                        )}
                      </div>
                    </div>

                    <div className='flex justify-end gap-3 '>
                      <div className=' mt-[20px] w-[40%]'>
                        <ImageDisplay
                          preview={preview}
                          imageDoc={imageDoc}
                          alt={"Nit document"}
                          showPreview={"hidden"}
                          width={"[100px]"}
                        />
                      </div>

                      <div className='flex justify-end py-12'>
                        <FileButton
                          bg={"[#4338CA]"}
                          hoverBg={"bg-indigo-300"}
                          btnLabel={"Upload NIT Document"}
                          imgRef={inputFileRef}
                          setImageDoc={setImageDoc}
                          setPreview={setPreview}
                          textColor={"white"}
                        />
                      </div>
                    </div>
                  </div>

                  {/* payment mode */}
                  <div className='p-4 mb-6 bg-white shadow-xl border border-gray-200 rounded-md row-span-2'>
                    <div className=''>
                      <h1 className='text-[14px] pb-3'>
                        Payment Mode <span className='text-red-500'>*</span>
                      </h1>
                      <div className='flex space-x-4 mb-4'>
                        <label className='flex items-center space-x-2'>
                          <input
                            type='radio'
                            name='payment_mode'
                            value='online'
                            defaultChecked={true}
                            onChange={handleChange}
                            className='form-radio h-4 w-4 text-blue-600'
                          />
                          <span>Online</span>
                        </label>
                        <label className='flex items-center space-x-2'>
                          <input
                            type='radio'
                            name='payment_mode'
                            value='offline'
                            // checked={selectedTab === "offline"}
                            onChange={handleChange}
                            className='form-radio h-4 w-4 text-blue-600'
                          />
                          <span>Offline</span>
                        </label>
                      </div>

                      <div className='tab-content'>
                        {values.payment_mode == "online" && (
                          <div className='p-5'>
                            <label
                              htmlFor='onlinePyment_mode'
                              name='onlinePyment_mode'
                              className='block mb-2 text-sm font-medium text-gray-900'
                            >
                              In Online(Banks)
                            </label>
                            <select
                              id='onlinePyment_mode'
                              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                              name='onlinePyment_mode'
                              onChange={handleChange}
                              value={values.onlinePyment_mode}
                            >
                              <option selected>Choose a Bank</option>
                              <option value='US'>Bank Of India</option>
                              <option value='CA'>State Bank Of India</option>
                              <option value='FR'>Canara Bank</option>
                            </select>
                            {errors.onlinePyment_mode &&
                            touched.onlinePyment_mode ? (
                              <p className='text-red-400 text-xs'>
                                {errors.onlinePyment_mode}
                              </p>
                            ) : null}
                          </div>
                        )}
                        {values.payment_mode == "offline" && (
                          <div className=''>
                            <RadioButtonsGroup
                              fields={offlineBanks}
                              title={"In offline(Instruments)"}
                              values={values.offline_banks}
                              handleChange={handleChange}
                              errors={errors.offline_banks}
                              touched={touched.offline_banks}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mb-10 w-full'>
                  <button
                    className='bg-[#4338CA] mt-5 py-2 px-4 text-sm text-white rounded hover:bg-white hover:text-[#4338ca] border hover:border-[#4338ca] flex float-left'
                    // onClick='##'
                    disabled
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
                    // onClick={() => }
                  >
                    Reset
                  </button>
                </div>
              </>
            </Form>
          )}
        </Formik>
      </div>
      {/* </div> */}
    </>
  );
};

export default BasicDetailsForm;
