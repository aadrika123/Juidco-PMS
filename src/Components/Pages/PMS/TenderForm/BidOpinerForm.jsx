import React, { useEffect, useRef, useState } from "react";
import bo from "@/Components/assets/bo.svg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomCheckboxGroup from "@/Components/Common/FormMolecules/CustomCheckboxGroup";
import RadioButtonsGroup from "@/Components/Common/FormMolecules/RadioButtonsGroup";
import toast from "react-hot-toast";
import FileButton from "@/Components/Common/FileButtonUpload/FileButton";
import ImageDisplay from "@/Components/Common/FileButtonUpload/ImageDisplay";

const BidOpinerForm = () => {
  const inputFileRef = useRef();

  const [selectedTab, setSelectedTab] = useState("online");
  const [preview, setPreview] = useState();
  const [imageDoc, setImageDoc] = useState();
  const [bidOpinersList, setBidOpinersList] = useState();
  const [bidOpinersDoc, setBidOpinersDoc] = useState();

  const handleTabChange = (event) => {
    setSelectedTab(event.target.value);
  };

  const handleUploadDoc = () => {
    inputFileRef.current.click();
  };

  const deadStockRef = useRef();

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

  useEffect(() => {
    setBidOpinersList(bidOpiner);
    setBidOpinersDoc(bidOpinerDocs);
  });

  const bidOpiner = [
    {
      label_name: "Name/Designation",
      name: "name",
      label_email: "Email",
      name: "email",
    },
    {
      label_name: "Name/Designation",
      name: "name",
      label_email: "Email",
      name: "email",
    },
    {
      label_name: "Name/Designation",
      name: "name",
      label_email: "Email",
      name: "email",
    },
  ];

  const bidOpinerDocs = [
    {
      label_name: "Name/Designation",
      name: "name",
      label_email: "Email",
      name: "email",
    },
    {
      label_name: "Name/Designation",
      name: "name",
      label_email: "Email",
      name: "email",
    },
  ];

  return (
    <>
      {/* <div className='bg-white rounded-xl w-full shadow-md p-4 border border-indigo-200'> */}
      {/* Heading  */}
      <div className="bg-[#4338ca] text-white w-full rounded p-3 flex shadow-xl">
        <img src={bo} className="pl-2" />
        <h1 className="pt-1 pl-2 text-xl">
          Bid Openers Selection : (Minimum 02 or Maximum 03)
        </h1>
      </div>

      {/* Form Starting */}

      <div className=" mt-5 container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Form values", values);
          }}
        >
          {({ values, handleChange, errors, touched }) => (
            <Form >

              <>
                <div className=" container mx-auto capitalize grid grid-cols-1">
                  {bidOpinersList?.map((obj, index) => (
                    <div className="mb-4 bg-white shadow-xl border border-gray-200 rounded-md flex mt-3 w-full">
                      <div className="p-10 w-12 flex items-center shadow-xl justify-center bg-gray-300 rounded">
                        B0{index + 1}
                      </div>

                      <div className=" w-full p-4 flex gap-3">
                        <div className="w-full p-3">
                          <label
                            for="default-input"
                            className="block mb-2 text-sm font-medium text-gray-900 "
                          >
                            {obj.label_name}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            name={obj.name}
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                            placeholder="Name/Designation"
                          />
                        </div>

                        <div className="w-full p-3">
                          <label
                            for="default-input"
                            className="block mb-2 text-sm font-medium text-gray-900 "
                          >
                            Email ID
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                            placeholder="Email"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="bg-[#4338ca] text-white w-full rounded p-3 shadow-xl mb-5">
                    
                    <h1 className="pt-1 pl-2 text-xl">
                      Uploading the tender documents
                    </h1>
                    <p className="text-[11px] pl-3 font-light">
                      {" "}
                      (Only PDF,JPG,XLS & RAR Files Allowed)*
                    </p>
                  </div>

                  {bidOpinersDoc?.map((obj, index) => (
                    <div className="mb-4 bg-white shadow-xl border border-gray-200 rounded-md flex  w-full">
                      <div className="p-10 w-12 flex items-center shadow-xl justify-center bg-gray-300 rounded">
                        B0{index + 1}
                      </div>

                      <div className=" w-2/3 p-4 gap-3">
                        <div className="w-full p-3">
                          <label
                            for="default-input"
                            className="block mb-2 text-sm font-medium text-gray-900 "
                          >
                            {obj.label_name}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            name={obj.name}
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                            placeholder="Name/Designation"
                          />
                        </div>

                        <div className="w-full p-3">
                          <label
                            for="default-input"
                            className="block mb-2 text-sm font-medium text-gray-900 "
                          >
                            {obj.label_email}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            name={obj.email}
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                            placeholder="Email"
                          />
                        </div>
                      </div>

                      <div className="w-1/3 mt-4 mr-5 mb-5">
                        <div className="w-full p-3">
                          <label
                            for="default-input"
                            className="block mb-2 text-sm font-medium text-gray-900 "
                          >
                            Document Size (kb)
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            name=""
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                            placeholder=""
                          />
                        </div>

                        <div className="w-full flex flex-col justify-center items-center border-[3px] rounded border-dotted p-8 ">
                          
                          <div className="w-[10rem]">
                            <ImageDisplay
                              preview={preview}
                              imageDoc={imageDoc}
                              alt={"Dead Stock Image"}
                              showPreview={"hidden"}
                              // disabled
                              width={["10px"]}
                            />
                          </div>
                          <div className="">
                            <FileButton
                              btnLabel={"Upload Reference Image"}
                              bg={"[#4338CA]"}
                              textColor={"white"}
                              imgRef={deadStockRef}
                              hoverBg={"bg-blue-800"}
                              setImageDoc={setImageDoc}
                              setPreview={setPreview}
                              paddingY={"[30px]"}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}


                  <div className="mb-5">
                    <button
                      className="bg-[#4338CA] mt-5 py-2 px-4 text-sm text-white rounded hover:bg-white hover:text-[#4338ca] border hover:border-[#4338ca] flex float-left"
                      onClick="##"
                    >
                      Back
                    </button>

                    <button
                      className="bg-[#4338CA] mt-5 py-2 px-4 text-sm text-white rounded hover:bg-white hover:text-[#4338ca] border border-[#4338ca] flex float-right animate-pulse"
                      onClick="##"
                    >
                      Save & Next
                    </button>

                    <button
                      className="bg-white mt-5 py-2 px-4 text-sm text-black rounded hover:bg-[#4338CA] hover:text-white border border-[#4338ca] mr-5 flex float-right"
                      onClick="##"
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

export default BidOpinerForm;