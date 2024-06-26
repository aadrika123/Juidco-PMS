import React, { useEffect, useRef, useState } from "react";
import fd from "@/Components/assets/fd.svg";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import TenderFormButton from "@/Components/Common/TenderFormButton/TenderFormButton";
import { useLocation, useNavigate } from "react-router-dom";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ApiHeader from "@/Components/api/ApiHeader";
import ProjectApiList from "@/Components/api/ProjectApiList";

const CriticalDateForm = () => {
  const inputFileRef = useRef();

  const { api_postCriticalDatesDetails, api_getCriticalDatesDetails } =
    ProjectApiList();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("online");
  const [preview, setPreview] = useState();
  const [imageDoc, setImageDoc] = useState();
  const [referenceNo, setReferenceNo] = useState();
  const [criticalDateData, setCriticalDateData] = useState();

  const navigate = useNavigate();

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
    publishingDate: Yup.string().required(),
    bidOpeningDate: Yup.string().required(),
    docSaleStartDate: Yup.string().required(),
    docSaleEndDate: Yup.string().required(),
    seekClariStrtDate: Yup.string().required(),
    seekClariEndDate: Yup.string().required(),
    bidSubStrtDate: Yup.string().required(),
    bidSubEndDate: Yup.string().required(),
    preBidMettingDate: Yup.string().required(),
  });

  // 2022-04-17T15:30
  console.log(criticalDateData);

  const initialValues = {
    reference_no: "",
    publishingDate: criticalDateData?.publishingDate || "",
    bidOpeningDate: criticalDateData?.bidOpeningDate || "",
    docSaleStartDate: criticalDateData?.docSaleStartDate || "",
    docSaleEndDate: criticalDateData?.docSaleEndDate || "",
    seekClariStrtDate: criticalDateData?.seekClariStrtDate || "",
    seekClariEndDate: criticalDateData?.seekClariEndDate || "",
    bidSubStrtDate: criticalDateData?.bidSubStrtDate || "",
    bidSubEndDate: criticalDateData?.bidSubEndDate || "",
    preBidMettingDate: criticalDateData?.preBidMettingDate || "",
  };

  // submit form
  const submitForm = async (values) => {
    setIsLoading(true);
    values = { ...values, reference_no: referenceNo };
    AxiosInterceptors.post(
      api_postCriticalDatesDetails,
      { preTender: JSON.stringify(values) },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status) {
          toast.success("Critical Date Details Data Submitted successfully");
          navigate(`/tendering?tabNo=${6}`);
        } else {
          // toast.error("Error in Forwarding to DA. Please try again");
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

    AxiosInterceptors.get(
      `${api_getCriticalDatesDetails}/${refNo}`,
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status) {
          setCriticalDateData(response?.data?.data);
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
      <div className='bg-[#4338ca] text-white w-full rounded p-3 flex shadow-xl mb-3'>
        <img src={fd} className='pl-2' />
        <h1 className='pt-1 pl-2 text-xl'>Critical Dates</h1>
      </div>

      {/* Form Starting */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateTimePicker"]}>
          <div
            className={`mt-5 container  ${
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
                setFieldValue,
                resetForm,
              }) => (
                <Form>
                  <>
                    <div className='grid grid-cols-2 container mx-auto capitalize'>
                      <div className='p-8 space-y-5 mr-4 mb-6 bg-white shadow-xl border border-gray-200 rounded-md'>
                        <div className=''>
                          <label
                            for='default-input'
                            className={`block mb-2 text-sm font-medium text-gray-900 ${
                              errors.publishingDate &&
                              touched.publishingDate &&
                              "text-red-500"
                            }`}
                          >
                            Publishing Date
                            <span className='text-red-500'>*</span>
                          </label>
                          <DateTimePicker
                            className='w-3/4'
                            name='publishingDate'
                            onChange={(value) => {
                              const dateTime = value.format();
                              setFieldValue("publishingDate", dateTime);
                            }}
                            value={
                              values.publishingDate
                                ? dayjs(
                                    new Date(
                                      values?.publishingDate
                                    ).toISOString()
                                  )
                                : null
                            }
                          />
                        </div>

                        <div className=''>
                          <label
                            for='default-input'
                            className={`block mb-2 text-sm font-medium text-gray-900 ${
                              errors.bidOpeningDate &&
                              touched.bidOpeningDate &&
                              "text-red-500"
                            }`}
                          >
                            Bid Opening Date
                            <span className='text-red-500'>*</span>
                          </label>
                          <DateTimePicker
                            className='w-3/4'
                            name='bidOpeningDate'
                            onChange={(value) => {
                              const dateTime = value.format();
                              setFieldValue("bidOpeningDate", dateTime);
                            }}
                            value={
                              values.bidOpeningDate
                                ? dayjs(values.bidOpeningDate)
                                : null
                            }
                          />
                        </div>
                      </div>

                      <div className='p-8 space-y-5 mr-4 mb-6 bg-white shadow-xl border border-gray-200 rounded-md'>
                        <div className=''>
                          <label
                            for='default-input'
                            className={`block mb-2 text-sm font-medium text-gray-900 ${
                              errors.docSaleStartDate &&
                              touched.docSaleStartDate &&
                              "text-red-500"
                            }`}
                          >
                            Document Sale Start Date
                            <span className='text-red-500'>*</span>
                          </label>
                          <DateTimePicker
                            className='w-3/4'
                            name='docSaleStartDate'
                            onChange={(value) => {
                              const dateTime = value.format();
                              setFieldValue("docSaleStartDate", dateTime);
                            }}
                            value={
                              values.docSaleStartDate
                                ? dayjs(values.docSaleStartDate)
                                : null
                            }
                          />
                        </div>

                        <div className=''>
                          <label
                            for='default-input'
                            className={`block mb-2 text-sm font-medium text-gray-900 ${
                              errors.docSaleEndDate &&
                              touched.docSaleEndDate &&
                              "text-red-500"
                            }`}
                          >
                            Document Sale End Date
                            <span className='text-red-500'>*</span>
                          </label>
                          <DateTimePicker
                            className='w-3/4'
                            name='docSaleEndDate'
                            onChange={(value) => {
                              const dateTime = value.format();
                              setFieldValue("docSaleEndDate", dateTime);
                            }}
                            value={
                              values.docSaleEndDate
                                ? dayjs(values.docSaleEndDate)
                                : null
                            }
                          />
                        </div>
                      </div>

                      <div className='p-8 space-y-5 mr-4 mb-6 bg-white shadow-xl border border-gray-200 rounded-md'>
                        <div className=''>
                          <label
                            for='default-input'
                            className={`block mb-2 text-sm font-medium text-gray-900 ${
                              errors.seekClariStrtDate &&
                              touched.seekClariStrtDate &&
                              "text-red-500"
                            }`}
                          >
                            Seek Clarification Start Date
                            <span className='text-red-500'>*</span>
                          </label>
                          <DateTimePicker
                            className='w-3/4'
                            name='seekClariStrtDate'
                            onChange={(value) => {
                              const dateTime = value.format();
                              setFieldValue("seekClariStrtDate", dateTime);
                            }}
                            value={
                              values.seekClariStrtDate
                                ? dayjs(values.seekClariStrtDate)
                                : null
                            }
                          />
                        </div>

                        <div className=''>
                          <label
                            for='default-input'
                            className={`block mb-2 text-sm font-medium text-gray-900 ${
                              errors.seekClariEndDate &&
                              touched.seekClariEndDate &&
                              "text-red-500"
                            }`}
                          >
                            Seek Clarification End Date
                            <span className='text-red-500'>*</span>
                          </label>
                          <DateTimePicker
                            className='w-3/4'
                            name='seekClariEndDate'
                            onChange={(value) => {
                              const dateTime = value.format();
                              setFieldValue("seekClariEndDate", dateTime);
                            }}
                            value={
                              values.seekClariEndDate
                                ? dayjs(values.seekClariEndDate)
                                : null
                            }
                          />
                        </div>
                      </div>

                      <div className='p-8 space-y-5 mr-4 mb-6 bg-white shadow-xl border border-gray-200 rounded-md'>
                        <div className=''>
                          <label
                            for='default-input'
                            className={`block mb-2 text-sm font-medium text-gray-900 ${
                              errors.bidSubStrtDate &&
                              touched.bidSubStrtDate &&
                              "text-red-500"
                            }`}
                          >
                            Bid Submission Start Date
                            <span className='text-red-500'>*</span>
                          </label>
                          <DateTimePicker
                            className='w-3/4'
                            name='bidSubStrtDate'
                            onChange={(value) => {
                              const dateTime = value.format();
                              setFieldValue("bidSubStrtDate", dateTime);
                            }}
                            value={
                              values.bidSubStrtDate
                                ? dayjs(values.bidSubStrtDate)
                                : null
                            }
                          />
                        </div>

                        <div className=''>
                          <label
                            for='default-input'
                            className={`block mb-2 text-sm font-medium text-gray-900 ${
                              errors.bidSubEndDate &&
                              touched.bidSubEndDate &&
                              "text-red-500"
                            }`}
                          >
                            Bid Submission End Date
                            <span className='text-red-500'>*</span>
                          </label>
                          <DateTimePicker
                            className='w-3/4'
                            name='bidSubEndDate'
                            onChange={(value) => {
                              const dateTime = value.format();
                              setFieldValue("bidSubEndDate", dateTime);
                            }}
                            value={
                              values.bidSubEndDate
                                ? dayjs(values.bidSubEndDate)
                                : null
                            }
                          />
                        </div>
                      </div>

                      <div className='p-8 space-y-5 mr-4 mb-6 bg-white shadow-xl border border-gray-200 rounded-md col-span-2'>
                        <div className=''>
                          <label
                            for='default-input'
                            className={`block mb-2 text-sm font-medium text-gray-900 ${
                              errors.preBidMettingDate &&
                              touched.preBidMettingDate &&
                              "text-red-500"
                            }`}
                          >
                            Pre Bid Meeting Date
                            <span className='text-red-500'>*</span>
                          </label>
                          <DateTimePicker
                            className='w-3/4'
                            name='preBidMettingDate'
                            onChange={(value) => {
                              const dateTime = value.format();
                              setFieldValue("preBidMettingDate", dateTime);
                            }}
                            value={
                              values.preBidMettingDate
                                ? dayjs(values.preBidMettingDate)
                                : null
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <TenderFormButton
                      resetForm={resetForm}
                      getDetailData={criticalDateData}
                    />

                    {/* <div className="mb-5">
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
                  </>
                </Form>
              )}
            </Formik>
          </div>
        </DemoContainer>
      </LocalizationProvider>
    </>
  );
};

export default CriticalDateForm;
