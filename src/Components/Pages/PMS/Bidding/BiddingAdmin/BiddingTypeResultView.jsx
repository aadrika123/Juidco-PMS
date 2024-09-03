import ImageModal from "@/Components/Pages/Others/ImageModal/ImageModal";
import React, { useContext, useEffect, useState } from "react";
import img from "@/Components/assets/banner1.jpg";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import LoaderApi from "@/Components/Common/Loaders/LoaderApi";
import { contextVar } from "@/Components/context/contextVar";
import toast from "react-hot-toast";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ApiHeader from "@/Components/api/ApiHeader";
import ProjectApiList from "@/Components/api/ProjectApiList";
import { useNavigate, useParams } from "react-router-dom";
import { CleanHands } from "@mui/icons-material";
import { indianAmount } from "@/Components/Common/PowerupFunctions";
import { MdArrowRightAlt } from "react-icons/md";

const BiddingTypeResultView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    api_getCompareBidder,
    api_postWinner,
    api_finalizeWinner,
    api_getBidType,
  } = ProjectApiList();
  const [imageModal, setImageModal] = useState(false);
  const [imageData, setImageData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [applicationData, setApplicationData] = useState();
  const [biddingData, setBiddingData] = useState();
  const { titleBarVisibility } = useContext(contextVar);

  let temp = [];

  const getApplicationDetail = () => {
    setIsLoading(true);
    AxiosInterceptors.get(`${api_getCompareBidder}/${id}`, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          setApplicationData(response?.data?.data?.bidDetails);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          toast.error(response?.data?.message);
        }
      })
      .catch(function (error) {
        toast.error("Error while fetching data");
        console.log("details by id error...", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getBiddingDetail = () => {
    setIsLoading(true);
    AxiosInterceptors.get(`${api_getBidType}/${id}`, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          setBiddingData(response?.data?.data);

          setIsLoading(false);
        } else {
          setIsLoading(false);
          toast.error(response?.data?.message);
        }
      })
      .catch(function (error) {
        toast.error("Error while fetching data");
        console.log("details by id error...", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // console.log("---------->", applicationData?.finComparison);

  // const selectWinnerPost = async () => {
  //   setIsLoading(true);
  //   let payload = { reference_no: id, winners: selectedBidder };

  //   AxiosInterceptors.post(api_postWinner, payload, ApiHeader())
  //     .then(function (response) {
  //       if (response?.data?.status) {
  //         toast.success("Winner Selected Succesfully");

  //         if (
  //           applicationData?.bid_type === "fintech" &&
  //           applicationData?.finComparison == false
  //         ) {
  //           navigate("/bidding-type", { state: id });
  //         } else {
  //           finalizeWinner();
  //         }

  //       } else {
  //         setIsLoading(false);
  //         toast.error("Error in Creating form.");
  //       }
  //     })
  //     .catch(function (error) {
  //       setIsLoading(false);
  //       toast.error(error?.response?.data?.error);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // };

  // const finalizeWinner = async () => {
  //   setIsLoading(true);
  //   let payload = { reference_no: id };

  //   AxiosInterceptors.post(api_finalizeWinner, payload, ApiHeader())
  //     .then(function (response) {
  //       if (response?.data?.status) {
  //         toast.success("Winner Finalize Succesfully");
  //       } else {
  //         setIsLoading(false);
  //         toast.error("Error in Creating form.");
  //       }
  //     })
  //     .catch(function (error) {
  //       setIsLoading(false);
  //       toast.error(error?.response?.data?.error);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // };

  // console.log(biddingData?.bidder_master)

  const setImageFunc = (id) => {
    const bidder = biddingData?.bidder_master.filter((obj) => id == obj?.id);

    if (bidder?.length > 1) {
      return toast.error("Two Bidders With Same ID's are found");
    }

    if (biddingData?.bid_type == "fintech") {
      bidder[0].bidder_doc?.map((data) => {
        if (data?.criteria_type == "financial") {
          setImageData(data?.doc_path);
        }
      });
    } else {
      setImageData(bidder[0]?.bidder_doc[0]?.doc_path);
    }
  };

  useEffect(() => {
    getBiddingDetail();
    getApplicationDetail();
  }, []);

  if (imageModal) {
    return (
      <>
        <ImageModal
          imageModal={imageModal}
          setImageModal={setImageModal}
          imageUrl={imageData}
        />
      </>
    );
  }

  // console.log("winner:", biddingData);

  return (
    <>
      {isLoading && <LoaderApi />}

      <TitleBar
        titleBarVisibility={titleBarVisibility}
        titleText={"Bidding Type Details"}
      />
      <div className={`${isLoading ? "blur-[2px]" : ""}`}>
        <div className=''>
          <h2 className=' text-2xl pl-7 pt-2 pb-2 flex justify-start bg-[#4338ca] text-white rounded-md'>
            On the Basis of{" "}
            {applicationData?.bid_type == "technical"
              ? "Technical"
              : applicationData?.bid_type == "financial"
              ? "Financial"
              : ""}{" "}
            Qualification the Analysis are :-
          </h2>
        </div>

        {/* Bidder details */}
        <div className=''>
          <div className='bg-white p-2 mt-5 rounded-md '>
            {/* 1st Info */}
            <div className='relative overflow-x-auto'>
              <table className='w-full text-sm text-left rtl:text-right border-b  text-gray-500'>
                <thead className=' text-gray-500  bg-gray-200 '>
                  <tr>
                    <th
                      scope='col'
                      className=' text-center border-r border-l border-gray-300'
                    >
                      S no.
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-5 text-center border-r border-l border-gray-300'
                    >
                      Bidder name
                    </th>

                    {applicationData?.comparison?.map((data) =>
                      data?.comparison_criteria?.map((criteData) => {
                        if (!temp.includes(criteData?.criteria?.id)) {
                          temp.push(criteData?.criteria?.id);
                          return (
                            <th
                              scope='col'
                              className='px-6 py-5 text-center border-r border-gray-300 '
                            >
                              <p className='text-base'>
                                {criteData?.criteria?.heading}
                              </p>
                              <p className='text-sm truncate w-[15rem]'>
                                {criteData?.criteria?.description}
                              </p>
                            </th>
                          );
                        }
                      })
                    )}

                    <th
                      scope='col'
                      className='px-6 py-5 text-center border-r border-l border-gray-300 bg-[#4338ca] text-white'
                    >
                      Total
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-5 text-center border-r border-l border-gray-300'
                    >
                      Rank
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {applicationData?.comparison?.map((data, index) => (
                    <tr className='bg-white '>
                      <th
                        scope='row'
                        className='px-6 py-5 text-center border-r border-l border-gray-300 font-medium text-gray-900 whitespace-nowrap'
                      >
                        {index + 1}
                      </th>
                      <th
                        scope='row'
                        className='px-6 py-5 text-center border-r border-l border-gray-300 font-medium text-gray-900 whitespace-nowrap capitalize'
                      >
                        {data?.bidder_master?.name}
                      </th>
                      {data?.comparison_criteria?.map((criteData) => (
                        <>
                          <td className='px-6 py-5 text-center border-r  border-gray-300'>
                            {criteData?.value}
                          </td>
                        </>
                      ))}
                      <th
                        scope='row'
                        className='px-6 py-5 text-center border-r border-l border-gray-300 font-medium text-gray-900 whitespace-nowrap'
                      >
                        {data?.total_score}
                      </th>
                      <th
                        scope='row'
                        className='px-6 py-5 text-center border-r border-l border-gray-300 font-medium text-gray-900 whitespace-nowrap'
                      >
                        L{index + 1}
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 2nd Info */}
            <div className='mt-14'>
              <div className='relative overflow-x-auto'>
                <table className='w-full text-sm text-left rtl:text-right text-gray-500 border-b'>
                  <thead className='  bg-[#4338ca] text-white '>
                    <tr>
                      <th
                        scope='col'
                        className='px-6 py-5 text-center border-r border-gray-300'
                      >
                        S No.
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-5 text-center border-r border-gray-300'
                      >
                        Tender Reference No
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-5 text-center border-r border-gray-300'
                      >
                        Bidder Name
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-5 text-center border-r border-gray-300'
                      >
                        Bidding Price
                      </th>

                      <th
                        scope='col'
                        className='px-6 py-5 text-center border-r border-gray-300'
                      >
                        Uploaded Document
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {console.log(biddingData?.bidder_master)} */}
                    {biddingData?.bidder_master?.map((data, index) => (
                      <tr className='bg-white '>
                        <th
                          scope='row'
                          className='px-6 py-5 text-center border-r border-l border-gray-300 font-medium text-gray-900 whitespace-nowrap'
                        >
                          {index + 1}
                        </th>
                        <td className='px-6 py-5 text-center border-r border-gray-300'>
                          {biddingData?.reference_no}
                        </td>
                        <td className='px-6 py-5 text-center border-r border-gray-300'>
                          {data?.name}
                        </td>
                        <td className='px-6 py-5 text-center border-r border-gray-300'>
                          {indianAmount(data?.bidding_amount)}
                        </td>

                        <td
                          className='px-6 py-5 text-center border-r border-gray-300 cursor-pointer text-blue-800 hover:underline'
                          onClick={() => {
                            setImageFunc(data?.id);
                            setImageModal(true);
                          }}
                        >
                          View
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-end space-x-5 mt-8'>
          {/* {console.log(biddingData?.creationStatus)} */}
                
          {(biddingData?.boq?.pre_tendering_details?.tendering_type == 'rate_contract' && !biddingData?.creationStatus == 5) ? <button
            className=' bg-[#4338CA] text-white hover:bg-[#362d9d] border border-blue-700 px-7 py-2 rounded flex gap-2' 
            onClick={() =>
              // navigate(`/biddingViewById/${biddingData?.reference_no}/inbox`)
              navigate(`/addUnitPrice/${biddingData?.reference_no}`)
            }
          >
            Add Unit Price
            <MdArrowRightAlt className='text-2xl ' />

          </button> :  <button
            className=' bg-[#4338CA] text-white hover:bg-[#362d9d] border border-blue-700 px-10 py-2 rounded flex'
            onClick={() =>
              navigate(`/biddingViewById/${biddingData?.reference_no}/inbox`)
            }
          >
            Back to Bidding Page
          </button>}
         
          
          
         
        </div>
      </div>
    </>
  );
};

export default BiddingTypeResultView;
