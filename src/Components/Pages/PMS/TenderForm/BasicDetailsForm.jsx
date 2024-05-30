import React from 'react'
import folder from '@/Components/assets/folder.svg'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomCheckboxGroup from "@/Components/Common/FormMolecules/CustomCheckboxGroup";


const BasicDetailsForm = () => {

  const formOfContract = [
    { label: "Open", value: "open" },
    { label: "Limited", value: "limited" },
    { label: "EOI", value:"eoi" },
    { label: "Auction", value:"auction" },
    { label: "Single", value:"single" },
  ];
  const validationSchema = Yup.object({
    checkboxes: Yup.object({
      gilad: Yup.boolean(),
      jason: Yup.boolean(),
      antoine: Yup.boolean(),
    }).test("at-least-two", "You must select exactly two options", (values) => {
      return Object.values(values).filter(Boolean).length === 2;
    }),
    // Additional form fields and their validation can go here
  });
  const initialValues = {
    checkboxes: {
      gilad: false,
      jason: false,
      antoine: false,
    },
    // Initial values for additional form fields can go here
  };

  return (
    <>
      <div className="bg-white rounded-md w-full shadow-md p-4">

      {/* Heading  */}
      <div className="bg-[#4338ca] text-white w-full rounded p-3 flex">
      <img src={folder} className='pl-2' />
        <h1 className='pt-1 pl-2 text-xl'>Basic Details</h1>
      </div>

      {/* Form Starting */}

      <div className="mt-5">
        
            <div class="p-4 mb-6 bg-white shadow-md border border-gray-200 rounded-md w-1/2">
              
              <div className="">
              <label for="default-input" class="block mb-2 text-sm font-medium text-gray-900">Tender Reference No <span className='text-red-500'>*</span></label>
              <input type="text" class="bg-gray-50 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"/>
              </div>

              <div className="">
              {/* <label for="default-input" class="block mb-2 text-sm font-medium text-gray-900">Tender Type<span className='text-red-500'>*</span></label> */}

                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    console.log("Form values", values);
                  }}
                >
                  {({ values, handleChange, errors, touched }) => (
                    <Form>
                      <CustomCheckboxGroup
                        fields={formOfContract}
                        title={"Tender Type"}
                        values={values.checkboxes}
                        handleChange={handleChange}
                        errors={errors.checkboxes}
                        touched={touched.checkboxes}
                      />
                      {/* <button type='submit'>Submit</button> */}
                    </Form>
                  )}
                </Formik>
              
              </div>

          </div>

      </div>


      </div>
    </>
  );
};

export default BasicDetailsForm;
