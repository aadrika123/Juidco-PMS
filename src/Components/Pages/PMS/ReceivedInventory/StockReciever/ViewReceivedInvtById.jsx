//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash Alam
//    Version - 1.0
//    Date - 23/05/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - ViewReceivedInvtById
//    DESCRIPTION - ViewReceivedInvtById
//////////////////////////////////////////////////////////////////////////////////////

import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
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
import LoaderApi from "@/Components/Common/Loaders/LoaderApi";
import { indianAmount } from "@/Components/Common/PowerupFunctions";
import { IoMdAddCircleOutline } from "react-icons/io";

const ViewReceivedInvtById = () => {
  const navigate = useNavigate();
  const deadStockRef = useRef();
  const { id, page } = useParams();

  const [erroState, seterroState] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [applicationFullData, setapplicationFullData] = useState();
  const [inventoryAddData, setInventoryAddData] = useState();
  const [tableData, setTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [deadStockImg, setDeadStockImg] = useState(false);
  const [payload, setPayload] = useState({});
  const [imageDoc, setImageDoc] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [imageModal, setImageModal] = useState();
  const [preview, setPreview] = useState();
  const [inventoryData, setInventoryData] = useState();
  const [product, setProduct] = useState([{ quantity: 1, serial_no: "" }]);
  const [procurement_stock_id, setProcurement_stock_id] = useState("");
  const [brand, setBrandName] = useState("");
  const [warrantyClaim, setWarrantyClaim] = useState(false);
  const [totSum, setTotSum] = useState(0);

  const [inventory, setInventory] = useState("");

  const inventoryHisHandler = (event) => {
    setInventory(event.target.value);
  };

  const {
    api_fetchPostProcurementDetailSupplierbyId,
    api_fetchSrInvtDetailsList,
    api_postSrAddProduct,
    api_postSrAddInvt,
    api_invtAddDetails,
  } = ProjectApiList();

  const { inputStyle, labelStyle, formStyle } = ThemeStyle();

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
      url = api_fetchPostProcurementDetailSupplierbyId;
    }
    if (page == "outbox") {
      url = api_fetchPostProcurementDetailSupplierbyId;
    }

    AxiosInterceptors.get(`${url}/${id}`, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          setapplicationFullData(response?.data?.data);

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

  const getInventoryAddDetail = (id) => {
    let url = api_invtAddDetails;

    seterroState(false);
    setisLoading(true);

    AxiosInterceptors.get(`${url}/${id}`, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          setInventoryAddData(response?.data?.data);
          const sum =
            (response?.data?.data?.receiving?._sum?.received_quantity || 0) -
            (response?.data?.data?.product?.total_quantity || 0);
          setTotSum(sum);
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

  const getInventoryDetail = (category, subcategory) => {
    let url = api_fetchSrInvtDetailsList;

    seterroState(false);
    setisLoading(true);

    AxiosInterceptors.get(
      `${url}?category=${category}&scategory=${subcategory}`,
      ApiHeader()
    )
      .then(function (response) {
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

    let body = {
      ...payload,
      procurement_stock_id,
      procurement_no: applicationFullData?.procurement_no,
      img: imageDoc,
      warranty: warrantyClaim,
    };
    if (inventory != "") {
      body = { ...body, inventory };
    }

    let formDataPayload = new FormData();

    for (let key in body) {
      formDataPayload.append(key, body[key]);
    }
    AxiosInterceptors.post(
      `${api_postSrAddInvt}`,
      formDataPayload,
      ApiHeader2()
    )
      .then(function (response) {
        if (response?.data?.status == true) {
          toast.success(response?.data?.message, "success");
          setTimeout(() => {
            navigate("/ia-pre-inventory");
          }, 100);
        } else {
          const errorMsg = Object.keys(response?.data?.data);
          toast(response?.data?.message, "error");
        }
      })
      .catch(function (error) {
        toast.error("Something went wrong");
        console.log("errorrr.... ", error);
      })
      .finally(() => {
        setisLoading(false);
        setIsModalOpen(false);
      });
  };

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

      setIsModalOpen(true);
      setPayload(values);
    },
    // validationSchema,
  });

  const calculateRemainingStock = (deadStockValue) => {
    let deadStock = Number(deadStockValue);

    if (deadStock < 0) {
      formik.setFieldValue("dead_stock", 0);
      formik.setFieldValue("remStock", formik.values.remStock);
      toast.error("Dead stock cannot be negative");
      return;
    }

    if (deadStock > formik.values.receivedStock) {
      formik.setFieldValue("dead_stock", 0);
      return toast.error("Dead Stock must not exceed received quantity");
    }

    if (deadStock == "" || deadStock == null) {
      let remaining =
        Number(formik.values.totalStock) - Number(formik.values.receivedStock);

      formik.setFieldValue("remStock", remaining);
      return;
    }

    let remaining = Number(formik.values.remStock) + Number(deadStockValue);

    formik.setFieldValue("remStock", remaining);
  };

  const handleOnChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

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
    {
      name == "procurement_stock_id" && selectProcItem(value);
    }
  };

  // Select pRocurement Item
  const selectProcItem = (procId) => {
    setProcurement_stock_id(procId);
    const procItem = applicationFullData?.procurement_stocks?.find(
      (data) => data?.id === procId
    );

    // console.log(procItem);
    formik.setFieldValue("totalStock", procItem?.quantity);

    const filterredReceivings = applicationFullData?.receivings?.filter(
      (item) => item?.procurement_stock_id === procId
    );

    const total_received_stock = filterredReceivings.reduce(
      (total, item) => total + item?.received_quantity,
      0
    );
    getInventoryDetail(procItem?.category?.id, procItem?.subCategory?.id);
    const remaining = Number(procItem?.quantity) - Number(total_received_stock);
    formik.setFieldValue("receivedStock", total_received_stock);
    formik.setFieldValue("remStock", remaining);
  };

  const handlePrint = () => {
    window.print();
  };

  const addField = () => {
    setProduct((prev) => [...prev, { quantity: 1, serial_no: "" }]);
    // console.log(object)
  };

  const removeField = () => {
    setProduct((prev) => {
      const updatedProducts = [...prev]; // Create a shallow copy of the array
      updatedProducts.pop(); // Remove the last element from the copied array
      return updatedProducts; // Return the updated array to set the state
    });
  };

  const onchangeField = (e, index, field) => {
    const { name, value } = e.target;
    let temp = [...product];

    temp[index][field] = value;

    setProduct(temp);
  };

  const addProduct = () => {
    if (product.length > totSum) {
      return toast.error(
        "Number of Added Product can not exceed the number of received quantity."
      );
    }
    let url = api_postSrAddProduct;

    seterroState(false);
    setisLoading(true);

    AxiosInterceptors.post(
      `${url}`,
      {
        procurement_stock_id,
        brand,
        procurement_no: applicationFullData?.procurement_no,
        product,
      },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status) {
          toast.success("Added Successfully");
          setBrandName("");
          // setProcurement_stock_id("");
          setProduct([{ item: "", serial_no: "" }]);
          getApplicationDetail();
          getInventoryAddDetail(procurement_stock_id);
        } else {
          toast.error("Error while Adding the products");
          seterroState(true);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        console.log("err in adding products...", error);
        toast.error(
          error?.response?.data?.message || "Error in adding details"
        );
        seterroState(true);
        setisLoading(false);
      });
  };

  useEffect(() => {
    getApplicationDetail();
    // getInventoryDetail();
    // calculateRemainingStock(formik.values.dead_stock);
  }, []);

  if (isModalOpen) {
    return (
      <>
        <ReceivedInvtSubmittedScreen
          postAddtoInventory={postAddtoInventory}
          setIsModalOpen={setIsModalOpen}
          loader={isLoading}
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

  return (
    <div>
      {isLoading && <LoaderApi />}

      <div className=''>
        <TitleBar
          titleBarVisibility={titleBarVisibility}
          titleText={"Inventory Proposal Details"}
        />
      </div>

      {/* //timeline  */}
      {/* <div className={`${isLoading ? "blur-[2px]" : ""}`}>
        <TimeLine status={applicationFullData?.status} />
      </div> */}

      <div className='' id='printable-content'>
        {/* Basic Details */}
        <div className={`mt-6 ${isLoading ? "blur-[2px]" : ""}`}>
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

            <div className='flex justify-between w-full'>
              <div className='pl-8 text-[1rem] text-black flex justify-between w-full'>
                <h1 className=''>
                  Category <span className='text-black'>:</span>
                  <span className='font-bold'>
                    {" "}
                    {nullToNA(applicationFullData?.category?.name)}
                  </span>
                </h1>
              </div>

              {applicationFullData?.status == "5" && (
                <div className='pl-8 text-[1rem] text-black flex w-full justify-end'>
                  <h1 className='text-lg'>
                    Status <span className='text-black'>:</span>
                    <span className='font-bold'>
                      {" "}
                      {applicationFullData?.status == "7"
                        ? "All items added"
                        : "Partial Stocks added"}
                    </span>
                  </h1>
                </div>
              )}
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

                  <div className='md:flex-1 md:block col-span-4 mt-4 flex md:flex-row-reverse justify-between'>
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

          {applicationFullData?.is_rate_contract != true && (
            <div className='py-6 mt-8 bg-white rounded-lg shadow-xl p-4 space-y-5 border border-blue-500 '>
              <div className=''>
                <h2 className='font-semibold text-2xl pl-7 pt-2 pb-2 flex justify-start bg-[#4338ca] text-white rounded-md'>
                  Supplier Details
                </h2>
              </div>

              <div className='grid md:grid-cols-4 gap-4 ml-9'>
                {applicationFullData?.supplier_master.map((data) => (
                  <>
                    <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                      <div className='md:w-auto w-[50%] font-bold '>
                        Supplier Name
                      </div>
                      <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                        {nullToNA(data?.name)}
                      </div>
                    </div>

                    <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                      <div className='md:w-auto w-[50%] font-bold '>GST No</div>
                      <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                        {nullToNA(data?.gst_no)}
                      </div>
                    </div>

                    <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                      <div className='md:w-auto w-[50%] font-bold '>Pan No</div>
                      <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                        {nullToNA(data?.pan_no)}
                      </div>
                    </div>

                    <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                      <div className='md:w-auto w-[50%] font-bold '>
                        Address
                      </div>
                      <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                        {nullToNA(data?.address)}
                      </div>
                    </div>

                    <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                      <div className='md:w-auto w-[50%] font-bold '>
                        Bank Name
                      </div>
                      <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                        {nullToNA(data?.bank_name)}
                      </div>
                    </div>

                    <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                      <div className='md:w-auto w-[50%] font-bold '>
                        Account No
                      </div>
                      <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                        {nullToNA(data?.account_no)}
                      </div>
                    </div>

                    <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                      <div className='md:w-auto w-[50%] font-bold '>IFSC</div>
                      <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                        {nullToNA(data?.ifsc)}
                      </div>
                    </div>
                  </>
                ))}

                <div className='h-[40px]'></div>
              </div>
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
                  {!applicationFullData?.receivings?.length ? (
                    <p className='font-semibold p-4'>No Data Found</p>
                  ) : (
                    <div className='relative overflow-x-auto'>
                      <table className='w-full text-md text-left rtl:text-right'>
                        <thead className='text-xs uppercase bg-gray-200'>
                          <tr>
                            <th scope='col' className='px-10 py-3'>
                              Date
                            </th>
                            <th scope='col' className='px-6 py-3'>
                              Receiving no
                            </th>
                            <th scope='col' className='px-6 py-3'>
                              Sub Category
                            </th>
                            <th scope='col' className='px-6 py-3'>
                              Description
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
                            {/* <th scope='col' className='px-6 py-3'>
                              Inventory Status
                            </th> */}
                            <th scope='col' className='px-6 py-3'>
                              Remark
                            </th>
                          </tr>
                        </thead>
                        {applicationFullData?.receivings.map((data) => (
                          <tbody>
                            <tr className='bg-white border-b-2'>
                              <td className='px-2 py-4'>
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
                                {data?.procurement_stock?.subCategory?.name}
                              </td>
                              <td className='px-6 py-4 text-justify'>
                                {data?.procurement_stock?.description}
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
                              {/* <td className='px-6 py-4'>
                                {data?.is_added ? (
                                  <p className='text-green-500'>
                                    Added to Inventory
                                  </p>
                                ) : (
                                  <p className='text-violet-600'>Pending</p>
                                )}
                              </td> */}
                              <td className='px-6 py-4'>{data?.remark}</td>
                            </tr>
                          </tbody>
                        ))}
                      </table>
                    </div>
                  )}

                  {/* table */}
                </AccordionDetails>
              </Accordion>
            </div>
          }

          {/* Inventory Details form */}

          {page == "inbox" && applicationFullData?.status !== 7 && (
            <div className={`${formStyle} mt-8 border border-blue-500`}>
              <form onSubmit={formik.handleSubmit} onChange={handleOnChange}>
                <div className=''>
                  <div className=' grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 container mx-auto capitalize'>
                    <div className='col-span-12  w-full mb-10'>
                      <div className='p-4'>
                        <h2 className='font-semibold text-2xl pl-7 pt-2 pb-2 flex justify-start bg-[#4338ca] text-white rounded-md'>
                          Add products
                        </h2>
                      </div>

                      <div className='p-2 -mt-4 valid-form flex gap-2 flex-wrap justify-start mb-5'>
                        <div className='form-group flex-shrink max-w-full px-2 ml-4 mb-5 w-[20rem]'>
                          <label className={`${labelStyle} inline-block mb-2`}>
                            Choose Procurement Item
                            <span className='text-xl text-red-500 pl-1'>
                              *
                            </span>{" "}
                          </label>
                          <select
                            name='procurement_stock_id'
                            className={`${inputStyle} inline-block w-full relative`}
                            onChange={(e) => {
                              setProcurement_stock_id(e.target.value);
                              getInventoryAddDetail(e.target.value);
                            }}
                          >
                            <option value={""}>select</option>
                            {applicationFullData?.procurement_stocks?.map(
                              (data, index) => (
                                <option
                                  value={data?.id}
                                  disabled={
                                    data?.total_received === data?.total_added
                                  }
                                >
                                  Procurement Item: {index + 1}
                                </option>
                              )
                            )}
                          </select>
                          {/* <p className="text-red-500 text-xs "></p> */}
                          <p className='text-sm px-1 text-green-700 mt-1'>
                            {totSum == 0
                              ? "No Quantity to Add"
                              : `Quantity to add - ${totSum}`}
                          </p>
                        </div>

                        <div className=' form-group flex-shrink max-w-full px-4 w-[20rem] '>
                          <div className='px-4 w-full'>
                            <label
                              className={`${labelStyle} inline-block mb-2`}
                            >
                              Brand
                            </label>

                            <input
                              name='brand'
                              className={`${inputStyle} inline-block w-full relative`}
                              onChange={(e) => {
                                setBrandName(e.target.value);
                              }}
                              // value={item?.brand}
                            />
                          </div>
                        </div>

                        {product.map((item, index) => (
                          <div className='flex gap-2 items-end' key={index}>
                            <div className='form-group flex-shrink max-w-full px-4 '>
                              <div className='px-4 w-full'>
                                <label
                                  className={`${labelStyle} inline-block mb-2`}
                                >
                                  Quantity
                                </label>

                                <input
                                  name='quantity'
                                  className={`${inputStyle} inline-block w-full relative`}
                                  onChange={(e) => {
                                    onchangeField(e, index, "quantity");
                                  }}
                                  disabled
                                  value={item?.quantity}
                                />
                              </div>
                            </div>

                            <div className=' form-group flex-shrink max-w-full px-4 '>
                              <div className='px-4 w-full'>
                                <label
                                  className={`${labelStyle} inline-block mb-2`}
                                >
                                  Serial Number
                                </label>

                                <input
                                  name='serial_no'
                                  className={`${inputStyle} inline-block w-full relative`}
                                  onChange={(e) => {
                                    onchangeField(e, index, "serial_no");
                                  }}
                                  value={item?.serial_no}
                                />
                              </div>
                            </div>

                            {product.length - 1 === index && (
                              <div className=' form-group flex-shrink flex gap-2 max-w-full px-1'>
                                {/* <div className="px-4 w-full"> */}

                                <button
                                  className={`${buttonStyle2} flex gap-2`}
                                  onClick={addField}
                                >
                                  <IoMdAddCircleOutline className='text-xl' />{" "}
                                  rows
                                </button>

                                {product?.length > 1 && (
                                  <button
                                    className={`${buttonStyle}`}
                                    onClick={removeField}
                                  >
                                    remove
                                  </button>
                                )}

                                {/* </div> */}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className='space-x-5 flex justify-end mr-3 mt-14'>
                        <button
                          className={buttonStyle}
                          onClick={() => {
                            setCancelModal(true);
                          }}
                        >
                          Cancel
                        </button>

                        <button
                          onClick={addProduct}
                          className={buttonStyle2}
                          type='button'
                        >
                          Add Products
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}

          {page == "inbox" &&
            inventoryAddData?.is_valid_for_addition == true && (
              <div className={`${formStyle} mt-8 border border-blue-500`}>
                <form onSubmit={formik.handleSubmit} onChange={handleOnChange}>
                  <div className=''>
                    <div className=' grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 container mx-auto capitalize'>
                      <div className='col-span-12  w-full mb-20'>
                        <div className='p-4'>
                          <h2 className='font-semibold text-2xl pl-7 pt-2 pb-2 flex justify-start bg-[#4338ca] text-white rounded-md'>
                            Inventory Details
                          </h2>
                        </div>

                        <div className='p-12 -mt-4 valid-form flex flex-wrap flex-row -mx-4'>
                          <div className='form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                            <div className='px-4 w-full mb-4'>
                              <label
                                className={`${labelStyle} inline-block mb-2`}
                              >
                                Choose Procurement Item
                                <span className='text-xl text-red-500 pl-1'>
                                  *
                                </span>{" "}
                              </label>
                              <select
                                name='procurement_stock_id'
                                className={`${inputStyle} inline-block w-full relative`}
                                onChange={(e) => {
                                  setProcurement_stock_id(e.target.value);
                                }}
                                value={procurement_stock_id}
                                disabled
                                // onClick={() => }
                              >
                                <option value={""}>select</option>
                                {/* {console.log(applicationFullData)} */}
                                {applicationFullData?.procurement_stocks?.map(
                                  (data, index) => (
                                    <option value={data?.id}>
                                      {/* {console.log(data?.id)} */}
                                      {/* {data?.id} */}
                                      Procurement Item: {index + 1}
                                    </option>
                                  )
                                )}
                              </select>
                              <p className='text-red-500 text-xs '></p>
                            </div>
                          </div>
                          <div className='form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                            <div className='px-4 w-full mb-4'>
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
                            <div className='px-4 w-full mb-4'>
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
                            <div className='px-4 w-full mb-4'>
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
                                {formik.touched.remStock &&
                                formik.errors.remStock
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
                                onChange={inventoryHisHandler}
                                value={inventory}
                                disabled={applicationFullData?.receivings?.some(
                                  (data) => data?.is_added === true
                                )}
                                // name='invtDetails'
                              >
                                <option value={""} selected>
                                  select
                                </option>

                                {inventoryData?.data?.length &&
                                  inventoryData?.data.map((items) => (
                                    <option
                                      key={items?.id}
                                      value={items?.id}
                                      className='py-2'
                                    >
                                      {items?.description}
                                    </option>
                                  ))}
                              </select>

                              <p className='text-red-500 text-xs '>
                                {formik.touched.itemsubcategory &&
                                formik.errors.itemsubcategory
                                  ? formik.errors.itemsubcategory
                                  : null}
                              </p>
                            </div>
                          </div>

                          <div className='relative form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                            <div className=' relative px-4 w-full mb-4'>
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
                            {/* <div className="w-20 mt-5">
                              <ImageDisplay
                                preview={preview}
                                imageDoc={imageDoc}
                                alt={"Dead Stock Image"}
                                showPreview={"hidden"}
                                // disabled
                                width={["80px"]}
                              />
                            </div> */}
                            {/* </div> */}
                          </div>

                          <div className='form-group flex justify-between flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                            <div>
                              <input
                                className='ml-4'
                                type='checkbox'
                                onChange={() =>
                                  setWarrantyClaim((prev) => !prev)
                                }
                              />
                              <label
                                className={`${labelStyle} inline-block pl-3`}
                              >
                                Warranty claim
                              </label>
                            </div>
                            <div className=''>
                              <div className='w-20 mr-5 '>
                                <ImageDisplay
                                  preview={preview}
                                  imageDoc={imageDoc}
                                  alt={"Dead Stock Image"}
                                  showPreview={"hidden"}
                                  // disabled
                                  width={["80px"]}
                                />
                              </div>
                            </div>
                          </div>

                          <div className='form-group flex-shrink max-w-full px-8 w-full md:w-full mb-4'>
                            <label
                              className={`${labelStyle} inline-block mb-2`}
                            >
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
