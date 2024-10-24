//////////////////////////////////////////////////////////////////////////////////////
//    Author - Anil Tigga
//////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import BarLoader from "@/Components/Common/Loaders/BarLoader";
import ThemeStyle from "@/Components/Common/ThemeStyle";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import ListTableParent from "@/Components/Common/ListTable2/ListTableParent";
import ProjectApiList from "@/Components/api/ProjectApiList";

function DeadStock(props) {

  const [changeData, setchangeData] = useState(0);
  const [requestBody, setRequestBody] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [loader, setloader] = useState(false);

  const navigate = useNavigate();

  const { api_deadSTock } = ProjectApiList()

  const COLUMNS = [
    {
      Header: "#",
      Cell: ({ row }) => <div className="pr-2">{row.index + 1}</div>,
    },
    {
      Header: "Serial No",
      accessor: "serial_no",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.values.serial_no}</div>
      ),
    },
    {
      Header: "Category",
      accessor: "category",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.original.inventory?.category?.name} </div>
      ),
    },
    {
      Header: "Quantity",
      accessor: "quantity",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.values.quantity} </div>
      ),
    },
    {
      Header: "Action",
      accessor: "id",
      Cell: ({ cell }) => (
        <>
          <button
            className="bg-[#4338CA] text-white px-2 py-1 rounded hover:bg-[#373081]"
            onClick={() =>
              alert(cell.row.values.id)
            }
          >
            Retrieve
          </button>
        </>
      ),
    },
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

  return (
    <>
      {loader && <BarLoader />}
      <div className='container mx-auto p-4'>
        <div className='grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 '>
          <div className='col-span-12'>
            <>
              <ListTableParent
                // table={tableSelector(props?.page)}
                api={api_deadSTock}
                columns={COLUMNS}
                // requestBody={requestBody}
                // changeData={changeData}
                showDiv={true}
              />
            </>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeadStock;


