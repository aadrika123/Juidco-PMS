//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 24 june 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - ListTable
//    DESCRIPTION - ListTable Component
//////////////////////////////////////////////////////////////////////////////////////
import React, { useMemo, useState, useEffect } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { AiOutlineArrowDown } from "react-icons/ai";
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from "react-icons/ai";

function ListTable(props) {
  const [bounce, setbounce] = useState("hidden");
  const columns = useMemo(() => props.columns, []);
  const data = useMemo(
    () => props.dataList,
    [props.dataList, props?.totalCount]
  );
  const [pageNo, setpageNo] = useState(0);

  useEffect(() => {
    setpageNo(0);
  }, [props?.totalCount]);

  useEffect(() => {
    let rs = props?.totalCount / props?.perPage;
    let rm = props?.totalCount % props?.perPage;

    if (rm != 0) {
      setPageSize(parseInt(rs) + 1);
    } else {
      setPageSize(parseInt(rs));
    }
  }, [props?.totalCount, props.perPageData]);

  const {
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setPageSize,
    state,
    rows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageSize } = state;

  const goToPageFun = () => {
    if (parseInt(pageNo) > 0 && parseInt(pageNo) <= parseInt(props?.lastPage)) {
      props?.gotoPage(parseInt(pageNo));
    } else {
      return false;
    }
  };

  const nextPageFun = () => {
    if (props?.pagination?.next) {
      props.nextPage();
    }
  };

  const prevPageFun = () => {
    if (props?.pagination?.prev) {
      props.prevPage();
    }
  };

  // {
  //   console.log(props.perPageData, "perPageC==>");
  // }

  return (
    <>
      {props?.search == false ? (
        <div className='absolute -mt-[6.5vh] right-[2vw]'>
          <div className='flex-initial ml-2'>
            <button
              className='bg-slate-600 px-3 pr-3  drop-shadow-lg rounded-sm py-1 text-white hover:shadow-2xl hover:bg-slate-800 text-center relative'
              onMouseEnter={() => setbounce("")}
              onMouseLeave={() => setbounce("hidden")}
              onClick={props.exportDataF}
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
      ) : (
        <>
          {/* <div className='flex mb-2 pb-2 items-end max-sm:p-2'>
          <div className='flex-initial opacity-50'>
            <GlobalFilter filter={props.searchFilter} setFilter={props.setSearchFilter} />
          </div>
          <div className='flex-initial ml-2'>
            <button
              className='bg-slate-600 px-3 pr-3  drop-shadow-lg rounded-sm py-1 text-white hover:shadow-2xl hover:bg-slate-800 text-center relative'
              onMouseEnter={() => setbounce("")}
              onMouseLeave={() => setbounce("hidden")}
              onClick={props.exportDataF}
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
        </div> */}
        </>
      )}
      <div className='flex w-full'>
        <div className='flex-1'>
          <span className='text-gray-600'>Total Result :&nbsp;</span>
          <span className='font-semibold'>
            {props?.pagination?.totalResult}
          </span>{" "}
        </div>
      </div>

      <div className='px-2 py-2 overflow-x-auto bg-white delay-700'>
        {/* {props?.loader && <p className='text-3xl'>Loading...</p>} */}
        <div className='inline-block min-w-full overflow-hidden bg-white'>
          <table {...getTableBodyProps} className='min-w-full leading-normal'>
            <thead className='font-bold text-left text-sm bg-slate-200'>
              {headerGroups?.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className={
                        column?.className +
                        " px-2 py-3 border-b border-gray-200 text-gray-800  text-left text-xs uppercase "
                      }
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? "⬆️"
                            : "⬇️"
                          : ""}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} className='text-sm'>
              {rows.map((row, index) => {
                prepareRow(row);
                return (
                  <tr
                    key={index}
                    {...row.getRowProps()}
                    className='bg-white hover:bg-slate-100 border-b border-gray-200'
                  >
                    {row?.cells?.map((cell, index) => {
                      return (
                        <>
                          <td
                            {...cell.getCellProps()}
                            className='px-2 py-2 text-sm text-left'
                          >
                            {cell.render("Cell")}
                          </td>
                        </>
                      );
                    })}
                  </tr>
                );
              })}
              <tr>
                <td></td>
              </tr>
            </tbody>
          </table>
          <div className='mt-3 grid grid-cols-12 items-center'>
            <div className='sm:col-span-2 col-span-3 flex w-full ml-1 pr-10'>
              <span>
                <input
                  className='h-10 w-[90%] placeholder:text-gray-600 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1 '
                  type='number'
                  onChange={(e) => {
                    setpageNo(e.target.value);
                  }}
                  placeholder='Go to page...'
                />
              </span>
              <abbr
                className='cursor-pointer flex items-center w-[15%] no-underline'
                title='Go'
                onClick={() => goToPageFun()}
              >
                {" "}
                <span className='font-bold bg-blue-600 text-xl px-2 pb-1 rounded-full hover:text-white hover:bg-blue-400'>
                  &#x21E8;
                </span>{" "}
              </abbr>
            </div>
            <div className='col-span-2'>
              {" "}
              <select
                className='h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                value={props.perPageData}
                onChange={(e) => {
                  props.setPerPageData(Number(e.target.value));
                  props.perPageC(Number(e.target.value));
                }}
              >
                {[5, 10, 25, 50].map((pageSize) => (
                  <option
                    key={pageSize}
                    // selected={pageSize === 10 ? true : false}
                    value={pageSize}
                  >
                    show {pageSize}
                  </option>
                ))}
              </select>
            </div>
            <div className='col-span-3 sm:col-span-4 text-center sm:col-start-5 col-start-7'>
              {" "}
              <span>
                page {""}
                <strong>
                  {props?.pagination?.currentPage} of{" "}
                  {props?.pagination?.totalPage}
                </strong>
                {""}
              </span>
            </div>

            <div className='col-span-3 sm:col-span-4 text-right'>
              <abbr title='First Page'>
                <button
                  className='cursor-pointer hover:bg-sky-300 p-2 hover:text-white'
                  onClick={() => props?.goFirst()}
                  disabled={props?.currentPage == 1 && true}
                >
                  <AiOutlineDoubleLeft />{" "}
                </button>
              </abbr>
              <abbr title='Previous Page'>
                <button
                  className={
                    (!props?.pagination?.prev ? "opacity-50" : "opacity-100") +
                    " text-xl hover:bg-sky-300 hover:text-white cursor-pointer"
                  }
                  onClick={() => prevPageFun()}
                  disabled={props?.pagination?.prev == 1 && true}
                >
                  ⬅️
                </button>
              </abbr>
              <abbr title='Next Page'>
                <button
                  className={
                    (!props?.pagination?.next ? "opacity-50" : "opacity-100") +
                    " text-xl hover:bg-sky-300 hover:text-white cursor-pointer"
                  }
                  onClick={() => nextPageFun()}
                  disabled={props?.pagination?.next == props?.lastPage && true}
                >
                  ➡️
                </button>
              </abbr>
              <abbr title='Last Page'>
                <button
                  className='cursor-pointer hover:bg-sky-300 p-2 hover:text-white'
                  onClick={() => props?.goLast()}
                  disabled={props?.currentPage == props?.lastPage && true}
                >
                  {" "}
                  <AiOutlineDoubleRight />
                </button>
              </abbr>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListTable;
/**
 * Exported to :
 * 1. MailboxContent Component
 * 2. PropertySafApplicationList Component
 *
 */
