import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import FileButton from "@/Components/Common/FileButtonUpload/FileButton";
import ImageDisplay from "@/Components/Common/FileButtonUpload/ImageDisplay";
import LoaderApi from "@/Components/Common/Loaders/LoaderApi";
import ConfirmationModal from "@/Components/Common/Modal/ConfirmationModal";
import { nullToNA } from "@/Components/Common/PowerUps/PowerupFunctions";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import ApiHeader from "@/Components/api/ApiHeader";
import ProjectApiList from "@/Components/api/ProjectApiList";
import { contextVar } from "@/Components/context/contextVar";
import React, { useContext, useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import ServiceRequestModal from "@/Components/Common/Modal/ServiceRequestModal";
// import ServiceRequestModal from "./ServiceRequestModal";

const DDServiceRequestById = () => {
  const [isLoading, setisLoading] = useState(false);
  const [confModal, setConfModal] = useState(false);
  const [forwardModal, setForwardDA] = useState(false);
  const [retModal, setRetModal] = useState(false);
  const [deadStockModal, setDeadStockModal] = useState(false);
  const [service, setService] = useState("");
  const [warrantyClaimModal, setwarrantyClaimModal] = useState(false);
  const [imageDoc, setImageDoc] = useState(false);
  const [preview, setPreview] = useState();
  const [applicationFullData, setapplicationFullData] = useState([]);
  const [productData, setProductData] = useState();
  const {
    api_getServiceRequestId,
    api_approveServiceRequestEmpDa,
    api_approveServiceRequestDD,
  } = ProjectApiList();

  const { refNo, page } = useParams();
  const nevigate = useNavigate();

  let buttonStyle2 =
    "p-2 pl-4 pr-4 border border-indigo-500 text-white text-md sm:text-sm leading-tight rounded  hover:bg-white  hover:text-indigo-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#4338CA] active:shadow-lg transition duration-150 ease-in-out shadow-xl bg-[#4338CA]";

  // console.log(refNo)

  const { titleBarVisibility } = useContext(contextVar);

  const navigate = useNavigate();
  const notesheetRef = useRef();

  let buttonStyle =
    "mr-1 pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-indigo-500 text-base leading-tight  rounded  hover:bg-indigo-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl";

  //Print
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  //get application details
  const getApplicationDetail = () => {
    setisLoading(true);
    AxiosInterceptors.get(`${api_getServiceRequestId}/${refNo}`, ApiHeader())
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

  const handleCancel = () => {
    setDeadStockModal(false);
    setRetModal(false);
    setConfModal(false);
    setwarrantyClaimModal(false);
    setForwardDA(false);
  };

  // Forward to DA

  const confirmationHandler = () => {
    approveServiceRequest();
    setForwardDA(false);
  };

  const approveServiceRequest = () => {
    setisLoading(true);

    AxiosInterceptors.post(
      `${api_approveServiceRequestEmpDa}`,
      { service_no: refNo },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status) {
          toast.success("Forwarded to IA Successfully");
          nevigate(`/dd-service-request`);
          setisLoading(false);
        } else {
          console.log("error in forwarding to da...", error);
        }
      })
      .catch(function (err) {
        toast.error(err?.response?.data?.message);
      });
  };

  //Service request
  const serviceRequestHandler = (service) => {
    const productList = [];
    applicationFullData?.emp_service_req_product?.map((data) =>
      productList.push(data?.serial_no)
    );
    setisLoading(true);
    let body = {
      products: productList,
      service: service,
      stock_handover_no: applicationFullData?.stock_handover_no,
      inventoryId: applicationFullData?.inventory?.id,
    };

    // console.log(body)

    AxiosInterceptors.post(`${api_approveServiceRequestDD}`, body, ApiHeader())
      .then(function (response) {
        if (response?.data?.status == true) {
          approveServiceRequest();
          toast.success(`Request created successfully`);
          navigate(`/dd-service-request`);
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
  }, []);

  if (forwardModal) {
    return (
      <>
        <ConfirmationModal
          confirmationHandler={confirmationHandler}
          handleCancel={handleCancel}
          message={"Are you sure you want to Approve?"}
        />
      </>
    );
  }

  // if (serviceRequestModal) {
  //   return (
  //     <>
  //       <ServiceRequestModal
  //         submit={serviceRequestHandler}
  //         setserialNo={setserialNo}
  //         serialNo={serialNo}
  //         productData={productData}
  //         setServiceRequestModal={setServiceRequestModal}
  //         service={service}
  //         // setInvtId={setInvtId}
  //       />
  //     </>
  //   );
  // }

  return (
    <>
      {isLoading && <LoaderApi />}

      <TitleBar
        titleBarVisibility={titleBarVisibility}
        titleText={"Inventory Proposal Details"}
      />

      {/* //timeline  */}
      {/* <div className={`${isLoading ? "blur-[2px]" : ""}`}>
        <TimeLine />
      </div> */}

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
              <div className='w-full'>
                <div className='pl-8 pb-5 text-[1.2rem] text-[#4338CA] flex justify-between w-full'>
                  <h1 className='font-bold'>
                    Stock Handover No <span className='text-black'>:</span>
                    <span className='font-light'>
                      {" "}
                      {nullToNA(applicationFullData?.stock_handover_no)}
                    </span>
                  </h1>
                  <h1 className='font-bold'>
                    Service Type <span className='text-black'>:</span>
                    <span className='font-light uppercase'>
                      {" "}
                      {nullToNA(
                        applicationFullData?.service === "dead"
                          ? "Dead Stcok"
                          : applicationFullData?.service
                      )}
                    </span>
                  </h1>
                  <h1 className='font-bold'>
                    Service No <span className='text-black'>:</span>
                    <span className='font-light'>
                      {" "}
                      {nullToNA(applicationFullData?.service_no)}
                    </span>
                  </h1>
                </div>
              </div>

              {applicationFullData?.remark && (
                <div className='pr-4 pb-5 text-[1.2rem] text-[#4338CA]'>
                  <h1 className='font-bold'>
                    Remark <span className='text-black'>:</span>
                    <span span className='text-md pt-2 font-light text-red-600'>
                      {" "}
                      {applicationFullData?.remark}
                    </span>
                  </h1>
                </div>
              )}
            </div>

            <div className='grid md:grid-cols-4 gap-4 ml-8 pb-5'>
              <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold'>Category </div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(applicationFullData?.inventory?.category?.name)}
                </div>
              </div>

              <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>Sub Category</div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(applicationFullData?.inventory?.subcategory?.name)}
                </div>
              </div>

              <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>Brand</div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(applicationFullData?.inventory?.brand?.name)}
                </div>
              </div>

              {/* <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>
                  Quantity Allotted{" "}
                </div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(applicationFullData?.allotted_quantity)}
                </div>
              </div> */}

              <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>Date</div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(applicationFullData?.createdAt?.split("T")[0])}
                </div>
              </div>
            </div>

            <h1 className='pl-8 font-semibold underline text-blue-950'>
              Request:
            </h1>
            {applicationFullData?.emp_service_req_product?.length > 0
              ? applicationFullData?.emp_service_req_product?.map((data) => (
                  <>
                    <div className='grid md:grid-cols-4 gap-4 ml-8'>
                      <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                        <div className='md:w-auto w-[50%] font-bold '>
                          Serial Number
                        </div>
                        <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                          {nullToNA(data?.serial_no)}
                        </div>
                      </div>

                      <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                        <div className='md:w-auto w-[50%] font-semibold '>
                          Quantity
                        </div>
                        <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                          {nullToNA(data?.quantity)}
                        </div>
                      </div>
                    </div>
                  </>
                ))
              : "No Data available"}

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
              <h1 className='font-bold'>Description</h1>
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

          {/* Buttons */}

          <div className='space-x-5 flex justify-between mt-[2rem]'>
            <div className='space-x-3 flex items-end justify-center'>
              <button className={buttonStyle} onClick={() => navigate(-1)}>
                Back
              </button>

              <button
                onClick={handlePrint}
                className='mr-1 pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-base leading-tight  rounded bg-indigo-700 text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl'
              >
                Print
              </button>
            </div>

            {(applicationFullData?.status == 0 ||
              applicationFullData?.status == -1 ||
              applicationFullData?.status == 10) && (
              <div className='space-x-3 flex items-end justify-center'>
                {page == "inbox" && (
                  <>
                    <button
                      className={buttonStyle2}
                      onClick={() => {
                        serviceRequestHandler("return");
                      }}
                    >
                      Return
                    </button>

                    <button
                      className={buttonStyle2}
                      onClick={() => {
                        serviceRequestHandler("dead");
                      }}
                    >
                      Dead Stock
                    </button>

                    <button
                      className={buttonStyle2}
                      onClick={() => {
                        serviceRequestHandler("warranty");
                      }}
                    >
                      Warranty claims
                    </button>
                  </>
                )}

                {page == "inbox" && (
                  <div className='bg-[#359F6E] h-full rounded-md text-md flex items-center justify-center hover:bg-green-700'>
                    <FileButton
                      bg={"[#359F6E]"}
                      hoverBg={"bg-green-700"}
                      btnLabel={"Upload References"}
                      imgRef={notesheetRef}
                      setImageDoc={setImageDoc}
                      setPreview={setPreview}
                      textColor={"white"}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DDServiceRequestById;
