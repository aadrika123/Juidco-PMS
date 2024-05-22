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
import SuccessModal from "./SuccessModal";
// import { onChange } from "react-toastify/dist/core/store";

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
  const [successModal, setSuccessModal] = useState(false)
  const [formData, setFormData] = useState();
const [categoryName, setCategoryName] = useState();
const [categorySelected,setCategorySelected] = useState([]);
    const [orderNo, setOrderNo] = useState();

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
    itemcategory: yup.string().required("item category is required"),
    itemsubcategory: yup.string().required("item subcategory is required"),
    // fieldRequired: yup.string().required("This Field is required"),
    // brand: yup.string().required("brand is required"),

    // processor: yup.string().required("processor is required"),
    // ram: yup.string().required("ram is required"),
    // operatingsystem: yup.string().required("operatingsystem is required"),
    // rom: yup.string().required("rom is required"),
    // graphics: yup.string().required("graphics is required"),
    
    
    // colour: yup.string().required("Color is required"),
    // material: yup.string().required("Material  aterial is required"),
    // dimension: yup.string().required("Dimension  aterial is required"),
    // room_type: yup.string().required("Room type  aterial is required"),
    // included_components: yup.string().required("Included components is required"),
    // size: yup.string().required("Size is required"),
    // recomended_uses: yup.string().required("Recomended_uses is required"),
    // bristle: yup.string().required("Bristle is required"),
    // weight: yup.string().required("Weight is required"),

    // number_of_items: yup.string().required("No of items is required"),
    
    // number_of_items: yup.string().when("itemcategory", {
    //   is: "",
    //   then: yup.string().required("Must enter email address")
    // }),


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
    validationSchema,
  });

  const furniture = [
    { label: "Number of Items", name: "number_of_items" },
    { label: "Brand", name: "brand" },
    { label: "Colour", name: "colour" },
    { label: "Material", name: "material" },
    { label: "Product Dimensions", name: "product_dimensions" },
    { label: "Room Type", name: "room_type" },
    { label: "Included Components", name: "included_components" },
    { label: "Size", name: "size" },
  
  ];

  const cleaningSupplies = [
    { label: "Number of Items", name: "number_of_items" },
    { label: "Brand", name: "brand" },
    { label: "Colour", name: "colour" },
    { label: "Recommended Uses For Product", name: "recomended_uses" },
    { label: "Handle Material	", name: "material" },
    { label: "Bristle", name: "bristle" },
   
  ];

  const safetySecurity = [
    { label: "Number of Items", name: "number_of_items" },
    { label: "Brand", name: "brand" },
    { label: "Weight", name: "weight" },
    { label: "Dimension", name: "dimension" },

  ];

  const maintenanceAndRepair = [
    { label: "Number of Items", name: "number_of_items" },
    { label: "Brand", name: "brand" },
    { label: "Colour", name: "colour" },
    { label: "Material	", name: "material" },
    { label: "Dimension", name: "dimension" },
    { label: "Items Weight", name: "weight" },

  ];
  
  const uniform = [
    { label: "Number of Items", name: "number_of_items" },
    { label: "Brand", name: "brand" },
    { label: "Colour", name: "colour" },
    { label: "Material	", name: "material" },

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
    fetchProcessor();

    fetchCategory();
    fetchSubCategory();
    fetchBrand();
    fetchRam();
    fetchOperatingSystem();
    fetchRom();
    fetchGraphics();

    calculateTotalRate();
  }, [ulbData, formik.values.quantity, formik.values.rate]);

  // ══════════════════════════════║🔰 function to get ward list  🔰║═══════════════════════════════════

  // console.log(category, "category listing");

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
    console.log(e?.target?.value);

    AxiosInterceptors.get(
      `${api_itemSubCategory}/${e?.target?.value}`,
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

    console.log(requestBody,"=======================>>>")

    AxiosInterceptors.post(`${url}`, requestBody, ApiHeader())
      .then(function (response) {
        console.log("response after data submitted", response?.data);
        console.log("response after data submitted", response?.data?.order_no);
        setresponseScreen(response?.data);
        if (response?.data?.status === true) {
          setisLoading(false);
          setSuccessModal(true)
          notify(response?.data?.message, "success");
          setdeclarationStatus(false);
          setOrderNo(response?.data?.order_no)

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
  };

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

  if (isModalOpen) {
    return (
      <>
        <PreProcurementSubmittedScreen
          submitForm={submitForm}
          responseScreenData={formData}
          setIsModalOpen={setIsModalOpen}
        />
      </>
    );
  }
  
  if (successModal) {
    return (
      <>
        <SuccessModal
          successModal={successModal}
          setSuccessModal={setSuccessModal}
          orderNo={orderNo}
          // applicationId={props?.responseScreenData?.data?.applicationId}
        />
        
      </>
    );
  }

  

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
  return (
    <>
      <div className={`${formStyle}`}>
        <form onSubmit={formik.handleSubmit} onChange={handleOnChange}>
          <div className="">
            <div className=" grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 container mx-auto capitalize">
              <div className="col-span-12  w-full mb-20">
                <div className=" ml-4 p-2 mt-4">
                  <h1 className={`${headingStyle} text-left pb-5 pl-6`}>
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
                      <span className="text-xl text-red-500 pl-1">*</span>{" "}
                    </label>
                    <select
                      {...formik.getFieldProps("itemcategory")}
                      className={`${inputStyle} inline-block w-full relative`}
                      onChange={(e) => {
                        formik.handleChange(e);
                        fetchSubCategory(e);
                        e.target.value ==
                          "e37b33c2-d812-45b1-8e89-f2073ffba2fb" &&
                          setCategorySelected(furniture);
                        e.target.value ==
                          "70824560-2d75-4a9c-b9bd-e3234675c7c2" &&
                          setCategorySelected(cleaningSupplies);
                        e.target.value ==
                          "459df96d-27ad-40a0-86cb-2241043a2c77" &&
                          setCategorySelected(maintenanceAndRepair);
                        e.target.value ==
                          "2c7f0309-d99a-46a5-a07d-2263c6682e77" &&
                          setCategorySelected(safetySecurity);
                        e.target.value ==
                          "f14fb5da-0565-4e04-b98e-fb96cb06135c" &&
                          setCategorySelected(uniform);

                        // console.log(e.target.value, "---------------->");
                      }}
                    >
                      <option selected>select</option>
                      
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
                      <span className="text-xl text-red-500 pl-1">*</span>
                    </label>
                    <select
                      {...formik.getFieldProps("itemsubcategory")}
                      className={`${inputStyle} inline-block w-full relative`}
                      onChange={formik.handleChange}
                    >
                      <option selected>select</option>
                     
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

                  {categorySelected?.map((obj) => (
                    
                    <div className=" flex flex-wrap w-1/2">
                      <div class="px-4 w-full mb-4">
                        <label className={`${labelStyle} inline-block mb-2`}>
                          {obj.label}
                        </label>

                        <input
                          type="text"
                          name={obj.name}
                          className={`${inputStyle} inline-block w-full relative`}
                          onChange={formik.handleChange}
                          value={formik.values[obj.name]}
                        />

                        <p className="text-red-500 text-xs ">
                          {formik.touched[obj.name] &&
                          formik.errors[obj.name]
                            ? formik.errors[obj.name]
                            : null}
                        </p>
                      </div>
                    </div>
                  ))}


                  <div class="form-group flex-shrink max-w-full px-4 w-full md:w-full mb-4">
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
                </div>

                <div class="valid-form flex flex-wrap flex-row mx-8">
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
                        // onChange={formik.handleChange}
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

                  
                </div>

                <div className="float-right pb-16 mr-8 space-x-5">
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
                    type="submit"
                    className={`bg-[#4338CA] border-blue-900 border hover:bg-[#4478b7] px-7 py-2 text-white font-semibold rounded leading-5 shadow-lg float-right mb-10`}
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
