import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import ThemeStyle from "@/Components/Common/ThemeStyle";
import { useFormik } from "formik";
import { Autocomplete, TextField } from "@mui/material";

import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ApiHeader from "@/Components/api/ApiHeader";
import { toast } from "react-hot-toast";
import ProjectApiList from "@/Components/api/ProjectApiList";
import { contextVar } from "@/Components/context/contextVar";
import { useContext } from "react";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ConfirmationModal from "@/Components/Common/Modal/ConfirmationModal";
// import { testingData } from "./testinggData";

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
    api_editStockRequest,
    api_getEmpDetails,
  } = ProjectApiList();

  const navigate = useNavigate();

  const state = useLocation();

  const page = useParams();

  const [confModal, setConfModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState("");
  const [category, setCategory] = useState("");
  const [empDetails, setEmpdetails] = useState("");
  const [formattedEmp, setFormattedEmp] = useState([]);
  const [subCategory, setSubCategory] = useState("");
  const [brand, setBarnd] = useState("");
  const [descrip, setDescrip] = useState("");
  const [quantity, setQnty] = useState("");

  const [catID, setCatId] = useState("");
  const [subCatID, setSubCatId] = useState("");
  const [applicationFullData, setapplicationFullData] = useState("");

  // console.log(empDetails);

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

  const getEmpdetails = () => {
    AxiosInterceptors.get(
      `https://aadrikainfomedia.com/auth/api/hrms/v1/employee/get?limit=100000000000&page=1`,
      {
        timeout: 60000,
        headers: {
          Authorization: `Bearer 42286|6vJQxgIoLp5kYRO8XAlUH77s3n39X66Vqsl6WHcYce286b1a`,
          Accept: "application/json",
          "Content-Type": "application/json",
          "API-KEY": "eff41ef6-d430-4887-aa55-9fcf46c72c99",
        },
      }
    )
      .then(function (response) {
        if (response?.data?.status === true) {
          setEmpdetails(response?.data?.data?.data);
          console.log(response?.data?.data?.data);
          formatEmp(response?.data?.data?.data);
          // notify(response?.data?.message, "success");
        } else {
          // notify(response?.data?.message, "error");
        }
      })
      .catch(function (res) {
        notify("Something went wrong!");
      });
    console.log(empDetails);
    // console.log(testingData)
    // setEmpdetails(testingData);
    // formatEmp(testingData);
  };
  const getCategory = () => {
    AxiosInterceptors.get(`${api_getActiveCategory}`, ApiHeader())
      .then(function (response) {
        if (response?.data?.status === true) {
          setCategory(response?.data?.data);
          // notify(response?.data?.message, "success");
        } else {
          toast.error(response?.data?.message, "error");
        }
      })
      .catch(function (res) {
        toast.error("Something went wrong!");
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

  const getDesc = (subCat) => {
    AxiosInterceptors.get(
      `${api_getActiveDesc}?category=${catID}&scategory=${subCat || subCatID}`,
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

  const getAllMasters = (data) => {
    // console.log('madarchod',data?.category?.id )
    getSubCategory(data?.subcategory?.category_masterId);
    getBrand(data?.brand?.subcategory_masterId);
    getDescWithParams(data?.category?.id, data?.subcategory?.id);
    getQuantity(data?.inventory?.id);
  };

  const formatEmp = (empDetails) => {
    if (empDetails) {
      const temp = empDetails.map((item) => item?.emp_id);
      setFormattedEmp(temp);
    }
  };

  const onChangeEmp = (value) => {
    if (value) {
      const selectedEmp = empDetails.filter((item) => item?.emp_id === value);
      formik.setFieldValue("empId", value);
      formik.setFieldValue(
        "empName",
        selectedEmp[0]?.emp_basic_details?.emp_name
      );
    }
  };
  useEffect(() => {
    if (page?.edit === "edit") {
      getApplicationDetail();
    }

    getCategory();
    getEmpdetails();
  }, []);

  // console.log(applicationFullData);
  // intitial value
  const initialValues = {
    empId: applicationFullData?.emp_id || "",
    empName: applicationFullData?.emp_name || "",
    category: applicationFullData?.category?.id || "",
    subCategory: applicationFullData?.subcategory?.id || "",
    brand: applicationFullData?.brand?.id || "",
    quantAlot: applicationFullData?.allotted_quantity || "",
    totQuant: applicationFullData?.totQuant || "",
    description: applicationFullData?.inventory?.id || "",
  };

  const validationSchema = Yup.object({
    empId: Yup.string().required("Employee Id is required"),
    empName: Yup.string().required("Employee Id is required"),
    category: Yup.string().required("Category is required"),
    subCategory: Yup.string().required("Sub Category is required"),
    quantAlot: Yup.string(),
    description: Yup.string().required("Description is required"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      setFormValues(values);
      setConfModal(true);
    },
    validationSchema,
  });

  const confirmationHandler = (values) => {
    submitForm();
    page?.page == "edit" ? navigate(-1) : navigate("/dd-inventory-proposal");
  };
  const handleCancel = () => {
    setConfModal(false);
  };

  const submitForm = () => {
    setIsLoading(true);
    let api;

    page?.page == "edit"
      ? (api = api_editStockRequest)
      : (api = api_postStockRequest);

    let requestBody;

    requestBody = {
      ...(page?.page == "edit" && {
        stock_handover_no: applicationFullData?.stock_handover_no,
      }),
      emp_id: formValues?.empId,
      emp_name: formValues?.empName,
      category: formValues?.category,
      subcategory: formValues?.subCategory,
      brand: formValues?.brand,
      allotted_quantity: Number(formValues?.quantAlot) || 1,
      inventory: formValues?.description,
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
      })
      .finally(() => {
        setIsLoading(false);
        setConfModal(false);
      });
  };

  const handleOnChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
  };

  if (confModal) {
    return (
      <>
        <ConfirmationModal
          confirmationHandler={confirmationHandler}
          handleCancel={handleCancel}
          message={"Are you sure you want to Proceed ?"}
          loadingState={isLoading}
          //   sideMessage={'By clicking your data will proceed'}
        />
      </>
    );
  }

  return (
    <>
      {/* <ToastContainer position='top-right' autoClose={3000} /> */}

      <div className=''>
        <TitleBar
          titleBarVisibility={titleBarVisibility}
          titleText={"Inventory Proposal "}
        />
      </div>

      <div className={`${formStyle} border border-blue-500 mt-6 shadow-lg`}>
        <form onSubmit={formik.handleSubmit} onChange={handleOnChange}>
          <div className=''>
            <div className=' grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 container mx-auto capitalize'>
              <div className='col-span-12  w-full mb-20'>
                <div className=' ml-4 p-2'>
                  <h1 className={`${headingStyle} text-right pb-5 p-6`}>
                    Stock Request Proposal
                  </h1>
                </div>
                <div className='hidden md:block lg:block'>
                  <hr className='border w-full border-gray-200' />
                </div>

                <div className='p-12 -mt-4 valid-form flex flex-wrap flex-row -mx-4'>
                  <div className='form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                    <div className='px-4 w-full mb-4'>
                      <label className={`${labelStyle} inline-block mb-2`}>
                        Employee Id
                      </label>

                      {/* <input
                        name="empId"
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={formik.handleChange}
                        value={formik.values.empId}
                      /> */}

                      <Autocomplete
                        disablePortal
                        id='combo-box-demo'
                        options={formattedEmp}
                        sx={{ width: "100%" }}
                        size='small'
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            sx={{ borderColor: "#4b5563" }}
                            className={`${inputStyle} inline-block w-full relative mt-2`}
                          />
                        )}
                        onChange={(e, value) => {
                          onChangeEmp(value);
                        }}
                      />

                      <p className='text-red-500 text-xs '>
                        {formik.touched.empId && formik.errors.empId
                          ? formik.errors.empId
                          : null}
                      </p>
                    </div>
                  </div>

                  <div className='form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                    <div className='px-4 w-full mb-4'>
                      <label className={`${labelStyle} inline-block mb-2`}>
                        Employee Name
                      </label>

                      <input
                        name='empName'
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={formik.handleChange}
                        value={formik.values.empName}
                        disabled
                      />

                      <p className='text-red-500 text-xs '>
                        {formik.touched.empName && formik.errors.empName
                          ? formik.errors.empName
                          : null}
                      </p>
                    </div>
                  </div>

                  <div className='form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                    <div className='px-4 w-full mb-4'>
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

                      <p className='text-red-500 text-xs '>
                        {formik.touched.category && formik.errors.category
                          ? formik.errors.category
                          : null}
                      </p>
                    </div>
                  </div>

                  <div className='form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                    <div className='px-4 w-full mb-4'>
                      <label className={`${labelStyle} inline-block mb-2`}>
                        Sub Categories
                      </label>

                      <select
                        {...formik.getFieldProps("subCategory")}
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={(e) => {
                          setSubCatId(e.target.value);
                          getDesc(e.target.value);
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

                      <p className='text-red-500 text-xs '>
                        {formik.touched.subCategory && formik.errors.subCategory
                          ? formik.errors.subCategory
                          : null}
                      </p>
                    </div>
                  </div>

                  <div className='form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                    <div className='px-4 w-full mb-4'>
                      <label className={`${labelStyle} inline-block mb-2`}>
                        Brand
                      </label>

                      <select
                        {...formik.getFieldProps("brand")}
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={(e) => {
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
                      <p className='text-red-500 text-xs '>
                        {formik.touched.brand && formik.errors.brand
                          ? formik.errors.brand
                          : null}
                      </p>
                    </div>
                  </div>

                  <div className='form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                    <div className='px-4 w-full mb-4'>
                      <label className={`${labelStyle} inline-block mb-2`}>
                        description
                      </label>

                      <select
                        {...formik.getFieldProps("description")}
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={(e) => {
                          getQuantity(e.target.value);
                          formik.handleChange(e);
                        }}
                      >
                        <option defaultValue={"select"}>select</option>

                        {descrip?.length &&
                          descrip?.map((items) => (
                            <option
                              key={items?.id}
                              value={items?.id}
                              className='w-10'
                            >
                              {items?.description}
                            </option>
                          ))}
                      </select>

                      <p className='text-red-500 text-xs '>
                        {formik.touched.description && formik.errors.description
                          ? formik.errors.description
                          : null}
                      </p>
                    </div>
                  </div>

                  <div className='form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                    <div className='px-4 w-full mb-4'>
                      <label className={`${labelStyle} inline-block mb-2`}>
                        Quantity Allotted
                      </label>

                      <input
                        name='quantAlot'
                        type='text'
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={(e) => {
                          formik.handleChange(e);
                        }}
                        value={formik.values.quantAlot}
                      />

                      <p className='text-red-500 text-xs '>
                        {formik.touched.quantAlot && formik.errors.quantAlot
                          ? formik.errors.quantAlot
                          : null}
                      </p>
                    </div>
                  </div>
                </div>

                <div className='float-right pt-10 mr-8 space-x-5'>
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
};

export default StockRequestProposal;
