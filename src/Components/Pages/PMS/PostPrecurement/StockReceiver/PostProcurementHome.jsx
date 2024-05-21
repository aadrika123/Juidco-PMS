import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import ProjectApiList from "@/Components/api/ProjectApiList";
import BarLoader from "@/Components/Common/Loaders/BarLoader";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import ListTableParent from "@/Components/Common/ListTable2/ListTableParent";

export default function PostProcurementHome() {
  const navigate = useNavigate();
  const { api_fetchProcurementList, api_fetchProcurementDAList } =
    ProjectApiList();

  const [isLoading, setIsLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [changeData, setchangeData] = useState(0);
  const [requestBody, setRequestBody] = useState(null);

  const fetchResouceList = (data) => {
    console.log(data, "payload data for searchin water");
    setRequestBody(data);
    setchangeData((prev) => prev + 1);
    setLoader(false);
  };

  const tableSelector = (page) => {
    switch (page) {
      case "inbox":
        return "SRIN";
      case "outbox":
        return "SROUT";
      default:
        return "SRIN";
    }
  };

  // ══════════════════════════════║🔰Columns🔰║═══════════════════════════════════
  const COLUMNS = [
    {
      Header: "#",
      Cell: ({ row }) => <div className='pr-2'>{row.index + 1}</div>,
    },
    {
      Header: "Order No",
      accessor: "order_no",
      Cell: ({ cell }) => (
        <div className='pr-2'>{cell.row.values.order_no}</div>
      ),
    },
    {
      Header: "Category",
      accessor: "category",
      Cell: ({ cell }) => (
        <div className='pr-2'>{cell.row.values.category.name} </div>
      ),
    },
    {
      Header: "Sub Category",
      accessor: "subcategory",
      Cell: ({ cell }) => (
        <div className='pr-2'>{cell.row.values.subcategory.name} </div>
      ),
    },
    {
      Header: "Brand",
      accessor: "brand",
      Cell: ({ cell }) => (
        <div className='pr-2'>{cell.row.values.brand || "N/A"}</div>
      ),
    },

    {
      Header: "status",
      accessor: "status",
      Cell: ({ cell }) => (
        <div className='pr-2'>
          <p className='font-bold text-yellow-800'>
            {cell.row.values.status.status == -1 && "Back from DA"}
          </p>
          <p className='font-bold text-red-500'>
            {cell.row.values.status.status == -2 && "Rejected"}
          </p>
          <p className='font-bold text-blue-800'>
            {cell.row.values.status.status == 0 && "Pending"}
          </p>
          <p className='font-bold text-blue-800'>
            {cell.row.values.status.status == 1 && "DA's Inbox"}
          </p>
          <p className='font-bold text-green-800'>
            {cell.row.values.status.status == 2 && "Released for Tender"}
          </p>
          <p className='font-bold text-green-500'>
            {cell.row.values.status.status == 3 && "Stock Received"}
          </p>
          <p className='font-bold text-green-500'>
            {cell.row.values.status.status == 4 && "Stock Verified"}
          </p>
        </div>
      ),
    },
    {
      Header: "Remark",
      accessor: "remark",
      Cell: ({ cell }) => (
        <div className='pr-2 text-green-800 truncate'>
          {cell.row.values.remark || "N/A"}
        </div>
      ),
    },
    // {
    //   Header: "Action",
    //   accessor: "id",
    //   Cell: ({ cell }) => (
    //     <>
    //       <button
    //         className='bg-[#4338CA] text-white px-2 py-1 rounded hover:bg-[#373081]'
    //         onClick={() =>
    //           navigate(
    //             `/sr-viewInventoryDetailsById/${cell.row.values.id}/${props.page}`
    //           )
    //         }
    //       >
    //         View
    //       </button>
    //     </>
    //   ),
    // },
  ];

  // ══════════════════════════════║🔰Loader🔰║═══════════════════════════════════
  if (isLoading) {
    return (
      <>
        <BarLoader />
        <div className='min-h-screen'></div>
      </>
    );
  }

  useEffect(() => {
    setLoader(true);
    fetchResouceList();
  }, []);

  return (
    <>
      {loader && <BarLoader />}
      <div className='container mx-auto p-4'>
        <div className='grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 '>
          <div className='col-span-12'>
            <>
              <ListTableParent
                // table={tableSelector(props?.page)}
                api={api_fetchProcurementList}
                columns={COLUMNS}
                requestBody={requestBody} // sending body
                changeData={changeData} // send action for new payload
                showDiv={true}
              />
            </>
          </div>
        </div>
      </div>
    </>
  );
}
