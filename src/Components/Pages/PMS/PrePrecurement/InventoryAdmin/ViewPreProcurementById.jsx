//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash alam
//    Version - 1.0
//    Date - 25/05/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - ViewPreProcurementById
//    DESCRIPTION - ViewPreProcurementById
//////////////////////////////////////////////////////////////////////////////////////

import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { nullToNA } from "@/Components/Common/PowerUps/PowerupFunctions";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ProjectApiList from "@/Components/api/ProjectApiList";
import ApiHeader from "@/Components/api/ApiHeader";
import toast from "react-hot-toast";
import { contextVar } from "@/Components/context/contextVar";
// import StockReceiverModal from "@";
// import ReleaseTenderModal from "./ReleaseTenderModal";
// import DaRejectModal from "./DaRejectModal";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import FileButton from "@/Components/Common/FileButtonUpload/FileButton";
import ImageDisplay from "@/Components/Common/FileButtonUpload/ImageDisplay";
import LoaderApi from "@/Components/Common/Loaders/LoaderApi";
import TimeLine from "@/Components/Common/Timeline/TimeLine";
import { useReactToPrint } from "react-to-print";
import { indianAmount } from "@/Components/Common/PowerupFunctions";
import ConfirmationModal from "@/Components/Common/Modal/ConfirmationModal";
import { MdArrowRightAlt } from "react-icons/md";
import RejectionModalRemark from "@/Components/Common/Modal/RejectionModalRemark";

const ViewPreProcurementById = () => {
  const navigate = useNavigate();
  const notesheetRef = useRef();

  const { id, page } = useParams();

  const [erroState, seterroState] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [applicationFullData, setapplicationFullData] = useState();
  const [tableData, setTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenlvl2, setIsModalOpenlvl2] = useState(false);
  const [isModalOpenlAprvl1, setisModalOpenlAprvl1] = useState(false);
  const [isModalOpenlAprvl2, setisModalOpenlAprvl2] = useState(false);
  const [isModalOpenlReject1, setisModalOpenlReject1] = useState(false);
  const [isModalOpenlReject2, setisModalOpenlReject2] = useState(false);
  const [isModalOpenlBackToIA, setisModalOpenlBackToIA] = useState(false);
  const [isModalOpenlBackToLevel1, setisModalOpenlBackToLevel1] =
    useState(false);
  const [imageDoc, setImageDoc] = useState();
  const [preview, setPreview] = useState();
  const [procNo, setProcNo] = useState();
  const [data, setData] = useState({ procurement_no: "", remark: "" });

  const {
    api_getStockRequetById,
    api_fetchProcurementById,
    api_forwardLevelone,
    api_forwardLeveltwo,
    api_approveByLeveltwo,
    api_approveByLevelone,
    api_rejectByLevelone,
    api_rejectByLeveltwo,
    api_backByLevel1toIA,
    api_backByLevel2toLevel1,
  } = ProjectApiList();

  const { titleBarVisibility } = useContext(contextVar);

  // console.log(applicationFullData?.status)

  //Print
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  let buttonStyle =
    " mr-1 pb-3 pl-6 pr-6 pt-3 border border-indigo-500 text-indigo-800 text-md leading-tight  rounded  hover:bg-indigo-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl";

  useEffect(() => {
    getApplicationDetail();
  }, []);

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

    AxiosInterceptors.get(`${api_fetchProcurementById}/${id}`, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          setapplicationFullData(response?.data?.data);
          setTableData(response?.data?.data?.tran_dtls);
          setProcNo(response?.data?.data?.procurement_no);
          setData((prev) => ({
            ...prev,
            procurement_no: response?.data?.data?.procurement_no,
          }));
        } else {
          // toast.error("Error while getting details...");
          // seterroState(true);
        }
      })
      .catch(function (error) {
        console.log("==2 details by id error...", error);
        toast.error(error?.response?.data?.message);
        seterroState(true);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  const forwardToLevelOne = () => {
    setisLoading(true);

    // seterroState(false);

    AxiosInterceptors.post(
      `${api_forwardLevelone}`,
      { procurement_no: procNo },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status == true) {
          toast.success("Successfully forwarded to Level 1");
          setTimeout(() => {
            navigate("/inventory-stockRequest?tabNo=2");
          }, 500);
        } else {
          // toast.error(response?.data?.mmessage || "something went wrong");
          // navigate("/da-inventory-proposal");
          // toast(response?.data?.message, "error");
        }
      })
      .catch(function (error) {
        toast.error("Error in forwarding to Inventory Admin");
        navigate("/da-inventory-proposal");
        console.log("errorrr.... ", error);
        // setdeclarationStatus(false);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  const forwardToLevelTwo = () => {
    setisLoading(true);

    // seterroState(false);

    AxiosInterceptors.post(
      `${api_forwardLeveltwo}`,
      { procurement_no: procNo },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status == true) {
          toast.success("Successfully forwarded to Level 2");
          setTimeout(() => {
            navigate("/levelone");
          }, 500);
        } else {
          // toast.error(response?.data?.mmessage || "something went wrong");
          // navigate("/da-inventory-proposal");
          // toast(response?.data?.message, "error");
        }
      })
      .catch(function (error) {
        toast.error("Error in forwarding to Inventory Admin");
        navigate("/da-inventory-proposal");
        console.log("errorrr.... ", error);
        // setdeclarationStatus(false);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  const approveByLevelTwo = () => {
    setisLoading(true);

    // seterroState(false);

    AxiosInterceptors.post(
      `${api_approveByLeveltwo}`,
      { procurement_no: procNo },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status == true) {
          toast.success("Successfully Approved");
          setTimeout(() => {
            navigate("/leveltwo");
          }, 100);
        } else {
          // toast.error(response?.data?.mmessage || "something went wrong");
          // navigate("/da-inventory-proposal");
          // toast(response?.data?.message, "error");
        }
      })
      .catch(function (error) {
        toast.error("Error in forwarding to Inventory Admin");
        navigate("/da-inventory-proposal");
        console.log("errorrr.... ", error);
        // setdeclarationStatus(false);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  const approveByLevelOne = () => {
    setisLoading(true);

    // seterroState(false);

    AxiosInterceptors.post(
      `${api_approveByLevelone}`,
      { procurement_no: procNo },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status == true) {
          toast.success("Successfully Approved");
          setTimeout(() => {
            navigate("/levelone");
          }, 100);
        } else {
          // toast.error(response?.data?.mmessage || "something went wrong");
          // navigate("/da-inventory-proposal");
          // toast(response?.data?.message, "error");
        }
      })
      .catch(function (error) {
        toast.error("Error in forwarding to Inventory Admin");
        navigate("/da-inventory-proposal");
        console.log("errorrr.... ", error);
        // setdeclarationStatus(false);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  const rejectByLevelOne = () => {
    setisLoading(true);

    // seterroState(false);

    AxiosInterceptors.post(
      `${api_rejectByLevelone}`,
      { procurement_no: procNo },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status == true) {
          toast.success("Successfully Rejected");
          setTimeout(() => {
            navigate("/levelone");
          }, 500);
        } else {
          // toast.error(response?.data?.mmessage || "something went wrong");
          // navigate("/da-inventory-proposal");
          // toast(response?.data?.message, "error");
        }
      })
      .catch(function (error) {
        toast.error("Error in forwarding to Inventory Admin");
        navigate("/da-inventory-proposal");
        console.log("errorrr.... ", error);
        // setdeclarationStatus(false);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  const rejectByLeveltwo = () => {
    setisLoading(true);

    // seterroState(false);

    AxiosInterceptors.post(
      `${api_rejectByLeveltwo}`,
      { procurement_no: procNo },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status == true) {
          toast.success("Successfully Rejected");
          setTimeout(() => {
            navigate("/leveltwo");
          }, 500);
        } else {
          // toast.error(response?.data?.mmessage || "something went wrong");
          // navigate("/da-inventory-proposal");
          // toast(response?.data?.message, "error");
        }
      })
      .catch(function (error) {
        toast.error("Error in forwarding to Inventory Admin");
        navigate("/da-inventory-proposal");
        console.log("errorrr.... ", error);
        // setdeclarationStatus(false);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  const backByLevelonetoIA = () => {
    setisLoading(true);

    // seterroState(false);

    AxiosInterceptors.post(`${api_backByLevel1toIA}`, data, ApiHeader())
      .then(function (response) {
        if (response?.data?.status == true) {
          toast.success("Successfully Returned to Inventory Admin");
          setTimeout(() => {
            navigate("/levelone");
          }, 500);
        } else {
          // toast.error(response?.data?.mmessage || "something went wrong");
          // navigate("/da-inventory-proposal");
          // toast(response?.data?.message, "error");
        }
      })
      .catch(function (error) {
        toast.error("Error in forwarding to Inventory Admin");
        navigate("/da-inventory-proposal");
        console.log("errorrr.... ", error);
        // setdeclarationStatus(false);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  const backByLvl2toLevelone = () => {
    setisLoading(true);

    // seterroState(false);

    AxiosInterceptors.post(`${api_backByLevel2toLevel1}`, data, ApiHeader())
      .then(function (response) {
        if (response?.data?.status == true) {
          toast.success("Successfully Returned to Level 1");
          setTimeout(() => {
            navigate("/leveltwo");
          }, 500);
        } else {
          // toast.error(response?.data?.mmessage || "something went wrong");
          // navigate("/da-inventory-proposal");
          // toast(response?.data?.message, "error");
        }
      })
      .catch(function (error) {
        toast.error("Error in forwarding to Inventory Admin");
        navigate("/da-inventory-proposal");
        console.log("errorrr.... ", error);
        // setdeclarationStatus(false);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // confirmation handeler of Modals

  const confirmationHandler = () => {
    forwardToLevelOne();
  };

  const confirmationHandler2 = () => {
    forwardToLevelTwo();
  };

  const confirmationHandler3 = () => {
    approveByLevelTwo();
  };

  const confirmationHandlerlevelOne = () => {
    approveByLevelOne();
  };
  const confirmationHandlerRejectlevelOne = () => {
    rejectByLevelOne();
  };
  const confirmationHandlerRejectleveltwo = () => {
    rejectByLeveltwo();
  };
  const confirmationHandlerBacktoIA = () => {
    backByLevelonetoIA();
  };
  const confirmationHandlerBacktoLevel1 = () => {
    backByLvl2toLevelone();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalOpenlvl2(false);
    setisModalOpenlAprvl1(false);
    setisModalOpenlAprvl2(false);
    setisModalOpenlReject1(false);
    setisModalOpenlReject2(false);
    setisModalOpenlBackToIA(false);
    setisModalOpenlBackToLevel1(false);
  };

  if (isModalOpen) {
    return (
      <>
        <ConfirmationModal
          confirmationHandler={confirmationHandler}
          handleCancel={handleCancel}
          message={'Sure to Forward to "Level 1" ?'}
          //   sideMessage={'By clicking your data will proceed'}
        />
      </>
    );
  }

  if (isModalOpenlvl2) {
    return (
      <>
        <ConfirmationModal
          confirmationHandler={confirmationHandler2}
          handleCancel={handleCancel}
          message={'Sure to Forward to "Level 2" ?'}
          //   sideMessage={'By clicking your data will proceed'}
        />
      </>
    );
  }

  //fpr level 2 approve
  if (isModalOpenlAprvl2) {
    return (
      <>
        <ConfirmationModal
          confirmationHandler={confirmationHandler3}
          handleCancel={handleCancel}
          message={'Are you sure want to" Approve" ?'}
          //   sideMessage={'By clicking your data will proceed'}
        />
      </>
    );
  }

  //for level 1 approve
  if (isModalOpenlAprvl1) {
    return (
      <>
        <ConfirmationModal
          confirmationHandler={confirmationHandlerlevelOne}
          handleCancel={handleCancel}
          message={'Are you sure want to" Approve" ?'}
          //   sideMessage={'By clicking your data will proceed'}
        />
      </>
    );
  }

  //for level 1 reject
  if (isModalOpenlReject1) {
    return (
      <>
        <ConfirmationModal
          confirmationHandler={confirmationHandlerRejectlevelOne}
          handleCancel={handleCancel}
          message={'Are you sure want to " Reject " ?'}
          //   sideMessage={'By clicking your data will proceed'}
        />
      </>
    );
  }

  //for level 2 reject
  if (isModalOpenlReject2) {
    return (
      <>
        <ConfirmationModal
          confirmationHandler={confirmationHandlerRejectleveltwo}
          handleCancel={handleCancel}
          message={'Are you sure want to " Reject " ?'}
          //   sideMessage={'By clicking your data will proceed'}
        />
      </>
    );
  }

  //for Back to Invt Admin
  if (isModalOpenlBackToIA) {
    return (
      <>
        <RejectionModalRemark
          confirmationHandler={confirmationHandlerBacktoIA}
          handleCancel={handleCancel}
          message={"Are you sure, want to send back to IA? "}
          setData={setData}
        />
      </>
    );
  }

  //for Back to Level 1
  if (isModalOpenlBackToLevel1) {
    return (
      <>
        <RejectionModalRemark
          confirmationHandler={confirmationHandlerBacktoLevel1}
          handleCancel={handleCancel}
          message={"Are you sure, want to send back to Level 1? "}
          setData={setData}
        />
      </>
    );
  }

  return (
    <div>
      {isLoading && (
        // <div className='fixed inset-0 flex items-center justify-center z-50'>
        <LoaderApi />
        // </div>
      )}

      <div className=''>
        <TitleBar
          titleBarVisibility={titleBarVisibility}
          titleText={"Pre-Procurement Details"}
        />
      </div>

      {/* //timeline  */}
      <div className={`${isLoading ? "blur-[2px]" : ""} mt-10`}>
        <TimeLine status={applicationFullData?.status} />
      </div>

      <div className={`${isLoading ? "blur-[2px]" : ""}`}>
        {/* Basic Details */}
        <div className='mt-6'>
          <div
            className='py-6 mt-2 bg-white rounded-lg shadow-xl p-4 space-y-5 border border-blue-500'
            ref={componentRef}
          >
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

            <div className='flex justify-between'>
              <div className='pl-8 text-[1rem] text-black flex justify-between w-full'>
                <h1 className=''>
                  Category <span className='text-black'>:</span>
                  <span className='font-bold'>
                    {" "}
                    {nullToNA(applicationFullData?.category?.name)}
                  </span>
                </h1>
              </div>
              {applicationFullData?.remark && (
                <div className='text-[1rem] text-black flex justify-end w-full'>
                  <h1 className='text-red-400'>
                    Remark <span className='text-black'>:</span>
                    <span className='font-bold'>
                      {" "}
                      {nullToNA(applicationFullData?.remark)}
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

                  <div className='md:flex-1 md:block flex md:flex-row-reverse justify-between'>
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

          {page == "inbox" && applicationFullData?.status < 10 && (
            <button
              className={buttonStyle}
              onClick={() => {
                navigate(`/da-edit-pre-procurement/${id}`);
              }}
            >
              Edit
            </button>
          )}

          {page == "inbox" &&
            (applicationFullData?.status == 14 ||
              applicationFullData?.status == 24) && (
              <button
                className='bg-green-600 hover:bg-green-700 text-white p-2 rounded flex items-center'
                onClick={() =>
                  navigate(`/create-boq`, {
                    state: {
                      procurement_no: [applicationFullData?.procurement_no],
                    },
                  })
                }
              >
                Prepare BOQ
                <MdArrowRightAlt />
              </button>
            )}

          {/* Reject of Level 1 */}
          {page == "inbox" &&
            (applicationFullData?.status == 10 ||
              applicationFullData?.status == 21 ||
              applicationFullData?.status == 13) && (
              <button
                className={`bg-[#E61818] text-white text-md w-fit rounded-md p-2 px-5 hover:bg-red-500`}
                onClick={() => setisModalOpenlReject1(true)}
              >
                Reject
              </button>
            )}

          {/* Reject of Level 2 */}
          {page == "inbox" &&
            (applicationFullData?.status == 20 ||
              applicationFullData?.status == 23) && (
              <button
                className={`bg-[#E61818] text-white text-md w-fit rounded-md p-2 px-5 hover:bg-red-500`}
                onClick={() => setisModalOpenlReject2(true)}
              >
                Reject
              </button>
            )}

          {page == "inbox" && (
            <>
              {/* <button className={buttonStyle2}>Forward to Level II</button> */}

              {/* <button
                className={`px-3 p-2 text-white bg-[#0F921C]  hover:bg-green-800 rounded-md text-sm`}
                onClick={postReleaseTenderModal}
              >
                Approve
              </button> */}

              {/* <button className={buttonStyle2} onClick={postReleaseTenderModal}>
                Forward to Level II
              </button> */}

              {page == "inbox" && applicationFullData?.status?.status < 70 && (
                <>
                  {/* <button className={buttonStyle2} onClick={postBackToSRModal}>
                    Back To Stock Receiver
                  </button> */}

                  {/* <button
                    className='bg-green-600 hover:bg-green-700 text-white p-2 rounded flex items-center'
                    onClick={() =>
                      navigate(`/create-boq`, {
                        state: {
                          procurement_no: [applicationFullData?.procurement_no],
                        },
                      })
                    }
                  >
                    Prepare BOQ <MdArrowRightAlt className='text-2xl ml-2' />
                  </button> */}

                  <div className='bg-[#0F921C] h-full py-2 rounded-md text-md flex items-center justify-center hover:bg-green-800'>
                    <FileButton
                      bg={"[#0F921C]"}
                      hoverBg={"bg-green-800"}
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

              {/* {page === "inbox" &&
                applicationFullData?.status?.status == 70 && (
                  <button
                    className={`bg-[#4478b7] hover:bg-blue-700 px-7 py-2 text-white font-semibold rounded leading-5 shadow-lg float-right `}
                  >
                    Proceed to Pre-Tender
                  </button>
                )} */}

              {page === "inbox" && (
                <>
                  {/*Approve for level 1 */}
                  {(applicationFullData?.status == 10 ||
                    applicationFullData?.status == 13 ||
                    applicationFullData?.status == 21) && (
                    <button
                      className={`bg-[#21b031] hover:bg-[#1e6727] px-7 py-2 text-white font-semibold rounded leading-5 shadow-lg float-right `}
                      // onClick={forwardToIa}
                      onClick={() => setisModalOpenlAprvl1(true)}
                    >
                      Approve
                    </button>
                  )}

                  {(applicationFullData?.status == 10 ||
                    applicationFullData?.status == 21) && (
                    <button
                      className={`bg-[#4338ca] hover:bg-blue-900 px-7 py-2 text-white font-semibold rounded leading-5 shadow-lg float-right `}
                      // onClick={forwardToIa}
                      onClick={() => setisModalOpenlBackToIA(true)}
                    >
                      Back To Inventory Admin
                    </button>
                  )}

                  {(applicationFullData?.status == 20 ||
                    applicationFullData?.status == 23) && (
                    <button
                      className={`bg-[#4338ca] hover:bg-blue-900 px-7 py-2 text-white font-semibold rounded leading-5 shadow-lg float-right `}
                      // onClick={forwardToIa}
                      onClick={() => setisModalOpenlBackToLevel1(true)}
                    >
                      Back To Level 1
                    </button>
                  )}

                  {(applicationFullData?.status == 0 ||
                    applicationFullData?.status == 11) && (
                    <button
                      className={`bg-[#4338ca] hover:bg-blue-900 px-7 py-2 text-white font-semibold rounded leading-5 shadow-lg float-right `}
                      // onClick={forwardToIa}
                      onClick={() => setIsModalOpen(true)}
                    >
                      Forward to Level 1
                    </button>
                  )}

                  {(applicationFullData?.status == 10 ||
                    applicationFullData?.status == 21 ||
                    applicationFullData?.status == 13) && (
                    <button
                      className={`bg-[#4338ca] hover:bg-blue-900 px-7 py-2 text-white font-semibold rounded leading-5 shadow-lg float-right `}
                      // onClick={forwardToIa}
                      onClick={() => setIsModalOpenlvl2(true)}
                    >
                      Forward to Level 2
                    </button>
                  )}

                  {/*Approve for level 2 */}
                  {(applicationFullData?.status == 20 ||
                    applicationFullData?.status == 23) && (
                    <button
                      className={`bg-[#21b031] hover:bg-[#1e6727] px-7 py-2 text-white font-semibold rounded leading-5 shadow-lg float-right `}
                      // onClick={forwardToIa}
                      onClick={() => setisModalOpenlAprvl2(true)}
                    >
                      Approve
                    </button>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewPreProcurementById;
