//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash alam
//    Version - 1.0
//    Date - 21/05/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - EditPreProcurementIa
//    DESCRIPTION - EditPreProcurementIa
//////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import ThemeStyle from "@/Components/Common/ThemeStyle";
import { useFormik } from "formik";
import { FiSave } from "react-icons/fi";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ApiHeader from "@/Components/api/ApiHeader";
import { toast } from "react-toastify";
import PreProcurementSubmittedScreen from "./PreProcurementSubmittedScreen";
import * as yup from "yup";
import { allowNumberInput } from "@/Components/Common/PowerUps/PowerupFunctions";
import ProjectApiList from "@/Components/api/ProjectApiList";
import PreProcurementCancelScreen from "./PreProcurementCancelScreen";
import { contextVar } from "@/Components/context/contextVar";
import { useContext } from "react";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import { useLocation, useNavigate } from "react-router-dom";
import { ImCancelCircle } from "react-icons/im";
import { indianAmount } from "@/Components/Common/PowerupFunctions";
import { FiEdit } from "react-icons/fi";
import { FormControl, MenuItem, Select, Tooltip } from "@mui/material";
import LoaderApi from "@/Components/Common/Loaders/LoaderApi";

function EditPreProcurementIa() {
  const { inputStyle, labelStyle, headingStyle, formStyle, loading } =
    ThemeStyle();

  const { titleBarVisibility } = useContext(contextVar);

  const navigate = useNavigate();

  const { state } = useLocation();

  const {
    // api_itemCategory,
    api_getActiveCategory,
    api_itemSubCategory,
    api_itemBrand,
    api_getAllunit,
    api_fetchProcurementById,
    api_getProcItemRateContract,
    api_getActiveDesc,
    api_editProcurementById,
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
  const [is_rate_contract, setRateContract] = useState(
    applicationFullData?.is_rate_contract || false
  );
  const [procItem, setProcItem] = useState([]);
  const [formData, setFormData] = useState([]);
  const [categorySelected, setCategorySelected] = useState();
  const [procData, setProcData] = useState({});
  const [editProcurementData, setEditProcurementData] = useState();
  const [selectedSupplier, setSelectedSupplier] = useState();
  const [editApplicationData, setEditApplicationData] = useState([]);

  //setting is editable true on edit icon button click
  const handleEdit = (id) => {
    setEditApplicationData((prev) => {
      const isEditable = prev.procurement_stocks?.map((stocks) => ({
        ...stocks,
        isEditable: stocks?.id === id,
      }));

      return {
        ...prev,
        procurement_stocks: isEditable,
      };
    });
    const data = editApplicationData?.procurement_stocks.find(
      (data) => data?.id == id
    );
    setEditProcurementData(data);
    // console.log(data?.category?.id)
    fetchSubCategory(data?.category?.id);
  };

  //cancel the editing option
  const handleCancel = (id) => {
    setEditApplicationData(applicationFullData);
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
    // proc_item: yup.string(),
  });

  // intitial value
  const initialValues = {
    itemCategory: applicationFullData?.category?.id || "",
    subcategory: editProcurementData?.subCategory?.id || "",
    brand: editProcurementData?.brand?.id || "",
    unit: editProcurementData?.unit?.id || "",
    description: editProcurementData?.description || "",
    quantity: editProcurementData?.quantity || "",
    rate: editProcurementData?.rate || "",
    subcategorytxt: editProcurementData?.subcategorytxt || "",
    brandtxt: editProcurementData?.brandtxt || "",
    proc_item: "df",
    supplier: "",
  };

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

  //adding gst
  const updateProcField = (e, procNo) => {
    const { name, value } = e.target;
    setEditApplicationData((prev) => {
      const updatedProcurement = prev.procurement_stocks.map((data) => ({
        ...data,
        [name]: data.id === procNo ? value : data?.[name],
      }));
      const procurement = updatedProcurement?.find(
        (data) => data?.id === procNo
      );
      setProcData(procurement);
      return {
        ...prev,
        procurement_stocks: updatedProcurement,
      };
    });
  };

  ///////////{*** APPLICATION FULL DETAIL ***}/////////
  const getApplicationDetail = () => {
    setisLoading(true);
    AxiosInterceptors.get(`${api_fetchProcurementById}/${state}`, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          setapplicationFullData(response?.data?.data);
          setEditApplicationData(response?.data?.data);
        } else {
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

  // update procurement api
  const updateProcurement = () => {
    setisLoading(true);
    let requestBody = {
      id: procData.id,
      subcategory: procData?.subCategory?.id || procData?.subCategory,
      brand: procData?.brand || procData?.brand?.id,
      unit: procData?.unit?.id || procData?.unit,
      description: procData?.description,
      rate: procData?.rate,
      total_rate: procData?.total_rate,
      quantity: procData?.quantity,
    };

    AxiosInterceptors.post(api_editProcurementById, requestBody, ApiHeader())
      .then(function (response) {
        if (response?.data?.status === true) {
          getApplicationDetail();
          // notify(response?.data?.message, "success");
          // navigate("/sr-inventory-proposal");
          toast.success("Procurement updated successfully");
        } else {
          setisLoading(false);
          // notify(response?.data?.message, "error");
          // navigate("/sr-inventory-proposal");
        }
      })
      .catch(function (error) {
        setisLoading(false);
        toast.error("Error in updating procurement");
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  useEffect(() => {
    getApplicationDetail();
  }, []);

  useEffect(() => {
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
      name == "proc_item" && getSupplierName(value);
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
  };

  const getSupplierName = (id) => {
    // formik.setFieldValue("proc_item", String(id));
    // const data = procItem[id];
    const data = procItem?.find((data) => data.id === id);
    setSelectedSupplier(data);
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
      {isLoading ? (
        <LoaderApi />
      ) : (
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
                        <span className='text-xl text-red-500 pl-1'>
                          *
                        </span>{" "}
                      </label>
                      <select
                        {...formik.getFieldProps("itemCategory")}
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={formik.handleChange}
                        disabled
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
                        {formik.touched.itemCategory &&
                        formik.errors.itemCategory
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
                          checked={applicationFullData?.is_rate_contract}
                          value={is_rate_contract}
                          disabled
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
                        <FormControl fullWidth>
                          <Select
                            {...formik.getFieldProps("proc_item")}
                            name='proc_item'
                            className={`${inputStyle} inline-block w-full relative  `}
                            onChange={(e) => {
                              formik.setFieldValue("proc_item", e.target.value);
                              getSupplierName(e.target.value);
                            }}
                            value={formik.values.proc_item}
                          >
                            <MenuItem value='df'>select</MenuItem>

                            {procItem?.length &&
                              procItem?.map((items, index) => (
                                <MenuItem
                                  id={items?.id}
                                  key={items?.id}
                                  value={items?.id}
                                  className=''
                                >
                                  <Tooltip title={items?.description}>
                                    {items?.subcategory?.name} (
                                    {items?.description.slice(0, 63)})
                                  </Tooltip>
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
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
                          value={formik.values.supplier}
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
                      </div>
                    </div>
                  )}

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
                              Unit
                            </th>
                            <th scope='col' className='px-6 py-3 w-[25rem]'>
                              Description
                            </th>
                            <th scope='col' className='px-6 py-3'>
                              Total Quantity
                            </th>
                            <th scope='col' className='px-6 py-3'>
                              Rate
                            </th>
                            <th scope='col' className='px-6 py-3'>
                              Total Rate
                            </th>
                            <th scope='col' className='px-6 py-3'></th>
                          </tr>
                        </thead>

                        <tbody>
                          {editApplicationData?.procurement_stocks?.map(
                            (data, index) => (
                              <tr className='bg-white border-b hover:bg-gray-50 '>
                                <td className='px-6 py-4'>{index + 1}</td>

                                {/* subcategory */}

                                <td
                                  className={`${
                                    data?.isEditable ? "px-0" : "px-6"
                                  } py-4`}
                                >
                                  {data?.isEditable ? (
                                    <div className='block max-w-full w-full'>
                                      <select
                                        className={`${inputStyle} inline-block w-full relative`}
                                        onChange={(e) =>
                                          updateProcField(e, data?.id)
                                        }
                                        name='subCategory'
                                        value={data?.subCategory?.id}
                                      >
                                        <option value={""}>select</option>

                                        {subcategory?.length &&
                                          subcategory?.map((items) => (
                                            <option
                                              key={items?.id}
                                              value={items?.id}
                                            >
                                              {items?.name}
                                            </option>
                                          ))}
                                      </select>
                                    </div>
                                  ) : (
                                    data?.subCategory?.name
                                  )}
                                </td>

                                {/* brand
                                <td className='px-6 py-4'>
                                  {data?.isEditable ? (
                                    <div className='block max-w-full w-full'>
                                      <select
                                        {...formik.getFieldProps("brand")}
                                        className={`${inputStyle} inline-block w-full relative`}
                                        onChange={formik.handleChange}
                                      >
                                        <option value={""}>select</option>

                                        {brand?.length &&
                                          brand?.map((items) => (
                                            <option
                                              key={items?.id}
                                              value={items?.id}
                                            >
                                              {items?.name}
                                            </option>
                                          ))}
                                      </select>

                                      <p className='text-red-500 text-xs '>
                                        {formik.touched.brand &&
                                        formik.errors.brand
                                          ? formik.errors.brand
                                          : null}
                                      </p>
                                    </div>
                                  ) : data?.brand == null ? (
                                    "N/A"
                                  ) : (
                                    data?.brand
                                  )}
                                </td> */}

                                <td
                                  className={`${
                                    data?.isEditable ? "px-2" : "px-6"
                                  } py-4`}
                                >
                                  {data?.isEditable ? (
                                    <div className='form-group flex-shrink max-w-full w-fullmb-4'>
                                      <select
                                        // {...formik.getFieldProps("unit")}
                                        className={`${inputStyle} inline-block w-full relative`}
                                        onChange={(e) =>
                                          updateProcField(e, data?.id)
                                        }
                                        name='unit'
                                        value={data?.unit?.id}
                                      >
                                        <option value={""}>select</option>

                                        {units?.length &&
                                          units?.map((items) => (
                                            <option
                                              key={items?.id}
                                              value={items?.id}
                                            >
                                              {items?.name}
                                            </option>
                                          ))}
                                      </select>

                                      <p className='text-red-500 text-xs '>
                                        {formik.touched.unit &&
                                        formik.errors.unit
                                          ? formik.errors.unit
                                          : null}
                                      </p>
                                    </div>
                                  ) : (
                                    data?.unit?.name
                                  )}
                                </td>

                                <td
                                  className={`${
                                    data?.isEditable ? "px-2" : "px-6"
                                  } py-4 w-[10rem] whitespace-normal break-words`}
                                >
                                  {data?.isEditable ? (
                                    <div className='form-group flex-shrink max-w-full w-full md:w-full '>
                                      <div className='flex gap-0 relative'>
                                        <textarea
                                          type='text'
                                          name='description'
                                          className={`${inputStyle} inline-block w-full relative h-24`}
                                          onChange={(e) =>
                                            updateProcField(e, data?.id)
                                          }
                                          //   value={formik.values.description}
                                          value={data?.description}
                                        />
                                      </div>
                                    </div>
                                  ) : (
                                    data.description
                                  )}
                                </td>

                                <td
                                  className={`${
                                    data?.isEditable ? "px-2" : "px-6"
                                  } py-4`}
                                >
                                  {data?.isEditable ? (
                                    <input
                                      name='quantity'
                                      value={data?.quantity}
                                      onChange={(e) =>
                                        updateProcField(e, data?.id)
                                      }
                                      className={`${inputStyle} inline-block w-full relative`}
                                    />
                                  ) : (
                                    data.quantity
                                  )}
                                </td>
                                <td
                                  className={`${
                                    data?.isEditable ? "px-2" : "px-6"
                                  } py-4`}
                                >
                                  {data?.isEditable ? (
                                    <input
                                      name='rate'
                                      value={data?.rate}
                                      onChange={(e) =>
                                        updateProcField(e, data?.id)
                                      }
                                      className={`${inputStyle} inline-block w-full relative`}
                                    />
                                  ) : (
                                    indianAmount(data.rate)
                                  )}
                                </td>
                                <td className='px-6 py-4'>
                                  {indianAmount(
                                    Number(data?.quantity) *
                                      Number(data?.rate) || data.total_rate
                                  )}
                                </td>
                                <td className='px-6 py-4 text-right cursor-pointer'>
                                  {data?.isEditable ? (
                                    <div className='flex gap-3'>
                                      <span className='hover:text-white hover:bg-red-500 text-red-600 p-2 rounded-full'>
                                        <ImCancelCircle
                                          fontSize={22}
                                          onClick={() => handleCancel(data?.id)}
                                        />
                                      </span>
                                      <span
                                        disabled={isLoading}
                                        className='hover:text-white hover:bg-green-500 text-green-600 p-2 rounded-full'
                                      >
                                        {isLoading ? (
                                          <div className={`${loading}`}></div>
                                        ) : (
                                          <FiSave
                                            fontSize={25}
                                            disabled={isLoading}
                                            onClick={updateProcurement}
                                          />
                                        )}
                                      </span>
                                    </div>
                                  ) : (
                                    <span className=' '>
                                      <FiEdit
                                        fontSize={18}
                                        color='green'
                                        onClick={() => handleEdit(data?.id)}
                                      />
                                    </span>
                                  )}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    ) : (
                      <span></span>
                    )}
                  </div>

                  <div className='flex justify-end gap-3 mt-8 pr-8'>
                    <button
                      onClick={() => navigate(-1)}
                      className={`bg-white px-6 py-3 text-black rounded leading-5 shadow-lg  hover:bg-[#1A4D8C] hover:text-white border-blue-900 border`}
                    >
                      Back
                    </button>

                    {/* <button
                      type='button'
                      className={`bg-[#4338CA] border-blue-900 border hover:bg-[#4478b7] px-7 py-3 text-white font-semibold rounded leading-5 shadow-lg float-right`}
                      disabled={isLoading}
                      onClick={updateProcurement}
                    >
                      {isLoading ? (
                        <div className={`${loading}`}></div>
                      ) : (
                        "Save Changes"
                      )}
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default EditPreProcurementIa;
