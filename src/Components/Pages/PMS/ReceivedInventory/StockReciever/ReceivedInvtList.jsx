//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash Alam
//    Version - 1.0
//    Date - 23/05/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - ReceivedInvtList
//    DESCRIPTION - ReceivedInvtList
//////////////////////////////////////////////////////////////////////////////////////

import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import * as yup from "yup";
import moment from "moment";

import ProjectApiList from "@/Components/api/ProjectApiList";
import BarLoader from "@/Components/Common/Loaders/BarLoader";
import ThemeStyle from "@/Components/Common/ThemeStyle";
import { RotatingLines } from "react-loader-spinner";
import { RiFilter2Line } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import ListTableParent from "@/Components/Common/ListTable2/ListTableParent";
import { GoPlus } from "react-icons/go";
import { FaChartPie } from "react-icons/fa";

function ReceivedInvtList(props) {
  const navigate = useNavigate();
  const { module } = useParams();

  console.log(props.page, "page========>");
  // ══════════════════════════════║🔰 Custom style 🔰║═══════════════════════════════════

  const { labelStyle, headingStyle, titleStyle, addButtonColor } = ThemeStyle();

  // ══════════════════════════════║🔰Usestate🔰║═══════════════════════════════════

  const [changeData, setchangeData] = useState(0);
  const [requestBody, setRequestBody] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [loader, setloader] = useState(false);
  const [activeButton, setActiveButton] = useState("inbox");

  let testDate = new Date().toLocaleDateString("in-IN");
  let todayDate = moment(testDate).format("DD-MM-YYYY");

  const validationSchema = yup.object({
    // fromDate: yup.string().required("Field Required"),
    // uptoDate: yup.string().required("Field Required"),
    // key: yup.string().required("Field Required"),
  });

  const formik = useFormik({
    initialValues: {
      // fromDate: moment(new Date()).format("yy-MM-DD"),
      // uptoDate: moment(new Date()).format("yy-MM-DD"),
      // key: "",
    },
    onSubmit: (values) => {
      console.log("values =>  ", values);
      fetchResouceList(values);

      // setchangeData((prev) => prev + 1);
    },
    validationSchema,
  });

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
      Cell: (
        { cell } // console.log(cell.row.values,"===================celllllll")
      ) => <div className='pr-2'>{cell.row.values.brand || "N/A"}</div>,
    },

    // {
    //   Header: "Graphics",
    //   accessor: "graphics",
    //   Cell: ({ cell }) => (
    //     <div className='pr-2'>{cell.row.values.graphics.name}</div>
    //   ),
    // },
    // {
    //   Header: "OS",
    //   accessor: "os",
    //   Cell: ({ cell }) => (
    //     <div className='pr-2'>{cell.row.values.os.name}</div>
    //   ),
    // },
    // {
    //   Header: "Processor",
    //   accessor: "processor",
    //   Cell: ({ cell }) => (
    //     <div className='pr-2'>{cell.row.values.processor.name}</div>
    //   ),
    // },
    {
      Header: "status",
      accessor: "status",
      Cell: ({ cell }) => (
        <div className='pr-2'>
          <p className='font-bold text-yellow-800'>
            {cell.row.values.status.status == -1 && "Back to SR"}
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
            {cell.row.values.status.status == 2 && "Release for Tender"}
          </p>
          <p className='font-bold text-green-500'>
            {cell.row.values.status.status == 3 && "Supplier Assigned"}
          </p>
          <p className='font-bold text-green-500'>
            {cell.row.values.status.status == 4 && "Incomplete stocks received"}
          </p>
          <p className='font-bold text-green-500'>
            {cell.row.values.status.status == 5 && "Stocks received"}
          </p>
        </div>
      ),
    },
    {
      Header: "Remark",
      accessor: "remark",
      Cell: ({ cell }) => (
        <div className='pr-2 text-green-800 truncate w-14'>
          {cell.row.values.remark || "N/A"}
        </div>
      ),
    },
    {
      Header: "Action",
      accessor: "id",
      Cell: ({ cell }) => (
        <>
          <button
            className='bg-[#4338CA] text-white px-2 py-1 rounded hover:bg-[#373081]'
            onClick={() =>
              navigate(
                `/sr-received-InvtDetailsById/${cell.row.values.id}/${props.page}`
              )
            }
          >
            View
          </button>
        </>
      ),
    },
  ];

  const fetchResouceList = (data) => {
    console.log(data, "payload data for searchin water");
    setRequestBody(data);
    setchangeData((prev) => prev + 1);
  };

  // const commonInputStyle = `form-control block w-full px-2 py-1 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md`;

  // ══════════════════════════════║🔰Loader🔰║═══════════════════════════════════
  if (isLoading) {
    return (
      <>
        <BarLoader />
        <div className='min-h-screen'></div>
      </>
    );
  }

  const tableSelector = (page) => {
    switch (page) {
      case "inbox":
        return "DAIN";
      case "outbox":
        return "DAOUT";
      default:
        return "DAIN";
    }
  };

  return (
    <>
      {loader && <BarLoader />}
      <div className='container mx-auto p-4'>
        <div className=''>
          <div className='flex justify-between'></div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 '>
          <div className='col-span-12'>
            <>
              <ListTableParent
                table={tableSelector(props?.page)}
                api={props.api}
                columns={COLUMNS}
                requestBody={requestBody} // sending body
                changeData={changeData} // send action for new payload
              />
            </>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReceivedInvtList;
