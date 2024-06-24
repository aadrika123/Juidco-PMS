import React, { useEffect, useState } from "react";
import ThemeStyle from "@/Components/Common/ThemeStyle";
import { useFormik } from "formik";

import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ApiHeader from "@/Components/api/ApiHeader";
import { ToastContainer, toast } from "react-toastify";
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
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "@/Components/Common/Modal/ConfirmationModal";

const StockRequestProposal = () => {
  const { inputStyle, labelStyle, headingStyle, formStyle } = ThemeStyle();

  const { titleBarVisibility } = useContext(contextVar);

  const navigate = useNavigate()

  const [confModal, setConfModal] = useState(false);


  // intitial value
  const initialValues = {
    empId: "",
    empName: "",
    subCategory: "",
    brand: "",
    quantAlot: "",
    totQuant: "",
    discription: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      setConfModal(true);
    },
    // validationSchema,
  });

  const confirmationHandler = (values) => {
    navigate('/dd-inventory-proposal')
    console.log("procurement==============>>", values);
  };
  const handleCancel = () => {
    setConfModal(false);
  };

  const handleOnChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    {
      name == "totalStock" &&
        formik.setFieldValue(
          "totalStock",
          allowNumberInput(value, formik.values.quantity, 100)
        );
    }
    {
      name == "receivedStock" &&
        formik.setFieldValue(
          "receivedStock",
          allowNumberInput(value, formik.values.rate, 100)
        );
    }
    {
      name == "remStock" &&
        formik.setFieldValue(
          "remStock",
          allowNumberInput(value, formik.values.totalRate, 100)
        );
    }
    {
      name == "dead_stock" && calculateRemainingStock(value);
    }
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
                        Sub Categories
                      </label>

                      <select
                        {...formik.getFieldProps("subCategory")}
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={formik.handleChange}
                      >
                        <option defaultValue={"select"}>select</option>
                        <option>Clothes</option>
                        <option>Furniture</option>
                        <option>Tech</option>

                        {/* {subcategory?.length &&
                          subcategory?.map((items) => (
                            <option key={items?.id} value={items?.id}>
                              {items?.name}
                            </option>
                          ))} */}
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
                        onChange={formik.handleChange}
                      >
                        <option defaultValue={"select"}>select</option>
                        <option>Clothes</option>
                        <option>Furniture</option>
                        <option>Tech</option>

                        {/* {subcategory?.length &&
                          subcategory?.map((items) => (
                            <option key={items?.id} value={items?.id}>
                              {items?.name}
                            </option>
                          ))} */}
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
                        Quantity Allotted
                      </label>

                      <input
                        name="quantAlot"
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={formik.handleChange}
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
                        value={formik.values.totQuant}
                      />

                      <p className="text-red-500 text-xs ">
                        {formik.touched.totQuant && formik.errors.totQuant
                          ? formik.errors.totQuant
                          : null}
                      </p>
                    </div>
                  </div>

                  <div className="form-group flex-shrink max-w-full px-4 w-full mb-4">
                    <div class="px-4 w-full mb-4">
                      <label className={`${labelStyle} inline-block mb-2`}>
                        Discription
                      </label>

                      <textarea
                        name="discription"
                        className={`${inputStyle} inline-block w-full relative h-20`}
                        onChange={formik.handleChange}
                        value={formik.values.discription}
                      />

                      <p className="text-red-500 text-xs ">
                        {formik.touched.discription && formik.errors.discription
                          ? formik.errors.discription
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
