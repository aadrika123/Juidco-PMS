//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash Alam
//    Version - 1.0
//    Date - 25/05/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - InventoryProposalList
//    DESCRIPTION - InventoryProposalList
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
import { useNavigate, useParams } from "react-router-dom";
import ListTableParent from "@/Components/Common/ListTable2/ListTableParent";

function InventoryProposalList(props) {
  const navigate = useNavigate();
  const { module } = useParams();

  // console.log(props.page, "page========>");
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
      Header: "Order No",
      accessor: "procurement_no",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.values.procurement_no}</div>
      ),
    },
    {
      Header: "Category",
      accessor: "category",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.values.category.name} </div>
      ),
    },
    {
      Header: "Sub Category",
      accessor: "subcategory",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.values.subcategory.name} </div>
      ),
    },
    {
      Header: "Brand",
      accessor: "brand",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.values.brand.name || "N/A"}</div>
      ),
    },

    {
      Header: "status",
      accessor: "status",
      Cell: ({ cell }) => (
        <div className="pr-2 w-[12rem]">
          {cell.row.values.status.status == -1 && (
            <p className="text-red-800 text-center bg-red-100 border-red-600 border-[1px] px-1 py-1  rounded-md">
              Back to SR
            </p>
          )}
          {cell.row.values.status.status == -2 && (
            <p className="text-red-800 text-center bg-red-100 border-red-600 border-[1px] px-1 py-1  rounded-md">
              Rejected
            </p>
          )}
          {cell.row.values.status.status == 0 && (
            <p className="text-green-800 text-center bg-green-100 border-green-600 border-[1px] px-1 py-1  rounded-md">
              Pending
            </p>
          )}
          {cell.row.values.status.status == 1 && (
            <p className="text-green-800 text-center bg-green-100 border-green-600 border-[1px] px-1 py-1  rounded-md">
              DA's Inbox
            </p>
          )}
          {cell.row.values.status.status == 2 && (
            <p className="text-green-800 text-center bg-green-100 border-green-600 border-[1px] px-1 py-1  rounded-md">
              Release for Tender
            </p>
          )}
          {cell.row.values.status.status == 3 && (
            <p className="text-green-800 text-center bg-green-100 border-green-600 border-[1px] px-1 py-1  rounded-md">
              Supplier assigned
            </p>
          )}
          {cell.row.values.status.status == 4 && (
            <p className="text-green-800 text-center bg-green-100 border-green-600 border-[1px] px-1 py-1  rounded-md">
              Incomplete stocks received
            </p>
          )}
          {cell.row.values.status.status == 5 && (
            <p className="text-green-800 text-center bg-green-100 border-green-600 border-[1px] px-1 py-1  rounded-md">
              Stocks received
            </p>
          )}
          {cell.row.values.status.status == 69 && (
            <p className="text-green-800 text-center bg-green-100 border-green-600 border-[1px] px-1 py-1  rounded-md">
              Revised
            </p>
          )}
          {cell.row.values.status.status == 71 && (
            <p className="text-green-800 text-center bg-green-100 border-green-600 border-[1px] px-1 py-1  rounded-md">
              BOQ already created
            </p>
          )}
          {cell.row.values.status.status == 70 && (
            <p className="text-green-800 text-center bg-green-100 border-green-600 border-[1px] px-1 py-1  rounded-md">
              Ready for BOQ
            </p>
          )}
          {cell.row.values.status.status == -70 && (
            <p className="text-green-800 text-center bg-green-100 border-green-600 border-[1px] px-1 py-1  rounded-md">
              BOQ returned from DA
            </p>
          )}
          {cell.row.values.status.status == 72 && (
            <p className="text-green-800 text-center bg-green-100 border-green-600 border-[1px] px-1 py-1  rounded-md">
              Ready for tendering
            </p>
          )}
          {cell.row.values.status.status == -72 && (
            <p className="text-green-800 text-center bg-green-100 border-green-600 border-[1px] px-1 py-1  rounded-md">
              Tender back from DA
            </p>
          )}
          {cell.row.values.status.status == 73 && (
            <p className="text-green-800 text-center bg-green-100 border-green-600 border-[1px] px-1 py-1  rounded-md">
              Tender is ready
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
            className="bg-[#4338CA] text-white px-5 py-1 rounded hover:bg-[#373081]"
            onClick={() =>
              navigate(
                `/sr-viewInventoryDetailsById/${cell.row.values.id}/${props.page}`
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
        <div className="min-h-screen"></div>
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
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 ">
          <div className="col-span-12">
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

export default InventoryProposalList;
