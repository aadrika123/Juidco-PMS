import { useEffect, useState } from "react";
import { Formik, Form, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import RadioButtonsGroup from "@/Components/Common/FormMolecules/RadioButtonsGroup";
import cdIcon from "@/Components/assets/cd.svg";
import UploadDoc from "./UploadDoc";
import toast from "react-hot-toast";

const tabsCover1 = [
  {
    name: "fee/ prequal/ technical/ financial",
    value: "fee/prequal/technical/financial",
    docs: [],
  },
];
const tabsCover2 = [
  {
    name: "fee/ prequal/ technical",
    value: "fee/prequal/technical",
    docs: [],
  },
  { name: "financial", value: "financial", docs: [] },
];
const tabsCover3 = [
  { name: "fee", value: "fee", docs: [] },
  { name: "prequal/ technical", value: "prequal/technical", docs: [] },
  { name: "financial", value: "financial", docs: [] },
];
const tabsCover4 = [
  { name: "fee", value: "fee", docs: [] },
  { name: "prequal", value: "prequal", docs: [] },
  { name: "technical", value: "technical", docs: [] },
  { name: "financial", value: "financial", docs: [] },
];

const CoverDetailsForm = () => {
  const [tabData, setTabData] = useState(tabsCover1);
  const [activeTab, setActiveTab] = useState(tabsCover1[0]?.value);
  const [imageDoc, setImageDoc] = useState([]);
  const [preview, setPreview] = useState();

  const covers = [
    { label: "Single Cover", value: "single_cover" },
    { label: "Two Cover", value: "two_cover" },
    { label: "Three Cover", value: "three_cover" },
    { label: "Four Cover", value: "four_cover" },
  ];

  const autoSelectActiveTab = (tab) => {
    setActiveTab(tab[0]?.value);
  };

  const validationSchema = Yup.object({
    noOfCovers: Yup.string().required("No of Covers is required"),
    content: Yup.string().required("Content is required"),
    tabs: Yup.array().required("Please upload the documents"),
  });

  const initialValues = {
    noOfCovers: "single_cover",
    tabs: [
      {
        name: "fee/ prequal/ technical",
        value: "fee/prequal/technical",
        docs: [],
      },
    ],
    content: "",
  };

  const handleCoversChange = (event, setFieldValue) => {
    const { value } = event.target;
    console.log(value, "noOfCovers");
    setFieldValue("noOfCovers", value);
    if (value == "single_cover") {
      setTabData(tabsCover1);
      autoSelectActiveTab(tabsCover1);
    } else if (value == "two_cover") {
      setTabData(tabsCover2);
      autoSelectActiveTab(tabsCover2);
    } else if (value == "three_cover") {
      setTabData(tabsCover3);
      autoSelectActiveTab(tabsCover3);
    } else if (value == "four_cover") {
      setTabData(tabsCover4);
      autoSelectActiveTab(tabsCover4);
    }
  };

  const handleSubmit = (values) => {
    values.tabs.forEach((tab, index) => {
      if (tab.docs.length === 0) {
        return toast.error(`Please upload valid documents for ${tab.name}`);
      }
    });
    console.log(values, "form values");
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
          onSubmit={handleSubmit}
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
                      tabData?.map((data, index) => (
                        <div className='flex mt-6 ' key={index}>
                          <button
                            className={`py-2 px-2 ${
                              activeTab === data.value
                                ? "border-b-2 border-blue-500 text-white bg-[#4338CA]"
                                : "text-black bg-[#E9E9E9]"
                            } focus:outline-none flex shadow-xl border border-gray-200 rounded rounded-t-lg rounded-b-none ${
                              errors.tabs && touched.tabs
                                ? "border-red-500 text-red-400"
                                : ""
                            }`}
                            type='button'
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
                        <FieldArray name='tabs'>
                          {({ remove, push }) => (
                            <>
                              <UploadDoc
                                tab={activeTab}
                                setImageDoc={setImageDoc}
                                imageDoc={imageDoc}
                                setPreview={setPreview}
                                preview={preview}
                                tabData={tabData}
                                setTabData={setTabData}
                                formikContentVal={values.content}
                                formikTabs={values.tabs}
                                errors={errors}
                                touched={touched}
                                setFieldValue={setFieldValue}
                              />
                              {errors.tabs && touched.tabs ? (
                                <p className='text-red-500 text-xs'>
                                  {errors.tabs}
                                </p>
                              ) : null}
                            </>
                          )}
                        </FieldArray>
                      </div>
                    )}
                  </div>
                </div>
                <div className='mb-5'>
                  <button
                    className='bg-[#4338CA] mt-5 py-2 px-4 text-sm text-white rounded hover:bg-white hover:text-[#4338ca] border hover:border-[#4338ca] flex float-left'
                    // onClick=
                  >
                    Back
                  </button>

                  <button
                    className='bg-[#4338CA] mt-5 py-2 px-4 text-sm text-white rounded hover:bg-white hover:text-[#4338ca] border border-[#4338ca] flex float-right animate-pulse'
                    type='submit'
                  >
                    Save & Next
                  </button>

                  <button
                    className='bg-white mt-5 py-2 px-4 text-sm text-black rounded hover:bg-[#4338CA] hover:text-white border border-[#4338ca] mr-5 flex float-right'
                    // onClick='##'
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
