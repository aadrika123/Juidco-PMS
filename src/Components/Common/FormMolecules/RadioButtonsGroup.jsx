import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Typography,
} from "@mui/material";

export default function RadioButtonsGroup({
  fields,
  values,
  handleChange,
  errors,
  touched,
  title,
  name,
  defaultValue,
  disabled,
  setFieldValue,
  setTabData,
  autoSelectActiveTab,
  tabsCover1,
  tabsCover2,
  tabsCover3,
  tabsCover4,
  differentData,
}) {
  const handleCoversChange = (event) => {
    const { value } = event.target;
    setFieldValue("noOfCovers", value);
    if (value == "1") {
      setTabData && setTabData(tabsCover1);
      autoSelectActiveTab && autoSelectActiveTab(tabsCover1);
    } else if (value == "2") {
      setTabData(tabsCover2);
      autoSelectActiveTab(tabsCover2);
    } else if (value == "3") {
      setTabData(tabsCover3);
      autoSelectActiveTab(tabsCover3);
    } else if (value == "4") {
      setTabData(tabsCover4);
      autoSelectActiveTab(tabsCover4);
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    if (name == "noOfCovers") {
      handleCoversChange(e);
      return;
    }

    let data = { ...values };
    if (data[name] && data[name] != "") {
      data[name] = value;
    } else if (!data[name]) {
      data[name] = value;
    }

    setFieldValue(name, data[name]);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <FormControl
        sx={{ m: 0, width: "100%" }}
        component='fieldset'
        variant='standard'
        error={Boolean(errors && touched)}
      >
        <FormLabel
          component='legend'
          sx={{ color: "#111827", fontSize: "15px" }}
        >
          {title} <span className='text-red-500'>*</span>
        </FormLabel>
        <RadioGroup
          aria-labelledby='demo-radio-buttons-group-label'
          name='radio-buttons-group'
          sx={{ display: "flex", flexDirection: "row" }}
          defaultValue={defaultValue || ""}
        >
          {fields?.map((opt) => (
            <FormControlLabel
              key={opt.value}
              value={opt.value}
              name={`${name}`}
              disabled={
                disabled ||
                (differentData === "qcbs" && opt.value === "1") ||
                false
              }
              control={
                <Radio
                  checked={values.length && values?.includes(opt.value)}
                  onChange={(e) => onChangeHandler(e)}
                  // onChange={handleChange}
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
        </RadioGroup>
        {/* {errors && touched ? (
          <p className='text-red-400 text-xs'>{errors}</p>
        ) : null} */}
      </FormControl>
    </Box>
  );
}
