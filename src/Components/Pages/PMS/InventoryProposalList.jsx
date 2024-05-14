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
import { useNavigate } from "react-router-dom";
import ListTableParent from "@/Components/Common/ListTable2/ListTableParent";
import { GoPlus } from "react-icons/go";
import { FaChartPie } from "react-icons/fa";




function InventoryProposalList(props) {
  const navigate = useNavigate();
  // ══════════════════════════════║🔰 Custom style 🔰║═══════════════════════════════════
  const { labelStyle, headingStyle, titleStyle, addButtonColor } = ThemeStyle();

  // ══════════════════════════════║🔰 Api list used in this file  🔰║═══════════════════════════════════
  // const {
    
  //   api_fetchProcurementList
  // } = ProjectApiList();

  // ══════════════════════════════║🔰Usestate🔰║═══════════════════════════════════

  const [changeData, setchangeData] = useState(0);
  const [requestBody, setRequestBody] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [loader, setloader] = useState(false);
  const [activeButton, setActiveButton] = useState('inbox');

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
      Header: "Brand",
      accessor: "brand",
      Cell: ({ cell }) => (
        <div className='pr-2'>{cell.row.values.brand.name}</div>
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
      Header: "Graphics",
      accessor: "graphics",
      Cell: ({ cell }) => (
        <div className='pr-2'>{cell.row.values.graphics.name}</div>
      ),
    },
    {
      Header: "OS",
      accessor: "os",
      Cell: ({ cell }) => (
        <div className='pr-2'>{cell.row.values.os.name}</div>
      ),
    },
    {
      Header: "Processor",
      accessor: "processor",
      Cell: ({ cell }) => (
        <div className='pr-2'>{cell.row.values.processor.name}</div>
      ),
    },
    {
      Header: "status",
      accessor: "status",
      Cell: ({ cell }) => (
        <div className='pr-2'>{cell.row.values.status.status}</div>
      ),
    },
    {
      Header: "Action",
      accessor: "id",
      Cell: ({ cell }) => (
        <>
          <button
            className='bg-indigo-500 text-white px-2 py-1'
            onClick={() =>
              navigate(`/ViewInventoryDetailsById/${cell.row.values.id}`)
            }
          >
            View
            {/* <RiDeleteBack2Line className='inline ml-2 text-red-400 font-semibold text-lg cursor-pointer hover:text-red-700 relative hover:scale-150 -mt-4' /> */}
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



  return (
    <>
      {loader && <BarLoader />}
      <div className='container mx-auto p-4'>
        <div className=''>
          <div className='flex justify-between'>
            {/* <form
              onChange={formik.handleChange}
              onSubmit={formik.handleSubmit}
              className='mb-4 bg-white shadow-lg rounded-md '
            >
              <h1 className='text-xl w-full font-bold px-8 pt-4 text-gray-700'>
                Search Collection
              </h1>

              <div className='flex flex-wrap flex-row justify-start w-full gap-x-6 gap-y-2 text-sm 3xl:text-base p-4 px-8'>
                <div className='flex flex-col w-full md:w-[20%]'>
                  <div className='col-span-6 font-semibold'>Key</div>
                  <div className='col-span-6'>
                    <input
                      type='text'
                      name='key'
                      value={formik.values.key}
                      id=''
                      className={commonInputStyle}
                      //   defaultValue={todayDate}
                    />
                  </div>
                </div>

                <div className='flex flex-col w-full md:w-[20%]'>
                  <div className='col-span-6 font-semibold'>From Date :</div>
                  <div className='col-span-6'>
                    <input
                      type='date'
                      name='fromDate'
                      value={formik.values.fromDate}
                      id=''
                      className={commonInputStyle}
                      // defaultValue={todayDate}
                    />
                  </div>
                  <div className='col-span-12 text-end'>
                    {formik.touched.fromDate && formik.errors.fromDate && (
                      <>
                        <span className='text-red-600 text-xs'>
                          {formik.errors.fromDate}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className='flex flex-col w-full md:w-[20%]'>
                  <div className='col-span-6 font-semibold'>Upto Date :</div>
                  <div className='col-span-6'>
                    <input
                      type='date'
                      name='uptoDate'
                      value={formik.values.uptoDate}
                      id=''
                      className={commonInputStyle}
                      // defaultValue={todayDate}
                    />
                  </div>
                  <div className='col-span-12 text-end'>
                    {formik.touched.uptoDate && formik.errors.uptoDate && (
                      <>
                        <span className='text-red-600 text-xs'>
                          {formik.errors.uptoDate}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                
                <div className='mt-4 w-full md:w-[20%] flex flex-row flex-wrap items-center gap-x-4 gap-y-2 md:mt-4'>
                  <div className=' '>
                    {loader ? (
                      <>
                        {
                          <div className='flex justify-center'>
                            <RotatingLines
                              strokeColor='grey'
                              strokeWidth='5'
                              animationDuration='0.75'
                              width='25'
                              visible={true}
                            />
                          </div>
                        }
                      </>
                    ) : (
                      <button
                        type='submit'
                        className=' flex items-center border border-green-600 bg-green-500 hover:bg-green-600 text-white shadow-md rounded-sm  text-sm px-5 py-1'
                      >
                        <span className=''>
                          <RiFilter2Line fontSize={""} />
                        </span>
                        <span>Search Record</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </form> */}
            
            {/* <div className=" flex space-x-3">
              
              <button 
                className={`flex pl-5 pr-5 pt-1 pb-1 text-black border border-[#4338ca] ${activeButton === 'inbox' ? 'bg-[#4338CA] text-white' : 'bg-white'}`}
                onClick={() => setActiveButton('inbox')}
              >
              <FaChartPie className="m-1 text-[1rem]" />
                Inbox
              </button>

              <button 
                className={`flex pl-5 pr-5 pt-1 pb-1 text-black border border-[#4338ca] ${activeButton === 'outbox' ? 'bg-[#4338CA] text-white' : 'bg-white'}`}
                onClick={() => setActiveButton('outbox')}
              >
              <FaChartPie className="m-1 text-[1rem]" />
                Outbox
              </button>

            </div> */}
            
            {/* <div>
              <button 
              className="bg-[#4338CA] pl-2 pr-4 pt-1 pb-1 text-white rounded hover:bg-white hover:text-[#4338ca] border hover:border-[#4338ca] flex "
              onClick={() =>
              navigate(`/add-pre-procurement`)
            }
              >
              
              <GoPlus className="m-1 text-[1rem]"/>
              Request Inventory
              </button>
            </div> */}
          </div>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 '>
          <div className='col-span-12'>
            <>
            
              <ListTableParent
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

export default InventoryProposalList;
