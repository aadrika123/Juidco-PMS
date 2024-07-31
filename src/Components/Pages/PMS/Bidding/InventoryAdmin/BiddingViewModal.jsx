import React from "react";
import techIcon from "@/Components/assets/TechIcon.svg";
import featureicon from "@/Components/assets/Featuredicon1.svg";

const BiddingViewModal = ({ closeModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 transition-opacity z-[1000]">
      <div className="bg-white w-2/3 rounded-lg p-8 shadow-lg relative transform transition-transform scale-100 modal-pop">
        <button
          className="absolute top-1 right-2 text-gray-500 hover:text-blue-700"
          onClick={closeModal}
        >
          <p className="text-3xl pr-3">&times;</p>
        </button>
        {/* Modal content here */}
        <div className="bg-white rounded-lg shadow-xl space-y-5 border border-blue-500">
          <div className="p-7">
            <img
              src={techIcon}
              className="w-14 border border-gray-300 rounded-xl p-2 mb-5"
            />
            <h1 className="text-xl font-medium">Select Criteria </h1>
            <p className="font-extralight text-gray-400">Description</p>
          </div>

                  <div
                      className="border border-gray-300 rounded-xl flex m-5 cursor-pointer hover:border hover:border-blue-500"
                    //   onClick={() => setShowFields(true)}
                  >
                      <div className="flex justify-center items-center">
                          <img src={featureicon} alt="Feature Icon" className="text-blue-600 bg-blue-100 rounded-full h-10 w-10 text-[1.5rem] m-2" />
                          <div className="pt-0">
                             
                              <h1 className="text-gray-600">Technical Comparison </h1>
                              <h1 className="text-xs font-extralight text-gray-400">
                                  Assess Bidder Qualifications And Technical Quality.
                              </h1>
                          </div>
                      </div>
                      
                  </div>

          <div className="space-x-4 flex justify-end m-7">
            <button className="border border-[#4338ca] hover:bg-[#4338ca] hover:text-white px-10 py-2 rounded mb-5">
              Cancel
            </button>
            <button
              className="border border-[#4338ca] bg-[#4338ca] hover:bg-[#342b96] text-white px-10 py-2 rounded mb-5"
              // onClick={() => console.log(formValues)}
              onClick={() => setIsModalOpen(true)}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiddingViewModal;

