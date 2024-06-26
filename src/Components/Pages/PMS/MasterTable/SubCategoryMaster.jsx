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

export default function CategoryMaster() {
  const { api_itemSubCategory } = ProjectApiList();
  const { addButtonColor } = ThemeStyleTanker();

  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [newSubCategory, setNewSubCategory] = useState("");
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setNewSubCategory(e.target.value);
  };

  const tableRowHandler = (id) => {
    // navigate(`/subCategory/${id}`);
    navigate(`/brandMaster`);
  };

  //save button function
  const createNewSubCategoryHandler = (id) => {
    //api call with id receiving from category table
    setOpenCreateModal(false);
  };

  //cancel button Handler
  const cancelHandler = () => {
    setOpenCreateModal(false);
  };

  const columns = [
    {
      Header: "Sub Category Id",
      // accessor: "id",
      Cell: ({ cell }) => <div className='pr-2'>{cell.row.values.id}</div>,
    },
    {
      Header: "Sub Category",
      accessor: "name",
      Cell: ({ cell }) => <div className='pr-2'>{cell.row.values.name} </div>,
    },
    {
      Header: "Brands",
      Cell: ({ cell }) => (
        <div
          className='pr-2 text-indigo-700 font-medium underline cursor-pointer'
          onClick={() =>
            navigate(`/brandMaster/${id}`, {
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

  useEffect(() => {
    fetchAllSubCategory();
  }, []);

  return (
    <>
      <TitleBar titleBarVisibility={true} titleText={"SubCategory Master"} />
      <div className='flex justify-end m-4'>
        <button
          className={`${addButtonColor}`}
          onClick={() => setOpenCreateModal(true)}
        >
          <IoMdAdd />
          Create SubCategory
        </button>
      </div>

      {/* master table */}
      <div className='bg-white p-8 rounded-md m-4'>
        <h1 className='text-xl font-semibold text-indigo-700'>
          {state} Master
        </h1>

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
        name={"subcategory"}
        onChange={changeHandler}
        open={openCreateModal}
        placeholder={"Create Subcategory"}
        value={newSubCategory}
        createNewHandler={createNewSubCategoryHandler}
        onClose={cancelHandler}
      />
    </>
  );
}
