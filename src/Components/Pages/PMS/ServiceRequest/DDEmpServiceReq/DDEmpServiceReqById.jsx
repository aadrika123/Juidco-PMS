import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import FileButton from "@/Components/Common/FileButtonUpload/FileButton";
import ImageDisplay from "@/Components/Common/FileButtonUpload/ImageDisplay";
import LoaderApi from "@/Components/Common/Loaders/LoaderApi";
import ConfirmationModal from "@/Components/Common/Modal/ConfirmationModal";
import RejectionModalRemark from "@/Components/Common/Modal/RejectionModalRemark";
import ServiceRequestModal from "@/Components/Common/Modal/ServiceRequestModal";
import SuccessModal from "@/Components/Common/Modal/SuccessModal";
import { nullToNA } from "@/Components/Common/PowerUps/PowerupFunctions";
import TimeLine from "@/Components/Common/Timeline/TimeLine";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import ApiHeader from "@/Components/api/ApiHeader";
import ProjectApiList from "@/Components/api/ProjectApiList";
import { contextVar } from "@/Components/context/contextVar";
import React, { useContext, useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const DDEmpServiceReqById = () => {
  const [isLoading, setisLoading] = useState(false);
  const [confModal, setConfModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [retModal, setRetModal] = useState(false);
  const [deadStockModal, setDeadStockModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [warrantyClaimModal, setwarrantyClaimModal] = useState(false);
  const [service, setService] = useState("");
  const [imageDoc, setImageDoc] = useState(false);
  const [preview, setPreview] = useState();
  const [applicationFullData, setapplicationFullData] = useState([]);
  const [serialNo, setserialNo] = useState([]);
  const [productData, setProductData] = useState();
  const [data, setData] = useState({ service_no: "", remark: "" });

  // console.log(data)

  const {

    api_getEmpServiceById,
    api_ddemployeeServiceApprove,
    api_ddemployeeServiceReject
  } = ProjectApiList();

  const { id, page } = useParams();

  const { titleBarVisibility } = useContext(contextVar);

  const navigate = useNavigate();

  let buttonStyle =
    "mr-1 pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-indigo-500 text-base leading-tight  rounded  hover:bg-indigo-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl";

  let buttonStyle2 =
    "mr-1 pb-2 pl-6 pr-6 pt-2 border border-red-500 text-red-500 text-base leading-tight  rounded  hover:bg-red-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl";

  let buttonStyle3 =
    "mr-1 pb-2 pl-6 pr-6 pt-2 border border-green-500 text-white text-md sm:text-sm leading-tight rounded  hover:bg-green-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#4338CA] active:shadow-lg transition duration-150 ease-in-out shadow-xl bg-green-600";

  //Print
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const approveModal = () => {
    setConfModal(true);
  };
  
  const rejectModalfunc = () => {
    setRejectModal(true);
  };

  // console.log()

  //Approve Handler
  const approveHandler = () => {
    setisLoading(true);
    setDeadStockModal(false);
    let body = { service_no: applicationFullData?.service_no };

    AxiosInterceptors.post(`${api_ddemployeeServiceApprove}`, body, ApiHeader())
      .then(function (response) {
        if (response?.data?.status == true) {
          toast.success("Approved successfully", "success");
          setSuccessModal(true);
          setTimeout(() => {
            navigate("/dd-emp-service");
          }, 2000);
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

  //Reject Handler
  const rejectHandler = () => {
    setisLoading(true);
    setDeadStockModal(false);

    AxiosInterceptors.post(`${api_ddemployeeServiceReject}`, data, ApiHeader())
      .then(function (response) {
        if (response?.data?.status == true) {
          toast.success("Rejected successfully", "success");
          setSuccessModal(true);
          setTimeout(() => {
            navigate("/dd-emp-service");
          }, 2000);
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

  //get application details
  const getApplicationDetail = () => {
    setisLoading(true);
    AxiosInterceptors.get(`${api_getEmpServiceById}/${id}`, ApiHeader())
      .then(async function (response) {
        if (response?.data?.status) {
          setapplicationFullData(response?.data?.data);
          setProductData(response?.data?.data?.stock_req_product);
        } else {
          // toast.error(response?.data?.message);
        }
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
        console.log("==2 details by id error...", error);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  const confirmationHandler2 = () => {
    setSuccessModal(false);
    navigate(`/dd-handover`);
  };

  const handleCancel = () => {
    setDeadStockModal(false);
    setRetModal(false);
    setConfModal(false);
    setwarrantyClaimModal(false);
    setRejectModal(false);
  };

  // Forward to DA
  // const rejectHandlerModal = () => {
  //   setConfModal(false);
  // };

  useEffect(() => {
    getApplicationDetail();
    setData((prev) => ({ ...prev, service_no: id }));

  }, []);

 

  if (confModal) {
    return (
      <>
        <ConfirmationModal
          confirmationHandler={approveHandler}
          handleCancel={handleCancel}
          message={'Are you sure want to "Approve" ?'}
          //   sideMessage={'By clicking your data will proceed'}
        />
      </>
    );
  }

  if (rejectModal) {
    return (
      <>
        <RejectionModalRemark
          confirmationHandler={rejectHandler}
          handleCancel={handleCancel}
          message={'Are you sure want to "Reject" ?'}
          setData={setData}
        />
      </>
    );
  }

  if (successModal) {
    return (
      <>
        <SuccessModal
          confirmationHandler={confirmationHandler2}
          message={"Your Request has been Handover Successfully"}
          requestNoMsg={"Reference No:-"}
          refNo={"123654789"}
        />
      </>
    );
  }
  return (
    <>
      {isLoading && <LoaderApi />}

      <TitleBar
        titleBarVisibility={titleBarVisibility}
        titleText={"Employee Service Detail"}
      />

      {/* //timeline  */}
      <div className={`${isLoading ? "blur-[2px]" : ""}`}>
        <TimeLine />
      </div>

      <div className={`${isLoading ? "blur-[2px]" : ""}`}>
        <div className="flex justify-end"></div>
        {/* Basic Details */}
        <div className="mt-6">
          <div
            className="py-6 mt-4 bg-white rounded-lg shadow-xl p-4 space-y-5 border border-blue-500"
            ref={componentRef}
          >
            <div className="">
              <h2 className="font-semibold text-2xl pl-7 pt-2 pb-2 flex justify-start bg-[#4338ca] text-white rounded-md">
                Employee Service Request{" "}
              </h2>
            </div>
            <div className="flex justify-between">
              <div className="pl-8 pb-5 text-[1.2rem] text-[#4338CA]">
                <h1 className="font-bold">
                  Service No <span className="text-black">:</span>
                  <span className="font-light">
                    {" "}
                    {nullToNA(applicationFullData?.service_no)}
                  </span>
                </h1>
                <h1 className="font-bold text-base text-green-500">
                  Service Type <span className="text-black">:</span>
                  <span className="font-light capitalize">
                    {" "}
                    {nullToNA(applicationFullData?.service)}
                  </span>
                </h1>
              </div>
              <div className="pl-8 pb-5 text-[1.2rem] text-[#4338CA]">
                <h1 className="font-bold">
                  Stock Handover No <span className="text-black">:</span>
                  <span className="font-light">
                    {" "}
                    {nullToNA(applicationFullData?.stock_handover_no)}
                  </span>
                </h1>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4 ml-8 pb-5">
              {/* <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                <div className="md:w-auto w-[50%] font-bold">Employee Id</div>
                <div className="md:w-auto w-[50%] text-gray-800 text-md">
                  {nullToNA(applicationFullData?.emp_id)}
                </div>
              </div> */}
              {/* 
              <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                <div className="md:w-auto w-[50%] font-bold ">
                  Employee Name
                </div>
                <div className="md:w-auto w-[50%] text-gray-800 text-md">
                  {nullToNA(applicationFullData?.emp_name)}
                </div>
              </div> */}

              {/* <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                <div className="md:w-auto w-[50%] font-bold ">
                  Quantity Allotted{" "}
                </div>
                <div className="md:w-auto w-[50%] text-gray-800 text-md">
                  {nullToNA(applicationFullData?.allotted_quantity)}
                </div>
              </div> */}

              <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                <div className="md:w-auto w-[50%] font-bold ">
                  Date :{" "}
                  <span className="font-normal">
                    {nullToNA(applicationFullData?.createdAt?.split("T")[0])
                      .split("-")
                      .reverse()
                      .join("-")}
                  </span>
                </div>
                {/* <div className="md:w-auto w-[50%] text-gray-800 text-md">
                  {nullToNA(applicationFullData?.createdAt?.split("T")[0])}
                </div> */}
              </div>
            </div>

            {applicationFullData?.emp_service_req_product?.length > 0 ? (
              <h1 className="pl-8 font-semibold underline text-blue-950">
                Products:
              </h1>
            ) : (
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
                      {nullToNA(
                        applicationFullData?.inventory?.subcategory?.name
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
            {applicationFullData?.emp_service_req_product?.map(
              (data, index) => (
                <div className="grid md:grid-cols-4 gap-4 ml-8 bg-slate-50 p-4 rounded">
                  <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                    <div className="md:w-auto w-[50%] font-bold ">
                      Serial No
                    </div>
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
                      {nullToNA(
                        applicationFullData?.inventory?.subcategory?.name
                      )}
                    </div>
                  </div>

                  <div className="md:flex-1 md:block flex md:flex-row-reverse justify-between">
                    <div className="md:w-auto w-[50%] font-bold ">Quantity</div>
                    <div className="md:w-auto w-[50%] text-gray-800 text-md">
                      {nullToNA(data?.quantity)}
                    </div>
                  </div>
                </div>
              )
            )}

            <div className="p-5 pl-8">
              <h1 className="font-bold ">Description</h1>
              <p className=" pt-2">
                {nullToNA(applicationFullData?.inventory?.description)}
              </p>
            </div>
            <div className="flex justify-end w-full mb-5">
              <div className="w-[100px]">
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

          {/* Buttons */}

          <div className="space-x-5 flex justify-between mt-[2rem]">
            <div className="space-x-3 flex items-end justify-center">
              <button className={buttonStyle} onClick={() => navigate(-1)}>
                Back
              </button>

              <button
                onClick={handlePrint}
                className="mr-1 pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-base leading-tight  rounded bg-indigo-700 text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl"
              >
                Print
              </button>
            </div>

            <div className="space-x-3 flex items-end justify-center">
              {page == "inbox" && (
                <>
                 
                    <button
                      className={`${buttonStyle2}`}
                      onClick={rejectModalfunc}
                    >
                      Reject
                    </button>

                    <button
                      className={`${buttonStyle3}`}
                      onClick={approveModal}
                    >
                      Approve
                    </button>

                  
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DDEmpServiceReqById;
