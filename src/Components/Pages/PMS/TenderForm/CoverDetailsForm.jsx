import RadioButtonsGroup from "@/Components/Common/FormMolecules/RadioButtonsGroup";
import cdIcon from "@/Components/assets/cd.svg";

// export default function CoverDetailsForm() {
//   const covers = [
//     { label: "Single Cover", value: "single_cover" },
//     { label: "Two Cover", value: "two_cover" },
//     { label: "Three Cover", value: "three_cover" },
//     { label: "Four Cover", value: "four_cover" },
//   ];
//   return (
//     <>
//       <div className='bg-white rounded-md w-full shadow-md p-4'>
//         {/* Heading  */}
//         <div className='bg-[#4338ca] text-white w-full rounded p-2 flex'>
//           <img src={cdIcon} className='pl-2' width={40} />
//           <h1 className='pt-1 pl-2 text-xl'>Cover Details</h1>
//         </div>

//         <div>
//           <RadioButtonsGroup fields={covers} title={"No of Covers"} handleChange={handleChange}/>
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useState } from "react";
import folder from "@/Components/assets/folder.svg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import UploadDoc from "./UploadDoc";

const tabsCover1 = [
  {
    name: "fee/ prequal/ technical/ financial",
    value: "fee/prequal/technical/financial",
  },
];
const tabsCover2 = [
  { name: "fee/ prequal/ technical", value: "fee/prequal/technical" },
  { name: "financial", value: "financial" },
];
const tabsCover3 = [
  { name: "fee", value: "fee" },
  { name: "prequal/ technical", value: "prequal/technical" },
  { name: "financial", value: "financial" },
];
const tabsCover4 = [
  { name: "fee", value: "fee" },
  { name: "prequal", value: "prequal" },
  { name: "technical", value: "technical" },
  { name: "financial", value: "financial" },
];

const CoverDetailsForm = () => {
  const [tabData, setTabData] = useState(tabsCover1);
  const [activeTab, setActiveTab] = useState();

  const covers = [
    { label: "Single Cover", value: "single_cover" },
    { label: "Two Cover", value: "two_cover" },
    { label: "Three Cover", value: "three_cover" },
    { label: "Four Cover", value: "four_cover" },
  ];

  const validationSchema = Yup.object({
    noOfCovers: Yup.string().required("No of Covers is required"),
  });

  const initialValues = {
    noOfCovers: "",
  };

  const handleCoversChange = (event, setFieldValue) => {
    const { value } = event.target;
    setFieldValue("noOfCovers", value);
    {
      value == "single_cover" && setTabData(tabsCover1);
    }
    {
      value == "two_cover" && setTabData(tabsCover2);
    }
    {
      value == "three_cover" && setTabData(tabsCover3);
    }
    {
      value == "four_cover" && setTabData(tabsCover4);
    }
  };

  return (
    <>
      {/* Heading */}
      <div className='bg-[#4338ca] text-white w-full rounded p-3 flex shadow-xl'>
        <img src={cdIcon} className='pl-2' alt='folder icon' />
        <h1 className='pt-1 pl-2 text-xl'>Cover Details</h1>
      </div>

      {/* Form Starting */}
      <div className='mt-5'>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            // if (values.noOfCovers == "")
            // setTabData()
            console.log("Form values", values);
          }}
        >
          {({ values, handleChange, errors, touched, setFieldValue }) => (
            <Form>
              <>
                <div className='bg-white rounded-md w-full shadow-xl p-4 mt-5'>
                  <RadioButtonsGroup
                    fields={covers}
                    title='No of Covers'
                    values={values.noOfCovers}
                    handleChange={(event) =>
                      handleCoversChange(event, setFieldValue)
                    }
                    errors={errors.noOfCovers}
                    touched={touched.noOfCovers}
                    name={"noOfCovers"}
                    defaultValue={"single_cover"}
                  />

                  {/* tabs */}
                  <div className='flex gap-8 px-4 w-full relative z-1'>
                    {tabData &&
                      tabData?.map((data) => (
                        <div className='flex mt-6 '>
                          <button
                            className={`py-2 px-2 ${
                              activeTab === data.value
                                ? "border-b-2 border-blue-500 text-white bg-[#4338CA]"
                                : "text-black bg-[#E9E9E9]"
                            } focus:outline-none flex shadow-xl border border-gray-200 rounded rounded-t-lg rounded-b-none`}
                            onClick={() => setActiveTab(data.value)}
                          >
                            {data.name}
                          </button>
                        </div>
                      ))}
                    <hr className='bg-indigo-500 h-[2px] w-2/3 px-4 absolute bottom-[1px] z-2' />
                  </div>

                  {/* tab view */}
                  <div className='mt-4'>
                    {activeTab != "" && (
                      <div>
                        <UploadDoc tab={activeTab} />
                      </div>
                    )}
                  </div>
                </div>
                <div className='mb-5'>
                  <button
                    className='bg-[#4338CA] mt-5 py-2 px-4 text-sm text-white rounded hover:bg-white hover:text-[#4338ca] border hover:border-[#4338ca] flex float-left'
                    onClick='##'
                  >
                    Back
                  </button>

                  <button
                    className='bg-[#4338CA] mt-5 py-2 px-4 text-sm text-white rounded hover:bg-white hover:text-[#4338ca] border border-[#4338ca] flex float-right animate-pulse'
                    onClick='##'
                  >
                    Save & Next
                  </button>

                  <button
                    className='bg-white mt-5 py-2 px-4 text-sm text-black rounded hover:bg-[#4338CA] hover:text-white border border-[#4338ca] mr-5 flex float-right'
                    onClick='##'
                  >
                    Reset
                  </button>
                </div>
              </>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default CoverDetailsForm;
