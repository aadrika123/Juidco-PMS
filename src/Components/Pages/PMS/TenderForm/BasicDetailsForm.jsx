import RadioButtonsGroup from "@/Components/Common/FormMolecules/RadioButtonsGroup";
import React from "react";

const BasicDetailsForm = () => {
  const fields = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
  ];
  return (
    <>
      <RadioButtonsGroup fields={fields} title={"No of Covers"} />
    </>
  );
};

export default BasicDetailsForm;
