import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionActions,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ProjectApiList from "@/Components/api/ProjectApiList";
import ApiHeader from "@/Components/api/ApiHeader";
import { FiFilter } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";


const SideSection = ({ setIsOpen, filter, setFilter, useFilter }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);

  const { api_itemCategory, api_itemSubCategoryAll, api_itemBrand } =
    ProjectApiList();

  const fetchCategory = async () => {
    AxiosInterceptors.get(
      `${api_itemCategory}`.split(" ").join(""),
      ApiHeader()
    )
      .then((data) => {
        setCategoryList(data?.data?.data);
        console.log(data?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchSubCategory = async () => {
    AxiosInterceptors.get(
      `${api_itemSubCategoryAll}`.split(" ").join(""),
      ApiHeader()
    )
      .then((data) => {
        setSubCategoryList(data?.data?.data);
        console.log(data?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCategory();
    fetchSubCategory();
  }, []);

  const handleOnchange = (fieldName, id) => {
    setFilter((prev) => {
      if (prev[fieldName]?.includes(id)) {
        return {
          ...prev,
          [fieldName]: prev[fieldName].filter((item) => item !== id),
        };
      }
      return {
        ...prev,
        [fieldName]: [...(prev[fieldName] ? prev[fieldName] : []), id],
      };
    });
  };

  const abc = () => {
    console.log(filter);
  };

  return (
    <div className="relative  ">
      <div
        className={`h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out w-64 p-4 border border-gray-300 rounded`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-thin text-gray-600 flex"><FiFilter className="pt-1 mt-.8" />Filters</h2>
          <button onClick={() => setIsOpen(false)} className="text-xl hover:bg-[#4338CA] bg-[#4338CA] text-white hover:text-white rounded">
          <RxCross2 />

          </button>
        </div>
        <hr class="h-[2px] w-full bg-gray-200 mb-4 border-none" />

        <div>
          <Accordion  >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Category
            </AccordionSummary>
            <AccordionDetails>
              <FormGroup>
                {categoryList.map((item, index) => (
                  <FormControlLabel
                    key={index}
                    control={<Checkbox />}
                    label={item?.name}
                    onChange={() => {
                      handleOnchange("category", item?.id);
                    }}
                  />
                ))}
              </FormGroup>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Sub Category
            </AccordionSummary>
            <AccordionDetails>
              <FormGroup>
                {subCategoryList.map((item, index) => (
                  <FormControlLabel
                    key={index}
                    control={<Checkbox />}
                    label={item?.name}
                    onChange={() => {
                      handleOnchange("subcategory", item?.id);
                    }}
                  />
                ))}
              </FormGroup>
            </AccordionDetails>
          </Accordion>

          <Button

            variant="outlined"
            sx={{
              width: "100%",
              mt: "1rem",
              ':hover': {
              backgroundColor: '#4338CA',  // Change this to your desired hover color
              color: 'white',           // Optional: change text color on hover
              borderColor: 'black',     // Optional: change border color on hover
        }
            }}
            onClick={useFilter}
          >
            Filter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SideSection;
