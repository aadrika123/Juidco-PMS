//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash alam
//    Version - 1.0
//    Date - 21/05/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - AddPreProcurement
//    DESCRIPTION - AddPreProcurement
//////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import ThemeStyle from "@/Components/Common/ThemeStyle";
import { useFormik } from "formik";

import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ApiHeader from "@/Components/api/ApiHeader";
import { ToastContainer, toast } from "react-toastify";
import BarLoader from "@/Components/Common/Loaders/BarLoader";
import PreProcurementSubmittedScreen from "./PreProcurementSubmittedScreen";
import * as yup from "yup";
import {
  allowCharacterInput,
  allowNumberMultiplyInput,
  allowNumberInput,
  allowCharacterNumberInput,
} from "@/Components/Common/PowerUps/PowerupFunctions";
import ProjectApiList from "@/Components/api/ProjectApiList";
import PreProcurementCancelScreen from "./PreProcurementCancelScreen";
import SuccessModal from "./SuccessModal";
import { contextVar } from "@/Components/context/contextVar";
import { useContext } from "react";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";

function AddPreProcurement(props) {
  const { inputStyle, labelStyle, headingStyle, formStyle } = ThemeStyle();

  const { titleBarVisibility } = useContext(contextVar);

  const navigate = useNavigate();

  // const notify = () => toast("Successfully Submitted ");

  const {
    api_addProcurement,
    api_itemCategory,
    api_itemSubCategory,
    api_itemBrand,
  } = ProjectApiList();

  const [isLoading, setisLoading] = useState(false);

  const [responseScreen, setresponseScreen] = useState();
  const [ulbData, setulbData] = useState();
  const [ulbAreaVal, setulbAreaVal] = useState();
  const [errRes, setErrRes] = useState();
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
  const [successModal, setSuccessModal] = useState(false);
  const [formData, setFormData] = useState();
  const [categorySelected, setCategorySelected] = useState([]);
  const [procurement_no, setProcurement_no] = useState();
  const [otherCategory, setOtherCategory] = useState();

  console.log(otherCategory, "OT");

  // ══════════════════════════════║🔰 form submission declaration 🔰║═══════════════════════════════════
  const [declarationStatus, setdeclarationStatus] = useState();
  const handleDeclaration = () => {
    setdeclarationStatus((prev) => !prev);
    console.log(declarationStatus, "declarationStatus=============");
  };

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
    brand: yup.string().required("brand is required"),
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

    description: yup.string().required("Other description is required"),
    rate: yup.number().required("Rate is required"),
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
    description: "",
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
    dimension: "",

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

  // =========================================================

  const furniture = [
    { label: "Number of Items", name: "number_of_items", type: "number" },
    { label: "Brand", name: "brand", type: "text" },
    { label: "Colour", name: "colour", type: "text" },
    { label: "Material", name: "material", type: "text" },
    { label: "Product Dimensions", name: "product_dimensions", type: "text" },
    { label: "Room Type", name: "room_type", type: "text" },
    { label: "Included Components", name: "included_components", type: "text" },
    { label: "Size", name: "size", type: "text" },
  ];

  const cleaningSupplies = [
    { label: "Number of Items", name: "number_of_items", type: "number" },
    { label: "Brand", name: "brand", type: "text" },
    { label: "Colour", name: "colour", type: "text" },
    {
      label: "Recommended Uses For Product",
      name: "recomended_uses",
      type: "text",
    },
    { label: "Handle Material	", name: "material", type: "text" },
    { label: "Bristle", name: "bristle", type: "text" },
  ];

  const safetySecurity = [
    { label: "Number of Items", name: "number_of_items", type: "number" },
    { label: "Brand", name: "brand", type: "text" },
    { label: "Weight", name: "weight", type: "number" },
    { label: "Dimension", name: "dimension", type: "text" },
  ];

  const maintenanceAndRepair = [
    { label: "Number of Items", name: "number_of_items", type: "number" },
    { label: "Brand", name: "brand", type: "text" },
    { label: "Colour", name: "colour", type: "text" },
    { label: "Material	", name: "material", type: "text" },
    { label: "Dimension", name: "dimension", type: "text" },
    { label: "Items Weight", name: "weight", type: "number" },
  ];

  const uniform = [
    { label: "Number of Items", name: "number_of_items", type: "number" },
    { label: "Brand", name: "brand", type: "text" },
    { label: "Colour", name: "colour", type: "text" },
    { label: "Material	", name: "material", type: "text" },
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

    calculateTotalRate();
  }, [ulbData, formik.values.quantity, formik.values.rate]);

  // ══════════════════════════════║🔰 function to get ward list  🔰║═══════════════════════════════════

  const fetchCategory = () => {
    AxiosInterceptors.get(`${api_itemCategory}`, ApiHeader())
      .then(function (response) {
        setCategory(response.data.data);
      })
      .catch(function (error) {
        toast.error("Something went wrong");
      });
  };

  const fetchSubCategory = (e) => {
    // console.log(e?.target?.value,"Subcategory");

    AxiosInterceptors.get(
      `${api_itemSubCategory}/${e?.target?.value}`,
      ApiHeader()
    )
      .then(function (response) {
        setSubCategory(response.data.data);
      })
      .catch(function (error) {
        toast.error("Something went wrong");
      });
  };

  const fetchBrand = (value) => {
    AxiosInterceptors.get(`${api_itemBrand}/${value}`, ApiHeader())
      .then(function (response) {
        setBrand(response.data.data);
      })
      .catch(function (error) {
        toast.error("Something went wrong");
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
      ulb_id: ulbId,
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
      weight: String(formData?.weight),
      number_of_items: Number(formData?.number_of_items),
      description: formData?.description,

      rate: Number(formData?.rate),
      quantity: Number(formData?.quantity),
      total_rate: Number(formData?.totalRate),
    };

    AxiosInterceptors.post(`${url}`, requestBody, ApiHeader())
      .then(function (response) {
        setresponseScreen(response?.data);
        if (response?.data?.status === true) {
          setisLoading(false);
          setSuccessModal(true);
          notify(response?.data?.message, "success");
          setdeclarationStatus(false);
          setProcurement_no(response?.data?.procurement_no);

          // navigate("/sr-inventory-proposal");
        } else {
          setisLoading(false);
          setdeclarationStatus(false);
          notify(response?.data?.message, "error");
          navigate("/sr-inventory-proposal");
        }
      })
      .catch(function (error) {
        setisLoading(false);
        notify("Something went wrong!");
        setdeclarationStatus(false);
        navigate("/sr-inventory-proposal");
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

  const handleOnChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    {
      name == "cleaningDate" && verifyDateForBookingTanker(value);
    }
    {
      name == "itemsubcategory" && fetchBrand(value);
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
          allowCharacterInput(value, formik.values.colour, 50)
        );
    }
    {
      name == "material" &&
        formik.setFieldValue(
          "material",
          allowCharacterInput(value, formik.values.material, 50)
        );
    }
    {
      name == "product_dimensions" &&
        formik.setFieldValue(
          "product_dimensions",
          allowCharacterNumberInput(value, formik.values.product_dimensions, 50)
        );
    }
    {
      name == "room_type" &&
        formik.setFieldValue(
          "room_type",
          allowCharacterInput(value, formik.values.room_type, 50)
        );
    }
    {
      name == "included_components" &&
        formik.setFieldValue(
          "included_components",
          allowCharacterInput(value, formik.values.included_components, 50)
        );
    }
    {
      name == "recomended_uses" &&
        formik.setFieldValue(
          "recomended_uses",
          allowCharacterInput(value, formik.values.recomended_uses, 50)
        );
    }
    {
      name == "bristle" &&
        formik.setFieldValue(
          "bristle",
          allowCharacterInput(value, formik.values.bristle, 50)
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
          allowNumberMultiplyInput(value, formik.values.dimension, 100)
        );
    }
    {
      name == "number_of_items" &&
        formik.setFieldValue(
          "number_of_items",
          allowNumberInput(value, formik.values.number_of_items, 100)
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
          procurement_no={procurement_no}
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

  // console.log(object)
  return (
    <>
      {/* <ToastContainer position='top-right' autoClose={3000} /> */}

      <div className="">
        <TitleBar
          titleBarVisibility={titleBarVisibility}
          titleText={"Pre Procurement Proposal"}
        />
      </div>

      <div className={`${formStyle} border border-blue-500 mt-6 shadow-lg`}>
        <form onSubmit={formik.handleSubmit} onChange={handleOnChange}>
          <div className="">
            <div className=" grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 container mx-auto capitalize">
              <div className="col-span-12  w-full mb-20">
                <div className=" ml-4 p-2">
                  <h1 className={`${headingStyle} text-right pb-5 p-6`}>
                    Add Pre Procurement
                  </h1>
                </div>
                <div className="hidden md:block lg:block">
                  <hr className="border w-full border-gray-200" />
                </div>

                <div className="p-12 -mt-4 valid-form flex flex-wrap flex-row -mx-4">
                  <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4">
                    <label className={`${labelStyle} inline-block mb-2`}>
                      Item Category
                      <span className="text-xl text-red-500 pl-1">*</span>{" "}
                    </label>
                    <select
                      {...formik.getFieldProps("itemcategory")}
                      className={`${inputStyle} inline-block w-full relative`}
                      onChange={(e) => {
                        formik.handleChange(e);
                        setOtherCategory(e.target.value);
                        console.log(e.target.value, "===========>");

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
                      <option defaultValue={"select"}>select</option>

                      {category?.map((items, index) => (
                        <option key={index} value={items?.id}>
                          {items?.name}
                        </option>
                      ))}
                      <option>others</option>
                    </select>
                    <p className="text-red-500 text-xs ">
                      {formik.touched.itemcategory && formik.errors.itemcategory
                        ? formik.errors.itemcategory
                        : null}
                    </p>
                  </div>

                  <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4">
                      <label className={`${labelStyle} inline-block mb-2`}>
                        Items Sub Category
                        <span className="text-xl text-red-500 pl-1">*</span>
                      </label>
                      <select
                        {...formik.getFieldProps("itemsubcategory")}
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={formik.handleChange}
                      >
                        <option defaultValue={"select"}>select</option>

                        {subcategory?.length &&
                          subcategory?.map((items) => (
                            <option key={items?.id} value={items?.id}>
                              {items?.name}
                            </option>
                          ))}
                      </select>

                      <p className="text-red-500 text-xs ">
                        {formik.touched.itemsubcategory &&
                        formik.errors.itemsubcategory
                          ? formik.errors.itemsubcategory
                          : null}
                      </p>
                    </div>

                  {/* {otherCategory == "others" ? (
                    <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4">
                      <label className={`${labelStyle} inline-block mb-2`}>
                        Items Sub Category
                        <span className="text-xl text-red-500 pl-1">*</span>
                      </label>
                      <input
                        type="text"
                        name="itemsubcategory"
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={formik.handleChange}
                        value={formik.values.itemsubcategory}
                      />

                      <p className="text-red-500 text-xs ">
                        {formik.touched.itemsubcategory &&
                        formik.errors.itemsubcategory
                          ? formik.errors.itemsubcategory
                          : null}
                      </p>
                    </div>
                  ) : (
                    <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4">
                      <label className={`${labelStyle} inline-block mb-2`}>
                        Items Sub Category
                        <span className="text-xl text-red-500 pl-1">*</span>
                      </label>
                      <select
                        {...formik.getFieldProps("itemsubcategory")}
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={formik.handleChange}
                      >
                        <option defaultValue={"select"}>select</option>

                        {subcategory?.length &&
                          subcategory?.map((items) => (
                            <option key={items?.id} value={items?.id}>
                              {items?.name}
                            </option>
                          ))}
                      </select>

                      <p className="text-red-500 text-xs ">
                        {formik.touched.itemsubcategory &&
                        formik.errors.itemsubcategory
                          ? formik.errors.itemsubcategory
                          : null}
                      </p>
                    </div>
                  )} */}


                  <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4">
                      <label className={`${labelStyle} inline-block mb-2`}>
                        Brand
                        <span className="text-xl text-red-500 pl-1">*</span>
                      </label>
                      <select
                        {...formik.getFieldProps("brand")}
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={formik.handleChange}
                      >
                        <option defaultValue={"select"}>select</option>

                        {brand?.length &&
                          brand?.map((items) => (
                            <option key={items?.id} value={items?.id}>
                              {items?.name}
                            </option>
                          ))}
                      </select>

                      <p className="text-red-500 text-xs ">
                        {formik.touched.brand && formik.errors.brand
                          ? formik.errors.brand
                          : null}
                      </p>
                    </div>

                  {/* {otherCategory == "others" ? (
                    <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4">
                      <label className={`${labelStyle} inline-block mb-2`}>
                        Brand
                        <span className="text-xl text-red-500 pl-1">*</span>
                      </label>
                      <input
                        type="text"
                        name="brand"
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={formik.handleChange}
                        value={formik.values.brand}
                      />

                      <p className="text-red-500 text-xs ">
                        {formik.touched.brand && formik.errors.brand
                          ? formik.errors.brand
                          : null}
                      </p>
                    </div>
                  ) : (
                    <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4">
                      <label className={`${labelStyle} inline-block mb-2`}>
                        Brand
                        <span className="text-xl text-red-500 pl-1">*</span>
                      </label>
                      <select
                        {...formik.getFieldProps("brand")}
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={formik.handleChange}
                      >
                        <option defaultValue={"select"}>select</option>

                        {brand?.length &&
                          brand?.map((items) => (
                            <option key={items?.id} value={items?.id}>
                              {items?.name}
                            </option>
                          ))}
                      </select>

                      <p className="text-red-500 text-xs ">
                        {formik.touched.brand && formik.errors.brand
                          ? formik.errors.brand
                          : null}
                      </p>
                    </div>
                  )} */}

                  {/* --------------------------------------------------------------------------------------------------------- */}
                  {categorySelected?.map((obj, index) => (
                    <div className=" flex flex-wrap w-1/2" key={index}>
                      <div className="px-4 w-full mb-4">
                        <label className={`${labelStyle} inline-block mb-2`}>
                          {obj.label}
                        </label>

                        <input
                          type={obj.type}
                          name={obj.name}
                          className={`${inputStyle} inline-block w-full relative`}
                          onChange={formik.handleChange}
                          value={formik.values[obj.name]}
                        />

                        <p className="text-red-500 text-xs ">
                          {formik.touched[obj.name] && formik.errors[obj.name]
                            ? formik.errors[obj.name]
                            : null}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="form-group flex-shrink max-w-full px-4 w-full md:w-full mb-4">
                    <label className={`${labelStyle} inline-block mb-2`}>
                      Description
                    </label>
                    <textarea
                      type="text"
                      name="description"
                      className={`${inputStyle} inline-block w-full relative h-20`}
                      onChange={formik.handleChange}
                      value={formik.values.description}
                    />

                    <p className="text-red-500 text-xs ">
                      {formik.touched.description && formik.errors.description
                        ? formik.errors.description
                        : null}
                    </p>
                  </div>
                </div>

                <div className="valid-form flex flex-wrap flex-row mx-8">
                  <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4">
                    <label
                      className={`${labelStyle} inline-block mb-4 font-semibold`}
                    >
                      Quantity
                    </label>

                    <div className="flex items-center space-x-5">
                      <div>
                        <label className={`${labelStyle} inline-block mb-2`}>
                          Rate
                        </label>
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
                      </div>
                      <p className="pt-8">X</p>
                      <div>
                        <label className={`${labelStyle} inline-block mb-2`}>
                          Total Quantity
                        </label>
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
                      </div>
                      <p className="pt-8">=</p>
                      <div>
                        <label className={`${labelStyle} inline-block mb-2`}>
                          Total Rate
                        </label>
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
                    </div>
                    <p className="text-red-500 text-xs ">
                      {formik.touched.quantity && formik.errors.quantity
                        ? formik.errors.quantity
                        : null}
                    </p>
                  </div>
                </div>

                <div className="float-right pt-10 mr-8 space-x-5">
                  <button
                    // type='submit'
                    onClick={openCancelModal}
                    className={`bg-white px-5 py-2 text-black rounded leading-5 shadow-lg  hover:bg-[#1A4D8C] hover:text-white border-blue-900 border`}
                  >
                    Cancel
                  </button>
                  {/* </div> */}

                  {/* <div className='pb-16 mr-8'> */}
                  <button
                    type="submit"
                    className={`bg-[#4338CA] border-blue-900 border hover:bg-[#4478b7] px-7 py-2 text-white font-semibold rounded leading-5 shadow-lg float-right `}
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
