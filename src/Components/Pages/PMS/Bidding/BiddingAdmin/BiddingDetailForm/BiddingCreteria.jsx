import React, { useContext, useEffect, useState } from "react";
import techIcon from "@/Components/assets/TechIcon.svg";
import { IoAddSharp } from "react-icons/io5";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import { contextVar } from "@/Components/context/contextVar";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { useFormik } from "formik";
import ConfirmationModal from "@/Components/Common/Modal/ConfirmationModal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ProjectApiList from "@/Components/api/ProjectApiList";
import ApiHeader from "@/Components/api/ApiHeader";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import toast from "react-hot-toast";

const BiddingCreteria = (props) => {
  const { titleBarVisibility, setReferenceNo } = useContext(contextVar);

  const location = useLocation();

  // console.log(location?.search)

  const navigate = useNavigate();
  const { api_addCreteria, api_submitCreteria } = ProjectApiList();

  const [showFields, setShowFields] = useState(false);
  const [formValues, setFormValues] = useState({
    criteria: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [creteriaType, setCreteriaType] = useState();
  const [bidderNo, setBidderNo] = useState();

  // console.log(bidderNo);
  // setReferenceNo(props?.bidderData?.reference_no);
  // intitial value
  const initialValues = {
    heading: "",
    description: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      setFormValues((prev) => ({ criteria: [...prev["criteria"], values] }));
      // console.log("okijuhygtfcvgbhyunimnubyv")
    },
    // validationSchema,
  });

  // console.log(formValues);

  const handleOnChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    // {
    //   name == "description" &&
    //     formik.setFieldValue(
    //       "number_of_items",
    //       allowNumberInput(value, formik.values.number_of_items, 100)
    //     );
    // }
  };

  console.log(creteriaType)

  //------------------- Apis ------------------------

  const addCreteria = () => {
    // setIsLoading(true);

    AxiosInterceptors.post(
      `${api_addCreteria}`,
      {
        reference_no: props?.bidderData?.reference_no,
        criteria: formValues?.criteria,
        criteria_type: creteriaType,
      },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status) {
          toast.success("Creteria Added Succefully");
          navigate(`/bidding-commparision-tabs?tabNo=${props.tabNo + 1}`, {
            state: props?.bidderData?.reference_no,
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
        // setIsLoading(false);
      });
  };

  const submitCreteria = () => {
    // setIsLoading(true);

    AxiosInterceptors.post(
      `${api_submitCreteria}`,
      {
        reference_no: props?.bidderData?.reference_no,
        no_of_bidders: Number(bidderNo),
      },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status) {
          toast.success("Bidder Added Succefully");
          navigate(`/bidding-details?tabNo=1`, {
            state: props?.bidderData?.reference_no,
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
        // setIsLoading(false);
      });
  };

  // -----------------------------------------------------

  useEffect(() => {
    if (location?.search == "?tabNo=1") {
      setCreteriaType("technical");
    }
    if (location?.search == "?tabNo=2") {
      setCreteriaType("financial");
    }
  });

  // -----------------------------------------------------

  const handleDelete = (index) => {
    const newFormData = formValues.filter((_, i) => i !== index);
    setFormValues(newFormData);
  };

  const confirmationHandler = () => {
    console.log(formValues);
  };

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
        />
      </>
    );
  }

  return (
    <>
      <div className='bg-white border border-blue-500 rounded-lg shadow-xl space-y-5 '>
        {props.heading !== "Bidder Details" && (
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
                  Discription
                </h1>
              </div>
            </div>

            <div className='pb-1'></div>

            {formValues?.criteria.map((data, index) => (
              <div className='border border-gray-300 rounded-xl flex m-5 cursor-pointer hover:border hover:bg-gray-50 hover:border-blue-500'>
                <div className='p-3  w-[5%]'>
                  <h1>{index + 1}.</h1>
                </div>
                <div className='p-3 w-[70%]  '>
                  <div className='flex space-x-[6.2rem]'>
                    <div className=''>
                      <h1 className='text-gray-500 text-sm'>heading </h1>
                    </div>
                    <div className=''>: {data.heading}</div>
                  </div>
                  <div className='flex space-x-[5rem]'>
                    <div className=''>
                      <h1 className='text-gray-500 text-sm'>Description </h1>
                    </div>
                    <div className=''>: {data.description}</div>
                  </div>
                </div>

                <div className=' flex justify-end items-center space-x-4 w-[20%]'>
                  <button className='border border-blue-400 bg-blue-100 w-8 h-8 pl-2 rounded-full text-blue-600'>
                    <FaEdit />
                  </button>
                  <button
                    className='border border-blue-400 bg-blue-100 w-8 h-8 pl-2 rounded-full text-blue-600'
                    onClick={() => handleDelete(index)}
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
                        placeholder='Criteria 1'
                        name='heading'
                        onChange={formik.handleChange}
                        value={formik.values.heading}
                      />
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
                    </div>
                  </div>
                  <div className='flex justify-end mr-5 pb-5'>
                    <button
                      className=' border border-[#4338ca] bg-white hover:bg-[#4338ca] hover:text-white px-3 py-2 rounded ml-5'
                      onClick={() => setShowFields(false)}
                    >
                      close
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

        <div className='space-x-4 flex justify-end'>
          {props?.heading == "Bidder Details" ? (
            <button
              className='border border-[rgb(67,56,202)] bg-[rgb(67,56,202)] hover:bg-[#342b96] text-white px-6 py-2 rounded'
              onClick={() => submitCreteria()}
              // onClick={() =>
              //   navigate(`/bidding-details?tabNo=1`, {
              //     state: props?.bidderData?.reference_no,
              //   })
              // }
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
              //       state: props?.bidderData?.reference_no,
              //     }
              //   )
              // }
            >
              Save & Next
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default BiddingCreteria;
