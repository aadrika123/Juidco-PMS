import { useState } from "react";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import MasterTable from "@/Components/Common/ListTable2/MasterTable";
import ThemeStyleTanker from "@/Components/Common/ThemeStyleTanker";
import { IoMdAdd } from "react-icons/io";
import CreateModal from "./components/CreateModal";

export default function CategoryMaster() {
  const { addButtonColor } = ThemeStyleTanker();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [newBrand, setNewBrand] = useState("");
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
        <h1 className='text-xl font-semibold text-indigo-700'>Brand Master</h1>
        <MasterTable loading={loading} />
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
