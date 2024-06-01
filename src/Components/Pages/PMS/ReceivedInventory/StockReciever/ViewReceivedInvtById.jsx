//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash Alam
//    Version - 1.0
//    Date - 23/05/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - SRPostProcurementCancelScreen
//    DESCRIPTION - SRPostProcurementCancelScreen
//////////////////////////////////////////////////////////////////////////////////////

import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  InputLabel,
  NativeSelect,
  Select,
  MenuItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { nullToNA } from "@/Components/Common/PowerUps/PowerupFunctions";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ProjectApiList from "@/Components/api/ProjectApiList";
import ApiHeader from "@/Components/api/ApiHeader";
import toast from "react-hot-toast";
import ThemeStyle from "@/Components/Common/ThemeStyle";
import { useFormik } from "formik";
import * as yup from "yup";
import ReceivedInvtSubmittedScreen from "./REceivedInvtSubmittedScreen";
import SRPostProcurementCancelScreen from "./SRPostProcurementCancelScreen";
import { contextVar } from "@/Components/context/contextVar";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import DeadStockUploadImg from "./DeadStockUploadImg";
import { allowNumberInput } from "@/Components/Common/PowerUps/PowerupFunctions";
import ImageModal from "@/Components/Pages/Others/ImageModal/ImageModal";
import ApiHeader2 from "@/Components/api/ApiHeader2";
import FileButton from "@/Components/Common/FileButtonUpload/FileButton";
import ImageDisplay from "@/Components/Common/FileButtonUpload/ImageDisplay";

const ViewReceivedInvtById = (props) => {
  const navigate = useNavigate();
  const deadStockRef = useRef();
  const { id, page } = useParams();
  console.log("param", id);

  console.log("page========>", page);

  const [erroState, seterroState] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [applicationFullData, setapplicationFullData] = useState();
  const [tableData, setTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [deadStockImg, setDeadStockImg] = useState(false);
  const [payload, setPayload] = useState({});
  const [imageDoc, setImageDoc] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [imageModal, setImageModal] = useState();
  const [preview, setPreview] = useState();
  const [categoryId, setCategoryId] = useState();
  const [subCategoryId, setSubCategoryId] = useState();
  const [brandId, setBrandId] = useState();
  const [inventoryData, setInventoryData] = useState();

  const [inventory, setInventory] = useState("");

  const handleChange = (event) => {
    setInventory(event.target.value);
  };

  const {
    api_fetchSrReceivedInvtListInbox,
    api_fetchSrReceivedInvtListOutbox,
    api_postSrAddInvt,
    api_fetchSrInvtDetailsList,
  } = ProjectApiList();

  const { inputStyle, labelStyle, headingStyle, formStyle } = ThemeStyle();

  // Accessing context for notifications
  const { titleBarVisibility } = useContext(contextVar);

  let buttonStyle =
    "pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-indigo-500 text-md leading-tight  rounded  hover:bg-indigo-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl";

  let buttonStyle2 =
    "mr-2 pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-white text-md sm:text-md leading-tight rounded  hover:bg-white  hover:text-indigo-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out shadow-xl bg-[#4338CA]";

  ///////////{*** APPLICATION FULL DETAIL ***}/////////
  const getApplicationDetail = () => {
    let url;
    seterroState(false);
    setisLoading(true);

    if (page == "inbox") {
      url = api_fetchSrReceivedInvtListInbox;
    }
    if (page == "outbox") {
      url = api_fetchSrReceivedInvtListOutbox;
    }

    AxiosInterceptors.get(`${url}/${id}`, ApiHeader())
      .then(function (response) {
        console.log("view sr rec-inv id details ...", response?.data?.data);
        if (response?.data?.status) {
          setapplicationFullData(response?.data?.data);
          // setCategoryId(applicationFullData?.category?.id)
          // setSubCategoryId(applicationFullData?.subcategory?.id)
          // setBrandId(applicationFullData?.brand?.id)
          getInventoryDetail(
            response?.data?.data?.category?.id,
            response?.data?.data?.subcategory?.id,
            response?.data?.data?.brand?.id
          );
          setTableData(response?.data?.data?.tran_dtls);
          setisLoading(false);
        } else {
          toast.error("Error while getting details...");
          seterroState(true);
        }
      })
      .catch(function (error) {
        console.log("==2 details by id error...", error);
        toast.error("Error while getting details...");
        seterroState(true);
        setisLoading(false);
      });
  };

  // console.log(applicationFullData)
  // console.log(applicationFullData?.category?.id)
  // console.log(applicationFullData?.subcategory?.id)
  // console.log(applicationFullData?.brand?.id)
  ///////////{*** PREVIOUS INVENTORY DETAIL ***}/////////
  const getInventoryDetail = (category, subcategory, brand) => {
    let url = api_fetchSrInvtDetailsList;

    seterroState(false);
    setisLoading(true);

    AxiosInterceptors.get(
      `${url}?category=${category}&scategory=${subcategory}&brand=${brand}`,
      // {category: categoryId, scategory: subCategoryId, brand: brandId},
      ApiHeader()
    )
      .then(function (response) {
        console.log("view sr rec-inv id details ...", response?.data?.data);
        if (response?.data?.status) {
          setInventoryData(response?.data?.data);
          setTableData(response?.data?.data?.tran_dtls);
          setisLoading(false);
        } else {
          toast.error("Error while getting details...");
          seterroState(true);
        }
      })
      .catch(function (error) {
        console.log("==2 details by id error...", error);
        toast.error("Error while getting details...");
        seterroState(true);
        setisLoading(false);
      });
  };

  const postAddtoInventory = () => {
    setisLoading(true);
    if (
      (formik.values.dead_stock != 0 || formik.values.dead_stock != "") &&
      (imageDoc == "undefined" || imageDoc == null)
    ) {
      return toast.error("Please upload dead stock image");
    }

    console.log(imageDoc, "imageDoc======>>>");

    let body = {
      ...payload,
      procurement_no: applicationFullData?.procurement_no,
      img: imageDoc,
    };

    let formDataPayload = new FormData();

    for (let key in body) {
      formDataPayload.append(key, body[key]);
    }

    // //headers for file data format
    // let token2 = window.localStorage.getItem("token");
    // const header = {
    //   timeout: 60000,
    //   headers: {
    //     Authorization: `Bearer ${token2}`,
    //     Accept: "multipart/form-data",
    //     "Content-Type": "multipart/form-data",
    //     "API-KEY": "eff41ef6-d430-4887-aa55-9fcf46c72c99",
    //   },
    // };

    AxiosInterceptors.post(
      `${api_postSrAddInvt}`,
      formDataPayload,
      ApiHeader2()
    )
      .then(function (response) {
        console.log("Added to inventory", response?.data);
        console.log(response?.data?.st, "upper Status");
        if (response?.data?.status == true) {
          setisLoading(false);
          toast.success(response?.data?.message, "success");
          setTimeout(() => {
            navigate("/sr-received-inventory");
          }, 1000);
        } else {
          setisLoading(false);
          const errorMsg = Object.keys(response?.data?.data);
          setErrRes(errorMsg);
          toast(response?.data?.message, "error");
        }
      })
      .catch(function (error) {
        setisLoading(false);
        toast.error("Something went wrong", "error");
        console.log("errorrr.... ", error);
      });
  };

  const validationSchema = yup.object({
    totalStock: yup.number().required("Total Stock is required"),
    receivedStock: yup.number(),
    remarks: yup.string().required("Remarks is required"),
    remStock: yup.number().required("Remaining Stock is required"),
    dead_stock: yup.number(),
  });

  // intitial value
  const initialValues = {
    totalStock: applicationFullData?.post_procurement?.total_quantity,
    receivedStock: applicationFullData?.total_receivings || 0,
    remarks: "",
    remStock: applicationFullData?.total_remaining,
    dead_stock: "",
    invtDetails: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      //validation for dead stock image
      if (
        (formik.values.dead_stock != 0 || formik.values.dead_stock != "") &&
        (imageDoc == "undefined" || imageDoc == null || imageDoc == "")
      ) {
        return toast.error("Please upload dead stock image");
      }

      console.log("procurement==============>>", values);
      setIsModalOpen(true);
      setPayload(values);
    },
    validationSchema,
  });

  const calculateRemainingStock = (deadStockValue) => {
    let deadStock = Number(deadStockValue);

    if (deadStock > applicationFullData?.post_procurement?.total_quantity) {
      formik.setFieldValue("dead_stock", 0);

      return toast.error("Dead Stock must not exceed total quantity");
    }
    console.log(deadStock, "deadStock====>");

    if (deadStock != ("" || null)) {
      let remaining =
        applicationFullData?.post_procurement?.total_quantity -
        (formik.values.receivedStock - deadStock);

      formik.setFieldValue("remStock", remaining);
    }
  };

  const handleOnChange = (e) => {
    // console.log("target type", e.target.type);
    // console.log("check box name", e.target.name);

    let name = e.target.name;
    let value = e.target.value;

    console.log("target value checked", e.target.checked);

    {
      name == "totalStock" &&
        formik.setFieldValue(
          "totalStock",
          allowNumberInput(value, formik.values.quantity, 100)
        );
    }
    {
      name == "receivedStock" &&
        formik.setFieldValue(
          "receivedStock",
          allowNumberInput(value, formik.values.rate, 100)
        );
    }
    {
      name == "remStock" &&
        formik.setFieldValue(
          "remStock",
          allowNumberInput(value, formik.values.totalRate, 100)
        );
    }
    {
      name == "dead_stock" && calculateRemainingStock(value);
    }
  };

  useEffect(() => {
    getApplicationDetail();
    getInventoryDetail();
    // calculateRemainingStock(formik.values.dead_stock);
  }, []);

  if (isModalOpen) {
    return (
      <>
        <ReceivedInvtSubmittedScreen
          postAddtoInventory={postAddtoInventory}
          setIsModalOpen={setIsModalOpen}
        />
      </>
    );
  }

  if (cancelModal) {
    return (
      <>
        <SRPostProcurementCancelScreen setCancelModal={setCancelModal} />
      </>
    );
  }

  if (deadStockImg) {
    return (
      <>
        <DeadStockUploadImg
          postAddtoInventory={postAddtoInventory}
          imageDoc={imageDoc}
          setImageDoc={setImageDoc}
          setDeadStockImg={setDeadStockImg}
        />
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

  const handlePrint = () => {
    window.print();
  };

  console.log(inventoryData);

  return (
    <div>
      <div className=''>
        <TitleBar
          titleBarVisibility={titleBarVisibility}
          titleText={"Inventory Proposal Details"}
        />
      </div>
      <div className='' id='printable-content'>
        {/* Basic Details */}
        <div className='mt-6'>
          <div className='py-6 mt-4 bg-white rounded-lg shadow-xl p-4 space-y-5 border border-blue-500'>
            <div className=''>
              <h2 className='font-semibold text-2xl pl-7 pt-2 pb-2 flex justify-start bg-[#4338ca] text-white rounded-md'>
                View Procurement Request{" "}
              </h2>
            </div>

            <div className='pl-8 pb-5 text-[1.2rem] text-[#4338CA]'>
              <h1 className='font-bold'>
                Procurement Request No <span className='text-black'>:</span>
                <span className='font-light'>
                  {" "}
                  {nullToNA(applicationFullData?.procurement_no)}
                </span>
              </h1>
            </div>

            {!applicationFullData?.remark?.length == 0 && (
              <div className='pb-5 pl-8'>
                <h1 className='font-bold text-base text-red-500'>
                  Remark <span className='text-black'>:</span>
                  <span className='text-md pt-2 font-light text-red-500'>
                    {" "}
                    {nullToNA(applicationFullData?.remark)}
                  </span>
                </h1>
              </div>
            )}

            <div className='grid md:grid-cols-4 gap-4 ml-8'>
              <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>
                  Item Category
                </div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(applicationFullData?.category?.name)}
                </div>
              </div>

              <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>
                  Item Sub Category
                </div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(applicationFullData?.subcategory?.name)}
                </div>
              </div>

              <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>Brand</div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(applicationFullData?.brand?.name)}
                </div>
              </div>

              <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>Quantity</div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(applicationFullData?.quantity)}
                </div>
              </div>

              <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>Total Rate</div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(applicationFullData?.total_rate)}
                </div>
              </div>
            </div>

            <div className='p-5 pl-8'>
              <h1 className='font-bold '>Description</h1>
              <p className=' pt-2'>
                {nullToNA(applicationFullData?.description)}
              </p>
            </div>

            <div className='h-[30px]'></div>
          </div>

          <div className='py-6 mt-8 bg-white rounded-lg shadow-xl p-4 space-y-5 border border-blue-500 '>
            <div className=''>
              <h2 className='font-semibold text-2xl pl-7 pt-2 pb-2 flex justify-start bg-[#4338ca] text-white rounded-md'>
                Supplier Details
              </h2>
            </div>

            <div className='grid md:grid-cols-4 gap-4 ml-9'>
              <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>
                  Supplier Name
                </div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(
                    applicationFullData?.post_procurement?.supplier_name
                  )}
                </div>
              </div>

              <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>GST No</div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(applicationFullData?.post_procurement?.gst_no)}
                </div>
              </div>

              <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>Final Rate</div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(applicationFullData?.post_procurement?.final_rate)}
                </div>
              </div>

              <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>GST %</div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(applicationFullData?.post_procurement?.gst)}
                </div>
              </div>

              <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>Total Price</div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(applicationFullData?.post_procurement?.total_price)}
                </div>
              </div>

              <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>
                  Total Quantity
                </div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(
                    applicationFullData?.post_procurement?.total_quantity
                  )}
                </div>
              </div>

              <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>
                  Total Received Items
                </div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {applicationFullData?.total_receivings
                    ? applicationFullData?.total_receivings
                    : 0}
                </div>
              </div>

              <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>Unit Price</div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(applicationFullData?.post_procurement?.unit_price)}
                </div>
              </div>

              <div className='h-[40px]'></div>
            </div>
          </div>

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
                  {!applicationFullData?.receivings?.length ? (
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
                            <th scope='col' className='px-6 py-3'>
                              Total Quantity
                            </th>
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
                              <td className='px-6 py-4'>
                                {
                                  applicationFullData?.post_procurement
                                    ?.total_quantity
                                }
                              </td>
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

          {/* Inventory Details form */}

          {page == "inbox" && (
            <div className={`${formStyle} mt-8 border border-blue-500`}>
              <form onSubmit={formik.handleSubmit} onChange={handleOnChange}>
                <div className=''>
                  <div className=' grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 container mx-auto capitalize'>
                    <div className='col-span-12  w-full mb-20'>
                      <div className=' ml-4 p-2 mt-4'>
                        <h1
                          className={`${headingStyle} text-left p-2 pl-6 bg-[#4338ca] text-white rounded-md`}
                        >
                          Inventory Details
                        </h1>
                      </div>

                      <div className='p-12 -mt-4 valid-form flex flex-wrap flex-row -mx-4'>
                        <div className='form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                          <div class='px-4 w-full mb-4'>
                            <label
                              className={`${labelStyle} inline-block mb-2`}
                            >
                              Total Stock
                            </label>

                            <input
                              disabled
                              name='totalStock'
                              className={`${inputStyle} inline-block w-full relative`}
                              onChange={formik.handleChange}
                              value={formik.values.totalStock}
                            />

                            <p className='text-red-500 text-xs '>
                              {formik.touched.totalStock &&
                              formik.errors.totalStock
                                ? formik.errors.totalStock
                                : null}
                            </p>
                          </div>
                        </div>

                        <div className=' form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                          <div class='px-4 w-full mb-4'>
                            <label
                              className={`${labelStyle} inline-block mb-2`}
                            >
                              Received Stock
                            </label>

                            <input
                              name='receivedStock'
                              disabled
                              className={`${inputStyle} inline-block w-full relative`}
                              onChange={formik.handleChange}
                              value={formik.values.receivedStock}
                            />

                            <p className='text-red-500 text-xs '>
                              {formik.touched.receivedStock &&
                              formik.errors.receivedStock
                                ? formik.errors.receivedStock
                                : null}
                            </p>
                          </div>
                        </div>

                        <div className=' form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                          <div class='px-4 w-full mb-4'>
                            <label
                              className={`${labelStyle} inline-block mb-2`}
                            >
                              Remaining Stock
                            </label>

                            <input
                              disabled
                              name='remStock'
                              className={`${inputStyle} inline-block w-full relative`}
                              onChange={formik.handleChange}
                              value={formik.values.remStock}
                            />

                            <p className='text-red-500 text-xs '>
                              {formik.touched.remStock && formik.errors.remStock
                                ? formik.errors.remStock
                                : null}
                            </p>
                          </div>
                        </div>

                        <div className='relative form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                          <div className='form-group flex-shrink max-w-full px-4 w-full mb-4'>
                            <label
                              className={`${labelStyle} inline-block mb-2`}
                            >
                              Previous Inventory
                            </label>
                            <select
                              // {...formik.getFieldProps("itemsubcategory")}
                              className={`${inputStyle} inline-block w-full relative`}
                              onChange={formik.handleChange}
                              value={formik.values.dead_stock}
                            />
                            {formik.values.dead_stock > 0 && (
                              <div className='absolute left-[63%] top-[37px] w-full'>
                                <FileButton
                                  btnLabel={"Upload Reference Image"}
                                  bg={"[#4338CA]"}
                                  textColor={"white"}
                                  imgRef={deadStockRef}
                                  hoverBg={"bg-blue-800"}
                                  setImageDoc={setImageDoc}
                                  setPreview={setPreview}
                                />
                              </div>
                            )}

                            <p className='text-red-500 text-xs '>
                              {formik.touched.dead_stock &&
                              formik.errors.dead_stock
                                ? formik.errors.dead_stock
                                : null}
                            </p>
                          </div>
                        </div>

                        <div className='relative form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                          <div class=' relative px-4 w-full mb-4'>
                            <label
                              className={`${labelStyle} inline-block mb-2`}
                            >
                              Dead Stock
                            </label>

                            <input
                              name='dead_stock'
                              className={`${inputStyle} inline-block w-full`}
                              onChange={formik.handleChange}
                              value={formik.values.dead_stock}
                            />
                            {formik.values.dead_stock > 0 && (
                              <div className='absolute left-[63%] top-[37px] w-full'>
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
                            )}

                            <p className='text-red-500 text-xs '>
                              {formik.touched.dead_stock &&
                              formik.errors.dead_stock
                                ? formik.errors.dead_stock
                                : null}
                            </p>
                          </div>
                          <div></div>
                        </div>

                        <div className='form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                          {/* <div className=''> */}
                          <div className='w-20 mt-5'>
                            <ImageDisplay
                              preview={preview}
                              imageDoc={imageDoc}
                              alt={"Dead Stock Image"}
                              showPreview={"hidden"}
                              disabled
                            />
                          </div>
                          {/* </div> */}
                        </div>

                        <div className='form-group flex-shrink max-w-full px-4 w-full md:w-full mb-4'>
                          <label className={`${labelStyle} inline-block mb-2`}>
                            Remarks
                          </label>
                          <textarea
                            type='text'
                            name='remarks'
                            className={`${inputStyle} inline-block w-full relative h-20`}
                            onChange={formik.handleChange}
                            value={formik.values.remarks}
                          />

                          <p className='text-red-500 text-xs '>
                            {formik.touched.remarks && formik.errors.remarks
                              ? formik.errors.remarks
                              : null}
                          </p>
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
                          Add To Inventory
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
            {page == "outbox" && (
              <button onClick={handlePrint} className={`${buttonStyle}`}>
                Print
              </button>
            )}

            <button
              className={buttonStyle2}
              onClick={() => {
                navigate(-1);
              }}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewReceivedInvtById;
