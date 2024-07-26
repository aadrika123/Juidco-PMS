import RadioButtonsGroup from "@/Components/Common/FormMolecules/RadioButtonsGroup";
import React from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import icon from "@/Components/assets/FeaturedIcon.svg";
import { Description } from "@mui/icons-material";
import TenderFormButton from "@/Components/Common/TenderFormButton/TenderFormButton";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";


const BiddingDetailForm = () => {

    const navigate = useNavigate();

  const emdConfirmation = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];

  const transc = [
    { label: "Online", value: "online" },
    { label: "Offline", value: "offline" },
  ];

  const transcMode = [
    { label: "Cash", value: "cash" },
    { label: "DD", value: "dd" },
  ];

  const creteriaAcc = [
    { creteria: "creteria 1", description: "description 1" },
    { creteria: "creteria 2", description: "description 2" },
    { creteria: "creteria 3", description: "description 3" },
  ];

  const initialValues = {
    bidderName: '',
    panNo: '',
    gstNo: '',
    address: '',
    bankName: '',
    bankAccNo: '',
    ifscCode: '',
    // 
    emd_conf: '',
    tranc_mode: '',
    ddNumber: '',
    transaction: '',
        
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={(values, { resetForm }) => {
            console.log(values)
            navigate(`/bidding-details?tabNo=${2}`);
          
        }}
      >
        {({
          values,
          handleChange,
          errors,
          touched,
          resetForm,
          setFieldValue,
        }) => (
          <Form>
            <>
              <div className="p-7 mb-6 bg-white shadow-xl border border-gray-200 rounded-md grid grid-cols-2">
                <div className="">
                  <label
                    for="default-input"
                    className={`block mb-2 text-sm font-medium text-gray-900`}
                  >
                    Bidder Name
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2.5 "
                    placeholder="Bidder Name"
                    name="bidderName"
                    onChange={handleChange}
                    value={values.bidderName}
                  />
                </div>

                <div className="">
                  <label
                    for="default-input"
                    className={`block mb-2 text-sm font-medium text-gray-900 `}
                  >
                    PAN No
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2.5"
                    placeholder="PAN No"
                    name="panNo"
                    onChange={handleChange}
                    value={values.panNo}
                  />
                </div>

                <div className="">
                  <label
                    for="default-input"
                    className={`block mb-2 text-sm font-medium text-gray-900 mt-5 `}
                  >
                    GST No
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2.5"
                    placeholder="GST No"
                    name="gstNo"
                    onChange={handleChange}
                    value={values.gstNo}
                  />
                </div>

                <div className="">
                  <label
                    for="default-input"
                    className={`block mb-2 text-sm font-medium text-gray-900 mt-5 `}
                  >
                    Address
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2.5"
                    placeholder="Address"
                    name="address"
                    onChange={handleChange}
                    value={values.address}
                  />
                </div>

                <div className="">
                  <label
                    for="default-input"
                    className={`block mb-2 text-sm font-medium text-gray-900 mt-5 `}
                  >
                    Bank Name
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2.5"
                    placeholder="Bank Name"
                    name="bankName"
                    onChange={handleChange}
                    value={values.bankName}
                  />
                </div>

                <div className="">
                  <label
                    for="default-input"
                    className={`block mb-2 text-sm font-medium text-gray-900 mt-5`}
                  >
                    Bank Account No
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2.5"
                    placeholder="Bank Account No"
                    name="bankAccNo"
                    onChange={handleChange}
                    value={values.bankAccNo}
                  />
                </div>

                <div className="">
                  <label
                    for="default-input"
                    className={`block mb-2 text-sm font-medium text-gray-900 mt-5`}
                  >
                    IFSC Code
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2.5"
                    placeholder="IFSC Code"
                    name="ifscCode"
                    onChange={handleChange}
                    value={values.ifscCode}
                  />
                </div>
              </div>

              <div className="p-7 mb-6 bg-white shadow-xl border border-gray-200 rounded-md flex justify-between">
                <div className="border-r-2">
                  <RadioButtonsGroup
                    fields={emdConfirmation}
                    title={"EMD"}
                    name={"emd_conf"}
                    values={values.emd_conf}
                    handleChange={handleChange}
                    errors={errors.emd_conf}
                    touched={touched.emd_conf}
                    setFieldValue={setFieldValue}
                    // defaultValue={"yes"}
                  />
                </div>

                <div className="border-r-2">
                  <RadioButtonsGroup
                    fields={transc}
                    title={"Transaction Mode"}
                    name={"tranc_mode"}
                    values={values.tranc_mode}
                    handleChange={handleChange}
                    errors={errors.tranc_mode}
                    touched={touched.tranc_mode}
                    setFieldValue={setFieldValue}
                    // defaultValue={"yes"}
                  />
                </div>

                <div className="border-r-2">
                  <RadioButtonsGroup
                    fields={transcMode}
                    title={"Transaction"}
                    name={"transaction"}
                    values={values.transaction}
                    handleChange={handleChange}
                    errors={errors.transaction}
                    touched={touched.transaction}
                    setFieldValue={setFieldValue}
                    // defaultValue={"yes"}
                  />
                </div>

                <div className="border-r-2 w-[30%]">
                  <label
                    for="default-input"
                    className={`block mb-2 text-sm font-medium text-gray-900`}
                  >
                    DD Number
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2.5 "
                    placeholder="DD Nuber"
                    name="ddNumber"
                    onChange={handleChange}
                    value={values.ddNumber}
                  />
                </div>

                <div className="">
                  <div className="">
                    <h1
                      className={`block mb-2 text-sm font-medium text-gray-900`}
                    >
                      Upload Referance Document
                    </h1>
                  </div>
                  <div className="">
                    <button className="bg-[#4338ca] px-4 py-2 text-white rounded-md text-xs">
                      Upload Documment
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 ">
                <Accordion defaultExpanded>
                  <AccordionSummary
                    style={{
                      backgroundColor: "#4338CA",
                      color: "white",
                      borderRadius: "5px",
                    }}
                    expandIcon={<ExpandMoreIcon className="text-white" />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    Criteria for Technical Comparison
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="relative overflow-x-auto">
                      {creteriaAcc.map((data) => (
                        <div className="border border-gray-300 rounded-xl flex m-5">
                          <div className="w-[7%] flex items-center">
                            <img
                              src={icon}
                              alt=""
                              className="max-w-none h-10 ml-5"
                            />
                          </div>

                          <div className="p-3 w-[75%]">
                            <div className="flex space-x-[6.2rem]">
                              <h1 className=" text-base">{data.creteria} </h1>
                            </div>
                            <div className="flex space-x-[5rem]">
                              <h1 className=" text-sm">{data.description} </h1>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end mr-8">
                      <div className="flex flex-col">
                        <h1
                          className={`block mb-2 text-sm font-medium text-gray-900`}
                        >
                          Upload Referance Document
                        </h1>
                        <button className="bg-[#4338ca] px-6 py-2 text-white rounded-md text-xs hover:bg-[#5b4df1]">
                          Upload Documment
                        </button>
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>

              <TenderFormButton
                resetForm={"resetForm"}
                getDetailData={"basicDetailData"}
                // loading={isLoading}
              />
            </>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default BiddingDetailForm;
