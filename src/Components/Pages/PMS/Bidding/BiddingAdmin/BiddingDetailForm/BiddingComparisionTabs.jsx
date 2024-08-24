//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash Alam
//    Version - 1.0
//    Date - 22/07/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - BiddingComparisionTabs
//    DESCRIPTION - BiddingComparisionTabs
//////////////////////////////////////////////////////////////////////////////////////

// src/components/BiddingComparisionTabs.js
import React, { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { FaChartPie } from "react-icons/fa";
import { contextVar } from "@/Components/context/contextVar";
import { useContext } from "react";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import BiddingCreteria from "./BiddingCreteria";
// import TabsMenu from "./TabsMenu";
import techIcon from "@/Components/assets/TechIcon.svg";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ApiHeader from "@/Components/api/ApiHeader";
import ProjectApiList from "@/Components/api/ProjectApiList";
import toast from "react-hot-toast";
import LoaderApi from "@/Components/Common/Loaders/LoaderApi";

const BiddingComparisionTabs = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [bidderData, setBidderData] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [tabDetails, setTabDetails] = useState([]);

  const { titleBarVisibility } = useContext(contextVar);
  const { api_getBidType } = ProjectApiList();

  const { state } = useLocation();
  // console.log(state)

  const navigate = useNavigate();

  const location = useLocation();
  const tabNo = Number(searchParams.get("tabNo") || "?tabNo=1");

  const handleTabClick = (tabNo) => {
    navigate(`/${location.pathname}?tabNo=${tabNo}`);
  };

  const finTech = [
    { label: "Technical Comparision", tab: 1, value: "technical" },
    { label: "Financial Comparision", tab: 2, value: "financial" },
    { label: "Bidder Details", tab: 3 },
  ];

  const technical = [
    { label: "Technical Comparision", tab: 1, value: "technical" },
    { label: "Bidder Details", tab: 2 },
  ];

  const financial = [
    { label: "Financial Comparision", tab: 1, value: "financial" },
    { label: "Bidder Details", tab: 2 },
  ];

  const getApplicationDetail = (ref) => {
    setisLoading(true);
    AxiosInterceptors.get(`${api_getBidType}/${ref}`, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          setBidderData(response?.data?.data);
          setisLoading(false);
          //setting tab buttons
          if (response?.data?.data?.bid_type === "fintech") {
            setTabDetails(finTech);
          } else if (response?.data?.data?.bid_type === "technical") {
            setTabDetails(technical);
          } else {
            setTabDetails(financial);
          }
        } else {
          setisLoading(false);
          toast.error(response?.data?.message);
        }
      })
      .catch(function (error) {
        toast.error("Error while fetching data");
        console.log("details by id error...", error);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  useEffect(() => {
    state && localStorage.setItem("reference_no", state);
    const ref = localStorage.getItem("reference_no");
    getApplicationDetail(ref);
  }, []);

  return (
    <>
      {isLoading && <LoaderApi />}
      <div className=''>
        <TitleBar
          titleBarVisibility={titleBarVisibility}
          titleText={"Bidding Comparision"}
        />
      </div>

      <div className=''>
        <div className='flex justify-between items-center'>
          <div className='flex mt-2'>
            {tabDetails?.map((item, index) => (
              <button
                key={index}
                disabled
                className={`py-2 px-2 mr-5 ${
                  tabNo === item.tab
                    ? "border-b-2 border-blue-500 text-white bg-[#4338CA]"
                    : "text-gray-500 bg-white "
                } focus:outline-none flex shadow-xl border border-gray-300 rounded justify-center items-center space-x-4`}
                onClick={() => handleTabClick(item.tab)}
              >
                <HiArrowPathRoundedSquare className='m-1 text-[1.2rem]' />

                {item.label}
              </button>
            ))}
          </div>
          <div className='mt-6'></div>
        </div>
      </div>
      <div className='container mx-auto rounded  mt-6'>
        {tabDetails?.map((tabs) => (
          <div
            className={`${tabNo >= 1 ? "stockReq" : "disabled:bg-red-300"} ${
              tabs.tab !== tabNo ? "hidden" : ""
            }`}
          >
            <BiddingCreteria
              heading={tabs?.label}
              page={"stockReq"}
              tabNo={tabs?.tab}
              bidderData={bidderData}
              tabValue={tabs?.value}
              tabDetails={tabDetails}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default BiddingComparisionTabs;
