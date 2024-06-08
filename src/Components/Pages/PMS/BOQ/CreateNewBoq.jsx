//////////////////////////////////////////////////////////////////////////////////////
//    Author - Dimple Kumari
//    Version - 1.0
//    Date - 06/08/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - CreateNewBoq
//    DESCRIPTION - BOQ creating
//////////////////////////////////////////////////////////////////////////////////////

import { useEffect, useRef, useState, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FileButton from "@/Components/Common/FileButtonUpload/FileButton";
import ImageDisplay from "@/Components/Common/FileButtonUpload/ImageDisplay";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ProjectApiList from "@/Components/api/ProjectApiList";
import toast from "react-hot-toast";
import ApiHeader from "@/Components/api/ApiHeader";
import TitleBar from "../../Others/TitleBar";
import { contextVar } from "@/Components/context/contextVar";
import { indianAmount } from "@/Components/Common/PowerUps/PowerupFunctions";
import PreProcurementCancelScreen from "../PrePrecurement/StockReceiver/PreProcurementCancelScreen";

export default function CreateNewBoq() {
  const [imageDoc, setImageDoc] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [applicationData, setApplicationData] = useState([]);
  const [payload, setPayload] = useState({});
  const [preview, setPreview] = useState();
  const [cancelModal, setCancelModal] = useState(false);

  const notesheetRef = useRef();
  const navigate = useNavigate();
  const { state } = useLocation();

  const { titleBarVisibility } = useContext(contextVar);

  const { api_fetchAllBoqDetails } = ProjectApiList();
  let buttonStyle =
    " mr-1 pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-indigo-500 text-base leading-tight  rounded  hover:bg-indigo-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl";

  // ══════════════════════════════║🔰Columns🔰║═══════════════════════════════════
  const COLUMNS = [
    {
      header: "Sr.No",
      isEditable: false,
    },
    {
      header: "Description",
      isEditable: false,
    },
    {
      header: "Quantity",
      isEditable: false,
    },
    {
      header: "Unit",
      isEditable: false,
    },
    {
      header: "Rate",
      isEditable: true,
    },
    {
      header: "Amount",
      isEditable: false,
    },
    {
      header: "Remark",
      isEditable: true,
    },
  ];

  //fetchg data for boq list---------------
  const fetchBoqDataList = (data) => {
    let estAmtWithoutGst = 0;
    setisLoading(true);
    AxiosInterceptors.post(
      `${api_fetchAllBoqDetails}`,
      { procurement_no: state?.proNos },
      ApiHeader()
    )
      .then(function (response) {
        console.log("all boq data fetched ...", response?.data?.data);
        if (response?.data?.status) {
          setApplicationData(response?.data?.data);
          response?.data?.data.map(
            (data) => (estAmtWithoutGst += data.total_rate)
          );
          setPayload((prev) => ({
            ...prev,
            procurement: [...response?.data?.data],
            estimated_cost: estAmtWithoutGst,
          }));
          setisLoading(false);
        } else {
          toast.error(response?.data?.message);
        }
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error);
        setisLoading(false);
      });
  };

  //adding remarks
  const addRemarkHandler = (e, procNo) => {
    const addedRemarks = applicationData?.map((data) => ({
      ...data,
      remark: data?.procurement_no === procNo ? e.target.value : data?.remark,
    }));
    setApplicationData(addedRemarks);
    setPayload((prev) => ({
      ...prev,
      procurement: [...addedRemarks],
      img: imageDoc,
    }));
  };

  //estimated amount with gst cal
  const estimatedAmountCalc = (gst, editRate) => {
    let totalAmount = 0;
    let totalEstAmt = (editRate || applicationData)?.map(
      (data) => (totalAmount += data?.total_rate)
    );
    console.log(totalAmount, "totalAmount==========");
    //calculating gst value
    const gstValue =
      Number(gst) > 0 ? (1 + Number(gst) / 100) * totalAmount : totalAmount;
    let roundedGstValue = Math.floor(gstValue * 100) / 100;
    setPayload((prev) => ({
      ...prev,
      gst: Number(gst),
      estimated_cost: roundedGstValue,
    }));
  };

  //adding rate and calculating amount
  const changeRateAmountHandler = (e, procNo) => {
    const editRate = applicationData?.map((data) => ({
      ...data,
      rate: data?.procurement_no === procNo ? e.target.value : data?.rate,
      total_rate:
        data?.procurement_no === procNo
          ? Number(e.target.value) * Number(data?.quantity)
          : data?.total_rate,
    }));
    setApplicationData(editRate);
    setPayload((prev) => ({
      ...prev,
      procurement: [...editRate],
    }));
    estimatedAmountCalc(payload?.gst, editRate);
  };

  useEffect(() => {
    if (imageDoc) {
      setPayload((prev) => ({ ...prev, img: imageDoc }));
    } else {
      fetchBoqDataList();
    }
  }, [imageDoc]);

  //confirmation for cancel
  if (cancelModal) {
    return <PreProcurementCancelScreen setIsModalOpen2={setCancelModal} />;
  }

  return (
    <div>
      <TitleBar
        titleBarVisibility={titleBarVisibility}
        titleText={"Enter BOQ for Procurement"}
      />
      <div className='container mx-auto bg-white rounded border border-blue-500 mt-10 shadow-xl p-6'>
        <div className='p-2 bg-[#4338CA] text-white text-center mt-6 rounded-t-md'>
          <h2 className='text-2xl '>Enter BOQ for Procurement</h2>
        </div>
        <div className='shadow-md'>
          <table className='min-w-full bg-white border-collapse border border-gray-200'>
            <thead className='bg-indigo-50 '>
              {COLUMNS?.length > 0 &&
                COLUMNS?.map((heading, index) => (
                  <th
                    key={index}
                    className='border border-gray-300 px-4 py-3 text-bold text-sm'
                  >
                    {heading?.header}
                  </th>
                ))}
            </thead>
            <tbody className='font-normal text-center '>
              {applicationData?.length > 0 &&
                applicationData.map((row, index) => (
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
                    <td className='border border-gray-200 text-md w-[30px] px-1'>
                      <input
                        className='outline-indigo-400 text-md px-2 h-[30px] border border-gray-300 rounded-md'
                        defaultValue={row?.rate}
                        onChange={(e) =>
                          changeRateAmountHandler(e, row?.procurement_no)
                        }
                      />
                    </td>
                    <td className='border border-gray-200 px-4 py-2 text-sm'>
                      {row?.total_rate}
                    </td>

                    <td className='border border-gray-200 p-1'>
                      <input
                        placeholder='Enter remarks...'
                        className='outline-indigo-400 text-md px-2 h-[30px] rounded-md w-full'
                        onChange={(e) =>
                          addRemarkHandler(e, row?.procurement_no)
                        }
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div className='flex px-3 py-2 gap-6 bg-white text-center font-bold items-center'>
            <div className='text-center w-[7%] mr-3 '>#</div>
            <div className='flex justify-between pl-9 w-2/3'>
              <p className='text-bold text-sm pt-2'>Add Gst</p>
              <input
                placeholder='Add Gst'
                className='p-1 text-md rounded-md outline-indigo-200 text-center border border-indigo-200'
                onChange={(e) => estimatedAmountCalc(e.target.value)}
              />
            </div>
            <span>%</span>
          </div>
          <div className='flex px-3 py-2 justify-around gap-6 bg-[#4338CA] text-white'>
            <div className='w-1/3'>
              <p>Estimated cost including GSt</p>
            </div>
            <div className='w-2/3 flex justify-center '>
              <p>{indianAmount(payload?.estimated_cost)}</p>
            </div>
          </div>
        </div>

        {/* image upload and view */}
        <div className='flex justify-between mb-10 p-2'>
          <div className='flex w-2/3'>
            <textarea
              name='sr_remark'
              className='border border-[#5448dd] rounded w-full mt-5 p-2 outline-indigo-200'
              placeholder=' Enter Remarks...'
              onChange={(e) =>
                setPayload((prev) => ({ ...prev, remark: e.target.value }))
              }
              required
            />
          </div>
          <div className='flex justify-end m-5 gap-4'>
            <div className='flex justify-end mb-4'>
              <ImageDisplay
                preview={preview}
                imageDoc={imageDoc}
                alt={"Notesheet doc"}
                showPreview={"hidden"}
                width={"[100px]"}
              />
            </div>
            <div className='py-2'>
              <FileButton
                bg={"[#4338CA]"}
                hoverBg={"bg-indigo-300"}
                btnLabel={"Upload Reference Docs"}
                imgRef={notesheetRef}
                setImageDoc={setImageDoc}
                setPreview={setPreview}
                textColor={"white"}
              />
            </div>
          </div>
        </div>
        <div className='flex justify-end mb-10 gap-4'>
          <button className={buttonStyle} onClick={() => setCancelModal(true)}>
            Cancel
          </button>
          <button
            className={`bg-[#4338CA] hover:bg-[#5a50d3] text-sm px-8 py-2 text-white  rounded leading-5 shadow-lg disabled:bg-indigo-300`}
            onClick={() => navigate("/boqSummary", { state: payload })}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
