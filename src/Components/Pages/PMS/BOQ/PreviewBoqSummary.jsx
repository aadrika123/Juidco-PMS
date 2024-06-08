import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { contextVar } from "@/Components/context/contextVar";
import TitleBar from "../../Others/TitleBar";

export default function PreviewBoqSummary() {
  const { state } = useLocation();
  console.log(state, "state=============");
  const { titleBarVisibility } = useContext(contextVar);

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

  return (
    <div>
      <TitleBar
        titleBarVisibility={titleBarVisibility}
        titleText={"Preview BOQ"}
      />
      <div>
        <div className='p-2 bg-[#4338CA] text-white text-center mt-6 rounded-t-md'>
          <h2 className='text-xl '>BOQ Summary</h2>
        </div>
        <div className=' bg-white rounded-t-md font-sans '>
          <div className='mb-4 p-4 shadow-md'>
            <p className='text-lg font-bold mb-2'>
              Category:{" "}
              <span className='font-semibold text-gray-500'>
                {state?.procurement[0].category?.name}
              </span>
            </p>
            <p className='text-lg font-bold'>
              SubCategory:{" "}
              <span className='font-semibold text-gray-500'>
                {state?.procurement[0].subcategory?.name}
              </span>
            </p>
          </div>

          <div className='shaodow-md rounded-md'>
            <table className='min-w-full bg-white border-collapse border border-gray-200 rounded-md'>
              <thead className='bg-[#4338CA] text-white rounded-md'>
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
                  state?.procurement.map((row, index) => (
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

          <div></div>
        </div>
      </div>
    </div>
  );
}
