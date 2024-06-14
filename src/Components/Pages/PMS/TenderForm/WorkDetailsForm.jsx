import wd from "@/Components/assets/wd.svg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomCheckboxGroup from "@/Components/Common/FormMolecules/CustomCheckboxGroup";
import RadioButtonsGroup from "@/Components/Common/FormMolecules/RadioButtonsGroup";
import TenderFormButton from "@/Components/Common/TenderFormButton/TenderFormButton";
import { useLocation, useNavigate } from "react-router-dom";
import ProjectApiList from "@/Components/api/ProjectApiList";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ApiHeader2 from "@/Components/api/ApiHeader2";
import toast from "react-hot-toast";
import ApiHeader from "@/Components/api/ApiHeader";
import { useEffect, useState } from "react";
import { CleanHands } from "@mui/icons-material";

const WorkDetailsForm = () => {
  const navigate = useNavigate();

  const { api_postWorkDetails, api_getWorkDetails } = ProjectApiList();

  const [workDetailData, setWorkDetailData] = useState();
  const [referenceNo,setReferenceNo] = useState();

  const { state } = useLocation();
  console.log(state);

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
    reference_no: Yup.string().required(),
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
    bidOpeningPlace: Yup.string().required(),
    tenderer_class: Yup.array().min(1).required(),
    invstOffName: Yup.string().required(),
    invstOffAdd: Yup.string().required(),
    invstOffEmail_Ph: Yup.string().required(),
    preBidMeeting: Yup.string().when("pre_bid", {
      is: "yes",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.optional(),
    }),
    preBidMeetingAdd: Yup.string().when("pre_bid", {
      is: "yes",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.optional(),
    }),
  });

  // Initial values for additional form fields can go here
  const initialValues = {
    reference_no: referenceNo|| "",
    workDiscription: workDetailData?.workDiscription || "",
    pre_qualification_details: workDetailData?.pre_qualification_details || "",
    product_category: workDetailData?.product_category || [],
    productSubCategory: workDetailData?.productSubCategory || "",
    contract_type: workDetailData?.contract_type || "",
    tender_values: workDetailData?.tender_values || "",
    bid_validity: workDetailData?.bid_validity || "",
    completionPeriod: workDetailData?.completionPeriod || "",
    location: workDetailData?.location || "",
    pinCode: workDetailData?.pinCode || "",
    pre_bid: workDetailData?.pre_bid ? "yes" : "no",
    preBidMeeting: workDetailData?.preBidMeeting || "",
    preBidMeetingAdd: workDetailData?.preBidMeetingAdd || "yes",
    bidOpeningPlace: workDetailData?.bidOpeningPlace || "",
    tenderer_class: workDetailData?.tenderer_class || [],
    invstOffName: workDetailData?.invstOffName || "",
    invstOffAdd: workDetailData?.invstOffAdd || "",
    invstOffEmail_Ph: workDetailData?.invstOffEmail_Ph || "",
  };

  // submit form
  const submitForm = async (values) => {
    AxiosInterceptors.post(
      api_postWorkDetails,
      { preTender: JSON.stringify(values) },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status) {
          toast.success("Basic data Submitted successfully");
          navigate(`/tendering?tabNo=${4}`, { state });
        } else {
          toast.error("Error in Forwarding to DA. Please try again");
        }
      })
      .catch(function (error) {
        console.log(error, "errrrrrrrrrrrrrrrrrrr");
        toast.error(error?.response?.data?.error);
      });
  };

  ///////////{*** APPLICATION FULL DETAIL ***}/////////

  const getApplicationDetail = (refNo) => {
    AxiosInterceptors.get(`${api_getWorkDetails}/${refNo}`, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          setWorkDetailData(response?.data?.data);
        } else {
          // toast.error(response?.data?.message);
        }
      })
      .catch(function (error) {
        // toast.error("Error while getting details...");
      });
  };

  useEffect(() => {
    let refNo = window.localStorage.getItem("reference_no");
setReferenceNo(refNo)
    getApplicationDetail(refNo);
  }, []);

  return (
    <>
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
                  <div className='p-7 mb-6 bg-white shadow-xl border border-gray-200 rounded-md'>
                    <>
                      <label
                        for='default-input'
                        className={`block mb-2 text-sm font-medium text-gray-900 ${
                          errors.reference_no &&
                          touched.reference_no &&
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
                        name='reference_no'
                        onChange={handleChange}
                        value={values.reference_no}
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
                        type='text'
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
                      defaultValue={"yes"}
                    />
                    {values.pre_bid == "yes" && (
                      <>
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
                            disabled={values.pre_bid == "no"}
                            onChange={(e) => {
                              if (values.preBidMeeting.length < 300) {
                                handleChange(e);
                              }
                            }}
                          />

                          <span
                            className={`absolute bottom-2 right-3 text-xs bg-gray-50 ${
                              300 === values.preBidMeeting.length &&
                              "text-red-500"
                            }`}
                          >
                            {values.preBidMeeting?.length} / {50}
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
                            disabled={values.pre_bid == "no"}
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
                      </>
                    )}
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

                <TenderFormButton resetForm={resetForm} getDetailData={workDetailData} />

                {/* <div className='mb-5'>
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
                </div> */}
              </>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default WorkDetailsForm;
