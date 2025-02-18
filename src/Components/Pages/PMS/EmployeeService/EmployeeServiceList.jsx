//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash Alam
//    Version - 1.0
//    Date - 22/07/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - EmployeeServiceList
//    DESCRIPTION - EmployeeServiceList
//////////////////////////////////////////////////////////////////////////////////////

import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
// import Modal from "react-modal";
import * as yup from "yup";
import moment from "moment";

import ProjectApiList from "@/Components/api/ProjectApiList";
import BarLoader from "@/Components/Common/Loaders/BarLoader";
import ThemeStyle from "@/Components/Common/ThemeStyle";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import ListTableParent from "@/Components/Common/ListTable2/ListTableParent";

function EmployeeServiceList(props) {
  const navigate = useNavigate();
  const { module } = useParams();
  // ══════════════════════════════║🔰 Custom style 🔰║═══════════════════════════════════

  const { labelStyle, headingStyle, titleStyle, addButtonColor } = ThemeStyle();

  // ══════════════════════════════║🔰Usestate🔰║═══════════════════════════════════

  const [changeData, setchangeData] = useState(0);
  const [requestBody, setRequestBody] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [loader, setloader] = useState(false);

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
      Cell: ({ row }) => <div className="pr-2">{row.index + 1}</div>,
    },
    {
      Header: "Handover No",
      accessor: "stock_handover_no",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.values.stock_handover_no}</div>
      ),
    },
    {
      Header: "Service No",
      accessor: "service_no",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.values.service_no}</div>
      ),
    },
    {
      Header: "Service",
      accessor: "service",
      Cell: ({ cell }) => (
        <div className="pr-2 capitalize">{cell.row.values.service}</div>
      ),
    },
    {
      Header: "Category",
      accessor: "inventory",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.values.inventory?.category?.name} </div>
      ),
    },
    
    

    {
      Header: <p className="text-center">Status</p>,
      accessor: "status",
      Cell: ({ cell }) => (
        <div className="pr-2">
          
          {cell.row.values.status == -2 && (
            <p className="text-status_reject_text text-center bg-status_reject_bg border-status_reject_border border-[1px] px-1 py-1  rounded-md">
              Rejected
            </p>
          )}
          {cell.row.values.status == 10 && (
            <p className="text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md">
              Forwarded To DA
            </p>
          )}
          {cell.row.values.status == 41 && (
            <p className="text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md">
              Acknowledged
            </p>
          )}
          
        </div>
      ),
    },
    // {
    //   Header: "Remark",
    //   accessor: "remark",
    //   Cell: ({ cell }) => (
    //     <div className='pr-2 text-green-800 truncate'>
    //       {cell.row.values.remark || ""}
    //     </div>
    //   ),
    // },
    {
      Header: "Action",
      accessor: "id",
      Cell: ({ cell }) => (
        <>
          <button
            className="bg-[#4338CA] text-white px-2 py-1 rounded hover:bg-[#373081]"
            onClick={() =>
              navigate(
                `/employeeServiceById/${cell.row.values.service_no}/${props.page}`
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
        return "SRIN";
      case "outbox":
        return "SROUT";
      default:
        return "SRIN";
    }
  };

  return (
    <>
      {loader && <BarLoader />}
      <div className='container mx-auto p-4'>
        <div className='grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 '>
          <div className='col-span-12'>
            <>
              <ListTableParent
                table={tableSelector(props?.page)}
                api={props.api}
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

export default EmployeeServiceList;
