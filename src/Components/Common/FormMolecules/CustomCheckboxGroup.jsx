import React from "react";
import {
  Box,
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  Checkbox,
  Typography,
} from "@mui/material";

const CustomCheckboxGroup = ({
  fields,
  values,
  handleChange,
  errors,
  touched,
  title,
  important,
  name,
}) => {
  return (
    <Box sx={{ display: "flex" }}>
      <FormControl
        sx={{ width: "100%" }}
        component='fieldset'
        variant='standard'
        error={Boolean(errors && touched)}
      >
        <FormLabel
          component='legend'
          sx={{ color: "#111827", fontSize: "15px", paddingTop: "2px" }}
        >
          {title} <span className='text-red-500'>{important}</span>
        </FormLabel>
        <FormGroup
          className='text-gray-600'
          sx={{ display: "flex", flexDirection: "row" }}
        >
          {fields.map((opt) => (
            <FormControlLabel
              key={opt.value}
              name={`${name}`}
              control={
                <Checkbox
                  //   checked={values[opt.value]}
                  onChange={handleChange}
                  name={`${name}.${opt.value}`}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 20,
                    },
                    paddingLeft: 2,
                  }}
                />
              }
              label={
                <Typography variant='body2' color='textSecondary'>
                  {opt.label}
                </Typography>
              }
            />
          ))}
        </FormGroup>
        {/* {errors && touched && <FormHelperText>{errors}</FormHelperText>} */}
      </FormControl>
    </Box>
  );
};

export default CustomCheckboxGroup;
