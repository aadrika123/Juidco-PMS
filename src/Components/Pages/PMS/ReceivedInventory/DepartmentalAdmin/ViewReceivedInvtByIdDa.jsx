//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash Alam
//    Version - 1.0
//    Date - 24/05/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - ViewReceivedInvtByIdDa
//    DESCRIPTION - ViewReceivedInvtByIdDa
//////////////////////////////////////////////////////////////////////////////////////

import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import toast from "react-hot-toast";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import ReceivedInvtSubmittedScreen from "./ReceivedInvtSubmittedScreenDa";
import DaPostProcurementCancelScreen from "./DaPostProcurementCancelScreen";
import { nullToNA } from "@/Components/Common/PowerUps/PowerupFunctions";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ProjectApiList from "@/Components/api/ProjectApiList";
import ApiHeader from "@/Components/api/ApiHeader";
import ThemeStyle from "@/Components/Common/ThemeStyle";
import ImageModal from "@/Components/Pages/Others/ImageModal/ImageModal";
import { contextVar } from "@/Components/context/contextVar";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import { indianAmount } from "@/Components/Common/PowerupFunctions";
import ApiHeader2 from "@/Components/api/ApiHeader2";
import TimeLine from "@/Components/Common/Timeline/TimeLine";
import LoaderApi from "@/Components/Common/Loaders/LoaderApi";
import { useReactToPrint } from "react-to-print";

const ViewReceivedInvtByIdDa = (props) => {
  const navigate = useNavigate();
  const { id, page } = useParams();

  const [erroState, seterroState] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [applicationFullData, setapplicationFullData] = useState();
  const [formData, setFormData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [remark, setRemark] = useState("");
  const [cancelModal, setCancelModal] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [ulbId, setUlbId] = useState("");
  const [imageDoc, setImageDoc] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [procurementItemId, setProcurementItemId] = useState("");
  const [procItemData, setProcItemData] = useState();

  const {
    api_fetchPostProcurementDetailSupplierbyId,
    api_postDaReceivedInvtDetail,
  } = ProjectApiList();

  const { inputStyle, labelStyle, headingStyle, formStyle } = ThemeStyle();

  // Accessing context for notifications
  const { titleBarVisibility } = useContext(contextVar);

  //Print
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  let buttonStyle =
    "  pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-indigo-500 text-md leading-tight  rounded  hover:bg-indigo-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl";

  let buttonStyle2 =
    " mr-2 pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-white text-md sm:text-md leading-tight rounded  hover:bg-white  hover:text-indigo-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl bg-indigo-700";

  //Formik -------------------
  const validationSchema = yup.object({
    total_quantity: yup.number().required("Total quantity is required"),
    received_quantity: yup.number().required("Received quantity is required"),
    remaining_quantity: yup.number().required("Remaining quantity is required"),
    date: yup.date().required("Date is required"),
    // remark: yup.string().required("Remaining quantity is required"),
  });

  // intitial value
  const initialValues = {
    total_quantity: applicationFullData?.post_procurement?.total_quantity,
    received_quantity: "",
    remaining_quantity: "",
    date: "",
    remark: "",
    // imageDoc: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      setIsModalOpen(true);
      setFormData(values);
    },
    validationSchema,
  });

  const handleOnChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    {
      name == "received_quantity" && remainingQuanityCalc(value);
    }
    // {
    //   name == "procurement_stock_id" && remainingQuanityCalc(value);
    // }
    {
      name == "procurement_stock_id" && selectProcItem(value);
    }
  };

  useEffect(() => {
    let ulbIds = localStorage.getItem("ulbId");
    setUlbId(ulbIds);
    getApplicationDetail();

    // dateFunc()
  }, []);

  ///////////{*** application view detail ***}/////////
  const getApplicationDetail = () => {
    setisLoading(true);
    seterroState(false);

    AxiosInterceptors.get(
      `${api_fetchPostProcurementDetailSupplierbyId}/${id}`,
      ApiHeader()
    )
      .then(function (response) {
        // console.log("view post da details by id...", response?.data?.data);
        if (response?.data?.status) {
          setapplicationFullData(response?.data?.data);
          // setTableData(response?.data?.data?.tran_dtls);
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
        // toast.error("Error while getting details...");
        seterroState(true);
      });
  };

  ////////////// call remaining quantity and managing rec quantity validation ////////////////

  const remainingQuanityCalc = (receivedQuantity) => {
    if (receivedQuantity < 0) {
      toast.error("Amount cannot be negative");
      formik.setFieldValue("received_quantity", 0);
      return;
    }

    //setting received quantity

    let recQuantity;

    receivedQuantity && (recQuantity = Number(receivedQuantity) || 0);

    if (applicationFullData?.receivings?.length == 0) {
      formik.setFieldValue("received_quantity", receivedQuantity);
      const initialReceiveQuantity =
        formik.values.total_quantity - receivedQuantity;
      formik.setFieldValue("remaining_quantity", initialReceiveQuantity);
    } else {
      // const procItem = applicationFullData?.receivings?.find(
      //   (data) => data?.procurement_stock_id === procurementItemId
      // );

      const filterredReceivings = applicationFullData?.receivings?.filter(
        (item) => item?.procurement_stock_id === procurementItemId
      );

      const procItem = filterredReceivings.reduce(
        (total, item) => total + item?.received_quantity,
        0
      );

      // console.log(procItem,"procItem")

      formik.setFieldValue("received_quantity", receivedQuantity);
      const initialReceiveQuantity =
        formik.values.total_quantity - procItem - receivedQuantity;

      if (initialReceiveQuantity < 0) {
        toast.error("Received Quantity should less then remaning quantity");
        formik.setFieldValue("received_quantity", 0);
        formik.setFieldValue(
          "remaining_quantity",
          procItem?.remaining_quantity
        );
        return;
      }
      formik.setFieldValue("remaining_quantity", initialReceiveQuantity);
    }
  };

  // console.log(applicationFullData?.procurement_stocks,"applicationFullData")
  // console.log(formData,"formData")

  //post received inventory details----------
  const postReceivedInventoryDetails = () => {
    setisLoading(true);

    let body = {
      ...formData,
      img: imageDoc,
      procurement_no: applicationFullData?.procurement_no,
      // ulb_id:ulbId
    };
    let formDataPayload = new FormData();

    for (let key in body) {
      formDataPayload.append(key, body[key]);
    }

    AxiosInterceptors.post(
      `${api_postDaReceivedInvtDetail}`,
      formDataPayload,
      ApiHeader2()
    )
      .then(function (response) {
        if (response?.data?.status == true) {
          setIsModalOpen(false);
          setisLoading(false);
          toast.success("Successfully Stocks Received", "success");
          window.location.reload();
          // navigate(
          //   `/ia-received-InvtDetailsById/${applicationFullData?.procurement_no}/inbox`
          // );
        } else {
          setisLoading(false);
          toast(response?.data?.message, "error");
        }
      })
      .catch(function (error) {
        toast.error("Something went wrong");
        console.log("errorrr.... ", error);
      });
  };

  // Select pRocurement Item
  const selectProcItem = (procId) => {
    setProcurementItemId(procId);
    const procItem = applicationFullData?.procurement_stocks?.find(
      (data) => data?.id === procId
    );

    // console.log(procItem);
    formik.setFieldValue("total_quantity", procItem?.quantity);
    setProcItemData(procItem);
  };

  if (isModalOpen) {
    return (
      <>
        <ReceivedInvtSubmittedScreen
          submitFunc={postReceivedInventoryDetails}
          setRemark={setRemark}
          formData={formData}
          setFormData={setFormData}
          setImageDoc={setImageDoc}
          imageDoc={imageDoc}
          setIsModalOpen={setIsModalOpen}
          remark={formik.values.remark}
          loadingState={isLoading}
        />
      </>
    );
  }
  if (cancelModal) {
    return (
      <>
        <DaPostProcurementCancelScreen setCancelModal={setCancelModal} />
      </>
    );
  }

  if (imageModal) {
    return (
      <>
        <ImageModal
          imageModal={imageModal}
          setImageModal={setImageModal}
          imageUrl={imageUrl}
        />
      </>
    );
  }

  return (
    <div>
      {isLoading && <LoaderApi />}

      <TitleBar
        titleBarVisibility={titleBarVisibility}
        titleText={"Inventory Details"}
      />
      <div className=''>
        {/* //timeline  */}
        {/* <div className={`${isLoading ? "blur-[2px]" : ""}`}>
          <TimeLine status={applicationFullData?.status?.status} />
        </div> */}

        {/* Basic Details */}
        <div
          className={`mt-6 ${isLoading ? "blur-[2px]" : ""}`}
          ref={componentRef}
        >
          <div className='py-6 mt-2 bg-white rounded-lg shadow-xl p-4 space-y-5 border border-blue-500'>
            <div className=''>
              <h2 className='font-semibold text-2xl pl-7 pt-2 pb-2 flex justify-start bg-[#4338ca] text-white rounded-md'>
                View Pre Procurement Details{" "}
              </h2>
            </div>

            <div className='flex justify-between'>
              <div className='pl-8 text-[1rem] text-[#4338CA] flex justify-between w-full'>
                <h1 className=''>
                  Procurement No <span className='text-black'>:</span>
                  <span className='font-bold'>
                    {" "}
                    {nullToNA(applicationFullData?.procurement_no)}
                  </span>
                </h1>
                <h1 className='text-black'>
                  Procurement Total <span className='text-black'>:</span>
                  <span className='font-bold'>
                    {" "}
                    {indianAmount(nullToNA(applicationFullData?.total_rate))}
                  </span>
                </h1>
              </div>
            </div>

            <div className='flex justify-between'>
              <div className='pl-8 text-[1rem] text-black flex justify-between w-full'>
                <h1 className=''>
                  Category <span className='text-black'>:</span>
                  <span className='font-bold'>
                    {" "}
                    {nullToNA(applicationFullData?.category?.name)}
                  </span>
                </h1>
              </div>
            </div>

            {applicationFullData?.procurement_stocks?.map((procData, index) => (
              <>
                <div>
                  <p className='text-xs pl-5'>Procurement Item: {index + 1}</p>
                </div>
                <div className='grid md:grid-cols-4 gap-4 ml-8 bg-slate-50 p-5 rounded shadow'>
                  <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                    <div className='md:w-auto w-[50%] font-bold '>
                      Subcategory
                    </div>
                    <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                      {procData?.subCategory?.name}
                    </div>
                  </div>

                  <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                    <div className='md:w-auto w-[50%] font-bold '>Unit</div>
                    <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                      {nullToNA(procData?.unit?.name)}
                    </div>
                  </div>

                  <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                    <div className='md:w-auto w-[50%] font-bold '>Brand</div>
                    <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                      {nullToNA(procData?.brand?.name)}
                    </div>
                  </div>

                  <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                    <div className='md:w-auto w-[50%] font-bold '>Quantity</div>
                    <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                      {nullToNA(procData?.quantity)}
                    </div>
                  </div>

                  <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                    <div className='md:w-auto w-[50%] font-bold '>
                      Per Unit Rate
                    </div>
                    <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                      {indianAmount(nullToNA(procData?.rate))}
                    </div>
                  </div>

                  <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                    <div className='md:w-auto w-[50%] font-bold '>
                      Total Rate
                    </div>
                    <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                      {indianAmount(nullToNA(procData?.total_rate))}
                    </div>
                  </div>

                  <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                    <div className='md:w-auto w-[50%] font-bold '>
                      Description
                    </div>
                    <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                      {nullToNA(procData?.description)}
                    </div>
                  </div>
                </div>
              </>
            ))}

            <div className='h-[30px]'></div>
          </div>
          {/* Additional Details */}
          {applicationFullData?.is_rate_contract != true && (
            <div className='py-6 mt-8 bg-white rounded-lg shadow-xl px-6 border border-blue-500'>
              <div className=''>
                <h2 className='font-semibold text-2xl pl-7 pt-2 pb-2 flex justify-start bg-[#4338ca] text-white rounded-md'>
                  Supplier Details{" "}
                </h2>
              </div>

              {applicationFullData?.supplier_master?.map(
                (supplierInfo, index) => (
                  <>
                    <h1 className='text-xs pt-4'>Supplier {index + 1}</h1>

                    <div className='bg-slate-50 p-5 rounded shadow'>
                      <div className='md:flex md:justify-between md:items-center p-4'>
                        <div className='flex-1 md:block flex flex-row-reverse justify-between'>
                          <div className='md:w-auto w-[50%] font-bold capitalize '>
                            {nullToNA(supplierInfo?.name)}
                          </div>
                          <div className='md:w-auto w-[50%] text-gray-800 text-sm'>
                            Supplier Name
                          </div>
                        </div>

                        <div className='flex-1 md:block flex flex-row-reverse justify-between'>
                          <div className='md:w-auto w-[50%] font-bold '>
                            {nullToNA(supplierInfo?.reference_no)}
                          </div>
                          <div className='md:w-auto w-[50%] text-gray-800 text-sm'>
                            Reference Number
                          </div>
                        </div>

                        <div className='flex-1 md:block flex flex-row-reverse justify-between'>
                          <div className='md:w-auto w-[50%] font-bold '>
                            {nullToNA(supplierInfo?.gst_no)}
                          </div>
                          <div className='md:w-auto w-[50%] text-gray-800 text-sm'>
                            GST No
                          </div>
                        </div>

                        <div className='flex-1 md:block flex flex-row-reverse justify-between'>
                          <div className='md:w-auto w-[50%] font-bold '>
                            {nullToNA(supplierInfo?.pan_no)}
                          </div>
                          <div className='md:w-auto w-[50%] text-gray-800 text-sm'>
                            PAN No
                          </div>
                        </div>
                      </div>

                      <div className='md:flex md:justify-between items-center p-4'>
                        <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                          <div className='md:w-auto w-[50%] font-bold '>
                            {nullToNA(supplierInfo?.address)}
                          </div>
                          <div className='md:w-auto w-[50%] text-gray-800 text-sm'>
                            Address
                          </div>
                        </div>

                        <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                          <div className='md:w-auto w-[50%] font-bold '>
                            {nullToNA(supplierInfo?.bank_name)}
                          </div>
                          <div className='md:w-auto w-[50%] text-gray-800 text-sm'>
                            Bank Name
                          </div>
                        </div>

                        <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                          <div className='md:w-auto w-[50%] font-bold '>
                            {nullToNA(supplierInfo?.account_no)}
                          </div>
                          <div className='md:w-auto w-[50%] text-gray-800 text-sm'>
                            Account No.
                          </div>
                        </div>

                        <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                          <div className='md:w-auto w-[50%] font-bold '>
                            {nullToNA(supplierInfo?.ifsc)}
                          </div>
                          <div className='md:w-auto w-[50%] text-gray-800 text-sm'>
                            IFSC Code
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )
              )}
            </div>
          )}
          {/* Receiving No */}
          {
            <div className='mt-8 '>
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
                  Receiving No
                </AccordionSummary>
                <AccordionDetails>
                  {/* table */}
                  {!applicationFullData?.receivings.length ? (
                    <p className='font-semibold p-4'>No Data Found</p>
                  ) : (
                    <div className='relative overflow-x-auto'>
                      <table className='w-full text-md text-left rtl:text-right'>
                        <thead className='text-xs uppercase bg-gray-200'>
                          <tr>
                            <th scope='col' className='px-6 py-3'>
                              Date
                            </th>
                            <th scope='col' className='px-6 py-3'>
                              Receiving no
                            </th>
                            {/* <th scope='col' className='px-6 py-3'>
                              Total Quantity
                            </th> */}
                            <th scope='col' className='px-6 py-3'>
                              Received Quantity
                            </th>
                            <th scope='col' className='px-6 py-3'>
                              View Doc
                            </th>
                            <th scope='col' className='px-6 py-3'>
                              Remaining Quantity
                            </th>
                            <th scope='col' className='px-6 py-3'>
                              Inventory Status
                            </th>
                            <th scope='col' className='px-6 py-3'>
                              Remark
                            </th>
                          </tr>
                        </thead>

                        {applicationFullData?.receivings.map((data) => (
                          <tbody>
                            <tr className='bg-white border-b-2'>
                              {/* <td className='px-6 py-4'>{data?.date}</td> */}
                              <td className='px-6 py-4'>
                                {data?.date
                                  .split("T")[0]
                                  .split("-")
                                  .reverse()
                                  .join("-")}
                              </td>

                              <td className='px-6 py-4'>
                                {data?.receiving_no}
                              </td>
                              {/* <td className='px-6 py-4'>
                                {
                                  applicationFullData?.post_procurement
                                    ?.quantity
                                }
                              </td> */}
                              <td className='px-6 py-4'>
                                {data?.received_quantity}
                              </td>
                              <td className='px-6 py-4'>
                                <p
                                  className='text-blue-900 underline font-bold cursor-pointer'
                                  onClick={() => {
                                    setImageUrl(
                                      data?.receiving_image[0]?.imageUrl
                                    );
                                    setImageModal(true);
                                  }}
                                >
                                  View
                                </p>
                              </td>
                              <td className='px-6 py-4'>
                                {data?.remaining_quantity}
                              </td>
                              <td className='px-6 py-4'>
                                {data?.is_added ? (
                                  <p className='text-green-500'>
                                    Added to Inventory
                                  </p>
                                ) : (
                                  <p className='text-violet-600'>Pending</p>
                                )}
                              </td>
                              <td className='px-6 py-4'>{data?.remark}</td>
                            </tr>
                          </tbody>
                        ))}

                        <tfoot>
                          <tr className='font-semibold text-gray-900 dark:text-white'>
                            <th scope='row' className='px-6 py-3 text-base'>
                              Total
                            </th>
                            <td className='px-6 py-3'>3</td>
                            <td className='px-6 py-3'>21,000</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  )}

                  {/* table */}
                </AccordionDetails>
              </Accordion>
            </div>
          }
          {/* Additional Details */}
          {page == "outbox" && (
            <div className='py-6 mt-8 bg-white rounded-lg shadow-xl p-4 space-y-5 border border-blue-500 '>
              <div className=''>
                <h2 className='font-semibold text-2xl pl-7 pt-2 pb-2 flex justify-start bg-[#4338ca] text-white rounded-md'>
                  Received Inventory
                </h2>
              </div>

              <div className='grid grid-cols-4 gap-4 ml-8'>
                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-bold text-md'>
                    Total Quantity
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                    {applicationFullData?.post_procurement?.total_quantity
                      ? applicationFullData?.post_procurement?.total_quantity
                      : 0}
                  </div>
                </div>

                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-bold text-md'>
                    Total Received Quantity
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                    {applicationFullData?.total_receivings
                      ? applicationFullData?.total_receivings
                      : 0}
                  </div>
                </div>

                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-bold text-md'>
                    Total Remaining Quantity
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                    {(applicationFullData?.total_remaining &&
                      Number(applicationFullData?.total_remaining)) ||
                      0}
                  </div>
                </div>

                <div className='h-[30px]'></div>
              </div>
            </div>
          )}
          {/* Received Details form */}
          {page != "outbox" && applicationFullData?.is_partial && (
            <div className={`${formStyle} mt-8 border border-blue-600`}>
              <form onSubmit={formik.handleSubmit} onChange={handleOnChange}>
                <div className=''>
                  <div className=' grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 container mx-auto capitalize'>
                    <div className='col-span-12  w-full mb-20'>
                      <div className=' ml-4 p-2 mt-3'>
                        <h1
                          className={`${headingStyle} text-left p-2 pl-6 bg-[#4338ca] text-white rounded-md`}
                        >
                          Received Inventory
                        </h1>
                      </div>
                      <div className='form-group flex-shrink max-w-full px-4 w-full  mb-2 ml-4 flex justify-between items-center'>
                        <div className='form-group flex-shrink max-w-full px-4 mb-4'>
                          <label className={`${labelStyle} inline-block mb-2`}>
                            Choose Procurement Item
                            <span className='text-xl text-red-500 pl-1'>
                              *
                            </span>{" "}
                          </label>
                          <select
                            name='procurement_stock_id'
                            className={`${inputStyle} inline-block w-full relative`}
                            onChange={formik.handleChange}
                            // onClick={() => }
                          >
                            <option defaultValue={"select"}>select</option>
                            {/* {console.log(applicationFullData)} */}
                            {applicationFullData?.procurement_stocks?.map(
                              (data, index) => (
                                <option
                                  value={data?.id}
                                  className='p-3'
                                  disabled={!data?.is_partial}
                                >
                                  {/* {console.log(data?.id)} */}
                                  {/* {data?.id} */}
                                  Procurement Item {index + 1}{" "}
                                  <span className='text-gray-600 text-xs'>
                                    {!data?.is_partial &&
                                      "(Complete Stocks Added)"}
                                  </span>
                                </option>
                              )
                            )}
                          </select>
                          <p className='text-red-500 text-xs '></p>
                        </div>
                        <div className='w-1/2 flex gap-10'>
                          <div className='text-sm'>
                            <h1>Sub Category:</h1> 
                            <span className='font-semibold text-base text-blue-950'>
                              {procItemData?.subCategory?.name ||
                                "Select Procurement Item"}
                            </span>
                          </div>
                          <div className='text-sm'>
                            <h1>Description:</h1>
                            <span className='font-semibold text-base text-blue-950'>
                              {procItemData?.description ||
                                "Select Procurement Item"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className='p-12 -mt-4 valid-form flex flex-wrap flex-row -mx-8'>
                        <div className='form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                          <div className='px-4 w-full mb-4'>
                            <label
                              className={`${labelStyle} inline-block mb-2`}
                            >
                              Total Quantity
                            </label>

                            <input
                              type='number'
                              name='total_quantity'
                              className={`${inputStyle} inline-block w-full relative`}
                              onChange={formik.handleChange}
                              value={formik.values.total_quantity}
                              readOnly
                            />

                            <p className='text-red-500 text-xs '>
                              {formik.touched.total_quantity &&
                              formik.errors.total_quantity
                                ? formik.errors.total_quantity
                                : null}
                            </p>
                          </div>
                        </div>

                        <div className=' form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                          <div className='px-4 w-full mb-4'>
                            <label
                              className={`${labelStyle} inline-block mb-2`}
                            >
                              Date
                            </label>

                            <input
                              type='date'
                              name='date'
                              className={`${inputStyle} inline-block w-full relative`}
                              onChange={formik.handleChange}
                              value={formik.values.date}
                              max={new Date().toISOString().split("T")[0]}
                            />

                            <p className='text-red-500 text-xs '>
                              {formik.touched.date && formik.errors.date
                                ? formik.errors.date
                                : null}
                            </p>
                          </div>
                        </div>

                        <div className=' form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                          <div className='px-4 w-full mb-4'>
                            <label
                              className={`${labelStyle} inline-block mb-2`}
                            >
                              Received Quantity
                            </label>

                            <input
                              type='number'
                              name='received_quantity'
                              className={`${inputStyle} inline-block w-full relative`}
                              onChange={formik.handleChange}
                              value={formik.values.received_quantity}
                            />

                            <p className='text-red-500 text-xs '>
                              {formik.touched.received_quantity &&
                              formik.errors.received_quantity
                                ? formik.errors.received_quantity
                                : null}
                            </p>
                          </div>
                        </div>

                        <div className=' form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                          <div className='px-4 w-full mb-4'>
                            <label
                              className={`${labelStyle} inline-block mb-2`}
                            >
                              Remaining Quantity
                            </label>

                            <input
                              type='number'
                              name='remaining_quantity'
                              disabled
                              className={`${inputStyle} inline-block w-full relative`}
                              onChange={formik.handleChange}
                              value={formik.values.remaining_quantity}
                            />

                            <p className='text-red-500 text-xs '>
                              {formik.touched.remaining_quantity &&
                              formik.errors.remaining_quantity
                                ? formik.errors.remaining_quantity
                                : null}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className='space-x-5 flex justify-end mr-[3rem]'>
                        <button
                          className={buttonStyle}
                          onClick={() => {
                            setCancelModal(true);
                          }}
                        >
                          Cancel
                        </button>

                        <button className={buttonStyle2} type='submit'>
                          Conitnue
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
          {/* {page == "outbox" && ( */}
          <div className='space-x-5 flex justify-between mt-[1rem]'>
            <div className=''>
              <button
                className={buttonStyle2}
                onClick={() => {
                  navigate(-1);
                }}
              >
                Back
              </button>
            </div>
            <div className=''>
              {page == "outbox" && (
                <button onClick={handlePrint} className={`${buttonStyle}`}>
                  Print
                </button>
              )}
              {/* {page == "inbox" && (
                <button className={`${buttonStyle}`}>Submit</button>
              )} */}
            </div>
          </div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default ViewReceivedInvtByIdDa;
