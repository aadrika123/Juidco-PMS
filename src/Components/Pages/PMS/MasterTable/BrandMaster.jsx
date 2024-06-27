import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import MasterTable from "@/Components/Common/ListTable2/MasterTable";
import ThemeStyleTanker from "@/Components/Common/ThemeStyleTanker";
import CreateModal from "./components/CreateModal";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ApiHeader from "@/Components/api/ApiHeader";
import ProjectApiList from "@/Components/api/ProjectApiList";

export default function CategoryMaster() {
  const { addButtonColor } = ThemeStyleTanker();
  const { api_itemBrand } = ProjectApiList();

  const { id } = useParams();
  const { state } = useLocation();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [newBrand, setNewBrand] = useState("");
  const [brandData, setBrandData] = useState([]);
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setNewBrand(e.target.value);
  };

  //save button function
  const createNewBrandHandler = (id) => {
    //api call with id receiving from category table
    setOpenCreateModal(false);
  };

  //cancel button Handler
  const cancelHandler = () => {
    setOpenCreateModal(false);
  };

  const columns = [
    {
      Header: "Brand Id",
      // accessor: "id",
      Cell: ({ cell }) => <div className='pr-2'>{cell.row.values.id}</div>,
    },
    {
      Header: "Brand",
      accessor: "name",
      Cell: ({ cell }) => <div className='pr-2'>{cell.row.values.name} </div>,
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
  const fetchAllBrandsBySubCategory = async () => {
    setLoading(true);
    try {
      const response = await AxiosInterceptors.get(
        `${api_itemBrand}/${id}`,
        ApiHeader()
      );
      setBrandData(response?.data?.data);
    } catch (error) {
      console.log("error in brands master", error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBrandsBySubCategory();
  }, []);

  return (
    <>
      <TitleBar titleBarVisibility={true} titleText={"Brand Master"} />
      <div className='flex justify-end m-4'>
        <button
          className={`${addButtonColor}`}
          onClick={() => setOpenCreateModal(true)}
        >
          <IoMdAdd />
          Create Brand
        </button>
      </div>

      {/* master table */}
      <div className='bg-white p-8 rounded-md m-4'>
        <h1 className='text-xl font-semibold text-indigo-700'>
          {state} Master
        </h1>
        <MasterTable
          loading={loading}
          // tableViewLabel={"View Brands"}
          handleOpen={() => setOpenCreateModal(true)}
          open={openCreateModal}
          data={brandData}
          columns={columns}
          fetchedData={brandData}
        />
      </div>

      {/* create Brand modal */}
      <CreateModal
        handleClose={() => setOpenCreateModal(false)}
        label={"Brand"}
        heading={"Create Brand"}
        name={"brand"}
        onChange={changeHandler}
        open={openCreateModal}
        placeholder={"Create Brand"}
        value={newBrand}
        createNewHandler={createNewBrandHandler}
        onClose={cancelHandler}
      />
    </>
  );
}
