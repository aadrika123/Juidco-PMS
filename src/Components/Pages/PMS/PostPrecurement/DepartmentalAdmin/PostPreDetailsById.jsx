//////////////////////////////////////////////////////////////////////////////////////
//    Author - Dimple Kumari
//    Version - 1.0
//    Date - 25/05/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - PostPreDetailsById
//    DESCRIPTION - PostPreDetailsById
/////////////////////////////////////////////////////////////////////////////

import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { nullToNA } from "@/Components/Common/PowerUps/PowerupFunctions";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ProjectApiList from "@/Components/api/ProjectApiList";
import ApiHeader from "@/Components/api/ApiHeader";
import toast from "react-hot-toast";
import { MdTag } from "react-icons/md";
import { contextVar } from "@/Components/context/contextVar";
import ThemeStyle from "@/Components/Common/ThemeStyle";
import { useFormik } from "formik";
import * as yup from "yup";
import PreProcurementCancelScreen from "./PostProcurementCancelScreen";
import PreProcurementSubmittedScreen from "./PreProcurementSubmittedScreen";

import { FaDivide } from "react-icons/fa";
import {
  allowCharacterInput,
  allowNumberInput,
} from "@/Components/Common/PowerUps/PowerupFunctions";
import TitleBar from "@/Components/Pages/Others/TitleBar";

const PostPreDetailsById = (props) => {
  const navigate = useNavigate();
  const { id, page } = useParams();
  console.log("param", id);

  console.log("page========>", page);

  const [erroState, seterroState] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [applicationFullData, setapplicationFullData] = useState();
  const [tableData, setTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [payload, setPayload] = useState({});
  const [remark, setRemark] = useState("");
  const [isGstAdded, setIsGstAdded] = useState(false);

  const {
    api_fetchPostProcurementDetailById,
    api_postPostProcurementDaAdditionalDetails,
    api_fetchPostProcurementDAListOutbox,
    api_postBackToSR,
    api_postReleaseTender,
    api_postRejectTender,
  } = ProjectApiList();

  const { inputStyle, labelStyle, headingStyle, formStyle } = ThemeStyle();

  const { titleBarVisibility } = useContext(contextVar);

  let buttonStyle =
    "  pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-indigo-500 text-sm leading-tight  rounded  hover:bg-indigo-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl";

  let buttonStyle2 =
    " mr-2 pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-white text-sm sm:text-sm leading-tight rounded  hover:bg-white  hover:text-indigo-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl bg-indigo-700";

  // formik
  const validationSchema = yup.object({
    supplier_name: yup.string().required("Supplier name is required"),
    gst_no: yup.string().required("Gst number is required"),
    final_rate: yup.string().required("final rate is required"),
    // gst: yup.number().required("Gst percentage is required"),
    // rate: yup.number().required("Rate is required"),
    total_quantity: yup.number().required("Total Quantity is required"),
    // total_price: yup.number().required("Total Price is required"),
    unit_price: yup.number().required("Unit Price is required"),
  });

  const initialValues = {
    supplier_name: "",
    gst_no: "",
    final_rate: "",
    gst: "",
    total_quantity: applicationFullData?.pre_procurement?.quantity,
    unit_price: "",
    // is_gst_added: false,
    total_price: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log("Additional details==============>>", values);
      // submitForm(values);
      setPayload(values);
      setIsModalOpen(true);
    },
    validationSchema,
  });

  // intitial value

  const handleOnChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    console.log("target value checked", e.target.checked);
    {
      name == "is_gst_added" && gstcheckboxHandler();
    }
    {
      name == "final_rate" && calculateTotalRate(value);
    }
    {
      name == "final_rate" &&
        formik.setFieldValue(
          "final_rate",
          allowNumberInput(value, formik.values.final_rate, 100)
        );
    }
    {
      name == "supplier_name" &&
        formik.setFieldValue(
          "supplier_name",
          allowCharacterInput(value, formik.values.supplier_name, 30)
        );
    }
    {
      name == "gst" &&
        formik.setFieldValue(
          "gst",
          allowNumberInput(value, formik.values.gst, 15)
        );
    }
  };

  ///////////{*** APPLICATION FULL DETAIL ***}/////////
  const getApplicationDetail = () => {
    let url;
    seterroState(false);
    setisLoading(true);

    if (page == "inbox") {
      url = api_fetchPostProcurementDetailById;
    }
    if (page == "outbox") {
      url = api_fetchPostProcurementDAListOutbox;
    }

    AxiosInterceptors.get(`${url}/${id}`, ApiHeader())
      .then(function (response) {
        console.log("view post da details by id...", response?.data?.data);
        if (response?.data?.status) {
          setapplicationFullData(response?.data?.data);
          setTableData(response?.data?.data?.tran_dtls);
          setisLoading(false);
        } else {
          setisLoading(false);
          toast.error("Error while getting details...");
          seterroState(true);
        }
      })
      .catch(function (error) {
        console.log("==2 details by id error...", error);
        setisLoading(false);
        toast.error("Error while getting details...");
        seterroState(true);
      });
  };

  //inbox additional details
  const submitAdditionalDetails = () => {
    let url;
    seterroState(false);
    setisLoading(true);

    if (page == "inbox") {
      url = api_postPostProcurementDaAdditionalDetails;
    }
    let body = {
      ...payload,
      id,
      order_no: applicationFullData.order_no,
      is_gst_added: isGstAdded,
    };
    console.log(body, "body======>>>");

    AxiosInterceptors.post(`${url}`, { ...body }, ApiHeader())
      .then(function (response) {
        console.log("view post da details by id...", response?.data?.data);
        if (response?.data?.status) {
          toast.success("Successfully Data sent!!");
          // setapplicationFullData(response?.data?.data);
          // setTableData(response?.data?.data?.tran_dtls);
          setisLoading(false);
        } else {
          toast.error("Error while submitting form. Please try again.");
          seterroState(true);
        }
      })
      .catch(function (error) {
        console.log("==2 details by id error...", error);
        setisLoading(false);
        toast.error("Error while submitting form. Please try again.");
        seterroState(true);
      });
  };

  const postBackToSRModal = () => {
    setIsModalOpen(true);
  };
  const postReleaseTenderModal = () => {
    setIsModalOpen2(true);
  };
  const postRejectTenderModal = () => {
    setIsModalOpen3(true);
  };

  const postRejectTender = () => {
    setisLoading(true);
    console.log(remark, "Remark==========>>");

    AxiosInterceptors.post(
      `${api_postRejectTender}`,
      { preProcurement: [id], remark: remark },
      ApiHeader()
    )
      .then(function (response) {
        console.log("Forwarded to DA", response?.data);
        console.log(response?.data?.st, "upper Status");
        if (response?.data?.status == true) {
          setisLoading(false);
          toast.success(response?.data?.message, "success");
          setTimeout(() => {
            navigate("/da-inventory-proposal");
          }, 2000);
        } else {
          setisLoading(false);
          const errorMsg = Object.keys(response?.data?.data);
          setErrRes(errorMsg);
          toast(response?.data?.message, "error");
        }
      })
      .catch(function (error) {
        console.log("errorrr.... ", error);
      });
  };
  const postBackToSR = () => {
    setisLoading(true);
    console.log(remark, "Remark==========>>");

    AxiosInterceptors.post(
      `${api_postBackToSR}`,
      { preProcurement: [id], remark: remark },
      ApiHeader()
    )
      .then(function (response) {
        console.log("Forwarded to DA", response?.data);
        console.log(response?.data?.st, "upper Status");
        if (response?.data?.status == true) {
          setisLoading(false);
          toast.success(response?.data?.message, "success");
          setTimeout(() => {
            navigate("/da-inventory-proposal");
          }, 2000);
        } else {
          setisLoading(false);
          const errorMsg = Object.keys(response?.data?.data);
          setErrRes(errorMsg);
          toast(response?.data?.message, "error");
        }
      })
      .catch(function (error) {
        console.log("errorrr.... ", error);
      });
  };

  const postReleaseTender = () => {
    // seterroState(false);
    setisLoading(true);

    AxiosInterceptors.post(
      `${api_postReleaseTender}`,
      { preProcurement: [id] },
      ApiHeader()
    )
      .then(function (response) {
        console.log("Forwarded to DA", response?.data);
        console.log(response?.data?.st, "upper Status");
        if (response?.data?.status == true) {
          setisLoading(false);
          console.log(response?.data?.message, "-------------->>");
          toast.success(response?.data?.message, "success");
          setTimeout(() => {
            navigate("/da-inventory-proposal");
          }, 2000);
          console.log(response?.data?.message, "Forwadede to DA--->>");
        } else {
          setisLoading(false);
          // setdeclarationStatus(false);
          const errorMsg = Object.keys(response?.data?.data);
          setErrRes(errorMsg);
          console.log(errorMsg, "====>>");
          toast(response?.data?.message, "error");
        }
      })
      .catch(function (error) {
        console.log("errorrr.... ", error);
        // setdeclarationStatus(false);
      });
  };

  const calculateTotalRate = (finalRate, gstVal, state) => {
    let totalPrice = Number(finalRate) || 0;
    const totalQuantity = Number(formik.values.total_quantity) || 0;
    let roundedGstValue;

    try {
      if (state == true && (formik.values.gst || gstVal) > 0) {
        //calculating gst value
        const gstValue =
          (1 + Number(formik.values.gst) / 100) * formik.values.final_rate;
        roundedGstValue = Math.floor(gstValue * 100) / 100;

        //calculating unitprice value
        let unitPrice = Number(roundedGstValue) / Number(totalQuantity);
        const roundedUnitPrice = Math.floor(unitPrice * 100) / 100;

        //setting values
        formik.setFieldValue("total_price", roundedGstValue);
        formik.setFieldValue("unit_price", roundedUnitPrice);
      } else {
        formik.setFieldValue("total_price", totalPrice);
        let unitPrice = Number(totalPrice) / Number(totalQuantity);
        const roundedUnitPrice = Math.floor(unitPrice * 100) / 100;
        formik.setFieldValue("unit_price", roundedUnitPrice);
      }
    } catch (err) {
      toast.error("Error in generating unit price");
    }
  };

  useEffect(() => {
    getApplicationDetail();
    calculateTotalRate(formik.values.final_rate, formik.values.gst, isGstAdded);
  }, [isGstAdded, formik.values.final_rate, formik.values.gst]);

  // -------------------- Calculate Total Quantity -------------------------------

  // ------------cancel modal-----------------------------

  const openCancelModal = () => {
    setIsModalOpen2(true);
  };

  const gstcheckboxHandler = () => {
    setIsGstAdded((prev) => !prev);
  };

  if (isModalOpen2) {
    return (
      <>
        <PreProcurementCancelScreen setIsModalOpen2={setIsModalOpen2} />
      </>
    );
  }

  // ------------save modal-----------------------------

  if (isModalOpen) {
    return (
      <>
        <PreProcurementSubmittedScreen
          setIsModalOpen={setIsModalOpen}
          submitAdditionalDetails={submitAdditionalDetails}
        />
      </>
    );
  }

  // console.log(applicationFullData)

  return (
    <div>
      <div className=''>
        <TitleBar
          titleBarVisibility={titleBarVisibility}
          titleText={"Inventory Proposal Details"}
        />
      </div>
      <div className=''>
        {/* Basic Details */}
        <div className='mt-6'>
          <div className='flex justify-between mt-2 bg-white rounded-lg shadow-xl p-4 border border-blue-500 '>
            <h2 className='font-semibold text-xl flex justify-start'>
              <MdTag className='inline pt-1 text-[1.5rem] text-sky-700' /> View
              Procurement Request{" "}
            </h2>
          </div>
          <div className='py-6 mt-2 bg-white rounded-lg shadow-xl p-4 space-y-5 border border-blue-500'>
            <div className='pl-8 text-[1rem] text-[#4338CA]'>
              <h1 className=''>
                Procurement request No <span className='text-black'>:</span>
                <span className='font-bold'>
                  {" "}
                  {nullToNA(applicationFullData?.order_no)}
                </span>
              </h1>
            </div>

            <div className='grid grid-cols-4 gap-4 ml-8'>
              {/* {applicationFullData?.category?.name == ("Uniforms" || "Maintainance and Repaire" || "Safety and Security" ||"Cleaning Supplies" || "Furniture") &&  */}

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>
                  {nullToNA(
                    applicationFullData?.pre_procurement?.category.name
                  )}
                </div>
                <div className='md:w-auto w-[50%] text-gray-500 text-sm'>
                  Item Category
                </div>
              </div>

              {/* } */}

              {/* {applicationFullData?.category?.name == ("Uniforms" || "Maintainance and Repaire" || "Safety and Security" ||"Cleaning Supplies" || "Furniture") &&  */}

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>
                  {nullToNA(
                    applicationFullData?.pre_procurement?.subcategory?.name
                  )}
                </div>
                <div className='md:w-auto w-[50%] text-gray-500 text-sm'>
                  Item Sub Category
                </div>
              </div>

              {/* } */}

              {applicationFullData?.pre_procurement?.category?.name ==
                ("Uniforms" ||
                  "Maintainance and Repaire" ||
                  "Safety and Security" ||
                  "Cleaning Supplies" ||
                  "Furniture") && (
                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-bold '>
                    {nullToNA(applicationFullData?.pre_procurement?.brand)}
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-500 text-sm'>
                    Brand
                  </div>
                </div>
              )}

              {applicationFullData?.pre_procurement?.category?.name ==
                ("Uniforms" ||
                  "Maintainance and Repaire" ||
                  "Cleaning Supplies" ||
                  "Furniture") && (
                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-semibold '>
                    {nullToNA(applicationFullData?.pre_procurement?.colour)}
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-500 text-sm'>
                    Colour
                  </div>
                </div>
              )}

              {/* <div className='flex md:flex-row flex-col gap-y-2 md:space-x-5 pl-4  '> */}

              {applicationFullData?.pre_procurement?.category?.name ==
                ("Uniforms" ||
                  "Maintainance and Repaire" ||
                  "Furniture" ||
                  "Cleaning Supplies") && (
                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-bold '>
                    {nullToNA(applicationFullData?.pre_procurement?.material)}
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-500 text-sm'>
                    Material
                  </div>
                </div>
              )}

              {applicationFullData?.pre_procurement?.category?.name ==
                ("Maintainance and Repaire" || "Safety and Security") && (
                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-bold '>
                    {nullToNA(applicationFullData?.pre_procurement?.dimension)}
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-500 text-sm'>
                    Dimension
                  </div>
                </div>
              )}

              {applicationFullData?.pre_procurement?.category?.name ==
                "Furniture" && (
                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-bold '>
                    {nullToNA(applicationFullData?.pre_procurement?.room_type)}
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-500 text-sm'>
                    Room Type
                  </div>
                </div>
              )}

              {applicationFullData?.pre_procurement?.category?.name ==
                "Furniture" && (
                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-semibold '>
                    {nullToNA(
                      applicationFullData?.pre_procurement?.included_components
                    )}
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-500 text-sm'>
                    Included Components
                  </div>
                </div>
              )}

              {applicationFullData?.pre_procurement?.category?.name ==
                "Furniture" && (
                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-bold '>
                    {nullToNA(applicationFullData?.pre_procurement?.size)}
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-500 text-sm'>
                    size
                  </div>
                </div>
              )}

              {applicationFullData?.pre_procurement?.category?.name ==
                "Cleaning Supplies" && (
                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-bold '>
                    {nullToNA(
                      applicationFullData?.pre_procurement?.recomended_uses
                    )}
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-500 text-sm'>
                    Recomended Uses
                  </div>
                </div>
              )}

              {applicationFullData?.pre_procurement?.category?.name ==
                "Cleaning Supplies" && (
                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-bold '>
                    {nullToNA(applicationFullData?.pre_procurement?.bristle)}
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-500 text-sm'>
                    Bristle
                  </div>
                </div>
              )}

              {applicationFullData?.pre_procurement?.category?.name ==
                ("Maintainance and Repaire" || "Safety and Security") && (
                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-semibold '>
                    {nullToNA(applicationFullData?.pre_procurement?.weight)}
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-500 text-sm'>
                    Weight
                  </div>
                </div>
              )}

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-semibold '>
                  {nullToNA(applicationFullData?.pre_procurement?.rate)}
                </div>
                <div className='md:w-auto w-[50%] text-gray-500 text-sm'>
                  Rate per quantity
                </div>
              </div>

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>
                  {nullToNA(applicationFullData?.pre_procurement?.quantity)}
                </div>
                <div className='md:w-auto w-[50%] text-gray-500 text-sm'>
                  Quantity
                </div>
              </div>

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>
                  {nullToNA(applicationFullData?.pre_procurement?.total_rate)}
                </div>
                <div className='md:w-auto w-[50%] text-gray-500 text-sm'>
                  Total Rate
                </div>
              </div>

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>
                  {nullToNA(
                    applicationFullData?.pre_procurement?.number_of_items
                  )}
                </div>
                <div className='md:w-auto w-[50%] text-gray-500 text-sm'>
                  No of Items
                </div>
              </div>

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>
                  {/* {nullToNA(applicationFullData?.quantity)} */}
                </div>
                <div className='md:w-auto w-[50%] text-gray-500 text-sm'>
                  {/* Quantity  */}
                </div>
              </div>

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>
                  {/* {nullToNA(applicationFullData?.applicant_name)} */}
                </div>
                <div className='md:w-auto w-[50%] text-gray-500 text-sm'>
                  {/* Total Rate   */}
                </div>
              </div>

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>
                  {/* {nullToNA(applicationFullData?.mobile)} */}
                </div>
                <div className='md:w-auto w-[50%] text-gray-500 text-sm'>
                  {/* Brand  */}
                </div>
              </div>

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-semibold '>
                  {/* {nullToNA(applicationFullData?.email)} */}
                </div>
                <div className='md:w-auto w-[50%] text-gray-500 text-sm'>
                  {/* Processor  */}
                </div>
              </div>
            </div>

            <div className='p-5 pl-8'>
              <h1 className='font-bold '>Other Description</h1>
              <p className=' pt-2'>
                {nullToNA(
                  applicationFullData?.pre_procurement?.other_description
                )}
              </p>
            </div>

            <div className='h-[30px]'></div>
          </div>

          {/* Inventory Details form */}

          {page == "inbox" && (
            <div className={`${formStyle} mt-8 border border-blue-500`}>
              <form onSubmit={formik.handleSubmit} onChange={handleOnChange}>
                <div className=''>
                  <div className=' grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 container mx-auto capitalize'>
                    <div className='col-span-12  w-full mb-20'>
                      <div className=' ml-4 p-2 mt-4'>
                        <h1 className={`${headingStyle} text-left pb-5 pl-6`}>
                          Inventory Details
                        </h1>
                      </div>

                      <div className='p-12 -mt-4 valid-form flex flex-wrap flex-row -mx-4'>
                        <div className='form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                          <div class='px-4 w-full mb-4'>
                            <label
                              className={`${labelStyle} inline-block mb-2`}
                            >
                              Supplier Name{" "}
                              <span className='text-red-500'>*</span>
                            </label>

                            <input
                              type='text'
                              name='supplier_name'
                              className={`${inputStyle} inline-block w-full relative`}
                              onChange={formik.handleChange}
                              value={formik.values.supplier_name}
                            />

                            <p className='text-red-500 text-xs '>
                              {formik.touched.supplier_name &&
                              formik.errors.supplier_name
                                ? formik.errors.supplier_name
                                : null}
                            </p>
                          </div>
                        </div>

                        <div className=' form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                          <div class='px-4 w-full mb-4'>
                            <label
                              className={`${labelStyle} inline-block mb-2`}
                            >
                              GST No
                            </label>

                            <input
                              type='text'
                              name='gst_no'
                              className={`${inputStyle} inline-block w-full relative`}
                              onChange={formik.handleChange}
                              value={formik.values.gst_no}
                            />

                            <p className='text-red-500 text-xs '>
                              {formik.touched.gst_no && formik.errors.gst_no
                                ? formik.errors.gst_no
                                : null}
                            </p>
                          </div>
                        </div>

                        <div className=' form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                          <div class='px-4 w-full mb-4'>
                            <label
                              className={`${labelStyle} inline-block mb-2`}
                            >
                              Final Rate
                            </label>

                            <input
                              type='text'
                              name='final_rate'
                              className={`${inputStyle} inline-block w-full relative`}
                              onChange={formik.handleChange}
                              value={formik.values.final_rate}
                            />

                            <p className='text-red-500 text-xs '>
                              {formik.touched.final_rate &&
                              formik.errors.final_rate
                                ? formik.errors.final_rate
                                : null}
                            </p>
                          </div>
                        </div>

                        <div className=' form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                          <div class='px-4 w-full mb-4'>
                            <label
                              className={`${labelStyle} inline-block mb-2`}
                            >
                              GST%
                            </label>

                            <input
                              type='text'
                              name='gst'
                              className={`${inputStyle} inline-block w-full relative`}
                              onChange={formik.handleChange}
                              value={formik.values.gst}
                            />

                            {/* <select
                            {...formik.getFieldProps("itemsubcategory")}
                            className={`${inputStyle} inline-block w-full relative`}
                            onChange={formik.handleChange}
                          >
                            <option selected>select</option>
                            <option select>5%</option>
                            <option select>12%</option>
                            <option select>18%</option>
                            <option select>28%</option>

                          </select> */}
                            <div className='flex mt-2'>
                              <input
                                type='checkbox'
                                checked={isGstAdded}
                                onChange={() => {
                                  const newState = !isGstAdded;
                                  setIsGstAdded(newState);
                                  calculateTotalRate(
                                    formik.values.final_rate,
                                    formik.values.gst,
                                    newState
                                  );
                                }}
                                // onClick={() => setIsGstAdded((prev) => !prev)}
                              />{" "}
                              <p className='text-sm pl-2'>add GST in Bill</p>
                            </div>

                            <p className='text-red-500 text-xs'>
                              {formik.touched.gst && formik.errors.gst
                                ? formik.errors.gst
                                : null}
                            </p>
                          </div>
                        </div>

                        <div className=' ml-2 p-2 mt-4 w-full'>
                          <h1 className={`${headingStyle} text-left pb-10`}>
                            Calculation
                          </h1>

                          <div class='form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                            <div className='flex space-x-5'>
                              <input
                                type='number'
                                name='total_price'
                                className={`${inputStyle} inline-block w-full relative`}
                                // onChange={(e) => {
                                //   formik.handleChange(e);
                                //   calculateTotalRate();
                                // }}
                                disabled
                                value={formik.values.total_price}
                                placeholder='Total Price'
                              />
                              <FaDivide className='text-[4rem] pb-5' />
                              <input
                                type='number'
                                name='total_quantity'
                                className={`${inputStyle} inline-block w-full relative`}
                                // onChange={(e) => {
                                //   formik.handleChange(e);
                                //   calculateTotalRate();
                                // }}
                                disabled
                                value={formik.values.total_quantity}
                                placeholder='Total Quantity'
                              />

                              <p className='text-[1.5rem]'>=</p>
                              <input
                                type='number'
                                name='unit_price'
                                className={`${inputStyle} inline-block w-full relative`}
                                // onChange={formik.handleChange}
                                value={formik.values.unit_price}
                                placeholder='Per Price'
                                disabled
                              />
                            </div>
                            <p className='text-red-500 text-xs '>
                              {formik.touched.total_quantity &&
                              formik.errors.total_quantity
                                ? formik.errors.total_quantity
                                : null}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className='space-x-5 flex justify-end mr-[3rem]'>
                        <button
                          className={buttonStyle}
                          onClick={openCancelModal}
                        >
                          Cancel
                        </button>

                        <button type='submit' className={buttonStyle2}>
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}

          {page == "outbox" && (
            <div className='py-6 mt-2 bg-white rounded-lg shadow-xl px-10 border border-blue-500'>
              <h2 className='text-2xl font-semibold text-gray-600 mb-4'>
                Additional Details
              </h2>
              <div className='flex justify-between items-center py-4'>
                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-bold '>
                    {nullToNA(applicationFullData?.supplier_name)}
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-500 text-sm'>
                    Supplier Name
                  </div>
                </div>

                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-bold '>
                    {nullToNA(applicationFullData?.gst_no)}
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-500 text-sm'>
                    GST Number
                  </div>
                </div>

                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-bold '>
                    {nullToNA(applicationFullData?.is_gst_added)}
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-500 text-sm'>
                    GST included
                  </div>
                </div>

                {applicationFullData?.is_gst_added && (
                  <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                    <div className='md:w-auto w-[50%] font-bold '>
                      {nullToNA(applicationFullData?.gst)}
                    </div>
                    <div className='md:w-auto w-[50%] text-gray-500 text-sm'>
                      GST
                    </div>
                  </div>
                )}
              </div>

              <div className='flex justify-between items-center py-4'>
                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-bold '>
                    {nullToNA(applicationFullData?.final_rate)}
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-500 text-sm'>
                    Final Rate
                  </div>
                </div>

                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-bold '>
                    {nullToNA(applicationFullData?.total_quantity)}
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-500 text-sm'>
                    Total Quantity
                  </div>
                </div>

                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-bold '>
                    {nullToNA(applicationFullData?.total_price)}
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-500 text-sm'>
                    Total Price
                  </div>
                </div>

                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-bold '>
                    {nullToNA(applicationFullData?.unit_price)}
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-500 text-sm'>
                    Price per Item
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostPreDetailsById;
