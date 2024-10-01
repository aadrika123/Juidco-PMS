//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash Alam
//    Version - 1.0
//    Date - 25/05/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - ServiceRequestModal
//    DESCRIPTION - ServiceRequestModal
//////////////////////////////////////////////////////////////////////////////////////

import ThemeStyle from "@/Components/Common/ThemeStyle";

import * as React from "react";
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
  const { labelStyle, loading } = ThemeStyle();

  let buttonStyle2 =
    " mr-2 pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-white text-sm sm:text-sm leading-tight rounded hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl bg-indigo-700";

  // const { api_postWarrantyClaim } = ProjectApiList();

  // console.log(props?.productData)

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    props?.setserialNo(typeof value === "string" ? value.split(",") : value);
  };

  const filtered = props?.productData?.filter(
    (data) => data?.is_available === true
  );

  return (
    <>
      <div></div>
      <div className='fixed inset-0 flex items-center justify-center z-[5000]'>
        <div className='absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm'></div>
        <div className='bg-white w-1/3 mx-auto flex flex-col max-sm:w-full z-10  rounded p-10'>
          <h1 className='text-center text-2xl font-semibold mb-7 text-blue-950 capitalize'>
            Create {props?.service == "dead" ? "dead stock" : props?.service}{" "}
            request
          </h1>
          <div className='form-group flex-shrink max-w-full px-4 mb-4 text-center'>
            <label
              className={`${labelStyle} inline-block mb-1 text-center capitalize`}
            >
              Choose Serial Number to create{" "}
              {props?.service == "dead" ? "dead stock" : props?.service} request
            </label>

            <FormControl sx={{ marginTop: 2, width: "100%" }}>
              <InputLabel id='demo-multiple-checkbox'>
                Choose Product
              </InputLabel>
              <Select
                labelId='demo-multiple-checkbox-label'
                id='demo-multiple-checkbox'
                multiple
                value={props?.serialNo}
                onChange={handleChange}
                // input={<OutlinedInput label="" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
                label='Choose Product'
              >
                {filtered.length > 0 ? (
                  filtered?.map((data) => (
                    // console.log(data?.inventoryId)
                    <MenuItem
                      key={data?.serial_no}
                      value={data?.serial_no}
                      setInvetoryId={data?.inventoryId}
                      // disabled={props?.quantity}
                    >
                      <Checkbox
                        checked={props?.serialNo.indexOf(data?.serial_no) > -1}
                      />
                      <ListItemText
                        primary={data?.serial_no}
                        secondary={`Quantity: ${data?.quantity} (${data?.brand})`}
                      />
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem>No Products Available</MenuItem>
                )}
              </Select>
            </FormControl>

            <p className='text-red-500 text-xs '></p>
          </div>
          <div className='flex justify-between mt-10 m-3'>
            <button
              className={`${buttonStyle2} pl-14 pr-14`}
              onClick={() => props?.setServiceRequestModal(false)}
              disabled={props?.loader}
            >
              Cancel
            </button>
            <button
              className={`${buttonStyle2} pl-14 pr-14`}
              onClick={() => props?.submit()}
              disabled={props?.loader}
            >
              {props?.loader ? <div className={`${loading}`}></div> : "Proceed"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceRequestModal;
