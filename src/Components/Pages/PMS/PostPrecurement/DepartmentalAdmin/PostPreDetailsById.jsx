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
import ThemeStyle from "@/Components/Common/ThemeStyle";
import { useFormik } from "formik";

import * as yup from "yup";
import PreProcurementCancelScreen from "./PostProcurementCancelScreen";
import PreProcurementSubmittedScreen from "./PreProcurementSubmittedScreen";

import { FaDivide } from "react-icons/fa";
// import StockReceiverModal from "./StockReceiverModal";
// import ReleaseTenderModal from "./ReleaseTenderModal";
// import DaRejectModal from "./DaRejectModal";

// import ListTable from "src/Components/Common/ListTable/ListTable";
// import PaymentHistory from "src/Components/Common/PaymentHistory/PaymentHistory";

const PostPreDetailsById = (props) => {
  const navigate = useNavigate();
  const { id, page} = useParams();
  console.log("param", id);

  console.log("page========>", page);

  const [erroState, seterroState] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [applicationFullData, setapplicationFullData] = useState();
  const [tableData, setTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpen2, setIsModalOpen2] = useState(false)
  const [isModalOpen3, setIsModalOpen3] = useState(false)
  const [remark,setRemark] = useState('')

  const {
    
    api_fetchProcurementDetailById,
    api_fetchOutboxProcurementDetailById,
    api_postBackToSR,
    api_postReleaseTender,
    api_postRejectTender,
    api_postDaEditTender
  } = ProjectApiList();

  const { saveButtonColor, inputStyle, labelStyle, headingStyle, formStyle } =
    ThemeStyle();
  

     // Accessing context for notifications
     const { notify } = useContext(contextVar);

  let buttonStyle = '  pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-indigo-500 text-sm leading-tight  rounded  hover:bg-indigo-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl'

  let buttonStyle2 = ' mr-2 pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-white text-sm sm:text-sm leading-tight rounded  hover:bg-white  hover:text-indigo-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl bg-indigo-700'
  
  let buttonStyle3 = ' pb-2 pl-4 pr-4 pt-2 border border-yellow-400 text-white text-sm sm:text-sm leading-tight rounded  hover:bg-white  hover:text-yellow-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl bg-yellow-700'

 
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

  const postBackToSRModal =()=>{
    setIsModalOpen(true)
  }
  const postReleaseTenderModal =()=>{
    setIsModalOpen2(true)
  }
  const postRejectTenderModal =()=>{
    setIsModalOpen3(true)
  }
 
  const postRejectTender = () => {

    setisLoading(true);
    console.log(remark,"Remark==========>>")

    AxiosInterceptors.post(`${api_postRejectTender}`, {"preProcurement":[id],"remark":remark} , ApiHeader())
      .then(function (response) {
        console.log("Forwarded to DA", response?.data);
        console.log(response?.data?.st,"upper Status")
        if (response?.data?.status == true) {
          setisLoading(false);
          toast.success(response?.data?.message,"success");
          setTimeout(() => {
            navigate("/da-inventory-proposal");
          }, 2000);
         

        } else {
          setisLoading(false);
          const errorMsg = Object.keys(response?.data?.data);
          setErrRes(errorMsg);
          toast(response?.data?.message, "error");
        }
      })
      .catch(function (error) {
        console.log("errorrr.... ", error);
       
      });

  };
  const postBackToSR = () => {

    setisLoading(true);
    console.log(remark,"Remark==========>>")

    AxiosInterceptors.post(`${api_postBackToSR}`, {"preProcurement":[id],"remark":remark} , ApiHeader())
      .then(function (response) {
        console.log("Forwarded to DA", response?.data);
        console.log(response?.data?.st,"upper Status")
        if (response?.data?.status == true) {
          setisLoading(false);
          toast.success(response?.data?.message,"success");
          setTimeout(() => {
            navigate("/da-inventory-proposal");
          }, 2000);
         

        } else {
          setisLoading(false);
          const errorMsg = Object.keys(response?.data?.data);
          setErrRes(errorMsg);
          toast(response?.data?.message, "error");
        }
      })
      .catch(function (error) {
        console.log("errorrr.... ", error);
       
      });

  };
  
  const postReleaseTender = () => {
    // seterroState(false);
    setisLoading(true);
  

    AxiosInterceptors.post(`${api_postReleaseTender}`, {"preProcurement":[id]} , ApiHeader())
      .then(function (response) {
        console.log("Forwarded to DA", response?.data);
        console.log(response?.data?.st,"upper Status")
        if (response?.data?.status == true) {
          setisLoading(false);
          console.log(response?.data?.message,"-------------->>")
          toast.success(response?.data?.message,"success");
          setTimeout(() => {
            navigate("/da-inventory-proposal");
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


  const validationSchema = yup.object({
    itemcategory: yup.string().required("item category is required"),
    itemsubcategory: yup.string().required("item subcategory is required"),
    
    other_description: yup.string().required("Other description is required"),
    rate: yup.number().required("Rate is required"),
    quantity: yup.number().required("Quantity is required"),
  });

  // intitial value
  const initialValues = {
    itemcategory: "",
    itemsubcategory: "",
    brand: "",
    processor: "",
    ram: "",
    operatingsystem: "",
    rom: "",
    graphics: "",
    other_description: "",
    quantity: "",
    rate: "",
    
    //Furniture values
    number_of_items: "",
    brand: "",
    colour: "",
    material: "",
    product_dimensions: "",
    room_type: "",
    included_components: "",
    size: "",
    
    //CleaningSupplies
    number_of_items: "",
    brand: "",
    colour: "",
    recommendedUsedProducts: "",
    handle_material: "",
    bristle: "",
    
    // safetySecurity
    number_of_items: "",
    brand: "",
    weight: "",
    recommendedUsedProducts: "",
    
    // maintenanceAndRepair
    number_of_items: "",
    brand: "",
    colour: "",
    maintenamce_material: "",
    items_dimensions: "",
    items_weight: "",
    
    // uniform
    number_of_items: "",
    brand: "",
    colour: "",
    maintenamce_material: "",
        

  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log("click");
      console.log("procurement==============>>", values);
      // submitForm(values);
      setIsModalOpen(true);
      setFormData(values);
    },
    // validationSchema,
  });


  const handleOnChange = (e) => {
    // console.log("target type", e.target.type);
    // console.log("check box name", e.target.name);

    let name = e.target.name;
    let value = e.target.value;

    console.log("target value checked", e.target.checked);

    {
      name == "cleaningDate" && verifyDateForBookingTanker(value);
    }
    {
      name == "isWithinUlb" && setulbAreaVal(value);
    }
    {
      name == "isWithinUlb" && fetchLocationListByUlb(value);
    }
    {
      name == "quantity" &&
        formik.setFieldValue(
          "quantity",
          allowNumberInput(value, formik.values.quantity, 100)
        );
    }
    {
      name == "rate" &&
        formik.setFieldValue(
          "rate",
          allowNumberInput(value, formik.values.rate, 100)
        );
    }
    {
      name == "totalRate" &&
        formik.setFieldValue(
          "totalRate",
          allowNumberInput(value, formik.values.totalRate, 100)
        );
    }
  };


  useEffect(() => {
    getApplicationDetail();
    calculateTotalRate();
    
  }, [ formik.values.quantity, formik.values.rate]);



  // -------------------- Calculate Total Quantity -------------------------------

  const calculateTotalRate = () => {
    const rate = Number(formik.values.rate) || 0;
    const quantity = Number(formik.values.quantity) || 0;
    const totalRate = rate / quantity;
    formik.setFieldValue("totalRate", totalRate);
    console.log(totalRate, "tot Rate");
  };

// ------------cancel modal-----------------------------

const openCancelModal = () => {
  setIsModalOpen2(true);
};

if (isModalOpen2) {
  return (
    <>
        <PreProcurementCancelScreen setIsModalOpen2={setIsModalOpen2} />
      </>
    );
  }
  
  // ------------save modal-----------------------------

  if (isModalOpen) {
    return (
      <>
        <PreProcurementSubmittedScreen
          // submitForm={submitForm}
          // responseScreenData={formData}
          setIsModalOpen={setIsModalOpen}
        />
      </>
    );
  }
  

  // if (isModalOpen3) {
  //   return (
  //     <>
  //       <DaRejectModal postRejectTender={postRejectTender} setRemark={setRemark} setIsModalOpen3={setIsModalOpen3}/>
  //     </>
  //   );
  // }

  // if (isModalOpen) {
  //   return (
  //     <>
  //       <StockReceiverModal postBackToSR={postBackToSR} setRemark={setRemark} setIsModalOpen={setIsModalOpen}/>
  //     </>
  //   );
  // }
  
  // if (isModalOpen2) {
  //   return (
  //     <>
  //       <ReleaseTenderModal postReleaseTender={postReleaseTender} setIsModalOpen2={setIsModalOpen2}/>
  //     </>
  //   );
  // }
 

  // console.log(applicationFullData)

  return (
    <div>
      <div className="">
        {/* Basic Details */}
        <div className="mt-6">
          <div className="flex justify-between mt-2 bg-white rounded-lg shadow-xl p-4 border border-blue-500 ">
            <h2 className="font-semibold text-xl flex justify-start">
              <MdTag className="inline pt-1 text-[1.5rem] text-sky-700" /> View
              Procurement Request{" "}
            </h2>
          </div>
          {/* <h1 className='px-1 font-semibold font-serif  text-gray-500'>
            <MdTag className='inline' /> Basic Details
          </h1> */}
          <div className="py-6 mt-2 bg-white rounded-lg shadow-xl p-4 space-y-5 border border-blue-500">
            <div className="pl-8 text-[1rem] text-[#4338CA]">
              <h1 className="">
                Procurement request No <span className="text-black">:</span>
                <span className="font-bold">
                  {" "}
                  {nullToNA(applicationFullData?.order_no)}
                </span>
              </h1>
            </div>

            {!applicationFullData?.remark?.length == 0 && (
              <div className="pb-5 pl-8">
                <h1 className="font-bold text-base text-red-500">
                  Remark <span className="text-black">:</span>
                  <span className="text-sm pt-2 font-light text-red-500">
                    {" "}
                    {nullToNA(applicationFullData?.remark)}
                  </span>
                </h1>
              </div>
            )}

            <div className="grid grid-cols-4 gap-4 ml-8">
              {/* {applicationFullData?.category?.name == ("Uniforms" || "Maintainance and Repaire" || "Safety and Security" ||"Cleaning Supplies" || "Furniture") &&  */}

              <div className="md:flex-1 md:block flex flex-row-reverse justify-between">
                <div className="md:w-auto w-[50%] font-bold ">
                  {nullToNA(applicationFullData?.category.name)}
                </div>
                <div className="md:w-auto w-[50%] text-gray-500 text-sm">
                  Item Category
                </div>
              </div>

              {/* } */}

              {/* {applicationFullData?.category?.name == ("Uniforms" || "Maintainance and Repaire" || "Safety and Security" ||"Cleaning Supplies" || "Furniture") &&  */}

              <div className="md:flex-1 md:block flex flex-row-reverse justify-between">
                <div className="md:w-auto w-[50%] font-bold ">
                  {nullToNA(applicationFullData?.subcategory?.name)}
                </div>
                <div className="md:w-auto w-[50%] text-gray-500 text-sm">
                  Item Sub Category
                </div>
              </div>

              {/* } */}

              {applicationFullData?.category?.name ==
                ("Uniforms" ||
                  "Maintainance and Repaire" ||
                  "Safety and Security" ||
                  "Cleaning Supplies" ||
                  "Furniture") && (
                <div className="md:flex-1 md:block flex flex-row-reverse justify-between">
                  <div className="md:w-auto w-[50%] font-bold ">
                    {nullToNA(applicationFullData?.brand)}
                  </div>
                  <div className="md:w-auto w-[50%] text-gray-500 text-sm">
                    Brand
                  </div>
                </div>
              )}

              {applicationFullData?.category?.name ==
                ("Uniforms" ||
                  "Maintainance and Repaire" ||
                  "Cleaning Supplies" ||
                  "Furniture") && (
                <div className="md:flex-1 md:block flex flex-row-reverse justify-between">
                  <div className="md:w-auto w-[50%] font-semibold ">
                    {nullToNA(applicationFullData?.colour)}
                  </div>
                  <div className="md:w-auto w-[50%] text-gray-500 text-sm">
                    Colour
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
                <div className="md:flex-1 md:block flex flex-row-reverse justify-between">
                  <div className="md:w-auto w-[50%] font-bold ">
                    {nullToNA(applicationFullData?.material)}
                  </div>
                  <div className="md:w-auto w-[50%] text-gray-500 text-sm">
                    Material
                  </div>
                </div>
              )}

              {applicationFullData?.category?.name ==
                ("Maintainance and Repaire" || "Safety and Security") && (
                <div className="md:flex-1 md:block flex flex-row-reverse justify-between">
                  <div className="md:w-auto w-[50%] font-bold ">
                    {nullToNA(applicationFullData?.dimension)}
                  </div>
                  <div className="md:w-auto w-[50%] text-gray-500 text-sm">
                    Dimension
                  </div>
                </div>
              )}

              {applicationFullData?.category?.name == "Furniture" && (
                <div className="md:flex-1 md:block flex flex-row-reverse justify-between">
                  <div className="md:w-auto w-[50%] font-bold ">
                    {nullToNA(applicationFullData?.room_type)}
                  </div>
                  <div className="md:w-auto w-[50%] text-gray-500 text-sm">
                    Room Type
                  </div>
                </div>
              )}

              {applicationFullData?.category?.name == "Furniture" && (
                <div className="md:flex-1 md:block flex flex-row-reverse justify-between">
                  <div className="md:w-auto w-[50%] font-semibold ">
                    {nullToNA(applicationFullData?.included_components)}
                  </div>
                  <div className="md:w-auto w-[50%] text-gray-500 text-sm">
                    Included Components
                  </div>
                </div>
              )}

              {/* </div> */}

              {/* <div className='flex md:flex-row flex-col gap-y-2 md:space-x-5 pl-4  '> */}

              {applicationFullData?.category?.name == "Furniture" && (
                <div className="md:flex-1 md:block flex flex-row-reverse justify-between">
                  <div className="md:w-auto w-[50%] font-bold ">
                    {nullToNA(applicationFullData?.size)}
                  </div>
                  <div className="md:w-auto w-[50%] text-gray-500 text-sm">
                    size
                  </div>
                </div>
              )}

              {applicationFullData?.category?.name == "Cleaning Supplies" && (
                <div className="md:flex-1 md:block flex flex-row-reverse justify-between">
                  <div className="md:w-auto w-[50%] font-bold ">
                    {nullToNA(applicationFullData?.recomended_uses)}
                  </div>
                  <div className="md:w-auto w-[50%] text-gray-500 text-sm">
                    Recomended Uses
                  </div>
                </div>
              )}

              {applicationFullData?.category?.name == "Cleaning Supplies" && (
                <div className="md:flex-1 md:block flex flex-row-reverse justify-between">
                  <div className="md:w-auto w-[50%] font-bold ">
                    {nullToNA(applicationFullData?.bristle)}
                  </div>
                  <div className="md:w-auto w-[50%] text-gray-500 text-sm">
                    Bristle
                  </div>
                </div>
              )}

              {applicationFullData?.category?.name ==
                ("Maintainance and Repaire" || "Safety and Security") && (
                <div className="md:flex-1 md:block flex flex-row-reverse justify-between">
                  <div className="md:w-auto w-[50%] font-semibold ">
                    {nullToNA(applicationFullData?.weight)}
                  </div>
                  <div className="md:w-auto w-[50%] text-gray-500 text-sm">
                    Weight
                  </div>
                </div>
              )}

              {/* </div> */}

              {/* <div className='flex md:flex-row flex-col gap-y-2 md:space-x-5 pl-4  '> */}

              <div className="md:flex-1 md:block flex flex-row-reverse justify-between">
                <div className="md:w-auto w-[50%] font-semibold ">
                  {nullToNA(applicationFullData?.rate)}
                </div>
                <div className="md:w-auto w-[50%] text-gray-500 text-sm">
                  Rate
                </div>
              </div>

              <div className="md:flex-1 md:block flex flex-row-reverse justify-between">
                <div className="md:w-auto w-[50%] font-bold ">
                  {nullToNA(applicationFullData?.quantity)}
                </div>
                <div className="md:w-auto w-[50%] text-gray-500 text-sm">
                  Quantity
                </div>
              </div>

              <div className="md:flex-1 md:block flex flex-row-reverse justify-between">
                <div className="md:w-auto w-[50%] font-bold ">
                  {nullToNA(applicationFullData?.total_rate)}
                </div>
                <div className="md:w-auto w-[50%] text-gray-500 text-sm">
                  Total Rate
                </div>
              </div>

              <div className="md:flex-1 md:block flex flex-row-reverse justify-between">
                <div className="md:w-auto w-[50%] font-bold ">
                  {nullToNA(applicationFullData?.number_of_items)}
                </div>
                <div className="md:w-auto w-[50%] text-gray-500 text-sm">
                  No of Items
                </div>
              </div>

              {/* </div> */}

              {/* <div className='flex md:flex-row flex-col gap-y-2 md:space-x-5 pl-4  '> */}

              <div className="md:flex-1 md:block flex flex-row-reverse justify-between">
                <div className="md:w-auto w-[50%] font-bold ">
                  {/* {nullToNA(applicationFullData?.quantity)} */}
                </div>
                <div className="md:w-auto w-[50%] text-gray-500 text-sm">
                  {/* Quantity  */}
                </div>
              </div>

              <div className="md:flex-1 md:block flex flex-row-reverse justify-between">
                <div className="md:w-auto w-[50%] font-bold ">
                  {/* {nullToNA(applicationFullData?.applicant_name)} */}
                </div>
                <div className="md:w-auto w-[50%] text-gray-500 text-sm">
                  {/* Total Rate   */}
                </div>
              </div>

              <div className="md:flex-1 md:block flex flex-row-reverse justify-between">
                <div className="md:w-auto w-[50%] font-bold ">
                  {/* {nullToNA(applicationFullData?.mobile)} */}
                </div>
                <div className="md:w-auto w-[50%] text-gray-500 text-sm">
                  {/* Brand  */}
                </div>
              </div>

              <div className="md:flex-1 md:block flex flex-row-reverse justify-between">
                <div className="md:w-auto w-[50%] font-semibold ">
                  {/* {nullToNA(applicationFullData?.email)} */}
                </div>
                <div className="md:w-auto w-[50%] text-gray-500 text-sm">
                  {/* Processor  */}
                </div>
              </div>
            </div>

            <div className="p-5 pl-8">
              <h1 className="font-bold ">Other Description</h1>
              <p className=" pt-2">
                {nullToNA(applicationFullData?.other_description)}
              </p>
            </div>

            <div className="h-[30px]"></div>
          </div>
          



          {/* Inventory Details form */}

            <div className={`${formStyle} mt-8 border border-blue-500`}>
              <form onSubmit={formik.handleSubmit} onChange={handleOnChange}>
                <div className="">
                  <div className=" grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 container mx-auto capitalize">
                    <div className="col-span-12  w-full mb-20">
                      <div className=" ml-4 p-2 mt-4">
                        <h1 className={`${headingStyle} text-left pb-5 pl-6`}>
                          Inventory Details
                        </h1>
                        {/* <h1 className={`${labelStyle} `}>
                          Maintaining a healthy home: Confirming my septic tank
                          service.
                        </h1> */}
                      </div>
                      {/* <div className="hidden md:block lg:block">
                        <hr className="border w-full border-gray-200" />
                      </div> */}

                      <div className="p-12 -mt-4 valid-form flex flex-wrap flex-row -mx-4">

                          
                          <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4">
                            <div class="px-4 w-full mb-4">
                              <label className={`${labelStyle} inline-block mb-2`}>
                                Supplier Name <span className="text-red-500">*</span>
                              </label>

                              <input
                                type="text"
                                name='supplier'
                                className={`${inputStyle} inline-block w-full relative`}
                                onChange={formik.handleChange}
                                value={formik.values.supplier}
                              />

                              <p className="text-red-500 text-xs ">
                                {formik.touched.supplier &&
                                formik.errors.supplier
                                  ? formik.errors.supplier
                                  : null}
                              </p>
                            </div>
                          </div>

                          <div className=" form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4">
                            <div class="px-4 w-full mb-4">
                              <label className={`${labelStyle} inline-block mb-2`}>
                                GST No
                              </label>

                              <input
                                type="text"
                                name='gstNo'
                                className={`${inputStyle} inline-block w-full relative`}
                                onChange={formik.handleChange}
                                value={formik.values.gstNo}
                              />

                              <p className="text-red-500 text-xs ">
                                {formik.touched.gstNo &&
                                formik.errors.gstNo
                                  ? formik.errors.gstNo
                                  : null}
                              </p>
                            </div>
                          </div>

                          <div className=" form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4">
                            <div class="px-4 w-full mb-4">
                              <label className={`${labelStyle} inline-block mb-2`}>
                                Final Rate
                              </label>

                              <input
                                type="number"
                                name='finalRate'
                                className={`${inputStyle} inline-block w-full relative`}
                                onChange={formik.handleChange}
                                value={formik.values.finalRate}
                              />

                              <p className="text-red-500 text-xs ">
                                {formik.touched.finalRate &&
                                formik.errors.finalRate
                                  ? formik.errors.finalRate
                                  : null}
                              </p>
                            </div>
                          </div>

                          <div className=" form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4">
                            <div class="px-4 w-full mb-4">
                              <label className={`${labelStyle} inline-block mb-2`}>
                                GST%
                              </label>

                              <input
                                type="number"
                                name='gstPer'
                                className={`${inputStyle} inline-block w-full relative`}
                                onChange={formik.handleChange}
                                value={formik.values.gstPer}
                              />
                              <div className="flex mt-2">
                              <input type="checkbox" /> <p className="text-sm pl-2">add GST in Bill</p>
                              </div>


                              <p className="text-red-500 text-xs">
                                {formik.touched.gstPer &&
                                formik.errors.gstPer
                                  ? formik.errors.gstPer
                                  : null}
                              </p>
                            </div>
                          </div>

                          {/* <div className=" form-group flex-shrink max-w-full px-4 w-full mb-4 ml-4 mr-4">
                              <label className={`${labelStyle} inline-block mb-2`}>
                                Others Description
                              </label>
                              <textarea
                                type="text"
                                name="other_description"
                                className={`${inputStyle} inline-block w-full relative h-20`}
                                onChange={formik.handleChange}
                                value={formik.values.other_description}
                              />

                              <p className="text-red-500 text-xs ">
                                {formik.touched.other_description &&
                                formik.errors.other_description
                                  ? formik.errors.other_description
                                  : null}
                              </p>
                          </div> */}

                      <div className=" ml-2 p-2 mt-4 w-full">
                        <h1 className={`${headingStyle} text-left pb-10`}>
                          Calculation
                        </h1>
                      
                      

                      <div class="form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4">
                    {/* <label className={`${labelStyle} inline-block mb-2`}>
                      Quantity
                    </label> */}

                      <div className="flex space-x-5">
                      <input
                        type="number"
                        name="rate"
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={(e) => {
                          formik.handleChange(e);
                          calculateTotalRate();
                        }}
                        value={formik.values.rate}
                        placeholder="Total Quantity"
                      />
                      
                      <FaDivide className="text-[4rem] pb-5" />
                      <input
                        type="number"
                        name="quantity"
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={(e) => {
                          formik.handleChange(e);
                          calculateTotalRate();
                        }}
                        value={formik.values.quantity}
                        placeholder="Total Price"
                      />
                      <p className="text-[1.5rem]">=</p>
                      <input
                        type="number"
                        name="totalRate"
                        className={`${inputStyle} inline-block w-full relative`}
                        // onChange={formik.handleChange}
                        value={formik.values.totalRate}
                        placeholder="Per Quantity"
                        disabled
                      />
                    </div>
                    <p className="text-red-500 text-xs ">
                      {formik.touched.quantity && formik.errors.quantity
                        ? formik.errors.quantity
                        : null}
                    </p>
                  </div>

                  </div>

                          
                      </div>

                      <div className="space-x-5 flex justify-end mr-[3rem]">
                              
                              <button 
                                className={buttonStyle} 
                                onClick={openCancelModal}
                                >
                                Cancel
                              </button>

                              <button 
                                type="submit"
                                className={buttonStyle2}
                                >
                                Save
                              </button>

                      </div>

                        
                      </div>
                    </div>
                  </div>
                
              </form>
              </div>
         

          
        </div>
      </div>
    </div>
  );
};

export default PostPreDetailsById;
