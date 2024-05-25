//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash Alam
//    Version - 1.0
//    Date - 22/05/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - EditPreProcurement
//    DESCRIPTION - EditPreProcurement
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
import { contextVar } from '@/Components/context/contextVar'
import { useContext } from 'react'
import TitleBar from "@/Components/Pages/Others/TitleBar";
// import PreProcurementCancelScreen from "./PreProcurementCancelScreen";

// import { click } from "@testing-library/user-event/dist/click";
// import { C } from "dist/assets/index-1a86ca5c";

function EditPreProcurement(props) {
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
    api_fetchProcurementDADetailByIdinbox,
    api_editProcurement,
  } = ProjectApiList();

  const { setheartBeatCounter, settoggleBar, titleBarVisibility, titleText } = useContext(contextVar) 


  const currentDate = new Date().toISOString().split("T")[0];

  const [erroState, seterroState] = useState(false);
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

  const [category, setCategory] = useState();
  const [subcategory, setSubCategory] = useState();
  const [brand, setBrand] = useState();
  const [processor, setProcessor] = useState();
  const [ramList, setRamList] = useState();
  const [OperatingSystem, setOperatingSystem] = useState();
  const [romList, setRomList] = useState();
  const [graphicsList, setGraphicsList] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [formData, setFormData] = useState();
  const [applicationFullData, setapplicationFullData] = useState();
  const [categoryId, setCategoryId] = useState();
  const [categorySelected, setCategorySelected] = useState([]);
  

  console.log(applicationFullData);

  const { id } = useParams();

  console.log(id);

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


  console.log(applicationFullData);
  // intitial value
  const initialValues = {
    itemcategory: applicationFullData?.category?.id,
    itemsubcategory: applicationFullData?.subcategory?.id,
    brand: applicationFullData?.brand,
    processor: applicationFullData?.processor,
    ram: applicationFullData?.ram,
    operatingsystem: applicationFullData?.os,
    rom: applicationFullData?.rom,
    graphics: applicationFullData?.graphics,
    other_description: applicationFullData?.other_description,
    quantity: applicationFullData?.quantity,
    rate: applicationFullData?.rate,

    //Furniture values
    number_of_items: applicationFullData?.number_of_items,
    brand: applicationFullData?.brand,
    colour: applicationFullData?.colour,
    material: applicationFullData?.material,
    product_dimensions: applicationFullData?.product_dimensions,
    room_type: applicationFullData?.room_type,
    included_components: applicationFullData?.included_components,
    size: applicationFullData?.size,
    
    //CleaningSupplies
    number_of_items: applicationFullData?.number_of_items,
    brand: applicationFullData?.brand,
    colour: applicationFullData?.colour,
    recommendedUsedProducts: applicationFullData?.recommendedUsedProducts,
    handle_material: applicationFullData?.handle_material,
    bristle: applicationFullData?.bristle,
    
    // safetySecurity
    number_of_items: applicationFullData?.number_of_items,
    brand: applicationFullData?.brand,
    weight: applicationFullData?.weight,
    recommendedUsedProducts: applicationFullData?.recommendedUsedProducts,
    
    // maintenanceAndRepair
    number_of_items: applicationFullData?.number_of_items,
    brand: applicationFullData?.brand,
    colour: applicationFullData?.colour,
    maintenamce_material: applicationFullData?.maintenamce_material,
    items_dimensions: applicationFullData?.items_dimensions,
    items_weight: applicationFullData?.items_weight,
    
    // uniform
    number_of_items: applicationFullData?.number_of_items,
    brand: applicationFullData?.brand,
    colour: applicationFullData?.colour,
    maintenamce_material: applicationFullData?.maintenamce_material,
    
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

  const furniture = [
    { label: "Number of Items", name: "number_of_items", type:"number" },
    { label: "Brand", name: "brand", type:"text" },
    { label: "Colour", name: "colour", type:"text" },
    { label: "Material", name: "material", type:"text" },
    { label: "Product Dimensions", name: "product_dimensions", type:"text" },
    { label: "Room Type", name: "room_type", type:"text" },
    { label: "Included Components", name: "included_components", type:"text" },
    { label: "Size", name: "size", type:"number" },
  ];

  const cleaningSupplies = [
    { label: "Number of Items", name: "number_of_items", type:"number" },
    { label: "Brand", name: "brand", type:"text" },
    { label: "Colour", name: "colour", type:"text" },
    { label: "Recommended Uses For Product", name: "recomended_uses", type:"text" },
    { label: "Handle Material	", name: "material", type:"text" },
    { label: "Bristle", name: "bristle", type:"text" },
  ];

  const safetySecurity = [
    { label: "Number of Items", name: "number_of_items", type:"number" },
    { label: "Brand", name: "brand", type:"text" },
    { label: "Weight", name: "weight", type:"number" },
    { label: "Dimension", name: "dimension", type:"text" },
  ];

  const maintenanceAndRepair = [
    { label: "Number of Items", name: "number_of_items", type:"number" },
    { label: "Brand", name: "brand", type:"text" },
    { label: "Colour", name: "colour", type:"text" },
    { label: "Material	", name: "material", type:"text" },
    { label: "Dimension", name: "dimension", type:"text" },
    { label: "Items Weight", name: "weight", type:"number" },
  ];

  const uniform = [
    { label: "Number of Items", name: "number_of_items", type:"number" },
    { label: "Brand", name: "brand", type:"text" },
    { label: "Colour", name: "colour", type:"text" },
    { label: "Material	", name: "material", type:"text" },
  ];

  // ══════════════════════════════║🔰calculate the total rate🔰║═══════════════════════════════════
  const calculateTotalRate = () => {
    const rate = Number(formik.values.rate) || 0;
    const quantity = Number(formik.values.quantity) || 0;
    const totalRate = rate * quantity;
    formik.setFieldValue("totalRate", totalRate);
    console.log(totalRate, "tot Rate");
  };

  useEffect(() => {
    const ulbId = localStorage.getItem("ulbId");
    setulbId(ulbId);

    fetchCategory();
    console.log(categoryId,"categoryId======================>>>")
    getApplicationDetail();
    fetchBrand();
    fetchProcessor();
    fetchRam();
    fetchOperatingSystem();
    fetchRom();
    fetchGraphics();

   
  //  fetchSubCategory(categoryId);
  }, [ulbData]);

  useEffect(() => {
    calculateTotalRate();
  }, [formik.values.quantity, formik.values.rate]);

  // ══════════════════════════════║🔰 function to get ward list  🔰║═══════════════════════════════════

  console.log(category, "category listing");

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

  const fetchSubCategory = (value) => {
    console.log(value);

    AxiosInterceptors.get(
      `${api_itemSubCategory}/${value}`,
      ApiHeader()
    )
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

  const getApplicationDetail = () => {
    let url = api_fetchProcurementDADetailByIdinbox;

    seterroState(false);
    setisLoading(true);

    // if(page == 'inbox'){
    //   url = api_fetchProcurementDADetailByIdinbox
    // }
    // if(page == 'outbox'){
    //   url = api_fetchProcurementDADetailByIdOutbox
    // }

    AxiosInterceptors.get(`${url}/${id}`, {}, ApiHeader())
      .then(function (response) {
        console.log("view application full details ...", response?.data?.data);
        // console.log("view application full details ...", response?.data?.data?.category?.name);
        if (response?.data?.status) {
          const categoryName = response.data?.data?.category?.name;
          fetchSubCategory(response.data?.data?.category?.id)
          setCategoryId(response.data?.data?.category?.id)
          console.log(categoryName,"categoryName==============>>>>>")
          setapplicationFullData(response?.data?.data);
          // setTableData(response?.data?.data?.tran_dtls);
          categoryName == "Furniture" && setCategorySelected(furniture);
          categoryName == "Cleaning Supplies" && setCategorySelected(cleaningSupplies);
          categoryName == "Safety and Security" && setCategorySelected(safetySecurity);
          categoryName == "Uniforms" && setCategorySelected(uniform);
          categoryName == "Maintainance and Repaire" && setCategorySelected(maintenanceAndRepair);
          
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

  // submit form

  const submitForm = () => {
    console.log("data in form", applicationFullData?.order_no);
    setisLoading(true);
    let url;
    let requestBody;

    url = api_editProcurement;
    requestBody = {
      id: applicationFullData?.id,
      order_no: applicationFullData?.order_no,
      
      // category: formData?.itemcategory,
      // subcategory: formData?.itemsubcategory,
      // processor: formData?.processor,
      // os: formData?.operatingsystem,
      // brand: formData?.brand,
      // ram: formData?.ram,
      // rom: formData?.rom,
      // graphics: formData?.graphics,
      // other_description: formData?.other_description,
      // quantity: Number(formData?.quantity),
      // rate: Number(formData?.rate),
      // total_rate: Number(formData?.totalRate),

      category: formData?.itemcategory,
      subcategory: formData?.itemsubcategory,

      processor: formData?.processor,
      ram: formData?.ram,
      os: formData?.operatingsystem,
      rom: formData?.rom,
      graphics: formData?.graphics,
      
      
      brand: formData?.brand,
      colour: formData?.colour,
      material: formData?.material,
      dimension: formData?.dimension,
      room_type: formData?.room_type,
      included_components: formData?.included_components,
      size: formData?.size,
      recomended_uses: formData?.recomended_uses,
      bristle: formData?.bristle,
      weight: formData?.weight,
      number_of_items: Number(formData?.number_of_items),
      other_description: formData?.other_description,
      
      rate: Number(formData?.rate),
      quantity: Number(formData?.quantity),
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
        <div className="min-h-screen"></div>
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
    {
      name == "colour" &&
        formik.setFieldValue(
          "colour",
          allowCharacterInput(value, formik.values.colour,50)
        );
    }
    {
      name == "material" &&
        formik.setFieldValue(
          "material",
          allowCharacterInput(value, formik.values.material,50)
        );
    }
    {
      name == "product_dimensions" &&
        formik.setFieldValue(
          "product_dimensions",
          allowCharacterNumberInput(value, formik.values.product_dimensions,50)
        );
    }
    {
      name == "room_type" &&
        formik.setFieldValue(
          "room_type",
          allowCharacterInput(value, formik.values.room_type,50)
        );
      }
    {
      name == "included_components" &&
        formik.setFieldValue(
          "included_components",
          allowCharacterInput(value, formik.values.included_components,50)
        );
    }
    {
      name == "recomended_uses" &&
        formik.setFieldValue(
          "recomended_uses",
          allowCharacterInput(value, formik.values.recomended_uses,50)
        );
    }
    {
      name == "bristle" &&
        formik.setFieldValue(
          "bristle",
          allowCharacterInput(value, formik.values.bristle,50)
        );
    }
    {
      name == "size" &&
        formik.setFieldValue(
          "size",
          allowNumberInput(value, formik.values.size, 100)
        );
    }
    {
      name == "weight" &&
        formik.setFieldValue(
          "weight",
          allowNumberInput(value, formik.values.weight, 100)
        );
    }
    {
      name == "dimension" &&
        formik.setFieldValue(
          "dimension",
          allowNumberInput(value, formik.values.dimension, 100)
        );
    }
    {
      name == "number_of_items" &&
        formik.setFieldValue(
          "number_of_items",
          allowNumberInput(value, formik.values.number_of_items,100)
        );
    }
    {
      name == "brand" &&
        formik.setFieldValue(
          "brand",
          allowCharacterNumberInput(value, formik.values.brand,50)
        );
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
        <PreProcurementSubmittedScreen
          submitForm={submitForm}
          responseScreenData={formData}
        />
      </>
    );
  }

  const openCancelModal = () => {
    setIsModalOpen2(true);
  };

  // if (isModalOpen2) {
  //   return (
  //     <>
  //       <PreProcurementCancelScreen setIsModalOpen2={setIsModalOpen2}  />
  //     </>
  //   );
  // }
  return (
    <>

    <div className="">
    <TitleBar titleBarVisibility={titleBarVisibility} titleText={"Edit Pre Procurement"} />
    </div>
      <div className={`${formStyle} border border-blue-500 mt-7 shadow-xl`}>
        <form onSubmit={formik.handleSubmit} onChange={handleOnChange}>
          <div className="">
            <div className=" grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 container mx-auto capitalize">
              <div className="col-span-12  w-full mb-20">
                <div className=" ml-4 p-4 mt-4">
                  <h1 className={`${headingStyle} text-right`}>
                    Pre Procurement Proposal
                  </h1>
                  {/* <h1 className={`${labelStyle} `}>
                    Maintaining a healthy home: Confirming my septic tank
                    service.
                  </h1> */}
                </div>
                <div className="hidden md:block lg:block">
                  <hr className="border w-full border-gray-200" />
                </div>

                <div className="p-12 -mt-4 valid-form flex flex-wrap flex-row -mx-4">
                  <div class="form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4">
                    <label className={`${labelStyle} inline-block mb-2`}>
                      Item Category
                      <span className="text-sm text-red-500">*</span>{" "}
                    </label>
                    <select
                      {...formik.getFieldProps("itemcategory")}
                      className={`${inputStyle} inline-block w-full relative`}
                      onChange={(e) => {
                        formik.handleChange(e);
                        fetchSubCategory(e.target.value);
                        
                      }}
                      disabled="true"
                    >
                      {category?.map((items, index) => (
                        <option key={index} value={items?.id}>
                          {items?.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-red-500 text-xs ">
                      {formik.touched.itemcategory && formik.errors.itemcategory
                        ? formik.errors.itemcategory
                        : null}
                    </p>
                  </div>

                  <div class="form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4">
                    <label className={`${labelStyle} inline-block mb-2`}>
                      Items Sub Category
                      <span className="text-sm text-red-500">*</span>
                    </label>
                    <select
                      {...formik.getFieldProps("itemsubcategory")}
                      className={`${inputStyle} inline-block w-full relative`}
                      onChange={formik.handleChange}
                    >
                      {/* <option selected>select</option> */}
                      {subcategory?.length &&
                        subcategory?.map((items) => (
                          <option value={items?.id}>{items?.name}</option>
                        ))}
                    </select>

                    <p className="text-red-500 text-xs ">
                      {formik.touched.itemsubcategory &&
                      formik.errors.itemsubcategory
                        ? formik.errors.itemsubcategory
                        : null}
                    </p>
                  </div>

{console.log(categorySelected,"catego===========sel")}
                  {categorySelected?.map((obj) => (
                    <div className=" flex flex-wrap w-1/2">
                      <div class="px-4 w-full mb-4">
                        <label className={`${labelStyle} inline-block mb-2`}>
                          {obj.label}
                        </label>

                        <input
                          type="text"
                          name={obj.name}
                          {...formik.getFieldProps(obj.name)}
                          className={`${inputStyle} inline-block w-full relative`}
                          onChange={formik.handleChange}
                          value={formik.values[obj.name]}
                        />

                        <p className="text-red-500 text-xs ">
                          {formik.touched.number_of_items &&
                          formik.errors.number_of_items
                            ? formik.errors.number_of_items
                            : null}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* </div> */}
                  {/* row 2 */}
                  {/* <div class='valid-form flex flex-wrap flex-row -mx-4'>
                    <div class='form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                      <label className={`${labelStyle} inline-block mb-2`}>
                      Brand
                      </label>

                      <select
                          {...formik.getFieldProps("brand")}
                          className={`${inputStyle} inline-block w-full relative`}
                          onChange={formik.handleChange}
                        >
                          
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

                  </div> */}

                  {/* row 3 */}
                  {/* <div class='valid-form flex flex-wrap flex-row -mx-4'>
                    
                    <div class='form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                      <label className={`${labelStyle} inline-block mb-2`}>
                      RAM
                      </label>
                      <select
                        {...formik.getFieldProps("ram")}
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={formik.handleChange}
                      >
                        
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

                  </div> */}

                  {/* row 4 */}
                  {/* <div class='valid-form flex flex-wrap flex-row -mx-4'>
                    
                     <div class='form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                      <label className={`${labelStyle} inline-block mb-2`}>
                      Graphics 
                      </label>
                      <select
                        {...formik.getFieldProps("graphics")}
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={formik.handleChange}
                      >
                        
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
                      ROM
                      </label>
                      <select
                        {...formik.getFieldProps("rom")}
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={formik.handleChange}
                      >
                        
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

                  </div> */}
                  {/* row 5 */}
                  {/* <div class='valid-form flex flex-wrap flex-row -mx-4'>
                    
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

                  </div> */}
                  {/* row 6 */}

                  <div class="form-group flex-shrink max-w-full px-4 w-full md:w-full mb-4 ">
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
                  </div>

                  <div class="valid-form flex flex-wrap flex-row ">
                    <div class="form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4">
                      <label className={`${labelStyle} inline-block mb-2`}>
                        Quantity
                      </label>

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
                          placeholder="Rate"
                        />
                        <p>X</p>
                        <input
                          type="number"
                          name="quantity"
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
                          type="number"
                          name="totalRate"
                          className={`${inputStyle} inline-block w-full relative`}
                          value={formik.values.totalRate}
                          placeholder="Total Rate"
                          disabled
                        />
                      </div>
                      <p className="text-red-500 text-xs ">
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

                <div className="float-right mr-8 space-x-5">
                  <button
                    // type='submit'
                    onClick={openCancelModal}
                    className={`bg-white px-5 py-2 text-black rounded leading-5 shadow-lg  hover:bg-[#4338CA] hover:text-white border-blue-900 border  `}
                  >
                    Cancel
                  </button>
                  {/* </div> */}

                  {/* <div className='pb-16 mr-8'> */}
                  <button
                    type="submit"
                    className={`bg-[#4338CA] border-blue-900 border hover:bg-[#393287] px-7 py-2 text-white  rounded leading-5 shadow-lg float-right`}
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

export default EditPreProcurement;
