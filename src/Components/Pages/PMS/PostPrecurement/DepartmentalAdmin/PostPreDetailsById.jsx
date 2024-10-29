//////////////////////////////////////////////////////////////////////////////////////
//    Author - Dimple Kumari
//    Version - 1.0
//    Date - 25/05/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - PostPreDetailsById
//    DESCRIPTION - PostPreDetailsById
/////////////////////////////////////////////////////////////////////////////

import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { nullToNA } from "@/Components/Common/PowerUps/PowerupFunctions";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ProjectApiList from "@/Components/api/ProjectApiList";
import ApiHeader from "@/Components/api/ApiHeader";
import toast from "react-hot-toast";
import { contextVar } from "@/Components/context/contextVar";
import { useFormik } from "formik";
import * as yup from "yup";
// import PreProcurementCancelScreen from "./PostProcurementCancelScreen";
// import PreProcurementSubmittedScreen from "./PreProcurementSubmittedScreen";
import { indianAmount } from "@/Components/Common/PowerupFunctions";
import {
  allowCharacterInput,
  allowNumberInput,
} from "@/Components/Common/PowerUps/PowerupFunctions";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import LoaderApi from "@/Components/Common/Loaders/LoaderApi";
import TimeLine from "@/Components/Common/Timeline/TimeLine";
import ConfirmationModal from "@/Components/Common/Modal/ConfirmationModal";
import ThemeStyle from "@/Components/Common/ThemeStyle";
import { useReactToPrint } from "react-to-print";

const PostPreDetailsById = (props) => {
  const navigate = useNavigate();
  const { id, page } = useParams();

  // console.log(id)

  const [erroState, seterroState] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [applicationFullData, setapplicationFullData] = useState();
  const [tableData, setTableData] = useState([]);
  const [isModalOpenInvt, setIsModalOpenInvt] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isGstAdded, setIsGstAdded] = useState(false);
  const [supplierDetails, setSupplierDetails] = useState([]);

  // console.log(supplierData)
  const { inputStyle, labelStyle } = ThemeStyle();
  const { api_fetchPostProcurementDetailSupplierbyId, api_addToReceivedInvt } =
    ProjectApiList();

  const { titleBarVisibility } = useContext(contextVar);

  // console.log(applicationFullData?.is_rate_contract, "applicationFullData");

  let buttonStyle =
    "  pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-indigo-500 text-md leading-tight  rounded  hover:bg-indigo-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl";

  let buttonStyle2 =
    " mr-2 pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-white text-sm sm:text-sm leading-tight rounded  hover:bg-white  hover:text-indigo-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl bg-indigo-700";

  let gstValidation =
    /^([0][1-9]|[1-2][0-9]|[3][0-8])[A-Z]{3}[ABCFGHLJPTF]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}/;

  // const procItemDetails = [
  //   {
  //     procItem: "proc item 1",
  //     subCategory: "Laptop",
  //     unit: "25",
  //     brand: "Lenovo",
  //     quantity: "100",
  //     perUnitRate: "25000",
  //     totRate: "2500000",
  //     desc: "red color blue color",
  //   },
  //   {
  //     procItem: "proc item 33",
  //     subCategory: "Mouse",
  //     unit: "55",
  //     brand: "dell",
  //     quantity: "500",
  //     perUnitRate: "50",
  //     totRate: "25000",
  //     desc: "black blue color",
  //   },
  //   {
  //     procItem: "proc item 22",
  //     subCategory: "Mouse3",
  //     unit: "55",
  //     brand: "dell",
  //     quantity: "500",
  //     perUnitRate: "50",
  //     totRate: "25000",
  //     desc: "black blue color",
  //   },
  // ];

  // formik
  const validationSchema = yup.object({
    supplier_name: yup.string().required("Supplier name is required"),
    gst_no: yup.string().required("Gst number is required").max(15),
    final_rate: yup.string().required("final rate is required"),
    // rate: yup.number().required("Rate is required"),
    total_quantity: yup.number().required("Total Quantity is required"),
    // total_price: yup.number().required("Total Price is required"),
    unit_price: yup.number().required("Unit Price is required"),
  });

  // const initialValues = {
  //   supplier_name: "",
  //   gst_no: "",
  //   final_rate: "",
  //   gst: "",
  //   total_quantity: applicationFullData?.quantity,
  //   unit_price: "",
  //   is_gst_added: false,
  //   total_price: "",
  // };

  const initialValues = {
    supplier_name: "",
    unit_price: "",
    proc_item: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      supplierDetail(values);
      // setPayload(values);
      // setIsModalOpenInvt(true);
    },
    // validationSchema,
  });

  // intitial value

  const handleOnChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    // console.log(value,"value",name,"name")

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
      name == "unit_price" &&
        formik.setFieldValue(
          "unit_price",
          allowNumberInput(value, formik.values.unit_price, 30)
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

  const addToRecevivedInvt = () => {
    setisLoading(true);

    AxiosInterceptors.post(
      `${api_addToReceivedInvt}`,
      {
        procurement_no: id,
      },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status) {
          toast.success("Added To Received Inventory");
          navigate(`/ia-post-precurement`);
        } else {
          toast.error("Error in Adding. Please try Again");
        }
      })
      .catch(function (error) {
        console.log(error, "err res");
        toast.error(error?.response?.data?.error);
      })
      .finally(() => {
        setisLoading(false);
        setIsModalOpenInvt(false);
      });
  };

  const supplierDetail = (val) => {
    const newData = val;
    console.log(newData, "new Data");

    setSupplierDetails((prev) => {
      //   const existingSupplier = prev?.findIndex(
      //     (supplier) => supplier.supplier_name === newData.supplier_name
      //   );

      //   if (existingSupplier !== -1) {
      //     const supplierData = prev[existingSupplier];

      //     const updatedSupplier = prev.map((suppData, index) => {
      //       if (suppData.supplier_name === supplierData.supplier_name) {
      //         return {
      //           ...suppData,
      //           procurement_details: [
      //             ...suppData.procurement_details,
      //             { proc_item: val.proc_item, unit_price: val.unit_price },
      //           ],
      //         };
      //       }
      //       return suppData;
      //     });

      //     return updatedSupplier;
      //   } else {
      //     return [
      //       ...prev,
      //       {
      //         supplier_name: val.supplier_name,
      //         procurement_details: [
      //           { proc_item: val.proc_item, unit_price: val.unit_price },
      //         ],
      //       },
      //     ];
      //   }
      // });

      const existingSupplier = prev?.findIndex(
        (supplier) => supplier.supplier_name === newData.supplier_name
      );
    });
  };

  ///////////{*** APPLICATION FULL DETAIL ***}/////////
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

  // const getSupplierDetail = () => {
  //   setisLoading(true);
  //   seterroState(false);

  //   AxiosInterceptors.get(`${api_fetchSupplierbyId}/${id}`, ApiHeader())
  //     .then(function (response) {
  //       // console.log("view post da details by id...", response?.data?.data);
  //       if (response?.data?.status) {
  //         setsupplierData(response?.data?.data);
  //         setisLoading(false);
  //       } else {
  //         setisLoading(false);
  //         toast.error("Error while getting details...");
  //         seterroState(true);
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log("==2 details by id error...", error);
  //       setisLoading(false);
  //       toast.error("Error while getting details...");
  //       seterroState(true);
  //     });
  // };

  //inbox additional details
  // const submitAdditionalDetails = () => {
  //   setisLoading(true);
  //   let url;
  //   seterroState(false);

  //   if (page == "inbox") {
  //     url = api_postPostProcurementDaAdditionalDetails;
  //   }
  //   let body = {
  //     ...payload,
  //     id,
  //     procurement_no: applicationFullData.procurement_no,
  //     is_gst_added: isGstAdded,
  //   };

  //   AxiosInterceptors.post(`${url}`, { ...body }, ApiHeader())
  //     .then(function (response) {
  //       if (response?.data?.status) {
  //         toast.success("Successfully Data sent!!");
  //         // setapplicationFullData(response?.data?.data);
  //         // setTableData(response?.data?.data?.tran_dtls);
  //         setisLoading(false);
  //       } else {
  //         toast.error("Error while submitting form. Please try again.");
  //         seterroState(true);
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log("==2 details by id error...", error);
  //       setisLoading(false);
  //       toast.error("Error while submitting form. Please try again.");
  //       seterroState(true);
  //     });
  // };

  // const calculateTotalRate = (finalRate, gstVal, state) => {
  //   let totalPrice = Number(finalRate) || 0;
  //   const totalQuantity = Number(formik.values.total_quantity) || 0;
  //   let roundedGstValue;

  //   try {
  //     if (state == true && (formik.values.gst || gstVal) > 0) {
  //       //calculating gst value
  //       const gstValue =
  //         (1 + Number(formik.values.gst) / 100) * formik.values.final_rate;
  //       roundedGstValue = Math.floor(gstValue * 100) / 100;

  //       //calculating unitprice value
  //       let unitPrice = Number(roundedGstValue) / Number(totalQuantity);
  //       const roundedUnitPrice = Math.floor(unitPrice * 100) / 100;

  //       //setting values
  //       formik.setFieldValue("total_price", roundedGstValue);
  //       formik.setFieldValue("unit_price", roundedUnitPrice);
  //     } else {
  //       formik.setFieldValue("total_price", totalPrice);
  //       let unitPrice = Number(totalPrice) / Number(totalQuantity);
  //       const roundedUnitPrice = Math.floor(unitPrice * 100) / 100;
  //       formik.setFieldValue("unit_price", roundedUnitPrice);
  //     }
  //   } catch (err) {
  //     toast.error("Error in generating unit price");
  //   }
  // };

  // useEffect(() => {
  //   getApplicationDetail();
  //   getSupplierDetail();
  //   // calculateTotalRate(formik.values.final_rate, formik.values.gst, isGstAdded);
  // }, [isGstAdded, formik.values.final_rate, formik.values.gst]);

  useEffect(() => {
    getApplicationDetail();
    // getSupplierDetail();
  }, []);

  // -------------------- Calculate Total Quantity -------------------------------

  // ------------cancel modal-----------------------------

  const openCancelModal = () => {
    setIsModalOpen2(true);
  };

  const gstcheckboxHandler = () => {
    setIsGstAdded((prev) => !prev);
  };

  // new Modals-----------------------------------

  const handleCancel = () => {
    setIsModalOpenInvt(false);
  };
  const confirmationHandler = () => {
    addToRecevivedInvt();
  };

  //displaying confirmation message
  if (isModalOpenInvt) {
    return (
      <>
        <ConfirmationModal
          confirmationHandler={confirmationHandler}
          handleCancel={handleCancel}
          message={'Add to " Received Inventory " ?'}
          loadingState={isLoading}
        />
      </>
    );
  }

  // console.log(supplierDetails)

  // const handlePrint = () => {
  //   window.print();
  // };

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `@media print {
      @page {
        size: 1500mm 1500mm;
        margin: 2;
      }
    }`,
  });

  return (
    <div>
      {isLoading && <LoaderApi />}

      <div className="">
        <TitleBar
          titleBarVisibility={titleBarVisibility}
          titleText={"Inventory Proposal Details"}
        />
      </div>

      {/* //timeline  */}
      {/* <div className={`${isLoading ? "blur-[2px]" : ""}`}>
        <TimeLine status={applicationFullData?.status?.status} />
      </div> */}

      <div className={`${isLoading ? "blur-[2px]" : ""}`} ref={componentRef}>
        {/* Basic Details */}
        <div className="mt-6" id="printable-content">
          <div className="py-6 mt-2 bg-white rounded-lg shadow-xl p-4 space-y-5 border border-blue-500">
            <div className="">
              <h2 className="font-semibold text-2xl pl-7 pt-2 pb-2 flex justify-start bg-[#4338ca] text-white rounded-md">
                View Pre Procurement Details{" "}
              </h2>
            </div>

            <div className="flex justify-between">
              <div className="pl-8 text-[1rem] text-[#4338CA] flex justify-between w-full">
                <h1 className="">
                  Procurement No <span className="text-black">:</span>
                  <span className="font-bold">
                    {" "}
                    {nullToNA(applicationFullData?.procurement_no)}
                  </span>
                </h1>
                <h1 className="text-black">
                  Procurement Total <span className="text-black">:</span>
                  <span className="font-bold">
                    {" "}
                    {indianAmount(nullToNA(applicationFullData?.total_rate))}
                  </span>
                </h1>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="pl-8 text-[1rem] text-black flex justify-between w-full">
                <h1 className="">
                  Category <span className="text-black">:</span>
                  <span className="font-bold">
                    {" "}
                    {nullToNA(applicationFullData?.category?.name)}
                  </span>
                </h1>
              </div>
            </div>

            {applicationFullData?.procurement_stocks?.map((procData, index) => (
              <>
                <div>
                  <p className="text-xs pl-5">Procurement Item: {index + 1}</p>
                </div>
                <div className="grid md:grid-cols-4 gap-4 ml-8 bg-slate-50 p-5 rounded shadow">
                  <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                    <div className="md:w-auto w-[50%] font-bold ">
                      Subcategory
                    </div>
                    <div className="md:w-auto w-[50%] text-gray-800 text-md">
                      {procData?.subCategory?.name}
                    </div>
                  </div>

                  <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                    <div className="md:w-auto w-[50%] font-bold ">Unit</div>
                    <div className="md:w-auto w-[50%] text-gray-800 text-md">
                      {nullToNA(procData?.unit?.name)}
                    </div>
                  </div>

                  <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                    <div className="md:w-auto w-[50%] font-bold ">Brand</div>
                    <div className="md:w-auto w-[50%] text-gray-800 text-md">
                      {nullToNA(procData?.brand?.name)}
                    </div>
                  </div>

                  <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                    <div className="md:w-auto w-[50%] font-bold ">Quantity</div>
                    <div className="md:w-auto w-[50%] text-gray-800 text-md">
                      {nullToNA(procData?.quantity)}
                    </div>
                  </div>

                  <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                    <div className="md:w-auto w-[50%] font-bold ">
                      Per Unit Rate
                    </div>
                    <div className="md:w-auto w-[50%] text-gray-800 text-md">
                      {indianAmount(nullToNA(procData?.rate))}
                    </div>
                  </div>

                  <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                    <div className="md:w-auto w-[50%] font-bold ">
                      Total Rate
                    </div>
                    <div className="md:w-auto w-[50%] text-gray-800 text-md">
                      {indianAmount(nullToNA(procData?.total_rate))}
                    </div>
                  </div>

                  <div className="md:flex-1 mt-4 col-span-4 md:block flex md:flex-row-reverse justify-between">
                    <div className="md:w-auto w-[50%] font-bold ">
                      Description
                    </div>
                    <div className="md:w-auto w-[50%] text-gray-800 text-md">
                      {nullToNA(procData?.description)}
                    </div>
                  </div>
                </div>
              </>
            ))}

            <div className="h-[30px]"></div>
          </div>

          {/* {page == "inbox" && (
            <>
              {" "}
              <div className={` mt-8 border border-blue-500`}>
                <form onSubmit={formik.handleSubmit} onChange={handleOnChange}>
                  <div className=''>
                    <div className=' grid md:grid-cols-1 lg:grid-cols-12 container mx-auto capitalize'>
                      <div className='col-span-12  w-full mb-8'>
                        <div className='bg-[#4338ca] text-white px-4 py-2 w-full flex justify-between items-center rounded-t-md'>
                          <div>
                            <h2 className='text-xl font-bold'>Add Supplier</h2>
                          </div>
                          <div></div>
                        </div>

                        <div className='p-6 valid-form flex flex-wrap md:flex-row'>
                          <div className='form-group flex-shrink max-w-full px-4 w-full md:w-1/4 mb-2'>
                            <div className='form-group flex-shrink max-w-full px-4 mb-4'>
                              <label
                                className={`${labelStyle} inline-block mb-2`}
                              >
                                Choose Procurement Item
                                <span className='text-xl text-red-500 pl-1'>
                                  *
                                </span>{" "}
                              </label>
                              <select
                                name='proc_item'
                                className={`${inputStyle} inline-block w-full relative`}
                                onChange={formik.handleChange}
                              >
                                <option defaultValue={"select"}>select</option>
                                {applicationFullData?.procurement_stocks?.map(
                                  (data, index) => (
                                    <option value={data?.id} key={data?.id}>
                                      Procurement Item: {index + 1}
                                    </option>
                                  )
                                )}
                              </select>
                              <p className='text-red-500 text-xs '></p>
                            </div>
                          </div>

                          <div className='form-group flex-shrink max-w-full px-4 w-full md:w-1/4 mb-2'>
                            <div class='px-4 w-full mb-4'>
                              <label
                                className={`${labelStyle} inline-block mb-2`}
                              >
                                Supplier Name{" "}
                                <span className='text-red-500'>*</span>
                              </label>

                              <select
                                name='supplier_name'
                                className={`${inputStyle} inline-block w-full relative`}
                              >
                                <option defaultValue={"select"}>select</option>
                                {applicationFullData?.supplier_master?.map(
                                  (data) => (
                                    <option value={data?.id} index={data.id}>
                                      {data?.name}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>
                          </div>

                          <div className='form-group flex-shrink max-w-full px-4 w-full md:w-1/4 mb-2'>
                            <div className='form-group flex-shrink max-w-full px-4 mb-4'>
                              <label
                                className={`${labelStyle} inline-block mb-2`}
                              >
                                Unit Price
                                <span className='text-xl text-red-500 pl-1'>
                                  *
                                </span>{" "}
                              </label>

                              <input
                                type='text'
                                name='unit_price'
                                className={`${inputStyle} inline-block w-full relative`}
                                placeholder='Search...'
                              />

                              <p className='text-red-500 text-xs '></p>
                            </div>
                          </div>

                          <div className='flex justify-end items-center max-w-full px-4 w-full md:w-1/4 mt-4'>
                            <button className={`${buttonStyle2} pl-14 pr-14`}>
                              Add Suppliers
                            </button>
                          </div>
                        </div>
                        {console.log(supplierDetails, "supplierDetails")}

                        {supplierDetails?.length > 0 && (
                          <div className=' flex ml-14 mr-10 bg-[#4338ca] text-white mb-4 rounded p-2 '>
                            <div className='w-[15%] flex justify-start items-center'>
                              <div className='flex justify-center items-center'>
                                <p className='pl-5'>S no.</p>
                              </div>
                            </div>
                            <div className='w-[25%] flex justify-start items-center'>
                              <div className='flex justify-center items-center'>
                                <p className=''>Supplier Name</p>
                              </div>
                            </div>
                            <div className='w-[40%] '>
                              <p className=''>Procurement Items</p>
                            </div>
                            <div className=''>
                              <p className=''>Unit Price</p>
                            </div>
                          </div>
                        )}
                        {supplierDetails.map((data, index) => (
                          <>
                            <div className=' flex ml-14 mr-10 border-b-[1px]  border-gray-200 p-2 cursor-pointer hover:bg-slate-100'>
                              <div className='w-[15%] flex justify-start items-center'>
                                <div className='flex justify-center items-center'>
                                  <p className='pl-5'>{index + 1}</p>
                                </div>
                              </div>
                              <div className='w-[25%] flex justify-start items-center'>
                                <div className='flex justify-center items-center'>
                                  <p className=''>{data?.supplier_name}</p>
                                </div>
                              </div>
                              <div className='w-[40%] '>
                                {data?.procurement_details?.map(
                                  (procData, index) => (
                                    <p className=''>{procData?.proc_item}</p>
                                  )
                                )}
                              </div>

                              <div className=''>
                                {data?.procurement_details?.map(
                                  (procData, index) => (
                                    <p className=''>
                                      {indianAmount(procData?.unit_price)}
                                    </p>
                                  )
                                )}
                              </div>
                            </div>
                          </>
                        ))}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </>
          )} */}

          {/* Inventory Details form */}

          {/* {page == "inbox" && (
            <>
              {" "}
              <div className={`${formStyle} mt-8 border border-blue-500`}>
                <form onSubmit={formik.handleSubmit} onChange={handleOnChange}>
                  <div className="">
                    <div className=" grid md:grid-cols-1 lg:grid-cols-12 container mx-auto capitalize">
                      <div className="col-span-12  w-full mb-8">
                        <div className="bg-[#4338ca] text-white px-4 py-2 w-full flex justify-between items-center rounded-t-md">
                          <div>
                            <h2 className="text-xl font-bold">Add Supplier</h2>
                          </div>
                          <div>
                            <button className="mr-3 bg-white text-black hover:bg-indigo-100 rounded p-2 flex">
                              Add Suppliers <IoMdAddCircleOutline className=" text-blue-700 ml-2 text-2xl"/>
                            </button>
                          </div>
                        </div>

                        <div className="p-6 valid-form flex flex-wrap md:flex-row">
                          <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-2">
                            <div class="px-4 w-full mb-4">
                              <label
                                className={`${labelStyle} inline-block mb-2`}
                              >
                                Supplier Name{" "}
                                <span className="text-red-500">*</span>
                              </label>

                              <select
                                {...formik.getFieldProps("supplier_name")}
                                className={`${inputStyle} inline-block w-full relative`}
                                onChange={(e) => {
            
                                }}
                              >
                                <option defaultValue={"select"}>select</option>
                                <option>Rohan</option>
                                <option>Raju</option>
                                <option>Krishna</option>
                                <option>Kaushik</option>

                                <option>others</option>
                              </select>

                           
                            </div>
                          </div>

                          <div className="md:w-full">
                            <>
                             
                              <div className="grid md:grid-cols-4 gap-4 ml-8 bg-white p-5 rounded shadow">
                                <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                                  <div className="font-semibold md:w-auto w-[50%] text-sm ">
                                    Bidder Name
                                  </div>
                                  <div className="md:w-auto w-[50%] text-gray-500 text-md">
                                    Abc
                                  </div>
                                </div>

                                <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                                  <div className="font-semibold md:w-auto w-[50%] text-sm ">
                                    PAN No
                                  </div>
                                  <div className="md:w-auto w-[50%] text-gray-500 text-md">
                                    Abc
                                  </div>
                                </div>

                                <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                                  <div className="font-semibold md:w-auto w-[50%] text-sm ">
                                    GST No.
                                  </div>
                                  <div className="md:w-auto w-[50%] text-gray-500 text-md">
                                    Abc
                                  </div>
                                </div>

                                <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                                  <div className="font-semibold md:w-auto w-[50%] text-sm ">
                                    Address
                                  </div>
                                  <div className="md:w-auto w-[50%] text-gray-500 text-md">
                                    Abc
                                  </div>
                                </div>

                                <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                                  <div className="font-semibold md:w-auto w-[50%] text-sm ">
                                    Bank Name
                                  </div>
                                  <div className="md:w-auto w-[50%] text-gray-500 text-md">
                                    Abc
                                  </div>
                                </div>

                                <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                                  <div className="font-semibold md:w-auto w-[50%] text-sm ">
                                    Bank Account No
                                  </div>
                                  <div className="md:w-auto w-[50%] text-gray-500 text-md">
                                    Abc
                                    
                                  </div>
                                </div>

                                <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                                  <div className="font-semibold md:w-auto w-[50%] text-sm ">
                                    IFSC Code
                                  </div>
                                  <div className="md:w-auto w-[50%] text-gray-500 text-md">
                                    Abc
                                  </div>
                                </div>

                                <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                                  <div className="font-semibold md:w-auto w-[50%] text-sm ">
                                    Bidding Amount
                                  </div>
                                  <div className="md:w-auto w-[50%] text-gray-500 text-md">
                                    Abc
                                  </div>
                                </div>
                              </div>
                            </>
                          </div>

                          
                            <>
                          <div className="px-5 mt-4 md:w-1/2">
                            <div className="form-group flex-shrink max-w-full px-4 mb-4">
                              <label
                                className={`${labelStyle} inline-block mb-2`}
                              >
                                Choose Procurement Item
                                <span className="text-xl text-red-500 pl-1">
                                  *
                                </span>{" "}
                              </label>
                              <select
                                className={`${inputStyle} inline-block w-full relative`}
                                onChange={(e) => {
                                  setProcItem(e.target.value);
                                }}
                              >
                                <option defaultValue={"select"}>select</option>
                                {procItemDetails?.map((data)=>(
                                <option>{data?.procItem}</option>
                              ))}
                              </select>
                              <p className="text-red-500 text-xs ">
                               
                              </p>
                            </div>
                          </div>

                          <div className="p-2 py-3 md:w-full  ml-8 rounded-md">
                            <div className="flex items-center">
                             
                            </div>
                            <div className="md:w-full">
                              <>
                                <div className="mb-3">
                                  <p className="text-xs pl-1">
                                    Procurement Item:
                                  </p>
                                </div>
                                <div className="bg-gray-100 rounded-xl">
                                  <div className="grid md:grid-cols-4 gap-4 pl-8 pt-3">
                                    <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                                      <div className="md:w-auto w-[50%] font-bold ">
                                        Subcategory
                                      </div>
                                      <div className="md:w-auto w-[50%] text-gray-800 text-md">
                                        Abc
                                      </div>
                                    </div>

                                    <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                                      <div className="md:w-auto w-[50%] font-bold ">
                                        Unit
                                      </div>
                                      <div className="md:w-auto w-[50%] text-gray-800 text-md">
                                        Abc
                                      </div>
                                    </div>

                                    <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                                      <div className="md:w-auto w-[50%] font-bold ">
                                        Brand
                                      </div>
                                      <div className="md:w-auto w-[50%] text-gray-800 text-md">
                                        Abc
                                      </div>
                                    </div>

                                    <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                                      <div className="md:w-auto w-[50%] font-bold ">
                                        Quantity
                                      </div>
                                      <div className="md:w-auto w-[50%] text-gray-800 text-md">
                                        Abc
                                      </div>
                                    </div>

                                    <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                                      <div className="md:w-auto w-[50%] font-bold ">
                                        Per Unit Rate
                                      </div>
                                      <div className="md:w-auto w-[50%] text-gray-800 text-md">
                                        Abc
                                      </div>
                                    </div>

                                    <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                                      <div className="md:w-auto w-[50%] font-bold ">
                                        Total Rate
                                      </div>
                                      <div className="md:w-auto w-[50%] text-gray-800 text-md">
                                        Abc
                                        
                                      </div>
                                    </div>

                                    <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                                      <div className="md:w-auto w-[50%] font-bold ">
                                        Description
                                      </div>
                                      <div className="md:w-auto w-[50%] text-gray-800 text-md">
                                        Abc
                                      </div>
                                    </div>
                                  </div>

                                  <div className="px-4 p-2 w-full mt-3 ">
                                    <h1
                                      className={`text-lg text-left font-semibold px-4 mb-2`}
                                    >
                                      Calculation
                                    </h1>

                                    <div class="form-group flex-shrink max-w-full px-4 w-full md:w-2/3 mb-4">
                                      <div className="flex items-center space-x-5">
                                        <div className="space-y-2">
                                          <label>Total price</label>
                                          <input
                                            type="number"
                                            name="total_price"
                                            className={`${inputStyle} inline-block w-full relative`}
                                           

                                            value={formik.values.total_price}
                                            placeholder="Total Price"
                                          />
                                        </div>
                                        <FaDivide className="text-[2.5rem]  pt-5 mt-3" />
                                        <div className="space-y-2">
                                          <label>Total Quantity</label>
                                          <input
                                            type="number"
                                            name="total_quantity"
                                            className={`${inputStyle} inline-block w-full relative`}
                                           

                                            value={formik.values.total_quantity}
                                            placeholder="Total Quantity"
                                          />
                                        </div>

                                        <p className="text-[2rem] pt-5 mt-3">
                                          =
                                        </p>
                                        <div className="space-y-2">
                                          <label>Unit Price</label>
                                          <input
                                            type="number"
                                            name="unit_price"
                                            className={`${inputStyle} inline-block w-full relative`}
                                            value={formik.values.unit_price}
                                            placeholder="Per Price"
                                          />
                                        </div>
                                      </div>
                                      <p className="text-red-500 text-xs ">
                                        {formik.touched.total_quantity &&
                                        formik.errors.total_quantity
                                          ? formik.errors.total_quantity
                                          : null}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </>
                            </div>
                          </div>
                          <div className="w-full space-x-5 flex justify-end mr-[1.5rem]">
                            <button
                              className={buttonStyle}
                              onClick={openCancelModal}
                            >
                              Cancel
                            </button>

                            <button className={buttonStyle2}>
                              Add Procurement Item
                            </button>
                          </div>
                          </>
                      
                        </div>

                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="space-x-5 flex justify-end  mt-3">
                <button className={buttonStyle} onClick={openCancelModal}>
                  Cancel
                </button>

                <button className={buttonStyle2}>Save</button>
              </div>
            </>
          )} */}

          {/* Supplier Details */}
          {applicationFullData?.is_rate_contract != true && (
            <div className="py-6 mt-8 bg-white rounded-lg shadow-xl px-6 border border-blue-500">
              <div className="">
                <h2 className="font-semibold text-2xl pl-7 pt-2 pb-2 flex justify-start bg-[#4338ca] text-white rounded-md">
                  Supplier Details{" "}
                </h2>
              </div>

              {applicationFullData?.supplier_master?.map(
                (supplierInfo, index) => (
                  <>
                    <h1 className="text-xs pt-4">Supplier {index + 1}</h1>

                    <div className="bg-slate-50 p-5 rounded shadow">
                      <div className="md:flex md:justify-between md:items-center p-4">
                        <div className="flex-1 md:block flex flex-row-reverse justify-between">
                          <div className="md:w-auto w-[50%] font-bold capitalize ">
                            {nullToNA(supplierInfo?.name)}
                          </div>
                          <div className="md:w-auto w-[50%] text-gray-800 text-sm">
                            Supplier Name
                          </div>
                        </div>

                        <div className="flex-1 md:block flex flex-row-reverse justify-between">
                          <div className="md:w-auto w-[50%] font-bold ">
                            {nullToNA(supplierInfo?.reference_no)}
                          </div>
                          <div className="md:w-auto w-[50%] text-gray-800 text-sm">
                            Reference Number
                          </div>
                        </div>

                        <div className="flex-1 md:block flex flex-row-reverse justify-between">
                          <div className="md:w-auto w-[50%] font-bold ">
                            {nullToNA(supplierInfo?.gst_no)}
                          </div>
                          <div className="md:w-auto w-[50%] text-gray-800 text-sm">
                            GST No
                          </div>
                        </div>

                        <div className="flex-1 md:block flex flex-row-reverse justify-between">
                          <div className="md:w-auto w-[50%] font-bold ">
                            {nullToNA(supplierInfo?.pan_no)}
                          </div>
                          <div className="md:w-auto w-[50%] text-gray-800 text-sm">
                            PAN No
                          </div>
                        </div>
                      </div>

                      <div className="md:flex md:justify-between items-center p-4">
                        <div className="md:flex-1 md:block flex flex-row-reverse justify-between">
                          <div className="md:w-auto w-[50%] font-bold ">
                            {nullToNA(supplierInfo?.address)}
                          </div>
                          <div className="md:w-auto w-[50%] text-gray-800 text-sm">
                            Address
                          </div>
                        </div>

                        <div className="md:flex-1 md:block flex flex-row-reverse justify-between">
                          <div className="md:w-auto w-[50%] font-bold ">
                            {nullToNA(supplierInfo?.bank_name)}
                          </div>
                          <div className="md:w-auto w-[50%] text-gray-800 text-sm">
                            Bank Name
                          </div>
                        </div>

                        <div className="md:flex-1 md:block flex flex-row-reverse justify-between">
                          <div className="md:w-auto w-[50%] font-bold ">
                            {nullToNA(supplierInfo?.account_no)}
                          </div>
                          <div className="md:w-auto w-[50%] text-gray-800 text-sm">
                            Account No.
                          </div>
                        </div>

                        <div className="md:flex-1 md:block flex flex-row-reverse justify-between">
                          <div className="md:w-auto w-[50%] font-bold ">
                            {nullToNA(supplierInfo?.ifsc)}
                          </div>
                          <div className="md:w-auto w-[50%] text-gray-800 text-sm">
                            IFSC Code
                          </div>
                        </div>
                      </div>

                      <div className="md:flex md:justify-between items-center p-4">
                        <div className="md:flex-1 md:block flex flex-row-reverse justify-between">
                          <div className="md:w-auto w-[50%] font-bold ">
                            {nullToNA(indianAmount(supplierInfo?.bidding_amount))}
                          </div>
                          <div className="md:w-auto w-[50%] text-gray-800 text-sm">
                            Bidding Amount
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )
              )}
            </div>
          )}
        </div>
      </div>
      <>
        <div className="space-x-5 flex justify-between  mt-3">
          <button onClick={handlePrint} className={buttonStyle}>
            Print
          </button>
          {/* <button className={buttonStyle} onClick={openCancelModal}>
              Cancel
            </button> */}

          {page == "inbox" && (
            <button
              className={buttonStyle2}
              onClick={() => setIsModalOpenInvt(true)}
            >
              Add to Received Inventory
            </button>
          )}
        </div>
      </>
    </div>
  );
};

export default PostPreDetailsById;
