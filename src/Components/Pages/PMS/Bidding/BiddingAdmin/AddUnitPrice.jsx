//////////////////////////////////////////////////////////////////////////////////////
//    Author - Dimple Kumari
//    Version - 1.0
//    Date - 25/05/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - AddUnnitPrice
//    DESCRIPTION - AddUnnitPrice
/////////////////////////////////////////////////////////////////////////////

import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const AddUnitPrice = (props) => {
  const navigate = useNavigate();
  const { refNo, page } = useParams();

  const [erroState, seterroState] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [applicationFullData, setapplicationFullData] = useState();
  const [tableData, setTableData] = useState([]);
  const [isModalOpenInvt, setIsModalOpenInvt] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isGstAdded, setIsGstAdded] = useState(false);
  const [supplierDetails, setSupplierDetails] = useState([]);

  const [procItem, setProcItem] = useState();

  // console.log(supplierData)
  const { inputStyle, labelStyle } = ThemeStyle();
  const {
    api_fetchPostProcurementDetailSupplierbyId,
    api_addUnitPrice,
    api_getUnitPrice,
  } = ProjectApiList();

  const { titleBarVisibility } = useContext(contextVar);

  let buttonStyle =
    "  pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-indigo-500 text-md leading-tight  rounded  hover:bg-indigo-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl";

  let buttonStyle2 =
    " mr-2 pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-white text-sm sm:text-sm leading-tight rounded  hover:bg-white  hover:text-indigo-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl bg-indigo-700";

 
  

  // formik
  const validationSchema = yup.object({
    suppliers: yup.string().required("Supplier name is required"),
    gst_no: yup.string().required("Gst number is required").max(15),
    final_rate: yup.string().required("final rate is required"),
    // rate: yup.number().required("Rate is required"),
    total_quantity: yup.number().required("Total Quantity is required"),
    // total_price: yup.number().required("Total Price is required"),
    unit_price: yup.number().required("Unit Price is required"),
  });

 

  const initialValues = {
    suppliers: "",
    unit_price: "",
    items: "",
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

  // const handleOnChange = (e) => {
  //   let name = e.target.name;
  //   let value = e.target.value;

  //   // console.log(value,"value",name,"name")

  //   {
  //     name == "is_gst_added" && gstcheckboxHandler();
  //   }
  //   {
  //     name == "final_rate" && calculateTotalRate(value);
  //   }
  //   {
  //     name == "final_rate" &&
  //       formik.setFieldValue(
  //         "final_rate",
  //         allowNumberInput(value, formik.values.final_rate, 100)
  //       );
  //   }
  //   {
  //     name == "suppliers" &&
  //       formik.setFieldValue(
  //         "suppliers",
  //         allowCharacterInput(value, formik.values.suppliers, 30)
  //       );
  //   }
  //   {
  //     name == "unit_price" &&
  //       formik.setFieldValue(
  //         "unit_price",
  //         allowNumberInput(value, formik.values.unit_price, 30)
  //       );
  //   }
  //   {
  //     name == "gst" &&
  //       formik.setFieldValue(
  //         "gst",
  //         allowNumberInput(value, formik.values.gst, 15)
  //       );
  //   }
  // };

  const addUnitPrice = () => {
    setisLoading(true);

    AxiosInterceptors.post(
      `${api_addUnitPrice}`,
      {
        reference_no: refNo,
        procurement_no: applicationFullData?.procurement_no,
        items: supplierDetails,
        // procurement_no: id,
      },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status) {
          toast.success("Unit Prices added for each Supplier");
          navigate(`/tendering-admin`);
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
      });
  };

  const supplierDetail = (val) => {
    const newData = val;

    // setSupplierDetails((prev) => {
    //   const existingSupplier = prev?.findIndex(
    //     (supplier) => supplier.suppliers === newData.suppliers
    //   );

    //   if (existingSupplier !== -1) {
    //     const supplierData = prev[existingSupplier];

    //     const updatedSupplier = prev.map((suppData, index) => {
    //       if (suppData.suppliers === supplierData.suppliers) {
    //         return {
    //           ...suppData,
    //           procurement_details: [
    //             ...suppData.procurement_details,
    //             { items: val.items, unit_price: val.unit_price },
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
    //         suppliers: val.suppliers,
    //         procurement_details: [
    //           { items: val.items, unit_price: val.unit_price },
    //         ],
    //       },
    //     ];
    //   }
    // });

    setSupplierDetails((prev) => {
      const existingProcItem = prev?.findIndex(
        (supplier) => supplier.items === newData.items
      );

      if (existingProcItem !== -1) {
        const supplierData = prev[existingProcItem];

        const updatedSupplier = prev.map((suppData, index) => {
          if (suppData.items === supplierData.items) {
            return {
              ...suppData,
              suppliers: [
                ...suppData.suppliers,
                { id: val.suppliers, unit_price: val.unit_price },
              ],
            };
          }
          return suppData;
        });

        return updatedSupplier;
      } else {
        return [
          ...prev,
          {
            items: val.items,
            suppliers: [{ id: val.suppliers, unit_price: val.unit_price }],
          },
        ];
      }
    });
  };

  ///////////{*** APPLICATION FULL DETAIL ***}/////////
  const getApplicationDetail = () => {
    setisLoading(true);
    seterroState(false);

    AxiosInterceptors.get(`${api_getUnitPrice}/${refNo}`, ApiHeader())
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
        toast.error("Error while getting details...");
        seterroState(true);
      });
  };

  useEffect(() => {
    getApplicationDetail();
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
    addUnitPrice();
  };

  //displaying confirmation message
  if (isModalOpenInvt) {
    return (
      <>
        <ConfirmationModal
          confirmationHandler={confirmationHandler}
          handleCancel={handleCancel}
          message={"Sure to submit Unit Price ?"}
        />
      </>
    );
  }

  // console.log(supplierDetails)

  const handlePrint = () => {
    window.print();
  };

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
        <TimeLine status={applicationFullData?.status?.status} />
      </div> */}

      <div className={`${isLoading ? "blur-[2px]" : ""}`}>
        {/* Basic Details */}
        <div className='mt-6' id='printable-content'>
          <div className={` mt-8 border border-blue-500`}>
            <form onSubmit={formik.handleSubmit} onChange={formik.handleChange}>
              <div className=''>
                <div className=' grid md:grid-cols-1 lg:grid-cols-12 container mx-auto capitalize'>
                  <div className='col-span-12  w-full mb-8'>
                    <div className='bg-[#4338ca] text-white px-4 py-2 w-full  rounded-md'>
                      <div>
                        <h2 className='text-xl font-bold'>Add Supplier</h2>
                      </div>
                    </div>

                    <div className='p-6 valid-form flex flex-wrap md:flex-row'>
                      <div className='form-group flex-shrink max-w-full px-4 w-full md:w-1/4 mb-2'>
                        <div className='form-group flex-shrink max-w-full px-4 mb-4'>
                          <label className={`${labelStyle} inline-block mb-2`}>
                            Choose Procurement Item
                            <span className='text-xl text-red-500 pl-1'>
                              *
                            </span>{" "}
                          </label>
                          <select
                            name='items'
                            className={`${inputStyle} inline-block w-full relative`}
                            onChange={formik.handleChange}
                          >
                            <option defaultValue={"select"}>select</option>
                            {applicationFullData?.procurement_stock?.map(
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
                          <label className={`${labelStyle} inline-block mb-2`}>
                            Supplier Name{" "}
                            <span className='text-red-500'>*</span>
                          </label>

                          <select
                            name='suppliers'
                            className={`${inputStyle} inline-block w-full relative`}
                            onChange={formik.handleChange}
                          >
                            <option defaultValue={"select"}>select</option>
                            {applicationFullData?.supplier?.map((data) => (
                              <option value={data?.id} key={data?.id}>
                                {data?.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className='form-group flex-shrink max-w-full px-4 w-full md:w-1/4 mb-2'>
                        <div className='form-group flex-shrink max-w-full px-4 mb-4'>
                          <label className={`${labelStyle} inline-block mb-2`}>
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
                        <div className=' flex ml-14 mr-10 border-b-[1px] bg-white  border-gray-200 p-2 cursor-pointer hover:bg-slate-100'>
                          <div className='w-[15%] flex justify-start items-center'>
                            <div className='flex justify-center items-center'>
                              <p className='pl-5'>{index + 1}</p>
                            </div>
                          </div>
                          <div className='w-[25%] flex justify-start items-center'>
                            <div className='flex justify-center items-center'>
                              <p className=''>
                                {
                                  applicationFullData?.procurement_stock?.find(
                                    (stocks) => stocks.id === data?.items
                                  ).description
                                }
                              </p>
                            </div>
                          </div>
                          <div className='w-[40%] '>
                            {/* <p>
                              {
                                applicationFullData?.supplier?.find(
                                  (supplier) =>
                                    data?.suppliers?.some(
                                      (procData) => procData?.id === supplier.id
                                    )
                                )?.name
                              }
                            </p> */}
                            <ul>
                              {data?.suppliers?.map((procData, index) => {
                                const supplierName =
                                  applicationFullData?.supplier?.find(
                                    (supplier) => supplier.id === procData.id
                                  )?.name;

                                return (
                                  <li key={index}>
                                    {supplierName || "Supplier name not found"}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>

                          <div className=''>
                            {data?.suppliers?.map((procData, index) => (
                              <p className=''>
                                {indianAmount(procData?.unit_price)}
                              </p>
                            ))}
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <>
          <div className='space-x-5 flex justify-between  mt-3'>
            <button onClick={handlePrint} className={buttonStyle}>
              Print
            </button>
            {/* <button className={buttonStyle} onClick={openCancelModal}>
              Cancel
            </button> */}

            <button
              className={buttonStyle2}
              onClick={() => setIsModalOpenInvt(true)}
            >
              Sumbit Unit Price
            </button>
          </div>
        </>
      </div>
    </div>
  );
};

export default AddUnitPrice;
