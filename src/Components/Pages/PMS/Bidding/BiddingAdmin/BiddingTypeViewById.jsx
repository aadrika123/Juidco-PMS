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
import TickImg from "@/assets/Images/Tick.png";
import CrossImg from "@/assets/Images/Cross.png";

const BiddingTypeViewById = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    api_getCompareBidder,
    api_postWinner,
    api_finalizeWinner,
    api_getBidType,
  } = ProjectApiList();
  const [imageModal, setImageModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [applicationData, setApplicationData] = useState();
  const [biddingData, setBiddingData] = useState();
  const { titleBarVisibility } = useContext(contextVar);

  const [selectedBidder, setSelectedBidder] = useState([]);
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

  const selectWinnerPost = async () => {
    setIsLoading(true);
    let payload = { reference_no: id, winners: selectedBidder };

    AxiosInterceptors.post(api_postWinner, payload, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          if (
            applicationData?.bid_type === "fintech" &&
            applicationData?.finComparison == false
          ) {
            navigate("/bidding-type", { state: id });
          } else {
            finalizeWinner();
          }
        } else {
          setIsLoading(false);
          toast.error("Error in selection of Winners");
        }
      })
      .catch(function (error) {
        setIsLoading(false);
        toast.error(
          error?.response?.data?.error || "Error in selection of winner"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const finalizeWinner = async () => {
    setIsLoading(true);
    let payload = { reference_no: id };

    AxiosInterceptors.post(api_finalizeWinner, payload, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          toast.success("Successfully selected the winners!!.");
        } else {
          setIsLoading(false);
          toast.error("Error in selecting winners");
        }
      })
      .catch(function (error) {
        setIsLoading(false);
        toast.error(error?.response?.data?.error);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
          imageUrl={img}
        />
      </>
    );
  }

  return (
    <>
      {isLoading && <LoaderApi />}

      <TitleBar
        titleBarVisibility={titleBarVisibility}
        titleText={"Bidding Type Details"}
      />
      <div className={`${isLoading ? "blur-[2px] pointer-events-none" : ""}`}>
        <div className=''>
          <h2 className=' text-2xl pl-7 pt-2 pb-2 flex justify-start bg-[#4338ca] text-white rounded-md'>
            On the Basis of{" "}
            {applicationData?.bid_type == "technical"
              ? "Technical"
              : applicationData?.bid_type == "financial"
              ? "Financial"
              : applicationData?.bid_type == "finTech" &&
                !applicationData?.techComparison
              ? "Technical"
              : "Financial"}{" "}
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
                    {/* {(applicationData?.bid_type == "fintech" && (applicationData?.techComparison == false || applicationData?.finComparison == false)|| (applicationData?.bid_type == "financial" && applicationData?.finComparison == false) ) &&  */}
                    <th
                      scope='col'
                      className=' text-center border-r border-l border-gray-300'
                    >
                      Select
                    </th>
                    {/* // } */}
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
                              className='px-6 py-5 text-center border-r border-gray-300'
                            >
                              <p className='text-base text-gray-700'>
                                {criteData?.criteria?.heading}
                              </p>
                              <p className='text-sm'>
                                {criteData?.criteria?.description}
                              </p>
                            </th>
                          );
                        }
                      })
                    )}

                    <th
                      scope='col'
                      className='px-6 py-5 text-center border-r border-l border-gray-300'
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
                      {/* {applicationData?.bid_type == "fintech" && (applicationData?.techComparison == false || applicationData?.finComparison == false) &&  */}
                      <th
                        scope='row'
                        className=' text-center border-r border-l border-gray-300 font-medium text-gray-900 whitespace-nowrap'
                      >
                        <input
                          type='checkbox'
                          onClick={() =>
                            setSelectedBidder([
                              ...selectedBidder,
                              data?.bidder_master?.id,
                            ])
                          }
                        />
                      </th>
                      {/* } */}
                      <th
                        scope='row'
                        className='px-6 py-5 text-center border-r border-l border-gray-300 font-medium text-gray-900 whitespace-nowrap'
                      >
                        {data?.bidder_master?.name}
                      </th>
                      {data?.comparison_criteria?.map((criteData) => (
                        <>
                          <td className='px-6 py-5 text-center border-r  border-gray-300'>
                            {criteData?.comparison_type == "symbolic" ? (
                              criteData?.value == 0 ? (
                                <div className='flex justify-center items-center'>
                                  <img
                                    src={CrossImg}
                                    alt='cross image'
                                    className='w-6'
                                  />
                                </div>
                              ) : (
                                <div className='flex justify-center items-center'>
                                  <img
                                    src={TickImg}
                                    alt='tick image'
                                    className='w-6'
                                  />
                                </div>
                              )
                            ) : (
                              criteData?.value
                            )}
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
            {/* <div className='mt-14'>
              <div className='relative overflow-x-auto'>
                <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
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
                        Rank
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
                    {biddingData2?.map((data) => (
                      <tr className='bg-white '>
                        <th
                          scope='row'
                          className='px-6 py-5 text-center border-r border-l border-gray-300 font-medium text-gray-900 whitespace-nowrap'
                        >
                          {data?.sno}
                        </th>
                        <td className='px-6 py-5 text-center border-r border-gray-300'>
                          {data?.tenderRefNo}
                        </td>
                        <td className='px-6 py-5 text-center border-r border-gray-300'>
                          {data?.bidderName}
                        </td>
                        <td className='px-6 py-5 text-center border-r border-gray-300'>
                          {data?.biddingPrice}
                        </td>
                        <td className='px-6 py-5 text-center border-r border-gray-300'>
                          {data?.rank}
                        </td>
                        <td
                          className='px-6 py-5 text-center border-r border-gray-300 cursor-pointer text-blue-800'
                          onClick={() => setImageModal(true)}
                        >
                          View
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className='font-semibold text-gray-900'>
                      <th
                        scope='row'
                        className='px-6 py-3 text-center border-b border-l border-r border-gray-300'
                      ></th>
                      <td className='px-6 py-3 text-center border-b border-l border-r border-gray-300'></td>
                      <td className='px-6 py-3 text-center border-b border-l border-r border-gray-300'></td>
                      <td className='px-6 py-3 text-center border-b border-l border-r border-gray-300'></td>
                      <td className='px-6 py-3 text-center border-b border-l border-r border-gray-300'></td>
                      <td className='px-6 py-3 text-center border-b border-l border-r border-gray-300'></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div> */}
          </div>
        </div>
        <div className='flex justify-end space-x-5 mt-8'>
          <button className='bg-white  hover:bg-[#4338CA] hover:text-white border border-blue-700 px-10 py-2 rounded flex'>
            Cancel
          </button>
          <button
            className='bg-[#4338CA]  hover:bg-[#5a50c6]  text-white px-10 py-2 rounded flex'
            onClick={() => selectWinnerPost()}
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  );
};

export default BiddingTypeViewById;
