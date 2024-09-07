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
import PreProcurementSubmittedScreen from "./PreProcurementSubmittedScreen";
import * as yup from "yup";
import { allowNumberInput } from "@/Components/Common/PowerUps/PowerupFunctions";
import ProjectApiList from "@/Components/api/ProjectApiList";
import PreProcurementCancelScreen from "./PreProcurementCancelScreen";
import SuccessModal from "./SuccessModal";
import { contextVar } from "@/Components/context/contextVar";
import { useContext } from "react";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";
import { indianAmount } from "@/Components/Common/PowerupFunctions";
import { FiEdit } from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";

function AddPreProcurement() {
  const { inputStyle, labelStyle, headingStyle, formStyle, loading } =
    ThemeStyle();

  const { titleBarVisibility } = useContext(contextVar);

  const navigate = useNavigate();

  const { state } = useLocation();

  const { page } = useParams();

  // console.log(page)

  const {
    api_addProcurement,
    // api_itemCategory,
    api_getActiveCategory,
    api_itemSubCategory,
    api_itemBrand,
    api_getAllunit,
    api_fetchProcurementById,
    api_getProcItemRateContract,
    api_getActiveDesc,
  } = ProjectApiList();

  const [isLoading, setisLoading] = useState(false);
  const [itemCategory, setItemCategory] = useState();
  const [applicationFullData, setapplicationFullData] = useState();

  const [category, setCategory] = useState();
  const [subcategory, setSubCategory] = useState();
  const [units, setUnit] = useState();
  const [brand, setBrand] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [is_rate_contract, setRateContract] = useState(false);
  const [procItem, setProcItem] = useState([]);
  const [formData, setFormData] = useState([]);
  const [categorySelected, setCategorySelected] = useState();
  const [editProcurementData, setEditProcurementData] = useState();
  const [selectedSupplier, setSelectedSupplier] = useState();
  const [supplierDetailsProc, setSupplierDetailsProc] = useState();
  const [descrip, setDescrip] = useState("");

  const [procurement_no, setProcurement_no] = useState();

  const handleDelete = (index) => {
    const newFormData = formData.filter((_, i) => i !== index);
    setFormData(newFormData);
  };

  const handleEdit = (id) => {
    const data = applicationFullData?.procurement_stocks.find(
      (data) => data?.id == id
    );
    setEditProcurementData(data);
    // console.log(data?.category?.id)
    fetchSubCategory(data?.category?.id);
  };

  const getSupplierName = (index) => {
    const data = procItem?.[index];
    setSelectedSupplier(data);
  };

  //if rate contract selected then,to chose items
  const getProcItemRateContract = () => {
    AxiosInterceptors.get(
      `${api_getProcItemRateContract}/${itemCategory}`,
      ApiHeader()
    )
      .then(function (response) {
        // console.log(response?.data?.data, "res subcT");
        setProcItem(response?.data?.data);
      })
      .catch(function (error) {
        toast.error("Something went wrong");
      });
  };

  const applicationFullDataLength = applicationFullData
    ? Object.keys(applicationFullData).length
    : 0;
  // console.log(applicationFullDataLength);

  // ══════════════════════════════║🔰 validationSchema 🔰║═══════════════════════════════════

  const validationSchema = yup.object({
    itemCategory: yup.string().required("Item category is required"),
    subcategory: yup.string().required("Sub category is required"),
    unit: yup.string().required("Unit is required"),
    brand: yup.string(),
    description: yup.string().required("Description is required"),
    rate: yup.number().required("Rate is required"),
    quantity: yup.number().required("Quantity is required"),
  });

  const setSupplierDetails = (value) => {
    const supplierUnitPrice = selectedSupplier?.rate_contract_supplier?.find(
      (supplier) => supplier?.supplier_master?.id === value
    );
    setSupplierDetailsProc(supplierUnitPrice);
    // formik.setFieldValue("rate", supplierUnitPrice);
  };

  // intitial value
  const initialValues = {
    itemCategory:
      selectedSupplier?.category?.id ||
      editProcurementData?.category?.id ||
      categorySelected ||
      "",
    subcategory:
      selectedSupplier?.subcategory?.id ||
      editProcurementData?.subCategory?.id ||
      "",
    brand: selectedSupplier?.brand?.id || editProcurementData?.brand?.id || "",
    unit: selectedSupplier?.unit?.id || editProcurementData?.unit?.id || "",
    description:
      selectedSupplier?.description || editProcurementData?.description || "",
    quantity: editProcurementData?.quantity || "",
    rate: supplierDetailsProc?.unit_price || editProcurementData?.rate || "",
    subcategorytxt: editProcurementData?.subcategorytxt || "",
    brandtxt: editProcurementData?.brandtxt || "",
    descriptiontxt: editProcurementData?.descriptiontxt || "",
  };

  // console.log(editProcurementData?.itemCategory,"cat=")

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      const brandName = getBrandName(values.brand);
      setCategorySelected(values.itemCategory);
      values = { ...values, brand: brandName };
      // console.log(values,"val in onsubmit")
      setFormData((prev) => [...prev, values]);
      resetForm();
    },
    validationSchema,
  });

  ///////////{*** APPLICATION FULL DETAIL ***}/////////
  const getApplicationDetail = () => {
    // setisLoading(true);
    // seterroState(false);
    AxiosInterceptors.get(`${api_fetchProcurementById}/${state}`, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          setapplicationFullData(response?.data?.data);
          setTableData(response?.data?.data?.tran_dtls);
          setProcNo(response?.data?.data?.procurement_no);
          setData((prev) => ({
            ...prev,
            procurement_no: response?.data?.data?.procurement_no,
          }));
        } else {
          // toast.error("Error while getting details...");
          // seterroState(true);
        }
      })
      .catch(function (error) {
        console.log("==2 details by id error...", error);
        toast.error(error?.response?.data?.message);
        // seterroState(true);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  // ══════════════════════════════║🔰calculate the total rate🔰║═══════════════════════════════════
  const calculateTotalRate = () => {
    const rate = Number(formik.values.rate) || 0;
    const quantity = Number(formik.values.quantity) || 0;
    const total_rate = rate * quantity;
    formik.setFieldValue("total_rate", total_rate);
  };

  const fetchCategory = () => {
    AxiosInterceptors.get(`${api_getActiveCategory}`, ApiHeader())
      .then(function (response) {
        setCategory(response?.data?.data);
      })
      .catch(function (error) {
        toast.error("Something went wrong");
      });
  };

  const fetchSubCategory = (value) => {
    // setCategorySelected(value);
    setItemCategory(value);
    // console.log(e?.target?.value,"Subcategory");

    AxiosInterceptors.get(`${api_itemSubCategory}/${value}`, ApiHeader())
      .then(function (response) {
        // console.log(response?.data?.data, "res subcT");
        setSubCategory(response?.data?.data);
      })
      .catch(function (error) {
        toast.error("Something went wrong");
      });
  };

  const fetchBrand = (value) => {
    getDesc(value);
    AxiosInterceptors.get(`${api_itemBrand}/${value}`, ApiHeader())
      .then(function (response) {
        setBrand(response.data.data);
      })
      .catch(function (error) {
        toast.error("Error in fetching Brands");
      });
  };

  const getDesc = (subCat) => {
    AxiosInterceptors.get(
      `${api_getActiveDesc}?category=${itemCategory}&scategory=${subCat}`,
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
        toast.error("Something went wrong!");
      });
  };

  const fetchUnits = () => {
    AxiosInterceptors.get(`${api_getAllunit}`, ApiHeader())
      .then(function (response) {
        setUnit(response?.data?.data?.data);
      })
      .catch(function (error) {
        toast.error("Error in fetching Units");
      });
  };

  // submit form
  const submitForm = () => {
    // console.log("data in form", formData);
    setisLoading(true);
    let requestBody = {
      category: itemCategory,
      supplier: supplierDetailsProc?.id,
      procurement: formData,
      is_rate_contract,
    };
    // console.log(requestBody, "requestBody");
    let url;
    // let requestBody;

    url = api_addProcurement;

    AxiosInterceptors.post(`${url}`, requestBody, ApiHeader())
      .then(function (response) {
        if (response?.data?.status === true) {
          setisLoading(false);
          setSuccessModal(true);
          // notify(response?.data?.message, "success");
          setProcurement_no(response?.data?.procurement_no);
          // navigate("/sr-inventory-proposal");
        } else {
          setisLoading(false);
          // notify(response?.data?.message, "error");
          // navigate("/sr-inventory-proposal");
        }
      })
      .catch(function (error) {
        setisLoading(false);
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setisLoading(false);
        setIsModalOpen(false);
      });
  };

  const modalHandleClick = () => {
    setSuccessModal(false);
    navigate("/inventory-stockRequest?tabNo=2");
  };

  useEffect(() => {
    calculateTotalRate();
  }, [formik.values.quantity, formik.values.rate]);

  useEffect(() => {
    page == "edit" && getApplicationDetail();
  }, []);

  useEffect(() => {
    const ulbId = localStorage.getItem("ulbId");
    fetchCategory();
    fetchUnits();
  }, []);

  const getBrandName = (id) => {
    const name = brand?.find((obj) => obj.id === id)?.name;
    return name;
  };

  const handleOnChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    {
      name == "itemCategory" && value != "others" && fetchSubCategory(value);
    }

    {
      name == "subcategory" && fetchBrand(value);
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
      name == "total_rate" &&
        formik.setFieldValue(
          "total_rate",
          allowNumberInput(value, formik.values.total_rate, 100)
        );
    }
    {
      name == "proc_item" && getSupplierName(value);
    }
    {
      name == "supplier" && setSupplierDetails(value);
    }
  };

  if (isModalOpen) {
    return (
      <>
        <PreProcurementSubmittedScreen
          submitForm={submitForm}
          responseScreenData={formData}
          setIsModalOpen={setIsModalOpen}
          loading={isLoading}
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
          handleClick={modalHandleClick}
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

  // console.log(formData)

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
                  <h1 className={`${headingStyle} text-right pb-3 p-6`}>
                    Add Pre Procurement
                  </h1>
                </div>
                <div className='hidden md:block lg:block'>
                  <hr className='border w-full border-gray-200' />
                </div>
                <div className='px-5 mt-4 flex justify-between gap-2 items-center'>
                  <div className='form-group flex-shrink max-w-full md:w-1/3 px-4 mb-4'>
                    <label className={`${labelStyle} inline-block mb-2`}>
                      Item Category
                      <span className='text-xl text-red-500 pl-1'>*</span>{" "}
                    </label>
                    <select
                      {...formik.getFieldProps("itemCategory")}
                      className={`${inputStyle} inline-block w-full relative`}
                      onChange={formik.handleChange}
                      disabled={
                        formData?.length > 0 ||
                        page == "edit" ||
                        is_rate_contract
                      }
                      // defaultValue={categorySelected || "select"}
                    >
                      <option value='select'>select</option>

                      {category?.length &&
                        category?.map((items, index) => (
                          <option
                            key={index}
                            value={items?.id}
                            defaultValue={categorySelected || "select"}
                          >
                            {items?.name}
                          </option>
                        ))}
                      {/* <option>others</option> */}
                    </select>
                    <p className='text-red-500 text-xs '>
                      {formik.touched.itemCategory && formik.errors.itemCategory
                        ? formik.errors.itemCategory
                        : null}
                    </p>
                  </div>

                  <div className='flex items-center gap-2'>
                    <div className='flex gap-2 items-center'>
                      <input
                        type='checkbox'
                        className='w-6 h-6 cursor-pointer'
                        onChange={() => {
                          setRateContract((prev) => !prev);
                          getProcItemRateContract();
                        }}
                      />
                      <p className='font-semibold whitespace-nowrap'>
                        Applied by Rate Contract
                      </p>
                    </div>
                  </div>
                </div>

                {is_rate_contract && (
                  <div className='flex gap-2 items-center px-8 mt-4'>
                    <div className='form-group flex-shrink max-w-full w-1/2 px-4 '>
                      <label className={`${labelStyle} inline-block mb-2`}>
                        Choose Item
                        <span className='text-xl text-red-500 pl-1'>
                          *
                        </span>{" "}
                      </label>
                      <select
                        {...formik.getFieldProps("proc_item")}
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={formik.handleChange}
                        // disabled={formData?.length > 0 || page == "edit"}
                        // defaultValue={categorySelected || "select"}
                      >
                        <option value='select'>select</option>

                        {procItem?.length &&
                          procItem?.map((items, index) => (
                            <option
                              key={index}
                              value={index}
                              defaultValue={"select"}
                            >
                              {items?.subcategory?.name} ({items?.description})
                            </option>
                          ))}
                        {/* <option>others</option> */}
                      </select>
                      {/* <p className='text-red-500 text-xs '>
                        {formik.touched.itemCategory &&
                        formik.errors.itemCategory
                          ? formik.errors.itemCategory
                          : null}
                      </p> */}
                    </div>

                    <div className='form-group flex-shrink max-w-full w-1/2 px-4'>
                      <label className={`${labelStyle} inline-block mb-2`}>
                        Select Supplier
                        <span className='text-xl text-red-500 pl-1'>
                          *
                        </span>{" "}
                      </label>
                      <select
                        {...formik.getFieldProps("supplier")}
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={formik.handleChange}
                        disabled={
                          formik.values.quantity || formData?.length > 0
                        }
                        // defaultValue={categorySelected || "select"}
                      >
                        <option value='select'>select</option>

                        {selectedSupplier?.rate_contract_supplier?.length &&
                          selectedSupplier?.rate_contract_supplier?.map(
                            (items, index) => (
                              <option
                                key={index}
                                value={items?.supplier_master?.id}
                                // defaultValue={categorySelected || "select"}
                              >
                                {items?.supplier_master?.name}
                              </option>
                            )
                          )}
                        {/* <option>others</option> */}
                      </select>
                      {/* <p className='text-red-500 text-xs '>
                        {formik.touched.itemCategory &&
                        formik.errors.itemCategory
                          ? formik.errors.itemCategory
                          : null}
                      </p> */}
                    </div>
                  </div>
                )}

                {/* {console.log(applicationFullData)} */}
                <div className='shadow-md sm:rounded-lg my-10 mx-6 mb-10 overflow-auto'>
                  {formData?.length || applicationFullDataLength > 0 ? (
                    <table className='w-full text-sm text-left rtl:text-right px-6 overflow-auto'>
                      <thead className='text-xs text-gray-700 uppercase bg-slate-200'>
                        <tr>
                          <th scope='col' className='px-6 py-3'>
                            S No.
                          </th>
                          <th scope='col' className='px-6 py-3'>
                            SubCategory
                          </th>
                          <th scope='col' className='px-6 py-3'>
                            Brand
                          </th>
                          <th scope='col' className='px-6 py-3'>
                            Unit
                          </th>
                          <th scope='col' className='px-6 py-3 w-[5rem]'>
                            Description
                          </th>
                          <th scope='col' className='px-6 py-3'>
                            Total Qunatity
                          </th>
                          <th scope='col' className='px-6 py-3'>
                            Rate
                          </th>
                          <th scope='col' className='px-6 py-3'>
                            Total Rate
                          </th>
                          <th scope='col' className='px-6 py-3'>
                            {/* <span className=' hover:text-red-500'>
                              <MdOutlineDelete />
                            </span> */}
                          </th>
                        </tr>
                      </thead>

                      {page == "edit" && (
                        <tbody>
                          {applicationFullData?.procurement_stocks?.map(
                            (data, index) => (
                              <tr className='bg-white border-b hover:bg-gray-50 '>
                                <td className='px-6 py-4'>{index + 1}</td>
                                <td className='px-6 py-4'>
                                  {data?.subCategory?.name}
                                </td>
                                <td className='px-6 py-4'>
                                  {data?.brand == null ? "N/A" : data?.brand}
                                </td>
                                <td className='px-6 py-4'>
                                  {" "}
                                  {data?.unit?.name}
                                </td>
                                <td className='px-6 py-4 w-[10rem] whitespace-normal break-words'>
                                  {data.description}
                                </td>
                                <td className='px-6 py-4 '>{data.quantity}</td>
                                <td className='px-6 py-4 '>
                                  {indianAmount(data.rate)}
                                </td>
                                <td className='px-6 py-4'>
                                  {indianAmount(data.total_rate)}
                                </td>
                                <td className='px-6 py-4 text-right cursor-pointer'>
                                  <span className=' '>
                                    <FiEdit
                                      fontSize={18}
                                      color='green'
                                      onClick={() => handleEdit(data?.id)}
                                    />
                                  </span>
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      )}

                      {page == "create" && (
                        <tbody>
                          {formData?.map((form, index) => (
                            <tr className='bg-white border-b hover:bg-gray-50 '>
                              <td className='px-6 py-4'>{index + 1}</td>
                              <td className='px-6 py-4'>
                                {form.subcategorytxt
                                  ? form.subcategorytxt
                                  : subcategory?.find(
                                      (subcat) => subcat.id === form.subcategory
                                    )?.name}
                              </td>
                              <td className='px-6 py-4'>
                                {form.brandtxt ? form.brandtxt : form?.brand}
                              </td>
                              <td className='px-6 py-4'>
                                {
                                  units?.find((data) => data.id === form.unit)
                                    ?.name
                                }
                              </td>
                              <td className='px-6 py-4 w-[10rem] whitespace-normal break-words'>
                                {form.description}
                              </td>
                              <td className='px-6 py-4 '>{form.quantity}</td>
                              <td className='px-6 py-4 '>
                                {indianAmount(form.rate)}
                              </td>
                              <td className='px-6 py-4'>
                                {indianAmount(form.total_rate)}
                              </td>
                              <td className='px-6 py-4 text-right cursor-pointer'>
                                <span className=' hover:text-red-500'>
                                  <MdOutlineDelete
                                    fontSize={18}
                                    color='red'
                                    onClick={() => handleDelete(index)}
                                  />
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      )}
                    </table>
                  ) : (
                    <span></span>
                  )}
                </div>

                <div className='mb-24 m-10 p-3 border border-gray-200 shadow-md rounded'>
                  <div className=' valid-form flex flex-wrap flex-row'>
                    <div className='form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4'>
                      <label className={`${labelStyle} inline-block mb-2`}>
                        Items Sub Category
                        <span className='text-xl text-red-500 pl-1'>*</span>
                      </label>

                      {formik.values.itemCategory == "others" ? (
                        <input
                          type='text'
                          name='subcategorytxt'
                          className={`${inputStyle} inline-block w-full relative`}
                          onChange={formik.handleChange}
                          value={formik.values.subcategorytxt}
                        />
                      ) : (
                        <select
                          {...formik.getFieldProps("subcategory")}
                          className={`${inputStyle} inline-block w-full relative`}
                          onChange={formik.handleChange}
                        >
                          <option value={""}>select</option>

                          {subcategory?.length &&
                            subcategory?.map((items) => (
                              <option key={items?.id} value={items?.id}>
                                {items?.name}
                              </option>
                            ))}
                        </select>
                      )}

                      <p className='text-red-500 text-xs '>
                        {formik.touched.subcategory && formik.errors.subcategory
                          ? formik.errors.subcategory
                          : null}
                      </p>
                    </div>

                    <div className='form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4'>
                      <label className={`${labelStyle} inline-block mb-2`}>
                        Unit
                        <span className='text-xl text-red-500 pl-1'>*</span>
                      </label>
                      <select
                        {...formik.getFieldProps("unit")}
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={formik.handleChange}
                      >
                        <option value={""}>select</option>

                        {units?.length &&
                          units?.map((items) => (
                            <option key={items?.id} value={items?.id}>
                              {items?.name}
                            </option>
                          ))}
                      </select>

                      <p className='text-red-500 text-xs '>
                        {formik.touched.unit && formik.errors.unit
                          ? formik.errors.unit
                          : null}
                      </p>
                    </div>

                    <div className='form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4'>
                      <label className={`${labelStyle} inline-block mb-2`}>
                        Brand
                        {/* <span className='text-xl text-red-500 pl-1'>*</span> */}
                      </label>

                      {formik.values.itemCategory == "others" ? (
                        <input
                          type='text'
                          name='brandtxt'
                          className={`${inputStyle} inline-block w-full relative`}
                          onChange={formik.handleChange}
                          value={formik.values.brandtxt}
                        />
                      ) : (
                        <select
                          {...formik.getFieldProps("brand")}
                          className={`${inputStyle} inline-block w-full relative`}
                          onChange={formik.handleChange}
                        >
                          <option value={""}>select</option>

                          {brand?.length &&
                            brand?.map((items) => (
                              <option key={items?.id} value={items?.id}>
                                {items?.name}
                              </option>
                            ))}
                        </select>
                      )}

                      <p className='text-red-500 text-xs '>
                        {formik.touched.brand && formik.errors.brand
                          ? formik.errors.brand
                          : null}
                      </p>
                    </div>

                    {/* --------------------------------------------------------------------------------------------------------- */}
                    {/* {categorySelected?.map((obj, index) => (
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
                    ))} */}

                    {console.log(formik.values.description, "desc")}
                    <div className='form-group flex-shrink max-w-full px-4 w-full md:w-full mb-5'>
                      <label className={`${labelStyle} inline-block mb-2`}>
                        Description
                      </label>
                      {formik.values.description == "others" ? (
                        <div className='flex gap-0 relative'>
                          <textarea
                            type='text'
                            name='description'
                            className={`${inputStyle} inline-block w-full relative h-24`}
                            onChange={formik.handleChange}
                            value={formik.values.description}
                          />
                          <div
                            onClick={() =>
                              formik.setFieldValue("description", "")
                            }
                          >
                            <ImCancelCircle
                              fontSize={20}
                              className='absolute right-0 top-[2px]'
                            />
                          </div>
                        </div>
                      ) : (
                        <select
                          {...formik.getFieldProps("description")}
                          className={`${inputStyle} inline-block w-full relative`}
                          onChange={(e) => {
                            formik.handleChange(e);
                          }}
                        >
                          <option value={""}>select</option>
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
                          <option value={"others"}>Others</option>
                        </select>
                      )}

                      <p className='text-red-500 text-xs '>
                        {formik.touched.description && formik.errors.description
                          ? formik.errors.description
                          : null}
                      </p>
                    </div>
                  </div>

                  <div className='valid-form flex flex-wrap flex-row mx-4'>
                    <div className='form-group flex-shrink max-w-full w-full mb-4'>
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
                            disabled={formik.values.supplier}
                          />
                          <p className='text-red-500 text-xs '>
                            {formik.touched.rate && formik.errors.rate
                              ? formik.errors.rate
                              : null}
                          </p>
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
                          <p className='text-red-500 text-xs '>
                            {formik.touched.quantity && formik.errors.quantity
                              ? formik.errors.quantity
                              : null}
                          </p>
                        </div>
                        <p className='pt-8'>=</p>
                        <div>
                          <label className={`${labelStyle} inline-block mb-2`}>
                            Total Rate
                          </label>
                          <input
                            type='number'
                            name='total_rate'
                            className={`${inputStyle} inline-block w-full relative`}
                            // onChange={formik.handleChange}
                            value={formik.values.total_rate}
                            placeholder='Total Rate'
                            disabled
                          />
                          <p className='text-red-500 text-xs '>
                            {formik.touched.total_rate &&
                            formik.errors.total_rate
                              ? formik.errors.total_rate
                              : null}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='flex justify-end pt-4  space-x-5'>
                    <button
                      type='submit'
                      // type='button'
                      // onClick
                      className={`bg-blue-500 flex items-center gap-2 rounded-md hover:bg-[#4478b7] px-4 py-2.5 text-white font-semibold leading-5 shadow-lg `}
                    >
                      <IoMdAddCircleOutline className='text-xl' />
                      {page == "edit" ? "UPDATE" : "ADD"}
                    </button>
                  </div>
                </div>

                <div className='flex justify-end gap-3 mt-8 pr-8'>
                  <button
                    onClick={openCancelModal}
                    className={`bg-white px-2 py-3 text-black rounded leading-5 shadow-lg  hover:bg-[#1A4D8C] hover:text-white border-blue-900 border`}
                  >
                    Cancel
                  </button>
                  <button
                    type='button'
                    onClick={() => setIsModalOpen(true)}
                    // onClick={() => console.log(formData)}
                    className={`bg-[#4338CA] border-blue-900 border hover:bg-[#4478b7] px-7 py-3 text-white font-semibold rounded leading-5 shadow-lg float-right ${
                      isLoading ? loading : ""
                    }`}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 '>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Product name
              </th>
              <th scope='col' className='px-6 py-3'>
                Color
              </th>
              <th scope='col' className='px-6 py-3'>
                Category
              </th>
              <th scope='col' className='px-6 py-3'>
                Price
              </th>
              <th scope='col' className='px-6 py-3'>
                <span className='sr-only'>Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className='bg-white border-b hover:bg-gray-50 '>
              <th
                scope='row'
                className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'
              >
                Apple MacBook Pro 17"
              </th>
              <td className='px-6 py-4'>Silver</td>
              <td className='px-6 py-4'>Laptop</td>
              <td className='px-6 py-4'>$2999</td>
              <td className='px-6 py-4 text-right'>
                <a href='#' className='font-medium text-blue-600  hover:underline'>
                  Edit
                </a>
              </td>
            </tr>
            <tr className='bg-white border-b  hover:bg-gray-50 '>
              <th
                scope='row'
                className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap '
              >
                Microsoft Surface Pro
              </th>
              <td className='px-6 py-4'>White</td>
              <td className='px-6 py-4'>Laptop PC</td>
              <td className='px-6 py-4'>$1999</td>
              <td className='px-6 py-4 text-right'>
                <a
                  href='#'
                  className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                >
                  Edit
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div> */}
    </>
  );
}

export default AddPreProcurement;
