//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash Alam
//    Version - 1.0
//    Date - 22/05/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - EditPreProcurement
//    DESCRIPTION - EditPreProcurement
//////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState, useContext } from "react";
import ThemeStyle from "@/Components/Common/ThemeStyle";
import { useFormik } from "formik";

import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ApiHeader from "@/Components/api/ApiHeader";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import PreProcurementSubmittedScreen from "./PreProcurementSubmittedScreen";
import * as yup from "yup";
import {
  allowCharacterInput,
  allowNumberInput,
} from "@/Components/Common/PowerUps/PowerupFunctions";
import ProjectApiList from "@/Components/api/ProjectApiList";
import { contextVar } from "@/Components/context/contextVar";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import LoaderApi from "@/Components/Common/Loaders/LoaderApi";

function EditPreProcurement() {
  const { inputStyle, labelStyle, headingStyle, formStyle } = ThemeStyle();

  const {
    api_itemCategory,
    api_itemSubCategory,
    api_itemBrand,
    api_fetchProcurementDADetailByIdinbox,
    api_editProcurement,
  } = ProjectApiList();

  const { titleBarVisibility } = useContext(contextVar);
  const [erroState, seterroState] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const [responseScreen, setresponseScreen] = useState();
  const [ulbData, setulbData] = useState();
  const [ulbId, setulbId] = useState();

  const [category, setCategory] = useState();
  const [subcategory, setSubCategory] = useState();
  const [brand, setBrand] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [formData, setFormData] = useState();
  const [applicationFullData, setapplicationFullData] = useState();
  const [categoryId, setCategoryId] = useState();
  const [categorySelected, setCategorySelected] = useState([]);

  const { id } = useParams();

  // ══════════════════════════════║🔰 validationSchema 🔰║═══════════════════════════════════
  const validationSchema = yup.object({
    itemsubcategory: yup.string().required("Sub Category is required"),
    itemcategory: yup.string().required("Category is required"),
    brand: yup.string().required("brand is required"),
    description: yup.string().required("Description is required"),
    quantity: yup.number().required("quantity is required"),
    rate: yup.number().required("Rate is required"),
  });

  // intitial value
  const initialValues = {
    itemcategory: applicationFullData?.category?.id,
    itemsubcategory: applicationFullData?.subcategory?.id,
    brand: applicationFullData?.brand?.id,
    description: applicationFullData?.description,
    quantity: applicationFullData?.quantity,
    rate: applicationFullData?.rate,

    number_of_items: applicationFullData?.number_of_items,
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      setIsModalOpen(true);
      setFormData(values);
    },
    // validationSchema,
  });

  const furniture = [
    { label: "Number of Items", name: "number_of_items", type: "number" },
    { label: "Brand", name: "brand", type: "text" },
    { label: "Colour", name: "colour", type: "text" },
    { label: "Material", name: "material", type: "text" },
    { label: "Product Dimensions", name: "product_dimensions", type: "text" },
    { label: "Room Type", name: "room_type", type: "text" },
    { label: "Included Components", name: "included_components", type: "text" },
    { label: "Size", name: "size", type: "number" },
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

    // getApplicationDetail();
    fetchCategory();
  }, [ulbData]);

  useEffect(() => {
    calculateTotalRate();
  }, [formik.values.quantity, formik.values.rate]);

  // ══════════════════════════════║🔰 function to get ward list  🔰║═══════════════════════════════════

  const fetchCategory = () => {
    setisLoading(true);
    AxiosInterceptors.get(`${api_itemCategory}`, ApiHeader())
      .then(function (response) {
        setCategory(response.data.data);
      })
      .catch(function (error) {
        console.log("errorrr.... ", error);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  const fetchSubCategory = (value) => {
    console.log(value);

    AxiosInterceptors.get(`${api_itemSubCategory}/${value}`, ApiHeader())
      .then(function (response) {
        setSubCategory(response?.data?.data);
      })
      .catch(function (error) {
        console.log("errorrr.... ", error);
      });
  };

  const fetchBrand = (value) => {
    AxiosInterceptors.get(`${api_itemBrand}/${value}`, ApiHeader())
      .then(function (response) {
        setBrand(response.data.data);
      })
      .catch(function (error) {
        console.log("errorrr.... ", error);
      });
  };

  const getApplicationDetail = () => {
    setisLoading(true);
    let url = api_fetchProcurementDADetailByIdinbox;

    seterroState(false);

    AxiosInterceptors.get(`${url}/${id}`, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          const categoryName = response.data?.data?.category?.name;
          fetchSubCategory(response.data?.data?.category?.id);
          fetchBrand(response.data?.data?.subcategory?.id);
          setCategoryId(response.data?.data?.category?.id);
          setapplicationFullData(response?.data?.data);
          categoryName == "Furniture" && setCategorySelected(furniture);
          categoryName == "Cleaning Supplies" &&
            setCategorySelected(cleaningSupplies);
          categoryName == "Safety and Security" &&
            setCategorySelected(safetySecurity);
          categoryName == "Uniforms" && setCategorySelected(uniform);
          categoryName == "Maintainance and Repaire" &&
            setCategorySelected(maintenanceAndRepair);
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
    setisLoading(true);
    let url;
    let requestBody;

    url = api_editProcurement;
    requestBody = {
      id: applicationFullData?.id,
      procurement_no: applicationFullData?.procurement_no,

      category: formData?.itemcategory,
      subcategory: formData?.itemsubcategory,
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
          toast.success("Data has been updated successfully");
        } else {
          toast.error(response?.data?.message);
        }
      })
      .catch(function (error) {
        toast.error("Something went wrong");
        console.log("errorrr.... ", error);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  if (isLoading) {
    return (
      <>
        <LoaderApi />
      </>
    );
  }

  const handleOnChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

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
        />
      </>
    );
  }

  const openCancelModal = () => {
    setIsModalOpen2(true);
  };

  return (
    <>
      <div className=''>
        <TitleBar
          titleBarVisibility={titleBarVisibility}
          titleText={"Edit Pre Procurement"}
        />
      </div>
      <div className={`${formStyle} border border-blue-500 mt-7 shadow-xl`}>
        <form onSubmit={formik.handleSubmit} onChange={handleOnChange}>
          <div className=''>
            <div className=' grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 container mx-auto capitalize'>
              <div className='col-span-12  w-full mb-20'>
                <div className=' ml-4 p-4 mt-4'>
                  <h1 className={`${headingStyle} text-right`}>
                    Pre Procurement Proposal
                  </h1>
                </div>
                <div className='hidden md:block lg:block'>
                  <hr className='border w-full border-gray-200' />
                </div>

                <div className='p-12 -mt-4 valid-form flex flex-wrap flex-row -mx-4'>
                  <div class='form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4'>
                    <label className={`${labelStyle} inline-block mb-2`}>
                      Item Category
                      <span className='text-sm text-red-500'>*</span>{" "}
                    </label>
                    <select
                      {...formik.getFieldProps("itemcategory")}
                      className={`${inputStyle} inline-block w-full relative`}
                      onChange={(e) => {
                        formik.handleChange(e);
                      }}
                      disabled='true'
                    >
                      {category?.map((items, index) => (
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

                  <div class='form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4'>
                    <label className={`${labelStyle} inline-block mb-2`}>
                      Items Sub Category
                      <span className='text-sm text-red-500'>*</span>
                    </label>
                    <select
                      {...formik.getFieldProps("itemsubcategory")}
                      className={`${inputStyle} inline-block w-full relative`}
                      onChange={formik.handleChange}
                      disabled
                    >
                      {subcategory?.length &&
                        subcategory?.map((items) => (
                          <option value={items?.id}>{items?.name}</option>
                        ))}
                    </select>

                    <p className='text-red-500 text-xs '>
                      {formik.touched.itemsubcategory &&
                      formik.errors.itemsubcategory
                        ? formik.errors.itemsubcategory
                        : null}
                    </p>
                  </div>

                  <div className='form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4'>
                    <label className={`${labelStyle} inline-block mb-2`}>
                      Brand
                      <span className='text-xl text-red-500 pl-1'>*</span>
                    </label>
                    <select
                      {...formik.getFieldProps("brand")}
                      defaultValue={applicationFullData?.brand?.id}
                      className={`${inputStyle} inline-block w-full relative`}
                      onChange={formik.handleChange}
                    >
                      <option>select</option>

                      {brand?.length &&
                        brand?.map((items) => (
                          <option key={items?.id} value={items?.id}>
                            {items?.name}
                          </option>
                        ))}
                    </select>

                    <p className='text-red-500 text-xs '>
                      {formik.touched.brand && formik.errors.brand
                        ? formik.errors.brand
                        : null}
                    </p>
                  </div>

                  {/* ---------------------------------------------------------------------------------------------------------------------- */}

                  {console.log(categorySelected, "catego===========sel")}
                  {categorySelected?.map((obj) => (
                    <div className=' flex flex-wrap w-1/2'>
                      <div class='px-4 w-full mb-4'>
                        <label className={`${labelStyle} inline-block mb-2`}>
                          {obj.label}
                        </label>

                        <input
                          type='text'
                          name={obj.name}
                          {...formik.getFieldProps(obj.name)}
                          className={`${inputStyle} inline-block w-full relative`}
                          onChange={formik.handleChange}
                          value={formik.values[obj.name]}
                        />

                        <p className='text-red-500 text-xs '>
                          {formik.touched.number_of_items &&
                          formik.errors.number_of_items
                            ? formik.errors.number_of_items
                            : null}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div class='form-group flex-shrink max-w-full px-4 w-full md:w-full mb-4 '>
                    <label className={`${labelStyle} inline-block mb-2`}>
                      Others Description
                    </label>
                    <textarea
                      type='text'
                      name='description'
                      className={`${inputStyle} inline-block w-full relative h-20`}
                      onChange={formik.handleChange}
                      value={formik.values.description}
                    />

                    <p className='text-red-500 text-xs '>
                      {formik.touched.description && formik.errors.description
                        ? formik.errors.description
                        : null}
                    </p>
                  </div>

                  <div class='valid-form flex flex-wrap flex-row '>
                    <div class='form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                      <label className={`${labelStyle} inline-block mb-2`}>
                        Quantity
                      </label>

                      <div className='flex space-x-5'>
                        <input
                          type='number'
                          name='rate'
                          className={`${inputStyle} inline-block w-full relative`}
                          onChange={(e) => {
                            formik.handleChange(e);
                            calculateTotalRate();
                          }}
                          value={formik.values.rate}
                          placeholder='Rate'
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
                          placeholder='Quantity'
                        />
                        <p>=</p>
                        <input
                          type='number'
                          name='totalRate'
                          className={`${inputStyle} inline-block w-full relative`}
                          value={formik.values.totalRate}
                          placeholder='Total Rate'
                          disabled
                        />
                      </div>
                      <p className='text-red-500 text-xs '>
                        {formik.touched.quantity && formik.errors.quantity
                          ? formik.errors.quantity
                          : null}
                      </p>
                    </div>
                  </div>
                </div>

                <div className='float-right mr-8 space-x-5'>
                  <button
                    onClick={openCancelModal}
                    className={`bg-white px-5 py-2 text-black rounded leading-5 shadow-lg  hover:bg-[#4338CA] hover:text-white border-blue-900 border  `}
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
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
