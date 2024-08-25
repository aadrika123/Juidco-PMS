import React, { useState, useEffect, useContext } from "react";
// import { TbCircleLetterNFilled } from "react-icons/tb";
import ConfirmationModal from "@/Components/Common/Modal/ConfirmationModal";
import { useFormik } from "formik";
import ImageModal from "@/Components/Pages/Others/ImageModal/ImageModal";
import img from "@/Components/assets/page.pdf";
import { useLocation, useNavigate } from "react-router-dom";
import ProjectApiList from "@/Components/api/ProjectApiList";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import toast from "react-hot-toast";
import ApiHeader from "@/Components/api/ApiHeader";
import LoaderApi from "@/Components/Common/Loaders/LoaderApi";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import { contextVar } from "@/Components/context/contextVar";

const BiddingType = () => {
  const navigate = useNavigate();
  const [markingType, setMarkingType] = useState("numeric");
  const [bidderDetails, setBidderDetails] = useState([]);
  const [criteriaData, setCriteriaData] = useState([]);
  const [confModal, setConfModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);

  const { api_getBidType, api_PostCompareBidder } = ProjectApiList();

  const { state } = useLocation();

  const { titleBarVisibility } = useContext(contextVar);

  const getApplicationDetail = () => {
    setIsLoading(true);
    AxiosInterceptors.get(`${api_getBidType}/${state}`, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          setCriteriaData(response?.data?.data);
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

  const bidType =
    criteriaData?.bid_type === "financial"
      ? "finCriteria"
      : criteriaData?.bid_type === "technical"
      ? "techCriteria"
      : criteriaData?.bid_type === "fintech" &&
        criteriaData?.creationStatus == 3
      ? "techCriteria"
      : criteriaData?.bid_type === "fintech" &&
        criteriaData?.creationStatus == 41
      ? "finCriteria"
      : [];

  const initialValues = {};

  // bidderDetails?.forEach((bidder) => {
  //   bidder.comparison_criteria.forEach((criteria) => {
  //     initialValues[`${bidder.bidder_id}-${criteria.criteria_id}`] =
  //       criteria.value || "";
  //   });
  // });

  // Generate validation schema based on criteria

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (bidderDetails?.length !== criteriaData?.bidder_master?.length) {
        return toast.error("Please fill data for all Bidders");
      }
      const bidderCompLength =
        bidderDetails?.map((data) => data?.comparison_criteria?.length) || [];
      if (
        bidderCompLength?.some(
          (data) => data !== criteriaData?.[bidType]?.length
        )
      ) {
        return toast.error("Please fill data for all Criteria");
      }
      setConfirmationModal(true);
    },
    // validationSchema,
  });

  const confirmationHandlerCnf = () => {
    setConfModal(false);
  };

  const confirmationHandlerCncl = () => {
    setCancelModal(false);
  };

  const handleCancel = () => {
    setConfModal(false);
    setConfirmationModal(false);
    setCancelModal(false);
  };

  const handleChange = (e, crite, bidderName) => {
    const { value } = e.target;

    if(value>10){
      toast.error("Maximum points must not exceed 10")
      return
    }

    setBidderDetails((prev) => {
      const bidderIndex = prev.findIndex(
        (item) => item.bidder_id === bidderName
      );

      if (bidderIndex !== -1) {
        // Existing bidder found, update criteria
        const updatedBidders = prev.map((item, index) => {
          if (index === bidderIndex) {
            const comparison_criteria = item?.comparison_criteria || [];

            const criteriaIndex = comparison_criteria.findIndex(
              (crit) => crit.criteria_id === crite?.id
            );

            if (criteriaIndex !== -1) {
              // Update the existing comparison_criteria value
              const updatedCriteria = comparison_criteria.map((crit, i) =>
                i === criteriaIndex ? { ...crit, value } : crit
              );

              return { ...item, comparison_criteria: updatedCriteria };
            } else {
              // Add new criteria to existing bidder
              const updatedCriteria = [
                ...comparison_criteria,
                { criteria_id: crite?.id, value },
              ];

              return { ...item, comparison_criteria: updatedCriteria };
            }
          }
          return item;
        });

        return updatedBidders;
      } else {
        // No existing bidder, add new one
        const newBidder = {
          bidder_id: bidderName,
          comparison_criteria: [{ criteria_id: crite?.id, value }],
        };

        return [...prev, newBidder];
      }
    });
  };

  const handleSymbolicChange = (e, crite, bidderName) => {
    const { value } = e.target; // value will be '0' or '1'

    setBidderDetails((prev) => {
      const bidderIndex = prev.findIndex(
        (item) => item.bidder_id === bidderName
      );

      let updatedBidders;
      if (bidderIndex !== -1) {
        updatedBidders = prev.map((item, index) => {
          if (index === bidderIndex) {
            const criteriaIndex = item?.comparison_criteria.findIndex(
              (crit) => crit?.criteria_id === crite?.id
            );

            let updatedCriteria;
            if (criteriaIndex !== -1) {
              // Update the existing criteria value
              updatedCriteria = item.comparison_criteria.map((crit, i) =>
                i === criteriaIndex ? { ...crit, value } : crit
              );
            } else {
              // Add the new criteria with the selected value
              updatedCriteria = [
                ...item.comparison_criteria,
                { criteria_id: crite?.id, value },
              ];
            }

            return { ...item, comparison_criteria: updatedCriteria };
          }
          return item;
        });
      } else {
        // Add new bidder with the criteria
        updatedBidders = [
          ...prev,
          {
            bidder_id: bidderName,
            comparison_criteria: [{ criteria_id: crite?.id, value }],
          },
        ];
      }

      return updatedBidders;
    });
  };

  //on submitting function
  const postBidderComarisonData = async () => {
    setConfirmationModal(false);
    setIsLoading(true);
    let body = {
      reference_no: state,
      comparison_type: markingType,
      comparison_data: [...bidderDetails],
      criteria_type: criteriaData?.bid_type,
    };

    AxiosInterceptors.post(`${api_PostCompareBidder}`, body, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          toast.success("Successfully Saved the Data for Bidders");
          setTimeout(() => {
            setIsLoading(false);
            navigate(`/bidding-type-byId/${state}`);
          }, 2000);
        } else {
          setIsLoading(false);
          toast.error("Error in saving Data. Please try again");
        }
      })
      .catch(function (error) {
        console.log(error, "errrrrrrrrrrrrrrrrrrr");
        setIsLoading(false);
        toast.error(error?.response?.data?.error);
      });
  };

  const calculateAndSetTotalScores = () => {
    // Calculate total scores for each bidder
    const updatedData = bidderDetails?.map((parent) => {
      const totalScore = parent.comparison_criteria.reduce((acc, criteria) => {
        return acc + Number(criteria.value);
      }, 0);

      return {
        ...parent,
        total_score: totalScore || 0,
      };
    });

    setBidderDetails((prev) => [...updatedData]);
  };

  // const imageHandler = (id) => {
  //   setImageModal(true);
  //   const bidder = criteriaData?.bidder_master?.filter((obj) => id == obj?.id);

  //   if (bidder?.length > 1) {
  //     return toast.error("Two Bidders With Same ID's are found");
  //   }

  //   if (criteriaData?.bid_type == "fintech") {
  //     if (!criteriaData?.techComparison && !criteriaData?.finComparison) {
  //       bidder[0]?.bidder_doc?.map((data) => {

  //         if(data?.criteria_type === "technical"){
  //           console.log(data?.doc_path,"iff")
  //           setImageUrl(data?.doc_path)
  //         }else{
  //           setImageUrl("");
  //         }
  //       });

  //       return;
  //     } else if (!criteriaData?.finComparison && criteriaData?.techComparison) {
  //       bidder[0]?.bidder_doc?.map((data) => {

  //         if(data?.criteria_type === "financial"){
  //           console.log(data?.doc_path,"else")
  //           setImageUrl(data?.doc_path)
  //         }else{
  //           setImageUrl("");
  //         }

  //       });
  //       return;
  //     }
  //   } else {
  //     setImageUrl(bidder[0]?.bidder_doc[0]?.doc_path);
  //   }
  // };

  //assign total score to the response

  const imageHandler = (id) => {
    setImageModal(true);
    const bidder = criteriaData?.bidder_master?.filter((obj) => id == obj?.id);

    if (bidder?.length > 1) {
      return toast.error("Two Bidders With Same ID's are found");
    }

    let imageUrl = ""; // Local variable to store the image URL

    if (criteriaData?.bid_type == "fintech") {
      if (!criteriaData?.techComparison && !criteriaData?.finComparison) {
        bidder[0]?.bidder_doc?.forEach((data) => {
          if (data?.criteria_type === "technical") {
            imageUrl = data?.doc_path; // Store the URL here
          }
        });
      } else if (!criteriaData?.finComparison && criteriaData?.techComparison) {
        bidder[0]?.bidder_doc?.forEach((data) => {
          if (data?.criteria_type === "financial") {
            imageUrl = data?.doc_path; // Store the URL here
          }
        });
      }
    } else {
      imageUrl = bidder[0]?.bidder_doc[0]?.doc_path;
    }

    // Set the image URL in the state after determining the correct value
    setImageUrl(imageUrl);
  };

  useEffect(() => {
    getApplicationDetail();
  }, []);

  if (confModal) {
    return (
      <>
        <ConfirmationModal
          confirmationHandler={confirmationHandlerCnf}
          handleCancel={handleCancel}
          message={'Are you sure you want to " Confirm "?'}
        />
      </>
    );
  }

  if (confirmationModal) {
    return (
      <>
        <ConfirmationModal
          confirmationHandler={postBidderComarisonData}
          handleCancel={handleCancel}
          message={"Are you sure you want to save the Bidder Details ?"}
        />
      </>
    );
  }

  if (cancelModal) {
    return (
      <>
        <ConfirmationModal
          confirmationHandler={confirmationHandlerCncl}
          handleCancel={handleCancel}
          message={'Are you sure you want to " Cancel "?'}
        />
      </>
    );
  }

  if (imageModal) {
    return (
      <>
        <ImageModal
          imageModal={imageModal}
          setImageModal={setImageModal}
          imageUrl={imageUrl}
        />
      </>
    );
  }

  return (
    <>
      {isLoading && <LoaderApi />}

      <TitleBar
        titleBarVisibility={titleBarVisibility}
        titleText={"Bidding Comparision"}
      />
      <div className={` ${isLoading ? "blur-[2px] pointer-events-none" : ""}`}>
        <div className={`px-6`}>
          <div className="flex justify-between gap-4">
            <button
              className={`${
                criteriaData?.boq?.pre_tendering_details?.tendering_type ==
                "least_cost"
                  ? "bg-[#4338ca] text-white"
                  : "bg-gray-200 text-[#4338ca]"
              }  py-2 px-8 rounded-md`}
            >
              Least Cost Based Selection
            </button>
            <button
              className={`${
                criteriaData?.boq?.pre_tendering_details?.tendering_type ==
                "qcbs"
                  ? "bg-[#4338ca] text-white"
                  : "bg-gray-200 text-[#4338ca]"
              }  py-2 px-8 rounded-md`}
            >
              Quality and Cost Based Selection{" "}
            </button>
            <button
              className={`${
                criteriaData?.boq?.pre_tendering_details?.tendering_type ==
                "rate_contract"
                  ? "bg-[#4338ca] text-white"
                  : "bg-gray-200 text-[#4338ca]"
              }  py-2 px-8 rounded-md`}
            >
              Rate Contract Based Selection{" "}
            </button>

            <div className="">
              <select
                className={`pl-3 pr-3 border border-blue-400 rounded-md w-full h-10 outline-blue-300`}
                onChange={(e) => {
                  setMarkingType(e.target.value);
                }}
              >
                <option defaultValue={"numeric"} value={"numeric"}>
                  Numeric
                </option>
                <option value={"symbolic"}>Symbolic</option>
              </select>
            </div>
          </div>
        </div>

        <form onSubmit={formik.handleSubmit} onChange={formik.handleChange}>
          <div className="">
            <div className="flex m-6">
              <div className="bg-white w-[25rem] ">
                <div className="p-[1.4rem] border border-gray-00">
                  <h1>All Criteria </h1>
                  <p className="text-sm text-gray-400">
                    Docement Uploaded by Bidder{" "}
                  </p>
                </div>
                <div className="p-[22px] border border-gray-00">
                  <h1>Criteria Details </h1>
                  <p className="text-sm text-gray-400">
                    Criteria For{" "}
                    {criteriaData?.bid_type === "technical"
                      ? "Technical"
                      : criteriaData?.bid_type === "financial"
                      ? "Financial"
                      : criteriaData?.bid_type === "fintech" && !criteriaData?.techComparison
                      ? "Technical"
                      : criteriaData?.bid_type === "fintech" && criteriaData?.techComparison
                      ? "Finincial": ""
                    } 
                     {" "}Comparison{" "}
                  </p>
                </div>

                {criteriaData?.[bidType]?.map((data) => (
                  <div className="pl-8 pt-5 pb-4 border border-gray-00">
                    <h1>{data?.heading} </h1>
                    <p className="text-sm text-gray-400 truncate">
                      {data?.description}
                    </p>
                  </div>
                ))}
                <div className="pl-8 pr-6 pt-4 pb-4 border border-gray-00">
                  {markingType == "numeric" && (
                    <button
                      type="button"
                      className="bg-blue-800 px-5 py-2 text-white rounded-md w-full hover:bg-blue-900"
                      onClick={calculateAndSetTotalScores}
                    >
                      Total Points Out of{" "}
                      {criteriaData?.[bidType]?.length * 10 || 0}
                    </button>
                  )}
                  {markingType == "symbolic" && (
                    <button
                      type="button"
                      className="bg-blue-800 px-5 py-2 text-white rounded-md w-full hover:bg-blue-900"
                      onClick={calculateAndSetTotalScores}
                    >
                      Total Point Out of {criteriaData?.[bidType]?.length *10 || 0}
                    </button>
                  )}
                </div>
              </div>

              <div className="w-[80%] overflow-x-auto flex">
                {criteriaData?.bidder_master?.map((bidder) => (
                  <div className="bg-white w-full">
                    <div className="p-7 border-t border-gray-100 text-center">
                      <h1
                        className="border border-[#4338ca] rounded-full text-xs hover:bg-[#4338ca] cursor-pointer hover:text-white py-2"
                        onClick={() => {
                          imageHandler(bidder?.id);
                          // setImageModal(true);
                        }}
                      >
                        Document Uploaded
                      </h1>
                    </div>

                    <div className="p-7 border-t border-gray-100 text-center">
                      <h1 className="text-2xl font-bold text-center capitalize">
                        {bidder?.name}{" "}
                      </h1>
                    </div>

                    {markingType == "numeric" && (
                      <>
                        {criteriaData?.[bidType]?.map((crite, index) => (
                          <div className="pl-8 pr-8 pt-6 pb-[1.55rem] border-t border-gray-200">
                            <input
                              type="text"
                              // name={bidder?.id} // Example bidderHeading name
                              name={`${bidder?.id}-${crite?.id}`}
                              className="border text-center border-bslue-400 rounded w-full h-8 outline-blue-300"
                              onChange={(e) =>
                                handleChange(e, crite, bidder?.id)
                              }
                              value={
                                formik.values[`${bidder?.id}-${crite?.id}`] ||
                                ""
                              }
                            />
                          </div>
                        ))}
                        <div className="pl-8 pr-6 pt-6 pb-5 text-center  border border-gray-00 bg-[#4338ca] text-white">
                          <h1 className="text-xl">
                              
                            {bidderDetails?.map((data) =>
                              data?.bidder_id === bidder?.id
                                ? data?.total_score
                                : ""
                            )}
                            <span className="text-xs">Points</span>
                          </h1>
                        </div>
                      </>
                    )}

                    {/* {markingType == "symbolic" && (
                    <>
                      {criteriaData?.[bidType]?.map((crite) => (
                        <div className=' border-t border-r border-gray-200 pl-3 pr-3 pt-5 pb-[1.05rem]'>
                          <div className='flex justify-around'>
                            <div className='inline-flex items-center'>
                              <label
                                className='relative flex items-center p-3 rounded-full cursor-pointer'
                                htmlFor={`custom-style1-${bidder?.heading}-${crite?.id}`}
                              >
                                <input
                                  name={`${bidder?.id}-${crite?.id}`}
                                  type='radio'
                                  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-red-300 bg-red-900/5 p-0 text-red-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-red-500 before:opacity-0 before:transition-opacity checked:border-red-900 checked:before:bg-red-900 hover:before:opacity-0"
                                  id={`custom-style1-${bidder?.heading}-${crite?.id}`}
                                  onChange={(e) =>
                                    handleSymbolicChange(e, crite, bidder?.id)
                                  }
                                  // onChange={(e) =>
                                  //   handleSymbolicChange(
                                  //     e,
                                  //     crite?.id,
                                  //     bidder?.heading
                                  //   )
                                  // }
                                  value='0'
                                />
                                <span className='absolute text-red-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100'>
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    x='0px'
                                    y='0px'
                                    width='25'
                                    height='25'
                                    viewBox='0 0 48 48'
                                  >
                                    <path
                                      fill='#f44336'
                                      d='M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z'
                                    ></path>
                                    <path
                                      fill='#fff'
                                      d='M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z'
                                    ></path>
                                    <path
                                      fill='#fff'
                                      d='M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z'
                                    ></path>
                                  </svg>
                                </span>
                              </label>
                              <label
                                className='mt-px font-light text-gray-700 cursor-pointer select-none'
                                htmlFor='custom-style1'
                              ></label>
                            </div>
                            <div className='inline-flex items-center'>
                              <label
                                className='relative flex items-center p-3 rounded-full cursor-pointer'
                                htmlFor={`custom-style2-${bidder?.heading}-${crite?.input}`}
                              >
                                <input
                                  name={`${bidder?.heading} ${crite?.input}`}
                                  type='radio'
                                  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-green-300 bg-green-900/5 p-0 text-green-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-green-500 before:opacity-0 before:transition-opacity checked:border-green-900 checked:before:bg-green-900 hover:before:opacity-0"
                                  id={`custom-style2-${bidder?.heading}-${crite?.input}`}
                                  onChange={(e) =>
                                    handleSymbolicChange(
                                      e,
                                      crite,
                                      bidder?.heading
                                    )
                                  }
                                  // onChange={(e) =>
                                  //   handleChange(e, crite, bidder?.id)
                                  // }
                                  value='1'
                                />
                                <span className='absolute text-green-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100'>
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    x='0px'
                                    y='0px'
                                    width='22'
                                    height='22'
                                    viewBox='0 0 16 16'
                                  >
                                    <path
                                      fill='#00b569'
                                      d='M8,0C3.582,0,0,3.582,0,8s3.582,8,8,8s8-3.582,8-8S12.418,0,8,0z'
                                    ></path>
                                    <polygon
                                      fill='#fff'
                                      points='7,12 3.48,8.48 4.894,7.066 7,9.172 11.71,4.462 13.124,5.876'
                                    ></polygon>
                                  </svg>
                                </span>
                              </label>
                              <label
                                className='mt-px font-light text-gray-700 cursor-pointer select-none'
                                htmlFor='custom-style2'
                              ></label>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className='pl-8 pr-6 pt-6 pb-5 text-center border border-gray-00 bg-[#4338ca] text-white'>
                        <h1 className='text-xl'>
                          5 <span className='text-xs'>Points</span>
                        </h1>
                      </div>
                    </>
                  )} */}

                    {markingType == "symbolic" && (
                      <>
                        {criteriaData?.[bidType]?.map((crite) => (
                          <div className="border-t border-r border-gray-200 pl-3 pr-3 pt-5 pb-[1.05rem]">
                            <div className="flex justify-around">
                              <div className="inline-flex items-center">
                                <label
                                  className="relative flex items-center p-3 rounded-full cursor-pointer"
                                  htmlFor={`custom-style1-${bidder?.id}-${crite?.id}`}
                                >
                                  <input
                                    name={`${bidder?.id}-${crite?.id}`}
                                    type="radio"
                                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-red-300 bg-red-900/5 p-0 text-red-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-red-500 before:opacity-0 before:transition-opacity checked:border-red-900 checked:before:bg-red-900 hover:before:opacity-0"
                                    id={`custom-style1-${bidder?.id}-${crite?.id}`}
                                    onChange={(e) =>
                                      handleSymbolicChange(e, crite, bidder?.id)
                                    }
                                    value="0"
                                  />
                                  <span className="absolute text-red-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      x="0px"
                                      y="0px"
                                      width="25"
                                      height="25"
                                      viewBox="0 0 48 48"
                                    >
                                      <path
                                        fill="#f44336"
                                        d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
                                      ></path>
                                      <path
                                        fill="#fff"
                                        d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"
                                      ></path>
                                      <path
                                        fill="#fff"
                                        d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"
                                      ></path>
                                    </svg>
                                  </span>
                                </label>
                              </div>
                              <div className="inline-flex items-center">
                                <label
                                  className="relative flex items-center p-3 rounded-full cursor-pointer"
                                  htmlFor={`custom-style2-${bidder?.id}-${crite?.id}`}
                                >
                                  <input
                                    name={`${bidder?.id}-${crite?.id}`}
                                    type="radio"
                                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-green-300 bg-green-900/5 p-0 text-green-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-green-500 before:opacity-0 before:transition-opacity checked:border-green-900 checked:before:bg-green-900 hover:before:opacity-0"
                                    id={`custom-style2-${bidder?.id}-${crite?.id}`}
                                    onChange={(e) =>
                                      handleSymbolicChange(e, crite, bidder?.id)
                                    }
                                    value="10"
                                  />
                                  <span className="absolute text-green-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      x="0px"
                                      y="0px"
                                      width="22"
                                      height="22"
                                      viewBox="0 0 16 16"
                                    >
                                      <path
                                        fill="#00b569"
                                        d="M8,0C3.582,0,0,3.582,0,8s3.582,8,8,8s8-3.582,8-8S12.418,0,8,0z"
                                      ></path>
                                      <polygon
                                        fill="#fff"
                                        points="7,12 3.48,8.48 4.894,7.066 7,9.172 11.71,4.462 13.124,5.876"
                                      ></polygon>
                                    </svg>
                                  </span>
                                </label>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="pl-8 pr-6 pt-6 pb-5 text-center border border-gray-00 bg-[#4338ca] text-white">
                          <h1 className="text-xl">
                            {bidderDetails?.map((data) =>
                              data?.bidder_id === bidder?.id
                                ? data?.total_score
                                : ""
                            )}{" "}
                            <span className="text-xs">Points</span>
                          </h1>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <div className=" flex justify-end space-x-8">
                <button
                  className="border border-blue-800 px-14 py-2  rounded-md hover:bg-[#4338ca] hover:text-white"
                  onClick={() => setCancelModal(true)}
                >
                  Cancel
                </button>
                <button
                  className="bg-[#4338ca] px-14 py-2 text-white rounded-md hover:bg-blue-900"
                  // onClick={()=>setConfModal(true)}
                  type="submit"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default BiddingType;
