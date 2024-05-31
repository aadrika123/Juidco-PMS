//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash alam
//    Version - 1.0
//    Date - 24/05/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - ViewPostInvtDetailsById
//    DESCRIPTION - ViewPostInvtDetailsById
//////////////////////////////////////////////////////////////////////////////////////

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { nullToNA } from "@/Components/Common/PowerUps/PowerupFunctions";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ProjectApiList from "@/Components/api/ProjectApiList";
import ApiHeader from "@/Components/api/ApiHeader";
import toast from "react-hot-toast";
import { MdTag } from "react-icons/md";
import { indianAmount } from "@/Components/Common/PowerUps/PowerupFunctions";
// import { contextVar } from '@/Components/context/contextVar'
// import { contextVar } from '@/Components/context/contextVar'
import { useContext } from "react";
// import TitleBar from "@/Components/Pages/Others/TitleBar";

import { contextVar } from "@/Components/context/contextVar";
// import { useContext } from 'react'
import TitleBar from "@/Components/Pages/Others/TitleBar";
// import StockReceiverModal from "./StockReceiverModal";
// import ReleaseTenderModal from "./ReleaseTenderModal";
// import DaRejectModal from "./DaRejectModal";

// import ListTable from "src/Components/Common/ListTable/ListTable";
// import PaymentHistory from "src/Components/Common/PaymentHistory/PaymentHistory";

const ViewPostInvtDetailsById = (props) => {
  const navigate = useNavigate();
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

  const {
    api_fetchProcurementDetailById,
    api_fetchOutboxProcurementDetailById,
    api_postBackToSR,
    api_postReleaseTender,
    api_postRejectTender,
    api_postDaEditTender,
  } = ProjectApiList();

  // Accessing context for notifications
  const {
    setheartBeatCounter,
    settoggleBar,
    titleBarVisibility,
    titleText,
    notify,
  } = useContext(contextVar);

  let buttonStyle =
    "  pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-indigo-500 text-md leading-tight  rounded  hover:bg-indigo-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl";

  let buttonStyle2 =
    " mr-2 pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-white text-md sm:text-md leading-tight rounded  hover:bg-white  hover:text-indigo-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl bg-indigo-700";

  let buttonStyle3 =
    " pb-2 pl-4 pr-4 pt-2 border border-yellow-400 text-white text-md sm:text-md leading-tight rounded  hover:bg-white  hover:text-yellow-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl bg-yellow-700";

  useEffect(() => {
    getApplicationDetail();
  }, []);

  ///////////{*** APPLICATION FULL DETAIL ***}/////////
  const getApplicationDetail = () => {
    let url;
    seterroState(false);
    setisLoading(true);

    if (page == "inbox") {
      url = api_fetchProcurementDetailById;
    }
    if (page == "outbox") {
      url = api_fetchOutboxProcurementDetailById;
    }

    AxiosInterceptors.get(`${url}/${id}`, {}, ApiHeader())
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
          }, 2000);
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
          }, 2000);
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
    // seterroState(false);
    setisLoading(true);

    AxiosInterceptors.post(
      `${api_postReleaseTender}`,
      { preProcurement: [id] },
      ApiHeader()
    )
      .then(function (response) {
        console.log("Forwarded to DA", response?.data);
        console.log(response?.data?.st, "upper Status");
        if (response?.data?.status == true) {
          setisLoading(false);
          console.log(response?.data?.message, "-------------->>");
          toast.success(response?.data?.message, "success");
          setTimeout(() => {
            navigate("/da-inventory-proposal");
          }, 2000);
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

  // if (isModalOpen3) {
  //   return (
  //     <>
  //       <DaRejectModal postRejectTender={postRejectTender} setRemark={setRemark} setIsModalOpen3={setIsModalOpen3}/>
  //     </>
  //   );
  // }

  // if (isModalOpen) {
  //   return (
  //     <>
  //       <StockReceiverModal postBackToSR={postBackToSR} setRemark={setRemark} setIsModalOpen={setIsModalOpen}/>
  //     </>
  //   );
  // }

  // if (isModalOpen2) {
  //   return (
  //     <>
  //       <ReleaseTenderModal postReleaseTender={postReleaseTender} setIsModalOpen2={setIsModalOpen2}/>
  //     </>
  //   );
  // }

  // console.log(applicationFullData)

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <div className=''>
        <div className=''>
          <TitleBar
            titleBarVisibility={titleBarVisibility}
            titleText={"Inventory Proposal Details"}
          />
        </div>
        {/* Basic Details */}
        <div className='mt-6' id='printable-content'>
          {/* <div className="flex justify-between mt-2 bg-indigo-600 text-white rounded-lg shadow-xl p-4 border border-blue-500 ">
            <h2 className="font-semibold text-xl flex justify-start">
              <MdTag className="inline pt-1 text-[1.5rem] text-sky-700 text-white" /> View
              Procurement Request{" "}
            </h2>
          </div> */}

          <div className='py-6 mt-4 bg-white rounded-lg shadow-xl p-4 space-y-5 border border-blue-500'>
            <div className=''>
              <h2 className='font-semibold text-2xl pl-7 pb-2 pt-2 flex justify-start bg-[#4338CA] text-white rounded-md'>
                View Procurement Request
              </h2>
            </div>

            <div className='flex justify-between'>
              {!applicationFullData?.remark?.length == 0 && (
                <div className='pb-5 pl-8'>
                  <h1 className='font-bold text-base text-green-600'>
                    Remark <span className='text-black'>:</span>
                    <span className='text-md pt-2 font-light text-green-600'>
                      {" "}
                      {nullToNA(applicationFullData?.remark)}
                    </span>
                  </h1>
                </div>
              )}
              <div className='pl-8 pb-5 text-[1.2rem] text-[#4338CA]'>
                <h1 className='font-bold'>
                  Procurement Request No <span className='text-black'>:</span>
                  <span className='font-light'>
                    {" "}
                    {nullToNA(applicationFullData?.procurement_no)}
                  </span>
                </h1>
              </div>
            </div>

            <div className='grid grid-cols-4 gap-4 ml-8'>
              {/* {applicationFullData?.category?.name == ("Uniforms" || "Maintainance and Repaire" || "Safety and Security" ||"Cleaning Supplies" || "Furniture") &&  */}

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>
                  Item Category
                </div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(applicationFullData?.category.name)}
                </div>
              </div>

              {/* } */}

              {/* {applicationFullData?.category?.name == ("Uniforms" || "Maintainance and Repaire" || "Safety and Security" ||"Cleaning Supplies" || "Furniture") &&  */}

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>
                  Item Sub Category
                </div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(applicationFullData?.subcategory?.name)}
                </div>
              </div>

              {/* } */}

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>Brand</div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(applicationFullData?.brand?.name)}
                </div>
              </div>

              {applicationFullData?.category?.name ==
                ("Uniforms" ||
                  "Maintainance and Repaire" ||
                  "Cleaning Supplies" ||
                  "Furniture") && (
                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-semibold '>Colour</div>
                  <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                    {nullToNA(applicationFullData?.colour)}
                  </div>
                </div>
              )}

              {/* </div> */}

              {/* <div className='flex md:flex-row flex-col gap-y-2 md:space-x-5 pl-4  '> */}

              {applicationFullData?.category?.name ==
                ("Uniforms" ||
                  "Maintainance and Repaire" ||
                  "Furniture" ||
                  "Cleaning Supplies") && (
                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-bold '>Material</div>
                  <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                    {nullToNA(applicationFullData?.material)}
                  </div>
                </div>
              )}

              {applicationFullData?.category?.name ==
                ("Maintainance and Repaire" || "Safety and Security") && (
                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-bold '>Dimension</div>
                  <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                    {nullToNA(applicationFullData?.dimension)}
                  </div>
                </div>
              )}

              {applicationFullData?.category?.name == "Furniture" && (
                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-bold '>Room Type</div>
                  <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                    {nullToNA(applicationFullData?.room_type)}
                  </div>
                </div>
              )}

              {applicationFullData?.category?.name == "Furniture" && (
                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-semibold '>
                    Included Components
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                    {nullToNA(applicationFullData?.included_components)}
                  </div>
                </div>
              )}

              {/* </div> */}

              {/* <div className='flex md:flex-row flex-col gap-y-2 md:space-x-5 pl-4  '> */}

              {applicationFullData?.category?.name == "Furniture" && (
                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-bold '>size</div>
                  <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                    {nullToNA(applicationFullData?.size)}
                  </div>
                </div>
              )}

              {applicationFullData?.category?.name == "Cleaning Supplies" && (
                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-bold '>
                    Recomended Uses
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                    {nullToNA(applicationFullData?.recomended_uses)}
                  </div>
                </div>
              )}

              {applicationFullData?.category?.name == "Cleaning Supplies" && (
                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-bold '>Bristle</div>
                  <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                    {nullToNA(applicationFullData?.bristle)}
                  </div>
                </div>
              )}

              {applicationFullData?.category?.name ==
                ("Maintainance and Repaire" || "Safety and Security") && (
                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-semibold '>Weight</div>
                  <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                    {nullToNA(applicationFullData?.weight)}
                  </div>
                </div>
              )}

              {/* </div> */}

              {/* <div className='flex md:flex-row flex-col gap-y-2 md:space-x-5 pl-4  '> */}

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-semibold '>Rate</div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(applicationFullData?.rate)}
                </div>
              </div>

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>Quantity</div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(applicationFullData?.quantity)}
                </div>
              </div>

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>Total Rate</div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(applicationFullData?.total_rate)}
                </div>
              </div>

              {/* </div> */}

              {/* <div className='flex md:flex-row flex-col gap-y-2 md:space-x-5 pl-4  '> */}

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>
                  {/* {nullToNA(applicationFullData?.quantity)} */}
                </div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {/* Quantity  */}
                </div>
              </div>

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>
                  {/* {nullToNA(applicationFullData?.applicant_name)} */}
                </div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {/* Total Rate   */}
                </div>
              </div>

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>
                  {/* {nullToNA(applicationFullData?.mobile)} */}
                </div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {/* Brand  */}
                </div>
              </div>

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-semibold '>
                  {/* {nullToNA(applicationFullData?.email)} */}
                </div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {/* Processor  */}
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

           {/* Additional Details */}

           <div className='py-6 mt-8 bg-white rounded-lg shadow-xl p-4 space-y-5 border border-blue-500 '>
            <div className=''>
              <h2 className='font-semibold text-2xl pl-7 pt-2 pb-2 flex justify-start bg-[#4338ca] text-white rounded-md'>
                {/* <MdTag className=' text-[2rem] text-sky-700' />  */}
                Supplier Details
              </h2>
            </div>

            <div className='grid grid-cols-4 gap-4 ml-9'>
              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>
                  Supplier Name
                </div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(
                    applicationFullData?.post_procurement?.supplier_name
                  )}
                </div>
              </div>

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>GST No</div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(applicationFullData?.post_procurement?.gst_no)}
                </div>
              </div>

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>Final Rate</div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(applicationFullData?.post_procurement?.final_rate)}
                </div>
              </div>

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>GST %</div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(applicationFullData?.post_procurement?.gst)}
                </div>
              </div>

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>Total Price</div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(applicationFullData?.post_procurement?.total_price)}
                </div>
              </div>

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>
                  Total Quantity
                </div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(
                    applicationFullData?.post_procurement?.total_quantity
                  )}
                </div>
              </div>

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>
                  Total Received Items
                </div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {applicationFullData?.total_receivings
                    ? applicationFullData?.total_receivings
                    : 0}
                </div>
              </div>

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>Unit Price</div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(applicationFullData?.post_procurement?.unit_price)}
                </div>
              </div>

              <div className='h-[40px]'></div>
            </div>
          </div>


        </div>
        <div className='space-x-5 flex justify-end mt-[3rem]'>
          <button onClick={handlePrint} className={buttonStyle}>
            Print
          </button>

          <button className={buttonStyle} onClick={() => navigate(-1)}>
            Back
          </button>

          {/* <button
              className={buttonStyle}
              onClick={() => {
                navigate(`/da-edit-pre-procurement/${id}`);
              }}
            >
              Edit
            </button>

            <button
              className={`${buttonStyle} mr-0`}
              onClick={postRejectTenderModal}
            >
              Reject
            </button>

            <button className={buttonStyle} onClick={postBackToSRModal}>
              Back To Stock Receiver
            </button> */}

          <button className={buttonStyle2} onClick=''>
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewPostInvtDetailsById;
