//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 24 june 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - ListTableParent
//    DESCRIPTION - ListTableParent Component
//////////////////////////////////////////////////////////////////////////////////////
import React, { useEffect, useState } from "react";
// import { useQuery } from "react-query";
import ListTable from "./ListTable";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ApiHeader from "@/Components/api/ApiHeader";
import { CSVDownload } from "react-csv";
import ShimmerEffectInline from "@/Components/Common/Loaders/ShimmerEffectInline";
import GlobalFilter from "./GlobalFilter";
import { AiOutlineArrowDown } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";
import SearchPanel from "../SearchPanel/SearchPanel";
import SideSection from "../SearchPanel/SidebarTailwind";
import ProjectApiList from "@/Components/api/ProjectApiList";

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
  const [isFilterPanelOpen, setFilterPanelOpen] = useState(false);
  const [searchPanelItemValues, setSearchPanelItemValues] = useState({});
  const [filter, setFilter] = useState({});

  const { api_exportcsv } = ProjectApiList();

  const searchPanelItems = [
    { name: "project_proposal_no", caption: "Project Proposal Number" },
  ];

  const toggleFilterPanel = () => {
    setFilterPanelOpen((prevState) => !prevState);
  };

  // console.log(currentPage);

  // 👉 Function 1 👈
  const searchOldFun = () => {
    seterrorState(false);

    setloader(true);

    console.log(
      props?.requestBody,
      "==============props?.requestBody search old"
    );

    if (
      props?.requestBody?.length &&
      Object.keys(props?.requestBody).length !== 0
    ) {
      typeof props.loader == "function" && props.loader(true);
    }

    const returnCategoryFilter = (fieldName, caragotyFilter) => {
      if (caragotyFilter?.length === 0) {
        return;
      }
      const filtered = caragotyFilter.map((item) => [`${fieldName}=${item}`]);
      return filtered.join("&");
    };
    // console.log(returnCategoryFilter());

    AxiosInterceptors.get(
      `${props?.api}?
      take=${perPageData}&page=${currentPage}
      &search=${searchFilter}
      &${returnCategoryFilter("category", filter?.category || [])}
      &${returnCategoryFilter("scategory", filter?.subcategory || [])}
      &${returnCategoryFilter("brand", filter?.brand || [])}
      `
        .split(" ")
        .join(""),
      { ...props?.requestBody, perPage: perPageCount, page: pageCount },
      ApiHeader()
    )
      .then((res) => {
        if (res?.data?.status == true) {
          console.log("success getting list => ", res);
          console.log(
            "success current page => ",
            res?.data?.pagination?.currentPage
          );
          props?.getData && props?.allData(res?.data?.data);
          setdataList(res?.data?.data);
          setPagination(res?.data?.pagination);
          settotalCount(res?.data?.pagination?.totalPage);
          setcurrentPage(res?.data?.pagination?.currentPage);
          setlastPage(res?.data?.pagination?.currentTake);
          seterrorState(false);
        } else {
          console.log("false error while getting list => ", res);
          seterrorState(true);
        }
      })
      .catch(
        (err) => (
          console.log("error while getting list => ", err), seterrorState(true)
        )
      )
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
    console.log(props?.table);
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
        a.download = `${
          props?.table
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
    // if (props?.requestBody != null) {
    setpageCount(1);
    // setperPageCount(10);
    searchOldFun();
    // }
  }, [props?.changeData, currentPage, perPageData]);

  // 👉 Calling Function 1 when page no. or data per page change 👈
  useEffect(() => {
    setloader(true);
    searchOldFun();
    // console.log(searchFilter, "searfilter------------>");
  }, [pageCount, perPageCount, searchFilter]);

  //=---------------------- Search Panel----------------------------
  // useEffect(() => {
  //   console.log(projectProposalData);

  //   setTotalResults(projectProposalData?.count);

  //   //update the items for the table
  //   setProjectProposals(projectProposalData?.records);

  //   // populate the items to be displayed in the search panel
  //   const project_proposal_nos = projectProposalData?.project_proposal_no?.map((item) => item.project_proposal_no);
  //   if (project_proposal_nos) setSearchPanelItemValues({ ...searchPanelItemValues, project_proposal_no: project_proposal_nos });

  // }, [projectProposalData]);

  const onFilterChange = (filters) => {
    // console.log("Filters updated: ", filters);
    const q = qs.stringify(filters);
    setSearchQuery(q);
  };

  const onRemoveFilter = () => {
    console.log("Filters removed!");
    setSearchQuery("");
  };

  const [isOpen, setIsOpen] = useState(false);

  const useFilter = () => {
    searchOldFun();
  };

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

      <div className='flex flex-col'>
        <div className='flex mb-2 pb-2 items-end max-sm:p-2 justify-end w-full'>
          {/* <div hidden={!isFilterPanelOpen} className="w-[25%] h-[75vh] overflow-y-auto overflow-x-hidden hide-scrollbar">
          <SearchPanel onClose={toggleFilterPanel} items={searchPanelItems} values={searchPanelItemValues} onFilterChange={onFilterChange} onNoFilter={onRemoveFilter} />
        </div> */}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className='border border-[#4338CA] text-[#4338CA] hover:bg-[#4338CA] hover:text-white px-4 py-2 rounded mr-2'
          >
            <FiFilter />
          </button>
          <div className='flex-initial opacity-50'>
            <GlobalFilter filter={searchFilter} setFilter={setSearchFilter} />
          </div>
          <div className='flex-initial ml-2'>
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
          </div>
          <div className='flex-1'>{props.children}</div>
        </div>

        {/* 👉 Filter Component 👈 */}
        {isOpen && (
          <SideSection
            setIsOpen={setIsOpen}
            filter={filter}
            setFilter={setFilter}
            useFilter={useFilter}
          />
        )}

        <div className='flex'>
          {/* 👉 Loader 👈 */}
          {loader && <ShimmerEffectInline />}

          {!loader && dataList?.length > 0 ? (
            <div className='mb-10 ml-2'>
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
              />
            </div>
          ) : (
            // 👉 When no data available 👈
            <>
              {!loader && (
                <div
                  className='bg-red-100 border w-full flex justify-center ml-2 items-center border-red-400 text-red-700 pl-4 pr-16 py-3 rounded relative text-center'
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
    </>
  );
};
export default ListTableParent;
