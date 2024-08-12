import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import RadioButtonsGroup from "@/Components/Common/FormMolecules/RadioButtonsGroup";
import { indianAmount } from "@/Components/Common/PowerupFunctions";
import ProjectApiList from "@/Components/api/ProjectApiList";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ApiHeader from "@/Components/api/ApiHeader";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import LoaderApi from "@/Components/Common/Loaders/LoaderApi";
import { contextVar } from "@/Components/context/contextVar";

const BiddingInitialForm = () => {
  const navigate = useNavigate();
  const context = useContext(contextVar);
  console.log(context, "===context");
  const [selectedOption, setSelectedOption] = useState("");
  const [emdPercentageValue, setEmdPercentageValue] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [pbgPercentageValue, setPbgPercentageValue] = useState();
  const { id } = useParams();

  const { api_postPreTenderDetails } = ProjectApiList();

  const allowResubmission = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];
  const initialValues = {
    estimated_amount: "",
    emd: "",
    emd_type: "percentage",
    emd_value: "",
    pbg_type: "percentage",
    // tendering_type:"",
    pbg_value: "",
    tenure: "",
    minSupplier: "",
    maxSupplier: "",
  };

  const validationSchema = Yup.object({
    estimated_amount: Yup.number()
      .required("Tender amount is required")
      .min(0, "Tender amount cannot be negative"),
    emd_value: Yup.number()
      .required("EMD amount is required")
      .min(0, "EMD amount cannot be negative"),
    pbg_value: Yup.number()
      .required("PBG Percentage is required")
      .min(0, "PBG Percentage  cannot be negative"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      createPreTenderInfo(values);
    },
  });

  const createPreTenderInfo = async (data) => {
    setIsLoading(true);
    // setIsLoading(true);
    data = { ...data, reference_no: id, tendering_type: selectedOption };

    AxiosInterceptors.post(api_postPreTenderDetails, data, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          toast.success(
            "Created Basic Pre Tender Form successfully. Can proceed for Pre-tendering"
          );
          // setShowMessaegModal(true);
          setTimeout(() => {
            // setIsLoading(false);
            navigate(`/boq-details-byId/${id}/inbox`);
          }, 2000);
        } else {
          // setIsLoading(false);
          toast.error("Error in Creating form.");
        }
      })
      .catch(function (error) {
        // setIsLoading(false);
        toast.error(error?.response?.data?.error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

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
    const result =
      (formik.values.emd_value / 100) * formik.values.estimated_amount;
    setEmdPercentageValue(result);
  };

  const totPercentagePbg = () => {
    const result =
      (formik.values.pbg_value / 100) * formik.values.estimated_amount;
    setPbgPercentageValue(result);
  };

  // console.log(emdPercentageValue)

  useEffect(() => {
    totPercentageEmd();
    totPercentagePbg();
  });

  return (
    <>
      {isLoading && <LoaderApi />}

      <div
        className={`container mx-auto bg-white rounded border border-blue-500 mt-10 shadow-xl p-6 mb-10 ${
          isLoading ? "blur-[2px]" : ""
        }`}
      >
        <div className='bg-[#4338ca] p-2 rounded-md px-6'>
          <h2 className='text-xl font-medium flex items-center gap-3 text-white'>
            Pre-Tendering Details{" "}
          </h2>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className='rounded-md border border-gray-200 bg-white p-6 mt-5 '>
            <div className='flex justify-between p-4'>
              <div className='flex-col'>
                <div>
                  <label
                    htmlFor='emd-description'
                    className='block font-semibold text-gray-700 mb-2'
                  >
                    EMD
                  </label>
                </div>
                <div>
                  <label
                    htmlFor='emd-description'
                    className='block font-medium text-gray-700 mb-2'
                  >
                    EMD Description
                  </label>
                </div>
              </div>
              <div className='flex  flex-1 justify-center ml-10  gap-4 '>
                <RadioButtonsGroup
                  className='flex justify-start'
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

            {/* Enter estimated_amount */}

            <div className='flex justify-between w-full p-2 px-4'>
              <div className='flex-col w-1/2'>
                <div>
                  <label
                    htmlFor='estimated_amount'
                    className='block font-semibold text-gray-700 mb-2'
                  >
                    Tender Estimated Amount
                  </label>
                </div>
                <div>
                  <label
                    htmlFor='estimated_amount'
                    className='block font-medium text-gray-700 mb-2'
                  >
                    Enter Tender Amount
                  </label>
                </div>
              </div>
              <div className='flex flex-col w-1/2 justify-end gap-4'>
                <div>
                  <input
                    id='estimated_amount'
                    name='estimated_amount'
                    placeholder='Enter Tender Amount'
                    type='number'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.estimated_amount}
                    className='rounded-md h-[50px] w-full border-2 p-4'
                  />
                </div>
                <div>
                  {formik.touched.estimated_amount &&
                  formik.errors.estimated_amount ? (
                    <div className='text-red-500 text-sm flex-col'>
                      {formik.errors.estimated_amount}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            {/*EMD Percentage or amount */}

            <div className='flex justify-between p-2 px-4'>
              <div className='flex-col w-1/2'>
                <div>
                  <label
                    htmlFor='estimated_amount'
                    className='block font-semibold text-gray-700 mb-2'
                  >
                    EMD Type
                  </label>
                </div>
                <div>
                  <label
                    htmlFor='estimated_amount'
                    className='block font-medium text-gray-700 mb-2'
                  >
                    Percentage or Fixed
                  </label>
                  <select
                    id='estimated_amount'
                    name='emd_type'
                    value={formik.values.emd_type}
                    onChange={formik.handleChange}
                    // value={selectedOptionPercantageAmt}
                    // onChange={handleOptionChange1}
                    className='rounded-md border-2 h-7'
                  >
                    <option value='percentage'>Percentage</option>
                    <option value='fixed'>Fixed Amount</option>
                  </select>
                </div>
              </div>
              <div className='flex flex-col w-1/2'>
                {formik.values.emd_type === "percentage" && (
                  <div className='flex justify-between w-full'>
                    <div className='w-[75%]'>
                      <div className='flex'>
                        <input
                          id='emd_value'
                          name='emd_value'
                          type='number'
                          placeholder='Enter Percantage %'
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.emd_value}
                          className='rounded-md w-full h-[50px] border-2 p-4'
                        />
                        <p className='text-xl pt-2 ml-2 mr-6'>%</p>
                      </div>

                      <div className='w-[10rem]'>
                        {formik.touched.emd_value && formik.errors.emd_value ? (
                          <div className='text-red-500 text-sm flex-col'>
                            {formik.errors.emd_value}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className='flex justify-center items-center'>
                      <div>
                        <p>{indianAmount(emdPercentageValue)}</p>
                      </div>
                    </div>
                  </div>
                )}
                {formik.values.emd_type === "fixed" && (
                  <div className=' w-full'>
                    <div>
                      <input
                        id='emd_value'
                        name='emd_value'
                        type='number'
                        placeholder='Enter fixed amount'
                        onChange={formik.handleChange}
                        // onChange={handlePbgChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.emd_value}
                        className='rounded-md h-[50px] border-2 p-4 w-full'
                      />
                    </div>
                    <div>
                      {formik.touched.emd_value && formik.errors.emd_value ? (
                        <div className='text-red-500 text-sm flex-col'>
                          {formik.errors.emd_value}
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/*PBG Percentage or amount */}

            <div className='flex justify-between p-2 px-4'>
              <div className='flex-col w-1/2'>
                <div>
                  <label
                    htmlFor='estimated_amount'
                    className='block font-semibold text-gray-700 mb-2'
                  >
                    PBG Amount
                  </label>
                </div>
                <div>
                  <label
                    htmlFor='estimated_amount'
                    className='block font-medium text-gray-700 mb-2'
                  >
                    Percentage or Fixed
                  </label>
                  <select
                    id='estimated_amount'
                    name='pbg_type'
                    value={formik.values.pbg_type}
                    onChange={formik.handleChange}
                    // value={selectedOptionPbgPercantageAmt}
                    // onChange={handleOptionChange2}
                    className='rounded-md border-2 h-7'
                  >
                    <option value='percentage'>Percentage</option>
                    <option value='fixed'>Fixed Amount</option>
                  </select>
                </div>
              </div>
              <div className='flex flex-col w-1/2'>
                {formik.values.pbg_type === "percentage" && (
                  <div className='flex justify-between w-full'>
                    <div className='w-[75%]'>
                      <div className='flex'>
                        <input
                          id='pbg_value'
                          name='pbg_value'
                          type='number'
                          placeholder='Enter Percantage %'
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.pbg_value}
                          className='rounded-md w-full h-[50px] border-2 p-4'
                        />
                        <p className='text-xl pt-2 ml-2 mr-6'>%</p>
                      </div>
                      <div>
                        {formik.touched.pbg_value && formik.errors.pbg_value ? (
                          <div className='text-red-500 text-sm flex-col'>
                            {formik.errors.pbg_value}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className='flex justify-center items-center'>
                      <p>{indianAmount(pbgPercentageValue)}</p>
                    </div>
                  </div>
                )}
                {formik.values.pbg_type === "fixed" && (
                  <div>
                    <div>
                      <input
                        id='pbg_value'
                        name='pbg_value'
                        type='number'
                        placeholder='Enter fixed amount'
                        onChange={formik.handleChange}
                        // onChange={handlePbgChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.pbg_value}
                        className='rounded-md h-[50px] border-2 p-4 w-full'
                      />
                    </div>
                    <div>
                      {formik.touched.pbg_value && formik.errors.pbg_value ? (
                        <div className='text-red-500 text-sm flex-col'>
                          {formik.errors.pbg_value}
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/*  */}

            <div className='flex justify-between p-2 px-4 w-full'>
              <div className='flex-col '>
                <div>
                  <label
                    htmlFor='estimated_amount'
                    className='block font-semibold text-gray-700 mb-2'
                  >
                    Tendering Type
                  </label>
                </div>
                <div>
                  <label
                    htmlFor='estimated_amount'
                    className='block font-medium text-gray-700 mb-2'
                    name='tendering_type'
                  >
                    Select Tendering Type
                  </label>
                </div>
              </div>
              <div className='w-1/2'>
                <select
                  value={selectedOption}
                  onChange={handleOptionChange}
                  className=' h-[50px] border-2 rounded-md p-2 w-full'
                >
                  <option value=''>---- select -----</option>
                  <option value='least_cost'>Least Cost</option>
                  <option value='qcbs'>QCBS</option>
                  <option value='rate_contract'>Rate Contract</option>
                </select>
              </div>
            </div>
          </div>

          {selectedOption === "rate_contract" && (
            <div className='flex  gap-4 rounded-md border border-gray-200 bg-white  mt-5 p-8'>
              <div className='flex justify-between w-full px-6'>
                <div className='flex flex-col'>
                  <div>
                    {" "}
                    <label
                      htmlFor='estimated_amount'
                      className='block font-medium text-gray-700 mb-2 '
                    >
                      Tenure
                    </label>
                  </div>
                  <div>
                    {" "}
                    <input
                      id='tenure'
                      type='text'
                      name='tenure'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.tenure}
                      placeholder='Please Write Tenure year'
                      className='border flex-col rounded-md p-2'
                    />
                  </div>
                  <div>
                    {formik.touched.tenure && formik.errors.tenure ? (
                      <div className='text-red-500 text-sm flex-col'>
                        {formik.errors.tenure}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className='flex flex-col'>
                  <div>
                    {" "}
                    <label
                      htmlFor='estimated_amount'
                      className='block font-medium text-gray-700 mb-2'
                    >
                      Minimum Supplier’s/ services Provider
                    </label>
                  </div>
                  <div>
                    {" "}
                    <input
                      id='minSupplier'
                      type='text'
                      name='minSupplier'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.minSupplier}
                      placeholder='Input Box 1'
                      className='border flex-col rounded-md p-2'
                    />
                  </div>
                  <div>
                    {formik.touched.minSupplier && formik.errors.minSupplier ? (
                      <div className='text-red-500 text-sm flex-col'>
                        {formik.errors.minSupplier}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className='flex flex-col'>
                  <div>
                    {" "}
                    <label
                      htmlFor='estimated_amount'
                      className='block font-medium text-gray-700 mb-2'
                    >
                      Maximum Supplier’s/ services Provider
                    </label>
                  </div>
                  <div>
                    {" "}
                    <input
                      id='maxSupplier'
                      type='text'
                      name='maxSupplier'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.maxSupplier}
                      placeholder='Input Box 1'
                      className='border flex-col rounded-md p-2'
                    />
                  </div>
                  <div>
                    {formik.touched.maxSupplier && formik.errors.maxSupplier ? (
                      <div className='text-red-500 text-sm flex-col'>
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
          <div className='flex justify-end mt-4 gap-4'>
            <button
              type='button'
              className='border border-[#4338ca] hover:bg-[#4338ca] hover:text-white px-10 py-2 rounded mb-5'
              onClick={() => {
                // Add cancel functionality here
              }}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='border border-[#4338ca] bg-[#4338ca] hover:bg-[#342b96] text-white px-10 py-2 rounded mb-5'
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
