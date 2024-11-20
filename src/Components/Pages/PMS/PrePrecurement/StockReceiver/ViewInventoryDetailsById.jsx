//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash alam
//    Version - 1.0
//    Date - 21/05/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - ViewInventoryDetailsById
//    DESCRIPTION - ViewInventoryDetailsById
//////////////////////////////////////////////////////////////////////////////////////

import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { nullToNA } from "@/Components/Common/PowerUps/PowerupFunctions";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ProjectApiList from "@/Components/api/ProjectApiList";
import ApiHeader from "@/Components/api/ApiHeader";
import toast from "react-hot-toast";
import { contextVar } from "@/Components/context/contextVar";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import ImageDisplay from "@/Components/Common/FileButtonUpload/ImageDisplay";
import LoaderApi from "@/Components/Common/Loaders/LoaderApi";
import { useReactToPrint } from "react-to-print";
import StockRequestTimeline from "@/Components/Common/Timeline/StockRequestTimeline";
import ServiceRequestModal from "@/Components/Common/Modal/ServiceRequestModal";
import RejectionModalRemark from "@/Components/Common/Modal/RejectionModalRemark";

const ViewInventoryDetailsById = (props) => {
  const navigate = useNavigate();
  const notesheetRef = useRef();
  const { id, page } = useParams();

  const [isLoading, setisLoading] = useState(false);
  const [applicationFullData, setapplicationFullData] = useState();
  const [productData, setProductData] = useState();
  // const [preview, setPreview] = useState();
  const [serviceRequestModal, setServiceRequestModal] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [service, setService] = useState("");
  const [serialNo, setserialNo] = useState([]);
  const [remQuantity, setRemQuantity] = useState(0);
  const [data, setData] = useState({ stock_handover_no: "", remark: "" });

  const {
    api_getStockRequetById,
    api_iaStockReqApprove,
    api_iaGetProducts,
    api_iaStockReqNotify,
    api_distStockReqReturn,
  } = ProjectApiList();

  const { titleBarVisibility } = useContext(contextVar);

  //Print
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  let buttonStyle =
    " mr-1 pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-indigo-500 text-base leading-tight  rounded  hover:bg-indigo-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl";

  ///////////{*** APPLICATION FULL DETAIL ***}/////////
  const getApplicationDetail = () => {
    setisLoading(true);
    let url;

    if (page == "inbox") {
      url = api_getStockRequetById;
    }
    if (page == "outbox") {
      url = api_getStockRequetById;
    }

    AxiosInterceptors.get(`${url}/${id}`, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          setapplicationFullData(response?.data?.data);
          setData((prev) => ({
            ...prev,
            stock_handover_no: [response?.data?.data?.stock_handover_no],
          }));
        } else {
          toast.error(response?.data?.message);
        }
      })
      .catch(function (error) {
        toast.error("Error while getting details...");
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  ///////////{*** APPLICATION FULL DETAIL ***}/////////
  const getProductDetail = () => {
    AxiosInterceptors.get(`${api_iaGetProducts}/${id}`, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          setProductData(response?.data?.data);
          const totalRemQuantity = response?.data?.data?.reduce(
            (acc, currentValue) => acc + Number(currentValue?.quantity),
            0
          );
          setRemQuantity(totalRemQuantity);
        } else {
          toast.error(response?.data?.message);
        }
      })
      .catch(function (error) {
        toast.error("Error while getting details...");
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  // console.log(serialNo);
  // console.log(id);

  const assignToDDHandler = () => {
    setisLoading(true);
    let body = {
      stock_handover_no: [id],
      serial_nos: serialNo,
    };

    AxiosInterceptors.post(`${api_iaStockReqApprove}`, body, ApiHeader())
      .then(function (response) {
        if (response?.data?.status == true) {
          toast.success(`Assign to Distributor Successfully`);
          setServiceRequestModal(false);
          navigate("/inventory-stockRequest?tabNo=1");
        } else {
          toast(response?.data?.message, "error");
        }
      })
      .catch(function (error) {
        console.log("errorrr.... ", error);
        // toast.error(error?.response?.data?.error);
        toast.error("Available quantity not sufficient");
        // setdeclarationStatus(false);
      })
      .finally(() => {
        setisLoading(false);
        setServiceRequestModal(false);
      });
  };

  //returning stock request back to dd
  const backToDd = () => {
    setisLoading(true);

    AxiosInterceptors.post(`${api_distStockReqReturn}`, data, ApiHeader())
      .then(function (response) {
        if (response?.data?.status == true) {
          toast.success(`Assign to Distributor Successfully`);
          setRejectModalOpen(false);
          navigate("/inventory-stockRequest?tabNo=1");
        } else {
          toast(response?.data?.message, "error");
        }
      })
      .catch(function (error) {
        console.log("errorrr.... ", error);
        toast.error(error?.response?.data?.error);
        // setdeclarationStatus(false);
      })
      .finally(() => {
        setisLoading(false);
        setRejectModalOpen(false);
      });
  };

  //notification to DA in case rem quantity is zero
  const notifyDaStockReq = () => {
    setisLoading(true);

    AxiosInterceptors.get(`${api_iaStockReqNotify}/${id}`, ApiHeader())
      .then(function (response) {
        if (response?.data?.status == true) {
          toast.success(`Notification Sent to Departmental Admin Successfully`);
          navigate("/inventory-stockRequest?tabNo=1");
        } else {
          toast(response?.data?.message, "error");
        }
      })
      .catch(function (error) {
        console.log("errorrr.... ", error);
        toast.error(error?.response?.data?.error);
        // setdeclarationStatus(false);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  useEffect(() => {
    getApplicationDetail();
    getProductDetail();
  }, []);

  if (serviceRequestModal) {
    return (
      <>
        <ServiceRequestModal
          submit={assignToDDHandler}
          setserialNo={setserialNo}
          serialNo={serialNo}
          productData={productData}
          setServiceRequestModal={setServiceRequestModal}
          service={service}
          quantity={applicationFullData?.allotted_quantity}
          loader={isLoading}
        />
      </>
    );
  }
  if (rejectModalOpen) {
    return (
      <>
        <RejectionModalRemark
          confirmationHandler={backToDd}
          handleCancel={() => setRejectModalOpen(false)}
          message={
            "Are you sure, want to send back to Departmental Distributor? "
          }
          setData={setData}
          loadingState={isLoading}
        />
      </>
    );
  }

  return (
    <>
      {isLoading && <LoaderApi />}

      <TitleBar
        titleBarVisibility={titleBarVisibility}
        titleText={"Stock Request Details"}
      />

      {/* //timeline  */}
      <div className={`${isLoading ? "blur-[2px]" : ""}`}>
        <StockRequestTimeline status={applicationFullData?.status} />
      </div>

      <div className={`${isLoading ? "blur-[2px]" : ""}`}>
        <div className='flex justify-end'></div>
        {/* Basic Details */}
        <div className='mt-6'>
          <div
            className='py-6 mt-4 bg-white rounded-lg shadow-xl p-4 space-y-5 border border-blue-500'
            ref={componentRef}
          >
            <div className=''>
              <h2 className='font-semibold text-2xl pl-7 pt-2 pb-2 flex justify-start bg-[#4338ca] text-white rounded-md'>
                View Stock Request{" "}
              </h2>
            </div>
            <div className='flex justify-between'>
              <div className='pl-8 pb-5 text-[1.2rem] text-[#4338CA]'>
                <h1 className='font-bold'>
                  Stock Handover No <span className='text-black'>:</span>
                  <span className='font-light'>
                    {" "}
                    {nullToNA(applicationFullData?.stock_handover_no)}
                  </span>
                </h1>
              </div>
              <div>
                <h2 className='font-medium text-green-500'>
                  Remaining Quantity in Inventory:
                  <span className='font-semibold'> {remQuantity || 0}</span>
                </h2>
              </div>
            </div>

            <div className='grid md:grid-cols-4 gap-4 ml-8 pb-5'>
              <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold'>Employee Id</div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(applicationFullData?.emp_id)}
                </div>
              </div>

              <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>
                  Employee Name
                </div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(applicationFullData?.emp_name)}
                </div>
              </div>

              <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>
                  Quantity Allotted{" "}
                </div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(applicationFullData?.allotted_quantity)}
                </div>
              </div>

              <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>Date</div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(applicationFullData?.createdAt?.split("T")[0])}
                </div>
              </div>
            </div>

            {applicationFullData?.stock_req_product?.length > 0 ? (
              <h1 className='pl-8 font-semibold underline text-blue-950'>
                Assigned Products:
              </h1>
            ) : (
              <>
                <div className='grid md:grid-cols-4 gap-4 ml-8'>
                  <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                    <div className='md:w-auto w-[50%] font-bold '>Category</div>
                    <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                      {nullToNA(applicationFullData?.inventory?.category?.name)}
                    </div>
                  </div>

                  <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                    <div className='md:w-auto w-[50%] font-semibold '>
                      Sub Categories
                    </div>
                    <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                      {nullToNA(
                        applicationFullData?.inventory?.subcategory?.name
                      )}
                    </div>
                  </div>

                  <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                    <div className='md:w-auto w-[50%] font-semibold '>
                      Brand
                    </div>
                    <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                      {nullToNA(
                        applicationFullData?.inventory?.subcategory?.brand || 'N/A'
                      )}
                    </div>
                  </div>

                </div>
              </>
            )}
            {applicationFullData?.stock_req_product?.map((data, index) => (
              <div className='grid md:grid-cols-4 gap-4 ml-8 bg-slate-50 p-4 rounded'>
                <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-bold '>Serial No</div>
                  <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                    {nullToNA(data?.serial_no)}
                  </div>
                </div>

                <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-bold '>Category</div>
                  <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                    {nullToNA(applicationFullData?.inventory?.category?.name)}
                  </div>
                </div>

                <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-semibold '>
                    Sub Categories
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                    {nullToNA(
                      applicationFullData?.inventory?.subcategory?.name
                    )}
                  </div>
                </div>

                <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-bold '>Quantity</div>
                  <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                    {nullToNA(data?.quantity)}
                  </div>
                </div>
              </div>
            ))}

            <div className='p-5 pl-8'>
              <h1 className='font-bold '>Description</h1>
              <p className=' pt-2'>
                {nullToNA(applicationFullData?.inventory?.description)}
              </p>
            </div>
            <div className='flex justify-end w-full mb-5'>
              <div className='w-[100px]'>
                <ImageDisplay
                  preview={""}
                  imageDoc={false}
                  alt={"notesheet document"}
                  showPreview={"hidden"}
                  width={"[100px]"}
                />
              </div>
            </div>
            {(applicationFullData?.is_notified == 2 ||
              applicationFullData?.is_notified == -2) && (
                <div>
                  <p className='flex items-end justify-end w-full text-green-600 font-semibold'>
                    Reply - {""}
                    {applicationFullData?.is_notified == 2
                      ? "Items are required"
                      : applicationFullData?.is_notified == -2
                        ? "Items are not required now"
                        : ""}
                  </p>
                </div>
              )}
          </div>
          <div className='space-x-5 flex justify-end mt-[2rem]'>
            <button className={buttonStyle} onClick={() => navigate(-1)}>
              Back
            </button>

            {applicationFullData?.status?.status == -1 && (
              <button
                className={buttonStyle}
                onClick={() => {
                  navigate(`/sr-edit-pre-procurement/${id}`);
                }}
              >
                Edit
              </button>
            )}

            <input type='file' ref={notesheetRef} className='hidden' />

            <button
              onClick={handlePrint}
              className='mr-1 pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-base leading-tight  rounded bg-indigo-700 text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl'
            >
              Print
            </button>
            {page == "inbox" &&
            <button
              className='mr-1 pb-2 pl-6 pr-6 pt-2 text-base leading-tight  rounded bg-indigo-700 text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl'
              // onClick={stockAssignedDD}
              onClick={() => {
                setRejectModalOpen(true);
                setService("Service");
              }}
            >
              Back to Departmental Distributor
            </button>}

            {page == "inbox" && remQuantity > 0 && (
              <>
                <button
                  className='mr-1 pb-2 pl-6 pr-6 pt-2 text-base leading-tight  rounded bg-indigo-700 text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl'
                  // onClick={stockAssignedDD}
                  onClick={() => {
                    setServiceRequestModal(true);
                    setService("Service");
                  }}
                >
                  Assign To Departmental Distributor
                </button>
              </>
            )}

            {page == "inbox" &&
              remQuantity === 0 &&
              !(
                applicationFullData?.is_notified === 1 ||
                applicationFullData?.is_notified === 2
              ) && (
                <>
                  <button
                    className='mr-1 pb-2 pl-6 pr-6 pt-2 text-base leading-tight  rounded bg-indigo-700 text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl'
                    // onClick={stockAssignedDD}
                    onClick={notifyDaStockReq}
                  >
                    Notify Departmental Admin
                  </button>
                </>
              )}
            {page == "inbox" &&
              remQuantity === 0 &&
              (applicationFullData?.is_notified === 1 ||
                applicationFullData?.is_notified === 2) && (
                <>
                  <button
                    className='mr-1 pb-2 pl-6 pr-6 pt-2 text-base leading-tight  rounded bg-green-600 text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out shadow-xl'
                    disabled
                  >
                    Departmental Admin Already Notified
                  </button>
                </>
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewInventoryDetailsById;
