import React, { useRef, useState, useEffect } from "react";
import bo from "@/Components/assets/bo.svg";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import TenderFormButton from "@/Components/Common/TenderFormButton/TenderFormButton";
import { useLocation, useNavigate } from "react-router-dom";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ApiHeader2 from "@/Components/api/ApiHeader2";
import ProjectApiList from "@/Components/api/ProjectApiList";
import ApiHeader from "@/Components/api/ApiHeader";
import ImageDisplay from "@/Components/Common/FileButtonUpload/ImageDisplay";

const BidOpinerForm = () => {
  const inputFileRefs = useRef([]);
  const navigate = useNavigate();
  const [preview, setPreview] = useState();
  const [imageDoc, setImageDoc] = useState();
  const [bidOpenerDetails, setBidOpenerDetails] = useState();
  const [referenceNo, setReferenceNo] = useState();
  const [coverDetails, setCoverDetails] = useState({
    preTender: {
      b01NameDesig: "",
      b01Email: "",
      b02NameDesig: "",
      b02Email: "",
    },
    doc: {
      B01: {
        nameDesig: "",
        description: "",
        docSize: "",
      },
      B02: {
        nameDesig: "",
        description: "",
        docSize: "",
      },
    },
    B01: [],
    B02: [],
  });
  const { state } = useLocation();
  const { api_postBidOpenerDetails, api_getBidOpenerDetails } =
    ProjectApiList();

  const validationSchema = Yup.object({
    preTender: Yup.object({
      b01NameDesig: Yup.string().required("Name/Designation is required"),
      b01Email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
      b02NameDesig: Yup.string().required("Name/Designation is required"),
      b02Email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
    }),
    doc: Yup.object({
      B01: Yup.object({
        nameDesig: Yup.string().required("Name/Designation is required"),
        description: Yup.string().required("Description is required"),
        docSize: Yup.string().required("Document size is required"),
      }),
      B02: Yup.object({
        nameDesig: Yup.string().required("Name/Designation is required"),
        description: Yup.string().required("Description is required"),
        docSize: Yup.string().required("Document size is required"),
      }),
    }),
    B01: Yup.array().min(1, "Please upload at least one document for B01"),
    B02: Yup.array().min(1, "Please upload at least one document for B02"),
  });

  const initialValues = {
    preTender: {
      b01NameDesig: bidOpenerDetails?.b01NameDesig,
      b01Email: bidOpenerDetails?.b01Email || "",
      b02NameDesig: bidOpenerDetails?.b02NameDesig || "",
      b02Email: bidOpenerDetails?.b02Email || "",
    },
    doc: {
      B01: {
        nameDesig:
          bidOpenerDetails?.bid_openers_docs?.find(
            (data) => data?.type === "B01"
          )?.nameDesig || "",
        description:
          bidOpenerDetails?.bid_openers_docs?.find(
            (data) => data?.type === "B01"
          )?.description || "",
        docSize:
          bidOpenerDetails?.bid_openers_docs?.find(
            (data) => data?.type === "B01"
          )?.docSize || "",
      },
      B02: {
        nameDesig:
          bidOpenerDetails?.bid_openers_docs?.find(
            (data) => data?.type === "B02"
          )?.nameDesig || "",
        description:
          bidOpenerDetails?.bid_openers_docs?.find(
            (data) => data?.type === "B02"
          )?.description || "",
        docSize:
          bidOpenerDetails?.bid_openers_docs?.find(
            (data) => data?.type === "B02"
          )?.docSize || "",
      },
      B03: {
        nameDesig:
          bidOpenerDetails?.bid_openers_docs?.find(
            (data) => data?.type === "B03"
          )?.nameDesig || "",
        description:
          bidOpenerDetails?.bid_openers_docs?.find(
            (data) => data?.type === "B03"
          )?.description || "",
        docSize:
          bidOpenerDetails?.bid_openers_docs?.find(
            (data) => data?.type === "B03"
          )?.docSize || "",
      },
    },
    B01: [
      bidOpenerDetails?.bid_openers_docs?.find((data) => data?.type === "B01")
        ?.docUrl || "",
    ],
    B02: [
      bidOpenerDetails?.bid_openers_docs?.find((data) => data?.type === "B02")
        ?.docUrl || "",
    ],
  };

  const bidOpiner = [
    {
      label_name: "Name/Designation",
      name1: "b01NameDesig",
      label_email: "Email",
      name2: "b01Email",
    },
    {
      label_name: "Name/Designation",
      name1: "b02NameDesig",
      label_email: "Email",
      name2: "b02Email",
    },
    {
      label_name: "Name/Designation",
      name1: "b03NameDesig",
      label_email: "Email",
      name2: "b03Email",
    },
  ];

  const bidOpinerDocs = [
    {
      label_name: "Name/Designation",
      name1: "nameDesig",
      label_desc: "Description",
      name2: "description",
      nameDocSize: "docSize",
    },
    {
      label_name: "Name/Designation",
      name1: "nameDesig",
      label_desc: "Description",
      name2: "description",
      nameDocSize: "docSize",
    },
  ];

  const handleUploadDoc = (index) => {
    inputFileRefs.current[index].click();
  };

  //image validation with file type and size limit
  const imageHandler = (e, index, setFieldValue) => {
    // console.log(index,"index mg")

    const validExtensions = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
      "text/csv",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
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
      // setFieldValue(`doc${index + 1}`, file);
      setImageDoc(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      // setPreview((prev) => ({ ...prev, [index]: URL.createObjectURL(file) }));
    }
  };

  //name-designation and email form handler
  const onChangeHandler = (name, value, setFieldValue) => {
    console.log(name, "name", value, "value");

    setCoverDetails((prev) => ({
      ...prev,
      preTender: { ...prev.preTender, [name]: value },
    }));

    setFieldValue(`preTender.${[name]}`, value);
  };

  //doc upload function
  const docHandler = (name, event, setFieldValue) => {
    setCoverDetails((prev) => ({
      ...prev,
      [name]: [event.target.files[0]],
      doc: {
        ...prev.doc,
        [name]: {
          ...prev.doc[name],
          docSize: `${String(Number(event.target.files[0]?.size) / 1024)}kb`,
        },
      },
    }));

    setFieldValue([name], [event.target.files[0]]);
    setFieldValue(
      `doc.${name}.docSize`,
      `${String(
        (Math.round(Number(event.target.files[0]?.size) / 1024) * 100) / 100
      )}kb`
    );
  };

  //doc details handler
  const docDataHandler = (name, subName, value, setFieldValue) => {
    setCoverDetails((prev) => ({
      ...prev,
      doc: {
        ...prev.doc,
        [name]: {
          ...prev.doc[name],
          [subName]: value,
        },
      },
    }));
    setFieldValue(`doc.${name}.${subName}`, value);
  };

  // submit form
  const submitForm = async (values) => {
    values.preTender = { ...values.preTender, reference_no: referenceNo };
    let formData = new FormData();
    values.preTender = JSON.stringify(values.preTender);
    values.doc = JSON.stringify(values.doc);

    for (let key in values) {
      // Append single file or multiple files
      if (Array.isArray(values[key])) {
        values[key].forEach((file, index) => {
          formData.append(key, file);
        });
      } else {
        formData.append(key, values[key]);
      }
    }

    AxiosInterceptors.post(api_postBidOpenerDetails, formData, ApiHeader2())
      .then(function (response) {
        if (response?.data?.status) {
          toast.success("Bid Opener data Submitted successfully");
          navigate(`/tendering?tabNo=${7}`);
        } else {
          toast.error("Error in getting basic details");
        }
      })
      .catch(function (error) {
        console.log(error, "errrrrrrrrrrrrrrrrrrr");
        toast.error("Error ");

        // toast.error(error?.response?.data?.error);
      });
  };

  ///////////{*** APPLICATION FULL DETAIL ***}/////////

  const getApplicationDetail = (refNo) => {
    AxiosInterceptors.get(`${api_getBidOpenerDetails}/${refNo}`, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          console.log(response?.data?.data, "bidopener details");
          setBidOpenerDetails(response?.data?.data);
          // setImageDoc(response?.data?.data?.doc[0]?.docUrl);
        } else {
          // toast.error(response?.data?.message);
        }
      })
      .catch(function (error) {
        console.log(error, "errrrrrrrrrrrrrrrrrrr");
        toast.error(error?.response?.data?.message);
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
        <img src={bo} className='pl-2' />
        <h1 className='pt-1 pl-2 text-xl'>
          Bid Openers Selection : (Minimum 02 or Maximum 03)
        </h1>
      </div>

      {/* Form Starting */}

      <div className=' mt-5 container'>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={(values) => {
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
                <div className=' container mx-auto capitalize grid grid-cols-1'>
                  {bidOpiner?.map((obj, index) => (
                    <div className='mb-4 bg-white shadow-xl border border-gray-200 rounded-md flex mt-3 w-full'>
                      <div className='p-10 w-12 flex items-center shadow-xl justify-center bg-gray-300 rounded'>
                        B0{index + 1}
                      </div>

                      <div className=' w-full p-4 flex gap-3'>
                        <div className='w-full p-3'>
                          <label
                            for='default-input'
                            className={`block mb-2 text-sm font-medium text-gray-900 ${
                              errors?.preTender?.[obj.name1] &&
                              touched?.preTender?.[obj.name1]
                                ? "text-red-400"
                                : "text-gray-900"
                            }`}
                          >
                            {obj.label_name}
                            <span className='text-red-500'>*</span>
                          </label>
                          <input
                            // {console.log(values[])}
                            // name={`preTender${[obj.name1]}`}
                            type='text'
                            className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-full p-2.5'
                            placeholder='Name/Designation'
                            name={obj.name1}
                            onChange={(e) =>
                              onChangeHandler(
                                obj.name1,
                                e.target.value,
                                setFieldValue
                              )
                            }
                            value={values.preTender[obj?.name1]}
                          />
                        </div>

                        <div className='w-full p-3'>
                          <label
                            for='default-input'
                            className={`block mb-2 text-sm font-medium text-gray-900 ${
                              errors?.preTender?.[obj.name2] &&
                              touched?.preTender?.[obj.name2]
                                ? "text-red-400"
                                : "text-gray-900"
                            }`}
                          >
                            {obj.label_email}
                            <span className='text-red-500'>*</span>
                          </label>
                          <input
                            type='email'
                            className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-full p-2.5'
                            placeholder='Email'
                            name={obj.name2}
                            // name={`preTender${[obj.name2]}`}
                            onChange={(e) =>
                              onChangeHandler(
                                obj.name2,
                                e.target.value,
                                setFieldValue
                              )
                            }
                            // {console.log(first)}
                            value={values.preTender[obj.name2]}
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className='bg-[#4338ca] text-white w-full rounded p-3 shadow-xl mb-5'>
                    <h1 className='pt-1 pl-2 text-xl'>
                      Uploading the tender documents
                    </h1>
                    <p className='text-[11px] pl-3 font-light'>
                      {" "}
                      (Only PDF,JPG,XLS & RAR Files Allowed)*
                    </p>
                  </div>

                  {bidOpinerDocs?.map((obj, index) => (
                    <div className='mb-4 bg-white shadow-xl border border-gray-200 rounded-md flex  w-full'>
                      <div className='p-10 w-12 flex items-center shadow-xl justify-center bg-gray-300 rounded'>
                        B0{index + 1}
                      </div>
                      <div className=' w-2/3 p-4 gap-3'>
                        <div className='w-full '>
                          <label
                            for='default-input'
                            className={`block mb-2 text-sm font-medium ${
                              errors?.doc?.[`B0${index + 1}`]?.[obj.name1] &&
                              touched?.doc?.[`B0${index + 1}`]?.[obj.name1]
                                ? "text-red-400"
                                : "text-gray-900"
                            }`}
                          >
                            {obj.label_name}
                            <span className='text-red-500'>*</span>
                          </label>
                          <input
                            type='text'
                            className={`bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 $`}
                            placeholder='Name/Designation'
                            name={obj.name1}
                            onChange={(e) =>
                              docDataHandler(
                                `B0${index + 1}`,
                                obj.name1,
                                e.target.value,
                                setFieldValue
                              )
                            }
                            value={values?.doc?.[`B0${index + 1}`]?.[obj.name1]}
                          />
                        </div>

                        <label
                          for='default-input'
                          className={`block mb-2 mt-3 text-sm font-medium text-gray-900 ${
                            errors?.doc?.[`B0${index + 1}`]?.[obj.name2] &&
                            touched?.doc?.[`B0${index + 1}`]?.[obj.name2]
                              ? "text-red-400"
                              : "text-gray-900"
                          }`}
                        >
                          {obj.label_desc}
                          <span className='text-red-500'>*</span>
                        </label>

                        <div className=' relative'>
                          <textarea
                            type='text'
                            className={` bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-full h-28 p-2.5 `}
                            placeholder='Description'
                            name={obj.name2}
                            value={values?.doc?.[`B0${index + 1}`]?.[obj.name2]}
                            onChange={(e) =>
                              docDataHandler(
                                `B0${index + 1}`,
                                obj.name2,
                                e.target.value,
                                setFieldValue
                              )
                            }
                          />
                        </div>
                      </div>

                      <div className='w-1/3 mt-4 mr-5 mb-5'>
                        <div className='w-full mb-5'>
                          <label
                            for='default-input'
                            className={`block mb-2 text-sm font-medium text-gray-900 ${
                              errors?.[`B0${index + 1}`] &&
                              touched?.[`B0${index + 1}`]
                                ? "text-red-400"
                                : "text-gray-900"
                            }`}
                          >
                            Document Size (kb)
                            <span className='text-red-500'>*</span>
                          </label>
                          <input
                            type='text'
                            className='bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-full p-2.5'
                            placeholder=''
                            name={obj.nameDocSize}
                            // value={values[obj.nameDocSize]}
                            defaultValue={
                              values?.doc?.[`B0${index + 1}`]?.docSize
                            }
                            onChange={handleChange}
                            disabled
                          />
                        </div>

                        <div className='w-full flex flex-col justify-center items-center border-[3px] rounded border-dotted p-8 '>
                          <div className='w-[8rem] mb-2'>
                            {values[`doc${index + 1}`] && (
                              <img
                                src={URL.createObjectURL(
                                  values[`doc${index + 1}`]
                                )}
                                alt='Selected'
                                style={{ width: "100px", height: "auto" }}
                              />
                            )}

                            <img
                              src={values?.[`B0${index + 1}`][0]}
                              alt='Selected'
                              style={{ width: "100px", height: "auto" }}
                            />
                          </div>
                          <div className=''>
                            <input
                              type='file'
                              className='hidden'
                              ref={(el) => (inputFileRefs.current[index] = el)}
                              onChange={(e) => {
                                imageHandler(e, index, setFieldValue);
                                docHandler(`B0${index + 1}`, e, setFieldValue);
                              }}
                            />
                            <button
                              type='button'
                              className={`text-white end-6 bg-blue-500 hover:bg-blue-900 rounded text-[12px] px-5 py-[5px]`}
                              onClick={() => handleUploadDoc(index)}
                            >
                              Choose File
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <TenderFormButton state={state} />
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
