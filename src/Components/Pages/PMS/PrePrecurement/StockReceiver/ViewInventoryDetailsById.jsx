//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash alam
//    Version - 1.0
//    Date - 21/05/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - ViewInventoryDetailsById
//    DESCRIPTION - ViewInventoryDetailsById
//////////////////////////////////////////////////////////////////////////////////////

import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { nullToNA } from "@/Components/Common/PowerUps/PowerupFunctions";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ProjectApiList from "@/Components/api/ProjectApiList";
import ApiHeader from "@/Components/api/ApiHeader";
import toast from "react-hot-toast";
import { MdTag } from "react-icons/md";
import { contextVar } from "@/Components/context/contextVar";
import ForwardToDAConfirmationModal from "./FOrwardToDAConfirmationModal";
import TitleBar from "@/Components/Pages/Others/TitleBar";

const ViewInventoryDetailsById = (props) => {
  const navigate = useNavigate();
  const { id, page } = useParams();

  const [erroState, seterroState] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [applicationFullData, setapplicationFullData] = useState();
  const [tableData, setTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    api_fetchProcurementDetailById,
    api_fetchOutboxProcurementDetailById,
    api_postForwardToDA,
  } = ProjectApiList();

  // Accessing context for notifications
  const { notify } = useContext(contextVar);

  const { setheartBeatCounter, settoggleBar, titleBarVisibility, titleText } =
    useContext(contextVar);

  let buttonStyle =
    " mr-1 pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-indigo-500 text-base leading-tight  rounded  hover:bg-indigo-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl";

  useEffect(() => {
    getApplicationDetail();
  }, []);

  ///////////{*** APPLICATION FULL DETAIL ***}/////////
  const getApplicationDetail = () => {
    let url;
    seterroState(false);
    setisLoading(true);

    if (page == "inbox") {
      url = api_fetchProcurementDetailById;
    }
    if (page == "outbox") {
      url = api_fetchOutboxProcurementDetailById;
    }

    AxiosInterceptors.get(`${url}/${id}`, ApiHeader())
      .then(function (response) {
        console.log("view water tanker full details ...", response?.data?.data);
        if (response?.data?.status) {
          setapplicationFullData(response?.data?.data);
          setTableData(response?.data?.data?.tran_dtls);
          setisLoading(false);
        } else {
          toast.error(response?.data?.message);
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

  const forwardDAModal = () => {
    setIsModalOpen(true);
  };

  const forwardToDA = () => {
    // seterroState(false);
    setisLoading(true);

    AxiosInterceptors.post(
      `${api_postForwardToDA}`,
      { preProcurement: [id] },
      ApiHeader()
    )
      .then(function (response) {
        console.log("Forwarded to DA", response?.data);
        // setresponseScreen(response?.data);
        console.log(response?.data?.st, "upper Status");
        if (response?.data?.status == true) {
          setisLoading(false);
          console.log(response?.data?.message, "-------------->>");
          toast.success(response?.data?.message, "success");
          setTimeout(() => {
            navigate("/sr-inventory-proposal");
          }, 3000);
          console.log(response?.data?.message, "Forwadede to DA--->>");
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
        toast.error("Something went wrong")
        // setdeclarationStatus(false);
      });
  };

  if (isModalOpen) {
    return (
      <>
        <ForwardToDAConfirmationModal
          forwardToDA={forwardToDA}
          // responseScreenData={formData}
        />
      </>
    );
  }

  // console.log(applicationFullData?.category?.name)


  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <div className=''>
        <TitleBar
          titleBarVisibility={titleBarVisibility}
          titleText={"Inventory Proposal Details"}
        />
      </div>
      <div className=''>

      <div className="flex justify-end">
      
      
      {/* <div id="printable-content">
        <h1>This is the content to print</h1>
        <p>More content...</p>
      </div> */}
    </div>
        {/* Basic Details */}
        <div className='mt-6' >

          <div className='py-6 mt-4 bg-white rounded-lg shadow-xl p-4 space-y-5 border border-blue-500' id="printable-content">
          
          <div className="">
          <h2 className='font-semibold text-2xl pl-7 pt-2 pb-2 flex justify-start bg-[#4338ca] text-white rounded-md'>
              {/* <MdTag className=' text-[2rem] text-sky-700' />  */}
              View Procurement Request{" "}
            </h2>
          </div>

            <div className='flex justify-between'>
            
              {!applicationFullData?.remark?.length == 0 && (
                <div className='pb-5 pl-8'>
                  <h1 className='font-bold text-base text-green-600'>
                    Remark <span className='text-black'>:</span>
                    <span className='text-sm pt-2 font-light text-green-600'>
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
                    {nullToNA(applicationFullData?.order_no)}
                  </span>
                </h1>
              </div>
            </div>

            {/* <div className='flex flex-wrap justify-between gap-y-2 space-x-5 pl-4 mt-[1.5rem]'> */}
            <div className='grid grid-cols-4 gap-4 ml-8'>
              {/* {applicationFullData?.category?.name == ("Uniforms" || "Maintainance and Repaire" || "Safety and Security" ||"Cleaning Supplies" || "Furniture") &&  */}

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold'>
                Item Category
                </div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  
                  {nullToNA(applicationFullData?.category.name)}
                </div>
              </div>

              {/* } */}

              {/* {applicationFullData?.category?.name == ("Uniforms" || "Maintainance and Repaire" || "Safety and Security" ||"Cleaning Supplies" || "Furniture") &&  */}

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>
                Item Sub Category
                </div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  
                  {nullToNA(applicationFullData?.subcategory?.name)}
                </div>
              </div>

              {/* } */}

              {applicationFullData?.category?.name ==
                ("Uniforms" ||
                  "Maintainance and Repaire" ||
                  "Safety and Security" ||
                  "Cleaning Supplies" ||
                  "Furniture") && (
                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-bold '>
                    Brand
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                    {nullToNA(applicationFullData?.brand)}
                  </div>
                </div>
              )}

              {applicationFullData?.category?.name ==
                ("Uniforms" ||
                  "Maintainance and Repaire" ||
                  "Cleaning Supplies" ||
                  "Furniture") && (
                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-semibold '>
                    Colour
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                    {nullToNA(applicationFullData?.colour)}
                  </div>
                </div>
              )}

              {/* </div> */}

              {/* <div className='flex md:flex-row flex-col gap-y-2 md:space-x-5 pl-4  '> */}

              {applicationFullData?.category?.name ==
                ("Uniforms" ||
                  "Maintainance and Repaire" ||
                  "Furniture" ||
                  "Cleaning Supplies") && (
                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-bold '>
                    Material
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                    {nullToNA(applicationFullData?.material)}
                  </div>
                </div>
              )}

              {applicationFullData?.category?.name ==
                ("Maintainance and Repaire" || "Safety and Security") && (
                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-bold '>
                    Dimension 
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                    {nullToNA(applicationFullData?.dimension)}
                  </div>
                </div>
              )}

              {applicationFullData?.category?.name == "Furniture" && (
                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-bold '>
                    Room Type
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                    {nullToNA(applicationFullData?.room_type)}
                  </div>
                </div>
              )}

              {applicationFullData?.category?.name == "Furniture" && (
                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-semibold '>
                    Included Components
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                    {nullToNA(applicationFullData?.included_components)}
                  </div>
                </div>
              )}

              {/* </div> */}

              {/* <div className='flex md:flex-row flex-col gap-y-2 md:space-x-5 pl-4  '> */}

              {applicationFullData?.category?.name == "Furniture" && (
                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-bold '>
                    size
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                    {nullToNA(applicationFullData?.size)}
                  </div>
                </div>
              )}

              {applicationFullData?.category?.name == "Cleaning Supplies" && (
                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-bold '>
                    Recomended Uses
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                    {nullToNA(applicationFullData?.recomended_uses)}
                  </div>
                </div>
              )}

              {applicationFullData?.category?.name == "Cleaning Supplies" && (
                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-bold '>
                    Bristle
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                    {nullToNA(applicationFullData?.bristle)}
                  </div>
                </div>
              )}

              {applicationFullData?.category?.name ==
                ("Maintainance and Repaire" || "Safety and Security") && (
                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                  <div className='md:w-auto w-[50%] font-semibold '>
                    Weight
                  </div>
                  <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                    {nullToNA(applicationFullData?.weight)}
                  </div>
                </div>
              )}

              {/* </div> */}

              {/* <div className='flex md:flex-row flex-col gap-y-2 md:space-x-5 pl-4  '> */}

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-semibold '>
                  Rate per quantity
                </div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(applicationFullData?.rate)}
                </div>
              </div>

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>
                  Quantity
                </div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(applicationFullData?.quantity)}
                </div>
              </div>

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>
                  Total Rate
                </div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(applicationFullData?.total_rate)}
                </div>
              </div>

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>
                  No of Items
                </div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {nullToNA(applicationFullData?.number_of_items)}
                </div>
              </div>

              {/* </div> */}

              {/* <div className='flex md:flex-row flex-col gap-y-2 md:space-x-5 pl-4  '> */}

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>
                  {/* {nullToNA(applicationFullData?.quantity)} */}
                </div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {/* Quantity  */}
                </div>
              </div>

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>
                  {/* {nullToNA(applicationFullData?.applicant_name)} */}
                </div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {/* Total Rate   */}
                </div>
              </div>

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-bold '>
                  {/* {nullToNA(applicationFullData?.mobile)} */}
                </div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {/* Brand  */}
                </div>
              </div>

              <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                <div className='md:w-auto w-[50%] font-semibold '>
                  {/* {nullToNA(applicationFullData?.email)} */}
                </div>
                <div className='md:w-auto w-[50%] text-gray-800 text-md'>
                  {/* Processor  */}
                </div>
              </div>
            </div>

            <div className='p-5 pl-8'>
              <h1 className='font-bold '>Other Description</h1>
              <p className=' pt-2'>
                {nullToNA(applicationFullData?.other_description)}
              </p>
            </div>

            <div className='h-[30px]'></div>

          </div>
            <div className='space-x-5 flex justify-end mt-[2rem]'>
              <button className={buttonStyle} onClick={() => navigate(-1)}>
                Back
              </button>

              {applicationFullData?.status?.status == -1 && (
                <button
                  className={buttonStyle}
                  onClick={() => {
                    navigate(`/sr-edit-pre-procurement/${id}`);
                  }}
                >
                  Edit
                </button>
              )}

              {/* {applicationFullData?.status?.status == -2 && "sdfv" } */}

              {page == "inbox" &&
                (applicationFullData?.status?.status == -1 ||
                  applicationFullData?.status?.status == 0) && (
                  <button
                    className=' p-2 border border-indigo-500 text-white text-md sm:text-sm leading-tight rounded  hover:bg-white  hover:text-indigo-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#4338CA] active:shadow-lg transition duration-150 ease-in-out shadow-xl bg-[#4338CA]'
                    onClick={forwardDAModal}
                  >
                    Forward to DA
                  </button>
                )}

                <button onClick={handlePrint} className='mr-1 pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-indigo-500 text-base leading-tight  rounded bg-indigo-700 text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl' >Print</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ViewInventoryDetailsById;
