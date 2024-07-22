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
import { toast } from "react-toastify";
import BarLoader from "@/Components/Common/Loaders/BarLoader";
import PreProcurementSubmittedScreen from "./PreProcurementSubmittedScreen";
import * as yup from "yup";
import { allowNumberInput } from "@/Components/Common/PowerUps/PowerupFunctions";
import ProjectApiList from "@/Components/api/ProjectApiList";
import PreProcurementCancelScreen from "./PreProcurementCancelScreen";
import SuccessModal from "./SuccessModal";
import { contextVar } from "@/Components/context/contextVar";
import { useContext } from "react";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import { useNavigate } from "react-router-dom";

function AddPreProcurement() {
  const { inputStyle, labelStyle, headingStyle, formStyle } = ThemeStyle();

  const { titleBarVisibility } = useContext(contextVar);

  const navigate = useNavigate();

  const {
    api_addProcurement,
    api_itemCategory,
    api_itemSubCategory,
    api_itemBrand,
  } = ProjectApiList();

  const [isLoading, setisLoading] = useState(false);
  const [ulbData, setulbData] = useState();
  const [ulbId, setulbId] = useState();

  const [category, setCategory] = useState();
  const [subcategory, setSubCategory] = useState();
  const [brand, setBrand] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [formData, setFormData] = useState();
  const [categorySelected, setCategorySelected] = useState([]);
  const [procurement_no, setProcurement_no] = useState();

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
    description: yup.string().required("Other description is required"),
    rate: yup.number().required("Rate is required"),
  });

  // intitial value
  const initialValues = {
    itemcategory: "",
    itemsubcategory: "",
    brand: "",
    description: "",
    quantity: "",
    rate: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      setIsModalOpen(true);
      setFormData(values);
    },
    validationSchema,
  });

  // ══════════════════════════════║🔰calculate the total rate🔰║═══════════════════════════════════
  const calculateTotalRate = () => {
    const rate = Number(formik.values.rate) || 0;
    const quantity = Number(formik.values.quantity) || 0;
    const totalRate = rate * quantity;
    formik.setFieldValue("totalRate", totalRate);
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
        setCategory(response?.data?.data?.data);
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
        console.log(response?.data?.data, "res subcT");
        setSubCategory(response?.data?.data);
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
        toast.error("Error in fetching Brands");
      });
  };

  // submit form
  const submitForm = () => {
    // console.log("data in form", formData);
    setisLoading(true);
    let url;
    let requestBody;

    url = api_addProcurement;
    requestBody = {
      ulb_id: ulbId,
      category: formData?.itemcategory,
      subcategory: formData?.itemsubcategory,
      brand: formData?.brand,
      description: formData?.description,

      rate: Number(formData?.rate),
      quantity: Number(formData?.quantity),
      total_rate: Number(formData?.totalRate),
    };

    AxiosInterceptors.post(`${url}`, requestBody, ApiHeader())
      .then(function (response) {
        if (response?.data?.status === true) {
          setisLoading(false);
          setSuccessModal(true);
          notify(response?.data?.message, "success");
          setProcurement_no(response?.data?.procurement_no);

          // navigate("/sr-inventory-proposal");
        } else {
          setisLoading(false);
          notify(response?.data?.message, "error");
          navigate("/sr-inventory-proposal");
        }
      })
      .catch(function (error) {
        setisLoading(false);
        notify("Something went wrong!");
        navigate("/sr-inventory-proposal");
      });
  };

  if (isLoading) {
    return (
      <>
        <BarLoader />
        <div className='min-h-screen'></div>
      </>
    );
  }

  const handleOnChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    {
      name == "itemsubcategory" && fetchBrand(value);
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

  return (
    <>
      <div className=''>
        <TitleBar
          titleBarVisibility={titleBarVisibility}
          titleText={"Pre Procurement Proposal"}
        />
      </div>

      <div className={`${formStyle} border border-blue-500 mt-6 shadow-lg`}>
        <form onSubmit={formik.handleSubmit} onChange={handleOnChange}>
          <div className=''>
            <div className=' grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 container mx-auto capitalize'>
              <div className='col-span-12  w-full mb-20'>
                <div className=' ml-4 p-2'>
                  <h1 className={`${headingStyle} text-right pb-5 p-6`}>
                    Add Pre Procurement
                  </h1>
                </div>
                <div className='hidden md:block lg:block'>
                  <hr className='border w-full border-gray-200' />
                </div>

                <div className='p-12 -mt-4 valid-form flex flex-wrap flex-row -mx-4'>
                  <div className='form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4'>
                    <label className={`${labelStyle} inline-block mb-2`}>
                      Item Category
                      <span className='text-xl text-red-500 pl-1'>*</span>{" "}
                    </label>
                    <select
                      {...formik.getFieldProps("itemcategory")}
                      className={`${inputStyle} inline-block w-full relative`}
                      onChange={(e) => {
                        formik.handleChange(e);
                        fetchSubCategory(e);
                      }}
                    >
                      <option defaultValue={"select"}>select</option>

                      {category?.length &&
                        category?.map((items, index) => (
                          <option key={index} value={items?.id}>
                            {items?.name}
                          </option>
                        ))}
                      <option>others</option>
                    </select>
                    <p className='text-red-500 text-xs '>
                      {formik.touched.itemcategory && formik.errors.itemcategory
                        ? formik.errors.itemcategory
                        : null}
                    </p>
                  </div>

                  <div className='form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4'>
                    <label className={`${labelStyle} inline-block mb-2`}>
                      Items Sub Category
                      <span className='text-xl text-red-500 pl-1'>*</span>
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

                    <p className='text-red-500 text-xs '>
                      {formik.touched.brand && formik.errors.brand
                        ? formik.errors.brand
                        : null}
                    </p>
                  </div>

                  {/* --------------------------------------------------------------------------------------------------------- */}
                  {categorySelected?.map((obj, index) => (
                    <div className=' flex flex-wrap w-1/2' key={index}>
                      <div className='px-4 w-full mb-4'>
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

                        <p className='text-red-500 text-xs '>
                          {formik.touched[obj.name] && formik.errors[obj.name]
                            ? formik.errors[obj.name]
                            : null}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className='form-group flex-shrink max-w-full px-4 w-full md:w-full mb-4'>
                    <label className={`${labelStyle} inline-block mb-2`}>
                      Description
                    </label>
                    <textarea
                      type='text'
                      name='description'
                      className={`${inputStyle} inline-block w-full relative h-24`}
                      onChange={formik.handleChange}
                      value={formik.values.description}
                    />

                    <p className='text-red-500 text-xs '>
                      {formik.touched.description && formik.errors.description
                        ? formik.errors.description
                        : null}
                    </p>
                  </div>
                </div>

                <div className='valid-form flex flex-wrap flex-row mx-8'>
                  <div className='form-group flex-shrink max-w-full px-4 w-full mb-4'>
                    <label
                      className={`${labelStyle} inline-block mb-4 font-semibold`}
                    >
                      Quantity
                    </label>

                    <div className='flex items-center space-x-5'>
                      <div>
                        <label className={`${labelStyle} inline-block mb-2`}>
                          Rate
                        </label>
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
                      </div>
                      <p className='pt-8'>X</p>
                      <div>
                        <label className={`${labelStyle} inline-block mb-2`}>
                          Total Quantity
                        </label>
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
                      </div>
                      <p className='pt-8'>=</p>
                      <div>
                        <label className={`${labelStyle} inline-block mb-2`}>
                          Total Rate
                        </label>
                        <input
                          type='number'
                          name='totalRate'
                          className={`${inputStyle} inline-block w-full relative`}
                          // onChange={formik.handleChange}
                          value={formik.values.totalRate}
                          placeholder='Total Rate'
                          disabled
                        />
                      </div>
                    </div>
                    <p className='text-red-500 text-xs '>
                      {formik.touched.quantity && formik.errors.quantity
                        ? formik.errors.quantity
                        : null}
                    </p>
                  </div>
                </div>

                <div className='float-right pt-10 mr-8 space-x-5'>
                  <button
                    onClick={openCancelModal}
                    className={`bg-white px-5 py-2 text-black rounded leading-5 shadow-lg  hover:bg-[#1A4D8C] hover:text-white border-blue-900 border`}
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
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
