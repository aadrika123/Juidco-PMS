//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash alam
//    Version - 1.0
//    Date - 07/06/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - BoqSearch
//    DESCRIPTION - BoqSearch
//////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BoqListing from "./BoqListIng";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ProjectApiList from "@/Components/api/ProjectApiList";
import { CiMenuBurger } from "react-icons/ci";
import { contextVar } from "@/Components/context/contextVar";
import { useContext } from "react";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import ThemeStyle from "@/Components/Common/ThemeStyle";
import ApiHeader from "@/Components/api/ApiHeader";
import BoqListTable from "@/Components/Common/ExportTable/BoqListTable";
import { MdArrowRightAlt } from "react-icons/md";
import ShimmerEffectInline from "@/Components/Common/Loaders/ShimmerEffectInline";
import { FaChartPie } from "react-icons/fa6";

const BoqSearch = () => {
  const { inputStyle, labelStyle } = ThemeStyle();

  const [activeTab, setActiveTab] = useState("inbox");
  const [category, setCategory] = useState();
  const [subcategory, setSubCategory] = useState();
  const [categoryId, setCategoryId] = useState();
  const [subcategoryId, setSubCategoryId] = useState();
  const [refresh, setRefresh] = useState(true);
  const [dataList, setdataList] = useState();
  const [showBoqList, setShowBoqList] = useState(false);
  const [proNos, setProNos] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const {
    api_fetchProcurementReleasedList,
    api_fetchBoqList,
    api_itemCategory,
    api_itemSubCategory,
    api_postToAccountant,
  } = ProjectApiList();

  const { titleBarVisibility } = useContext(contextVar);

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

  const fetchSubCategory = (catId) => {
    // console.log(catId);
    setCategoryId(catId);

    AxiosInterceptors.get(`${api_itemSubCategory}/${catId}`, ApiHeader())
      .then(function (response) {
        console.log("item Categor", response.data.data);
        setSubCategory(response.data.data);
      })
      .catch(function (error) {
        console.log("errorrr.... ", error);
      });
  };

  const boqListingFunc = () => {
    setLoading(true);

    setTimeout(() => {
      fetchBoqList();
    }, 500);
  };

  const fetchBoqList = () => {
    AxiosInterceptors.get(
      `${api_fetchBoqList}?category=${categoryId}&scategory=${subcategoryId}`,
      ApiHeader()
    )
      .then((res) => {
        if (res?.data?.status == true) {
          // console.log("success getting list => ", res?.data?.data);

          // props?.getData && props?.allData(res?.data);
          setdataList(res?.data?.data);
          // setPagination(res?.data?.pagination);
          // settotalCount(res?.data?.pagination?.totalPage);
          // setcurrentPage(res?.data?.pagination?.currentPage);
          // setlastPage(res?.data?.pagination?.currentTake);
        } else {
          console.log("false error while getting list => ", res);
        }
      })
      .catch(function (error) {
        console.log("errorrr.... ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // console.log(proNos);

  const prepareForBoq = () => {
    navigate(`/create-boq`, { state: { proNos } });
  };

  useEffect(() => {
    fetchCategory();
  }, [refresh]);

  // console.log(dataList);
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
              onChange={(e) => {
                fetchSubCategory(e.target.value);
                // console.log(re.target.value)
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

            
          </div>

          <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4">
            <label className={`${labelStyle} inline-block mb-2`}>
              Items Sub Category
              <span className="text-xl text-red-500 pl-1">*</span>
            </label>
            <select
              // {...formik.getFieldProps("itemsubcategory")}
              className={`${inputStyle} inline-block w-full relative`}
              onChange={(e) => {
                setSubCategoryId(e.target.value);
              }}
            >
              <option defaultValue={"select"}>select</option>

              {subcategory?.length &&
                subcategory?.map((items) => (
                  <option key={items?.id} value={items?.id}>
                    {items?.name}
                  </option>
                ))}
            </select>

            
          </div>

          <div className="pt-4">
            <button
              className="bg-[#4338CA] hover:bg-[#5f54df] px-7 py-2 text-white font-semibold rounded shadow-lg"
              onClick={boqListingFunc}
            >
              Search
            </button>
          </div>
        </div>

        <div className=" flex justify-between">
          <div className="flex ml-5">
            <button
              className={`py-2 px-4 ${
                activeTab === "inbox"
                  ? "border-b-2 border-blue-500 text-white bg-[#4338CA]"
                  : "text-gray-500"
              } focus:outline-none flex border border-[#4338ca] rounded`}
              onClick={() => setActiveTab("inbox")}
            >
              <FaChartPie className="m-1 text-[1rem]" />
              Inbox
            </button>
            <button
              className={`ml-4 py-2 px-4 ${
                activeTab === "outbox"
                  ? "border-b-2 border-blue-500 text-white bg-[#4338CA]"
                  : "text-gray-500"
              } focus:outline-none flex border border-[#4338ca] rounded`}
              onClick={() => setActiveTab("outbox")}
            >
              <FaChartPie className="m-1 text-[1rem]" />
              Outbox
            </button>
          </div>

          <div className=" mr-5">
            <button
              className="bg-[#4338ca] hover:bg-[#3d3592] text-white p-2 rounded flex"
              onClick={prepareForBoq}
            >
              Prepare BOQ <MdArrowRightAlt className="text-2xl ml-2" />
            </button>
          </div>
        </div>

        <hr className="w-[76rem] mt-2 mb-10" />

        <div className="mt-4">
          {loading ? (
            <ShimmerEffectInline />
          ) : (
            <>
              {activeTab === "inbox" && (
                <div>
                  {dataList?.length > 0 ? (
                    <BoqListTable
                      dataList={dataList}
                      setProNos={setProNos}
                      proNos={proNos}
                    />
                  ) : (
                    <div className="bg-red-100 border flex justify-center items-center border-red-400 text-red-700 rounded text-center m-3">
                      <h1 className="p-3">No Data Available</h1>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "outbox" && (
                <div>
                  <BoqListTable dataList={dataList} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BoqSearch;