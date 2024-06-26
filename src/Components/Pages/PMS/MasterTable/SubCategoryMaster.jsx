import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import MasterTable from "@/Components/Common/ListTable2/MasterTable";
import ThemeStyleTanker from "@/Components/Common/ThemeStyleTanker";
import { IoMdAdd } from "react-icons/io";
import CreateModal from "./components/CreateModal";

export default function CategoryMaster() {
  const { addButtonColor } = ThemeStyleTanker();
  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [newSubCategory, setNewSubCategory] = useState("");
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
          SubCategory Master
        </h1>

        <MasterTable tableRowHandler={tableRowHandler} loading={loading} />
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
