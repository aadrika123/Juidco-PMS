import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import MasterTable from "@/Components/Common/ListTable2/MasterTable";
import ThemeStyleTanker from "@/Components/Common/ThemeStyleTanker";
import { IoMdAdd } from "react-icons/io";
import CreateModal from "./components/CreateModal";
import ProjectApiList from "@/Components/api/ProjectApiList";
import ApiHeader from "@/Components/api/ApiHeader";
import toast from "react-hot-toast";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import { FaEdit } from "react-icons/fa";
import { FormControlLabel, Switch } from "@mui/material";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

export default function CategoryMaster() {
  const {
    api_itemSubCategory,
    api_subcategoryStatusUpdate,
    api_itemSubCategoryAll,
    api_itemSubCategoryUpdate,
  } = ProjectApiList();
  const { addButtonColor } = ThemeStyleTanker();

  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [newSubCategory, setNewSubCategory] = useState({ name: "" });
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [subCategoryId, setSubCategoryId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalAction, setModalAction] = useState("");

  const tableRowHandler = (id) => {
    // navigate(`/subCategory/${id}`);
    navigate(`/brandMaster/${id}`);
  };

  //cancel button Handler
  const cancelHandler = () => {
    setOpenCreateModal(false);
  };

  const columns = [
    {
      Header: "Sub Category Id",
      // accessor: "id",
      Cell: ({ cell }) => <div className="pr-2">{cell.row.values.id}</div>,
    },
    {
      Header: "Sub Category",
      accessor: "name",
      Cell: ({ cell }) => <div className="pr-2">{cell.row.values.name} </div>,
    },
    {
      Header: "Brands",
      Cell: ({ cell }) => (
        <div
          className="pr-2 text-indigo-700 font-medium underline cursor-pointer hover:text-indigo-400"
          onClick={() =>
            navigate(`/brandMaster/${cell.row.values.id}`, {
              state: cell.row.values.name,
            })
          }
        >
          View Brands
        </div>
      ),
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ cell }) => (
        <FormControlLabel
          control={
            <Switch
              sx={{ transitionDelay: "250ms" }}
              checked={cell.row.values.status}
              name=""
              onChange={() =>
                updateStatusHandler(cell.row.values.id, cell.row.values.name)
              }
              // color={"secondary"}
            />
          }
          label={
            cell.row.values.status === true ? (
              <p className="text-green-500 text-center py-1 text-sm delay-500">
                Active
              </p>
            ) : (
              <p className="text-red-500 text-center py-1 text-sm delay-500">
                Inactive
              </p>
            )
          }
        />
      ),
    },
    {
      Header: "Action",
      accessor: "id",
      Cell: ({ cell }) => (
        <>
          <button
            className=""
            onClick={() => {
              setModalAction("edit");
              setOpenCreateModal(true);
              getSubCategoryByIdHandler(cell.row.values.id);
            }}
          >
            <FaEdit color={"#4338CA"} fontSize={18} />
          </button>
        </>
      ),
    },
  ];

  //fetching all subcategory by category id
  const fetchAllSubCategory = async () => {
    setLoading(true);
    try {
      const response = await AxiosInterceptors.get(
        `${api_itemSubCategory}/${id}`,
        ApiHeader()
      );
      setSubCategoryData(response?.data?.data);
    } catch (error) {
      console.log("error in subcategory master", error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  //getting subcategory data to update
  const getSubCategoryByIdHandler = async (id) => {
    setSubCategoryId(id);
    let url = api_itemSubCategoryAll;
    //api call with id receiving from category table
    try {
      const response = await AxiosInterceptors.get(`${url}/${id}`, ApiHeader());
      if (response?.data?.status) {
        setNewSubCategory({ name: response?.data?.data?.name });
      }
    } catch (error) {
      console.log(error, "error in getting subcategory");
      toast.error(
        error?.response?.data?.message || "Error in getting SubCategory"
      );
    }
  };

  //creating new sub category function
  const createNewSubCategoryHandler = async () => {
    if (newSubCategory?.name === "") {
      toast.error("Sub Category field is required");
      return;
    }
    setOpenCreateModal(false);

    //api call with id receiving from category table
    try {
      const response = await AxiosInterceptors.post(
        api_itemSubCategoryAll,
        { ...newSubCategory, category_masterId: id },
        ApiHeader()
      );
      if (response?.data?.status) {
        toast.success("New Subcategory is created successfully");
        fetchAllSubCategory();
        setNewSubCategory({ name: "" });
      }
    } catch (error) {
      console.log(error, "error in creating new subcategory");
      toast.error(
        error?.response?.data?.message || "Error in creating new Subcategory"
      );
    }
  };

  //updating status of subcategory
  const updateStatusHandler = async (id, subcatName) => {
    //api call with id to update status
    try {
      const response = await AxiosInterceptors.post(
        api_subcategoryStatusUpdate,
        { id },
        ApiHeader()
      );
      if (response?.data?.status) {
        toast.success(` Status updated successfully for ${subcatName}`);
        fetchAllSubCategory();
      }
    } catch (error) {
      console.log(error, "error in updating subcategory status");
      toast.error(error?.response?.data?.message || "Error in updating status");
    }
  };

  //updating name of subcategory
  const updateSubCategoryHandler = async () => {
    setOpenCreateModal(false);
    try {
      const response = await AxiosInterceptors.post(
        api_itemSubCategoryUpdate,
        { ...newSubCategory, category_masterId: id, id: subCategoryId },
        ApiHeader()
      );
      if (response?.data?.status) {
        toast.success(`SubCategory updated successfully`);
        fetchAllSubCategory();
      }
    } catch (error) {
      console.log(error, "error in updating subcategory");
      toast.error(
        error?.response?.data?.message || "Error in updating subcategory"
      );
    }
  };

  //input onChange
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setNewSubCategory((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    fetchAllSubCategory();
  }, []);

  return (
    <>
      <TitleBar titleBarVisibility={true} titleText={"SubCategory Master"} />
      <h1 className=" text-indigo-900 pl-4 flex">
        <span
          className="cursor-pointer hover:underline"
          onClick={() => navigate(-1)}
        >
          Category Master
        </span>{" "}
        <MdOutlineKeyboardDoubleArrowRight className="m-1 text-[1rem]" />{" "}
        <span className="font-semibold">Sub Category Master</span>
        <MdOutlineKeyboardDoubleArrowRight className="m-1 text-[1rem] text-gray-400" />{" "}
        <span className=" text-gray-400">Brand Master</span>
      </h1>

      {/* master table */}
      <div className="bg-white p-8 rounded-md m-4 border border-blue-500">
        <div className="flex justify-between m-4">
          <h1 className="text-xl font-semibold text-indigo-900">
            {state || "Sub Category"} Master
          </h1>
          <button
            className={`bg-[#4338CA] mb-3 mr-5 py-2.5 px-4 text-white rounded hover:bg-white hover:text-[#4338ca] border hover:border-[#4338ca] flex float-right`}
            onClick={() => {
              setModalAction("add");
              setOpenCreateModal(true);
            }}
          >
            <IoMdAdd className="m-1 text-[1rem]" />
            Create SubCategory
          </button>
        </div>

        <MasterTable
          tableRowHandler={tableRowHandler}
          loading={loading}
          tableViewLabel={"View Brands"}
          handleOpen={() => setOpenCreateModal(true)}
          open={openCreateModal}
          data={subCategoryData}
          columns={columns}
          fetchedData={subCategoryData}
        />
      </div>

      {/* create category modal */}
      <CreateModal
        handleClose={() => setOpenCreateModal(false)}
        label={"SubCategory"}
        heading={"Create SubCategory"}
        name={"name"}
        nameStatus={"status"}
        onChange={changeHandler}
        open={openCreateModal}
        placeholder={"Create Subcategory"}
        value={newSubCategory.name}
        createNewHandler={createNewSubCategoryHandler}
        onClose={cancelHandler}
        page={modalAction}
        updateHandler={updateSubCategoryHandler}
      />
    </>
  );
}
