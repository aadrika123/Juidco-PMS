//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash Alam
//    Version - 1.0
//    Date - 25/05/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - ServiceRequestModal
//    DESCRIPTION - ServiceRequestModal
//////////////////////////////////////////////////////////////////////////////////////

import { useNavigate } from "react-router-dom";
import cancel from "@/Components/assets/cancel.svg";
import ThemeStyle from "@/Components/Common/ThemeStyle";
import { useState } from "react";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ApiHeader from "@/Components/api/ApiHeader";
import ProjectApiList from "@/Components/api/ProjectApiList";
import toast from "react-hot-toast";

import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

// //////////////////////////////////

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function ServiceRequestModal(props) {
  const [invtId, setInvtId] = useState();

  const [serialNo, setserialNo] = React.useState([]);

 

  const { inputStyle, labelStyle, headingStyle, formStyle } = ThemeStyle();
  let buttonStyle2 =
    " mr-2 pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-white text-sm sm:text-sm leading-tight rounded  hover:bg-white  hover:text-indigo-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl bg-indigo-700";

  const { api_postWarrantyClaim } = ProjectApiList();

  const serviceRequestHandler = () => {
    let body = {
      products: [{ serial_no: serialNo }],
      service: props?.service,
      stock_handover_no: props?.stockHandNo,
      inventoryId: invtId,
    };

    AxiosInterceptors.post(`${api_postWarrantyClaim}`, body, ApiHeader())
      .then(function (response) {
        if (response?.data?.status == true) {
          toast.success(
            `Request created successfully : ${props?.service}`,
            "success"
          );
          toast.success(`Forwarded to DA`, "success");
          props?.setServiceRequestModal(false);
        } else {
          toast(response?.data?.message, "error");
        }
      })
      .catch(function (error) {
        console.log("errorrr.... ", error);
        toast.error(error?.response?.data?.error);
        // setdeclarationStatus(false);
      })
      .finally(() => {
        // setisLoading(false);
      });
  };


  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setserialNo(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  // console.log(serialNo);

  return (
    <>
      <div></div>
      <div className="fixed inset-0 flex items-center justify-center z-[5000]">
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
        <div className="bg-white w-1/3 mx-auto flex flex-col max-sm:w-full z-10  rounded p-10">
          <h1 className="text-center text-2xl font-semibold mb-7 text-blue-950 capitalize">
            Create {props?.service == "dead" ? "dead stock" : props?.service}{" "}
            request
          </h1>
          <div className="form-group flex-shrink max-w-full px-4 mb-4 text-center">
            <label
              className={`${labelStyle} inline-block mb-1 text-center capitalize`}
            >
              Choose Serial Number to create{" "}
              {props?.service == "dead" ? "dead stock" : props?.service} request
            </label>

            <FormControl sx={{ marginTop: 2, width: "100%" }}>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={serialNo}
                onChange={handleChange}
                input={<OutlinedInput label="" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {props?.stockReqData?.length > 0 ? (
                  props?.stockReqData?.map((data) => (
                    <MenuItem key={data?.serial_no} value={data?.serial_no}>
                      <Checkbox
                        checked={serialNo.indexOf(data?.serial_no) > -1}
                      />
                      <ListItemText primary={data?.serial_no} />
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem >
                   No Products Available
                  </MenuItem>
                )}
              </Select>
            </FormControl>

            <p className="text-red-500 text-xs "></p>
          </div>
          <div className="flex justify-between mt-10 m-3">
            <button
              className={`${buttonStyle2} pl-14 pr-14`}
              onClick={() => props?.setServiceRequestModal(false)}
            >
              Cancel
            </button>
            <button
              className={`${buttonStyle2} pl-14 pr-14`}
              onClick={() => serviceRequestHandler()}
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceRequestModal;
