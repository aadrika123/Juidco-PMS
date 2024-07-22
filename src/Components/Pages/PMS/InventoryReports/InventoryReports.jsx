import { useState } from "react";
import Report from "@/assets/Images/reports.svg";
import ThemeStyle from "@/Components/Common/ThemeStyle";
import { useFormik } from "formik";
import ListTableParent from "@/Components/Common/ListTable2/ListTableParent";
import { Columns } from "lucide-react";
import ProjectApiList from "@/Components/api/ProjectApiList";

export default function InventoryReports() {
  const [formData, setFormData] = useState();
  const { inputStyle, labelStyle, headingStyle, formStyle } = ThemeStyle();
  // const { api_fetchProcurementList, api_fetchProcurementDAList } =
  //   ProjectApiList();

  // Initial values
  const initialValues = {
    totalStock: "",
    stockMovement: "",
    remainingStock: "",
    deadStock: "",
    preProcurementStock: "",
    postProcurementStock: "", // Changed field name
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
    <>
      <div>
        <div className="bg-[#4338ca] p-2 rounded-md px-6">
          <h2 className="text-xl font-medium flex items-center gap-3 text-white">
            <img alt="report icon" src={Report} />
            Inventory Reports
          </h2>
        </div>

        <div className="rounded-md border border-gray-200 bg-white my-2">
          <form
            onSubmit={formik.handleSubmit}
            className="valid-form flex flex-wrap flex-row py-6"
          >
            <div className="w-full flex flex-wrap">
              <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4">
                <label className={`${labelStyle} inline-block mb-2`}>
                  Total Stock
                  <span className="text-xl text-red-500 pl-1">*</span>
                </label>
                <input
                  type="text"
                  {...formik.getFieldProps("totalStock")}
                  className={`${inputStyle} inline-block w-full relative`}
                />
                <p className="text-red-500 text-xs ">
                  {formik.touched.totalStock && formik.errors.totalStock
                    ? formik.errors.totalStock
                    : null}
                </p>
              </div>

              <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4">
                <label className={`${labelStyle} inline-block mb-2`}>
                  Stock Movement
                  <span className="text-xl text-red-500 pl-1">*</span>
                </label>
                <input
                  type="text"
                  {...formik.getFieldProps("stockMovement")}
                  className={`${inputStyle} inline-block w-full relative`}
                />
                <p className="text-red-500 text-xs ">
                  {formik.touched.stockMovement && formik.errors.stockMovement
                    ? formik.errors.stockMovement
                    : null}
                </p>
              </div>

              <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4">
                <label className={`${labelStyle} inline-block mb-2`}>
                  Remaining Stock
                  <span className="text-xl text-red-500 pl-1">*</span>
                </label>
                <input
                  type="text"
                  {...formik.getFieldProps("remainingStock")}
                  className={`${inputStyle} inline-block w-full relative`}
                />
                <p className="text-red-500 text-xs ">
                  {formik.touched.remainingStock && formik.errors.remainingStock
                    ? formik.errors.remainingStock
                    : null}
                </p>
              </div>
            </div>

            <div className="w-full flex flex-wrap">
              <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4">
                <label className={`${labelStyle} inline-block mb-2`}>
                  Dead Stock
                  <span className="text-xl text-red-500 pl-1">*</span>
                </label>
                <input
                  type="text"
                  {...formik.getFieldProps("deadStock")}
                  className={`${inputStyle} inline-block w-full relative`}
                />
                <p className="text-red-500 text-xs ">
                  {formik.touched.deadStock && formik.errors.deadStock
                    ? formik.errors.deadStock
                    : null}
                </p>
              </div>

              <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4">
                <label className={`${labelStyle} inline-block mb-2`}>
                  Pre-Procurement Stock
                  <span className="text-xl text-red-500 pl-1">*</span>
                </label>
                <input
                  type="text"
                  {...formik.getFieldProps("preProcurementStock")}
                  className={`${inputStyle} inline-block w-full relative`}
                />
                <p className="text-red-500 text-xs ">
                  {formik.touched.preProcurementStock &&
                  formik.errors.preProcurementStock
                    ? formik.errors.preProcurementStock
                    : null}
                </p>
              </div>

              <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4">
                <label className={`${labelStyle} inline-block mb-2`}>
                  Post-Procurement Stock
                  <span className="text-xl text-red-500 pl-1">*</span>
                </label>
                <input
                  type="text"
                  {...formik.getFieldProps("postProcurementStock")}
                  className={`${inputStyle} inline-block w-full relative`}
                />
                <p className="text-red-500 text-xs ">
                  {formik.touched.postProcurementStock &&
                  formik.errors.postProcurementStock
                    ? formik.errors.postProcurementStock
                    : null}
                </p>
              </div>
            </div>

            <div className="w-full flex flex-wrap">
              <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4">
                <label className={`${labelStyle} inline-block mb-2 text-sm`}>
                  Pre-Procurement Status (Either)
                  <span className="text-xl text-red-500 pl-1">*</span>
                </label>
                <select
                  {...formik.getFieldProps("preProcurementStatus")}
                  className={`${inputStyle} inline-block w-full relative`}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                >
                  <option defaultValue={"select"}>select</option>
                  <option>others</option>
                </select>
                <p className="text-red-500 text-xs ">
                  {formik.touched.preProcurementStatus &&
                  formik.errors.preProcurementStatus
                    ? formik.errors.preProcurementStatus
                    : null}
                </p>
              </div>

              <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4">
                <label className={`${labelStyle} inline-block mb-2`}>
                  Post-Procurement Status (Either)
                  <span className="text-xl text-red-500 pl-1">*</span>
                </label>
                <select
                  {...formik.getFieldProps("postProcurementStatus")}
                  className={`${inputStyle} inline-block w-full relative`}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                >
                  <option defaultValue={"select"}>select</option>
                  <option>others</option>
                </select>
                <p className="text-red-500 text-xs ">
                  {formik.touched.postProcurementStatus &&
                  formik.errors.postProcurementStatus
                    ? formik.errors.postProcurementStatus
                    : null}
                </p>
              </div>

              <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/3 flex items-center">
                <button
                  type="submit"
                  className={`w-full mt-4 bg-[#4338CA] border-blue-900 border hover:bg-[#4478b7] px-7 py-2 text-white font-semibold rounded leading-5 shadow-lg float-right `}
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="rounded-md border border-gray-200 bg-white my-2">
        <ListTableParent
          // table={tableSelector(props?.page)}
          // api={api_fetchProcurementList}
          columns={Columns}
          // requestBody={requestBody} // sending bodyy
          // changeData={changeData} // send action for new payload
        />
      </div>
    </>
  );
}
