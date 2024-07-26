import React, { useEffect, useRef, useState } from "react";
import fd from "@/Components/assets/fd.svg";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import RadioButtonsGroup from "@/Components/Common/FormMolecules/RadioButtonsGroup";
import TenderFormButton from "@/Components/Common/TenderFormButton/TenderFormButton";
import { useLocation, useNavigate } from "react-router-dom";
import ProjectApiList from "@/Components/api/ProjectApiList";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ApiHeader from "@/Components/api/ApiHeader";

const FeeDetailsForm = () => {
  const navigate = useNavigate();
  // const { state } = useLocation();
  // console.log(state)

  const { api_postFeeDetails, api_getFeeDetails } = ProjectApiList();
  const [isLoading, setIsLoading] = useState(true);
  const [feeDetailData, setFeeDetailData] = useState();
  const [referenceNo, setReferenceNo] = useState();

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
    surcharges: Yup.string(),
    otherCharges: Yup.string().required(),
    emdAmount: Yup.string().required(),
    emd_fee: Yup.string().required(),
    emd_exemption: Yup.string().required(),
    emdAmount: Yup.string().when(["emd_exemption", "emd_fee"], {
      is: (emd_exemption, emd_fee) =>
        emd_exemption === "no" && emd_fee === "fixed",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.optional(),
    }),
    emdFeePayableAt: Yup.string().when("emd_exemption", {
      is: "no",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.optional(),
    }),
    emdFeePayableTo: Yup.string().when("emd_exemption", {
      is: "no",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.optional(),
    }),
    emdPercentage: Yup.string().when(["emd_exemption", "emd_fee"], {
      is: (emd_exemption, emd_fee) =>
        emd_exemption === "no" && emd_fee === "percentage",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.optional(),
    }),
  });

  // console.log(referenceNo)

  const initialValues = {
    reference_no: referenceNo,
    tenderFee: feeDetailData?.tenderFee || "",
    processingFee: feeDetailData?.processingFee || "",
    tenderFeePayableTo: feeDetailData?.tenderFeePayableTo || "",
    tenderFeePayableAt: feeDetailData?.tenderFeePayableAt || "",
    surcharges: feeDetailData?.surcharges || "",
    otherCharges: feeDetailData?.otherCharges || "",
    emdAmount: feeDetailData?.emdAmount || "",
    emdPercentage: feeDetailData?.emdPercentage || "",
    emd_exemption: feeDetailData?.emd_exemption ? "yes" : "no",
    emd_fee: feeDetailData?.emd_fee || "fixed",
    emdFeePayableAt: feeDetailData?.emdFeePayableAt || "",
    emdFeePayableTo: feeDetailData?.emdFeePayableTo || "",
  };

 

  // submit form
  const submitForm = async (values) => {
    setIsLoading(true);
    AxiosInterceptors.post(
      api_postFeeDetails,
      { preTender: JSON.stringify(values) },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status) {
          toast.success("Fee Details Data Submitted successfully");
          navigate(`/tendering?tabNo=${5}`);
        } else {
          toast.error("Error in Submitting. Please try again");
        }
      })
      .catch(function (error) {
        console.log(error, "errrrrrrrrrrrrrrrrrrr");
        toast.error(error?.response?.data?.error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getApplicationDetail = (refNo) => {
    setIsLoading(true);
    AxiosInterceptors.get(`${api_getFeeDetails}/${refNo}`, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          setFeeDetailData(response?.data?.data);
        } else {
          // toast.error(response?.data?.message);
        }
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    let refNo = window.localStorage.getItem("reference_no");
    setReferenceNo(refNo);
    getApplicationDetail(refNo);
  }, []);

  return (
    <>
      {/* Heading  */}
      <div className='bg-[#4338ca] text-white w-full rounded p-3 flex shadow-xl'>
        <img src={fd} className='pl-2' />
        <h1 className='pt-1 pl-2 text-xl'>Tender Fee Details</h1>
      </div>

      {/* Form Starting */}
      <div
        className={`mt-5 container mb-20  ${
          isLoading ? "blur-[2px] pointer-events-none" : ""
        }`}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={(values) => {
            console.log("Form values", values);
            submitForm(values);
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
                        type='number'
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
                        type='number'
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
                        type='number'
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
                        type='number'
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
                      defaultValue={"Yes"}
                      setFieldValue={setFieldValue}
                    />
                  </div>

                  <div
                    className={`p-7 mb-6 ${
                      values.emd_exemption == "yes" ? "bg-gray-200" : "bg-white"
                    } shadow-xl border border-gray-200 rounded-md grid grid-cols-2 mt-3`}
                  >
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
                        setFieldValue={setFieldValue}
                      />
                    </div>

                    {values.emd_fee == "fixed" ? (
                      <div className=''>
                        <label
                          for='default-input'
                          className={`block mb-2 text-sm font-medium text-gray-900 ${
                            errors.emdAmount &&
                            touched.emdAmount &&
                            "text-red-500"
                          }`}
                        >
                          EMD Fee
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
                          EMD Fee(in Percentage)
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

                  <div
                    className={`p-7 mb-6 ${
                      values.emd_exemption == "yes" ? "bg-gray-200" : "bg-white"
                    } shadow-xl border border-gray-200 rounded-md grid grid-cols-2 mt-3`}
                  >
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

                  <TenderFormButton
                    resetForm={resetForm}
                    getDetailData={feeDetailData}
                  />

                  {/* <div className='mb-5'>
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
                  </div> */}
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
