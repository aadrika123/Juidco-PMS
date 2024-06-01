//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash alam
//    Version - 1.0
//    Date - 25/05/2024
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
import { indianAmount } from "@/Components/Common/PowerUps/PowerupFunctions";
import { contextVar } from "@/Components/context/contextVar";
import StockReceiverModal from "./StockReceiverModal";
import ReleaseTenderModal from "./ReleaseTenderModal";
import DaRejectModal from "./DaRejectModal";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import FileButton from "@/Components/Common/FileButtonUpload/FileButton";
import ImageDisplay from "@/Components/Common/FileButtonUpload/ImageDisplay";
import ApiHeader2 from "@/Components/api/ApiHeader2";

const ViewInventoryDetailsById = (props) => {
  const navigate = useNavigate();
  const notesheetRef = useRef();

  const { id, page } = useParams();
  console.log("param", id);

  console.log("page========>", page);

  const [erroState, seterroState] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [applicationFullData, setapplicationFullData] = useState();
  const [tableData, setTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [remark, setRemark] = useState("");
  const [imageDoc, setImageDoc] = useState();
  const [preview, setPreview] = useState();

  const {
    api_fetchProcurementDADetailByIdinbox,
    api_fetchProcurementDADetailByIdOutbox,
    api_postBackToSR,
    api_postReleaseTender,
    api_postRejectTender,
  } = ProjectApiList();

  const { titleBarVisibility } = useContext(contextVar);

  let buttonStyle =
    " mr-1 pb-3 pl-6 pr-6 pt-3 border border-indigo-500 text-indigo-800 text-md leading-tight  rounded  hover:bg-indigo-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl";

  let buttonStyle2 =
    " p-2 border border-indigo-500 text-white text-md sm:text-md leading-tight rounded  hover:bg-white  hover:text-indigo-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl bg-indigo-700";

  useEffect(() => {
    getApplicationDetail();
  }, []);

  ///////////{*** APPLICATION FULL DETAIL ***}/////////
  const getApplicationDetail = () => {
    let url;
    seterroState(false);
    setisLoading(true);

    if (page == "inbox") {
      url = api_fetchProcurementDADetailByIdinbox;
    }
    if (page == "outbox") {
      url = api_fetchProcurementDADetailByIdOutbox;
    }

    AxiosInterceptors.get(`${url}/${id}`, ApiHeader())
      .then(function (response) {
        console.log("view water tanker full details ...", response?.data?.data);
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

  const postBackToSRModal = () => {
    setIsModalOpen(true);
  };
  const postReleaseTenderModal = () => {
    setIsModalOpen2(true);
  };
  const postRejectTenderModal = () => {
    setIsModalOpen3(true);
  };

  const postRejectTender = () => {
    setisLoading(true);
    console.log(remark, "Remark==========>>");

    AxiosInterceptors.post(
      `${api_postRejectTender}`,
      { preProcurement: [id], remark: remark },
      ApiHeader()
    )
      .then(function (response) {
        console.log("Forwarded to DA", response?.data);
        console.log(response?.data?.st, "upper Status");
        if (response?.data?.status == true) {
          setisLoading(false);
          toast.success(response?.data?.message, "success");
          setTimeout(() => {
            navigate("/da-inventory-proposal");
          }, 1000);
        } else {
          setisLoading(false);
          const errorMsg = Object.keys(response?.data?.data);
          setErrRes(errorMsg);
          toast(response?.data?.message, "error");
        }
      })
      .catch(function (error) {
        console.log("errorrr.... ", error);
      });
  };
  const postBackToSR = () => {
    setisLoading(true);
    console.log(remark, "Remark==========>>");

    AxiosInterceptors.post(
      `${api_postBackToSR}`,
      { preProcurement: [id], remark: remark },
      ApiHeader()
    )
      .then(function (response) {
        console.log("Forwarded to DA", response?.data);
        console.log(response?.data?.st, "upper Status");
        if (response?.data?.status == true) {
          setisLoading(false);
          toast.success(response?.data?.message, "success");
          setTimeout(() => {
            navigate("/da-inventory-proposal");
          }, 1000);
        } else {
          setisLoading(false);
          const errorMsg = Object.keys(response?.data?.data);
          setErrRes(errorMsg);
          toast(response?.data?.message, "error");
        }
      })
      .catch(function (error) {
        console.log("errorrr.... ", error);
      });
  };

  const postReleaseTender = () => {
    let formData = new FormData();
    formData.append("img", imageDoc);
    formData.append("preProcurement", [id]);
    // seterroState(false);
    setisLoading(true);

    AxiosInterceptors.post(`${api_postReleaseTender}`, formData, ApiHeader2())
      .then(function (response) {
        console.log("Forwarded to DA", response?.data);
        console.log(response?.data?.st, "upper Status");
        if (response?.data?.status == true) {
          setisLoading(false);
          console.log(response?.data?.message, "-------------->>");
          toast.success(response?.data?.message, "success");
          setTimeout(() => {
            navigate("/da-inventory-proposal");
          }, 1000);
          console.log(response?.data?.message, "Forwadede to DA--->>");
        } else {
          setisLoading(false);
          // setdeclarationStatus(false);
          const errorMsg = Object.keys(response?.data?.data);
          setErrRes(errorMsg);
          console.log(errorMsg, "====>>");
          toast(response?.data?.message, "error");
        }
      })
      .catch(function (error) {
        console.log("errorrr.... ", error);
        // setdeclarationStatus(false);
      });
  };

  if (isModalOpen3) {
    return (
      <>
        <DaRejectModal
          postRejectTender={postRejectTender}
          setRemark={setRemark}
          setIsModalOpen3={setIsModalOpen3}
        />
      </>
    );
  }
  if (isModalOpen) {
    return (
      <>
        <StockReceiverModal
          postBackToSR={postBackToSR}
          setRemark={setRemark}
          setIsModalOpen={setIsModalOpen}
        />
      </>
    );
  }

  if (isModalOpen2) {
    return (
      <>
        <ReleaseTenderModal
          postReleaseTender={postReleaseTender}
          setIsModalOpen2={setIsModalOpen2}
        />
      </>
    );
  }

  // console.log(applicationFullData)

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <div className=''>
        <TitleBar
          titleBarVisibility={titleBarVisibility}
          titleText={"Inventory Proposal Details"}
        />
      </div>
      <div className=''>
        {/* Basic Details */}
        <div className='mt-6'>
          <div
            className='py-6 mt-2 bg-white rounded-lg shadow-xl p-4 space-y-5 border border-blue-500'
            id='printable-content'
          >
            <div className=''>
              <h2 className='font-semibold text-2xl pl-7 pt-2 pb-2 flex justify-start bg-[#4338ca] text-white rounded-md'>
                View Procurement Request{" "}
              </h2>
            </div>

            <div className='flex justify-between'>
              {!applicationFullData?.remark?.length == 0 && (
                <div className='pb-5 pl-8'>
                  <h1 className='font-bold text-base text-green-600'>
                    Remark <span className='text-black'>:</span>
                    <span className='text-md pt-2 font-ligh text-green-600'>
                      {" "}
                      {nullToNA(applicationFullData?.remark)}
                    </span>
                  </h1>
                </div>
              )}

              <div className='pl-8 text-[1rem] text-[#4338CA]'>
                <h1 className=''>
                  Procurement Request No <span className='text-black'>:</span>
                  <span className='font-bold'>
                    {" "}
                    {nullToNA(applicationFullData?.procurement_no)}
                  </span>
                </h1>
              </div>
            </div>

            <div className='grid md:grid-cols-4 gap-4 ml-8'>
              <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>
                  Item Category
                </div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(applicationFullData?.category.name)}
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
                <div className='md:w-auto w-[50%] font-semibold '>
                  Rate per Quantity
                </div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(applicationFullData?.rate)}
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

            <div className='flex justify-end mb-4'>
              <ImageDisplay
                preview={preview}
                imageDoc={imageDoc}
                alt={"Notesheet doc"}
                showPreview={"hidden"}
                width={"[100px]"}
              />
            </div>

            {/* <div className='h-[30px]'></div> */}
          </div>
          <div className='space-x-5 flex justify-end mt-[2rem]'>
            <button onClick={handlePrint} className={buttonStyle}>
              Print
            </button>

            {page == "outbox" && (
              <button className={buttonStyle} onClick={() => navigate(-1)}>
                Back
              </button>
            )}

            {page == "inbox" && (
              <button
                className={buttonStyle}
                onClick={() => {
                  navigate(`/da-edit-pre-procurement/${id}`);
                }}
              >
                Edit
              </button>
            )}

            {page == "inbox" && (
              <>
                <button
                  className={`${buttonStyle} mr-0`}
                  onClick={postRejectTenderModal}
                >
                  Reject
                </button>

                <button className={buttonStyle} onClick={postBackToSRModal}>
                  Back To Stock Receiver
                </button>

                <button
                  className={buttonStyle2}
                  onClick={postReleaseTenderModal}
                >
                  Release For Tender
                </button>

                <div className='bg-[#359F6E] h-full py-2 rounded-md text-md flex items-center justify-center hover:bg-green-700'>
                  <FileButton
                    bg={"[#359F6E]"}
                    hoverBg={"bg-green-700"}
                    btnLabel={"Upload Notesheet"}
                    imgRef={notesheetRef}
                    setImageDoc={setImageDoc}
                    setPreview={setPreview}
                    textColor={"white"}
                    // paddingY={"8"}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewInventoryDetailsById;
