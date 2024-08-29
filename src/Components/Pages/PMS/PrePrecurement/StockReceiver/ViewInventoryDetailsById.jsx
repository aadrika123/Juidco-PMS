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
import ApiHeader2 from "@/Components/api/ApiHeader2";
import ConfirmationModal from "@/Components/Common/Modal/ConfirmationModal";
import LoaderApi from "@/Components/Common/Loaders/LoaderApi";
import TimeLine from "@/Components/Common/Timeline/TimeLine";
import { useReactToPrint } from "react-to-print";
import StockRequestTimeline from "@/Components/Common/Timeline/StockRequestTimeline";
import ServiceRequestModal from "@/Components/Common/Modal/ServiceRequestModal";

const ViewInventoryDetailsById = (props) => {
  const navigate = useNavigate();
  const notesheetRef = useRef();
  const { id, page } = useParams();

  const [erroState, seterroState] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [applicationFullData, setapplicationFullData] = useState();
  const [tableData, setTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageDoc, setImageDoc] = useState(false);
  const [preview, setPreview] = useState();
  const [serviceRequestModal, setServiceRequestModal] = useState(false);
  const [service, setService] = useState("");



  const { api_postForwardToDA, api_getStockRequetById, api_iaStockReqApprove } =
    ProjectApiList();

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
    seterroState(false);

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
          setTableData(response?.data?.data?.tran_dtls);
        } else {
          toast.error(response?.data?.message);
          seterroState(true);
        }
      })
      .catch(function (error) {
        toast.error("Error while getting details...");
        seterroState(true);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  //forward to da procurement-------------
  const forwardToDA = () => {
    setisLoading(true);
    setIsModalOpen(false);
    // seterroState(false);
    // let preProcurement = [id];
    let formData = new FormData();
    formData.append("img", imageDoc);
    formData.append("preProcurement", JSON.stringify([id]));

    AxiosInterceptors.post(`${api_postForwardToDA}`, formData, ApiHeader2())
      .then(function (response) {
        if (response?.data?.status == true) {
          setisLoading(false);
          toast.success(response?.data?.message, "success");
          setTimeout(() => {
            navigate("/sr-inventory-proposal");
          }, 500);
        } else {
          setisLoading(false);
          // toast(response?.data?.message, "error");
        }
      })
      .catch(function (error) {
        console.log("errorrr.... ", error);
        toast.error(error?.response?.data?.message);
        // setdeclarationStatus(false);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  const stockAssignedDD = () => {
    setisLoading(true);
    // setIsModalOpen(false);

    AxiosInterceptors.post(
      `${api_iaStockReqApprove}`,
      { stock_handover_no: [id] },
      ApiHeader2()
    )
      .then(function (response) {
        if (response?.data?.status == true) {
          setisLoading(false);
          toast.success("Stock Assigned to Departmental Distributor");
            navigate("/inventory-stockRequest?tabNo=1");
        } else {
          setisLoading(false);
          // toast(response?.data?.message, "error");
        }
      })
      .catch(function (error) {
        console.log("errorrr.... ", error);
        toast.error(error?.response?.data?.message);
        // setdeclarationStatus(false);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  const confirmationHandler = () => {
    forwardToDA();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getApplicationDetail();
  }, []);

  //displaying confirmation message
  if (isModalOpen) {
    return (
      <>
        <ConfirmationModal
          confirmationHandler={confirmationHandler}
          handleCancel={handleCancel}
          message={"Are you sure you want to Forward to DA"}
        />
      </>
    );
  }

  if (serviceRequestModal) {
    return (
      <>
        <ServiceRequestModal
          stockReqData={applicationFullData?.stock_req_product}
          stockHandNo={applicationFullData?.stock_handover_no}
          setServiceRequestModal={setServiceRequestModal}
          service={service}
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
            </div>


            <div className="grid md:grid-cols-4 gap-4 ml-8 pb-5">
              <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                <div className="md:w-auto w-[50%] font-bold">Employee Id</div>
                <div className="md:w-auto w-[50%] text-gray-800 text-md">
                  {nullToNA(applicationFullData?.emp_id)}
                </div>
              </div>

              <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                <div className="md:w-auto w-[50%] font-bold ">
                  Employee Name
                </div>
                <div className="md:w-auto w-[50%] text-gray-800 text-md">
                  {nullToNA(applicationFullData?.emp_name)}
                </div>
              </div>

              <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                <div className="md:w-auto w-[50%] font-bold ">
                  Quantity Allotted{" "}
                </div>
                <div className="md:w-auto w-[50%] text-gray-800 text-md">
                  {nullToNA(applicationFullData?.allotted_quantity)}
                </div>
              </div>

              <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                <div className="md:w-auto w-[50%] font-bold ">Date</div>
                <div className="md:w-auto w-[50%] text-gray-800 text-md">
                  {nullToNA(applicationFullData?.createdAt?.split("T")[0])}
                </div>
              </div>
            </div>
              

            {applicationFullData?.stock_req_product?.length > 0 ? 
              <h1 className="pl-8 font-semibold underline text-blue-950">Products:</h1>
            :
            <>
            <div className="grid md:grid-cols-4 gap-4 ml-8">
            <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                <div className="md:w-auto w-[50%] font-bold ">Category</div>
                <div className="md:w-auto w-[50%] text-gray-800 text-md">
                  {nullToNA(applicationFullData?.inventory?.category?.name)}
                </div>
              </div>

              <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                <div className="md:w-auto w-[50%] font-semibold ">
                  Sub Categories
                </div>
                <div className="md:w-auto w-[50%] text-gray-800 text-md">
                  {nullToNA(applicationFullData?.inventory?.subcategory?.name)}
                </div>
              </div>
            </div>
            </>}
              {applicationFullData?.stock_req_product?.map((data,index)=>(
            <div className="grid md:grid-cols-4 gap-4 ml-8 bg-slate-50 p-4 rounded">
              
              <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                <div className="md:w-auto w-[50%] font-bold ">Serial No</div>
                <div className="md:w-auto w-[50%] text-gray-800 text-md">
                  {nullToNA(data?.serial_no)}
                </div>
              </div>
             
              <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                <div className="md:w-auto w-[50%] font-bold ">Category</div>
                <div className="md:w-auto w-[50%] text-gray-800 text-md">
                  {nullToNA(applicationFullData?.inventory?.category?.name)}
                </div>
              </div>

              <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                <div className="md:w-auto w-[50%] font-semibold ">
                  Sub Categories
                </div>
                <div className="md:w-auto w-[50%] text-gray-800 text-md">
                  {nullToNA(applicationFullData?.inventory?.subcategory?.name)}
                </div>
              </div>

              <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                <div className="md:w-auto w-[50%] font-bold ">Quantity</div>
                <div className="md:w-auto w-[50%] text-gray-800 text-md">
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
                  preview={preview}
                  imageDoc={imageDoc}
                  alt={"notesheet document"}
                  showPreview={"hidden"}
                  width={"[100px]"}
                />
              </div>
            </div>
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

            {page == "inbox" && (
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
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewInventoryDetailsById;
