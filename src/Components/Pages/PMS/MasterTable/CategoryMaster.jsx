import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import MasterTable from "@/Components/Common/ListTable2/MasterTable";
import { IoMdAdd } from "react-icons/io";
import CreateModal from "./components/CreateModal";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ProjectApiList from "@/Components/api/ProjectApiList";
import ApiHeader from "@/Components/api/ApiHeader";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { FormControlLabel, Switch } from "@mui/material";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

export default function CategoryMaster() {
  const {
    api_itemCategory,
    api_itemCategoryAll,
    api_categoryStatusUpdate,
    api_itemCategoryUpdate,
    api_postItemCategory,
  } = ProjectApiList();
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "" });
  const [categoryId, setCategoryId] = useState();
  const [newCategoryUpdate, setNewCategoryUpdate] = useState({});
  const [categoryData, setCategoryData] = useState([]);
  const [activeStatus, setActiveStatus] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
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
    setIsLoading(true);
    try {
      const response = await AxiosInterceptors.get(
        api_itemCategoryAll,
        ApiHeader()
      );
      // setCategoryData(response?.data?.data?.data);
      setCategoryData(response?.data?.data?.data);
    } catch (error) {
      console.log("error in category master", error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  //creating new category function
  const createNewCategoryHandler = async () => {
    setApiLoading(true);
    if (newCategory?.name === "") {
      toast.error("Category field is required");
      return;
    }

    //api call with id receiving from category table
    try {
      const response = await AxiosInterceptors.post(
        api_postItemCategory,
        newCategory,
        ApiHeader()
      );
      if (response?.data?.status) {
        setOpenCreateModal(false);
        toast.success("New Category is created successfully");
        fetchAllCategory();
        setNewCategory({ name: "" });
      }
    } catch (error) {
      console.log(error, "error in creating new category");
      toast.error(
        error?.response?.data?.message || "Error in creating new Category"
      );
    } finally {
      setApiLoading(false);
    }
  };

  //getting category data to update
  const getCategoryByIdHandler = async (id) => {
    setApiLoading(true);
    let url = api_itemCategory;
    //api call with id receiving from category table
    console.log(url + "/" + id);
    try {
      const response = await AxiosInterceptors.get(`${url}/${id}`, ApiHeader());
      if (response?.data?.status) {
        console.log(response?.data?.data, "res");
        setNewCategory({ name: response?.data?.data?.name });
        setCategoryId(response?.data?.data?.id);
      }
    } catch (error) {
      console.log(error, "error in getting category");
      toast.error(
        error?.response?.data?.message || "Error in getting Category"
      );
    } finally {
      setApiLoading(false);
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
    setApiLoading(true);
    try {
      const response = await AxiosInterceptors.post(
        api_itemCategoryUpdate,
        { ...newCategory, id: categoryId },
        ApiHeader()
      );
      if (response?.data?.status) {
        setOpenCreateModal(false);
        toast.success(`Category updated successfully`);
        fetchAllCategory();
      }
    } catch (error) {
      console.log(error, "error in updating category");
      toast.error(
        error?.response?.data?.message || "Error in updating category"
      );
    } finally {
      setApiLoading(false);
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

      <h1 className='  pl-4 flex'>
        <span className='font-semibold text-indigo-900'>Category Master</span>{" "}
        <MdOutlineKeyboardDoubleArrowRight className='m-1 text-[1rem] text-gray-400' />
        <span className=' text-gray-400'>Sub Category Master</span>{" "}
        <MdOutlineKeyboardDoubleArrowRight className='m-1 text-[1rem] text-gray-400' />{" "}
        <span className=' text-gray-400'>Brand Master</span>
      </h1>

      {/* master table */}
      <div className='bg-white p-8 rounded-md m-4 border border-blue-500'>
        <div className='flex justify-between m-4'>
          <h1 className='text-xl font-semibold text-indigo-900 '>
            Category Master List
          </h1>
          <button
            className={`bg-[#4338CA] mb-3 mr-5 py-2.5 px-4 text-white rounded hover:bg-white hover:text-[#4338ca] border hover:border-[#4338ca] flex float-right `}
            onClick={() => {
              setModalAction("add");
              setOpenCreateModal(true);
            }}
          >
            <IoMdAdd className='m-1 text-[1rem]' />
            Create Category
          </button>
        </div>

        <MasterTable
          tableRowHandler={tableRowHandler}
          isLoading={isLoading}
          handleOpen={() => setOpenCreateModal(true)}
          open={openCreateModal}
          tableViewLabel={"View Sub Categories"}
          data={categoryData}
          columns={columns}
          fetchedData={categoryData}
          updatedState={setNewCategoryUpdate}
          activeStatus={setActiveStatus}
          updateLoader={apiLoading}
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
        loadingState={apiLoading}
      />
    </>
  );
}
