//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 24 june 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - ListTableParent
//    DESCRIPTION - ListTableParent Component
//////////////////////////////////////////////////////////////////////////////////////
import React, { useEffect, useState, useRef } from "react";
import { usePDF } from "react-to-pdf"; // import { useQuery } from "react-query";
import ListTable from "./ListTable";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ApiHeader from "@/Components/api/ApiHeader";
import { CSVDownload, CSVLink } from "react-csv";
import ShimmerEffectInline from "@/Components/Common/Loaders/ShimmerEffectInline";
import GlobalFilter from "./GlobalFilter";
import { FiFilter } from "react-icons/fi";
import SideSection from "../SearchPanel/SidebarTailwind";
import ProjectApiList from "@/Components/api/ProjectApiList";
import { FaArrowRightLong } from "react-icons/fa6";
import generatePDF from "react-to-pdf";
import ExportTableData from "../ExportTable/ExportTableData";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { flattenAndFilterData } from "../ObjectFlattener";
import ExportToExcel from "@/Components/Common/ExportTable/ExcelDowload/ExportToExcel";
import { useReactToPrint } from "react-to-print";

const ListTableParent = (props) => {
  // 👉 State constants 👈
  const [perPageCount, setperPageCount] = useState(10);
  const [pageCount, setpageCount] = useState(1);
  const [currentPage, setcurrentPage] = useState(1);
  const [lastPage, setlastPage] = useState(0);
  const [totalCount, settotalCount] = useState(0);
  const [exportData, setexportData] = useState();
  const [csvStatus, setcsvStatus] = useState(false);
  const [errorState, seterrorState] = useState(false);
  const [dataList, setdataList] = useState([]);
  const [loader, setloader] = useState(false);
  const [perPageData, setPerPageData] = useState(10);
  const [pagination, setPagination] = useState({});
  const [searchFilter, setSearchFilter] = useState("");
  const [bounce, setbounce] = useState("hidden");
  const [filter, setFilter] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedTenderTypes, setSelectedTenderTypes] = useState([]);

  const { api_exportcsv } = ProjectApiList();

  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  const searchPanelItems = [
    { name: "project_proposal_no", caption: "Project Proposal Number" },
  ];

  const navigate = useNavigate();

  //animation for open and close filter bar
  const open1 = `animate__animated animate__slideInLeft animate__faster `;
  const close1 = `w-0 sm:w-3 animate__animated animate__fadeOutLeft animate__faster transition-all delay-150`;

  // console.log(currentPage);

  const statusMerger = (status) => {
    return status.map(item => `status=${item}`).join('&');
  }

  // 👉 Function 1 👈
  const searchOldFun = () => {
    setloader(true);
    seterrorState(false);

    if (
      props?.requestBody?.length &&
      Object.keys(props?.requestBody).length !== 0
    ) {
      typeof props.loader == "function" && props.loader(true);
    }


  // console.log(selectedTenderTypes,"selectedTenderTypes")

  
    const returnCategoryFilter = (fieldName, categoryFilter) => {
      if (categoryFilter?.length === 0) {
        return;
      }
      const filtered = categoryFilter.map((item) => [`${fieldName}=${item}`]);
      return filtered.join("&");
    };

    AxiosInterceptors.get(
      `${props?.api}?
      take=${perPageData}&page=${currentPage}
      ${selectedTenderTypes ? `&tendertype=${selectedTenderTypes}` : ""}
      ${searchFilter ? `&search=${searchFilter}` : ""}
      ${props?.status_level ? `&status_level=${props?.status_level}` : ""}
      ${props?.from ? `&from=${props?.from}` : ""}
      ${props?.rejected ? `&${statusMerger(props?.rejected)}` : ""}
      ${props?.to ? `&to=${props?.to}` : ""}
      ${props?.subcategory ? `&scategory=${props?.subcategory}` : ""}
      ${props?.status ? `&status=${props?.status}` : ""}
      ${props?.category ? `&category=${props?.category}` : ""}
      ${filter?.category ? `&${returnCategoryFilter("category", filter?.category || [])}` : ""}
      ${filter?.subcategory ? `&${returnCategoryFilter("scategory", filter?.subcategory || [])}` : ""}
      ${filter?.brand ? `&${returnCategoryFilter("brand", filter?.brand || [])}` : ""}
      ${props?.warrantyStatus ? `&status=${props?.warrantyStatus}` : ""}
      ${props?.qparams ? `&${props?.qparams}` : ""}
      ${props?.serviceFilter ? `&service=${props?.serviceFilter}` : ''}
      ${props?.searchValue ? `&${props?.searchValue}` : ""}
      ${props?.supplierValue ? `&supplier=${props?.supplierValue}` : ""}
      `
        .split(" ")
        .join(""),
      // { ...props?.requestBody},
      ApiHeader()
    )
      .then((res) => {
        if (res?.data?.status == true) {
          props?.getData && props?.allData(res?.data?.data);
          // props?.setRefNo(res?.data?.data[0].reference_no)


          setdataList(res?.data?.data);
          setPagination(res?.data?.pagination);
          settotalCount(res?.data?.pagination?.totalPage);
          setcurrentPage(res?.data?.pagination?.currentPage);
          setlastPage(res?.data?.pagination?.currentTake);
          seterrorState(false);

          // const flattenedData = res?.data?.data.map((item) => props?.flattenObject(item));
          // props?.setNewExportData(flattenedData);
          // props?.setExportData(res?.data?.data);

        } else {
          seterrorState(true);
        }
      })
      .catch((err) => toast.error("Error in fetching Details"))
      .finally(() => {
        setloader(false);
        if (
          props?.requestBody?.length &&
          Object.keys(props?.requestBody).length !== 0
        ) {
          typeof props.loader == "function" && props.loader(false);
        }
        seterrorState(false);
      });
  };

  // 👉 Function 2 👈
  const nextPageFun = () => {
    if (pagination?.next) {
      setcurrentPage(pagination?.next?.page);
      setPerPageData(pagination?.next?.take);
    }
  };

  // 👉 Function 3 👈
  const prevPageFun = () => {
    // setpageCount(currentPage - 1);
    if (pagination?.prev) {
      setcurrentPage(pagination?.prev?.page);
      setPerPageData(pagination?.prev?.take);
    }
  };

  // 👉 Function 4 👈
  const perPageFun = (val) => {
    let checkPage = parseInt(totalCount / val);
    let checkPageRemainder = parseInt(totalCount % val);

    // console.log("total count => ", totalCount,
    // "\n Per page => ", val,
    // "\n checkPage => ", checkPage,
    // "\n check page remainder => ", checkPageRemainder)

    if (checkPageRemainder == 0) {
      checkPage < currentPage && setpageCount(checkPage);
      setperPageCount(val);
      return;
    }

    if (checkPageRemainder != 0) {
      checkPage + 1 < currentPage && setpageCount(checkPage + 1);
      setperPageCount(val);
      return;
    }

    // setperPageCount(val)
  };

  // 👉 Function 5 👈
  const firstPageFun = () => {
    setpageCount(1);
  };

  // 👉 Function 6 👈
  const lastPageFun = () => {
    setpageCount(lastPage);
  };

  // 👉 Function 7 👈
  const gotoPageFun = (val) => {
    setpageCount(val);
  };

  // 👉 Function 8 👈
  const makeExportFun = (dataList) => {
    let data = dataList?.map((elem, index) => {
      // Map over the columns for each element in dataList
      const rowData = props?.columns?.map((col, columnIndex) => {
        var value = elem[col?.accessor];

        if (col?.option && col?.option?.length > 0) {
          const matchingOption = col?.option?.find((option) =>
            option.hasOwnProperty(elem[col?.accessor])
          );

          if (matchingOption) {
            value = matchingOption[elem[col?.accessor]];
          } else {
            value = elem[col?.accessor];
          }
        }

        return (
          col?.Header.toLowerCase() != "action" && {
            [col?.Header]: col?.accessor ? value : index + 1,
          }
        );
      });

      // Combine rowData for each element into a single object
      return Object.assign({}, ...rowData);
    });

    return data;
  };

  // 👉 Function 9 👈
  const exportDataFun = () => {
    const date = new Date();
    setloader(true);
    setcsvStatus(false);
    AxiosInterceptors.post(
      api_exportcsv,
      {
        table: props?.table,
      },
      ApiHeader()
    )
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const a = document.createElement("a");
        a.href = url;
        a.download = `${props?.table
          }-${date.getDate()}${date.getMonth()}${date.getFullYear()}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);

        setloader(false);
      })
      .catch((err) => {
        setloader(false);
      });
  };

  // 👉 Function 10 👈
  const downloadFun = () => {
    setcsvStatus(true);
  };

  // 👉 Calling Function 1 on Data change 👈
  useEffect(() => {
    setloader(true);
    setpageCount(1);
    setloader(false);
  }, [currentPage, perPageData]);

  useEffect(() => {
    //adding debouncing in search query
    setloader(true);
    const getData = setTimeout(() => {
      searchOldFun();
    }, 500);
    return () => clearTimeout(getData);
  }, [pageCount, perPageCount, searchFilter, props?.pageTrigger]);

  const useFilter = () => {
    searchOldFun();
  };

  useEffect(() => {
    searchOldFun()
  }, [props?.refetch])

  const exportBtnStyle = `bg-green-700 text-white px-2 rounded-md flex items-center gap-1 hover:bg-green-900`;

   //Print
   const componentRef = useRef();
   const handlePrint = useReactToPrint({
     content: () => componentRef.current,
   });

  return (
    <>
      {/* 👉 When error occured 👈 */}
      {errorState && (
        <div
          className='bg-red-100 border border-red-400 text-red-700 pl-4 pr-16 py-3 rounded relative text-center'
          role='alert'
        >
          <strong className='font-bold'>Sorry! </strong>
          <span className='block sm:inline'>
            Some error occured while fetching list. Please try again later.
          </span>
          <span className='absolute top-0 bottom-0 right-0 px-4 py-3'></span>
        </div>
      )}

      {/* 👉 Download CSV 👈 */}
      {csvStatus && <CSVDownload data={exportData} />}

      <div className='space-y-8'>
        <div className='w-full flex justify-between'>

          {/* Export */}
          {/* <div className='w-full flex justify-between'>
            <div
              className='flex justify-between gap-4 py-2'
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <button className='text-red bg-green-700 hover:before:bg-redborder-red-500 relative overflow-hidden border px-2 text-white shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-green-900 before:transition-all before:duration-500 hover:text-white hover:before:left-0 hover:before:w-full rounded-md'>
                <span className='relative z-10 flex'>
                  Export{" "}
                  <FaArrowRightLong
                    color='white'
                    size={15}
                    className='mt-1 ml-3'
                  />
                </span>
              </button>

              <div
                className={`flex gap-2 transition-opacity duration-300 ${isHovered ? "opacity-100 visible" : "opacity-0 invisible"
                  }`}
              >
                <button
                  className={`${exportBtnStyle} font-semibold text-xs`}
                  // onClick={() => toPDF()}
                  onClick={() =>
                    navigate("/print-preview", {
                      state: {
                        data: [...dataList],
                        columns: JSON.stringify(props.columns),
                      },
                    })
                  }
                // onClick={() => window.print()}
                >
                  PDF
                </button>

                <button
                  className={`${exportBtnStyle} font-semibold text-xs`}
                  onClick={exportDataFun}
                >
                  CSV
                </button>
                <button
                  className={`${exportBtnStyle} font-semibold text-xs`}
                  onClick={exportDataFun}
                >
                  XLV
                </button>
              </div>
            </div>
          </div> */}

          <div className="space-x-2 flex">
            <div className="">
              <button
                onClick={handlePrint}
                className="text-white px-5 py-1.5 rounded hover:bg-[#14452a] bg-[#227447] text-sm"
              >
                Pdf
              </button>
            </div>
            <div className="mt-1">
              <CSVLink
                data={flattenAndFilterData(dataList, props?.columns)}
                className=" text-white px-5 py-2 rounded bg-[#227447] text-sm hover:bg-[#14452a]"
              >
                CSV
              </CSVLink>
            </div>

            <div className="">
              <ExportToExcel data={flattenAndFilterData(dataList, props?.columns)} />
            </div>
          </div>

          <div className='flex items-end max-sm:p-2 justify-end'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='border border-[#4338CA] text-[#4338CA] hover:bg-[#4338CA] hover:text-white px-4 py-2 rounded mr-2'
            >
              <FiFilter />
            </button>
            <div className='flex-initial opacity-50'>
              <GlobalFilter filter={searchFilter} setFilter={setSearchFilter} />
            </div>
            {/* <div className='flex-initial ml-2'>
              <button
                className='bg-green-600 px-3 pr-3  drop-shadow-lg rounded-sm py-1 text-white hover:shadow-2xl hover:bg-slate-600 text-center relative '
                onMouseEnter={() => setbounce("")}
                onMouseLeave={() => setbounce("hidden")}
                onClick={exportDataFun}
              >
                Export
                <div
                  className={
                    bounce +
                    " absolute h-full top-3 text-sm left-0 text-center animate-bounce"
                  }
                >
                  <AiOutlineArrowDown />
                </div>
              </button>
            </div> */}
            <div className='flex-1'>{props.children}</div>
          </div>
        </div>
        <div className='flex w-full space-x-2'>
          {/* 👉 Filter sidebar Component 👈 */}
          {isOpen && (
            <div className={`${isOpen ? open1 : close1} mt-2`}>
              <SideSection
                setIsOpen={setIsOpen}
                filter={filter}
                setFilter={setFilter}
                useFilter={useFilter}
                selectedTenderTypes={selectedTenderTypes}
                setSelectedTenderTypes={setSelectedTenderTypes}
              />
            </div>
          )}
          {/* table */}
          <div className='flex w-full overflow-auto'>
            {/* 👉 Loader 👈 */}
            {loader && <ShimmerEffectInline />}

            {!loader && dataList?.length > 0 ? (
              <div className='mb-10 ml-2'  >
                {/* 👉 Listtable 👈 */}

                <ListTable
                  search={props?.search}
                  currentPage={currentPage}
                  lastPage={lastPage}
                  goFirst={firstPageFun}
                  goLast={lastPageFun}
                  count1={totalCount}
                  columns={props?.columns}
                  dataList={dataList}
                  exportStatus={props?.exportStatus}
                  perPage={perPageCount}
                  perPageC={perPageFun}
                  totalCount={totalCount}
                  nextPage={nextPageFun}
                  prevPage={prevPageFun}
                  exportDataF={exportDataFun}
                  exportData={exportData}
                  gotoPage={(val) => gotoPageFun(val)}
                  perPageData={perPageData}
                  setPerPageData={setPerPageData}
                  searchFilter={searchFilter}
                  showDiv={props.showDiv}
                  setSearchFilter={setSearchFilter}
                  pagination={pagination}
                  loader={loader}
                  componentRef={componentRef}
                />
              </div>
            ) : (
              // 👉 When no data available 👈
              <>
                {!loader && (
                  <div
                    className='bg-red-100 border w-full flex justify-center ml-2 items-center border-red-400 text-red-700 py-3 rounded relative text-center'
                    role='alert'
                  >
                    <span className='block sm:inline'>No data available.</span>
                    <span className='absolute top-0 bottom-0 right-0 px-4 py-3'></span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default ListTableParent;
