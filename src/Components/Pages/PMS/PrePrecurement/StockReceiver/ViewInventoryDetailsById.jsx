import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { nullToNA } from "@/Components/Common/PowerUps/PowerupFunctions";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ProjectApiList from "@/Components/api/ProjectApiList";
import ApiHeader from "@/Components/api/ApiHeader";
import toast from 'react-hot-toast';
import { MdTag } from "react-icons/md";
import { indianAmount } from "@/Components/Common/PowerUps/PowerupFunctions";
import { contextVar } from '@/Components/context/contextVar'
import { CloudCog } from "lucide-react";
// import ListTable from "src/Components/Common/ListTable/ListTable";
// import PaymentHistory from "src/Components/Common/PaymentHistory/PaymentHistory";

const ViewInventoryDetailsById = (props) => {
  const navigate = useNavigate();
  const { id, page} = useParams();
  console.log("param", id);
  console.log("page========>", page);

  const [erroState, seterroState] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [applicationFullData, setapplicationFullData] = useState();
  const [tableData, setTableData] = useState([]);

  const {
    api_fetchProcurementDetailById,
    api_fetchOutboxProcurementDetailById,
    api_postForwardToDA,
  } = ProjectApiList();

     // Accessing context for notifications
     const { notify } = useContext(contextVar);

  let buttonStyle = ' mr-3 font-bold pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-indigo-500 text-base leading-tight  rounded  hover:bg-indigo-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl'

  useEffect(() => {
    getApplicationDetail();
    
  }, []);

  ///////////{*** APPLICATION FULL DETAIL ***}/////////
  const getApplicationDetail = () => {
    let url;
    seterroState(false);
    setisLoading(true);

    if(page == 'inbox'){
      url = api_fetchProcurementDetailById
    }
    if(page == 'outbox'){
      url = api_fetchOutboxProcurementDetailById
    }

    AxiosInterceptors.get(`${url}/${id}`,{ },ApiHeader())
      .then(function (response) {
        console.log("view water tanker full details ...", response?.data?.data);
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
 
  const forwardToDA = () => {
    // seterroState(false);
    setisLoading(true);

    AxiosInterceptors.post(`${api_postForwardToDA}`, {"preProcurement":[id]} , ApiHeader())
      .then(function (response) {
        console.log("Forwarded to DA", response?.data);
        // setresponseScreen(response?.data);
        console.log(response?.data?.st,"upper Status")
        if (response?.data?.status == true) {
          setisLoading(false);
          console.log(response?.data?.message,"-------------->>")
          toast.success(response?.data?.message,"success");
          setTimeout(() => {
            navigate("/sr-inventory-proposal");
          }, 2000);
          console.log(response?.data?.message,"Forwadede to DA--->>")

        } else {
          setisLoading(false);
          // setdeclarationStatus(false);
          const errorMsg = Object.keys(response?.data?.data);
          setErrRes(errorMsg);
          console.log(errorMsg, "====>>");
          toast(response?.data?.message, "error");
        }
      })
      .catch(function (error) {
        console.log("errorrr.... ", error);
        // setdeclarationStatus(false);
      });

  };

 

  console.log(applicationFullData?.status.status)

  return (
    <div>
      <div className=''>
        {/* {applicationFullData?.tran_dtls.length != 0 && (
          <div className='w-full flex justify-end mt-8'>
            <button
              className='text-white font-bold sm:px-6 px-1 py-2 border border-indigo-500 bg-indigo-500 text-xs sm:text-sm leading-tight uppercase rounded  hover:bg-white hover:text-indigo-500 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl'
              onClick={() => navigate(`/paymentHistory/${id}/${"waterTanker"}`)}
            >
              Payment History
            </button>
          </div>
        )} */}
        {/* Basic Details */}
        <div className=''>
          <div className='flex justify-between mt-2 bg-white rounded-lg shadow-xl p-4 '>
            <h2 className='font-semibold text-xl flex justify-start'>
            <MdTag className='inline pt-1 text-[1.5rem] text-sky-700' /> View Procurement Request{" "}
            </h2>

            {/* <button className={buttonStyle}>Edit</button> */}
          </div>
          {/* <h1 className='px-1 font-semibold font-serif  text-gray-500'>
            <MdTag className='inline' /> Basic Details
          </h1> */}
          <div className='py-6 mt-2 bg-white rounded-lg shadow-xl p-4 space-y-5'>
          
            <div className='flex md:flex-row flex-col gap-y-2 md:space-x-5 pl-4 mt-[1.5rem]'>

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold text-sm'>
                  {nullToNA(applicationFullData?.category.name)}
                </div>
                <div className='md:w-auto w-[50%] text-gray-500 text-xs'>
                Item Category
                </div>
              </div>

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold text-sm'>
                  {nullToNA(applicationFullData?.subcategory?.name)}
                </div>
                <div className='md:w-auto w-[50%] text-gray-500 text-xs'>
                Item Sub Category
                </div>
              </div>

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold text-sm'>
                  {nullToNA(applicationFullData?.brand?.name)}
                </div>
                <div className='md:w-auto w-[50%] text-gray-500 text-xs'>
                Brand 
                </div>
              </div>

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-semibold text-sm'>
                  {nullToNA(applicationFullData?.processor?.name)}
                </div>
                <div className='md:w-auto w-[50%] text-gray-500 text-xs'>
                Processor 
                </div>
              </div>

            </div>

            <div className='flex md:flex-row flex-col gap-y-2 md:space-x-5 pl-4  '>

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold text-sm'>
                  {nullToNA(applicationFullData?.ram?.capacity)}
                </div>
                <div className='md:w-auto w-[50%] text-gray-500 text-xs'>
                RAM
                </div>
              </div>

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold text-sm'>
                  {nullToNA(applicationFullData?.rom?.capacity)}
                </div>
                <div className='md:w-auto w-[50%] text-gray-500 text-xs'>
                ROM
                </div>
              </div>

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold text-sm'>
                  {nullToNA(applicationFullData?.graphics?.name)}
                </div>
                <div className='md:w-auto w-[50%] text-gray-500 text-xs'>
                Graphics 
                </div>
              </div>

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-semibold text-sm'>
                  {nullToNA(applicationFullData?.os?.name)}
                </div>
                <div className='md:w-auto w-[50%] text-gray-500 text-xs'>
                Operating System 
                </div>
              </div>

            </div>

            <div className='flex md:flex-row flex-col gap-y-2 md:space-x-5 pl-4  '>

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold text-sm'>
                  {nullToNA(applicationFullData?.id)}
                </div>
                <div className='md:w-auto w-[50%] text-gray-500 text-xs'>
                Item ID
                </div>
              </div>

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-semibold text-sm'>
                  {nullToNA(applicationFullData?.rate)}
                </div>
                <div className='md:w-auto w-[50%] text-gray-500 text-xs'>
                Rate
                </div>
              </div>

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold text-sm'>
                  {nullToNA(applicationFullData?.quantity)}
                </div>
                <div className='md:w-auto w-[50%] text-gray-500 text-xs'>
                Quantity 
                </div>
              </div>

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold text-sm'>
                  {nullToNA(applicationFullData?.rate)}
                </div>
                <div className='md:w-auto w-[50%] text-gray-500 text-xs'>
                Total Rate  
                </div>
              </div>

            </div>

            <div className='flex md:flex-row flex-col gap-y-2 md:space-x-5 pl-4  '>

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold text-sm'>
                  {/* {nullToNA(applicationFullData?.quantity)} */}
                </div>
                <div className='md:w-auto w-[50%] text-gray-500 text-xs'>
                {/* Quantity  */}
                </div>
              </div>

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold text-sm'>
                  {/* {nullToNA(applicationFullData?.applicant_name)} */}
                </div>
                <div className='md:w-auto w-[50%] text-gray-500 text-xs'>
                {/* Total Rate   */}
                </div>
              </div>

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold text-sm'>
                  {/* {nullToNA(applicationFullData?.mobile)} */}
                </div>
                <div className='md:w-auto w-[50%] text-gray-500 text-xs'>
                {/* Brand  */}
                </div>
              </div>

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-semibold text-sm'>
                  {/* {nullToNA(applicationFullData?.email)} */}
                </div>
                <div className='md:w-auto w-[50%] text-gray-500 text-xs'>
                {/* Processor  */}
                </div>
              </div>

            </div>

          

          <div className="p-5">
            <h1 className="font-bold text-sm">Other Description</h1>
            <p className="text-xs pt-2">Sed vitae urna non justo eleifend fermentum. Vivamus sit amet magna nec lacus feugiat vestibulum. Nullam vel efficitur nisl. Integer auctor sapien at nulla consequat, in luctus quam ultricies. Duis dapibus enim sed leo malesuada, in</p>
          </div>

          {!applicationFullData?.remark?.length == 0 &&
          <div className="p-5">
            <h1 className="font-bold text-base text-blue-900">Remark : 
            <span className="text-sm pt-2 font-light text-green-500"> {nullToNA(applicationFullData?.remark)}</span></h1>
          </div>
          }
          
          <div className="h-[30px]"></div>

          <div className="space-x-5 flex justify-end mt-[6rem]">
                  
                  <button
                    className={buttonStyle}
                    onClick={() =>
                      navigate(-1)
                    }
                  >
                    Back 
                </button>

                {/* {applicationFullData?.status?.status == -2 && "sdfv" } */}

                {page == 'inbox' && applicationFullData?.status?.status !== -2 &&
                  <button
                    className='font-bold p-2 border border-indigo-500 text-white text-xs sm:text-sm leading-tight rounded  hover:bg-white  hover:text-indigo-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl bg-indigo-700'
                    onClick={forwardToDA}
                  >
                    Forward to DA
                </button>
                }
          </div>

          </div>

          {/* Vehicle  details */}
          {/* <h1 className='px-1 font-semibold font-serif mt-10 text-gray-500'>
            <MdTag className='inline' /> Vehicle Booking & Details
          </h1> */}
          {/* <div className='py-6 mt-2 bg-white rounded-lg shadow-xl p-4 mb-4 pl-10 max-sm:flex max-sm:flex-col'>
            <div className='  '>

              <div className='flex mb-10 max-sm:mb-2 max-sm:flex-col max-sm:space-y-2'>

                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-semibold text-sm'>
                    {nullToNA(applicationFullData?.booking_date)}
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-500 text-xs'>
                    Booking Date
                  </div>
                </div>

                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-semibold text-sm'>
                    {nullToNA(applicationFullData?.delivery_date)}
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-500 text-xs'>
                    Delivery date
                  </div>
                </div>

                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-semibold text-sm'>
                    {nullToNA(applicationFullData?.delivery_time)}
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-500 text-xs'>
                    Delivery Time
                  </div>
                </div>

                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-bold text-sm'>
                    {nullToNA(applicationFullData?.driver_name)}
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-500 text-xs'>
                    Driver Name
                  </div>
                </div>

              </div>

              <div className='flex max-sm:flex-col max-sm:space-y-2'>
                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-semibold text-sm'>
                    {nullToNA(applicationFullData?.driver_mobile)}
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-500 text-xs'>
                    Driver Mobile No.
                  </div>
                </div>
                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-semibold text-sm'>
                    {nullToNA(applicationFullData?.vehicle_no)}
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-500 text-xs'>
                    Vehicle No.
                  </div>
                </div>
                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-bold text-sm'>
                    {nullToNA(applicationFullData?.agency_name)}
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-500 text-xs'>
                    Agency Name
                  </div>
                </div>
                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-bold text-sm'>
                    {nullToNA(applicationFullData?.capacity)}
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-500 text-xs'>
                    Capacity
                  </div>
                </div>
                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-bold text-sm'>
                    {nullToNA(applicationFullData?.hydration_center_name)}
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-500 text-xs'>
                    Hydration Center Name
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          {/* {applicationFullData?.tran_dtls.length != 0 && (
              <div className='w-full flex justify-end mt-8'>
                <button
                  className=' font-bold sm:px-6 px-1 py-2 border border-indigo-500 text-indigo-500 text-xs sm:text-sm leading-tight uppercase rounded  hover:bg-indigo-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl'
                  onClick={() =>
                    navigate(`/paymentHistory/${id}/${"waterTanker"}`)
                  }
                >
                  Payment History
                </button>
              </div>
            )} */}

          
              {/* Payment Details */}
            {/* <>
              <h1 className='px-1 font-semibold font-serif  text-gray-500'>
                <MdTag className='inline' /> Payment Details
              </h1>
              <div className='py-6 mt-2 bg-white rounded-lg shadow-xl p-4'>
                <div className='flex my-8 md:px-8'>
                  <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                    <div className='md:w-auto w-[50%] text-gray-500 text-md'>
                      Payment Amount Due
                    </div>
                    <div className='md:w-auto w-[50%] font-semibold text-lg'>
                      {nullToNA(applicationFullData?.payment_amount)}
                    </div>
                  </div>

                  <div>
                    {" "}
                    <button
                      type='submit'
                      className='w-full font-bold sm:px-6 px-1.5 py-2 bg-indigo-500 text-white text-xs sm:text-sm leading-tight uppercase rounded  hover:bg-indigo-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl border border-white'
                      onClick={() =>
                        navigate(`/tanker-payment/${id}/${"waterTanker"}`)
                      }
                    >
                      <span className='sm:mr-2 mr-1'>Pay </span>
                      {indianAmount(applicationFullData?.payment_amount)}
                    </button>
                  </div>
                </div>
              </div>
            </> */}
          
        </div>
      </div>
    </div>
  );
};

export default ViewInventoryDetailsById;
