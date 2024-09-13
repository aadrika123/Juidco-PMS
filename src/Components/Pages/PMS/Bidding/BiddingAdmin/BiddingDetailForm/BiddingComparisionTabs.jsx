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
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { contextVar } from "@/Components/context/contextVar";
import { useContext } from "react";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import BiddingCreteria from "./BiddingCreteria";
// import TabsMenu from "./TabsMenu";
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
  const [previewData, setPreviewData] = useState([]);

  const { titleBarVisibility } = useContext(contextVar);
  const { api_getBidType, api_fetchProcurementDetById } = ProjectApiList();

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
    { label: "Bidder Details", tab: 2 },
  ];

  const finTechAndTechDone = [
    { label: "Financial Comparision", tab: 1, value: "financial" },
    { label: "Bidder Amount Details", tab: 2 },
    // { label: "Bidding Ratio", tab: 3 },
  ];

  const technical = [
    { label: "Technical Comparision", tab: 1, value: "technical" },
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
          if (
            response?.data?.data?.bid_type === "fintech" &&
            !response?.data?.data?.comparison.length
          ) {
            setTabDetails(finTech);
          } else if (
            response?.data?.data?.bid_type === "abc" &&
            response?.data?.data?.comparison.length
          ) {
            setTabDetails(finTechAndTechDone);
          } else if (response?.data?.data?.bid_type === "technical") {
            setTabDetails(technical);
          } else {
            setTabDetails(technical);
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

  const getBiddingDetails = (id) => {
    setisLoading(true);
    AxiosInterceptors.get(`${api_fetchProcurementDetById}/${id}`, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          setPreviewData(response?.data?.data);
          setisLoading(false);
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
    getBiddingDetails(ref);
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

      <div className={`${isLoading ? "blur-[2px] pointer-events-none" : ""}`}>
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
      <div
        className={`container mx-auto rounded mt-6 ${
          isLoading ? "blur-[2px] pointer-events-none" : ""
        }`}
      >
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
              biddingDetails={previewData}
              referenceNo={state}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default BiddingComparisionTabs;
