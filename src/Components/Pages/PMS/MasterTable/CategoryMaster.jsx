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
  const [newCategory, setNewCategory] = useState("");
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

        <MasterTable tableRowHandler={tableRowHandler} loading={loading} />
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
