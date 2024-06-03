import React, { useRef, useState } from "react";
import fd from "@/Components/assets/fd.svg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomCheckboxGroup from "@/Components/Common/FormMolecules/CustomCheckboxGroup";
import RadioButtonsGroup from "@/Components/Common/FormMolecules/RadioButtonsGroup";
import toast from "react-hot-toast";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const CriticalDateForm = () => {
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
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];

  const emdExemption = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
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
      {/* <div className='bg-white rounded-xl w-full shadow-md p-4 border border-indigo-200'> */}
      {/* Heading  */}
      <div className="bg-[#4338ca] text-white w-full rounded p-3 flex shadow-xl">
        <img src={fd} className="pl-2" />
        <h1 className="pt-1 pl-2 text-xl">Critical Dates</h1>
      </div>

      {/* Form Starting */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateTimePicker"]}>
          <div className=" mt-5 container">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log("Form values", values);
              }}
            >
              {({ values, handleChange, errors, touched }) => (
                <Form className=" container mx-auto capitalize grid grid-cols-2 space-x-4">

                  <div className="p-7 mb-4 bg-white shadow-xl border border-gray-200 rounded-md grid grid-cols-1 mt-3 ">
                    <div className="">
                      <label
                        for="default-input"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Publishing Date
                        <span className="text-red-500">*</span>
                      </label>
                      <DateTimePicker className="w-3/4" />
                    </div>

                    <div className="">
                      <label
                        for="default-input"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Bid Opening Date
                        <span className="text-red-500">*</span>
                      </label>
                      <DateTimePicker className="w-3/4" />
                    </div>
                  </div>

                  <div className="p-7 mb-4 bg-white shadow-xl border border-gray-200 rounded-md grid grid-cols-1 mt-3">
                    <div className="">
                      <label
                        for="default-input"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Document Sale Start Date
                        <span className="text-red-500">*</span>
                      </label>
                      <DateTimePicker className="w-3/4" />
                    </div>

                    <div className="">
                      <label
                        for="default-input"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Document Sale End Date
                        <span className="text-red-500">*</span>
                      </label>
                      <DateTimePicker className="w-3/4" />
                    </div>
                  </div>

                  <div className="p-7 mb-4 bg-white shadow-xl border border-gray-200 rounded-md grid grid-cols-1 mt-3">
                    <div className="">
                      <label
                        for="default-input"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Seek Clarification Start Date
                        <span className="text-red-500">*</span>
                      </label>
                      <DateTimePicker className="w-3/4" />
                    </div>

                    <div className="">
                      <label
                        for="default-input"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Seek Clarification End Date
                        <span className="text-red-500">*</span>
                      </label>
                      <DateTimePicker className="w-3/4" />
                    </div>
                  </div>
                  
                  
                  <div className="p-7 mb-4 bg-white shadow-xl border border-gray-200 rounded-md grid grid-cols-1 mt-3">
                    <div className="">
                      <label
                        for="default-input"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Bid Submission Start Date
                        <span className="text-red-500">*</span>
                      </label>
                      <DateTimePicker className="w-3/4" />
                    </div>

                    <div className="">
                      <label
                        for="default-input"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Bid Submission End Date
                        <span className="text-red-500">*</span>
                      </label>
                      <DateTimePicker className="w-3/4" />
                    </div>
                  </div>
                  
                  <div className="p-7 mb-4 bg-white shadow-xl border border-gray-200 rounded-md grid grid-cols-1 col-span-2 mt-3">
                    <div className="">
                      <label
                        for="default-input"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Pre Bid Meeting Date
                        <span className="text-red-500">*</span>
                      </label>
                      <DateTimePicker className="w-1/2" />
                    </div>

                  </div>


                </Form>
              )}
            </Formik>
          </div>
        </DemoContainer>
      </LocalizationProvider>

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
          onClick='##'
        >
          Reset
        </button>
      </div>
    </>
  );
};

export default CriticalDateForm;
