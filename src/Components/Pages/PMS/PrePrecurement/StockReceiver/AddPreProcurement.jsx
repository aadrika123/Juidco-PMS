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
// import { toast } from "react-toastify";
import { Toaster, toast } from "react-hot-toast";
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
import { FormControl, MenuItem, Select, Tooltip } from "@mui/material";
import LoaderApi from "@/Components/Common/Loaders/LoaderApi";

function AddPreProcurement() {
  const { inputStyle, labelStyle, headingStyle, formStyle, loading } =
    ThemeStyle();

  const { titleBarVisibility } = useContext(contextVar);

  const navigate = useNavigate();

  const { state } = useLocation();

  const { page } = useParams();
  const {
    api_addProcurement,
    // api_itemCategory,
    api_getActiveSubCategory,
    api_getActiveCategory,
    api_itemSubCategory,
    api_itemBrand,
    api_getAllunit,
    api_getActiveUnit,
    api_fetchProcurementById,
    api_getProcItemRateContract,
    api_getActiveDesc,
    api_editProcurementById,
    api_getallProcItemRateContract,
  } = ProjectApiList();

  const [isLoading, setisLoading] = useState(false);
  const [itemCategory, setItemCategory] = useState();
  const [applicationFullData, setapplicationFullData] = useState();
  const [brandId, setBrandId] = useState();

  const [category, setCategory] = useState();
  const [subcategory, setSubCategory] = useState();
  const [units, setUnit] = useState();
  const [brand, setBrand] = useState();
  const [newSubCategory, setNewSubCategory] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [is_rate_contract, setRateContract] = useState(
    applicationFullData?.is_rate_contract || false
  );
  const [procItem, setProcItem] = useState([]);
  const [formData, setFormData] = useState([]);
  const [chooseItems, setChooseItems] = useState([]);
  const [supplierData, setSupplierData] = useState([]);
  const [categorySelected, setCategorySelected] = useState();
  const [editProcurementData, setEditProcurementData] = useState();
  const [selectedSupplier, setSelectedSupplier] = useState();
  const [supplierDetailsProc, setSupplierDetailsProc] = useState();
  const [descrip, setDescrip] = useState("");
  const [isDescTextOpen, setIsDescTextOpen] = useState(false);
  const [editApplicationData, setEditApplicationData] = useState([]);

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

    fetchSubCategory(data?.category?.id);
  };

  //if rate contract selected then,to chose items
  const getProcItemRateContract = (data) => {
    AxiosInterceptors.get(
      `${api_getProcItemRateContract}/${itemCategory}`,
      ApiHeader()
    )
      .then(function (response) {
        setProcItem(response?.data?.data);
console.log("data line 177", response?.data?.data)
        if (response?.data?.data && data) {
          setSubCategoryData(data, response?.data?.data);
        }
      })
      .catch(function (error) {
        toast.error("Something went wrong");
      });
  };

  // console.log('subcategorysubcategory',subcategory)

  const getAllProcItemRateContract = () => {
    AxiosInterceptors.get(
      `${api_getallProcItemRateContract}/${itemCategory}`,
      ApiHeader()
    )
      .then(function (response) {
        // console.log("res", response?.data?.data?.data);
        setSupplierData(response?.data?.data?.data);
      })
      .catch(function (error) {
        toast.error("Something went wrong");
      });
  };

  const applicationFullDataLength = applicationFullData
    ? Object.keys(applicationFullData).length
    : 0;

  // ══════════════════════════════║🔰 validationSchema 🔰║═══════════════════════════════════

  const validationSchema = yup.object({
    itemCategory: yup.string().required("Item category is required"),
    subcategory: yup.string().required("Sub category is required"),
    unit: yup.string().required("Unit is required"),
    brand: yup.string(),
    description: yup.string().required("Description is required"),
    rate: yup.number().required("Rate is required"),
    quantity: yup
      .number()
      .required("Quantity is required")
      .moreThan(0, "Quantity must be greater than 0"),
    // proc_item: yup.string(),
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
      applicationFullData?.category?.id ||
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
    rate:
      supplierDetailsProc?.rate_contract_supplier[0]?.unit_price ||
      editProcurementData?.rate ||
      "",
    subcategorytxt: editProcurementData?.subcategorytxt || "",
    brandtxt: editProcurementData?.brandtxt || "",
    proc_item: selectedSupplier?.id || "df",
    supplier: supplierDetailsProc?.supplier_master?.id || "",
  };
  // const formik = useFormik({
  //   initialValues: initialValues,
  //   enableReinitialize: true,
  //   onSubmit: (values, { resetForm }) => {
  //     const brandName = getBrandName(values.brand);
  //     setCategorySelected(values.itemCategory);
  //     values = { ...values, brand: brandName };
  //     setFormData((prev) => [...prev, values]);
  //     resetForm();
  //   },
  //   validationSchema,
  // });

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      const isDuplicateDescription = formData.some(
        (data) => data.description === values.description
      );

      if (isDuplicateDescription) {
        toast.error("This Product already exists in the list!");
        return;
      }

      const brandName = getBrandName(values.brand);

      // Find the description text by matching the id
      const selectedDescription = descrip.find(
        (desc) => desc.id === values.description
      );

      // Normalize data
      const normalizedData = {
        ...values,
        brand: brandName,
        brandId: brandId,
        brandtxt: values.brandtxt || "",
        subcategory: values.subcategory?.id || values.subcategory,
        subcategorytxt: values.subcategory?.name || "",
        description: values.description?.id || values.description,
        descriptionname: selectedDescription
          ? selectedDescription.description
          : "",
        itemCategory: values.itemCategory?.id || values.itemCategory,
        total_rate: values.quantity * values.rate,
        unit: values.unit?.id || values.unit,
        proc_item: values.proc_item || "",
        supplier: values.supplier || "",
      };

      setFormData((prev) => [...prev, normalizedData]);
      // resetForm(); // Reset form after submission
    },
    validationSchema,
  });

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
        toast.error(error?.response?.data?.message);
        // seterroState(true);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  // ══════════════════════════════║🔰calculate the total rate🔰║═══════════════════════════════════
  const calculateTotalRate = () => {
    const rate = Number(formik?.values?.rate) || 0;
    const quantity = Number(formik?.values?.quantity) || 0;
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
    // getDesc(value);

    AxiosInterceptors.get(`${api_getActiveSubCategory}/${value}`, ApiHeader())
      .then(function (response) {
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
    AxiosInterceptors.get(`${api_getActiveUnit}`, ApiHeader())
      .then(function (response) {
        setUnit(response?.data?.data);
      })
      .catch(function (error) {
        toast.error("Error in fetching Units");
      });
  };

  // submit form
  const submitForm = () => {
    setisLoading(true);
    let requestBody = {
      category: itemCategory,
      supplier: supplierDetailsProc?.id,
      procurement: formData,
      is_rate_contract,
    };

    let url;
    url = api_addProcurement;

    AxiosInterceptors.post(`${url}`, requestBody, ApiHeader())
      .then(function (response) {
        if (response?.data?.status === true) {
          setisLoading(false);
          setSuccessModal(true);
          setProcurement_no(response?.data?.procurement_no);
        } else {
          setisLoading(false);
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

  // update procurement api
  const updateProcurement = () => {
    setisLoading(true);
    let requestBody = {
      category: itemCategory,
      supplier: supplierDetailsProc?.id,
      procurement: formData,
      is_rate_contract,
    };
    AxiosInterceptors.post(api_editProcurementById, requestBody, ApiHeader())
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
        toast.error("Error in updating procurement");
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  const modalHandleClick = () => {
    setSuccessModal(false);
    navigate("/inventory-stockRequest?tabNo=2");
  };

  useEffect(() => {
    calculateTotalRate();
  }, [formik?.values?.quantity, formik?.values?.rate]);

  useEffect(() => {
    page == "edit" && getApplicationDetail();
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
    // console.log("datatatatat", name, "asdasdas", value);

    {
      name == "brand" && setBrandId(value);
    }
    {
      name == "supplier" && setSubCategoryData(value);
    }
    {
      name == "supplier" && getProcItemRateContract();
    }
    {
      name == "itemCategory" && value != "others" && fetchSubCategory(value);
    }
    {
      // name == "proc_item" && getSupplierName(value);
    }

    {
      name == "subcategory" && fetchBrand(value);
    }
    {
      name == "quantity" &&
        formik.setFieldValue(
          "quantity",
          allowNumberInput(value, formik?.values?.quantity, 100)
        );
    }
    {
      name == "rate" &&
        formik.setFieldValue(
          "rate",
          allowNumberInput(value, formik?.values?.rate, 100)
        );
    }
    {
      name == "total_rate" &&
        formik.setFieldValue(
          "total_rate",
          allowNumberInput(value, formik?.values?.total_rate, 100)
        );
    }
  };

  const getSupplierName = (id) => {
    // formik.setFieldValue("proc_item", String(id));
    // const data = procItem[id];

    const data = procItem?.find((data) => data.id === id);

    getDesc(formik?.values?.subcategory);
    setSelectedSupplier(data);
  };

  const setField = () => {
    formik.setFieldValue("subcategory", procItem[0]?.subcategory?.id);
  };

  useEffect(() => {
    setField();
  }, [formik?.values?.proc_item]);

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

  const handleAddDescription = () => {
    if (selectedCategory && description) {
      onAddDescription({ category: selectedCategory, description });
      setDescription(""); // Clear the description for future entries
    }
  };

  const setSubCategoryData = async (data, procItem) => {
    const filteredData = procItem?.filter((item) =>
      item?.rate_contract_supplier?.some((supplier) => supplier?.id === data)
    );
    setChooseItems(filteredData);
  };

  return (
    <>
      <div className="">
        <TitleBar
          titleBarVisibility={titleBarVisibility}
          titleText={"Pre Procurement Proposal"}
        />
      </div>
      {isLoading && <LoaderApi />}

      <div className={`${formStyle} border border-blue-500 mt-6 shadow-lg`}>
        <form onSubmit={formik.handleSubmit} onChange={handleOnChange}>
          <div className="">
            <div className=" grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 container mx-auto capitalize">
              <div className="col-span-12  w-full mb-20">
                <div className=" ml-4 p-2">
                  <h1 className={`${headingStyle} text-right pb-3 p-6`}>
                    Add Pre Procurement
                  </h1>
                </div>
                <div className="hidden md:block lg:block">
                  <hr className="border w-full border-gray-200" />
                </div>
                <div className="px-5 mt-4 flex justify-between gap-2 items-center">
                  <div className="form-group flex-shrink max-w-full md:w-1/3 px-4 mb-4">
                    <label className={`${labelStyle} inline-block mb-2`}>
                      Item Category
                      <span className="text-xl text-red-500 pl-1">*</span>{" "}
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
                      <option value="">select</option>

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
                    <p className="text-red-500 text-xs ">
                      {formik.touched.itemCategory && formik.errors.itemCategory
                        ? formik.errors.itemCategory
                        : null}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex gap-2 items-center">
                      <input
                        type="checkbox"
                        className="w-6 h-6 cursor-pointer"
                        disabled={!itemCategory}
                        onChange={() => {
                          setRateContract((prev) => !prev);
                          // getProcItemRateContract();
                          getAllProcItemRateContract();
                        }}
                      />
                      <p className="font-semibold whitespace-nowrap">
                        Applied by Rate Contract
                      </p>
                    </div>
                  </div>
                </div>

                {is_rate_contract && (
                  <div className="flex gap-2 items-center px-8 mt-4">
                    <div className="form-group flex-shrink max-w-full w-1/2 px-4">
                      <label className={`${labelStyle} inline-block mb-2`}>
                        Select Supplier
                        <span className="text-xl text-red-500 pl-1">
                          *
                        </span>{" "}
                      </label>
                      <select
                        {...formik.getFieldProps("supplier")}
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={(e) => {
                          formik.handleChange(e);
                          getProcItemRateContract(e.target.value);
                        }}
                        disabled={
                          formik?.values?.quantity || formData?.length > 0
                        }
                        value={formik?.values?.supplier}
                      >
                        <option value="select">select</option>

                        {supplierData?.length &&
                          supplierData?.map((items, index) => (
                            <option key={index} value={items?.id}>
                              {items?.supplier_master?.name}
                            </option>
                          ))}
                        {/* {selectedSupplier?.rate_contract_supplier?.length &&
                          selectedSupplier?.rate_contract_supplier?.map(
                            (items, index) => (
                              <option
                                key={index}
                                value={items?.supplier_master?.id}
                              >
                                {items?.supplier_master?.name}
                              </option>
                            )
                          )} */}
                      </select>
                    </div>
                  </div>
                )}

                {is_rate_contract && (
                  <div className="flex gap-2 items-center px-8 mt-4">
                    <div className="form-group flex-shrink max-w-full w-1/2 px-4 ">
                      <label className={`${labelStyle} inline-block mb-2`}>
                        Choose Item
                        <span className="text-xl text-red-500 pl-1">
                          *
                        </span>{" "}
                      </label>
                      <FormControl fullWidth>
                        <Select
                          {...formik.getFieldProps("proc_item")}
                          name="proc_item"
                          className={`${inputStyle} inline-block w-full relative`}
                          onChange={(e) => {
                            // Preserve supplier value explicitly
                            const currentSupplier = formik.values.supplier;

                            formik.setFieldValue("proc_item", e?.target?.value);

                            // Maintain the current supplier value after related updates
                            setTimeout(() => {
                              formik.setFieldValue("supplier", currentSupplier);
                            }, 0);

                            getDesc(procItem[0]?.subcategory?.id);
                            getSupplierName(e?.target?.value);
                            setSupplierDetails(e?.target?.value);
                          }}
                          value={formik?.values?.proc_item}
                        >
                          <MenuItem value="df">select</MenuItem>

                          {chooseItems?.length &&
                            chooseItems?.map((items, index) => (
                              <MenuItem
                                id={items?.id}
                                key={items?.id}
                                value={items?.id}
                                className=""
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
                  </div>
                )}

                <div className="shadow-md sm:rounded-lg my-10 mx-6 mb-10 overflow-auto">
                  {formData?.length || applicationFullDataLength > 0 ? (
                    <table className="w-full text-sm text-left rtl:text-right px-6 overflow-auto">
                      <thead className="text-xs text-gray-700 uppercase bg-slate-200">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            S No.
                          </th>
                          <th scope="col" className="px-6 py-3">
                            SubCategory
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Brand
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Unit
                          </th>
                          <th scope="col" className="px-6 py-3 w-[25rem]">
                            Description
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Total Quantity
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Rate
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Total Rate
                          </th>
                          <th scope="col" className="px-6 py-3"></th>
                        </tr>
                      </thead>

                      {page == "edit" && (
                        <tbody>
                          {applicationFullData?.procurement_stocks?.map(
                            (data, index) => (
                              <tr
                                className="bg-white border-b hover:bg-gray-50 "
                                key={data?.id}
                              >
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4">
                                  {data?.subCategory?.name}
                                </td>
                                <td className="px-6 py-4">
                                  {data?.brand == null ? "N/A" : data?.brand}
                                </td>
                                <td className="px-6 py-4">
                                  {" "}
                                  {data?.unit?.name}
                                </td>
                                <td className="px-6 py-4 w-[10rem] whitespace-normal break-words">
                                  {data.description}
                                </td>
                                <td className="px-6 py-4 ">{data.quantity}</td>
                                <td className="px-6 py-4 ">
                                  {indianAmount(data.rate)}
                                </td>
                                <td className="px-6 py-4">
                                  {indianAmount(data.total_rate)}
                                </td>
                                <td className="px-6 py-4 text-right cursor-pointer">
                                  <span className=" ">
                                    <FiEdit
                                      fontSize={18}
                                      color="green"
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
                            <tr
                              className="bg-white border-b hover:bg-gray-50 "
                              key={index}
                            >
                              <td className="px-6 py-4">{index + 1}</td>
                              <td className="px-6 py-4">
                                {form.subcategorytxt
                                  ? form.subcategorytxt
                                  : subcategory?.find(
                                      (subcat) => subcat.id === form.subcategory
                                    )?.name}
                              </td>
                              <td className="px-6 py-4">
                                {form.brandtxt ? form.brandtxt : form?.brand}
                              </td>
                              <td className="px-6 py-4">
                                {
                                  units?.find((data) => data.id === form.unit)
                                    ?.name
                                }
                              </td>
                              <td className="px-6 py-4 w-[5rem] break-words">
                                <td className="px-6 py-4 w-[5rem] break-words">
                                  {form.descriptionname}
                                </td>
                              </td>
                              <td className="px-6 py-4 ">{form.quantity}</td>
                              <td className="px-6 py-4 ">
                                {indianAmount(form.rate)}
                              </td>
                              <td className="px-6 py-4">
                                {indianAmount(form.total_rate)}
                              </td>
                              <td className="px-6 py-4 text-right cursor-pointer">
                                <span className=" hover:text-red-500">
                                  <MdOutlineDelete
                                    fontSize={18}
                                    color="red"
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

                {page === "create" && (
                  <div className="mb-24 m-10 p-3 border border-gray-200 shadow-md rounded">
                    <div className=" valid-form flex flex-wrap flex-row">
                      <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4">
                        <label className={`${labelStyle} inline-block mb-2`}>
                          Items Sub Category
                          <span className="text-xl text-red-500 pl-1">*</span>
                        </label>

                        {formik?.values?.itemCategory == "others" ? (
                          <input
                            type="text"
                            name="subcategorytxt"
                            className={`${inputStyle} inline-block w-full relative`}
                            onChange={(e) => {
                              formik.handleChange;
                            }}
                            value={formik?.values?.subcategorytxt}
                            disabled={is_rate_contract}
                          />
                        ) : (
                          <select
                            {...formik.getFieldProps("subcategory")}
                            className={`${inputStyle} inline-block w-full relative`}
                            onChange={formik.handleChange}
                            // disabled={is_rate_contract}
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

                        <p className="text-red-500 text-xs ">
                          {formik.touched.subcategory &&
                          formik.errors.subcategory
                            ? formik.errors.subcategory
                            : null}
                        </p>
                      </div>

                      <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4">
                        <label className={`${labelStyle} inline-block mb-2`}>
                          Unit
                          <span className="text-xl text-red-500 pl-1">*</span>
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

                        <p className="text-red-500 text-xs ">
                          {formik.touched.unit && formik.errors.unit
                            ? formik.errors.unit
                            : null}
                        </p>
                      </div>

                      <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4">
                        <label className={`${labelStyle} inline-block mb-2`}>
                          Brand
                        </label>

                        {formik?.values?.itemCategory == "others" ? (
                          <input
                            type="text"
                            name="brandtxt"
                            className={`${inputStyle} inline-block w-full relative`}
                            onChange={formik.handleChange}
                            value={formik?.values?.brandtxt}
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

                        <p className="text-red-500 text-xs ">
                          {formik.touched.brand && formik.errors.brand
                            ? formik.errors.brand
                            : null}
                        </p>
                      </div>

                      <div className="form-group flex-shrink max-w-full px-4 w-full md:w-full mb-5">
                        <label className={`${labelStyle} inline-block mb-2`}>
                          Description
                        </label>

                        {isDescTextOpen || page === "edit" ? (
                          <div className="flex gap-0 relative">
                            <textarea
                              type="text"
                              name="description"
                              className={`${inputStyle} inline-block w-full relative h-24`}
                              onChange={formik.handleChange}
                              value={
                                is_rate_contract
                                  ? formik?.values?.description
                                  : formik?.values?.description
                              }
                            />
                            <div onClick={() => setIsDescTextOpen(false)}>
                              <ImCancelCircle
                                fontSize={20}
                                className="absolute right-0 top-[2px]"
                              />
                            </div>
                          </div>
                        ) : (
                          <>
                            <select
                              {...formik.getFieldProps("description")}
                              className={`${inputStyle} inline-block w-full relative`}
                              onChange={(e) => {
                                const selectedValue = e?.target?.value;
                                if (selectedValue === "others") {
                                  setIsDescTextOpen(true);
                                } else {
                                  formik.setFieldValue(
                                    "description",
                                    selectedValue
                                  );
                                }
                              }}
                              value={
                                is_rate_contract
                                  ? formik?.values?.description || ""
                                  : formik?.values?.description || ""
                              }
                            >
                              <option value="">select</option>
                              {Array.isArray(descrip) &&
                                descrip.map((items) => (
                                  <option
                                    key={items.id}
                                    value={items.id}
                                    className="w-10"
                                  >
                                    {items.description}
                                  </option>
                                ))}
                              <option value="others">Others</option>
                            </select>
                          </>
                        )}

                        <p className="text-red-500 text-xs">
                          {formik.touched.description &&
                          formik.errors.description
                            ? formik.errors.description
                            : null}
                        </p>
                      </div>
                    </div>

                    <div className="valid-form flex flex-wrap flex-row mx-4">
                      <div className="form-group flex-shrink max-w-full w-full mb-4">
                        <label
                          className={`${labelStyle} inline-block mb-4 font-semibold`}
                        >
                          Quantity
                        </label>

                        <div className="flex items-center space-x-5">
                          <div>
                            <label
                              className={`${labelStyle} inline-block mb-2`}
                            >
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
                              value={formik?.values?.rate}
                              placeholder="Rate"
                              // disabled={formik?.values?.supplier}
                            />
                            <p className="text-red-500 text-xs ">
                              {formik.touched.rate && formik.errors.rate
                                ? formik.errors.rate
                                : null}
                            </p>
                          </div>
                          <p className="pt-8">X</p>
                          <div>
                            <label
                              className={`${labelStyle} inline-block mb-2`}
                            >
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
                              value={formik?.values?.quantity}
                              placeholder="Quantity"
                            />
                            <p className="text-red-500 text-xs ">
                              {formik.touched.quantity && formik.errors.quantity
                                ? formik.errors.quantity
                                : null}
                            </p>
                          </div>
                          <p className="pt-8">=</p>
                          <div>
                            <label
                              className={`${labelStyle} inline-block mb-2`}
                            >
                              Total Rate
                            </label>
                            <input
                              type="number"
                              name="total_rate"
                              className={`${inputStyle} inline-block w-full relative`}
                              // onChange={formik.handleChange}
                              value={formik?.values?.total_rate}
                              placeholder="Total Rate"
                              disabled
                            />
                            <p className="text-red-500 text-xs ">
                              {formik.touched.total_rate &&
                              formik.errors.total_rate
                                ? formik.errors.total_rate
                                : null}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4  space-x-5">
                      <button
                        type="submit"
                        // type='button'
                        // onClick
                        className={`bg-blue-500 flex items-center gap-2 rounded-md hover:bg-[#4478b7] px-4 py-2.5 text-white font-semibold leading-5 shadow-lg `}
                      >
                        <IoMdAddCircleOutline className="text-xl" />
                        {page == "edit" ? "UPDATE" : "ADD"}
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-3 mt-8 pr-8">
                  {page === "edit" ? (
                    <button
                      onClick={() => navigate(-1)}
                      className={`bg-white px-6 py-3 text-black rounded leading-5 shadow-lg  hover:bg-[#1A4D8C] hover:text-white border-blue-900 border`}
                    >
                      Back
                    </button>
                  ) : (
                    <button
                      onClick={openCancelModal}
                      className={`bg-white px-2 py-3 text-black rounded leading-5 shadow-lg  hover:bg-[#1A4D8C] hover:text-white border-blue-900 border`}
                    >
                      Cancel
                    </button>
                  )}

                  {page !== "edit" ? (
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className={`bg-[#4338CA] border-blue-900 border hover:bg-[#4478b7] px-7 py-3 text-white font-semibold rounded leading-5 shadow-lg float-right
                      `}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className={`${loading}`}></div>
                      ) : (
                        "Save"
                      )}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={`bg-[#4338CA] border-blue-900 border hover:bg-[#4478b7] px-7 py-3 text-white font-semibold rounded leading-5 shadow-lg float-right`}
                      disabled={isLoading}
                      onClick={updateProcurement}
                    >
                      {isLoading ? (
                        <div className={`${loading}`}></div>
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  )}
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
