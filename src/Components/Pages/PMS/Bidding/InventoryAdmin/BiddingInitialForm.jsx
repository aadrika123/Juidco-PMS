import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import RadioButtonsGroup from "@/Components/Common/FormMolecules/RadioButtonsGroup";
import { indianAmount } from "@/Components/Common/PowerupFunctions";

const BiddingInitialForm = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [emdPercentageValue, setEmdPercentageValue] = useState();
  const [pbgPercentageValue, setPbgPercentageValue] = useState();

  const allowResubmission = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];

  const formik = useFormik({
    initialValues: {
      tenderAmount: "",
      emd: "",
      emd_type: "percentage",
      emd_value: "",
      pbg_type: "percentage",
      pbg_value: "",
      tenure: "",
      minSupplier: "",
      maxSupplier: "",
    },
    // validationSchema: Yup.object({
    //   tenderAmount: Yup.number()
    //     .required("Tender amount is required")
    //     .min(0, "Tender amount cannot be negative"),
    //   emd_value: Yup.number()
    //     .required("EMD amount is required")
    //     .min(0, "EMD amount cannot be negative"),
    //   emd_value: Yup.number()
    //     .required("EMD Percantage is required")
    //     .min(0, "EMD Percantage cannot be negative"),
    //   pbg_value: Yup.number()
    //     .required("PBG amount is required")
    //     .min(0, "PBG amount cannot be negative"),
    //   pbg_value: Yup.number()
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

  // calculating Tot Percentages

  const totPercentageEmd = () => {
    const result = (formik.values.emd_value / 100) * formik.values.tenderAmount;
    setEmdPercentageValue(result);
  };

  const totPercentagePbg = () => {
    const result = (formik.values.pbg_value / 100) * formik.values.tenderAmount;
    setPbgPercentageValue(result);
  };

  // console.log(emdPercentageValue)

  useEffect(() => {
    totPercentageEmd();
    totPercentagePbg();
  });

  return (
    <>
      <div>
        <div className="bg-[#4338ca] p-2 rounded-md px-6">
          <h2 className="text-xl font-medium flex items-center gap-3 text-white">
            Pre-Tendering Details{" "}
          </h2>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="rounded-md border border-gray-200 bg-white p-4 mt-5">
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
              <div className="flex  flex-1 justify-center ml-10  gap-4 ">
                <RadioButtonsGroup
                  className="flex justify-start"
                  fields={allowResubmission}
                  title={"EMD"}
                  name={"emd"}
                  values={formik.values.emd}
                  handleChange={formik.handleChange}
                  setFieldValue={formik.setFieldValue}
                  // errors={errors.emd}
                  // touched={touched.emd}
                />
              </div>
            </div>

            {/* Enter tenderAmount */}

            <div className="flex justify-between w-full p-2 px-4">
              <div className="flex-col w-1/2">
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
              <div className="flex flex-col w-1/2 justify-end gap-4">
                <div>
                  <input
                    id="tenderAmount"
                    name="tenderAmount"
                    placeholder="Enter Tender Amount"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.tenderAmount}
                    className="rounded-md h-[50px] w-full border-2 p-4"
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

            <div className="flex justify-between p-2 px-4">
              <div className="flex-col w-1/2">
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
                    name="emd_type"
                    value={formik.values.emd_type}
                    onChange={formik.handleChange}
                    // value={selectedOptionPercantageAmt}
                    // onChange={handleOptionChange1}
                    className="rounded-md border-2 h-7"
                  >
                    <option value="percentage">Percentage</option>
                    <option value="fixed_amount">Fixed Amount</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col w-1/2">
                {formik.values.emd_type === "percentage" && (
                  <div className="flex justify-between w-full">
                    <div className="w-[75%]">
                      <div className="flex">
                        <input
                          id="emd_value"
                          name="emd_value"
                          type="number"
                          placeholder="Enter Percantage %"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.emd_value}
                          className="rounded-md w-full h-[50px] border-2 p-4"
                        />
                        <p className="text-xl pt-2 ml-2 mr-6">%</p>
                      </div>

                      <div className="w-[10rem]">
                        {formik.touched.emd_value && formik.errors.emd_value ? (
                          <div className="text-red-500 text-sm flex-col">
                            {formik.errors.emd_value}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex justify-center items-center">
                      <div>
                        <p>{indianAmount(emdPercentageValue)}</p>
                      </div>
                      
                    </div>
                  </div>
                )}
                {formik.values.emd_type === "fixed_amount" && (
                  <div className=" w-full">
                    <div>
                      <input
                        id="emd_value"
                        name="emd_value"
                        type="number"
                        placeholder="Enter fixed amount"
                        onChange={formik.handleChange}
                        // onChange={handlePbgChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.emd_value}
                        className="rounded-md h-[50px] border-2 p-4 w-full"
                      />
                    </div>
                    <div>
                      {formik.touched.emd_value && formik.errors.emd_value ? (
                        <div className="text-red-500 text-sm flex-col">
                          {formik.errors.emd_value}
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/*PBG Percentage or amount */}

            <div className="flex justify-between p-2 px-4">
              <div className="flex-col w-1/2">
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
                    name="pbg_type"
                    value={formik.values.pbg_type}
                    onChange={formik.handleChange}
                    // value={selectedOptionPbgPercantageAmt}
                    // onChange={handleOptionChange2}
                    className="rounded-md border-2 h-7"
                  >
                    <option value="percentage">Percentage</option>
                    <option value="fixed_amount">Fixed Amount</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col w-1/2">
                {formik.values.pbg_type === "percentage" && (
                  <div className="flex justify-between w-full">
                    <div className="w-[75%]">
                      <div className="flex">
                        <input
                          id="pbg_value"
                          name="pbg_value"
                          type="number"
                          placeholder="Enter Percantage %"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.pbg_value}
                          className="rounded-md w-full h-[50px] border-2 p-4"
                        />
                        <p className="text-xl pt-2 ml-2 mr-6">%</p>
                      </div>
                      <div>
                        {formik.touched.pbg_value && formik.errors.pbg_value ? (
                          <div className="text-red-500 text-sm flex-col">
                            {formik.errors.pbg_value}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  
                      <div className="flex justify-center items-center">
                        <p>{indianAmount(pbgPercentageValue)}</p>
                      </div>
                      
                    
                  </div>
                )}
                {formik.values.pbg_type === "fixed_amount" && (
                  <div>
                    <div>
                      <input
                        id="pbg_value"
                        name="pbg_value"
                        type="number"
                        placeholder="Enter fixed amount"
                        onChange={formik.handleChange}
                        // onChange={handlePbgChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.pbg_value}
                        className="rounded-md h-[50px] border-2 p-4 w-full"
                      />
                    </div>
                    <div>
                      {formik.touched.pbg_value && formik.errors.pbg_value ? (
                        <div className="text-red-500 text-sm flex-col">
                          {formik.errors.pbg_value}
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/*  */}

            <div className="flex justify-between p-2 px-4 w-full">
              <div className="flex-col ">
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
              <div className="w-1/2">
                <select
                  value={selectedOption}
                  onChange={handleOptionChange}
                  className=" h-[50px] border-2 rounded-md p-2 w-full"
                >
                  <option value="">---- select -----</option>
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
