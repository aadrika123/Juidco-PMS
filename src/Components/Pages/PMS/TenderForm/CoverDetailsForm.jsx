import { useEffect, useState } from "react";
import { Formik, Form, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import RadioButtonsGroup from "@/Components/Common/FormMolecules/RadioButtonsGroup";
import cdIcon from "@/Components/assets/cd.svg";
import UploadDoc from "./UploadDoc";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import TenderFormButton from "@/Components/Common/TenderFormButton/TenderFormButton";
import ApiHeader2 from "@/Components/api/ApiHeader2";
import ProjectApiList from "@/Components/api/ProjectApiList";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ApiHeader from "@/Components/api/ApiHeader";

const tabsCover1 = [
  {
    name: "fee/ prequal/ technical/ financial",
    value: "fee/prequal/technical/financial",
    documents: [],
  },
];
const tabsCover2 = [
  {
    name: "fee/ prequal/ technical",
    value: "fee/prequal/technical",
    documents: [],
  },
  { name: "financial", value: "financial", documents: [] },
];
const tabsCover3 = [
  { name: "fee", value: "fee", documents: [] },
  { name: "prequal/ technical", value: "prequal/technical", documents: [] },
  { name: "financial", value: "financial", documents: [] },
];
const tabsCover4 = [
  { name: "fee", value: "fee", documents: [] },
  { name: "prequal", value: "prequal", documents: [] },
  { name: "technical", value: "technical", documents: [] },
  { name: "financial", value: "financial", documents: [] },
];

const CoverDetailsForm = (props) => {
  const [tabData, setTabData] = useState(tabsCover1);
  const [imageDoc, setImageDoc] = useState([]);
  const [preview, setPreview] = useState();
  const [referenceNo, setReferenceNo] = useState();
  const [coverDetails, setCoverDetails] = useState();
  const [activeTab, setActiveTab] = useState(tabsCover1[0]?.value);
  const [fetchTabData, setFetchedtabdata] = useState([]);

  const { api_postCoverDetails, api_postDocumentUpload, api_getCoverDetails } =
    ProjectApiList();

  const navigate = useNavigate();
  const { state } = useLocation();

  const covers = [
    { label: "Single Cover", value: "1" },
    { label: "Two Cover", value: "2" },
    { label: "Three Cover", value: "3" },
    { label: "Four Cover", value: "4" },
  ];

  const autoSelectActiveTab = (tab) => {
    setActiveTab(tab[0]?.value);
  };

  const validationSchema = Yup.object({
    noOfCovers: Yup.string().required("No of Covers is required"),
    content: Yup.string().required("Content is required"),
    tabs: Yup.array().required("Please upload the documents"),
  });

  //api to upload doc before submitting the form
  const uploadDoc = async (tabData) => {
    const uploadedDocs = {};

    for (const data of tabData) {
      const tabName = data.value;
      uploadedDocs[tabName] = [];

      for (const file of data?.documents) {
        let formData = new FormData();
        formData.append("doc", file);

        try {
          const res = await AxiosInterceptors.post(
            api_postDocumentUpload,
            formData,
            ApiHeader2()
          );

          if (res?.status == 200) {
            const fileUrl = res?.data; // Assuming the API response contains the uploaded file URL in 'url'
            uploadedDocs[tabName].push(fileUrl);
          } else {
            toast.error(`Failed to upload document for ${tabName}`);
            console.log(`Failed to upload document for ${tabName}`);
          }
        } catch (err) {
          toast.error(err);
          console.log(`Error uploading document for ${tabName}:`, err);
        }
      }
    }

    return uploadedDocs;
  };

  const compareAndAddDocs = (formVal, docObj) => {
    return formVal.map((obj) => {
      const key = obj.value; // Assuming 'value' is the key to compare
      if (docObj[key]) {
        return {
          ...obj,
          docs: docObj[key],
        };
      }
      return obj;
    });
  };

  // submit form
  const submitForm = async (values) => {
    // setLoading
    const docObj = await uploadDoc(values?.tabs);

    const data = await compareAndAddDocs(values?.tabs, docObj);
    values.tabs = data;
    values.reference_no = referenceNo;

    AxiosInterceptors.post(api_postCoverDetails, values, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          toast.success("Cover Details Submitted successfully");
          navigate(`/tendering?tabNo=${3}`);
        } else {
          toast.error("Error in submitting details. Please try again");
        }
      })
      .catch(function (error) {
        console.log(error, "errrrrrrrrrrrrrrrrrrr");
        toast.error(error?.response?.data?.error);
      });
  };

  const handleSubmit = (values) => {
    values.tabs.forEach((tab, index) => {
      if (tab?.documents?.length === 0) {
        toast.error(`Please upload valid documents for ${tab.name}`);
        return;
      }
    });
    submitForm(values);
  };

  ///////////{*** APPLICATION FULL DETAIL ***}/////////
  const getApplicationDetail = (refNo) => {
    AxiosInterceptors.get(`${api_getCoverDetails}/${refNo}`, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          console.log(response?.data?.data, "response?.data?.data");
          setCoverDetails(response?.data?.data);
          // setFetchedtabdata(response?.data?.data?.cover_details_docs);
          // response?.data?.data?.cover_details_docs.map(data => {
          //   let obj = {};
          //   obj[data?.type] = data?.type
          // })
          if (response?.data?.data?.noOfCovers == "1") {
            setTabData(tabsCover1);
            autoSelectActiveTab(tabsCover1);
          } else if (response?.data?.data?.noOfCovers == "2") {
            setTabData(tabsCover2);
            autoSelectActiveTab(tabsCover2);
          } else if (response?.data?.data?.noOfCovers == "3") {
            setTabData(tabsCover3);
            autoSelectActiveTab(tabsCover3);
          } else if (response?.data?.data?.noOfCovers == "4") {
            setTabData(tabsCover4);
            autoSelectActiveTab(tabsCover4);
          }
        } else {
          // toast.error(response?.data?.message);
        }
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });
  };

  const initialValues = {
    noOfCovers: String(coverDetails?.noOfCovers) || "1",
    tabs: [
      {
        name: "fee/ prequal/ technical",
        value: "fee/prequal/technical",
        documents: [],
      },
    ],
    content: coverDetails?.content || "",
  };

  useEffect(() => {
    let refNo = window.localStorage.getItem("reference_no");
    setReferenceNo(refNo);
    getApplicationDetail(refNo);
  }, []);

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
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            handleChange,
            errors,
            touched,
            setFieldValue,
            resetForm,
          }) => (
            <Form>
              <>
                <div className='bg-white rounded-md w-full shadow-xl p-4 mt-5'>
                  <RadioButtonsGroup
                    fields={covers}
                    title='No of Covers'
                    values={values.noOfCovers}
                    // handleChange={(event) =>
                    //   handleCoversChange(event, setFieldValue)
                    // }
                    errors={errors.noOfCovers}
                    touched={touched.noOfCovers}
                    name={"noOfCovers"}
                    defaultValue={String(coverDetails?.noOfCovers) || "1"}
                    setFieldValue={setFieldValue}
                    setTabData={setTabData}
                    autoSelectActiveTab={autoSelectActiveTab}
                    tabsCover1={tabsCover1}
                    tabsCover2={tabsCover2}
                    tabsCover3={tabsCover3}
                    tabsCover4={tabsCover4}
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
                                contentDefVal={coverDetails?.content}
                                docs={coverDetails?.cover_details_docs}
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

                <TenderFormButton resetForm={resetForm} state={state} />
              </>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default CoverDetailsForm;
