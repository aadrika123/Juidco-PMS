import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import MasterTable from "@/Components/Common/ListTable2/MasterTable";
import ThemeStyleTanker from "@/Components/Common/ThemeStyleTanker";
import { IoMdAdd } from "react-icons/io";
import CreateModal from "./components/CreateModal";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ProjectApiList from "@/Components/api/ProjectApiList";
import ApiHeader from "@/Components/api/ApiHeader";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { FormControlLabel, Switch } from "@mui/material";

export default function CategoryMaster() {
  const { api_itemCategory, api_categoryStatusUpdate,api_itemCategoryUpdate } = ProjectApiList();
  const { addButtonColor } = ThemeStyleTanker();
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "" });
  const [categoryId, setCategoryId] = useState();
  const [newCategoryUpdate, setNewCategoryUpdate] = useState({});
  const [categoryData, setCategoryData] = useState([]);
  const [activeStatus, setActiveStatus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalAction, setModalAction] = useState("");

  // console.log(categoryId)

  //input onChange
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({ ...prev, [name]: value }));
  };

  //tab row click function
  const tableRowHandler = (id) => {
    // navigate(`/subCategory/${id}`);
    navigate(`/subcategoryMaster`);
  };

  //modal cancel button Handler
  const cancelHandler = () => {
    setOpenCreateModal(false);
  };

  //getting all categories (active and inactive)
  const fetchAllCategory = async () => {
    setLoading(true);
    try {
      const response = await AxiosInterceptors.get(
        api_itemCategory,
        ApiHeader()
      );
      setCategoryData(response?.data?.data?.data);
    } catch (error) {
      console.log("error in category master", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  //creating new category function
  const createNewCategoryHandler = async () => {
    if (newCategory?.name === "") {
      toast.error("Category field is required");
      return;
    }
    setOpenCreateModal(false);

    //api call with id receiving from category table
    try {
      const response = await AxiosInterceptors.post(
        api_itemCategory,
        newCategory,
        ApiHeader()
      );
      if (response?.data?.status) {
        toast.success("New Category is created successfully");
        fetchAllCategory();
        setNewCategory({ name: "" });
      }
    } catch (error) {
      console.log(error, "error in creating new category");
      toast.error(
        error?.response?.data?.message || "Error in creating new Category"
      );
    }
  };

  //getting category data to update
  const getCategoryByIdHandler = async (id) => {
    let url = api_itemCategory;
    //api call with id receiving from category table
    console.log(url + "/" + id);
    try {
      const response = await AxiosInterceptors.get(`${url}/${id}`, ApiHeader());
      if (response?.data?.status) {
        console.log(response?.data?.data, "res");
        setNewCategory({ name: response?.data?.data?.name });
        setCategoryId(response?.data?.data?.id)
      }
    } catch (error) {
      console.log(error, "error in getting category");
      toast.error(
        error?.response?.data?.message || "Error in getting Category"
      );
    }
  };

  //updating status of category
  const updateStatusHandler = async (id, catName) => {
    //api call with id to update status
    try {
      const response = await AxiosInterceptors.post(
        api_categoryStatusUpdate,
        { id },
        ApiHeader()
      );
      if (response?.data?.status) {
        toast.success(`${catName} Category Status updated successfully`);
        fetchAllCategory();
      }
    } catch (error) {
      console.log(error, "error in creating new category");
      toast.error(error?.response?.data?.message || "Error in updating status");
    }
  };

  //updating name of category
  const updateCategoryHandler = async () => {
    setOpenCreateModal(false);
    try {
      const response = await AxiosInterceptors.post(
        api_itemCategoryUpdate,
        {...newCategory,id:categoryId},
        ApiHeader()
      );
      if (response?.data?.status) {
        toast.success(`Category updated successfully`);
        fetchAllCategory();
      }
    } catch (error) {
      console.log(error, "error in updating category");
      toast.error(
        error?.response?.data?.message || "Error in updating category"
      );
    }
  };

  const columns = [
    {
      Header: "Category Id",
      accessor: "id",
      Cell: ({ cell }) => <div className='pr-2'>{cell.row.values.id}</div>,
    },
    {
      Header: "Category",
      accessor: "name",
      Cell: ({ cell }) => <div className='pr-2'>{cell.row.values.name} </div>,
    },
    {
      Header: "Sub Category",
      Cell: ({ cell }) => (
        <div
          className='pr-2 text-indigo-700 font-medium underline cursor-pointer hover:text-indigo-400'
          onClick={() =>
            navigate(`/subCategoryMaster/${cell.row.values.id}`, {
              state: cell.row.values.name,
            })
          }
        >
          View Sub Categories
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
              name=''
              onChange={() =>
                updateStatusHandler(cell.row.values.id, cell.row.values.name)
              }
              // color={"secondary"}
            />
          }
          label={
            cell.row.values.status === true ? (
              <p className='text-green-500 text-center py-1 text-sm delay-500'>
                Active
              </p>
            ) : (
              <p className='text-red-500 text-center py-1 text-sm delay-500'>
                Inactive
              </p>
            )
          }
        />
      ),
    },
    {
      Header: "Action",
      Cell: ({ cell }) => (
        <>
          <button
            className=''
            onClick={() => {
              setModalAction("edit");
              setOpenCreateModal(true);
              getCategoryByIdHandler(cell.row.values.id);
            }}
          >
            <FaEdit color={"#4338CA"} fontSize={18} />
          </button>
        </>
      ),
    },
  ];

  useEffect(() => {
    fetchAllCategory();
  }, []);

  return (
    <>
      <TitleBar titleBarVisibility={true} titleText={"Category Master"} />
      <div className='flex justify-end m-4'>
        <button
          className={`${addButtonColor}`}
          onClick={() => {
            setModalAction("add");
            setOpenCreateModal(true);
          }}
        >
          <IoMdAdd />
          Create Category
        </button>
      </div>

      {/* master table */}
      <div className='bg-white p-8 rounded-md m-4'>
        <h1 className='text-xl font-semibold text-indigo-700'>
          Category Master
        </h1>

        <MasterTable
          tableRowHandler={tableRowHandler}
          loading={loading}
          handleOpen={() => setOpenCreateModal(true)}
          open={openCreateModal}
          tableViewLabel={"View Sub Categories"}
          data={categoryData}
          columns={columns}
          fetchedData={categoryData}
          updatedState={setNewCategoryUpdate}
          activeStatus={setActiveStatus}
        />
      </div>

      {/* create category modal */}
      <CreateModal
        handleClose={() => setOpenCreateModal(false)}
        label={"Category"}
        heading={"Create Category"}
        name={"name"}
        nameStatus={"status"}
        onChange={changeHandler}
        open={openCreateModal}
        placeholder={"Create category"}
        value={newCategory.name}
        createNewHandler={createNewCategoryHandler}
        onClose={cancelHandler}
        page={modalAction}
        updateHandler={updateCategoryHandler}
      />
    </>
  );
}
