import RadioButtonsGroup from "@/Components/Common/FormMolecules/RadioButtonsGroup";
import React, { useRef, useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import icon from "@/Components/assets/FeaturedIcon.svg";
import { Description } from "@mui/icons-material";
import TenderFormButton from "@/Components/Common/TenderFormButton/TenderFormButton";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import ImageDisplay from "@/Components/Common/FileButtonUpload/ImageDisplay";
import FileButton from "@/Components/Common/FileButtonUpload/FileButton";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ApiHeader2 from "@/Components/api/ApiHeader2";
import ProjectApiList from "@/Components/api/ProjectApiList";
import toast from "react-hot-toast";
import LoaderApi from "@/Components/Common/Loaders/LoaderApi";

const BiddingDetailForm = (props) => {
  const { api_addBidder } = ProjectApiList();

  const navigate = useNavigate();

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

  console.log(props?.bidderData);

  const emdConfirmation = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];

  const transc = [
    { label: "Online", value: "online" },
    { label: "Offline", value: "offline" },
  ];

  const transcMode = [
    { label: "Cash", value: "cash" },
    { label: "DD", value: "dd" },
  ];

  const initialValues = {
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
    emd: "no",
    payment_mode: "online",
    dd_no: "",
    offline_mode: "cash",
    transaction_no: "",
  };

  const submitBiddigData = (data) => {
    setisLoading(true);
    // setConfirmationModal(false);
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
          toast(response?.data?.message, "error");
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

  // console.log(props?.tabNo)
  return (
    <>
      {isLoading && <LoaderApi />}

      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={(values, { resetForm }) => {
          submitBiddigData(values);

          // props?.bidderData?.bidder_master?.length <=
          // props?.bidderData?.no_of_bidders
          //   ? submitBiddigData(values)
          //   : navigate(`/bidding-type?tabNo=1`);

          console.log(
            "bidder",
            values,
            ",emd_doc:",
            imageDoc?.name,
            ",tech_doc:",
            techImageDoc?.name,
            ",fin_doc:",
            fincImageDoc?.name
          );
          // navigate(`/bidding-details?tabNo=${2}`);
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
                    onChange={handleChange}
                    value={values.pan_no}
                  />
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
                    onChange={handleChange}
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
                    onChange={handleChange}
                    value={values.ifsc}
                  />
                </div>

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
                </div>
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
                    <div className='border-r-2 ml-10'>
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
                        <div className='border-r-2 ml-10'>
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
                          <div className='border-r-2 ml-10'>
                            <label
                              for='default-input'
                              className={`block mb-2 text-sm font-medium text-gray-900`}
                            >
                              DD Number
                              <span className='text-red-500'>*</span>
                            </label>
                            <input
                              type='text'
                              className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2.5 '
                              placeholder='DD Nuber'
                              name='dd_no'
                              onChange={handleChange}
                              value={values.dd_no}
                            />
                          </div>
                        )}
                      </>
                    ) : (
                      <div className='border-r-2 ml-10'>
                        <label
                          for='default-input'
                          className={`block mb-2 text-sm font-medium text-gray-900`}
                        >
                          Transaction Number
                          <span className='text-red-500'>*</span>
                        </label>
                        <input
                          type='text'
                          className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2.5 '
                          placeholder='Transaction Number'
                          name='transaction_no'
                          onChange={handleChange}
                          value={values.transaction_no}
                        />
                      </div>
                    )}
                  </>
                )}

                {/* <div className=" ml-10">
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

                <div className='flex justify-end gap-3 '>
                  <div className='w-[40%] ml-10'>
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
                      btnLabel={"Upload Referance Document"}
                      imgRef={inputFileRef}
                      setImageDoc={setImageDoc}
                      setPreview={setPreview}
                      textColor={"white"}
                    />
                  </div>
                </div>
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
                        {props?.bidderData?.techCriteria.map((data) => (
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
                        <div className='w-[40%] ml-10'>
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
                        <div className='w-[40%] ml-10'>
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
