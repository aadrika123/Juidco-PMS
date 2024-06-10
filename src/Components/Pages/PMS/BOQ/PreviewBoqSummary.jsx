import { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { contextVar } from "@/Components/context/contextVar";
import TitleBar from "../../Others/TitleBar";
import { indianAmount } from "@/Components/Common/PowerupFunctions";
import ImageDisplay from "@/Components/Common/FileButtonUpload/ImageDisplay";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ProjectApiList from "@/Components/api/ProjectApiList";
import ApiHeader2 from "@/Components/api/ApiHeader2";

export default function PreviewBoqSummary() {
  const [isLoading, setIsLoading] = useState(false);
  const [uldId, setUlbId] = useState();
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log(state, "state=============");
  const { titleBarVisibility } = useContext(contextVar);

  const { api_postForwardAndCreateBoq } = ProjectApiList();

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

  const handlePrint = () => {
    window.print();
  };

  const createAndForwardBoq = async () => {
    setIsLoading(true);
    let body = { ...state, ulb_id: uldId };
    let formData = new FormData();
    formData.append("img", state?.img);
    formData.append("boqData", JSON.stringify(body));

    AxiosInterceptors.post(api_postForwardAndCreateBoq, formData, ApiHeader2())
      .then(function (response) {
        if (response?.data?.status) {
          setIsLoading(false);
          toast.success("Successfully forwarded to DA");
          setTimeout(() => {
            navigate("/boq-search");
          }, 2000);
        } else {
          setIsLoading(false);
          toast.error("Something went wrong");
        }
      })
      .catch(function (error) {
        console.log(error, "errrrrrrrrrrrrrrrrrrr");
        setIsLoading(false);
        toast.error(error?.response?.data?.error);
      });
  };

  useEffect(() => {
    const ulb_id = window.localStorage.getItem("ulbId");
    setUlbId(ulb_id);
  }, []);

  return (
    <div>
      <TitleBar
        titleBarVisibility={titleBarVisibility}
        titleText={"Preview BOQ"}
      />
      <div className={`${isLoading ? "opacity-40" : ""}`}>
        <div
          id='printable-content'
          className=' bg-white rounded font-sans mb-10 border border-[#4338ca] shadow-lg px-4'
        >
          <div className='p-2 bg-[#4338CA] text-white text-center mt-6 rounded-t-md'>
            <h2 className='text-xl '>BOQ Summary</h2>
          </div>
          <div className=''>
            <div className='mb-4 p-4 shadow-md'>
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

            <div className='p-2 px-4 bg-[#4338CA] text-white flex justify-between mt-6 rounded-t-md '>
              <h2 className='text-xl '>Estimated Cost</h2>
              <h2>{indianAmount(state?.estimated_cost)}</h2>
            </div>

            <div>
              <p className='text-lg font-semibold px-2'>
                Remark - <span className='text-gray-400'>{state?.remark}</span>{" "}
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
          <button
            className={`bg-[#1A4D8C] text-sm px-8 py-2 text-white  rounded leading-5 shadow-lg disabled:bg-indigo-300`}
            onClick={() => createAndForwardBoq()}
          >
            {isLoading ? "Processing..." : "Forward To DA"}
          </button>
        </div>
      </div>
    </div>
  );
}
