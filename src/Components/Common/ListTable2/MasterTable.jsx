import { Switch } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { useMemo, useState, useEffect } from "react";

export default function MasterTable({
  tableRowHandler,
  handleOpen,
  tableViewLabel,
  columns,
  fetchedData,
  totalCount,
  perPage,
}) {
  const columnData = useMemo(() => columns, []);
  const data = useMemo(() => fetchedData, [fetchedData, totalCount]);
  const [pageNo, setpageNo] = useState(0);

  //   useEffect(() => {
  //     setpageNo(0);
  //   }, [totalCount]);

  //   useEffect(() => {
  //     let rs = totalCount / perPage;
  //     let rm = totalCount % perPage;

  //     if (rm != 0) {
  //       setPageSize(parseInt(rs) + 1);
  //     } else {
  //       setPageSize(parseInt(rs));
  //     }
  //   }, [props?.totalCount, props.perPageData]);

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

  //   const nextPageFun = () => {
  //     if (props?.pagination?.next) {
  //       props.nextPage();
  //     }
  //   };

  //   const prevPageFun = () => {
  //     if (props?.pagination?.prev) {
  //       props.prevPage();
  //     }
  //   };

  return (
    <>
      {/* //search items */}
      <div className='flex justify-end mb-10'>
        <label htmlFor='table-search' className='sr-only'>
          Search
        </label>
        <div className='relative'>
          <div className='absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none'>
            <svg
              className='w-5 h-5 text-gray-500 '
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                clipRule='evenodd'
              ></path>
            </svg>
          </div>
          <input
            type='text'
            id='table-search'
            className='block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
            placeholder='Search...'
          />
        </div>
      </div>

      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <div className='px-2 py-2 overflow-x-auto bg-white delay-700'>
          <div className='inline-block min-w-full overflow-hidden bg-white'>
            <table {...getTableBodyProps} className='min-w-full leading-normal'>
              <thead className='font-bold text-left text-sm bg-slate-200'>
                {headerGroups?.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers?.map((column) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
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
                {rows?.map((row, index) => {
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
                              key={index}
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
          </div>
        </div>
      </div>
    </>
  );
}
