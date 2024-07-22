import { useState } from "react";
import Report from "@/assets/Images/reports.svg";
import ThemeStyle from "@/Components/Common/ThemeStyle";
import { useFormik } from "formik";

export default function Reports() {
  const [formData, setFormData] = useState();
  const { inputStyle, labelStyle, headingStyle, formStyle } = ThemeStyle();

  // intitial value
  const initialValues = {
    reportType: "",
    fromDate: "",
    toDate: "",
    category: "",
    subcategory: "",
    rate: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      setFormData(values);
    },
    // validationSchema,
  });

  return (
    <div>
      <div className='bg-[#4338ca] p-2 rounded-md px-6'>
        <h2 className='text-xl font-medium flex items-center gap-3 text-white'>
          <img alt='report icon' src={Report} />
          Reports
        </h2>
      </div>

      <div className='rounded-md border border-gray-200 bg-white my-2'>
        <form
          onSubmit={formik.handleSubmit}
          className=' valid-form flex flex-wrap flex-row py-6 '
        >
          <div className='w-full flex flex-wrap'>
            <div className='form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4'>
              <label className={`${labelStyle} inline-block mb-2`}>
                Reports Type
                <span className='text-xl text-red-500 pl-1'>*</span>{" "}
              </label>
              <select
                {...formik.getFieldProps("reportType")}
                className={`${inputStyle} inline-block w-full relative`}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
              >
                <option defaultValue={"select"}>select</option>

                {/* {category?.length &&
                category?.map((items, index) => (
                  <option key={index} value={items?.id}>
                    {items?.name}
                  </option>
                ))} */}
                <option>others</option>
              </select>
              <p className='text-red-500 text-xs '>
                {formik.touched.category && formik.errors.category
                  ? formik.errors.category
                  : null}
              </p>
            </div>

            <div className='form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4'>
              <label className={`${labelStyle} inline-block mb-2`}>
                From Date
                <span className='text-xl text-red-500 pl-1'>*</span>{" "}
              </label>
              <select
                {...formik.getFieldProps("reportType")}
                className={`${inputStyle} inline-block w-full relative`}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
              >
                <option defaultValue={"select"}>select</option>

                {/* {category?.length &&
                category?.map((items, index) => (
                  <option key={index} value={items?.id}>
                    {items?.name}
                  </option>
                ))} */}
                <option>others</option>
              </select>
              <p className='text-red-500 text-xs '>
                {formik.touched.category && formik.errors.category
                  ? formik.errors.category
                  : null}
              </p>
            </div>

            <div className='form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4'>
              <label className={`${labelStyle} inline-block mb-2`}>
                To Date
                <span className='text-xl text-red-500 pl-1'>*</span>{" "}
              </label>
              <select
                {...formik.getFieldProps("reportType")}
                className={`${inputStyle} inline-block w-full relative`}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
              >
                <option defaultValue={"select"}>select</option>

                {/* {category?.length &&
                category?.map((items, index) => (
                  <option key={index} value={items?.id}>
                    {items?.name}
                  </option>
                ))} */}
                <option>others</option>
              </select>
              <p className='text-red-500 text-xs '>
                {formik.touched.fromDate && formik.errors.fromDate
                  ? formik.errors.fromDate
                  : null}
              </p>
            </div>
          </div>

          <div className='w-full flex flex-wrap'>
            <div className='form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4'>
              <label className={`${labelStyle} inline-block mb-2`}>
                Reports Type
                <span className='text-xl text-red-500 pl-1'>*</span>{" "}
              </label>
              <select
                {...formik.getFieldProps("reportType")}
                className={`${inputStyle} inline-block w-full relative`}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
              >
                <option defaultValue={"select"}>select</option>

                {/* {category?.length &&
                category?.map((items, index) => (
                  <option key={index} value={items?.id}>
                    {items?.name}
                  </option>
                ))} */}
              </select>
              <p className='text-red-500 text-xs '>
                {formik.touched.category && formik.errors.category
                  ? formik.errors.category
                  : null}
              </p>
            </div>

            <div className='form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4'>
              <label className={`${labelStyle} inline-block mb-2`}>
                From Date
                <span className='text-xl text-red-500 pl-1'>*</span>{" "}
              </label>
              <select
                {...formik.getFieldProps("reportType")}
                className={`${inputStyle} inline-block w-full relative`}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
              >
                <option defaultValue={"select"}>select</option>

                {/* {category?.length &&
                category?.map((items, index) => (
                  <option key={index} value={items?.id}>
                    {items?.name}
                  </option>
                ))} */}
              </select>
              <p className='text-red-500 text-xs '>
                {formik.touched.category && formik.errors.category
                  ? formik.errors.category
                  : null}
              </p>
            </div>

            <div className='form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4'>
              <label className={`${labelStyle} inline-block mb-2`}>
                To Date
                <span className='text-xl text-red-500 pl-1'>*</span>{" "}
              </label>
              <select
                {...formik.getFieldProps("reportType")}
                className={`${inputStyle} inline-block w-full relative`}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
              >
                <option defaultValue={"select"}>select</option>

                {/* {category?.length &&
                category?.map((items, index) => (
                  <option key={index} value={items?.id}>
                    {items?.name}
                  </option>
                ))} */}
              </select>
              <p className='text-red-500 text-xs '>
                {formik.touched.category && formik.errors.category
                  ? formik.errors.category
                  : null}
              </p>
            </div>
          </div>

          <div className='w-full flex flex-wrap'>
            <div className='form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4'>
              <label className={`${labelStyle} inline-block mb-2 text-sm`}>
                Reports Typess
                <span className='text-xl text-red-500 pl-1'>*</span>{" "}
              </label>
              <select
                {...formik.getFieldProps("reportType")}
                className={`${inputStyle} inline-block w-full relative`}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
              >
                <option defaultValue={"select"}>select</option>

                {/* {category?.length &&
                category?.map((items, index) => (
                  <option key={index} value={items?.id}>
                    {items?.name}
                  </option>
                ))} */}
              </select>
              <p className='text-red-500 text-xs '>
                {formik.touched.category && formik.errors.category
                  ? formik.errors.category
                  : null}
              </p>
            </div>

            <div className='form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4'>
              <label className={`${labelStyle} inline-block mb-2`}>
                From Date
                <span className='text-xl text-red-500 pl-1'>*</span>{" "}
              </label>
              <select
                {...formik.getFieldProps("reportType")}
                className={`${inputStyle} inline-block w-full relative`}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
              >
                <option defaultValue={"select"}>select</option>

                {/* {category?.length &&
                category?.map((items, index) => (
                  <option key={index} value={items?.id}>
                    {items?.name}
                  </option>
                ))} */}
              </select>
              <p className='text-red-500 text-xs '>
                {formik.touched.category && formik.errors.category
                  ? formik.errors.category
                  : null}
              </p>
            </div>

            <div className='form-group flex-shrink max-w-full px-4 w-full md:w-1/3 flex items-center'>
              <button
                type='submit'
                className={`w-full mt-4 bg-[#4338CA] border-blue-900 border hover:bg-[#4478b7] px-7 py-2 text-white font-semibold rounded leading-5 shadow-lg float-right `}
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
