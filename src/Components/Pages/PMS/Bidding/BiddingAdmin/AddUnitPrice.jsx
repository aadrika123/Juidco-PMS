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
// import PreProcurementCancelScreen from "./PostProcurementCancelScreen";
// import PreProcurementSubmittedScreen from "./PreProcurementSubmittedScreen";
import { indianAmount } from "@/Components/Common/PowerupFunctions";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import LoaderApi from "@/Components/Common/Loaders/LoaderApi";
import ConfirmationModal from "@/Components/Common/Modal/ConfirmationModal";
import ThemeStyle from "@/Components/Common/ThemeStyle";

const AddUnitPrice = () => {
  const { refNo } = useParams();

  const [isLoading, setisLoading] = useState(false);
  const [applicationFullData, setapplicationFullData] = useState();
  const [isModalOpenInvt, setIsModalOpenInvt] = useState(false);
  const [supplierDetails, setSupplierDetails] = useState([]);

  // console.log(supplierData)
  const { inputStyle, labelStyle } = ThemeStyle();
  const { api_getUnitPrice } = ProjectApiList();

  const { titleBarVisibility } = useContext(contextVar);

  let buttonStyle =
    "  pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-indigo-500 text-md leading-tight  rounded  hover:bg-indigo-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl";

  let buttonStyle2 =
    " mr-2 pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-white text-sm sm:text-sm leading-tight rounded  hover:bg-white  hover:text-indigo-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl bg-indigo-700";

  let gstValidation =
    /^([0][1-9]|[1-2][0-9]|[3][0-8])[A-Z]{3}[ABCFGHLJPTF]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}/;

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

  const addUnitPrice = () => {
    console.log(supplierDetails, "supplierDetails");
    console.log(applicationFullData?.supplier, "supplierDetails");
    if (
      supplierDetails?.length !== applicationFullData?.procurement_stock?.length
    ) {
      setIsModalOpenInvt(false);
      console.log("enter");
      toast.error("Add Unit Price for all Procurement Item");
      return;
    }

    if (
      supplierDetails?.suppliers?.length !==
      applicationFullData?.supplier?.length
    ) {
      setIsModalOpenInvt(false);
      console.log("enter==");
      toast.error("Add Unit Price for all Suppliers");
      return;
    }
    console.log("exit");
    // setisLoading(true);

    // AxiosInterceptors.post(
    //   `${api_addUnitPrice}`,
    //   {
    //     reference_no: refNo,
    //     procurement_no: applicationFullData?.procurement_no,
    //     items: supplierDetails,
    //     // procurement_no: id,
    //   },
    //   ApiHeader()
    // )
    //   .then(function (response) {
    //     if (response?.data?.status) {
    //       toast.success("Unit Prices added for each Supplier");
    //       navigate(`/tendering-admin`);
    //     } else {
    //       toast.error("Error in Adding. Please try Again");
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log(error, "err res");
    //     toast.error(error?.response?.data?.error);
    //   })
    //   .finally(() => {
    //     setisLoading(false);
    //   });
  };

  const supplierDetail = (val) => {
    const newData = val;

    setSupplierDetails((prev) => {
      const existingProcItem = prev?.findIndex(
        (supplier) => supplier.items === newData.items
      );

      if (existingProcItem !== -1) {
        const supplierData = prev[existingProcItem];

        const updatedSupplier = prev.map((suppData, index) => {
          // if (supplierData.suppliers.find((data => {
          //   if(data.id === suppData?.some(details => details.id))
          // })))
          {
            // console.log(
            //   suppData,
            //   "suppData.items",
            //   supplierData,
            //   "supplierData.items"
            // );

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
        }
      })
      .catch(function (error) {
        console.log("==2 details by id error...", error);
        setisLoading(false);
        toast.error("Error while getting details...");
      });
  };

  useEffect(() => {
    getApplicationDetail();
  }, []);

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
                    <div className='bg-[#4338ca] text-white px-4 py-2 w-full  rounded-b-md'>
                      <div>
                        <h2 className='text-xl font-bold'>Add Unit Price</h2>
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
                      <div className=' flex mx-12 bg-[#4338ca] text-white rounded p-2 '>
                        <div className='w-[10%] flex justify-start items-center'>
                          <div className='flex justify-center items-center'>
                            <p className='pl-5'>S no.</p>
                          </div>
                        </div>
                        <div className='w-[40%] flex justify-start items-center'>
                          <div className='flex justify-center items-center'>
                            <p className=''> Procurement Items</p>
                          </div>
                        </div>
                        <div className='w-[25%] '>
                          <p className=''>Supplier Name</p>
                        </div>
                        <div className=''>
                          <p className=''>Unit Price</p>
                        </div>
                      </div>
                    )}
                    {supplierDetails.map((data, index) => (
                      <>
                        <div className=' flex items-center mx-12 border-b-[1px]  border-gray-200 p-2 cursor-pointer hover:bg-slate-100 bg-white'>
                          <div className='w-[10%] flex justify-start items-center'>
                            <div className='flex justify-center items-center'>
                              <p className='pl-5'>{index + 1}</p>
                            </div>
                          </div>
                          <div className='w-[40%] flex justify-start items-center'>
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
                          <div className='w-[25%] '>
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
                                  <li key={index} className='mb-4'>
                                    {supplierName || "Supplier name not found"}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>

                          <div className=''>
                            {data?.suppliers?.map((procData, index) => (
                              <p className='mb-4'>
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
