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
        sx={{ m: 3 }}
        component='fieldset'
        variant='standard'
        error={Boolean(errors && touched)}
      >
        <FormLabel component='legend'>{title}</FormLabel>
        <FormGroup>
          {fields.map((opt) => (
            <FormControlLabel
              key={opt.value}
              control={
                <Checkbox
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
