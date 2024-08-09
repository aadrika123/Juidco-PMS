//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash Alam
//    Version - 1.0
//    Date - 22/05/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - ReceivedInvtHome
//    DESCRIPTION - ReceivedInvtHome
//////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { contextVar } from "@/Components/context/contextVar";
import { useContext } from "react";
import TitleBar from "@/Components/Pages/Others/TitleBar";

import tender from "@/Components/assets/tender.png";
import bd from "@/Components/assets/basicdetails.svg";

import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import BiddingDetailForm from "./BiddingDetailForm";
import ProjectApiList from "@/Components/api/ProjectApiList";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ApiHeader from "@/Components/api/ApiHeader";
import toast from "react-hot-toast";

const BiddingDetails = () => {
  const { api_getBidType } = ProjectApiList();

  let [searchParams, setSearchParams] = useSearchParams();
  const [bidDetails, setBidDetails] = useState();
  const [bidderData, setBidderData] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [biddersCounts, setBidderCount] = useState();

  const navigate = useNavigate();
  const {state} = useLocation()

  console.log(bidderData)

  const { setBiddersCount, titleBarVisibility } = useContext(contextVar);

  const tabNo = Number(searchParams.get("tabNo"));

  const handleTabClick = (tabNo) => {
    navigate(`/${location.pathname}?tabNo=${tabNo}`);
  };

  const createBtnDetais = (num) => {
    const btnDetails = [];

    for (let i = 1; i <= num; i++) {
      btnDetails.push({
        label: `Bidder- 0${i}`,
        tab: i,
        img: bd,
      });
    }
    setBidDetails(btnDetails);
  };

  ///////////{*** APPLICATION FULL DETAIL ***}/////////

  const getApplicationDetail = () => {
    setisLoading(true);
    AxiosInterceptors.get(`${api_getBidType}/${state}`, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          setBidderData(response?.data?.data);
          setBidderCount(response?.data?.data?.no_of_bidders);
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

  // console.log(biddersCounts)

  useEffect(() => {

    getApplicationDetail()

    const biddersCount = localStorage.getItem("biddersCount");
    biddersCount && createBtnDetais(biddersCount);
  }, []);

  return (
    <>
      <div className="">
        <TitleBar
          titleBarVisibility={titleBarVisibility}
          titleText={"Bidding Form"}
        />
      </div>

      <div className="container mx-auto rounded mt-6 ">
        <div className="p-5 border shadow-xl rounded-md flex bg-white w-full justify-between">
          <div className="w-1/2 flex">
            <img src={tender} className="w-11" />

            <h1 className="font-bold text-xl pt-2 pl-3">Bidder Details</h1>
          </div>
        </div>

        <div className="flex mt-6">
          {bidDetails?.map((item, index) => (
            <button
              key={index}
              className={`py-2 px-2 mr-5 ${
                tabNo === item.tab
                  ? "border-b-2 border-blue-500 text-white bg-[#4338CA]"
                  : "text-gray-500 bg-white "
              } focus:outline-none flex shadow-xl border border-gray-300 rounded`}
              // onClick={() => handleTabClick(item.tab)}
            >
              <img src={item.img} className="pr-2" />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        {bidDetails?.map((item, index) => (
          <>
            {tabNo === item.tab && (
              <div
                className={`${tabNo >= item.tab ? "" : "disabled:bg-red-300"}`}
              >
                <BiddingDetailForm bidderData={bidderData} />
              </div>
            )}
          </>
        ))}
      </div>
    </>
  );
};

export default BiddingDetails;
