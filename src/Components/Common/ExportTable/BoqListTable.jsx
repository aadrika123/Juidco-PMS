import React, { useState } from "react";

const BoqListTable = (props) => {
  


  
// get the Procurement Id
const handleChange = (id) =>{

    if(!props?.proNos.includes(id)) {
        props?.setProNos(prev => ([...prev,id]))
    }else{
        let data = props?.proNos.filter((item)=> item != id )
       props?.setProNos(data)
    }
}
  
//   console.log(props.proNos);

  return (
    <>
   
      <div className="m-4 overflow-x-auto shadow-md rounded-lg h-[30rem]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-sm text-white bg-[#4338ca] sticky -top-0">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  {/* <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                  />
                  <label for="checkbox-all-search" className="sr-only">
                    checkbox
                  </label> */}
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                S No
              </th>
              <th scope="col" className="px-6 py-3">
                Procurement No
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Sub Category
              </th>
              <th scope="col" className="px-6 py-3">
                Brand
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {props?.dataList?.length &&
              props?.dataList.map((items, index) => (
                <tr className="bg-gray-100 border-b" key={index}>
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        onChange={()=>{handleChange(items.procurement_no)}}
                      />
                    </div>
                  </td>

                  <td className="px-6 py-4">{index +1}</td>
                  <td className="px-6 py-4">{items.procurement_no}</td>
                  <td className="px-6 py-4">{items.category.name}</td>
                  <td className="px-6 py-4">{items.subcategory.name}</td>
                  <td className="px-6 py-4">{items.brand.name}</td>
                  <td className="px-6 py-4">{items.description}</td>

                  <td className="px-6 py-4">
                    <button className="bg-[#4338ca] text-white pl-3 pr-3 pt-1 pb-1 rounded hover:bg-[#5d51de]">
                      View
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* <nav
          className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-gray-500  mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Showing <span className="font-semibold text-gray-900 ">1-10</span>{" "}
            of <span className="font-semibold text-gray-900 ">1000</span>
          </span>
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 "
              >
                Previous
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
              >
                4
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
              >
                5
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
              >
                Next
              </a>
            </li>
          </ul>
        </nav> */}
      </div>
    </>
  );
};

export default BoqListTable;
