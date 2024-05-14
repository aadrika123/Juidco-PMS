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

  console.log(currentPage);

  // 👉 Function 1 👈
  const searchOldFun = () => {
    seterrorState(false);

    setloader(true);

    if (
      props?.requestBody?.length &&
      Object.keys(props?.requestBody).length !== 0
    ) {
      typeof props.loader == "function" && props.loader(true);
    }

    AxiosInterceptors.get(
      `${props?.api}?take=${perPageData}&page=${currentPage}`
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
    setloader(true);
    setcsvStatus(false);

    AxiosInterceptors.post(
      props?.api,
      { ...props?.requestBody, perPage: totalCount },
      ApiHeader()
    )
      .then((res) => {
        if (res?.data?.status == true) {
          setexportData(makeExportFun(res?.data?.data?.data));
          downloadFun();
        } else {
        }

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
    setperPageCount(10);
    searchOldFun();
    // }
  }, [props?.changeData, currentPage, perPageData]);

  // 👉 Calling Function 1 when page no. or data per page change 👈
  useEffect(() => {
    setloader(true);
    searchOldFun();
  }, [pageCount, perPageCount]);

  return (
    <>
      {/* 👉 When error occured 👈 */}
      {errorState && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 pl-4 pr-16 py-3 rounded relative text-center"
          role="alert"
        >
          <strong className="font-bold">Sorry! </strong>
          <span className="block sm:inline">
            Some error occured while fetching list. Please try again later.
          </span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
        </div>
      )}

      {/* 👉 Download CSV 👈 */}
      {csvStatus && <CSVDownload data={exportData} />}

      {/* 👉 Loader 👈 */}
      {loader && <ShimmerEffectInline />}

      {/* 👉 Listtable Components 👈 */}
      {!loader && dataList?.length > 0 ? (
        <div className="mb-10">
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
          />
        </div>
      ) : (
        // 👉 When no data available 👈
        <>
          {!loader && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 pl-4 pr-16 py-3 rounded relative text-center"
              role="alert"
            >
              <span className="block sm:inline">Oops! No data available.</span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
            </div>
          )}
        </>
      )}
    </>
  );
};
export default ListTableParent;
