import { useContext, useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { contextVar } from "@/Components/context/contextVar";
import TitleBar from "@/Components/Pages/Others/TitleBar";
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
import ConfirmationModal from "@/Components/Common/Modal/ConfirmationModal";

export default function BoqDetailsByIdFin(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [dataList, setDatalist] = useState();
  const [rejectModal, setRejectModal] = useState(false);
  const [approveModal, setApproveModal] = useState(false);
  const [data, setData] = useState({ reference_no: "", remark: "" });

  const navigate = useNavigate();
  const { titleBarVisibility } = useContext(contextVar);

  const {
    api_fetchAllBoqDetailsbyIdFin,
    api_approveBoq,
    api_returnFinBoq,
    api_forwardBoqToFinance,
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
      header: "Hsn Code",
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

  let colouredBtnStyle = `bg-[#4338CA] hover:bg-[#5a50d3] text-sm px-8 py-2 text-white  rounded leading-5 shadow-lg disabled:bg-indigo-300`;

  const fetchBoqDetailsbyId = () => {
    setIsLoading(true);
    AxiosInterceptors.get(
      `${api_fetchAllBoqDetailsbyIdFin}/${refNo}`,
      ApiHeader()
    )
      .then(function (response) {
        setDatalist(response?.data?.data);
      })
      .catch(function (error) {
        toast.error("Something went wrong");
        console.log("errorrr.... ", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //approve boq ------------
  const approveBoq = () => {
    setIsLoading(true);

    AxiosInterceptors.post(
      `${api_approveBoq}`,
      { reference_no: refNo },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status) {
          toast.success("BOQ is Approved Successfully!!");
          navigate("/finance");
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

  //return boq ------------
  const returnBoqHandler = () => {
    setIsLoading(true);

    AxiosInterceptors.post(
      `${api_returnFinBoq}`,
      { ...data, reference_no: refNo },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status) {
          toast.success("BOQ is sent back to Inventory Admin.");
          navigate("/finance");
        } else {
          toast.error("Error occured while sending back the BOQ");
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

  const confirmationRejectHandler = () => {
    returnBoqHandler();
  };

  const confirmationApproveHandler = () => {
    approveBoq();
  };

  useEffect(() => {
    setData((prev) => ({ ...prev, reference_no: refNo }));
    fetchBoqDetailsbyId();
    window.localStorage.setItem("reference_no", refNo);
  }, []);

  if (rejectModal) {
    return (
      <RejectionModalRemark
        confirmationHandler={confirmationRejectHandler}
        handleCancel={() => setRejectModal(false)}
        message={
          "Are you sure you want to return BOQ back to Inventory Admin ? "
        }
        setData={setData}
        loadingState={isLoading}
      />
    );
  }

  if (approveModal) {
    return (
      <ConfirmationModal
        confirmationHandler={confirmationApproveHandler}
        handleCancel={() => setApproveModal(false)}
        message={"Are you sure you want to Approve BOQ ?"}
        loadingState={isLoading}
        // setData={setData}
      />
    );
  }

  return (
    <div>
      {isLoading && <LoaderApi />}

      <TitleBar
        titleBarVisibility={titleBarVisibility}
        titleText={"Finance Approval"}
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
          <div className='bg-white rounded font-sans mb-10 border border-[#4338ca] shadow-lg px-4 mt-1'>
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
                <p className='text-lg font-bold '>
                  Status:{" "}
                  <span className='font-semibold text-blue-500'>
                    {(dataList?.status == 0 && "Pending") ||
                      (dataList?.status == 41 && "Returned from Finance") ||
                      (dataList?.status == 43 && "Rejected from Finance") ||
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
                          {`${row?.gst}%` || 0}
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
          </div>
        </div>

        <div className='flex justify-between w-full mb-10 gap-4'>
          <button className={buttonStyle} onClick={handlePrint}>
            Print
          </button>

          <div className='flex gap-6'>
            {page == "inbox" && (
              <>
                {/* <button
                  onClick={() => setRejectModal(true)}
                  className='pb-2 pl-6 pr-6 pt-2 border border-red-400 hover:bg-red-400 hover:text-white text-base leading-tight  rounded bg-red-50 text-red-400 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl'
                >
                  Reject
                </button> */}

                <button
                  type='button'
                  className={`bg-[#4338CA]  hover:bg-[#4478b7] px-7 py-2 text-white font-semibold rounded leading-5 shadow-lg float-right `}
                  onClick={() => setRejectModal(true)}
                >
                  Back to Inventory Admin
                </button>
              </>
            )}

            {page == "inbox" && (
              <div className='flex justify-end items-center'>
                <button
                  className='bg-green-600 hover:bg-green-700 text-white p-2 rounded flex'
                  onClick={() => setApproveModal(true)}
                >
                  Approve
                  <MdArrowRightAlt className='text-2xl ml-2' />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
