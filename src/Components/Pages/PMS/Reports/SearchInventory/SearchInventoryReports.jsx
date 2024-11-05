import React, { useEffect, useState } from "react";
import Report from "@/assets/Images/reports.svg";
import { useFormik } from "formik";
import ThemeStyle from "@/Components/Common/ThemeStyle";
import ProjectApiList from "@/Components/api/ProjectApiList";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ApiHeader from "@/Components/api/ApiHeader";
import { Autocomplete, TextField } from "@mui/material";
import SearchInventoryReportList from "./SearchInventoryReportList";

const SearchInventoryReports = () => {
  const { inputStyle, labelStyle } = ThemeStyle();
  const [suppliers, setSuppliers] = useState([]);

  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [subSupplier, setSupplier] = useState([]);

  //   const [description, setDescription] = useState("");
  const [supplierValue, setSupplierValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [subCategoryValue, setSubCategoryValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [submit, setSubmit] = useState(true);

//   console.log(submit,"submit")

 

  const {
    api_getActiveCategory,
    api_getActiveSubCategory,
    api_getActiveSuppliers,
    api_getInventoryList,
  } = ProjectApiList();

  // intitial value
  const initialValues = {
    category: "",
    subCategory: "",
    suppliers: "",
    search: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
    },
    // validationSchema,
  });

  const handleChange = (event, newValue) => {
    setDescription(newValue); // Update the selected value in state
  };

  //get all active category
  const getSuppliers = () => {
    AxiosInterceptors.get(`${api_getActiveSuppliers}`, ApiHeader())
      .then(function (response) {
        if (response?.data?.status === true) {
          setSuppliers(response?.data?.data);
          // notify(response?.data?.message, "success");
        } else {
          toast.error(response?.data?.message, "error");
        }
      })
      .catch(function (res) {
        toast.error("Error in fetching Ctaegories");
      });
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
        toast.error("Error in fetching Ctaegories");
      });
  };

  //get all active subcategory
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
        notify("Error in fetching sub category");
      });
  };

  const formatSearchStringIntoArray = (search) => {
    const arr = search.split(",");
    let str = "";
    arr?.map((item, index) => {
      str += index === 0 ? `search=${item}` : `&search=${item}`;
    });
    // return str
    setSearchValue(str);
  };

  useEffect(() => {
    getSuppliers();
    getCategory();
  }, []);

  return (
    <>
      <div className="bg-[#4338ca] p-2 rounded-md px-6">
        <h2 className="text-xl font-medium flex items-center gap-3 text-white">
          <img alt="report icon" src={Report} />
          Search History Reports
        </h2>
      </div>

      <div className="rounded-md border border-gray-200 bg-white my-2">
        <form
          onSubmit={formik.handleSubmit}
          className=" valid-form flex flex-wrap flex-row py-6 "
        >
          <div className="w-full flex flex-wrap">
            <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4">
              <label className={`${labelStyle} inline-block mb-2 text-sm`}>
                Category
              </label>
              <select
                {...formik.getFieldProps("category")}
                className={`${inputStyle} inline-block w-full relative`}
                onChange={(e) => {
                  formik.handleChange(e);
                  getSubCategory(e.target.value);
                  setCategoryValue(e.target.value);
                }}
              >
                <option value={""}>select</option>
                {category?.length &&
                  category?.map((items, index) => (
                    <option key={index} value={items?.id}>
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

            <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4">
              <label className={`${labelStyle} inline-block mb-2 text-sm`}>
                Sub Category
              </label>
              <select
                {...formik.getFieldProps("subCategory")}
                className={`${inputStyle} inline-block w-full relative`}
                onChange={(e) => {
                  formik.handleChange(e);
                  setSubCategoryValue(e.target.value);
                }}
              >
                <option value={""}>select</option>

                {subCategory?.length &&
                  subCategory?.map((items, index) => (
                    <option key={index} value={items?.id}>
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

            <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4">
              <label className={`${labelStyle} inline-block mb-2 text-sm`}>
                Supplier
              </label>
              <select
                {...formik.getFieldProps("suppliers")}
                className={`${inputStyle} inline-block w-full relative`}
                onChange={(e) => {
                  formik.handleChange(e);
                  setSupplierValue(e.target.value);
                }}
              >
                <option value={""}>select</option>

                {suppliers?.length &&
                  suppliers?.map((items, index) => (
                    <option key={index} value={items?.id}>
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

            <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4">
              <label className={`${labelStyle} inline-block mb-2 text-sm`}>
                Search
              </label>

              {/* <input
                type="text"
                name="search"
                value={formik.values.search}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`${inputStyle} inline-block w-full relative`}
              /> */}
              <input
                type="text"
                name="search"
                onChange={(e) => formatSearchStringIntoArray(e.target.value)}
                className={`${inputStyle} inline-block w-full relative`}
              />

              <p className="text-red-500 text-xs ">
                {formik.touched.search && formik.errors.search
                  ? formik.errors.search
                  : null}
              </p>
            </div>
          </div>

          <div className="form-group flex-shrink w-full px-4 flex gap-4 justify-end">
            {/* <button
              type="reset"
              className={`mt-4 border border-[#4478b7] text-[#4478b7] hover:bg-[#4478b7]  px-7 py-2 hover:text-white font-semibold rounded leading-5 shadow-lg float-right`}
            >
              Reset
            </button> */}

            <button
              type="button"
              className={`mt-4 hover:bg-[#4478b7] bg-blue-700 px-7 py-2 text-white font-semibold rounded leading-5 shadow-lg float-right`}
              onClick={()=> setSubmit((prev) => !prev)            
            }

            >
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="rounded-md border border-gray-200 bg-white my-2">
        <SearchInventoryReportList
          page="inbox"
          api={api_getInventoryList}
          //   serviceFilter={"warranty"}
          //   serviceStatus={"23"}
          supplierValue={supplierValue}
          categoryValue={categoryValue}
          subCategoryValue={subCategoryValue}
          searchValue={searchValue}
          submit={submit}
        />
      </div>
    </>
  );
};

export default SearchInventoryReports;
