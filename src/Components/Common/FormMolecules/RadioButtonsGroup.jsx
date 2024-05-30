import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";

export default function RadioButtonsGroup({
  fields,
  values,
  handleChange,
  errors,
  touched,
  title,
}) {
  return (
    <Box sx={{ display: "flex" }}>
      <FormControl
        sx={{ m: 3, width: "100%" }}
        component='fieldset'
        variant='standard'
        error={Boolean(errors && touched)}
      >
        <FormLabel id='demo-radio-buttons-group-label' sx={{ color: "black" }}>
          {title}
        </FormLabel>
        <RadioGroup
          aria-labelledby='demo-radio-buttons-group-label'
          name='radio-buttons-group'
          sx={{ display: "flex", flexDirection: "row" }}
        >
          {fields?.map((opt) => (
            <FormControlLabel
              key={opt.value}
              value={opt.value}
              control={<Radio size='small' />}
              label={opt.label}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
