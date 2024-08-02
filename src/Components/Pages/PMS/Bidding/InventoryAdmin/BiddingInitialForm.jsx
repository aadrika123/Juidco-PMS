import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import RadioButtonsGroup from "@/Components/Common/FormMolecules/RadioButtonsGroup";

const BiddingInitialForm = () => {
  const [totalAmountAfterDeduction, setTotalAmountAfterDeduction] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
    const [selectedOptionPercantageAmt, setselectedOptionPercantageAmt] =
    useState("percentage");
  
  const [selectedOptionPbgPercantageAmt, setselectedOptionPbgPercantageAmt] =
    useState("percentage");


  const allowResubmission = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];

  const formik = useFormik({
    initialValues: {
      tenderAmount: "",
      allow_resubmission: "",
      emdAmount: "",
      emdPercentage: "",
      pbgAmount: "",
      pbgPercentage: "",
      tenure: "",
      minSupplier: "",
      maxSupplier: "",
    },
    // validationSchema: Yup.object({
    //   tenderAmount: Yup.number()
    //     .required("Tender amount is required")
    //     .min(0, "Tender amount cannot be negative"),
    //   emdAmount: Yup.number()
    //     .required("EMD amount is required")
    //     .min(0, "EMD amount cannot be negative"),
    //   emdPercentage: Yup.number()
    //     .required("EMD Percantage is required")
    //     .min(0, "EMD Percantage cannot be negative"),
    //   pbgAmount: Yup.number()
    //     .required("PBG amount is required")
    //     .min(0, "PBG amount cannot be negative"),
    //   pbgPercentage: Yup.number()
    //     .required("PBG Percentage is required")
    //     .min(0, "PBG Percentage  cannot be negative"),
    //   tenure: Yup.number()
    //     .required("Tenure  is required")
    //     .min(0, "Tenure  cannot be negative"),
    //   minSupplier: Yup.number()
    //     .required("Minimum Supplier’s/ services Provider  is required")
    //     .min(0, "Minimum Supplier’s/ services Provider  cannot be negative"),
    //   maxSupplier: Yup.number()
    //     .required("Maximum Supplier’s/ services Provider is required")
    //     .min(0, "Maximum Supplier’s/ services Provider  cannot be negative"),
    // }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleOptionChange1 = (event) => {
    setselectedOptionPercantageAmt(event.target.value);
  };
  const handleOptionChange2 = (event) => {
    setselectedOptionPbgPercantageAmt(event.target.value);
  };



  const handleEmdChange = (e) => {
    const { name, value } = e.target;
    if (name === "emdAmount" && value !== "") {
      const percentage = (value / formik.values.tenderAmount) * 100;
      formik.setFieldValue("emdPercentage", percentage);
    } else if (name === "emdPercentage" && value !== "") {
      const amount = (value * formik.values.tenderAmount) / 100;
      formik.setFieldValue("emdAmount", String(amount));
    }
    formik.setFieldValue(name, value);
  };

  const handlePbgChange = (e) => {
    const { name, value } = e.target;
    if (name === "pbgAmount" && value !== "") {
      const percentage = (value / formik.values.tenderAmount) * 100;
      formik.setFieldValue("pbgPercentage", percentage);
    } else if (name === "pbgPercentage" && value !== "") {
      const amount = (value * formik.values.tenderAmount) / 100;
      formik.setFieldValue("pbgAmount", String(amount));
    }
    formik.setFieldValue(name, value);
  };

  useEffect(() => {
    const emdAmount = formik.values.emdAmount || 0;
    const pbgAmount = formik.values.pbgAmount || 0;
    const tenderAmount = formik.values.tenderAmount || 0;
    const totalDeduction = parseFloat(emdAmount) + parseFloat(pbgAmount);
    setTotalAmountAfterDeduction(tenderAmount - totalDeduction);
  }, [
    formik.values.emdAmount,
    formik.values.pbgAmount,
    formik.values.tenderAmount,
  ]);

  return (
    <>
      <div>
        <div className="bg-[#4338ca] p-2 rounded-md px-6">
          <h2 className="text-xl font-medium flex items-center gap-3 text-white">
            Pre-Tendering Details{" "}
          </h2>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="rounded-md border border-gray-200 bg-white p-8 mt-5">
            <div className="flex justify-between mr-8 m-8">
              <div className="flex-col">
                <div>
                  <label
                    htmlFor="emd-description"
                    className="block font-semibold text-gray-700 mb-2"
                  >
                    EMD
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="emd-description"
                    className="block font-medium text-gray-700 mb-2"
                  >
                    EMD Description
                  </label>
                </div>
              </div>
              <div className="flex  flex-1 justify-center ml-96 gap-4 ">
                <RadioButtonsGroup
                  className="flex justify-start"
                  fields={allowResubmission}
                  title={"EMD"}
                  name={"allow_resubmission"}
                  values={formik.values.allow_resubmission}
                  handleChange={formik.handleChange}
                  setFieldValue={formik.setFieldValue}
                  // errors={errors.allow_resubmission}
                  // touched={touched.allow_resubmission}
                />
              </div>
            </div>

            {/* Enter tenderAmount */}

            <div className="flex justify-between mr-8 m-8">
              <div className="flex-col">
                <div>
                  <label
                    htmlFor="tenderAmount"
                    className="block font-semibold text-gray-700 mb-2"
                  >
                    Tender Estimated Amount
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="tenderAmount"
                    className="block font-medium text-gray-700 mb-2"
                  >
                    Enter Tender Amount
                  </label>
                </div>
              </div>
              <div className="flex flex-col justify-end gap-4">
                <div>
                  <input
                    id="tenderAmount"
                    name="tenderAmount"
                    placeholder="Enter Tender Amount"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.tenderAmount}
                    className="rounded-md w-[515px] h-[50px] border-2 p-4"
                  />
                </div>
                <div>
                  {formik.touched.tenderAmount && formik.errors.tenderAmount ? (
                    <div className="text-red-500 text-sm flex-col">
                      {formik.errors.tenderAmount}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            {/*EMD Percentage or amount */}

            <div className="flex justify-between mr-8 m-8">
              <div className="flex-col">
                <div>
                  <label
                    htmlFor="tenderAmount"
                    className="block font-semibold text-gray-700 mb-2"
                  >
                    EMD Type
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="tenderAmount"
                    className="block font-medium text-gray-700 mb-2"
                  >
                    Percentage or Fixed
                  </label>
                  <select
                    id="tenderAmount"
                    value={selectedOptionPercantageAmt}
                    onChange={handleOptionChange1}
                    className="rounded-md border-2 h-7"
                  >
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col justify-end gap-4">
                {selectedOptionPercantageAmt === "percentage" && (
                  <div className="flex flex-row gap-1">
                    <div>
                      <div>
                        <input
                          id="emdPercentage"
                          name="emdPercentage"
                          type="number"
                          placeholder="Enter Percantage %"
                          onChange={handleEmdChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.emdPercentage}
                          className="rounded-md w-[257px] h-[50px] border-2 p-4"
                        />
                      </div>
                      <div>
                        {formik.touched.emdPercentage &&
                        formik.errors.emdPercentage ? (
                          <div className="text-red-500 text-sm flex-col">
                            {formik.errors.emdPercentage}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div>
                      <div>
                        <input
                          id="emdPercentageAmount"
                          name="emdPercentageAmount"
                          type="number"
                          placeholder="Percentage Amount"
                          onChange={handleEmdChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.emdAmount}
                          disabled
                          className="rounded-md w-[257px] h-[50px] border-2 p-4"
                        />
                      </div>
                      <div>
                        {formik.touched.emdAmount && formik.errors.emdAmount ? (
                          <div className="text-red-500 text-sm flex-col">
                            {formik.errors.emdAmount}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                )}
                {selectedOptionPercantageAmt === "fixed" && (
                  <div>
                    <div>
                      <input
                        id="emdAmount"
                        name="emdAmount"
                        type="number"
                        placeholder="Enter fixed amount"
                        onChange={handlePbgChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.emdAmount}
                        className="rounded-md w-[515px] h-[50px] border-2 p-4"
                      />
                    </div>
                    <div>
                      {formik.touched.emdAmount && formik.errors.emdAmount ? (
                        <div className="text-red-500 text-sm flex-col">
                          {formik.errors.emdAmount}
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/*PBG Percentage or amount */}

            <div className="flex justify-between mr-8 m-8">
              <div className="flex-col">
                <div>
                  <label
                    htmlFor="tenderAmount"
                    className="block font-semibold text-gray-700 mb-2"
                  >
                    PBG Amount
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="tenderAmount"
                    className="block font-medium text-gray-700 mb-2"
                  >
                    Percentage or Fixed
                  </label>
                  <select
                    id="tenderAmount"
                    value={selectedOptionPbgPercantageAmt}
                    onChange={handleOptionChange2}
                    className="rounded-md border-2 h-7"
                  >
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col justify-end gap-4">
                {selectedOptionPbgPercantageAmt === "percentage" && (
                  <div className="flex flex-row gap-1">
                    <div>
                      <div>
                        <input
                          id="pbgPercentage"
                          name="pbgPercentage"
                          type="number"
                          placeholder="Enter Percantage %"
                          onChange={handlePbgChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.pbgPercentage}
                          className="rounded-md w-[257px] h-[50px] border-2 p-4"
                        />
                      </div>
                      <div>
                        {formik.touched.pbgPercentage &&
                        formik.errors.pbgPercentage ? (
                          <div className="text-red-500 text-sm flex-col">
                            {formik.errors.pbgPercentage}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div>
                      <div>
                        <input
                          id="pbgAmount"
                          name="pbgAmount"
                          type="number"
                          placeholder="Percentage Amount"
                          onChange={handlePbgChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.pbgAmount}
                          disabled
                          className="rounded-md w-[257px] h-[50px] border-2 p-4"
                        />
                      </div>
                      <div>
                        {formik.touched.pbgAmount && formik.errors.pbgAmount ? (
                          <div className="text-red-500 text-sm flex-col">
                            {formik.errors.pbgAmount}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                )}
                {selectedOptionPbgPercantageAmt === "fixed" && (
                  <div>
                    <div>
                      <input
                        id="pbgAmount"
                        name="pbgAmount"
                        type="number"
                        placeholder="Enter fixed amount"
                        onChange={handlePbgChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.pbgAmount}
                        className="rounded-md w-[515px] h-[50px] border-2 p-4"
                      />
                    </div>
                    <div>
                      {formik.touched.pbgAmount && formik.errors.pbgAmount ? (
                        <div className="text-red-500 text-sm flex-col">
                          {formik.errors.pbgAmount}
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/*  */}
            <div className="flex justify-between mr-8 m-8">
              <div className="flex-col">
                <div>
                  <label
                    htmlFor="tenderAmount"
                    className="block font-semibold text-gray-700 mb-2"
                  >
                    Tendering Type
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="tenderAmount"
                    className="block font-medium text-gray-700 mb-2"
                  >
                    Select Tendering Type
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <select
                  value={selectedOption}
                  onChange={handleOptionChange}
                  className="w-[515px] h-[50px] border-2 rounded-md p-2"
                >
                  <option value="">
                    ---- select ----- 
                  </option>
                  <option value="leastCost">Least Cost</option>
                  <option value="qcbs">QCBS</option>
                  <option value="rateContract">Rate Contract</option>
                </select>
              </div>
            </div>
          </div>

          {selectedOption === "rateContract" && (
            <div className="flex  gap-4 rounded-md border border-gray-200 bg-white  mt-5 p-8">
              <div className="flex justify-between w-full px-6">
                <div className="flex flex-col">
                  <div>
                    {" "}
                    <label
                      htmlFor="tenderAmount"
                      className="block font-medium text-gray-700 mb-2 "
                    >
                      Tenure
                    </label>
                  </div>
                  <div>
                    {" "}
                    <input
                      id="tenure"
                      type="text"
                      name="tenure"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.tenure}
                      placeholder="Please Write Tenure year"
                      className="border flex-col rounded-md p-2"
                    />
                  </div>
                  <div>
                    {formik.touched.tenure && formik.errors.tenure ? (
                      <div className="text-red-500 text-sm flex-col">
                        {formik.errors.tenure}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="flex flex-col">
                  <div>
                    {" "}
                    <label
                      htmlFor="tenderAmount"
                      className="block font-medium text-gray-700 mb-2"
                    >
                      Minimum Supplier’s/ services Provider
                    </label>
                  </div>
                  <div>
                    {" "}
                    <input
                      id="minSupplier"
                      type="text"
                      name="minSupplier"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.minSupplier}
                      placeholder="Input Box 1"
                      className="border flex-col rounded-md p-2"
                    />
                  </div>
                  <div>
                    {formik.touched.minSupplier && formik.errors.minSupplier ? (
                      <div className="text-red-500 text-sm flex-col">
                        {formik.errors.minSupplier}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div>
                    {" "}
                    <label
                      htmlFor="tenderAmount"
                      className="block font-medium text-gray-700 mb-2"
                    >
                      Maximum Supplier’s/ services Provider
                    </label>
                  </div>
                  <div>
                    {" "}
                    <input
                      id="maxSupplier"
                      type="text"
                      name="maxSupplier"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.maxSupplier}
                      placeholder="Input Box 1"
                      className="border flex-col rounded-md p-2"
                    />
                  </div>
                  <div>
                    {formik.touched.maxSupplier && formik.errors.maxSupplier ? (
                      <div className="text-red-500 text-sm flex-col">
                        {formik.errors.maxSupplier}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Total Amount After Deduction */}
          {/* <div className="flex justify-between mr-8 m-8">
            <div className="flex-col">
              <div>
                <label
                  htmlFor="totalAmountAfterDeduction"
                  className="block font-semibold text-gray-700 mb-2"
                >
                  Total Amount After Deduction
                </label>
              </div>
              <div>
                <label
                  htmlFor="totalAmountAfterDeduction"
                  className="block font-medium text-gray-700 mb-2"
                >
                  Total Amount After Deduction
                </label>
              </div>
            </div>
            <div className="flex flex-col justify-end gap-4">
              <div>
                <input
                  id="totalAmountAfterDeduction"
                  name="totalAmountAfterDeduction"
                  type="number"
                  readOnly
                  value={totalAmountAfterDeduction}
                  className="rounded-md w-[515px] h-[50px] border-2"
                />
              </div>
            </div>
          </div> */}

          {/* submit */}
          <div className="flex justify-end mt-4 gap-4">
            <button
              type="button"
              className="border border-[#4338ca] hover:bg-[#4338ca] hover:text-white px-10 py-2 rounded mb-5"
              onClick={() => {
                // Add cancel functionality here
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="border border-[#4338ca] bg-[#4338ca] hover:bg-[#342b96] text-white px-10 py-2 rounded mb-5"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BiddingInitialForm;
