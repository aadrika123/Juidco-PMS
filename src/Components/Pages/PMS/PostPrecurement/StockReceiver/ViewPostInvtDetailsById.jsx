//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash alam
//    Version - 1.0
//    Date - 24/05/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - ViewPostInvtDetailsById
//    DESCRIPTION - ViewPostInvtDetailsById
//////////////////////////////////////////////////////////////////////////////////////

import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { nullToNA } from "@/Components/Common/PowerUps/PowerupFunctions";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ProjectApiList from "@/Components/api/ProjectApiList";
import ApiHeader from "@/Components/api/ApiHeader";
import toast from "react-hot-toast";
import { contextVar } from "@/Components/context/contextVar";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import TimeLine from "@/Components/Common/Timeline/TimeLine";
import LoaderApi from "@/Components/Common/Loaders/LoaderApi";
import { useReactToPrint } from "react-to-print";

const ViewPostInvtDetailsById = () => {
  const navigate = useNavigate();
  const { id, page } = useParams();

  const [erroState, seterroState] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [applicationFullData, setapplicationFullData] = useState();
  const [tableData, setTableData] = useState([]);

  const { api_fetchProcurementListInbox } = ProjectApiList();

  // Accessing context for notifications
  const { titleBarVisibility } = useContext(contextVar);

  let buttonStyle =
    "  pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-indigo-500 text-md leading-tight  rounded  hover:bg-indigo-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl";

  let buttonStyle2 =
    " mr-2 pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-white text-md sm:text-md leading-tight rounded  hover:bg-white  hover:text-indigo-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl bg-indigo-700";
  useEffect(() => {
    getApplicationDetail();
  }, []);

  ///////////{*** APPLICATION FULL DETAIL ***}/////////
  const getApplicationDetail = () => {
    let url;
    seterroState(false);
    setisLoading(true);

    if (page == "inbox") {
      url = api_fetchProcurementListInbox;
    }
    // if (page == "outbox") {
    //   url = api_fetchProcurementListOutbox;
    // }

    AxiosInterceptors.get(`${url}/${id}`, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          setapplicationFullData(response?.data?.data);
          setTableData(response?.data?.data?.tran_dtls);
          setisLoading(false);
        } else {
          toast.error("Error while getting details...");
          seterroState(true);
        }
      })
      .catch(function (error) {
        console.log("==2 details by id error...", error);
        toast.error("Error while getting details...");
        seterroState(true);
        setisLoading(false);
      });
  };

  //Print
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });


  return (
    <div>
      {isLoading && <LoaderApi />}

      <div className=''>
        <TitleBar
          titleBarVisibility={titleBarVisibility}
          titleText={"Inventory Proposal Details"}
        />
      </div>

      {/* //timeline  */}
      <div className={`${isLoading ? "blur-[2px]" : ""}`}>
        <TimeLine status={applicationFullData?.status?.status} />
      </div>

      {/* Basic Details */}
      <div className='mt-6' ref={componentRef}>
        <div className='py-6 mt-4 bg-white rounded-lg shadow-xl p-4 space-y-5 border border-blue-500'>
          <div className=''>
            <h2 className='font-semibold text-2xl pl-7 pb-2 pt-2 flex justify-start bg-[#4338CA] text-white rounded-md'>
              View Procurement Request
            </h2>
          </div>

          <div className='flex justify-between'>
            {!applicationFullData?.remark?.length == 0 && (
              <div className='pb-5 pl-8'>
                <h1 className='font-bold text-base text-green-600'>
                  Remark <span className='text-black'>:</span>
                  <span className='text-md pt-2 font-light text-green-600'>
                    {" "}
                    {nullToNA(applicationFullData?.remark)}
                  </span>
                </h1>
              </div>
            )}
            <div className='pl-8 pb-5 text-[1.2rem] text-[#4338CA]'>
              <h1 className='font-bold'>
                Procurement Request No <span className='text-black'>:</span>
                <span className='font-light'>
                  {" "}
                  {nullToNA(applicationFullData?.procurement_no)}
                </span>
              </h1>
            </div>
          </div>

          <div className='grid grid-cols-4 gap-4 ml-8'>
            <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
              <div className='md:w-auto w-[50%] font-bold '>Item Category</div>
              <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                {nullToNA(applicationFullData?.category.name)}
              </div>
            </div>

            <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
              <div className='md:w-auto w-[50%] font-bold '>
                Item Sub Category
              </div>
              <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                {nullToNA(applicationFullData?.subcategory?.name)}
              </div>
            </div>

            <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
              <div className='md:w-auto w-[50%] font-bold '>Brand</div>
              <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                {nullToNA(applicationFullData?.brand?.name)}
              </div>
            </div>

            <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
              <div className='md:w-auto w-[50%] font-semibold '>Rate</div>
              <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                {nullToNA(applicationFullData?.rate)}
              </div>
            </div>

            <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
              <div className='md:w-auto w-[50%] font-bold '>Quantity</div>
              <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                {nullToNA(applicationFullData?.quantity)}
              </div>
            </div>

            <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
              <div className='md:w-auto w-[50%] font-bold '>Total Rate</div>
              <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                {nullToNA(applicationFullData?.total_rate)}
              </div>
            </div>
          </div>

          <div className='p-5 pl-8'>
            <h1 className='font-bold '>Description</h1>
            <p className=' pt-2'>
              {nullToNA(applicationFullData?.description)}
            </p>
          </div>

          <div className='h-[30px]'></div>
        </div>

        {/* Additional Details */}

        <div className='py-6 mt-8 bg-white rounded-lg shadow-xl p-4 space-y-5 border border-blue-500 '>
          <div className=''>
            <h2 className='font-semibold text-2xl pl-7 pt-2 pb-2 flex justify-start bg-[#4338ca] text-white rounded-md'>
              Supplier Details
            </h2>
          </div>

          <div className='grid grid-cols-4 gap-4 ml-9'>
            <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
              <div className='md:w-auto w-[50%] font-bold '>Supplier Name</div>
              <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                {nullToNA(applicationFullData?.post_procurement?.supplier_name)}
              </div>
            </div>

            <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
              <div className='md:w-auto w-[50%] font-bold '>GST No</div>
              <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                {nullToNA(applicationFullData?.post_procurement?.gst_no)}
              </div>
            </div>

            <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
              <div className='md:w-auto w-[50%] font-bold '>Final Rate</div>
              <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                {nullToNA(applicationFullData?.post_procurement?.final_rate)}
              </div>
            </div>

            <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
              <div className='md:w-auto w-[50%] font-bold '>GST %</div>
              <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                {nullToNA(applicationFullData?.post_procurement?.gst)}
              </div>
            </div>

            <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
              <div className='md:w-auto w-[50%] font-bold '>Total Price</div>
              <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                {nullToNA(applicationFullData?.post_procurement?.total_price)}
              </div>
            </div>

            <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
              <div className='md:w-auto w-[50%] font-bold '>Total Quantity</div>
              <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                {nullToNA(
                  applicationFullData?.post_procurement?.total_quantity
                )}
              </div>
            </div>

            <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
              <div className='md:w-auto w-[50%] font-bold '>
                Total Received Items
              </div>
              <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                {applicationFullData?.total_receivings
                  ? applicationFullData?.total_receivings
                  : 0}
              </div>
            </div>

            <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
              <div className='md:w-auto w-[50%] font-bold '>Unit Price</div>
              <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                {nullToNA(applicationFullData?.post_procurement?.unit_price)}
              </div>
            </div>

            <div className='h-[40px]'></div>
          </div>
        </div>
      </div>
      <div className='space-x-5 flex justify-end mt-[3rem]'>
        <button onClick={handlePrint} className={buttonStyle}>
          Print
        </button>

        <button className={buttonStyle} onClick={() => navigate(-1)}>
          Back
        </button>

        <button className={buttonStyle2} onClick=''>
          Dashboard
        </button>
      </div>
    </div>
  );
};

export default ViewPostInvtDetailsById;
