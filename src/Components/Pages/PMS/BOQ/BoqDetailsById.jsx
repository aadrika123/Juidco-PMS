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
    api_postForwardBoq,
    api_postRejectBoq,
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

  //approve boq ------------
  const approveBoq = () => {
    setIsLoading(true);

    AxiosInterceptors.post(
      `${api_postForwardBoq}`,
      { reference_no: refNo },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status) {
          toast.success("BOQ is Approved Successfully!!");
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
          toast.success("BOQ has been set to Finance Successfully!!");
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

      <div className={`${isLoading ? "opacity-40" : ""}`}>
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
                {/* <p className='text-lg font-bold'>
                  SubCategory:{" "}
                  <span className='font-semibold text-gray-500'>
                    {dataList?.procurement_stocks[0]?.subcategory?.name}
                  </span>
                </p> */}
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
                    {dataList?.status == 0 && "Pending"}
                  </span>
                </p>
                <p className='text-lg font-bold '>
                  HSN Code:{" "}
                  <span className='font-semibold text-gray-500'>
                    {dataList?.hsn_code}
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
                        <td className='border border-gray-200 px-4 py-2 text-sm'>
                          {row?.description}
                        </td>
                        <td className='border border-gray-200 px-4 py-2 text-sm'>
                          {row?.subCategory?.name}
                        </td>
                        <td className='border border-gray-200 px-4 py-2 text-sm'>
                          {row?.quantity}
                        </td>
                        <td className='border border-gray-200 px-4 py-2 text-sm'>
                          {row?.category?.name}
                        </td>
                        <td className='border border-gray-200 px-4 py-2 text-sm'>
                          {row?.rate}
                        </td>
                        <td className='border border-gray-200 px-4 py-2 text-sm'>
                          {row?.total_rate ||
                            row?.amount ||
                            Number(row?.quantity) * Number(row?.rate)}
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
                    url={dataList?.boq_doc[0]?.imageUrl}
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
          {page &&
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
            )}

            {page == "inbox" && dataList?.status == 42 && 
            <button
            className={colouredBtnStyle}
            onClick={() =>
              navigate(`/bidding-input-form/${dataList?.reference_no}`)
            }
          >
            Fill Pre Tender Info
          </button>
          }

          {/* {page == "inbox" &&
            (dataList?.status === 0 || dataList?.status === 1) && (
              <button
                className='bg-green-600 hover:bg-green-700 text-white p-2 rounded flex'
                onClick={() => approveBoq()}
              >
                Approve BOQ
              </button>
            )} */}

          {page == "inbox" && dataList?.status == 0 && (
            <div className='flex justify-end items-center'>
              <button
                className='bg-green-600 hover:bg-green-700 text-white p-2 rounded flex'
                onClick={forwardBoqFinanceHandler}
                // onClick={() =>
                //   navigate(`/tendering?tabNo=1`, { state: refNo })
                // }
              >
                Forward to Finance
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

          {/* {(page == "inbox" || page == "boq-status") &&
            dataList?.preTender?.status == 0 &&
            dataList?.status == 0 &&
            !dataList?.preTender?.isPartial && (
              <div className='flex justify-end items-center'>
                <button
                  className='bg-green-600 hover:bg-green-700 text-white p-2 rounded flex'
                  // onClick={() =>
                  //   navigate(`/tendering?tabNo=1`, { state: refNo })
                  // }
                >
                  Forward To level I
                </button>
              </div>
            )} */}
        </div>
      </div>
    </div>
  );
}
