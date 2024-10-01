import { useContext, useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { contextVar } from "@/Components/context/contextVar";
import TitleBar from "../../Others/TitleBar";
import { indianAmount } from "@/Components/Common/PowerupFunctions";
import ImageDisplay from "@/Components/Common/FileButtonUpload/ImageDisplay";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ProjectApiList from "@/Components/api/ProjectApiList";
import RejectionModalRemark from "@/Components/Common/Modal/RejectionModalRemark";
import ApiHeader from "@/Components/api/ApiHeader";
import { MdArrowRightAlt } from "react-icons/md";
import LoaderApi from "@/Components/Common/Loaders/LoaderApi";
import BoqTimeLine from "@/Components/Common/Timeline/BoqTimeLine";
import { useReactToPrint } from "react-to-print";

export default function BoqDetailsById(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [dataList, setDatalist] = useState();
  const [backtoAccModal, setBacktoAccModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [data, setData] = useState({ reference_no: "", remark: "" });

  const navigate = useNavigate();
  const { titleBarVisibility } = useContext(contextVar);

  const {
    api_fetchAllBoqDetailsbyId,
    api_postBacktoAcc,
    api_postRejectBoq,
    api_forwardBoqToFinance,
    api_forwardBoqToTA,
    api_forwardRateToPostProc,
  } = ProjectApiList();

  const { refNo, page } = useParams();

  //Print
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // ══════════════════════════════║🔰Columns🔰║═══════════════════════════════════
  const COLUMNS = [
    {
      header: "Sr.No",
    },
    {
      header: "Description",
    },
    {
      header: "Item name",
    },
    {
      header: "Quantity",
    },
    {
      header: "Unit",
    },
    {
      header: "Gst",
    },
    {
      header: "HSN Code",
    },
    {
      header: "Rate",
    },
    {
      header: "Amount",
    },
    {
      header: "Remark",
    },
  ];
  // Print the Image

  let buttonStyle =
    " mr-1 pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-indigo-500 text-base leading-tight  rounded  hover:bg-indigo-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl";
  let buttonStyle2 =
    " p-2 border border-indigo-500 text-white text-md sm:text-md leading-tight rounded  hover:bg-white  hover:text-indigo-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl bg-indigo-700";

  let colouredBtnStyle = `bg-[#4338CA] hover:bg-[#5a50d3] text-sm px-8 py-2 text-white  rounded leading-5 shadow-lg disabled:bg-indigo-300`;

  const fetchBoqDetailsbyId = () => {
    setIsLoading(true);
    AxiosInterceptors.get(`${api_fetchAllBoqDetailsbyId}/${refNo}`, ApiHeader())
      .then(function (response) {
        setDatalist(response?.data?.data[0]);
      })
      .catch(function (error) {
        toast.error("Something went wrong");
        console.log("errorrr.... ", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCancel = () => {
    setBacktoAccModal(false);
  };

  const handleRejCancel = () => {
    setBacktoAccModal(false);
  };

  //boq back to accountant------------
  const backtoAccHandler = () => {
    setBacktoAccModal(false);
    setIsLoading(true);
    AxiosInterceptors.post(`${api_postBacktoAcc}`, data, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          toast.success("Successfully sent to Accountant");
          navigate("/inventoryAdmin-boq");
        } else {
          toast.error("Error in sending back to Accountant");
        }
      })
      .catch(function (error) {
        console.log(error, "err res");
        toast.error(error?.response?.data?.error);
      })
      .finally(() => {
        setIsLoading(true);
      });
  };

  //rate Contract to Post Procurement
  const forwardforPostProcurement = () => {
    setIsLoading(true);

    AxiosInterceptors.post(
      `${api_forwardRateToPostProc}`,
      { reference_no: refNo },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status) {
          toast.success("Forwarded for Post Procurement Successfully!!");
          navigate("/inventoryAdmin-boq");
        } else {
          toast.error("Error in Forwarding Boq. Please try Again");
        }
      })
      .catch(function (error) {
        console.log(error, "err res");
        toast.error(error?.response?.data?.error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //forward to finance
  const forwardBoqFinanceHandler = () => {
    setIsLoading(true);

    AxiosInterceptors.post(
      `${api_forwardBoqToFinance}`,
      { reference_no: refNo },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status) {
          toast.success("BOQ sent to Finance Successfully!!");
          navigate("/inventoryAdmin-boq");
        } else {
          toast.error("Error in Forwarding Boq. Please try Again");
        }
      })
      .catch(function (error) {
        console.log(error, "err res");
        toast.error(error?.response?.data?.error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //forward to finance
  const forwardBoqTAHandler = () => {
    setIsLoading(true);

    AxiosInterceptors.post(
      `${api_forwardBoqToTA}`,
      { reference_no: refNo },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status) {
          toast.success("Procurement sent for Bidding successfully");
          navigate("/inventoryAdmin-boq");
        } else {
          toast.error("Error in Forwarding. Please try Again");
        }
      })
      .catch(function (error) {
        console.log(error, "err res");
        toast.error(error?.response?.data?.error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //reject boq ------------
  const rejectBoqHandler = () => {
    setIsLoading(true);

    AxiosInterceptors.post(
      `${api_postRejectBoq}`,
      { ...data, reference_no: refNo },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status) {
          setRejectModal(true);
          toast.success("BOQ is Rejected.");
          navigate("/inventoryAdmin-boq");
        } else {
          toast.error("Error in approving. Please try Again");
        }
      })
      .catch(function (error) {
        console.log(error, "err res");
        toast.error(error?.response?.data?.error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //back to acc page
  const confirmationHandler = () => {
    backtoAccHandler();
  };

  const confirmationRejectHandler = () => {
    rejectBoqHandler();
  };

  useEffect(() => {
    setData((prev) => ({ ...prev, reference_no: refNo }));
    fetchBoqDetailsbyId();
    window.localStorage.setItem("reference_no", refNo);
  }, []);

  if (backtoAccModal) {
    return (
      <RejectionModalRemark
        confirmationHandler={confirmationHandler}
        handleCancel={handleCancel}
        message={"Are you sure you want to send BOQ back to Accountant? "}
        setData={setData}
      />
    );
  }

  if (rejectModal) {
    return (
      <RejectionModalRemark
        confirmationHandler={confirmationRejectHandler}
        handleCancel={handleRejCancel}
        message={"Are you sure you want to reject BOQ ? "}
        setData={setData}
      />
    );
  }

  return (
    <div>
      {isLoading && <LoaderApi />}

      <TitleBar
        titleBarVisibility={titleBarVisibility}
        titleText={"Preview BOQ"}
      />

      <div className={`${isLoading ? "blur-[2px]" : ""}`}>
        <BoqTimeLine status={dataList?.status} />
      </div>

      <div className={`${isLoading ? "opacity-40" : ""} `}>
        <div className='flex gap-4'>
          {page == "inbox" &&
            (dataList?.status == 50 || dataList?.status == 60) && (
              <div className='flex gap-5'>
                <button
                  className={colouredBtnStyle}
                  onClick={() =>
                    navigate(`/biddingViewById/${dataList?.reference_no}/view`)
                  }
                >
                  View Pre-Tender Basic Info
                </button>
              </div>
            )}

          {page == "inbox" && dataList?.status == 60 && (
            <button
              className={colouredBtnStyle}
              onClick={() =>
                navigate(`/tendering-preview/preview`, {
                  state: dataList?.reference_no,
                })
              }
            >
              View Tendering Form
            </button>
          )}
        </div>

        <div ref={componentRef} className=' '>
          <div className='p-2 bg-[#4338CA] text-white pl-5 mt-6 rounded-md flex justify-between'>
            <h2 className='text-xl '>BOQ Details</h2>
          </div>
          <div className='bg-white rounded font-sans mb-10 border border-[#4338ca] shadow-lg px-4 mt-4'>
            <div className='mb-4 p-4 flex justify-between'>
              <div className=''>
                <p className='text-lg font-bold mb-2'>
                  Reference no:
                  <span className='font-semibold text-green-600 pl-2 '>
                    {dataList?.reference_no}
                  </span>
                </p>
                <p className='text-lg font-bold mb-2'>
                  Category:{" "}
                  <span className='font-semibold text-gray-500'>
                    {dataList?.procurement_stocks[0]?.category?.name}
                  </span>
                </p>
              </div>

              <div className=''>
                {/* <p className='text-lg font-bold'>
                  GST:{" "}
                  <span className='font-semibold text-gray-500'>
                    {dataList?.gst}%
                  </span>
                </p> */}
                <p className='text-lg font-bold '>
                  Status:{" "}
                  <span className='font-semibold text-blue-500'>
                    {(dataList?.status == 0 && "Pending") ||
                      (dataList?.status == 41 && "Returned from Finance") ||
                      (dataList?.status == 43 && "Returned from Finance") ||
                      (dataList?.status == 40 && "Finance Approval Pending") ||
                      (dataList?.status == 42 && "Approved by Finance") ||
                      (dataList?.status == 50 &&
                        "Basic Pre-tender Info completed") ||
                      (dataList?.status == 60 && "Pre Tender form Submitted") ||
                      (dataList?.status == 70 && "Tendering Admin Inbox")}
                  </span>
                </p>
              </div>
            </div>

            <div className='shaodow-md rounded-md overflow-auto'>
              <table className='min-w-full bg-white border-collapse border border-gray-200 rounded-md'>
                <thead className='bg-indigo-100 text-black rounded-md'>
                  {COLUMNS?.length > 0 &&
                    COLUMNS?.map((heading, index) => (
                      <th
                        key={index}
                        className='border border-gray-200 px-4 py-2'
                      >
                        {heading?.header}
                      </th>
                    ))}
                </thead>
                <tbody className='font-normal text-center '>
                  {dataList?.procurement_stocks?.length > 0 &&
                    dataList?.procurement_stocks?.map((row, index) => (
                      <tr key={row?.procurement_no}>
                        <td className='border border-gray-200 px-4 py-2'>
                          {index + 1}
                        </td>
                        <td className='border border-gray-200 px-4 py-2 text-sm text-justify'>
                          {row?.description}
                        </td>
                        <td className='border border-gray-200 px-4 py-2 text-sm'>
                          {row?.subCategory?.name}
                        </td>
                        <td className='border border-gray-200 px-4 py-2 text-sm'>
                          {row?.quantity}
                        </td>
                        <td className='border border-gray-200 px-4 py-2 text-sm'>
                          {row?.unit?.name}
                        </td>
                        <td className='border border-gray-200 px-4 py-2 text-sm'>
                          {`${row?.gst}%` || ""}
                        </td>
                        <td className='border border-gray-200 px-4 py-2 text-sm'>
                          {`${row?.hsn_code}` || ""}
                        </td>
                        <td className='border border-gray-200 px-4 py-2 text-sm'>
                          {indianAmount(row?.rate)}
                        </td>
                        <td className='border border-gray-200 px-4 py-2 text-sm'>
                          {indianAmount(
                            row?.total_rate ||
                              row?.amount ||
                              Number(row?.quantity) * Number(row?.rate)
                          )}
                        </td>

                        <td className='border border-gray-200 px-4 py-2 text-sm'>
                          {row?.remark}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className='p-2 px-4 flex mt-6 rounded-t-md '>
              <h2 className='text-xl '>Estimated Cost :</h2>
              <h2 className='text-xl pl-5'>
                {indianAmount(dataList?.estimated_cost)}
              </h2>
            </div>

            <div className='flex justify-between mb-6'>
              <p className='text-lg font-semibold px-4'>
                Remark -{" "}
                <span className='text-gray-400'>{dataList?.remark}</span>{" "}
              </p>
              {dataList?.boq_doc?.length ? (
                <div className='flex justify-end mb-4'>
                  <ImageDisplay
                    // preview={dataList?.boq_doc?.imageUrl}
                    url={dataList?.boq_doc[0]?.docPath}
                    imageDoc={dataList?.img}
                    alt={"Notesheet doc"}
                    showPreview={"hidden"}
                    width={"[100px]"}
                  />
                </div>
              ) : (
                <p className='text-gray-400'>No file uploaded</p>
              )}
            </div>

            {dataList?.procurement?.is_rate_contract && (
              <p className='flex justify-end font-semibold text-green-600 mb-5'>
                {dataList?.procurement?.is_rate_contract &&
                  "* Applied Through Rate Contract"}{" "}
              </p>
            )}
          </div>
        </div>

        <div className='flex justify-end mb-10 gap-4'>
          <button className={buttonStyle} onClick={handlePrint}>
            Print
          </button>
          {/* {page &&
            page == "inbox" &&
            (dataList?.status == 0 || dataList?.status == 1) && (
              <>
                <button
                  className={colouredBtnStyle}
                  onClick={() => setBacktoAccModal(true)}
                >
                  Back to Accountant
                </button>
              </>
            )} */}

          {/* {page == "inbox" &&
            (dataList?.status === 0 || dataList?.status === 1) && (
              <button
                className='bg-red-400  hover:bg-red-500  text-white pb-2 pl-6 pr-6 pt-2 rounded flex'
                onClick={() => setRejectModal(true)}
              >
                Reject BOQ
              </button>
            )} */}
          {/* {page &&
            (page == "inbox" || page == "boq-status") &&
            (dataList?.status == 0 ||
              dataList?.status == 1 ||
              dataList?.status == -1) && (
              <>
                <button
                  className={colouredBtnStyle}
                  onClick={() =>
                    navigate("/create-boq", { state: dataList?.reference_no })
                  }
                >
                  Edit
                </button>
              </>
            )} */}

          {page == "inbox" &&
            dataList?.procurement?.is_rate_contract == true && (
              <button
                className={colouredBtnStyle}
                onClick={forwardforPostProcurement}
              >
                Proceed for Post Procurement
              </button>
            )}

          {page == "inbox" &&
            dataList?.status == 42 &&
            dataList?.procurement?.is_rate_contract != true && (
              <button
                className={`${colouredBtnStyle} flex gap-2 justify-center items-center`}
                onClick={() =>
                  navigate(`/bidding-input-form/${dataList?.reference_no}`, {
                    state: dataList?.estimated_cost,
                  })
                }
              >
                Fill Pre Tender Basic Info
                <MdArrowRightAlt className='text-2xl ' />
              </button>
            )}

          {page == "inbox" && dataList?.status == 50 && (
            <button
              className={`${colouredBtnStyle} flex gap-2 justify-center items-center`}
              onClick={() =>
                navigate(`/tendering?tabNo=1`, {
                  state: dataList?.reference_no,
                })
              }
            >
              Proceed to Pre-Tender
              <MdArrowRightAlt className='text-2xl ml-2' />
            </button>
          )}

          {/* {page == "inbox" &&
            (dataList?.status === 0 || dataList?.status === 1) && (
              <button
                className='bg-green-600 hover:bg-green-700 text-white p-2 rounded flex'
                onClick={() => approveBoq()}
              >
                Approve BOQ
              </button>
            )} */}

          {page == "inbox" &&
            (dataList?.status == 0 || dataList?.status == 41) && (
              <div className='flex justify-end items-center'>
                <button
                  className='bg-green-600 hover:bg-green-700 text-white p-2 rounded flex'
                  onClick={forwardBoqFinanceHandler}
                >
                  Forward to Finance
                  <MdArrowRightAlt className='text-2xl ml-2' />
                </button>
              </div>
            )}

          {page == "inbox" && dataList?.status == 60 && (
            <div className='flex justify-end items-center'>
              <button
                className={`${colouredBtnStyle} flex items-center`}
                onClick={forwardBoqTAHandler}
              >
                Forward for Bidding
                <MdArrowRightAlt className='text-2xl ml-2' />
              </button>
            </div>
          )}

          {dataList?.preTender != null && (
            <button
              className={buttonStyle2}
              onClick={() =>
                navigate(`/tendering-preview/preview`, {
                  state: dataList?.reference_no,
                })
              }
            >
              View Pre-Tender Form
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
