//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash Alam
//    Version - 1.0
//    Date - 30/09/2023
//    Revision - 1
//    Project - JUIDCO
//    Component  - TankerBookingScreen
//    DESCRIPTION - TankerBookingScreen
//////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import ThemeStyleTanker from "@/Components/Common/ThemeStyleTanker";
import ThemeStyle from "@/Components/Common/ThemeStyle";
import { useFormik } from "formik";

import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import axios from "axios";
import ApiHeader from "@/Components/api/ApiHeader";
import { toast } from "react-toastify";
import BarLoader from "@/Components/Common/Loaders/BarLoader";
import { useNavigate, useParams } from "react-router-dom";
import PreProcurementSubmittedScreen from "./PreProcurementSubmittedScreen";
import * as yup from "yup";
import {
  allowCharacterInput,
  allowMailInput,
  allowNumberInput,
  allowCharacterNumberInput,
} from "@/Components/Common/PowerUps/PowerupFunctions";
import ProjectApiList from "@/Components/api/ProjectApiList";
import PreProcurementCancelScreen from "./PreProcurementCancelScreen";


// import { click } from "@testing-library/user-event/dist/click";
// import { C } from "dist/assets/index-1a86ca5c";

function AddPreProcurement(props) {
  const { saveButtonColor, inputStyle, labelStyle, headingStyle, formStyle } =
    ThemeStyle();

  const {
    
    api_addProcurement,
    api_itemCategory,
    api_itemSubCategory,
    api_itemBrand,
    api_fetchProcessor,
    api_fetchRam,
    api_fetchOperatingSystem,
    api_fetchRom,
    api_fetchGraphics,

  } = ProjectApiList();

  const currentDate = new Date().toISOString().split("T")[0];

  const [ulbList, setulbList] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [listDetails, setlistDetails] = useState();
  const [masterData, setmasterData] = useState();
  const [tabIndex, settabIndex] = useState(0);

  const [responseScreen, setresponseScreen] = useState();
  const [ulbData, setulbData] = useState();
  const [wardList, setwardList] = useState();
  const [locationList, setlocationList] = useState();
  const [capacityData, setcapacityData] = useState();
  const [ulbAreaVal, setulbAreaVal] = useState();
  const [buildTypeVal, setbuildTypeVal] = useState();
  const [errRes, setErrRes] = useState();
  // const [ulbdata2, setulbData2] =useState();
  const [ulbId, setulbId] = useState();

  const [category, setCategory] = useState()
  const [subcategory, setSubCategory] = useState()
  const [brand, setBrand] = useState()
  const [processor, setProcessor] = useState()
  const [ramList, setRamList] = useState()
  const [OperatingSystem, setOperatingSystem] = useState()
  const [romList, setRomList] = useState()
  const [graphicsList, setGraphicsList] = useState()

  const [isModalOpen,setIsModalOpen] = useState(false)
  const [isModalOpen2,setIsModalOpen2] = useState(false)
  const [formData,setFormData] = useState()


// console.log(graphicsList)




// const { id } = useParams();

// console.log(category)

// ══════════════════════════════║🔰 form submission declaration 🔰║═══════════════════════════════════
  const [declarationStatus, setdeclarationStatus] = useState();
  const handleDeclaration = () => {
    setdeclarationStatus((prev) => !prev);
    console.log(declarationStatus, "declarationStatus=============");
  };

  // console.log("list id props received", props?.listId);
  // console.log("list id props type", props?.listType);

  const navigate = useNavigate();

  //activating notification
  const notify = (toastData, type) => {
    toast.dismiss();
    if (type == "success") {
      toast.success(toastData);
    }
    if (type == "error") {
      toast.error(toastData);
    }
  };

  // ══════════════════════════════║🔰 validationSchema 🔰║═══════════════════════════════════
  const validationSchema = yup.object({
    itemsubcategory: yup.string().required("itemsubcategory is required"),
    itemcategory: yup.string().required("itemcategory is required"),
    processor: yup.string().required("processor is required"),
    brand: yup.string().required("brand is required"),
    ram: yup.string().required("ram is required"),
    operatingsystem: yup.string().required("operatingsystem is required"),
    rom: yup.string().required("rom is required"),
    graphics: yup.string().required("graphics is required"),
    other_description: yup.string().required("other_description is required"),
    quantity: yup.number().required("quantity is required"),
    // Generation: yup.string().required("Generation is required"),
    rate: yup.number().required("rate is required"),
    // totalRate: yup.string().required("totalRate is required"),
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
    // Generation: "",
    // totalRate: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log("click");
      console.log("procurement==============>>", values);
      // submitForm(values);
      setIsModalOpen(true)
      setFormData(values)
    },
    validationSchema,
  });


   // ══════════════════════════════║🔰calculate the total rate🔰║═══════════════════════════════════
const calculateTotalRate = () => {

  const rate = Number(formik.values.rate)|| 0;
  const quantity = Number(formik.values.quantity) || 0;
  const totalRate = rate * quantity;
  formik.setFieldValue('totalRate', totalRate);
  console.log(totalRate,"tot Rate")

};
  

  useEffect(() => {
    const ulbId = localStorage.getItem("ulbId");
    setulbId(ulbId);

    fetchCategory();
    // fetchSubCategory();
    fetchBrand();
    fetchProcessor();
    fetchRam();
    fetchOperatingSystem();
    fetchRom();
    fetchGraphics();

    calculateTotalRate();

  }, [ulbData,formik.values.quantity,formik.values.rate ]);

  // ══════════════════════════════║🔰 function to get ward list  🔰║═══════════════════════════════════

  console.log(category,"category listing")

  const fetchCategory = () => {

    AxiosInterceptors.get(`${api_itemCategory}`, ApiHeader())
      .then(function (response) {
        console.log("item Categor", response.data.data);
        setCategory(response.data.data);
      })
      .catch(function (error) {
        console.log("errorrr.... ", error);
      });
  };
  
  const fetchSubCategory = (e) => {

    console.log(e?.target?.value)

    AxiosInterceptors.get(`${api_itemSubCategory}/${e?.target?.value}`, ApiHeader())
      .then(function (response) {
        console.log("item Categor", response.data.data);
        setSubCategory(response.data.data);
      })
      .catch(function (error) {
        console.log("errorrr.... ", error);
      });
  };
  
  const fetchBrand = () => {

    AxiosInterceptors.get(`${api_itemBrand}`, ApiHeader())
      .then(function (response) {
        console.log("item Categor", response.data.data);
        setBrand(response.data.data);
      })
      .catch(function (error) {
        console.log("errorrr.... ", error);
      });
  };
  
  
  const fetchProcessor = () => {

    AxiosInterceptors.get(`${api_fetchProcessor}`, ApiHeader())
      .then(function (response) {
        console.log("item Categor", response.data.data);
        setProcessor(response.data.data);
      })
      .catch(function (error) {
        console.log("errorrr.... ", error);
      });
  };
  
  const fetchRam = () => {

    AxiosInterceptors.get(`${api_fetchRam}`, ApiHeader())
      .then(function (response) {
        console.log("item Categor", response.data.data);
        setRamList(response.data.data);
      })
      .catch(function (error) {
        console.log("errorrr.... ", error);
      });
  };
  
  const fetchOperatingSystem = () => {

    AxiosInterceptors.get(`${api_fetchOperatingSystem}`, ApiHeader())
      .then(function (response) {
        console.log("item Categor", response.data.data);
        setOperatingSystem(response.data.data);
      })
      .catch(function (error) {
        console.log("errorrr.... ", error);
      });
  };
  
  const fetchRom = () => {

    AxiosInterceptors.get(`${api_fetchRom}`, ApiHeader())
      .then(function (response) {
        console.log("item Categor", response.data.data);
        setRomList(response.data.data);
      })
      .catch(function (error) {
        console.log("errorrr.... ", error);
      });
  };
  
  const fetchGraphics = () => {

    AxiosInterceptors.get(`${api_fetchGraphics}`, ApiHeader())
      .then(function (response) {
        console.log("item Categor", response.data.data);
        setGraphicsList(response.data.data);
      })
      .catch(function (error) {
        console.log("errorrr.... ", error);
      });
  };
  


  // submit form

  const submitForm = () => {
    console.log("data in form", formData);
    setisLoading(true);
    let url;
    let requestBody;

    url = api_addProcurement;
    requestBody = {
      category: formData?.itemcategory,
      subcategory: formData?.itemsubcategory,
      processor: formData?.processor,
      os: formData?.operatingsystem,
      brand: formData?.brand,
      ram: formData?.ram,
      rom: formData?.rom,
      graphics: formData?.graphics,
      other_description: formData?.other_description,
      quantity: Number(formData?.quantity),
      rate: Number(formData?.rate),
      total_rate: Number(formData?.totalRate),
    
    };

    // console.log(requestBody,"=======================>>>")

    AxiosInterceptors.post(`${url}`, requestBody, ApiHeader())
      .then(function (response) {
        console.log("response after data submitted", response?.data);
        setresponseScreen(response?.data);
        if (response?.data?.status === true) {
          setisLoading(false);
          notify(response?.data?.message, "success");
          setdeclarationStatus(false);

          // navigate('/tankerFormSubmitted')
        } else {
          setisLoading(false);
          setdeclarationStatus(false);
          const errorMsg = Object.keys(response?.data?.data);
          setErrRes(errorMsg);
          console.log(errorMsg, "====>>");
          notify(response?.data?.message, "error");
        }
      })
      .catch(function (error) {
        console.log("errorrr.... ", error);
        setdeclarationStatus(false);
      });

    // AxiosInterceptors.post(`${url}`, requestBody, ApiHeader())
    //     .then(function (response) {
    //         console.log('response after data submitted', response?.data?.message)

    //         if (response?.data?.status === true) {
    //             setisLoading(false)
    //             notify("submitted successfully", "success")
    //             navigate('/home')
    //         }
    //         else {
    //             setisLoading(false)
    //             notify(response?.data?.message, "error")
    //             navigate('/home')
    //         }
    //     })
    //     .catch(function (error) {
    //         console.log('errorrr.... ', error);

    //     })
  };

  // get details by to update
  // useEffect(() => {
  //   fetchDetailsById();
  // }, [props?.listId]);

  // const fetchDetailsById = () => {
  //   setisLoading(true);
  //   const requestBody = {
  //     applicationId: props?.listId,
  //   };
  //   console.log("request body category id", requestBody);
  //   AxiosInterceptors.post(
  //     `${api_getBookingDetailsById}`,
  //     requestBody,
  //     ApiHeader()
  //   )
  //     .then(function (response) {
  //       console.log("booking details by id", response.data);
  //       setlistDetails(response.data.data);
  //       setisLoading(false);
  //     })
  //     .catch(function (error) {
  //       console.log("errorrr.... ", error);
  //       setisLoading(false);
  //     });
  // };

  if (isLoading) {
    return (
      <>
        <BarLoader />
        <div className='min-h-screen'></div>
      </>
    );
  }

  // ══════════════════════════════║🔰Validating Booking Date 🔰║═══════════════════════════════════

  // const verifyDateForBookingTanker = (value) => {
  //   let currentDate = new Date();
  //   currentDate.setDate(currentDate.getDate() + 1);

  //   let userSetDate = new Date(value);

  //   // Convert both dates to UTC timestamps
  //   const currentTimestamp = Date.UTC(
  //     currentDate.getFullYear(),
  //     currentDate.getMonth(),
  //     currentDate.getDate()
  //   );
  //   const userTimestamp = Date.UTC(
  //     userSetDate.getFullYear(),
  //     userSetDate.getMonth(),
  //     userSetDate.getDate()
  //   );

  //   if (userTimestamp < currentTimestamp) {
  //     notify("Date must be 24 hours ahead of the current date", "error");
  //     formik.setFieldValue("cleaningDate", "");
  //     console.log("wrong time");
  //   } else {
  //     console.log("right time");
  //   }
  // };

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


    // {
    //   name == "itemcategory" &&
    //     formik.setFieldValue(
    //       "itemcategory",
    //       allowCharacterInput(value, formik.values.itemcategory, 100)
    //     );
    // }
    // {
    //   name == "brand" &&
    //     formik.setFieldValue(
    //       "brand",
    //       allowMailInput(value, formik.values.brand, 100)
    //     );
    // }
    // {
    //   name == "processor" &&
    //     formik.setFieldValue(
    //       "processor",
    //       allowMailInput(value, formik.values.processor, 100)
    //     );
    // }
    // {
    //   name == "ram" &&
    //     formik.setFieldValue(
    //       "ram",
    //       allowMailInput(value, formik.values.ram, 100)
    //     );
    // }
    // {
    //   name == "operatingsystem" &&
    //     formik.setFieldValue(
    //       "operatingsystem",
    //       allowMailInput(value, formik.values.operatingsystem, 100)
    //     );
    // }
    // {
    //   name == "Generation" &&
    //     formik.setFieldValue(
    //       "Generation",
    //       allowMailInput(value, formik.values.Generation, 100)
    //     );
    // }
    // {
    //   name == "rom" &&
    //     formik.setFieldValue(
    //       "rom",
    //       allowMailInput(value, formik.values.rom, 100)
    //     );
    // }
    // {
    //   name == "graphics" &&
    //     formik.setFieldValue(
    //       "graphics",
    //       allowMailInput(value, formik.values.graphics, 100)
    //     );
    // }
    // {
    //   name == "other_description" &&
    //     formik.setFieldValue(
    //       "other_description",
    //       allowMailInput(value, formik.values.other_description, 100)
    //     );
    // }
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

  // ══════════════════════════════║🔰 function to get location by ulb  🔰║═══════════════════════════════════
  // const fetchLocationListByUlb = (data) => {
  //   const requestBody = {
  //     isInUlb: data,
  //     ulbId,
  //   };
  //   console.log("request body category id", requestBody);
  //   AxiosInterceptors.post(
  //     `${api_locationListForSepticTank}`,
  //     requestBody,
  //     ApiHeader()
  //   )
  //     .then(function (response) {
  //       console.log("location list", response.data.data);
  //       setlocationList(response?.data?.data);
  //     })
  //     .catch(function (error) {
  //       console.log("errorrr.... ", error);
  //     });
  // };

  // console.log(category)


  // ══════════════════════════════║🔰responseScreen🔰║═══════════════════════════════════
  // if (responseScreen?.status == true) {
  //   return (
  //     <>
  //       <PreProcurementSubmittedScreen responseScreenData={responseScreen} />
  //     </>
  //   );
  // }

  if (isModalOpen) {
    return (
      <>
        <PreProcurementSubmittedScreen submitForm={submitForm} responseScreenData={formData} />
      </>
    );
  }
  
  const openCancelModal = () =>{
    setIsModalOpen2(true)
  }

  if (isModalOpen2) {
    return (
      <>
        <PreProcurementCancelScreen setIsModalOpen2={setIsModalOpen2}  />
      </>
    );
  }
  return (
    <>
      <div className={`${formStyle}`}>
        <form onSubmit={formik.handleSubmit} onChange={handleOnChange}>
          <div className=''>
            <div className=' grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 container mx-auto capitalize'>
              <div className='col-span-12  w-full mb-20'>
                <div className=' ml-4 p-4 mt-4'>
                  <h1 className={`${headingStyle} text-right`}>Pre Procurement Proposal</h1>
                  {/* <h1 className={`${labelStyle} `}>
                    Maintaining a healthy home: Confirming my septic tank
                    service.
                  </h1> */}
                </div>
                <div className='hidden md:block lg:block'>
                  <hr className='border w-full border-gray-200' />
                </div>

                <div className='p-12 -mt-4'>
                  {/* row 1 */}
                  <div class='valid-form flex flex-wrap flex-row -mx-4'>
                    
                    <div class='form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                      <label className={`${labelStyle} inline-block mb-2`}>
                        Item Category 
                        <span className='text-sm text-red-500'>
                          *
                        </span>{" "}
                      </label>
                      <select
                        {...formik.getFieldProps("itemcategory")}
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={(e) => {
                          formik.handleChange(e);
                          fetchSubCategory(e)
                        }}
                      >
                         <option selected>select</option>
                          {category?.map((items,index) => (
                            <option key={index} value={items?.id}>
                              {items?.name}
                            </option>
                          ))}
                      </select>
                      <p className='text-red-500 text-xs '>
                        {formik.touched.itemcategory && formik.errors.itemcategory
                          ? formik.errors.itemcategory
                          : null}
                      </p>
                    </div>

                    
                    <div class='form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                        <label className={`${labelStyle} inline-block mb-2`}>
                        Items Sub Category
                        <span className='text-sm text-red-500'>
                          *
                        </span>
                        </label>
                        <select
                          {...formik.getFieldProps("itemsubcategory")}
                          className={`${inputStyle} inline-block w-full relative`}
                          onChange={formik.handleChange}
                          
                        >
                          <option selected>select</option>
                          {subcategory?.length && subcategory?.map((items) => (
                            <option value={items?.id}>
                              {items?.name}
                            </option>
                          ))}
                        </select>
                        
                        <p className='text-red-500 text-xs '>
                          {formik.touched.itemsubcategory && formik.errors.itemsubcategory
                            ? formik.errors.itemsubcategory
                            : null}
                        </p>
                    </div>
                  
                  </div>
                  {/* row 2 */}
                  <div class='valid-form flex flex-wrap flex-row -mx-4'>
                    <div class='form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                      <label className={`${labelStyle} inline-block mb-2`}>
                      Brand
                      </label>

                      <select
                          {...formik.getFieldProps("brand")}
                          className={`${inputStyle} inline-block w-full relative`}
                          onChange={formik.handleChange}
                        >
                          <option selected>select</option>
                          {brand?.map((items) => (
                            <option value={items?.id}>
                              {items?.name}
                            </option>
                          ))}
                        </select>

                      <p className='text-red-500 text-xs '>
                        {errRes?.includes("mobile")
                          ? "Invalid Mobile Number"
                          : null &&
                            formik.touched.brand &&
                            formik.errors.brand
                          ? formik.errors.brand
                          : null}
                      </p>
                    </div>

                    <div class='form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                      <label className={`${labelStyle} inline-block mb-2`}>
                      Processor
                      </label>
                      <select
                          {...formik.getFieldProps("processor")}
                          className={`${inputStyle} inline-block w-full relative`}
                          onChange={formik.handleChange}
                        >
                          <option selected>select</option>
                          {processor?.map((items) => (
                            <option value={items?.id}>
                              {items?.name}
                            </option>
                          ))}
                        </select>
                      <p className='text-red-500 text-xs '>
                        {formik.touched.processor && formik.errors.processor
                          ? formik.errors.processor
                          : null}
                      </p>
                    </div>

                  </div>

                  {/* row 3 */}
                  <div class='valid-form flex flex-wrap flex-row -mx-4'>
                    
                    <div class='form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                      <label className={`${labelStyle} inline-block mb-2`}>
                      RAM
                      </label>
                      <select
                        {...formik.getFieldProps("ram")}
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={formik.handleChange}
                      >
                        <option selected>select</option>
                        {ramList?.map((items) => (
                          <option value={items?.id}>
                            {items?.capacity}
                          </option>
                        ))}
                      </select>
                      <p className='text-red-500 text-xs '>
                        {formik.touched.ram &&
                        formik.errors.ram
                          ? formik.errors.ram
                          : null}
                      </p>
                    </div>

                    <div class='form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                      <label className={`${labelStyle} inline-block mb-2`}>
                      Operating System
                      </label>
                      <select
                        {...formik.getFieldProps("operatingsystem")}
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={formik.handleChange}
                      >
                        <option selected>select</option>
                        {OperatingSystem?.map((items) => (
                          <option value={items?.id}>
                            {items?.name}
                          </option>
                        ))}
                      </select>
                      <p className='text-red-500 text-xs '>
                        {formik.touched.operatingsystem && formik.errors.operatingsystem
                          ? formik.errors.operatingsystem
                          : null}
                      </p>
                    </div>

                  </div>
                  {/* row 4 */}
                  <div class='valid-form flex flex-wrap flex-row -mx-4'>
                    
                    {/* <div class='form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                      <label className={`${labelStyle} inline-block mb-2`}>
                      Generation
                      </label>
                      <select
                        {...formik.getFieldProps("Generation")}
                        className={`${inputStyle} inline-block w-full relative`}
                      >
                        <option selected>select</option>
                        <option>one</option>
                        {locationList?.map((items) => (
                          <option value={items?.id}>{items?.Generation}</option>
                        ))}
                      </select>
                      <p className='text-red-500 text-xs '>
                        {formik.touched.Generation && formik.errors.Generation
                          ? formik.errors.Generation
                          : null}
                      </p>
                    </div> */}

                    <div class='form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                      <label className={`${labelStyle} inline-block mb-2`}>
                      ROM
                      </label>
                      <select
                        {...formik.getFieldProps("rom")}
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={formik.handleChange}
                      >
                        <option selected>select</option>
                        {romList?.map((items) => (
                          <option value={items?.id}>{items?.type}-{items?.capacity}</option>
                        ))}
                      </select>

                      <p className='text-red-500 text-xs '>
                        {formik.touched.rom &&
                        formik.errors.rom
                          ? formik.errors.rom
                          : null}
                      </p>
                      
                    </div>

                  </div>
                  {/* row 5 */}
                  <div class='valid-form flex flex-wrap flex-row -mx-4'>
                    
                    <div class='form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                      <label className={`${labelStyle} inline-block mb-2`}>
                      Graphics 
                      </label>
                      <select
                        {...formik.getFieldProps("graphics")}
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={formik.handleChange}
                      >
                        <option selected>select</option>
                        {graphicsList?.map((items) => (
                          <option value={items?.id}>{items?.name}-{items?.vram}</option>
                        ))}
                      </select>
                      <p className='text-red-500 text-xs '>
                        {formik.touched.graphics && formik.errors.graphics
                          ? formik.errors.graphics
                          : null}
                      </p>
                    </div>

                    <div class='form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                      <label className={`${labelStyle} inline-block mb-2`}>
                      Others Description
                      </label>
                      <input
                        type='text'
                        name='other_description'
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={formik.handleChange}
                        value={formik.values.other_description}
                      />

                      <p className='text-red-500 text-xs '>
                        {formik.touched.other_description &&
                        formik.errors.other_description
                          ? formik.errors.other_description
                          : null}
                      </p>
                      
                    </div>

                  </div>
                  {/* row 6 */}
                  <div class='valid-form flex flex-wrap flex-row -mx-4'>
                    
                    <div class='form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                      <label className={`${labelStyle} inline-block mb-2`}>
                      Quantity 
                      </label>
                      
                      <div className="flex space-x-5">
                          <input
                              type='number'
                              name='rate'
                              className={`${inputStyle} inline-block w-full relative`}
                              onChange={(e) => {
                                formik.handleChange(e);
                                calculateTotalRate();
                              }}
                              value={formik.values.rate}
                              placeholder="Rate"
                            />
                            <p>X</p>
                            <input
                              type='number'
                              name='quantity'
                              className={`${inputStyle} inline-block w-full relative`}
                              onChange={(e) => {
                                formik.handleChange(e);
                                calculateTotalRate();
                              }}
                              value={formik.values.quantity}
                              placeholder="Quantity"
                            />
                            <p>=</p>
                            <input
                              type='number'
                              name='totalRate'
                              className={`${inputStyle} inline-block w-full relative`}
                              // onChange={formik.handleChange}
                              value={formik.values.totalRate}
                              placeholder="Total Rate"
                              disabled
                            />
                      </div>
                      <p className='text-red-500 text-xs '>
                        {formik.touched.quantity && formik.errors.quantity
                          ? formik.errors.quantity
                          : null}
                      </p>
                    </div>

                    {/* <div class='form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                      <label className={`${labelStyle} inline-block mb-2`}>
                      Others Description
                      </label>
                      <input
                        type='text'
                        name='email'
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                      />

                      <p className='text-red-500 text-xs '>
                        {formik.touched.cleaningDate &&
                        formik.errors.cleaningDate
                          ? formik.errors.cleaningDate
                          : null}
                      </p>
                      <p className='text-red-500 text-xs mt-2'>
                        Duration must be more than 24 hours of current time
                      </p>
                    </div> */}

                  </div>

                </div>
                
                  <div className='float-right pb-16 mr-8 space-x-5'>
                    <button
                      // type='submit'
                      onClick={openCancelModal}
                      className={`bg-white px-5 py-2 text-black rounded leading-5 shadow-lg  hover:bg-[#1A4D8C] hover:text-white border-blue-900 border  mb-10`}
                    >
                      Cancel
                    </button>
                  {/* </div> */}
                
                  {/* <div className='pb-16 mr-8'> */}
                    <button
                      type='submit'
                      className={`bg-[#1A4D8C] border-blue-900 border hover:bg-[#4478b7] px-7 py-2 text-white font-semibold rounded leading-5 shadow-lg float-right mb-10`}
                    >
                      Save
                    </button>
                  </div>
                
              </div>
              
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddPreProcurement;
