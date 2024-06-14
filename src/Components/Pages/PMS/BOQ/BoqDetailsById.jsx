import { useContext, useState, useEffect } from "react";
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

export default function BoqDetailsById(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [dataList, setDatalist] = useState();
  const [backtoAccModal, setBacktoAccModal] = useState(false);
  const [data, setData] = useState({ reference_no: "", remark: "" });

  const { state } = useLocation();
  const navigate = useNavigate();
  const { titleBarVisibility } = useContext(contextVar);

  const {
    api_fetchAllBoqDetailsbyId,
    api_postBacktoAcc,
    api_postForwardBoq,
    api_postRejectBoq,
  } = ProjectApiList();

  const { refNo, page } = useParams();

  // ══════════════════════════════║🔰Columns🔰║═══════════════════════════════════
  const COLUMNS = [
    {
      header: "Sr.No",
    },
    {
      header: "Description",
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

  let colouredBtnStyle = `bg-[#4338CA] hover:bg-[#5a50d3] text-sm px-8 py-2 text-white  rounded leading-5 shadow-lg disabled:bg-indigo-300`;

  const handlePrint = () => {
    window.print();
  };

  const fetchBoqDetailsbyId = () => {
    AxiosInterceptors.get(`${api_fetchAllBoqDetailsbyId}/${refNo}`, ApiHeader())
      .then(function (response) {
        console.log("item Categor", response?.data);
        setDatalist(response?.data?.data[0]);
      })
      .catch(function (error) {
        toast.error("Something went wrong");
        console.log("errorrr.... ", error);
      });
  };

  const handleCancel = () => {
    setBacktoAccModal(false);
  };

  //boq back to accountant------------
  const backtoAccHandler = () => {
    setBacktoAccModal(false);
    AxiosInterceptors.post(`${api_postBacktoAcc}`, data, ApiHeader())
      .then(function (response) {
        console.log("boq data fetched by id ...", response?.data?.data);
        if (response?.data?.status) {
          toast.success("Successfully sent to Accountant");
          navigate("/da-boq");
        } else {
          toast.error("Error in sending back to Accountant");
        }
      })
      .catch(function (error) {
        console.log(error, "err res");
        toast.error(error?.response?.data?.error);
      });
  };

  //approve boq ------------
  const approveBoq = () => {
    AxiosInterceptors.post(
      `${api_postForwardBoq}`,
      { reference_no: refNo },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status) {
          toast.success("BOQ is Approved Successfully!!");
          navigate("/da-boq");
        } else {
          toast.error("Error in approving. Please try Again");
        }
      })
      .catch(function (error) {
        console.log(error, "err res");
        toast.error(error?.response?.data?.error);
      });
  };

  //reject boq ------------
  const rejectBoqHandler = () => {
    AxiosInterceptors.post(
      `${api_postRejectBoq}`,
      { reference_no: refNo },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status) {
          toast.success("BOQ is Approved Successfully!!");
          navigate("/da-boq");
        } else {
          toast.error("Error in approving. Please try Again");
        }
      })
      .catch(function (error) {
        console.log(error, "err res");
        toast.error(error?.response?.data?.error);
      });
  };

  //rejecting page
  const confirmationHandler = () => {
    backtoAccHandler();
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
        message={"Are you sure you want to send BOQ back to Accountant "}
        setData={setData}
      />
    );
  }

  return (
    <div>
      <TitleBar
        titleBarVisibility={titleBarVisibility}
        titleText={"Preview BOQ"}
      />
      <div className={`${isLoading ? "opacity-40" : ""}`}>
        <div id='printable-content' className=' '>
          <div className='p-2 bg-[#4338CA] text-white pl-5 mt-6 rounded-md flex justify-between'>
            <h2 className='text-xl '>BOQ Details</h2>
          </div>
          <div className='bg-white rounded font-sans mb-10 border border-[#4338ca] shadow-lg px-4 mt-5'>
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
                    {dataList?.procurements[0]?.category?.name}
                  </span>
                </p>
                <p className='text-lg font-bold'>
                  SubCategory:{" "}
                  <span className='font-semibold text-gray-500'>
                    {dataList?.procurements[0]?.subcategory?.name}
                  </span>
                </p>
              </div>

              <div className=''>
                <p className='text-lg font-bold'>
                  GST:{" "}
                  <span className='font-semibold text-gray-500'>
                    {dataList?.gst}%
                  </span>
                </p>
                <p className='text-lg font-bold '>
                  Status:{" "}
                  <span className='font-semibold text-blue-500'>
                    {dataList?.status == 0 && "Pending"}
                  </span>
                </p>
              </div>
            </div>

            <div className='shaodow-md rounded-md'>
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
                  {dataList?.procurements?.length > 0 &&
                    dataList?.procurements?.map((row, index) => (
                      <tr key={row?.procurement_no}>
                        <td className='border border-gray-200 px-4 py-2'>
                          {index + 1}
                        </td>
                        <td className='border border-gray-200 px-4 py-2 text-sm'>
                          {row?.description}
                        </td>
                        <td className='border border-gray-200 px-4 py-2 text-sm'>
                          {row?.quantity}
                        </td>
                        <td className='border border-gray-200 px-4 py-2 text-sm'>
                          {row?.category?.name == "Cleaning Appliances"
                            ? "L"
                            : "kg"}
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
          {page &&
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
            )}

          <button className={buttonStyle} onClick={handlePrint}>
            Print
          </button>
          {page == "inbox" &&
            (dataList?.status === 0 || dataList?.status === 1) && (
              <button
                className='bg-red-400  hover:bg-red-500  text-white pb-2 pl-6 pr-6 pt-2 rounded flex'
                onClick={() => rejectBoqHandler(true)}
              >
                Reject BOQ
              </button>
            )}
          {page &&
            page == "inbox" &&
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

          {page == "inbox" &&
            (dataList?.status === 0 || dataList?.status === 1) && (
              <button
                className='bg-green-600 hover:bg-green-700 text-white p-2 rounded flex'
                onClick={() => approveBoq()}
              >
                Approve BOQ
              </button>
            )}

          {page == "inbox" && dataList?.status == 2 && (
            <div className='flex justify-end items-center'>
              <button
                className='bg-green-600 hover:bg-green-700 text-white p-2 rounded flex'
                onClick={() => navigate(`/tendering?tabNo=1`, { state: refNo })}
              >
                Proceed to Pre Tendering{" "}
                <MdArrowRightAlt className='text-2xl ml-2' />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
