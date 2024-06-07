//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash alam
//    Version - 1.0
//    Date - 21/05/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - BoqList
//    DESCRIPTION - BoqList
//////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { GoPlus } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import InventoryProposalList from "./BoqListIng";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ProjectApiList from "@/Components/api/ProjectApiList";
import { FaChartPie } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";
import { contextVar } from "@/Components/context/contextVar";
import { useContext } from "react";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import ThemeStyle from "@/Components/Common/ThemeStyle";
import ApiHeader from "@/Components/api/ApiHeader";

const BoqList = () => {
  const { inputStyle, labelStyle, headingStyle, formStyle, saveButtonColor } =
    ThemeStyle();

  const [activeTab, setActiveTab] = useState("inbox");
  const [category, setCategory] = useState();
  const [subcategory, setSubCategory] = useState();

  const navigate = useNavigate();
  const {
    api_fetchProcurementReleasedList,
    api_itemCategory,
    api_itemSubCategory,
  } = ProjectApiList();

  const { setheartBeatCounter, settoggleBar, titleBarVisibility, titleText } =
    useContext(contextVar);

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = () => {
    AxiosInterceptors.get(`${api_itemCategory}`, ApiHeader())
      .then(function (response) {
        console.log("item Categor", response.data.data);
        setCategory(response.data.data);
      })
      .catch(function (error) {
        console.log("errorrr.... ", error);
      });
  };

  const fetchSubCategory = (e) => {
    console.log(e?.target?.value);

    AxiosInterceptors.get(
      `${api_itemSubCategory}/${e?.target?.value}`,
      ApiHeader()
    )
      .then(function (response) {
        console.log("item Categor", response.data.data);
        setSubCategory(response.data.data);
      })
      .catch(function (error) {
        console.log("errorrr.... ", error);
      });
  };

  return (
    <>
      <div className="">
        <TitleBar
          titleBarVisibility={titleBarVisibility}
          titleText={"BOQ List"}
        />
      </div>

      <div className="container mx-auto bg-white rounded border border-blue-500 mt-6 shadow-xl">
        <h1 className="text-[25px] text-right pb-2 pr-10 pt-5 font-bold">
          {" "}
          BOQ Listing{" "}
        </h1>
        <div className="flex p-8 justify-center items-center">
          <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4">
            <label className={`${labelStyle} inline-block mb-2`}>
              Items Category
              <span className="text-xl text-red-500 pl-1">*</span>
            </label>
            <select
              // {...formik.getFieldProps("itemsubcategory")}
              className={`${inputStyle} inline-block w-full relative`}
              // onChange={formik.handleChange}
              onChange={(e)=>{
                fetchSubCategory(e)
              }}
            >
              <option defaultValue={"select"}>select</option>

              {category?.length &&
                category?.map((items) => (
                  <option key={items?.id} value={items?.id}>
                    {items?.name}
                  </option>
                ))}
            </select>

            {/* <p className='text-red-500 text-xs '>
                      {formik.touched.itemsubcategory &&
                      formik.errors.itemsubcategory
                        ? formik.errors.itemsubcategory
                        : null}
                    </p> */}
          </div>

          <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4">
            <label className={`${labelStyle} inline-block mb-2`}>
              Items Sub Category
              <span className="text-xl text-red-500 pl-1">*</span>
            </label>
            <select
              // {...formik.getFieldProps("itemsubcategory")}
              className={`${inputStyle} inline-block w-full relative`}
              // onChange={formik.handleChange}
            >
              <option defaultValue={"select"}>select</option>

              {subcategory?.length &&
                        subcategory?.map((items) => (
                          <option key={items?.id} value={items?.id}>
                            {items?.name}
                          </option>
                        ))}
            </select>

            {/* <p className='text-red-500 text-xs '>
                      {formik.touched.itemsubcategory &&
                      formik.errors.itemsubcategory
                        ? formik.errors.itemsubcategory
                        : null}
                    </p> */}
          </div>

          <div className="pt-4">
            <button className="bg-[#4338CA] hover:bg-[#5f54df] px-7 py-2 text-white font-semibold rounded shadow-lg">
              Search
            </button>
          </div>
        </div>

        <div className="flex ml-5">
          <button
            className={`py-2 px-4  hidden ${
              activeTab === "inbox"
                ? "border-b-2 border-blue-500 text-white bg-[#4338CA]"
                : "text-gray-500"
            } focus:outline-none flex border border-[#4338ca] rounded`}
            onClick={() => setActiveTab("inbox")}
          >
            <CiMenuBurger className="mt-1 mr-2 text-[1rem]" />
            Inbox
          </button>
        </div>

        <hr className="w-[76rem] mt-2" />

        <div className="mt-4">
          {activeTab === "inbox" && (
            <div>
              <InventoryProposalList
                page="inbox"
                api={api_fetchProcurementReleasedList}
              />
            </div>
          )}
          {/* {activeTab === 'outbox' && <div><InventoryProposalList page='outbox' api={api_fetchProcurementDAList} /></div>} */}
        </div>
      </div>
    </>
  );
};

export default BoqList;
