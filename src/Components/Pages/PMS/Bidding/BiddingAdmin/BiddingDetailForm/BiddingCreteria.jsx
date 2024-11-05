import React, { useState } from "react";
import * as Yup from "yup";
import { IoAddSharp } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
import { useFormik } from "formik";
import ConfirmationModal from "@/Components/Common/Modal/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import ProjectApiList from "@/Components/api/ProjectApiList";
import ApiHeader from "@/Components/api/ApiHeader";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import toast from "react-hot-toast";
import LoaderApi from "@/Components/Common/Loaders/LoaderApi";
import ThemeStyleTanker from "@/Components/Common/ThemeStyleTanker";
import ThemeStyle from "@/Components/Common/ThemeStyle";

const BiddingCreteria = (props) => {
  const { loading } = ThemeStyleTanker();
  const { inputStyle, labelStyle } = ThemeStyle();

  const navigate = useNavigate();
  const {
    api_addCreteria,
    api_submitCreteria,
    api_submitBiddingAmt,
    api_submitBiddingRatio,
  } = ProjectApiList();

  const [showFields, setShowFields] = useState(false);
  const [formValues, setFormValues] = useState({
    criteria: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bidderNo, setBidderNo] = useState();
  const [bidderBiddingAmount, setBidderBiddingAmount] = useState([]);
  const [ratio, setRatio] = useState();

  const initialValues = {
    heading: "",
    description: "",
  };

  const validationSchema = Yup.object({
    heading: Yup.string().required("Enter Criteria"),
    description: Yup.string().required("Enter Description"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      setFormValues((prev) => ({ criteria: [...prev["criteria"], values] }));
      resetForm();
    },
    validationSchema,
  });

  const handleOnChange = (e) => {
    // {
    //   name == "description" &&
    //     formik.setFieldValue(
    //       "number_of_items",
    //       allowNumberInput(value, formik.values.number_of_items, 100)
    //     );
    // }
  };

  const addCreteria = () => {
    if (formValues?.criteria.length < 3) {
      return toast.error(
        "Please add minimum three criteria with description. "
      );
    }
    setIsLoading(true);
    AxiosInterceptors.post(
      `${api_addCreteria}`,
      {
        reference_no: props?.referenceNo,
        criteria: formValues?.criteria,
        criteria_type: props?.tabValue,
      },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status) {
          toast.success("Criteria Added Succefully");
          if (
            props?.bidderData?.bid_type === "fintech" &&
            props?.bidderData?.techComparison
          ) {
            navigate(`/bidding-type`, { state: props?.referenceNo });
          } else {
            navigate(`/bidding-commparision-tabs?tabNo=${props.tabNo + 1}`, {
              state: props?.referenceNo,
            });
          }
        } else {
          toast.error("Error in Adding. Please try Again");
        }
      })
      .catch(function (error) {
        console.log(error, "err res");
        toast.error(error?.response?.data?.error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const addBiddingAmountHandler = (amount, id) => {
    setBidderBiddingAmount((prev) => {
      const isExistingBidderIndex = prev?.findIndex(
        (data) => data?.bidder_id === id
      );
      if (isExistingBidderIndex === -1) {
        return [...prev, { bidder_id: id, amount }];
      } else {
        return prev.map((data, index) =>
          index === isExistingBidderIndex ? { ...data, amount } : data
        );
      }
    });
  };

  const postBiddingRatio = () => {
    setIsLoading(true);

    AxiosInterceptors.post(
      `${api_submitBiddingRatio}`,
      {
        reference_no: props?.referenceNo,
        ratio,
      },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status) {
          toast.success("All the details added Succefully");
          navigate(`/finance-bidding/${props?.referenceNo}`);
        } else {
          toast.error("Error in Adding. Please try Again");
        }
      })
      .catch(function (error) {
        console.log(error, "err res");
        toast.error(error?.response?.data?.error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //adding bidding amount for each bidders--
  const postBiddingAmtHandler = async () => {
    try {
      const response = await AxiosInterceptors.post(
        api_submitBiddingAmt,
        { amountData: [...bidderBiddingAmount] },
        ApiHeader()
      );
      if (response?.data?.status) {
        toast.success("Bidding Amount successfully Added");
        postBiddingRatio();
        // navigate("/bidding-type", { state: props?.referenceNo });
      }
    } catch (err) {
      console.log(err, "err in submitting bidding amount");
      toast.error(err);
    }
  };

  const submitCreteria = () => {
    if (Number(bidderNo) < 3) {
      setBidderNo(0);
      toast.error("Minimum 3 Bidders Required");
      return;
    }

    setIsLoading(true);

    AxiosInterceptors.post(
      `${api_submitCreteria}`,
      {
        reference_no: props?.referenceNo,
        no_of_bidders: Number(bidderNo),
      },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status) {
          toast.success("Bidder Added Succefully");
          navigate(`/bidding-details?tabNo=1`, {
            state: props?.referenceNo,
          });
        } else {
          toast.error("Error in Adding. Please try Again");
        }
      })
      .catch(function (error) {
        console.log(error, "err res");
        toast.error(error?.response?.data?.error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDelete = (heading, desc) => {
    const newCriteria = formValues?.criteria?.filter(
      (data) => !(data?.heading === heading && data?.description === desc)
    );

    setFormValues({
      ...formValues,
      criteria: newCriteria,
    });
  };

  const confirmationHandler = () => {};

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //displaying confirmation message
  if (isModalOpen) {
    return (
      <>
        <ConfirmationModal
          confirmationHandler={confirmationHandler}
          handleCancel={handleCancel}
          message={'Are you sure you want to "Save" ?'}
          loadingState={isLoading}
        />
      </>
    );
  }

  return (
    <>
      {isLoading && <LoaderApi />}
      <div
        className={` ${
          isLoading ? "blur-[2px]" : ""
        }bg-white border border-blue-500 rounded-lg shadow-xl space-y-5 `}
      >
        {!(
          props.heading === "Bidder Details" ||
          props.heading === "Bidder Amount Details"
        ) && (
          <>
            <div className='p-7'>
              <h1 className='text-xl font-medium'>
                Enter {props.heading} Criteria{" "}
              </h1>
              <p className='font-extralight text-gray-400'>
                Include description as necessary
              </p>
            </div>

            {/* Heading Button */}
            <div
              className='border border-gray-300 rounded-xl flex m-5 cursor-pointer hover:border hover:border-blue-500'
              onClick={() => setShowFields(true)}
            >
              <div className='flex justify-center items-center'>
                <IoAddSharp className='text-blue-600 bg-blue-100 rounded-full text-[1.5rem] m-5' />
              </div>
              <div className='pt-3'>
                <h1 className=' text-gray-600'>Heading</h1>
                <h1 className='text-xs font-extralight text-gray-400 '>
                  Description
                </h1>
              </div>
            </div>

            <div className='pb-1'></div>
            {formValues?.criteria?.map((data, index) => (
              <div
                key={index}
                className='border border-gray-300 rounded-xl flex m-5 cursor-pointer hover:border hover:bg-gray-50 hover:border-blue-500'
              >
                <div className='p-3  w-[5%]'>
                  <h1>{index + 1}.</h1>
                </div>
                <div className='p-3 w-[70%]  '>
                  <div className='flex space-x-[6.2rem]'>
                    <div className=''>
                      <h1 className='text-gray-500 text-sm'>Heading</h1>
                    </div>
                    <div className=''>: {data.heading}</div>
                    <span className='text-red-600 text-xs'></span>
                  </div>
                  <div className='flex space-x-[5rem]'>
                    <div className=''>
                      <h1 className='text-gray-500 text-sm'>Description </h1>
                    </div>
                    <div className=''>: {data.description}</div>
                    <span className='text-red-600 text-xs'></span>
                  </div>
                </div>

                <div className=' flex justify-end items-center space-x-4 w-[20%]'>
                  {/* <button className='border border-blue-400 bg-blue-100 w-8 h-8 pl-2 rounded-full text-blue-600'>
                    <FaEdit />
                  </button> */}
                  <button
                    className='border border-blue-400 bg-blue-100 w-8 h-8 pl-2 rounded-full text-blue-600'
                    onClick={() => handleDelete(data.heading, data.description)}
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            ))}
            {/* <div className="pb-1"></div> */}

            {showFields == true && (
              <div className=' '>
                <form onSubmit={formik.handleSubmit} onChange={handleOnChange}>
                  <div className='m-5'>
                    <div className='pt-3 w-full'>
                      <input
                        type='text'
                        className='text-gray-600 rounded-xl w-full h-16 px-2 outline-none focus:bg-[#e7e7f7] border border-gray-300 focus:border-blue-700 focus:border'
                        placeholder='Enter Criteria'
                        name='heading'
                        onChange={formik.handleChange}
                        value={formik.values.heading}
                      />
                      <span className='text-red-600 text-xs'>
                        {formik.touched.heading && formik.errors.heading
                          ? formik.errors.heading
                          : null}
                      </span>
                    </div>
                  </div>
                  <div className='m-5'>
                    <div className=' w-full'>
                      <textarea
                        type='text'
                        className='text-gray-600 rounded-xl w-full h-24 pt-2 px-2 outline-none focus:bg-[#e7e7f7] border border-gray-300 focus:border-blue-700 focus:border'
                        placeholder='Enter Description'
                        name='description'
                        onChange={formik.handleChange}
                        value={formik.values.description}
                      />
                      <span className='text-red-600 text-xs'>
                        {formik.touched.description && formik.errors.description
                          ? formik.errors.description
                          : null}
                      </span>
                    </div>
                  </div>
                  <div className='flex justify-end mr-5 pb-5'>
                    <button
                      className=' border border-[#4338ca] bg-white hover:bg-[#4338ca] hover:text-white px-3 py-2 rounded ml-5'
                      onClick={() => setShowFields(false)}
                      type='reset'
                    >
                      Close
                    </button>
                    <button className=' border border-[#4338ca] bg-[#4338ca] hover:bg-[#342b96] text-white px-6 py-2 rounded ml-5'>
                      Add
                    </button>
                  </div>
                </form>
              </div>
            )}
            {formValues?.criteria?.length > 0 && <div className='pb-1'></div>}
          </>
        )}

        {/* Bidder Details */}
        {props.heading == "Bidder Details" && (
          <div className='p-7'>
            <h1 className='text-xl font-medium'>Bidder’s</h1>
            <p className='font-extralight text-xs underline pb-4'>
              Enter Number of Bidder Participated
            </p>
            <input
              type='number'
              name='no_of_bidder'
              className='border border-blue-400 rounded w-full h-10 outline-blue-300 px-2'
              placeholder=' Enter Number of Bidder Participated'
              onChange={(e) => {
                setBidderNo(e.target.value);
                localStorage.setItem("biddersCount", e.target.value);
              }}
            />
          </div>
        )}

        {props.heading == "Bidder Amount Details" && (
          <div className='p-7'>
            <h1 className='text-xl font-medium'>
              Bidder’s Bidding Amount Details and Bidding ratio details
            </h1>
            <p className='font-extralight text-xs underline pb-4 mb-5'>
              Enter Bidding Amount for all Bidders
            </p>

            {props?.bidderData?.bidder_master?.length > 0 &&
              props?.bidderData?.bidder_master?.map((bidderDet, index) => (
                <div
                  className='flex gap-4 justify-between items-center mb-4'
                  key={index}
                >
                  <p className='whitespace-nowrap'>{bidderDet?.name}</p>
                  <input
                    type='number'
                    name={bidderDet?.name}
                    className='border border-blue-400 rounded w-1/2 h-10 outline-blue-300 px-2'
                    placeholder=' Enter Amount'
                    onChange={(e) => {
                      addBiddingAmountHandler(e.target.value, bidderDet?.id);
                    }}
                  />
                </div>
              ))}

            <div className='flex items-center justify-between mt-20'>
              <div>
                <h1 className='text-xl font-medium'>Select Bidding Ratio</h1>
                <p className='font-extralight text-xs underline pb-4 mb-5 w-2/3'>
                  Ex- 80:20 implies that the total score will be 80% percent of
                  technical score and 20% of financial score
                </p>
              </div>
              <div className='form-group flex-shrink max-w-full w-1/2'>
                <label className={`${labelStyle} inline-block mb-2`}>
                  Choose Item
                  <span className='text-xl text-red-500 pl-1'>*</span>{" "}
                </label>
                <select
                  className={`${inputStyle} inline-block w-full relative`}
                  onChange={(e) => setRatio(e.target.value)}
                  // disabled={formData?.length > 0 || page == "edit"}
                  // defaultValue={categorySelected || "select"}
                >
                  <option value=''>select</option>
                  <option value={"t80f20"}>80 : 20</option>
                  <option value={"t70f30"}>70 : 30</option>
                  <option value={"t60f40"}>60 : 40</option>
                  {/* <option>others</option> */}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bidder Details */}
      <div className='flex justify-between mt-5'>
        <div className=''>
          {props.tabNo != 1 && (
            <button
              className='border border-[#4338ca] bg-[#4338ca] hover:bg-[#342b96] text-white px-6 py-2 rounded'
              onClick={() => {
                navigate(-1);
              }}
            >
              Previous
            </button>
          )}
        </div>

        <div className='flex justify-between items-center w-full ml-2'>
          <button
            className='bg-[#4338ca] px-10 py-2 text-white rounded-md hover:bg-blue-900'
            onClick={() =>
              navigate(`/biddingViewById/${props?.referenceNo}/inbox`)
            }
          >
            Back
          </button>

          <div className='space-x-4 flex justify-end'>
            {props?.heading == "Bidder Details" ? (
              <button
                className='border border-[rgb(67,56,202)] bg-[rgb(67,56,202)] hover:bg-[#342b96] text-white px-6 py-2 rounded'
                onClick={() => submitCreteria()}
                // onClick={() => navigate("/bidding-details?tabNo=1")}
              >
                Submit
              </button>
            ) : props?.heading == "Bidder Amount Details" ? (
              <button
                className='border border-[rgb(67,56,202)] bg-[rgb(67,56,202)] hover:bg-[#342b96] text-white px-6 py-2 rounded'
                onClick={postBiddingAmtHandler}
                // onClick={() => navigate("/bidding-details?tabNo=1")}
              >
                Submit
              </button>
            ) : (
              <button
                className='border border-[#4338ca] bg-[#4338ca] hover:bg-[#342b96] text-white px-6 py-2 rounded'
                onClick={() => addCreteria()}
                // onClick={() =>
                //   navigate(
                //     `/bidding-commparision-tabs?tabNo=${props.tabNo + 1}`,
                //     {
                //       state: props?.referenceNo,
                //     }
                //   )
                // }
              >
                {isLoading ? (
                  <div className={`${loading}`}></div>
                ) : (
                  "Save & Next"
                )}
                {/* Save & Next */}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BiddingCreteria;
