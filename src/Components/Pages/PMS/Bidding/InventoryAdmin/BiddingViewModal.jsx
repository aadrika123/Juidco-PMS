import React, { useState } from "react";
import techIcon from "@/Components/assets/TechIcon.svg";
import featureicon from "@/Components/assets/Featuredicon1.svg";
import { useNavigate } from "react-router-dom";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ProjectApiList from "@/Components/api/ProjectApiList";
import ApiHeader from "@/Components/api/ApiHeader";
import toast from "react-hot-toast";



const BiddingViewModal = ({ closeModal,refNo }) => {
  const [activeTab, setActiveTab] = useState("inbox");
  const [tabValue, setTabValue] = useState();

  const { api_postBidType } = ProjectApiList();

  // console.log(tabValue)

  const navigate = useNavigate();

  const tabs = [
    {
      title: "Technical Comparison",
      subTitle: "Assess Bidder Qualifications And Technical Quality.",
      tabIndex: 1,
      value: "technical",
    },
    {
      title: "Financial Comparison",
      subTitle: "Checks The Accuracy Of Bid Quantities And Rates.",
      tabIndex: 2,
      value: "financial",
    },
    {
      title: "Technical Comparison + Financial Comparison",
      subTitle:
        "Assess Bidder Qualifications And Technical Quality+ Checks The Accuracy Of Bid Quantities And Rates.",
      tabIndex: 3,
      value: "fintech",
    },
  ];

  const submitHandler = () => {
    // setIsLoading(true);

    AxiosInterceptors.post(
      `${api_postBidType}`,
      { reference_no:refNo ,bid_type: tabValue},
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status) {
         
          toast.success("Bid Type saved Succefull");
          navigate(`/bidding-commparision-tabs?tabNo=1`,{state:refNo});
        } else {
          toast.error("Error in approving. Please try Again");
        }
      })
      .catch(function (error) {
        console.log(error, "err res");
        toast.error(error?.response?.data?.error);
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };

  return (
    <div className="fixed w-full inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 transition-opacity z-[1000]">
      <div className="bg-white w-2/3 rounded-lg p-8 shadow-lg relative transform transition-transform scale-100 modal-pop">
        {/* Modal content here */}
        <div className="pl-7">
          <img
            src={techIcon}
            className="w-12 border border-gray-300 rounded-xl p-2 mb-5"
          />
          <h1 className="text-xl font-medium">Select Criteria </h1>
          <p className="font-extralight text-gray-400">Description</p>
        </div>

        {tabs?.map((data) => (
          <div
            className={` rounded-xl flex m-5 cursor-pointer border-2 hover:border-blue-500 hover:bg-slate-100 ${
              activeTab === data.tabIndex
                ? "border-2 border-blue-500 text-white bg-slate-100"
                : "text-gray-500"
            }`}
            onClick={() => {
              setActiveTab(data.tabIndex);
              setTabValue(data.value);
            }}
          >
            <div className="flex justify-center items-center p-2">
              <img
                src={featureicon}
                alt="Feature Icon"
                className="text-blue-600 bg-blue-100 rounded-full h-10 w-10 text-[1.5rem] m-2"
              />
              <div className="pt-0 pl-2">
                <h1 className="text-gray-600 ">{data.title} </h1>
                <h1 className="text-xs font-extralight text-gray-400">
                  {data.subTitle}
                </h1>
              </div>
            </div>
          </div>
        ))}

        <div className="space-x-4 flex justify-end">
          <button
            className="border border-[#4338ca] hover:bg-[#4338ca] hover:text-white px-10 py-2 rounded"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="border border-[#4338ca] bg-[#4338ca] hover:bg-[#342b96] text-white px-10 py-2 rounded"
            onClick={()=>submitHandler()}
            // onClick={()=>
            //   navigate(`/bidding-commparision-tabs?tabNo=1`,{state:refNo})
            // }
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default BiddingViewModal;
