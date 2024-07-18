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
  const { api_getAllunit, api_unitStatusUpdate, api_updateUnit } =
    ProjectApiList();
  const { addButtonColor } = ThemeStyleTanker();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [newUnit, setNewUnit] = useState({ name: "" });
  const [categoryData, setUnitData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [unitId, setUnitId] = useState();

  //input onChange
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setNewUnit((prev) => ({ ...prev, [name]: value }));
  };

  //tab row click function
  const tableRowHandler = () => {};

  //modal cancel button Handler
  const cancelHandler = () => {
    setOpenCreateModal(false);
  };

  //getting all unit (active and inactive)
  const fetchAllUnit = async () => {
    setLoading(true);
    try {
      const response = await AxiosInterceptors.get(api_getAllunit, ApiHeader());
      setUnitData(response?.data?.data?.data);
    } catch (error) {
      console.log("error in unit master", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  //creating new unit function
  const createNewUnitHandler = async () => {
    if (newUnit?.name === "") {
      toast.error("Unit field is required");
      return;
    }
    setOpenCreateModal(false);

    //api call with id receiving from unit table
    try {
      const response = await AxiosInterceptors.post(
        api_getAllunit,
        newUnit,
        ApiHeader()
      );
      if (response?.data?.status) {
        toast.success("New Unit is created successfully");
        fetchAllUnit();
        setNewUnit({ name: "" });
      }
    } catch (error) {
      console.log(error, "error in creating new unit");
      toast.error(
        error?.response?.data?.message || "Error in creating new Unit"
      );
    }
  };

  //getting unit data to update
  const getUnitByIdHandler = async (id) => {
    setUnitId(id);
    let url = api_getAllunit;
    //api call with id receiving from category table
    try {
      const response = await AxiosInterceptors.get(`${url}/${id}`, ApiHeader());
      if (response?.data?.status) {
        setNewUnit({ name: response?.data?.data?.name });
      }
    } catch (error) {
      console.log(error, "error in getting unit data");
      toast.error(error?.response?.data?.message || "Error in getting Unit");
    }
  };

  //updating status of unit
  const updateStatusHandler = async (id) => {
    //api call with id to update status
    try {
      const response = await AxiosInterceptors.post(
        api_unitStatusUpdate,
        { id },
        ApiHeader()
      );
      if (response?.data?.status) {
        toast.success(`Status updated successfully`);
        fetchAllUnit();
      }
    } catch (error) {
      console.log(error, "error in updating unit status");
      toast.error(error?.response?.data?.message || "Error in updating status");
    }
  };

  //updating name of unit
  const updateUnitHandler = async () => {
    setOpenCreateModal(false);
    try {
      const response = await AxiosInterceptors.post(
        api_updateUnit,
        { ...newUnit, id: unitId },
        ApiHeader()
      );
      if (response?.data?.status) {
        toast.success(`Unit updated successfully`);
        fetchAllUnit();
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
      Header: "Id",
      accessor: "id",
      Cell: ({ cell }) => <div className='pr-2'>{cell.row.values.id}</div>,
    },
    {
      Header: "Units",
      accessor: "name",
      Cell: ({ cell }) => <div className='pr-2'>{cell.row.values.name} </div>,
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
              getUnitByIdHandler(cell.row.values.id);
            }}
          >
            <FaEdit color={"#4338CA"} fontSize={18} />
          </button>
        </>
      ),
    },
  ];

  useEffect(() => {
    fetchAllUnit();
  }, []);

  return (
    <>
      <TitleBar titleBarVisibility={true} titleText={"Unit Master"} />
      <div className='flex justify-end m-4'>
        <button
          className={`${addButtonColor}`}
          onClick={() => {
            setModalAction("add");
            setOpenCreateModal(true);
          }}
        >
          <IoMdAdd />
          Create Unit
        </button>
      </div>

      {/* master table */}
      <div className='bg-white p-8 rounded-md m-4'>
        <h1 className='text-xl font-semibold text-indigo-700'>Unit Master</h1>

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

      {/* create unit modal */}
      <CreateModal
        handleClose={() => setOpenCreateModal(false)}
        label={"Unit"}
        heading={"Create Unit"}
        name={"name"}
        nameStatus={"status"}
        onChange={changeHandler}
        open={openCreateModal}
        placeholder={"Create unit"}
        value={newUnit.name}
        createNewHandler={createNewUnitHandler}
        onClose={cancelHandler}
        page={modalAction}
        updateHandler={updateUnitHandler}
      />
    </>
  );
}
