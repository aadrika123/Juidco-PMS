import React, { useRef, useState } from "react";
import fd from "@/Components/assets/fd.svg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import TenderFormButton from "@/Components/Common/TenderFormButton/TenderFormButton";
import { useNavigate } from "react-router-dom";

const CriticalDateForm = () => {
  const inputFileRef = useRef();

  const [selectedTab, setSelectedTab] = useState("online");
  const [preview, setPreview] = useState();
  const [imageDoc, setImageDoc] = useState();

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
      console.log(file.size, "=========file size");
      // props?.setImageDoc(file);
      console.log(file, "==========file");
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

  const initialValues = {
    publishingDate: "",
    bidOpeningDate: "",
    docSaleStartDate: "",
    docSaleEndDate: "",
    seekClariStrtDate: "",
    seekClariEndDate: "",
    bidSubStrtDate: "",
    bidSubEndDate: "",
    preBidMettingDate: "",
  };

  //   const handleChange = (date) => {
  //     setFieldValue('bidOpeningDate', date);
  //     setFieldValue('publishingDate', date);
  //     setFieldValue('docSaleStartDate', date);
  //     setFieldValue('docSaleEndDate', date);
  //     setFieldValue('seekClariStrtDate', date);
  //     setFieldValue('seekClariEndDate', date);
  //     setFieldValue('bidSubStrtDate', date);
  //     setFieldValue('preBidMettingDate', date);
  // };

  return (
    <>
      {/* <div className='bg-white rounded-xl w-full shadow-md p-4 border border-indigo-200'> */}
      {/* Heading  */}
      <div className='bg-[#4338ca] text-white w-full rounded p-3 flex shadow-xl'>
        <img src={fd} className='pl-2' />
        <h1 className='pt-1 pl-2 text-xl'>Critical Dates</h1>
      </div>

      {/* Form Starting */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateTimePicker"]}>
          <div className=' mt-5 container'>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log("Form values", values);
                navigate(`/tendering?tabNo=${6}`);
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
                    <div className=' container mx-auto capitalize grid grid-cols-2 space-x-4'>
                      <div className='p-7 mb-4 bg-white shadow-xl border border-gray-200 rounded-md grid grid-cols-1 mt-3 space-y-5 '>
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
                                ? dayjs(values.publishingDate)
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

                      <div className='p-7 mb-4 bg-white shadow-xl border border-gray-200 rounded-md grid grid-cols-1 mt-3 space-y-5'>
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

                      <div className='p-7 mb-4 bg-white shadow-xl border border-gray-200 rounded-md grid grid-cols-1 mt-3 space-y-5'>
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

                      <div className='p-7 mb-4 bg-white shadow-xl border border-gray-200 rounded-md grid grid-cols-1 mt-3 space-y-5'>
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

                      <div className='p-7 mb-4 bg-white shadow-xl border border-gray-200 rounded-md grid grid-cols-1 col-span-2 mt-3 space-y-5'>
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

                    <TenderFormButton resetForm={resetForm} />

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
