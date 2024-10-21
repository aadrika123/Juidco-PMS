import * as Yup from "yup";
import RadioButtonsGroup from "@/Components/Common/FormMolecules/RadioButtonsGroup";
import React, { useEffect, useRef, useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import icon from "@/Components/assets/FeaturedIcon.svg";
import TenderFormButton from "@/Components/Common/TenderFormButton/TenderFormButton";
import { Formik, Form } from "formik";
import ImageDisplay from "@/Components/Common/FileButtonUpload/ImageDisplay";
import FileButton from "@/Components/Common/FileButtonUpload/FileButton";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ApiHeader2 from "@/Components/api/ApiHeader2";
import ProjectApiList from "@/Components/api/ProjectApiList";
import toast from "react-hot-toast";
import LoaderApi from "@/Components/Common/Loaders/LoaderApi";
import ApiHeader from "@/Components/api/ApiHeader";

const BiddingDetailForm = (props) => {
  const { api_addBidder, api_fetchProcurementDetById, api_getBidderById } = ProjectApiList();
  const { tabNo } = props

  //regex --
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  const onlyNumbersRegex = /^[0-9]+$/;

  const inputFileRef = useRef();
  const inputFileTechRef = useRef();
  const inputFileFincRef = useRef();

  const [basicDetailData, setBasicDetailData] = useState();
  const [preview, setPreview] = useState();
  const [techPreview, setTechPreview] = useState();
  const [fincPreview, setFincPreview] = useState();
  const [imageDoc, setImageDoc] = useState();
  const [techImageDoc, setTechImageDoc] = useState();
  const [fincImageDoc, setFincImageDoc] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [applicationFullData, setapplicationFullData] = useState([]);
  const [initialValues, setInitialValues] = useState({
    name: "",
    pan_no: "",
    gst_no: "",
    address: "",
    bank: "",
    account_no: "",
    ifsc: "",
    bidding_amount: "",
    //
    emd: applicationFullData?.emd ? "yes" : "no",
    payment_mode: "online",
    dd_no: "",
    dd_bank: "",
    dd_date: "",
    bg_no: "",
    bg_bank: "",
    bg_date: "",
    offline_mode: "bg",
    transaction_no: "",
    cash_transcNo: "",
  });

  const emdConfirmation = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];

  const transc = [
    { label: "Online", value: "online" },
    { label: "Offline", value: "offline" },
  ];

  const transcMode = [
    { label: "BG", value: "bg" },
    { label: "DD", value: "dd" },
  ];

  const validationSchema = Yup.object({
    // reference_no: Yup.string().required(),
    name: Yup.string().required("Bidder Name is mandatory"),
    address: Yup.string().required("Address is required"),
    pan_no: Yup.string().required("Pan Number is required"),
    gst_no: Yup.string().required("Gst number is required"),
    bank: Yup.string().required("Bank Name is required"),
    ifsc: Yup.string().required("IFSC Name is required"),
    account_no: Yup.string().required("Account number is required"),
    dd_no: Yup.string().when(["emd", "payment_mode", "offline_mode"], {
      is: (emd, payment_mode, offline_mode) =>
        emd === "yes" && payment_mode === "offline" && offline_mode === "dd",
      then: (schema) => schema.required("DD number is required"),
      otherwise: (schema) => schema.optional("Required field"),
    }),
    dd_bank: Yup.string().when(["emd", "payment_mode", "offline_mode"], {
      is: (emd, payment_mode, offline_mode) =>
        emd === "yes" && payment_mode === "offline" && offline_mode === "dd",
      then: (schema) => schema.required("Bank name is required"),
      otherwise: (schema) => schema.optional("Required field"),
    }),
    dd_date: Yup.string().when(["emd", "payment_mode", "offline_mode"], {
      is: (emd, payment_mode, offline_mode) =>
        emd === "yes" && payment_mode === "offline" && offline_mode === "dd",
      then: (schema) => schema.required("Date is required"),
      otherwise: (schema) => schema.optional("Required field"),
    }),
    bg_no: Yup.string().when(["emd", "payment_mode", "offline_mode"], {
      is: (emd, payment_mode, offline_mode) =>
        emd === "yes" && payment_mode === "offline" && offline_mode === "bg",
      then: (schema) => schema.required("Transaction number is required"),
      otherwise: (schema) => schema.optional("Required field"),
    }),
    bg_date: Yup.string().when(["emd", "payment_mode", "offline_mode"], {
      is: (emd, payment_mode, offline_mode) =>
        emd === "yes" && payment_mode === "offline" && offline_mode === "bg",
      then: (schema) => schema.required("Date is required"),
      otherwise: (schema) => schema.optional("Required field"),
    }),
    bg_bank: Yup.string().when(["emd", "payment_mode", "offline_mode"], {
      is: (emd, payment_mode, offline_mode) =>
        emd === "yes" && payment_mode === "offline" && offline_mode === "bg",
      then: (schema) => schema.required("Bank name is required"),
      otherwise: (schema) => schema.optional("Required field"),
    }),
    transaction_no: Yup.string().when(["emd", "payment_mode"], {
      is: (emd, payment_mode) => emd === "yes" && payment_mode === "online",
      then: (schema) => schema.required("Transaction Number is required"),
      otherwise: (schema) => schema.optional(),
    }),
  });

  const emptyinitialValues = {
    // reference_no:"",
    name: "",
    pan_no: "",
    gst_no: "",
    address: "",
    bank: "",
    account_no: "",
    ifsc: "",
    bidding_amount: "",
    //
    emd: applicationFullData?.emd ? "yes" : "no",
    payment_mode: "online",
    dd_no: "",
    dd_bank: "",
    dd_date: "",
    bg_no: "",
    bg_bank: "",
    bg_date: "",
    offline_mode: "bg",
    transaction_no: "",
    cash_transcNo: "",
  };

  // let initialValues = emptyinitialValues



  const submitBiddigData = (data) => {
    if (
      props?.bidderData?.bidder_master?.some(
        (details) => details?.pan_no === data?.pan_no
      )
    ) {
      return toast.error("Pan Number cannot be same for bidders");
    }
    if (
      props?.bidderData?.bidder_master?.some(
        (details) => details?.gst_no === data?.gst_no
      )
    ) {
      return toast.error("Gst Number cannot be same for bidders");
    }
    //validations---->>
    if (!data?.pan_no || !panRegex.test(data?.pan_no)) {
      return toast.error("Invalid Pan Number");
    }
    if (!data?.gst_no || !gstRegex.test(data?.gst_no)) {
      return toast.error("Invalid Gst Number");
    }
    if (!data?.ifsc || !ifscRegex.test(data?.ifsc)) {
      return toast.error("Invalid IFSC code");
    }
    if (
      props?.bidderData?.bid_type == "technical" &&
      (!data?.bidding_amount || !onlyNumbersRegex.test(data?.bidding_amount))
    ) {
      return toast.error("Bidding Amount should be number");
    }
    // if (!imageDoc) {
    //   return toast.error("Please upload valid EMD document");
    // }
    if (props?.bidderData?.bid_type == "technical" && !techImageDoc) {
      return toast.error("Please upload valid Technical document");
    } else if (props?.bidderData?.bid_type == "abc" && !techImageDoc) {
      return toast.error("Please upload valid Technical document");
    } else if (props?.bidderData?.bid_type == "financial" && !fincImageDoc) {
      return toast.error("Please upload valid Financial document");
    } else if (
      props?.bidderData?.bid_type == "fintech" &&
      !props?.bidderData?.techComparison &&
      !techImageDoc
    ) {
      return toast.error("Please upload documents for Technical Comparison");
    } else if (
      props?.bidderData?.bid_type == "fintech" &&
      props?.bidderData?.techComparison &&
      !fincImageDoc
    ) {
      return toast.error("Please upload documents for Financial Comparison");
    }

    setisLoading(true);
    data = { ...data, reference_no: props?.bidderData?.reference_no };

    let formData = new FormData();
    formData.append("emd_doc", imageDoc);
    formData.append("tech_doc", techImageDoc);
    formData.append("fin_doc", fincImageDoc);
    formData.append("bidder", JSON.stringify(data));

    AxiosInterceptors.post(`${api_addBidder}`, formData, ApiHeader2())
      .then(function (response) {
        if (response?.data?.status == true) {
          toast.success(response?.data?.message, "success");
          props?.getApplicationDetail(props?.bidderData?.reference_no);
        } else {
          toast(response, "error");
        }
      })
      .catch(function (error) {
        console.log("errorrr.... ", error);
        toast.error(
          error?.response?.data?.error ||
          "Error in submitting form. Please try again"
        );
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  const getApplicationDetail = () => {
    setisLoading(true);
    AxiosInterceptors.get(
      `${api_fetchProcurementDetById}/${props?.bidderData?.reference_no}`,
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status) {
          setapplicationFullData(response?.data?.data);
          setisLoading(false);
        } else {
          setisLoading(false);
          toast.error(response?.data?.message);
        }
      })
      .catch(function (error) {
        toast.error("Error while fetching data");
        console.log("details by id error...", error);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  useEffect(() => {
    getApplicationDetail();
  }, []);

  const getBidder = (id) => {
    setisLoading(true);
    AxiosInterceptors.get(
      `${api_getBidderById}/${id}`,
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status) {
          console.log(response?.data?.data, 'ababababa')
          setInitialValues(response?.data?.data)
          setisLoading(false);
        } else {
          setisLoading(false);
          toast.error(response?.data?.message);
        }
      })
      .catch(function (error) {
        toast.error("Error while fetching data");
        console.log("details by id error...", error);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  useEffect(() => {
    if (applicationFullData?.boq?.bid_details?.bidder_master?.length !== 0 && applicationFullData?.boq?.bid_details?.bidder_master?.length >= tabNo) {
      getBidder(applicationFullData?.boq?.bid_details?.bidder_master[tabNo - 1]?.id)
    } else {
      setInitialValues(emptyinitialValues)
    }
  }, [applicationFullData])


  // console.log(props?.tabNo)
  return (
    <>
      {isLoading && <LoaderApi />}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={(values) => {
          submitBiddigData(values);
        }}
      >
        {({ values, handleChange, errors, touched, setFieldValue }) => (
          <Form>
            <>
              <div className='p-7 mb-6 bg-white shadow-xl border border-gray-200 rounded-md grid grid-cols-2'>
                <div className=''>
                  <label
                    for='default-input'
                    className={`block mb-2 text-sm font-medium text-gray-900`}
                  >
                    Bidder Name
                    <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='text'
                    className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2.5 '
                    placeholder='Bidder Name'
                    name='name'
                    onChange={handleChange}
                    value={values.name}
                  />
                  {errors.name && touched.name ? (
                    <p className='text-red-400 text-xs'>{errors.name}</p>
                  ) : null}
                </div>

                <div className=''>
                  <label
                    for='default-input'
                    className={`block mb-2 text-sm font-medium text-gray-900 `}
                  >
                    PAN No
                    <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='text'
                    className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2.5'
                    placeholder='PAN No'
                    name='pan_no'
                    onChange={(e) => {
                      if (e.target.value.length <= 10) {
                        handleChange(e);
                      }
                    }}
                    value={values.pan_no}
                  />
                  {errors.pan_no && touched.pan_no ? (
                    <p className='text-red-400 text-xs'>{errors.pan_no}</p>
                  ) : null}
                </div>

                <div className=''>
                  <label
                    for='default-input'
                    className={`block mb-2 text-sm font-medium text-gray-900 mt-5 `}
                  >
                    GST No
                    <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='text'
                    className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2.5'
                    placeholder='GST No'
                    name='gst_no'
                    onChange={(e) => {
                      if (e.target.value.length <= 15) {
                        handleChange(e);
                      }
                    }}
                    value={values.gst_no}
                  />
                </div>

                <div className=''>
                  <label
                    for='default-input'
                    className={`block mb-2 text-sm font-medium text-gray-900 mt-5 `}
                  >
                    address
                    <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='text'
                    className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2.5'
                    placeholder='address'
                    name='address'
                    onChange={handleChange}
                    value={values.address}
                  />
                  {errors.address && touched.address ? (
                    <p className='text-red-400 text-xs'>{errors.address}</p>
                  ) : null}
                </div>

                <div className=''>
                  <label
                    for='default-input'
                    className={`block mb-2 text-sm font-medium text-gray-900 mt-5 `}
                  >
                    Bank Name
                    <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='text'
                    className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2.5'
                    placeholder='Bank Name'
                    name='bank'
                    onChange={handleChange}
                    value={values.bank}
                  />
                  {errors.bank && touched.bank ? (
                    <p className='text-red-400 text-xs'>{errors.bank}</p>
                  ) : null}
                </div>

                <div className=''>
                  <label
                    for='default-input'
                    className={`block mb-2 text-sm font-medium text-gray-900 mt-5`}
                  >
                    Bank Account No
                    <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='number'
                    className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2.5'
                    placeholder='Bank Account No'
                    name='account_no'
                    onChange={handleChange}
                    value={values.account_no}
                  />
                  {errors.account_no && touched.account_no ? (
                    <p className='text-red-400 text-xs'>{errors.account_no}</p>
                  ) : null}
                </div>

                <div className=''>
                  <label
                    for='default-input'
                    className={`block mb-2 text-sm font-medium text-gray-900 mt-5`}
                  >
                    IFSC Code
                    <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='text'
                    className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2.5'
                    placeholder='IFSC Code'
                    name='ifsc'
                    onChange={(e) => {
                      if (e.target.value.length <= 11) {
                        handleChange(e);
                      }
                    }}
                    value={values.ifsc}
                  />
                  {errors.ifsc && touched.ifsc ? (
                    <p className='text-red-400 text-xs'>{errors.ifsc}</p>
                  ) : null}
                </div>

                {props?.bidderData?.bid_type == "technical" && (
                  <div className=''>
                    <label
                      for='default-input'
                      className={`block mb-2 text-sm font-medium text-gray-900 mt-5`}
                    >
                      Bidding Amount
                      <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='text'
                      className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2.5'
                      placeholder='Bidding Amount'
                      name='bidding_amount'
                      onChange={handleChange}
                      value={values.bidding_amount}
                    />
                    {errors.bidding_amount && touched.bidding_amount ? (
                      <p className='text-red-400 text-xs'>
                        {errors.bidding_amount}
                      </p>
                    ) : null}
                  </div>
                )}
              </div>

              <div className='p-7 mb-6 bg-white shadow-xl border border-gray-200 rounded-md flex '>
                <div className='border-r-2'>
                  <RadioButtonsGroup
                    fields={emdConfirmation}
                    title={"EMD"}
                    name={"emd"}
                    values={values.emd}
                    handleChange={handleChange}
                    errors={errors.emd}
                    touched={touched.emd}
                    setFieldValue={setFieldValue}
                  />
                </div>

                {values?.emd == "yes" && (
                  <>
                    <div className='border-r-2 px-2'>
                      <RadioButtonsGroup
                        fields={transc}
                        title={"Transaction Mode"}
                        name={"payment_mode"}
                        values={values.payment_mode}
                        handleChange={handleChange}
                        errors={errors.payment_mode}
                        touched={touched.payment_mode}
                        setFieldValue={setFieldValue}
                      />
                    </div>

                    {values?.payment_mode == "offline" ? (
                      <>
                        <div className='border-r-2 px-2'>
                          <RadioButtonsGroup
                            fields={transcMode}
                            title={"Transaction"}
                            name={"offline_mode"}
                            values={values.offline_mode}
                            handleChange={handleChange}
                            errors={errors.offline_mode}
                            touched={touched.offline_mode}
                            setFieldValue={setFieldValue}
                          />
                        </div>

                        {values?.offline_mode == "dd" && (
                          <>
                            <div className='border-r-2 px-2'>
                              <label
                                for='default-input'
                                className={`block mb-2 text-sm font-medium text-gray-900`}
                              >
                                DD/Instrument Number
                                <span className='text-red-500'>*</span>
                              </label>
                              <input
                                type='text'
                                className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 '
                                placeholder='DD Number'
                                name='dd_no'
                                onChange={handleChange}
                                value={values.dd_no}
                              />
                              {errors.dd_no && touched.dd_no ? (
                                <p className='text-red-400 text-xs'>
                                  {errors.dd_no}
                                </p>
                              ) : null}
                            </div>
                            <div className='border-r-2 px-2'>
                              <label
                                for='default-input'
                                className={`block mb-2 text-sm font-medium text-gray-900`}
                              >
                                Date of DD
                                <span className='text-red-500'>*</span>
                              </label>
                              <input
                                type='text'
                                className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 '
                                placeholder='DD Number'
                                name='dd_date'
                                onChange={handleChange}
                                value={values.dd_date}
                              />
                              {errors.dd_date && touched.dd_date ? (
                                <p className='text-red-400 text-xs'>
                                  {errors.dd_date}
                                </p>
                              ) : null}
                            </div>
                            <div className='border-r-2 px-2'>
                              <label
                                for='default-input'
                                className={`block mb-2 text-sm font-medium text-gray-900`}
                              >
                                Bank of DD
                                <span className='text-red-500'>*</span>
                              </label>
                              <input
                                type='text'
                                className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 '
                                placeholder='DD Bank'
                                name='dd_bank'
                                onChange={handleChange}
                                value={values.dd_bank}
                              />
                              {errors.dd_bank && touched.dd_bank ? (
                                <p className='text-red-400 text-xs'>
                                  {errors.dd_bank}
                                </p>
                              ) : null}
                            </div>
                          </>
                        )}
                        {values?.offline_mode == "bg" && (
                          <>
                            <div className='border-r-2 px-2'>
                              <label
                                for='default-input'
                                className={`block mb-2 text-sm font-medium text-gray-900`}
                              >
                                Transaction/Instrument Number
                                <span className='text-red-500'>*</span>
                              </label>
                              <input
                                type='text'
                                className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 '
                                placeholder='Transaction Number'
                                name='bg_no'
                                onChange={handleChange}
                                value={values.bg_no}
                              />
                              {errors.bg_no && touched.bg_no ? (
                                <p className='text-red-400 text-xs'>
                                  {errors.bg_no}
                                </p>
                              ) : null}
                            </div>
                            <div className='border-r-2 px-2'>
                              <label
                                for='default-input'
                                className={`block mb-2 text-sm font-medium text-gray-900`}
                              >
                                Date of BG
                                <span className='text-red-500'>*</span>
                              </label>
                              <input
                                type='text'
                                className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 '
                                placeholder='Transaction Number'
                                name='bg_date'
                                onChange={handleChange}
                                value={values.bg_date}
                              />
                              {errors.bg_date && touched.bg_date ? (
                                <p className='text-red-400 text-xs'>
                                  {errors.bg_date}
                                </p>
                              ) : null}
                            </div>
                            <div className='border-r-2 px-2'>
                              <label
                                for='default-input'
                                className={`block mb-2 text-sm font-medium text-gray-900`}
                              >
                                Bank of BG
                                <span className='text-red-500'>*</span>
                              </label>
                              <input
                                type='text'
                                className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 '
                                placeholder='Transaction Number'
                                name='bg_bank'
                                onChange={handleChange}
                                value={values.bg_bank}
                              />
                              {errors.bg_bank && touched.bg_bank ? (
                                <p className='text-red-400 text-xs'>
                                  {errors.bg_bank}
                                </p>
                              ) : null}
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <div className='border-r-2 px-2'>
                        <label
                          for='default-input'
                          className={`block mb-2 text-sm font-medium text-gray-900`}
                        >
                          Transaction Number
                          <span className='text-red-500'>*</span>
                        </label>
                        <input
                          type='text'
                          className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 '
                          placeholder='Transaction Number'
                          name='transaction_no'
                          onChange={handleChange}
                          value={values.transaction_no}
                        />
                        {errors.transaction_no && touched.transaction_no ? (
                          <p className='text-red-400 text-xs'>
                            {errors.transaction_no}
                          </p>
                        ) : null}
                      </div>
                    )}
                  </>
                )}

                {/* <div className=" px-2">
                  <div className="">
                    <h1
                      className={`block mb-2 text-sm font-medium text-gray-900`}
                    >
                      Upload Referance Document
                    </h1>
                  </div>
                  <div className="">
                    <button className="bg-[#4338ca] px-4 py-2 text-white rounded-md text-xs">
                      Upload Documment
                    </button>
                  </div>
                </div> */}
                {values?.emd == "yes" && (
                  <div className='flex justify-end gap-3 '>
                    <div className='w-[40%] px-2'>
                      <ImageDisplay
                        url={basicDetailData?.doc[0]?.docUrl}
                        preview={preview}
                        imageDoc={imageDoc}
                        alt={"uploaded document"}
                        showPreview={"hidden"}
                        width={"[50px]"}
                      />
                    </div>

                    <div className=''>
                      <FileButton
                        bg={"[#4338CA]"}
                        hoverBg={"bg-indigo-300"}
                        btnLabel={"Upload Reference Document"}
                        imgRef={inputFileRef}
                        setImageDoc={setImageDoc}
                        setPreview={setPreview}
                        textColor={"white"}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className='mt-8 '>
                {/* technical creteria */}
                {props?.bidderData?.techCriteria?.length > 0 && (
                  <Accordion defaultExpanded>
                    <AccordionSummary
                      style={{
                        backgroundColor: "#4338CA",
                        color: "white",
                        borderRadius: "5px",
                      }}
                      expandIcon={<ExpandMoreIcon className='text-white' />}
                      aria-controls='panel1-content'
                      id='panel1-header'
                    >
                      Technical Comparison
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className='relative overflow-x-auto'>
                        {props?.bidderData?.techCriteria.map((data, index) => (
                          <div
                            className='border border-gray-300 rounded-xl flex m-5'
                            key={index}
                          >
                            <div className='w-[7%] flex items-center'>
                              <img
                                src={icon}
                                alt=''
                                className='max-w-none h-10 ml-5'
                              />
                            </div>

                            <div className='p-3 w-[75%]'>
                              <div className='flex space-x-[6.2rem]'>
                                <h1 className=' text-base'>{data.heading} </h1>
                              </div>
                              <div className='flex space-x-[5rem]'>
                                <h1 className=' text-sm'>
                                  {data.description}{" "}
                                </h1>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className='flex justify-start gap-3 '>
                        <div className='w-[100%] ml-10'>
                          <ImageDisplay
                            url={basicDetailData?.doc[0]?.docUrl}
                            preview={techPreview}
                            imageDoc={techImageDoc}
                            alt={"uploaded Tech document"}
                            showPreview={"hidden"}
                            width={"[50px]"}
                          />
                        </div>

                        <div className=''>
                          <FileButton
                            bg={"[#4338CA]"}
                            hoverBg={"bg-indigo-300"}
                            btnLabel={"Upload Tech Document"}
                            imgRef={inputFileTechRef}
                            setImageDoc={setTechImageDoc}
                            setPreview={setTechPreview}
                            textColor={"white"}
                          />
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                )}{" "}
                <br />
                {/* financial creteria */}
                {props?.bidderData?.finCriteria?.length > 0 && (
                  <Accordion defaultExpanded>
                    <AccordionSummary
                      style={{
                        backgroundColor: "#4338CA",
                        color: "white",
                        borderRadius: "5px",
                      }}
                      expandIcon={<ExpandMoreIcon className='text-white' />}
                      aria-controls='panel1-content'
                      id='panel1-header'
                    >
                      Financial Comparison
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className='relative overflow-x-auto'>
                        {props?.bidderData?.finCriteria.map((data) => (
                          <div className='border border-gray-300 rounded-xl flex m-5'>
                            <div className='w-[7%] flex items-center'>
                              <img
                                src={icon}
                                alt=''
                                className='max-w-none h-10 ml-5'
                              />
                            </div>

                            <div className='p-3 w-[75%]'>
                              <div className='flex space-x-[6.2rem]'>
                                <h1 className=' text-base'>{data.heading} </h1>
                              </div>
                              <div className='flex space-x-[5rem]'>
                                <h1 className=' text-sm'>
                                  {data.description}{" "}
                                </h1>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className='flex justify-end gap-3 '>
                        <div className='w-[100%] ml-10'>
                          <ImageDisplay
                            url={basicDetailData?.doc[0]?.docUrl}
                            preview={fincPreview}
                            imageDoc={fincImageDoc}
                            alt={"uploaded document"}
                            showPreview={"hidden"}
                            width={"[50px]"}
                          />
                        </div>

                        <div className=''>
                          <FileButton
                            bg={"[#4338CA]"}
                            hoverBg={"bg-indigo-300"}
                            btnLabel={"Upload Finc Document"}
                            imgRef={inputFileFincRef}
                            setImageDoc={setFincImageDoc}
                            setPreview={setFincPreview}
                            textColor={"white"}
                          />
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                )}
              </div>

              <TenderFormButton
                resetForm={"resetForm"}
                getDetailData={"basicDetailData"}
              // loading={isLoading}
              />
            </>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default BiddingDetailForm;
