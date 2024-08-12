import React, { useState } from "react";
// import { TbCircleLetterNFilled } from "react-icons/tb";
import ConfirmationModal from "@/Components/Common/Modal/ConfirmationModal";
import { useFormik } from "formik";
import ImageModal from "@/Components/Pages/Others/ImageModal/ImageModal";
import img from "@/Components/assets/page.pdf";
import { useLocation } from "react-router-dom";

const BiddingType = () => {
  const [markingType, setMarkingType] = useState("Numeric");
  const [bidderDetails, setBidderDetails] = useState([]);
  const [confModal, setConfModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [imageModal, setImageModal] = useState(false);

  const {state} = useLocation()
  console.log(state)

  const numberOfBidders = [
    {
      bidderHeading: `B1`,
      compName: `Raju Pvt Ltd.`,
      doc: "Uploaded Document",
    },
    {
      bidderHeading: `B2`,
      compName: `Farhan Pvt Ltd.`,
      doc: "Uploaded Document",
    },
    {
      bidderHeading: `B3`,
      compName: `Milimeter Pvt Ltd.`,
      doc: "Uploaded Document",
    },
    {
      bidderHeading: `B4`,
      compName: `Rancho Pvt Ltd.`,
      doc: "Uploaded Document",
    },
    // {
    //   bidderHeading: `B4`,
    //   compName: `Rancho Pvt Ltd.`,
    //   doc: "Uploaded Document",
    // },
    // {
    //   bidderHeading: `B4`,
    //   compName: `Rancho Pvt Ltd.`,
    //   doc: "Uploaded Document",
    // },
    // {
    //   bidderHeading: `B4`,
    //   compName: `Rancho Pvt Ltd.`,
    //   doc: "Uploaded Document",
    // },
  ];


  const creteria = [
    {
      creteria: "creteria 01",
      desc: "Description For creteria 1",
      input: `creteria01`,
    },
    {
      creteria: "creteria 02",
      desc: "Description For creteria 2",
      input: `creteria02`,
    },
    {
      creteria: "creteria 03",
      desc: "Description For creteria 3",
      input: `creteria03`,
    },
  ];

  // intitial value
  // const initialValues = {
  //   itemcategory: "",
  //   itemsubcategory: "",
  //   brand: "",
  //   description: "",
  //   quantity: "",
  //   rate: "",
  // };

  const initialValues = creteria.reduce((acc, { input }) => {
    acc[input] = "";
    return acc;
  });

  // Generate validation schema based on criteria

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      // console.log(values);
      console.log("Bidder DEtails", bidderDetails);
    },
    // validationSchema,
  });

  const handleOnChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    // {
    //   name == "itemsubcategory" && fetchBrand(value);
    // }
    // {
    //   name == "number_of_items" &&
    //     formik.setFieldValue(
    //       "number_of_items",
    //       allowNumberInput(value, formik.values.number_of_items, 100)
    //     );
    // }
    // {
    //   name == "quantity" &&
    //     formik.setFieldValue(
    //       "quantity",
    //       allowNumberInput(value, formik.values.quantity, 100)
    //     );
    // }
  };

  const confirmationHandlerCnf = () => {
    setConfModal(false);
  };

  const confirmationHandlerCncl = () => {
    setCancelModal(false);
  };

  const handleCancel = () => {
    setConfModal(false);
    setCancelModal(false);
  };

  // const handleChange = (e, crite, bidderName) => {
  // const { value } = e.target;
  // console.log(value, "value");

  //   setBidderDetails((prev) => {
  // const currentBidderDetails = Array.isArray(prev[bidderName])
  //   ? [...prev[bidderName]]
  //   : [];

  // const criteriaIndex = currentBidderDetails.findIndex(
  //   (item) => item.criteria === crite?.input
  // );

  //     if (criteriaIndex !== -1) {
  //       // Update the existing criteria object
  //       currentBidderDetails[criteriaIndex].value = value;
  //     } else {
  //       // Add a new criteria object
  //       currentBidderDetails.push({ value: value, criteria: crite?.input });
  //     }

  //     return {
  //       ...prev,
  //       [bidderName]: currentBidderDetails,
  //     };
  //   });
  // };

  const handleChange = (e, crite, bidderName) => {
    console.log(e.target.value, "val", crite, "crite", bidderName, "bidder");
    const { value } = e.target;

    setBidderDetails((prev) => {
      // Find the existing bidder data index
      const bidderIndex = prev.findIndex((item) => item.id === bidderName);

      let updatedBidders;
      if (bidderIndex !== -1) {
        // Existing bidder found, update its criteria
        updatedBidders = prev.map((item, index) => {
          if (index === bidderIndex) {
            // Find the criteria index
            const criteriaIndex = item.criteria.findIndex(
              (crit) => crit.id === crite?.input
            );

            let updatedCriteria;
            if (criteriaIndex !== -1) {
              // Update the existing criteria object
              updatedCriteria = item.criteria.map((crit, i) =>
                i === criteriaIndex ? { ...crit, value } : crit
              );
            } else {
              // Add new criteria object
              updatedCriteria = [...item.criteria, { id: crite?.input, value }];
            }

            return { ...item, criteria: updatedCriteria };
          }
          return item;
        });
      } else {
        // No existing bidder, add new bidder with criteria
        updatedBidders = [
          ...prev,
          {
            id: bidderName,
            criteria: [{ id: crite?.input, value }],
          },
        ];
      }

      return updatedBidders;
    });
  };

  const handleSymbolicChange = (e, crite, bidderName) => {
    const { value } = e.target;
    console.log(value, "value");

    setBidderDetails((prev) => {
      const bidderIndex = prev.findIndex((item) => item.id === bidderName);
      let updatedBidders;
      if (bidderIndex !== -1) {
        updatedBidders = prev.map((item, index) => {
          if (index === bidderIndex) {
            const criteriaIndex = item.criteria.findIndex(
              (crit) => crit.id === crite?.input
            );

            let updatedCriteria;
            if (criteriaIndex !== -1) {
              updatedCriteria = item.criteria.map((crit, i) =>
                i === criteriaIndex ? { ...crit, value } : crit
              );
            } else {
              updatedCriteria = [...item.criteria, { id: crite?.input, value }];
            }

            updatedCriteria?.map(
              (obj) => (obj.total = obj.total + Number(value))
            );

            console.log(updatedCriteria, "updatedCriteria");

            return { ...item, criteria: updatedCriteria };
          }
          return item;
        });
      } else {
        updatedBidders = [
          ...prev,
          {
            id: bidderName,
            criteria: [{ id: crite?.input, value }],
          },
        ];
      }

      return updatedBidders;
    });
  };

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
          imageUrl={img}
        />
      </>
    );
  }

  return (
    <>
      <div className='ml-20 mr-20'>
        <div className='flex justify-between'>
          <button className='bg-[#4338ca] text-white py-2 px-8 rounded-md'>
            Least Cost Based Selection
          </button>
          <button className='bg-gray-200 text-[#4338ca] py-2 px-8 rounded-md'>
            Quality and Cost Based Selection{" "}
          </button>
          <button className='bg-gray-200 text-[#4338ca] py-2 px-8 rounded-md'>
            Rate Contract Based Selection{" "}
          </button>

          <div className=''>
            <select
              className={`pl-3 pr-3 border border-blue-400 rounded-md w-full h-10 outline-blue-300`}
              onChange={(e) => {
                console.log(e.target.value, "val");
                setMarkingType(e.target.value);
              }}
            >
              <option defaultValue={"numeric"}>Numeric</option>
              <option>Symbolic</option>
            </select>
          </div>
        </div>
      </div>

      {/* <div className="m-5 border-[3px] border-white flex">
        <div className="p-4 pr-36 ">
          <h1>All Creteria </h1>
          <p className="text-sm text-gray-400">Document Uploaded by Bidder</p>
        </div>

        <div className=" w-[50rem] overflow-y-auto flex">
        {document?.map((data) => (
          <div className="w-52 border-[2px] border-white flex justify-center items-center">
            <h1 className="border border-[#4338ca] rounded-full pl-3 pr-3 hover:bg-[#4338ca] cursor-pointer hover:text-white">
              {data?.doc}
            </h1>
          </div>
        ))}
        </div>

      </div> */}

      <form onSubmit={formik.handleSubmit} onChange={handleOnChange}>
        <div className=''>
          <div className='flex m-6'>
            <div className='bg-white w-[25rem] '>
              <div className='p-[1.4rem] border border-gray-00'>
                <h1>All Criteria </h1>
                <p className='text-sm text-gray-400'>
                  Docement Uploaded by Bidder{" "}
                </p>
              </div>
              <div className='p-8 border border-gray-00'>
                <h1>Criteria Details </h1>
                <p className='text-sm text-gray-400'>
                  Criteria For Technical Quality Comparison{" "}
                </p>
              </div>

              {creteria?.map((data) => (
                <div className='pl-8 pt-5 pb-4 border border-gray-00'>
                  <h1>{data?.creteria} </h1>
                  <p className='text-sm text-gray-400'>{data?.desc}</p>
                </div>
              ))}
              <div className='pl-8 pr-6 pt-4 pb-4 border border-gray-00'>
                {markingType == "Numeric" && (
                  <button className='bg-blue-800 px-5 py-2 text-white rounded-md w-full hover:bg-blue-900'>
                    Total Point Out of 800
                  </button>
                )}
                {markingType == "Symbolic" && (
                  <button className='bg-blue-800 px-5 py-2 text-white rounded-md w-full hover:bg-blue-900'>
                    Total Point Out of 10
                  </button>
                )}
              </div>
            </div>

            <div className='w-[80%] overflow-x-auto flex'>
              {numberOfBidders?.map((data) => (
                <div className='bg-white w-full'>
                  <div className='p-7 border-t border-gray-100 text-center w-[10rem]'>
                    <h1
                      className='border border-[#4338ca] rounded-full text-xs hover:bg-[#4338ca] cursor-pointer hover:text-white '
                      onClick={() => setImageModal(true)}
                    >
                      Document Uploaded
                    </h1>
                  </div>

                  <div className='p-7 border-t border-gray-100 text-center w-[10rem]'>
                    <h1 className='text-2xl font-bold'>
                      {data?.bidderHeading}{" "}
                    </h1>
                    <p className='text-sm text-gray-400 truncate'>
                      {data?.compName}{" "}
                    </p>
                  </div>

                  {markingType == "Numeric" && (
                    <>
                      {creteria?.map((crite, index) => (
                        <div className='pl-8 pr-8 pt-6 pb-[1.55rem] border-t border-gray-200'>
                          <input
                            type='text'
                            name={data?.bidderHeading} // Example bidderHeading name
                            // name={`${crite?.input}${data?.bidderHeading}`}
                            className='border text-center border-blue-400 rounded w-full h-8 outline-blue-300'
                            onChange={(e) =>
                              handleChange(e, crite, data?.bidderHeading)
                            }
                            value={
                              formik.values.crite?.input.data?.bidderHeading
                            }
                          />
                        </div>
                      ))}
                      <div className='pl-8 pr-6 pt-6 pb-5 text-center  border border-gray-00 bg-[#4338ca] text-white'>
                        <h1 className='text-xl'>
                          800 <span className='text-xs'>Points</span>
                        </h1>
                      </div>
                    </>
                  )}

                  {markingType == "Symbolic" && (
                    <>
                      {creteria?.map((crite) => (
                        <div className=' border-t border-r border-gray-200 pl-3 pr-3 pt-5 pb-[1.05rem]'>
                          <div className='flex justify-around'>
                            <div className='inline-flex items-center'>
                              <label
                                className='relative flex items-center p-3 rounded-full cursor-pointer'
                                htmlFor={`custom-style1-${data?.bidderHeading}-${crite?.input}`}
                              >
                                <input
                                  name={`${data?.bidderHeading} ${crite?.input}`}
                                  type='radio'
                                  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-red-300 bg-red-900/5 p-0 text-red-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-red-500 before:opacity-0 before:transition-opacity checked:border-red-900 checked:before:bg-red-900 hover:before:opacity-0"
                                  id={`custom-style1-${data?.bidderHeading}-${crite?.input}`}
                                  // onChange={() =>
                                  //   console.log(
                                  //     `${data?.bidderHeading} ${crite?.input} cross`
                                  //   )
                                  // }
                                  onChange={(e) =>
                                    handleSymbolicChange(
                                      e,
                                      crite,
                                      data?.bidderHeading
                                    )
                                  }
                                  // value={
                                  //   formik.values.crite?.input.data
                                  //     ?.bidderHeading
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
                                htmlFor={`custom-style2-${data?.bidderHeading}-${crite?.input}`}
                              >
                                <input
                                  name={`${data?.bidderHeading} ${crite?.input}`}
                                  type='radio'
                                  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-green-300 bg-green-900/5 p-0 text-green-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-green-500 before:opacity-0 before:transition-opacity checked:border-green-900 checked:before:bg-green-900 hover:before:opacity-0"
                                  id={`custom-style2-${data?.bidderHeading}-${crite?.input}`}
                                  onChange={(e) =>
                                    handleSymbolicChange(
                                      e,
                                      crite,
                                      data?.bidderHeading
                                    )
                                  }
                                  // value={
                                  //   formik.values.crite?.input.data
                                  //     ?.bidderHeading
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
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className='mt-10'>
            <div className=' flex justify-end space-x-8'>
              <button
                className='border border-blue-800 px-14 py-2  rounded-md hover:bg-[#4338ca] hover:text-white'
                onClick={() => setCancelModal(true)}
              >
                Cancel
              </button>
              <button
                className='bg-[#4338ca] px-14 py-2 text-white rounded-md hover:bg-blue-900'
                // onClick={()=>setConfModal(true)}
                type='submit'
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default BiddingType;
