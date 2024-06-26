import React, { useEffect, useState } from "react";
import ThemeStyle from "@/Components/Common/ThemeStyle";
import { useFormik } from "formik";

import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ApiHeader from "@/Components/api/ApiHeader";
// import { ToastContainer, toast } from "react-toastify";
import { Toaster, toast } from "react-hot-toast";

import BarLoader from "@/Components/Common/Loaders/BarLoader";
// import PreProcurementSubmittedScreen from "./PreProcurementSubmittedScreen";
import * as yup from "yup";
import {
  allowCharacterInput,
  allowNumberMultiplyInput,
  allowNumberInput,
  allowCharacterNumberInput,
} from "@/Components/Common/PowerUps/PowerupFunctions";
import ProjectApiList from "@/Components/api/ProjectApiList";
// import PreProcurementCancelScreen from "./PreProcurementCancelScreen";
// import SuccessModal from "./SuccessModal";
import { contextVar } from "@/Components/context/contextVar";
import { useContext } from "react";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ConfirmationModal from "@/Components/Common/Modal/ConfirmationModal";

const StockRequestProposal = (props) => {
  const { inputStyle, labelStyle, headingStyle, formStyle } = ThemeStyle();

  const { titleBarVisibility } = useContext(contextVar);

  const {
    api_postStockRequest,
    api_getActiveCategory,
    api_getActiveSubCategory,
    api_getActiveBrand,
    api_getActiveQty,
    api_getActiveDesc,
    api_getSrStockRequetById,
    api_editStockRequest
  } = ProjectApiList();

  const navigate = useNavigate();

  const state = useLocation();

  const page = useParams()
  // console.log(page?.page)

  // console.log(props?.page)

  const [confModal, setConfModal] = useState(false);
  const [formValues, setFormValues] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [brand, setBarnd] = useState("");
  const [descrip, setDescrip] = useState("");
  const [quantity, setQnty] = useState("");

  const [catID, setCatId] = useState("");
  const [subCatID, setSubCatId] = useState("");
  const [applicationFullData, setapplicationFullData] = useState("");

  console.log(applicationFullData);

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

  const getCategory = () => {
    AxiosInterceptors.get(`${api_getActiveCategory}`, ApiHeader())
      .then(function (response) {
        if (response?.data?.status === true) {
          setCategory(response?.data?.data);
          // notify(response?.data?.message, "success");
        } else {
          notify(response?.data?.message, "error");
        }
      })
      .catch(function (res) {
        notify("Something went wrong!");
      });
  };

  const getSubCategory = (id) => {
    AxiosInterceptors.get(`${api_getActiveSubCategory}/${id}`, ApiHeader())
      .then(function (response) {
        if (response?.data?.status === true) {
          setSubCategory(response?.data?.data);
          // notify(response?.data?.message, "success");
        } else {
          notify(response?.data?.message, "error");
        }
      })
      .catch(function (res) {
        notify("Something went wrong!");
      });
  };

  const getBrand = (id) => {
    AxiosInterceptors.get(`${api_getActiveBrand}/${id}`, ApiHeader())
      .then(function (response) {
        if (response?.data?.status === true) {
          setBarnd(response?.data?.data);
          // notify(response?.data?.message, "success");
        } else {
          notify(response?.data?.message, "error");
        }
      })
      .catch(function (res) {
        notify("Something went wrong!");
      });
  };

  const getDesc = () => {
    AxiosInterceptors.get(
      `${api_getActiveDesc}?category=${catID}&scategory=${subCatID}`,
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status === true) {
          setDescrip(response?.data?.data?.data);
          // notify(response?.data?.message, "success");
        } else {
          notify(response?.data?.message, "error");
        }
      })
      .catch(function (res) {
        notify("Something went wrong!");
      });
  };

  const getDescWithParams = (catId, subCatId) => {
    AxiosInterceptors.get(
      `${api_getActiveDesc}?category=${catId}&scategory=${subCatId}`,
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status === true) {
          setDescrip(response?.data?.data?.data);
          // notify(response?.data?.message, "success");
        } else {
          notify(response?.data?.message, "error");
        }
      })
      .catch(function (res) {
        notify("Something went wrong!");
      });
  };

  const getQuantity = (inviId) => {
    // console.log(inviId)

    AxiosInterceptors.get(`${api_getActiveQty}/${inviId}`, ApiHeader())
      .then(function (response) {
        if (response?.data?.status === true) {
          setQnty(response?.data?.data?.totalAvailableQuantity);
          // notify(response?.data?.message, "success");
        } else {
          notify(response?.data?.message, "error");
        }
      })
      .catch(function (res) {
        notify("Something went wrong!");
      });
  };

  const getApplicationDetail = () => {
    // setisLoading(true);
    AxiosInterceptors.get(
      `${api_getSrStockRequetById}/${state?.state}`,
      ApiHeader()
    )
      .then(async function (response) {
        if (response?.data?.status) {
          getAllMasters(response?.data?.data);
          setapplicationFullData(response?.data?.data);

          // setisLoading(false);
        } else {
          // setisLoading(false);
          // toast.error(response?.data?.message);
        }
      })
      .catch(function (error) {
        toast.error("Error while fetching data");
        // console.log("==2 details by id error...", error);
      })
      .finally(() => {
        // setisLoading(false);
      });
  };

  const getAllMasters = (data)=>{
    // console.log('madarchod',data?.category?.id )
    getSubCategory(data?.subcategory?.category_masterId)
    getBrand(data?.brand?.subcategory_masterId)
    getDescWithParams(data?.category?.id, data?.subcategory?.id  )
    getQuantity(data?.inventory?.id)
  }

  // const getAllMasters =async  (data) => {
  //   return await new Promise((resolve, reject) => {
  //     getSubCategory(data?.subcategory?.id);
  //     getBrand(data?.brand?.id);
  //     getDesc(data?.discription);
  //     console.log('control test')
  //     resolve()
  //   });
  // };

  useEffect(() => {
    getApplicationDetail();
    getCategory();
  }, []);

  console.log(applicationFullData)
  // intitial value
  const initialValues = {
    empId: applicationFullData?.emp_id || "",
    empName: applicationFullData?.emp_name || "",
    category: applicationFullData?.category?.id || "",
    subCategory: applicationFullData?.subcategory?.id || "",
    brand: applicationFullData?.brand?.id || "",
    quantAlot: applicationFullData?.allotted_quantity || "",
    totQuant: applicationFullData?.totQuant || "",
    discription: applicationFullData?.inventory?.id || "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      setFormValues(values);
      setConfModal(true);
    },
    // validationSchema,
  });

  const confirmationHandler = (values) => {
    // console.log("form valuessss", formValues);
    submitForm();
    page?.page == 'edit' ?  navigate(-1):  navigate("/dd-inventory-proposal");
   ;
  };
  const handleCancel = () => {
    setConfModal(false);
  };

  const submitForm = () => {

    let api

    page?.page == 'edit' ? api = api_editStockRequest : api = api_postStockRequest;

    let requestBody;

    requestBody = {
      ...(page?.page == 'edit' && {stock_handover_no:applicationFullData?.stock_handover_no}),
      emp_id: formValues?.empId,
      emp_name: formValues?.empName,
      category: formValues?.category,
      subcategory: formValues?.subCategory,
      brand: formValues?.brand,
      allotted_quantity: Number(formValues?.quantAlot),
      inventory: formValues?.discription,
      // totQuant: Number(formValues?.totQuant),
    };

    AxiosInterceptors.post(`${api}`, requestBody, ApiHeader())
      .then(function (res) {
        if (response?.data?.status === true) {
          notify(response?.data?.message, "success");
        } else {
          notify(response?.data?.message, "error");
        }
      })
      .catch(function (res) {
        notify("Something went wrong!");
      });
  };

  const remaningQtyCalc = (e) => {
    if (e.target.value > quantity) {
      formik.setFieldValue("quantAlot", "");
      e.target.value = null;
      toast.error("Quantity exceeds available stock!");
    }
  };

  const handleOnChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    // {
    //   name == "quantAlot" && remaningQtyCalc() && formik.setFieldValue('quantAlot', '')
    // }
    // {
    //   name == "receivedStock" &&
    //     formik.setFieldValue(
    //       "receivedStock",
    //       allowNumberInput(value, formik.values.rate, 100)
    //     );
    // }
    // {
    //   name == "remStock" &&
    //     formik.setFieldValue(
    //       "remStock",
    //       allowNumberInput(value, formik.values.totalRate, 100)
    //     );
    // }
    // {
    //   name == "dead_stock" && calculateRemainingStock(value);
    // }
  };

  if (confModal) {
    return (
      <>
        <ConfirmationModal
          confirmationHandler={confirmationHandler}
          handleCancel={handleCancel}
          message={"Are you sure you want to Save ?"}
          //   sideMessage={'By clicking your data will proceed'}
        />
      </>
    );
  }

  return (
    <>
      {/* <ToastContainer position='top-right' autoClose={3000} /> */}

      <div className="">
        <TitleBar
          titleBarVisibility={titleBarVisibility}
          titleText={"Inventory Proposal "}
        />
      </div>

      <div className={`${formStyle} border border-blue-500 mt-6 shadow-lg`}>
        <form onSubmit={formik.handleSubmit} onChange={handleOnChange}>
          <div className="">
            <div className=" grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 container mx-auto capitalize">
              <div className="col-span-12  w-full mb-20">
                <div className=" ml-4 p-2">
                  <h1 className={`${headingStyle} text-right pb-5 p-6`}>
                    Stock Request Proposal
                  </h1>
                </div>
                <div className="hidden md:block lg:block">
                  <hr className="border w-full border-gray-200" />
                </div>

                <div className="p-12 -mt-4 valid-form flex flex-wrap flex-row -mx-4">
                  <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4">
                    <div class="px-4 w-full mb-4">
                      <label className={`${labelStyle} inline-block mb-2`}>
                        Employee Id
                      </label>

                      <input
                        name="empId"
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={formik.handleChange}
                        value={formik.values.empId}
                      />

                      <p className="text-red-500 text-xs ">
                        {formik.touched.empId && formik.errors.empId
                          ? formik.errors.empId
                          : null}
                      </p>
                    </div>
                  </div>

                  <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4">
                    <div class="px-4 w-full mb-4">
                      <label className={`${labelStyle} inline-block mb-2`}>
                        Employee Name
                      </label>

                      <input
                        name="empName"
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={formik.handleChange}
                        value={formik.values.empName}
                      />

                      <p className="text-red-500 text-xs ">
                        {formik.touched.empName && formik.errors.empName
                          ? formik.errors.empName
                          : null}
                      </p>
                    </div>
                  </div>

                  <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4">
                    <div class="px-4 w-full mb-4">
                      <label className={`${labelStyle} inline-block mb-2`}>
                        Categories
                      </label>

                      <select
                        {...formik.getFieldProps("category")}
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={(e) => {
                          setCatId(e.target.value);
                          getSubCategory(e.target.value);
                          formik.handleChange(e);
                        }}
                      >
                        <option defaultValue={"select"}>select</option>
                        {/* <option>Clothes</option>
                        <option>Furniture</option>
                        <option>Tech</option> */}

                        {category?.length &&
                          category?.map((items) => (
                            <option key={items?.id} value={items?.id}>
                              {items?.name}
                            </option>
                          ))}
                      </select>

                      <p className="text-red-500 text-xs ">
                        {formik.touched.category && formik.errors.category
                          ? formik.errors.category
                          : null}
                      </p>
                    </div>
                  </div>

                  <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4">
                    <div class="px-4 w-full mb-4">
                      <label className={`${labelStyle} inline-block mb-2`}>
                        Sub Categories
                      </label>

                      <select
                        {...formik.getFieldProps("subCategory")}
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={(e) => {
                          setSubCatId(e.target.value);
                          getBrand(e.target.value);
                          formik.handleChange(e);
                        }}
                      >
                        <option defaultValue={"select"}>select</option>

                        {subCategory?.length &&
                          subCategory?.map((items) => (
                            <option key={items?.id} value={items?.id}>
                              {items?.name}
                            </option>
                          ))}
                      </select>

                      <p className="text-red-500 text-xs ">
                        {formik.touched.subCategory && formik.errors.subCategory
                          ? formik.errors.subCategory
                          : null}
                      </p>
                    </div>
                  </div>

                  <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4">
                    <div class="px-4 w-full mb-4">
                      <label className={`${labelStyle} inline-block mb-2`}>
                        Brand
                      </label>

                      <select
                        {...formik.getFieldProps("brand")}
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={(e) => {
                          getDesc();
                          formik.handleChange(e);
                        }}
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
                  </div>

                  <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4">
                    <div class="px-4 w-full mb-4">
                      <label className={`${labelStyle} inline-block mb-2`}>
                        Discription
                      </label>

                      <select
                        {...formik.getFieldProps("discription")}
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={(e) => {
                          getQuantity(e.target.value);
                          formik.handleChange(e);
                        }}
                      >
                        <option defaultValue={"select"}>select</option>

                        {descrip?.length &&
                          descrip?.map((items) => (
                            <option key={items?.id} value={items?.id}>
                              {items?.description}
                            </option>
                          ))}
                      </select>

                      <p className="text-red-500 text-xs ">
                        {formik.touched.discription && formik.errors.discription
                          ? formik.errors.discription
                          : null}
                      </p>
                    </div>
                  </div>

                  <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4">
                    <div class="px-4 w-full mb-4">
                      <label className={`${labelStyle} inline-block mb-2`}>
                        Quantity Allotted
                      </label>

                      <input
                        name="quantAlot"
                        type="number"
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={(e) => {
                          remaningQtyCalc(e);
                          formik.handleChange(e);
                        }}
                        value={formik.values.quantAlot}
                      />

                      <p className="text-red-500 text-xs ">
                        {formik.touched.quantAlot && formik.errors.quantAlot
                          ? formik.errors.quantAlot
                          : null}
                      </p>
                    </div>
                  </div>

                  <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4">
                    <div class="px-4 w-full mb-4">
                      <label className={`${labelStyle} inline-block mb-2`}>
                        Total Quantity in Stock
                      </label>

                      <input
                        name="totQuant"
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={formik.handleChange}
                        value={quantity}
                        disabled
                      />

                      <p className="text-red-500 text-xs ">
                        {formik.touched.totQuant && formik.errors.totQuant
                          ? formik.errors.totQuant
                          : null}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="float-right pt-10 mr-8 space-x-5">
                  <button
                    // type='submit'
                    // onClick={openCancelModal}
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
};

export default StockRequestProposal;
