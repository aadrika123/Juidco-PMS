//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash Alam
//    Version - 1.0
//    Date - 24/05/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - ViewReceivedInvtByIdDa
//    DESCRIPTION - ViewReceivedInvtByIdDa
//////////////////////////////////////////////////////////////////////////////////////

import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import toast from "react-hot-toast";
import { MdTag } from "react-icons/md";
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

const ViewReceivedInvtByIdDa = (props) => {
  const navigate = useNavigate();
  const { id, page } = useParams();
  console.log("param", id);

  console.log("page========>", page);

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
  const [preview, setPreview] = useState();
  const [imageUrl, setImageUrl] = useState("");

  const {
    api_fetchDaReceivedInvtDetailById,
    api_fetchDaReceivedInvtListOutboxId,
    api_postDaReceivedInvtDetail,
  } = ProjectApiList();

  const { inputStyle, labelStyle, headingStyle, formStyle } = ThemeStyle();

  // Accessing context for notifications
  const { titleBarVisibility } = useContext(contextVar);

  let buttonStyle =
    "  pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-indigo-500 text-sm leading-tight  rounded  hover:bg-indigo-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl";

  let buttonStyle2 =
    " mr-2 pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-white text-sm sm:text-sm leading-tight rounded  hover:bg-white  hover:text-indigo-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl bg-indigo-700";


    // const dateFunc = ()=>{
    //   let currDate = '2024-05-23T00:00:00.000Z'
    //   new date = currDate.split('T')[0];
    // }
    // console.log(dateFunc(date))

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
    total_quantity: applicationFullData?.total_quantity,
    received_quantity: "",
    remaining_quantity: "",
    date: "",
    // remark: "",
    // imageDoc: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log("click");
      console.log("Form Values ==============>>", values);
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
  };

  useEffect(() => {
    var ulbIds = localStorage.getItem("ulbId");
    setUlbId(ulbIds);
    // console.log(ulbId)
    getApplicationDetail();

    // dateFunc()
  }, []);

  ///////////{*** application view detail ***}/////////
  const getApplicationDetail = () => {
    let url;
    seterroState(false);
    setisLoading(true);

    if (page == "inbox") {
      url = api_fetchDaReceivedInvtDetailById;
    }
    if (page == "outbox") {
      url = api_fetchDaReceivedInvtListOutboxId;
    }

    AxiosInterceptors.get(`${url}/${id}`, {}, ApiHeader())
      .then(function (response) {
        console.log("view water tanker full details ...", response?.data?.data);
        if (response?.data?.status) {
          setapplicationFullData(response?.data?.data);
          // setTableData(response?.data?.data?.tran_dtls);
          setisLoading(false);
        } else {
          // toast.error("Error while getting details...");
          seterroState(true);
        }
      })
      .catch(function (error) {
        console.log("==2 details by id error...", error);
        // toast.error("Error while getting details...");
        seterroState(true);
        setisLoading(false);
      });
  };

  //cal remaining quantity and managing rec quantity validation
  const remainingQuanityCalc = (receivedQuantity) => {
    let recQuantity;

    //setting received quantity
    receivedQuantity && (recQuantity = Number(receivedQuantity) || 0);

    const recQuantityValueRange =
      applicationFullData?.total_quantity -
      applicationFullData?.total_receivings;
    if (receivedQuantity <= recQuantityValueRange) {
      formik.setFieldValue("received_quantity", receivedQuantity);

      const remQuantityValue =
        applicationFullData?.total_quantity -
        (applicationFullData?.total_receivings + Number(receivedQuantity));
      // console.log(remQuantityValue,"remQuantityValue",applicationFullData?.total_quantity,"applicationFullData?.total_quantity",applicationFullData?.total_receivings,"applicationFullData?.total_receivings",receivedQuantity,"receivedQuantity")

      formik.setFieldValue("remaining_quantity", remQuantityValue);
    } else {
      toast.error("Received Quantity should not exceed the total quantity");
      formik.setFieldValue("received_quantity", 0);
      formik.setFieldValue("remaining_quantity", 0);
    }
    // const remaining = formik.values.total_quantity - recQuantity;
    // formik.setFieldValue("", remaining);
  };

  //post received inventory details----------
  const postReceivedInventoryDetails = () => {
    setisLoading(true);

    let body = {
      ...formData,
      img: imageDoc,
      // remarks,
      order_no: applicationFullData?.order_no,
      ulb_id: ulbId,
    };
    let formDataPayload = new FormData();

    for (let key in body) {
      formDataPayload.append(key, body[key]);
    }
    console.log(body, "payload for post inventory details");
    // console.log(api_postDaReceivedInvtDetail, "URL for post inventory details");

    //headers for file data format
    let token2 = window.localStorage.getItem("token");
    const header = {
      timeout: 60000,
      headers: {
        Authorization: `Bearer ${token2}`,
        Accept: "multipart/form-data",
        "Content-Type": "multipart/form-data",
        "API-KEY": "eff41ef6-d430-4887-aa55-9fcf46c72c99",
      },
    };

    AxiosInterceptors.post(
      `${api_postDaReceivedInvtDetail}`,
      formDataPayload,
      header
    )
      .then(function (response) {
        console.log("Received Inventory details submitted", response?.data);
        console.log(response?.data?.st, "upper Status");
        if (response?.data?.status == true) {
          setisLoading(false);
          toast.success(response?.data?.message, "success");
          setTimeout(() => {
            navigate("/da-received-inventory");
          }, 1000);
        } else {
          setisLoading(false);
          const errorMsg = Object.keys(response?.data?.data);
          setErrRes(errorMsg);
          toast(response?.data?.message, "error");
        }
      })
      .catch(function (error) {
        toast.error("Something wrong happened")
        console.log("errorrr.... ", error);
      });
  };

  if (isModalOpen) {
    return (
      <>
        <ReceivedInvtSubmittedScreen
          submitFunc={postReceivedInventoryDetails}
          setRemark={setRemark}
          setFormData={setFormData}
          setImageDoc={setImageDoc}
          setIsModalOpen={setIsModalOpen}
          // preview={preview}
          // setPreview={setPreview}
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

 

  // console.log(applicationFullData?.total_quantity);
  console.log(applicationFullData?.receivings);
  // console.log(ulbId)


  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <div className=''>
        <TitleBar
          titleBarVisibility={titleBarVisibility}
          titleText={"Inventory Details"}
        />
      </div>
      <div className=''>
        {/* Basic Details */}
        <div className='mt-6' id="printable-content">
          {/* <div className='flex justify-between mt-2 bg-white rounded-lg shadow-xl p-4 border border-blue-600 '>
            <h2 className='font-semibold text-xl flex justify-start'>
              <MdTag className='inline pt-1 text-[1.5rem] text-sky-700' /> View
              Procurement Request{" "}
            </h2>
          </div> */}
          <div className='py-6 mt-4 bg-white rounded-lg shadow-xl p-4 space-y-5 border border-blue-600 ' >
          <div className="">
          <h2 className='font-semibold text-2xl pl-7 pb-2 pt-2 flex justify-start'>
              {/* <MdTag className=' text-[2rem] text-sky-700' />  */}
              View Procurement Request{" "}
            </h2>
          </div>
            <div className='pl-8 text-[1rem] text-[#4338CA]'>
              <h1 className=''>
                Procurement Request No <span className='text-black'>:</span>
                <span className='font-bold'>
                  {" "}
                  {nullToNA(applicationFullData?.order_no)}
                </span>
              </h1>
            </div>

            {!applicationFullData?.remark?.length == 0 && (
              <div className='pb-5 pl-8'>
                <h1 className='font-bold text-base text-red-500'>
                  Remark <span className='text-black'>:</span>
                  <span className='text-sm pt-2 font-light text-red-500'>
                    {" "}
                    {nullToNA(applicationFullData?.remark)}
                  </span>
                </h1>
              </div>
            )}

            <div className='grid grid-cols-4 gap-4 ml-8'>
              {/* {applicationFullData?.category?.name == ("Uniforms" || "Maintainance and Repaire" || "Safety and Security" ||"Cleaning Supplies" || "Furniture") &&  */}

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>
                  {nullToNA(
                    applicationFullData?.pre_procurement?.category?.name
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

              {/* </div> */}

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

              {/* </div> */}

              {/* <div className='flex md:flex-row flex-col gap-y-2 md:space-x-5 pl-4  '> */}

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

              {/* </div> */}

              {/* <div className='flex md:flex-row flex-col gap-y-2 md:space-x-5 pl-4  '> */}

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-semibold '>
                  {nullToNA(applicationFullData?.pre_procurement?.rate)}
                </div>
                <div className='md:w-auto w-[50%] text-gray-500 text-sm'>
                  Rate
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

              {/* </div> */}

              {/* <div className='flex md:flex-row flex-col gap-y-2 md:space-x-5 pl-4  '> */}

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

          {/* Additional Details */}

          <div className='py-6 mt-8 bg-white rounded-lg shadow-xl p-4 space-y-5 border border-blue-500 '>
            <div className=' ml-1 p-2'>
              <h1
                className={`${headingStyle} text-[1.5rem] text-left pb-2 pl-6`}
              >
                Additional Details
              </h1>
            </div>

            <div className='grid grid-cols-4 gap-4 ml-9'>
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
                  GST No
                </div>
              </div>

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
                  {nullToNA(applicationFullData?.gst)}
                </div>
                <div className='md:w-auto w-[50%] text-gray-500 text-sm'>
                  GST %
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
                  {nullToNA(applicationFullData?.total_quantity)}
                </div>
                <div className='md:w-auto w-[50%] text-gray-500 text-sm'>
                  Total Quantity
                </div>
              </div>

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>
                  {applicationFullData?.total_receivings ? applicationFullData?.total_receivings : 0}
                </div>
                <div className='md:w-auto w-[50%] text-gray-500 text-sm'>
                  Total Received Items
                </div>
              </div>

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>
                  {nullToNA(applicationFullData?.unit_price)}
                </div>
                <div className='md:w-auto w-[50%] text-gray-500 text-sm'>
                  Unit Price
                </div>
              </div>

              <div className='h-[40px]'></div>
            </div>
          </div>

          {/* Receiving No */}

          {page == "outbox" && (
            <div className='mt-8 '>
              <Accordion>
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

                  <div class='relative overflow-x-auto'>
                    <table class='w-full text-sm text-left rtl:text-right'>
                      <thead class='text-xs uppercase bg-gray-200'>
                        <tr>
                          <th scope='col' class='px-6 py-3'>
                            Date
                          </th>
                          <th scope='col' class='px-6 py-3'>
                            Receiving no
                          </th>
                          <th scope='col' class='px-6 py-3'>
                            Total Quantity
                          </th>
                          <th scope='col' class='px-6 py-3'>
                            Received Quantity
                          </th>
                          <th scope='col' class='px-6 py-3'>
                            View Doc
                          </th>

                          <th scope='col' class='px-6 py-3'>
                            Remaining Quantity
                          </th>
                          <th scope='col' class='px-6 py-3'>
                            Remark
                          </th>
                        </tr>
                      </thead>
                      {applicationFullData?.receivings.map((data) => (
                        <tbody>
                          <tr class='bg-white border-b-2'>
                            
                            {/* <td class='px-6 py-4'>{data?.date}</td> */}
                            <td class='px-6 py-4'>{data?.date.split('T')[0].split('-').reverse().join('-')}</td>

                            <td class='px-6 py-4'>{data?.receiving_no}</td>
                            <td class='px-6 py-4'>
                              {applicationFullData?.total_quantity}
                            </td>
                            <td class='px-6 py-4'>{data?.received_quantity}</td>
                            <td class='px-6 py-4'>
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
                            <td class='px-6 py-4'>
                              {data?.remaining_quantity}
                            </td>
                            <td class='px-6 py-4'>
                              {data?.remark}
                            </td>
                          </tr>
                        </tbody>
                      ))}

                      <tfoot>
                        <tr class='font-semibold text-gray-900 dark:text-white'>
                          <th scope='row' class='px-6 py-3 text-base'>
                            Total
                          </th>
                          <td class='px-6 py-3'>3</td>
                          <td class='px-6 py-3'>21,000</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  {/* table */}
                </AccordionDetails>
              </Accordion>
            </div>
          )}

          {/* Additional Details */}

          {page == "outbox" && (
            <div className='py-6 mt-8 bg-white rounded-lg shadow-xl p-4 space-y-5 border border-blue-500 '>
              <div className=' ml-1 p-2'>
                <h1
                  className={`${headingStyle} text-[1.5rem] text-left pb-2 pl-6`}
                >
                  Received Inventory
                </h1>
              </div>

              <div className='grid grid-cols-4 gap-4 ml-8'>
                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-bold '>
                    {/* {nullToNA(applicationFullData?.category.name)} */}
                    123
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-500 text-sm'>
                    Total Quantity
                  </div>
                </div>

                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-bold '>
                    {/* {nullToNA(applicationFullData?.pre_procurement?.category?.name)} */}
                    123
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-500 text-sm'>
                    Total Received Quantity
                  </div>
                </div>

                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-bold '>
                    {/* {nullToNA(applicationFullData?.pre_procurement?.category?.name)} */}
                    123
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-500 text-sm'>
                    Total Remaining Quantity
                  </div>
                </div>

                <div className='h-[30px]'></div>
              </div>
            </div>
          )}

          {/* Received Details form */}

          {page != "outbox" &&
            applicationFullData?.total_quantity !==
              (applicationFullData?.total_receivings || null) && (
              <div className={`${formStyle} mt-8 border border-blue-600`}>
                <form onSubmit={formik.handleSubmit} onChange={handleOnChange}>
                  <div className=''>
                    <div className=' grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 container mx-auto capitalize'>
                      <div className='col-span-12  w-full mb-20'>
                        <div className=' ml-4 p-2 mt-4'>
                          <h1 className={`${headingStyle} text-left pb-5 pl-6`}>
                            Received Inventory
                          </h1>
                        </div>
                        <div className='p-12 -mt-4 valid-form flex flex-wrap flex-row -mx-8'>
                          <div className='form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                            <div class='px-4 w-full mb-4'>
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
                            <div class='px-4 w-full mb-4'>
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
                                max={new Date().toISOString().split("T")[0]}                              />

                              <p className='text-red-500 text-xs '>
                                {formik.touched.date && formik.errors.date
                                  ? formik.errors.date
                                  : null}
                              </p>
                            </div>
                          </div>

                          <div className=' form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                            <div class='px-4 w-full mb-4'>
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
                            <div class='px-4 w-full mb-4'>
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

                          <button className={buttonStyle2} onClick=''>
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
            <div className='space-x-5 flex justify-end mt-[1rem]'>

            <button onClick={handlePrint} className={`${buttonStyle}`} >Print</button>

              <button
                className={buttonStyle2}
                onClick={() => {
                  navigate(-1);
                }}
              >
                Back
              </button>
            </div>
          {/* )} */}

            
        </div>
      </div>
    </div>
  );
};

export default ViewReceivedInvtByIdDa;
