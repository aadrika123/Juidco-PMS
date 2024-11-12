import { useEffect, useState } from "react";
import { Formik, Form, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import RadioButtonsGroup from "@/Components/Common/FormMolecules/RadioButtonsGroup";
import cdIcon from "@/Components/assets/cd.svg";
import UploadDoc from "./UploadDoc";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import TenderFormButton from "@/Components/Common/TenderFormButton/TenderFormButton";
import ApiHeader2 from "@/Components/api/ApiHeader2";
import ProjectApiList from "@/Components/api/ProjectApiList";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ApiHeader from "@/Components/api/ApiHeader";
import LoaderApi from "@/Components/Common/Loaders/LoaderApi";

const tabsCover1 = [
  {
    name: "fee/ prequal/ technical/ financial",
    value: "fee/prequal/technical/financial",
    documents: [],
    docs: [],
  },
];
const tabsCover2 = [
  {
    name: "fee/ prequal/ technical",
    value: "fee/prequal/technical",
    documents: [],
    docs: [],
  },
  { name: "financial", value: "financial", documents: [], docs: [] },
];
const tabsCover3 = [
  { name: "fee", value: "fee", documents: [], docs: [] },
  {
    name: "prequal/ technical",
    value: "prequal/technical",
    documents: [],
    docs: [],
  },
  { name: "financial", value: "financial", documents: [], docs: [] },
];
const tabsCover4 = [
  { name: "fee", value: "fee", documents: [], docs: [] },
  { name: "prequal", value: "prequal", documents: [], docs: [] },
  { name: "technical", value: "technical", documents: [], docs: [] },
  { name: "financial", value: "financial", documents: [], docs: [] },
];

const CoverDetailsForm = () => {
  const [tabData, setTabData] = useState(tabsCover1);
  const [applicationFullData, setapplicationFullData] = useState();
  const [imageDoc, setImageDoc] = useState([]);
  const [preview, setPreview] = useState();
  const [referenceNo, setReferenceNo] = useState();
  const [coverDetails, setCoverDetails] = useState();
  const [activeTab, setActiveTab] = useState(tabsCover1[0]?.value);
  const [isLoading, setIsLoading] = useState(false);

  const {
    api_postCoverDetails,
    api_postDocumentUpload,
    api_getCoverDetails,
    api_fetchProcurementDetById,
  } = ProjectApiList();

  const navigate = useNavigate();
  const { state } = useLocation();

  const covers = [
    { label: "Single Cover", value: "1" },
    { label: "Two Cover", value: "2" },
    // { label: "Three Cover", value: "3" },
    // { label: "Four Cover", value: "4" },
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
    // setIsLoading(true);
    const uploadedDocs = {};

    for (const data of tabData) {
      const tabName = data.value;
      uploadedDocs[tabName] = [];

      for (const file of data?.documents) {
        let formData = new FormData();
        if (file instanceof File) {
          formData.append("doc", file);

          try {
            const res = await AxiosInterceptors.post(
              api_postDocumentUpload,
              formData,
              ApiHeader2()
            );

            if (res?.status == 200) {
              const fileUrl = res?.data?.data; // Assuming the API response contains the uploaded file URL in 'url'
              uploadedDocs[tabName].push(fileUrl);
            } else {
              toast.error(`Failed to upload document for ${tabName}`);
              console.log(`Failed to upload document for ${tabName}`);
            }
          } catch (err) {
            toast.error(err);
            console.log(`Error uploading document for ${tabName}:`, err);
          }
        } else {
          uploadedDocs[tabName].push(file);
        }

        // try {
        //   console.log("called===");
        //   const res = await AxiosInterceptors.post(
        //     api_postDocumentUpload,
        //     formData,
        //     ApiHeader2()
        //   );

        //   if (res?.status == 200) {
        //     const fileUrl = res?.data?.data; // Assuming the API response contains the uploaded file URL in 'url'
        //     uploadedDocs[tabName].push(fileUrl);
        //   } else {
        //     toast.error(`Failed to upload document for ${tabName}`);
        //     console.log(`Failed to upload document for ${tabName}`);
        //   }
        // } catch (err) {
        //   toast.error(err);
        //   console.log(`Error uploading document for ${tabName}:`, err);
        // } finally {
        // }
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
    setIsLoading(true);

    // setLoading
    const docObj = await uploadDoc(values?.tabs);
    const data = await compareAndAddDocs(values?.tabs, docObj);
    values.tabs = data;
    values.reference_no = referenceNo;
    AxiosInterceptors.post(api_postCoverDetails, values, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          setIsLoading(false);
          toast.success("Cover Details Submitted successfully");
          navigate(`/tendering?tabNo=${3}`);
        } else {
          toast.error("Error in submitting details. Please try again");
        }
      })
      .catch(function (error) {
        setIsLoading(false);
        console.log(error, "errrrrrrrrrrrrrrrrrrr");
        toast.error(error?.response?.data?.error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSubmit = (values) => {
    console.log(values, "values");
    values.tabs.forEach((tab) => {
      if (tab?.documents?.length === 0) {
        toast.error(`Please upload valid documents for ${tab.name}`);
        return;
      }
      submitForm(values);
    });
  };

  //to insert documents into initial values in tabscover data
  // const compareAndAddDocuments = (tabsData, responseData) => {
  //   console.log(tabsData, "tabsdata", responseData, "responseData");
  //   return tabsData?.map((obj) => {
  //     let docUrl = responseData?.find(
  //       (data) => data?.type === obj?.value
  //     )?.docPath;
  //     // if (responseData?.some((data) => data?.type === obj?.value)) {
  //     return {
  //       ...obj,
  //       documents: [...docUrl],
  //     };
  //   });
  //   return obj;
  // };

  const compareAndAddDocuments = (tabsData, responseData) => {
    return tabsData?.map((obj) => {
      let docUrl = responseData?.find(
        (data) => data?.type === obj?.value
      )?.docPath;
      return {
        ...obj,
        documents: docUrl ? docUrl : null,
        docs: docUrl ? docUrl : null,
      };
    });
  };

  ///////////{*** APPLICATION FULL DETAIL ***}/////////
  const getApplicationDetail = (refNo) => {
    setIsLoading(true);

    AxiosInterceptors.get(`${api_getCoverDetails}/${refNo}`, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          setCoverDetails(response?.data?.data);
          if (response?.data?.data?.noOfCovers == "1") {
            // setTabData(tabsCover1);
            const doc = compareAndAddDocuments(
              tabsCover1,
              response?.data?.data?.cover_details_docs
            );
            setTabData(doc);
            autoSelectActiveTab(tabsCover1);
          } else if (response?.data?.data?.noOfCovers == "2") {
            // setTabData(tabsCover2);
            const doc = compareAndAddDocuments(
              tabsCover2,
              response?.data?.data?.cover_details_docs
            );
            setTabData(doc);
            autoSelectActiveTab(tabsCover2);
          } else if (response?.data?.data?.noOfCovers == "3") {
            // setTabData(tabsCover3);
            const doc = compareAndAddDocuments(
              tabsCover3,
              response?.data?.data?.cover_details_docs
            );
            setTabData(doc);
            autoSelectActiveTab(tabsCover3);
          } else if (response?.data?.data?.noOfCovers == "4") {
            setTabData(tabsCover4);
            const doc = compareAndAddDocuments(
              tabsCover4,
              response?.data?.cover_details_docs
            );
            setTabData(doc);
            autoSelectActiveTab(tabsCover4);
          }
        } else {
          // toast.error(response?.data?.message);
        }
      })
      .catch(function (error) {
        // toast.error(error);
        console.log(error, "err-=======================>>>");
        toast.error("error?.response?.data?.message");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getBasicBiddingDetail = (refNo) => {
    setIsLoading(true);
    AxiosInterceptors.get(
      `${api_fetchProcurementDetById}/${refNo}`,
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status) {
          setapplicationFullData(response?.data?.data);
          if (response?.data?.data?.tendering_type === "qcbs") {
            setTabData(tabsCover2);
          }
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

  const initialValues = {
    noOfCovers: coverDetails?.noOfCovers
      ? String(coverDetails?.noOfCovers)
      : applicationFullData?.tendering_type === "qcbs"
      ? "2"
      : "1",
    tabs: [
      applicationFullData?.tendering_type !== "qcbs"
        ? {
            name: "fee/ prequal/ technical",
            value: "fee/prequal/technical",
            documents: [],
          }
        : tabsCover2,
    ],
    // tabs: tabData,
    content: coverDetails?.content || "",
  };

  useEffect(() => {
    let refNo = window.localStorage.getItem("reference_no");
    setReferenceNo(refNo);
    getApplicationDetail(refNo);
    getBasicBiddingDetail(refNo);
  }, []);

  return (
    <>
      {isLoading && <LoaderApi />}

      {/* Heading */}
      <div className='bg-[#4338ca] text-white w-full rounded p-3 flex shadow-xl'>
        <img src={cdIcon} className='pl-2' alt='folder icon' />
        <h1 className='pt-1 pl-2 text-xl'>Cover Details</h1>
      </div>

      {/* Form Starting */}
      <div
        className={`mt-5 ${isLoading ? "blur-[2px] pointer-events-none" : ""}`}
      >
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue, resetForm }) => (
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
                    // defaultValue={String(coverDetails?.noOfCovers) || "1"}
                    setFieldValue={setFieldValue}
                    setTabData={setTabData}
                    autoSelectActiveTab={autoSelectActiveTab}
                    tabsCover1={tabsCover1}
                    tabsCover2={tabsCover2}
                    tabsCover3={tabsCover3}
                    tabsCover4={tabsCover4}
                    differentData={applicationFullData?.tendering_type}
                    // disabled={applicationFullData?.tendering_type === "qcbs" &&  2}
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
