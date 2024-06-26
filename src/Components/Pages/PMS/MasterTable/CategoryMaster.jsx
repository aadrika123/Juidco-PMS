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

export default function CategoryMaster() {
  const { api_itemCategory } = ProjectApiList();
  const { addButtonColor } = ThemeStyleTanker();
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setNewCategory(e.target.value);
  };

  //tab row click function
  const tableRowHandler = (id) => {
    // navigate(`/subCategory/${id}`);
    navigate(`/subcategoryMaster`);
  };

  //save button function
  const createNewCategoryHandler = (id) => {
    //api call with id receiving from category table
    setOpenCreateModal(false);
  };

  //cancel button Handler
  const cancelHandler = () => {
    setOpenCreateModal(false);
  };

  const fetchAllCategory = async () => {
    setLoading(true);
    try {
      const response = await AxiosInterceptors.get(api_itemCategory, ApiHeader);
      setCategoryData(response?.data?.data);
    } catch (error) {
      console.log("error in category master", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      Header: "Category Id",
      // accessor: "id",
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
          className='pr-2 text-indigo-700 font-medium underline cursor-pointer'
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
      Cell: ({ cell }) => (
        <div className=' font-medium'>
          {cell.row.values.status === true ? (
            <p className='text-green-500 bg-green-100 border border-green-500 text-center py-1 rounded-md'>
              Active
            </p>
          ) : (
            <p className='text-red-500 bg-red-100 border border-red-500 text-center py-1 rounded-md'>
              Inactive
            </p>
          )}
        </div>
      ),
    },
    {
      Header: "Action",
      accessor: "id",
      Cell: ({ cell }) => (
        <>
          <button className='' onClick={() => setOpenCreateModal(true)}>
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
          onClick={() => setOpenCreateModal(true)}
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
        />
      </div>

      {/* create category modal */}
      <CreateModal
        handleClose={() => setOpenCreateModal(false)}
        label={"Category"}
        heading={"Create Category"}
        name={"category"}
        onChange={changeHandler}
        open={openCreateModal}
        placeholder={"Create category"}
        value={newCategory}
        createNewHandler={createNewCategoryHandler}
        onClose={cancelHandler}
      />
    </>
  );
}
