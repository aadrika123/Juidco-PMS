import React, { useRef, useState } from "react";
import folder from "@/Components/assets/folder.svg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomCheckboxGroup from "@/Components/Common/FormMolecules/CustomCheckboxGroup";
import RadioButtonsGroup from "@/Components/Common/FormMolecules/RadioButtonsGroup";
import toast from "react-hot-toast";


const WorkDetailsForm = () => {
    const inputFileRef = useRef();

  const [selectedTab, setSelectedTab] = useState("online");
  const [preview, setPreview] = useState();
  const [imageDoc, setImageDoc] = useState();

  const handleTabChange = (event) => {
    setSelectedTab(event.target.value);
  };

  const handleUploadDoc = () => {
    inputFileRef.current.click();
  };

  //image validation with file type and size limit
  const imageHandler = (e) => {
    const validExtensions = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ];

    const maxSizeInBytes = 2 * 1024 * 1024; // 2MB in bytes

    const file = e.target.files[0];
    if (!file) {
      return toast.error("No File Selected");
    }

    // Check the file type
    if (!validExtensions.includes(file.type)) {
      toast.error(
        "Invalid file type. Please select a JPG, JPEG, PNG or PDF file."
      );
      e.target.value = ""; // Clear the input
      return;
    }

    // Check the file size
    if (file.size > maxSizeInBytes) {
      toast.error("File size exceeds 2MB. Please select a smaller file.");
      e.target.value = ""; // Clear the input
      return;
    }

    if (file) {
      console.log(file.size, "=========file size");
      // props?.setImageDoc(file);
      console.log(file, "==========file");
      setPreview(URL.createObjectURL(file));
    }
  };

  const tenderType = [
    { label: "Open", value: "open" },
    { label: "Limited", value: "limited" },
    { label: "EOI", value: "eoi" },
    { label: "Auction", value: "auction" },
    { label: "Single", value: "single" },
  ];

  const formOfContract = [
    { label: "Work Contract", value: "work_contract" },
    { label: "Auction", value: "auction" },
    { label: "Service Contract", value: "service_contract" },
    { label: "Buy", value: "buy" },
    { label: "Sell", value: "sell" },
    { label: "Empanelment", value: "empanelment" },
    { label: "Buy & Service", value: "buy_service" },
  ];

  const noOfCovers = [
    { label: "1", value: "one" },
    { label: "2", value: "two" },
    { label: "3", value: "three" },
    { label: "4", value: "four" },
  ];

  const tenderCategory = [
    { label: "Goods", value: "goods" },
    { label: "Works", value: "works" },
    { label: "Services", value: "services" },
  ];

  const allowResubmission = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];
  const allowWithdrawl = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];
  const allowOfflineSubmission = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];

  const paymentMode = [
    { label: "Online", value: "online" },
    { label: "offline", value: "offline" },
  ];
  const offlineBanks = [
    { label: "SS-Small Saving Instrument", value: "ss" },
    { label: "BG-Bank Guarantee", value: "bg" },
    { label: "BC-Bankers Cheque", value: "bc" },
    { label: "DD-Demand Draft", value: "dd" },
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
    <div>
      Work sd
    </div>
  )
}

export default WorkDetailsForm
