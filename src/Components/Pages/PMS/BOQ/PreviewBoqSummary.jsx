import { useContext, useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { contextVar } from "@/Components/context/contextVar";
import TitleBar from "../../Others/TitleBar";
import { indianAmount } from "@/Components/Common/PowerupFunctions";
import ImageDisplay from "@/Components/Common/FileButtonUpload/ImageDisplay";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ProjectApiList from "@/Components/api/ProjectApiList";
import ApiHeader2 from "@/Components/api/ApiHeader2";
import ConfirmationModal from "@/Components/Common/Modal/ConfirmationModal";
import LoaderApi from "@/Components/Common/Loaders/LoaderApi";
import { useReactToPrint } from "react-to-print";

export default function PreviewBoqSummary() {
  const [isLoading, setIsLoading] = useState(false);
  const [uldId, setUlbId] = useState();
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [showMessageModal, setShowMessaegModal] = useState(false);
  const [refID, setRefId] = useState();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { titleBarVisibility } = useContext(contextVar);

  const { api_postForwardAndCreateBoq, api_postUpdatedBoq } = ProjectApiList();

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

  let buttonStyle =
    " mr-1 pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-indigo-500 text-base leading-tight  rounded  hover:bg-indigo-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl";

  const createAndForwardBoq = async () => {
    setConfirmationModal(false);
    setIsLoading(true);
    let body = { ...state, ulb_id: uldId, amount: state?.total_rate };
    let formData = new FormData();
    formData.append("img", state?.img);
    formData.append("boqData", JSON.stringify(body));

    AxiosInterceptors.post(api_postForwardAndCreateBoq, formData, ApiHeader2())
      .then(function (response) {
        if (response?.data?.status) {
          setRefId(response?.data?.reference_no);
          setShowMessaegModal(true);
          setTimeout(() => {
            setIsLoading(false);
            navigate("/da-boq");
          }, 2000);
        } else {
          setIsLoading(false);
          console.log(response);
          toast.error("Error in Forwarding to DA. Please try again");
        }
      })
      .catch(function (error) {
        console.log(error, "errrrrrrrrrrrrrrrrrrr");
        setIsLoading(false);
        toast.error(error?.response?.data?.error);
      });
  };

  const updateBoqChanges = async () => {
    setConfirmationModal(false);
    setIsLoading(true);
    let body = {
      ...state,
      ulb_id: uldId,
      amount: state?.total_rate,
      reference_no: state?.reference_no,
    };
    let formData = new FormData();
    formData.append("img", state?.img);
    formData.append("boqData", JSON.stringify(body));

    AxiosInterceptors.put(`${api_postUpdatedBoq}`, formData, ApiHeader2())
      .then(function (response) {
        if (response?.data?.status) {
          toast.success("Successfully Updated the BOQ");
          setTimeout(() => {
            setIsLoading(false);
            navigate("/boq-search");
          }, 2000);
        } else {
          setIsLoading(false);
          console.log(response, "res");
          toast.error("Error in Forwarding to DA. Please try again");
        }
      })
      .catch(function (error) {
        console.log(error, "errrrrrrrrrrrrrrrrrrr");
        setIsLoading(false);
        toast.error(error?.response?.data?.error);
      });
  };

  const confirmationHandler = () => {
    createAndForwardBoq();
  };

  const handleCancel = () => {
    setConfirmationModal(false);
  };

  useEffect(() => {
    const ulb_id = window.localStorage.getItem("ulbId");
    setUlbId(ulb_id);
  }, []);

  //displaying confirmation message
  if (confirmationModal) {
    return (
      <>
        <ConfirmationModal
          confirmationHandler={confirmationHandler}
          handleCancel={handleCancel}
          message={"Are you sure you want to Save"}
        />
      </>
    );
  }

  if (showMessageModal) {
    return (
      <>
        <ConfirmationModal
          confirmationHandler={() => setShowMessaegModal(false)}
          handleCancel={() => setShowMessaegModal(false)}
          message={"Successfully Saved"}
          sideMessage={`Your Reference No - ${refID}`}
        />
      </>
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
        <div
          ref={componentRef}
          className=' bg-white rounded font-sans mb-10 border border-[#4338ca] shadow-lg px-4'
        >
          <div className='p-2 bg-[#4338CA] text-white text-center mt-6 rounded-t-md'>
            <h2 className='text-xl '>BOQ Summary</h2>
          </div>
          <div className=''>
            <div>
              <div className='flex mb-4 p-4 shadow-md justify-between px-6'>
                <div>
                  <p className='text-lg font-bold mb-2'>
                    Category:{" "}
                    <span className='font-semibold text-gray-500'>
                      {state?.procurement[0]?.category?.name}
                    </span>
                  </p>
                  <p className='text-lg font-bold'>
                    SubCategory:{" "}
                    <span className='font-semibold text-gray-500'>
                      {state?.procurement[0]?.subcategory?.name}
                    </span>
                  </p>
                </div>
                <div>
                  <p className='text-lg font-bold mb-2'>
                    Gst:{" "}
                    <span className='font-semibold text-gray-500'>
                      {state?.gst ? `${state?.gst}% ` : "Gst not added"}
                    </span>
                  </p>
                  <p className='text-lg font-bold mb-2'>
                    HSN Code:{" "}
                    <span className='font-semibold text-gray-500'>
                      {state?.hsn_code ? `${state?.hsn_code} ` : "Not added"}
                    </span>
                  </p>
                </div>
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
                  {state?.procurement?.length > 0 &&
                    state?.procurement?.map((row, index) => (
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
                          {row?.total_rate}
                        </td>

                        <td className='border border-gray-200 px-4 py-2 text-sm'>
                          {row?.remark}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className='p-2 px-8 bg-[#4338CA] text-white flex justify-between mt-6 rounded-t-md '>
              <h2 className='text-xl'>Estimated Cost</h2>
              <h2 className='text-xl'>{indianAmount(state?.estimated_cost)}</h2>
            </div>

            <div className='m-4'>
              <p className='text-lg font-semibold px-2'>
                Remark -{" "}
                <span className='text-gray-400'>
                  {state?.remark || "No remark added"}
                </span>{" "}
              </p>
              <div className='flex justify-end mb-4'>
                <ImageDisplay
                  preview={state?.img && URL.createObjectURL(state?.img)}
                  imageDoc={state?.img}
                  alt={"Notesheet doc"}
                  showPreview={"hidden"}
                  width={"[100px]"}
                />
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-end mb-10 gap-4'>
          <button className={buttonStyle} onClick={handlePrint}>
            Print
          </button>
          {state?.status === 0 ||
          state?.status === 1 ||
          state?.status === -1 ? (
            <button
              className={`bg-[#1A4D8C] text-sm px-8 py-2 text-white  rounded leading-5 shadow-lg disabled:bg-indigo-300`}
              onClick={() => updateBoqChanges(true)}
            >
              {isLoading ? "Updating..." : "Save Changes"}
            </button>
          ) : (
            <button
              className={`bg-[#4338ca] hover:bg-[#564cc2] text-sm px-8 py-2 text-white  rounded leading-5 shadow-lg disabled:bg-indigo-300`}
              onClick={() => setConfirmationModal(true)}
            >
              {isLoading ? "Processing..." : "Submit"}
            </button>
          )}
          {/* <button
            className={`bg-[#1A4D8C] text-sm px-8 py-2 text-white  rounded leading-5 shadow-lg disabled:bg-indigo-300`}
            onClick={() => setConfirmationModal(true)}
          >
            
            {isLoading ? "Processing..." : "Forward To DA"}
          </button> */}
        </div>
      </div>
    </div>
  );
}
