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
        <FormLabel component='legend' sx={{ color: "#111827", fontSize: "15px" }}>
          {title} <span className='text-red-500'>*</span>
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
              control={<Radio size='small' sx={{
                    '& .MuiSvgIcon-root': {
                      fontSize: 20,
                    },
                    paddingLeft: 3,
                   }} />}
              label={<Typography variant="body2" color="textSecondary">{opt.label}</Typography>}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
}