import React from "react";
import {
  Box,
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  Checkbox,
} from "@mui/material";

const CustomCheckboxGroup = ({
  fields,
  values,
  handleChange,
  errors,
  touched,
  title,
}) => {
  return (
    <Box sx={{ display: "flex" }}>
      <FormControl
        sx={{ m: 3, width: "100%" }}
        component='fieldset'
        variant='standard'
        error={Boolean(errors && touched)}
      >
        <FormLabel component='legend' sx={{ color: "black" }}>
          {title}
        </FormLabel>
        <FormGroup
          className='text-gray-600'
          sx={{ display: "flex", flexDirection: "row" }}
        >
          {fields.map((opt) => (
            <FormControlLabel
              key={opt.value}
              control={
                <Checkbox
                  size='small'
                  //   checked={values[opt.value]}
                  onChange={handleChange}
                  name={`checkboxes.${opt.value}`}
                />
              }
              label={opt.label}
            />
          ))}
        </FormGroup>
        {errors && touched && <FormHelperText>{errors}</FormHelperText>}
      </FormControl>
    </Box>
  );
};

export default CustomCheckboxGroup;
