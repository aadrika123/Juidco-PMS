import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import MasterTable from "@/Components/Common/ListTable2/MasterTable";
import { IoMdAdd } from "react-icons/io";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ProjectApiList from "@/Components/api/ProjectApiList";
import ApiHeader from "@/Components/api/ApiHeader";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { FormControlLabel, Switch } from "@mui/material";
import CreateModalCommon from "./components/CreateModalCommon";

export default function BankMaster() {
  const { api_updateBankStatus, api_updateBank, api_getBank } =
    ProjectApiList();
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [newBankData, setNewBankData] = useState({
    name: "",
    branch: "",
    address: "",
    ifsc: "",
  });
  const [bankId, setBankId] = useState();
  const [newCategoryUpdate, setNewCategoryUpdate] = useState({});
  const [banksData, setBanksData] = useState([]);
  const [activeStatus, setActiveStatus] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const [modalAction, setModalAction] = useState("");

  // console.log(bankId)

  //input onChange
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setNewBankData((prev) => ({ ...prev, [name]: value }));
  };

  //tab row click function
  const tableRowHandler = (id) => {
    // navigate(`/subcategoryMaster`);
  };

  //modal cancel button Handler
  const cancelHandler = () => {
    setOpenCreateModal(false);
  };

  //getting all categories (active and inactive)
  const fetchAllBank = async () => {
    setIsLoading(true);
    try {
      const response = await AxiosInterceptors.get(api_getBank, ApiHeader());
      // setBanksData(response?.data?.data?.data);
      setBanksData(response?.data?.data?.data);
    } catch (error) {
      console.log("error in category master", error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  //creating new category function
  const createNewBankHandler = async () => {
    setApiLoading(true);
    if (newBankData?.name.trim().length < 0) {
      toast.error("Bank name is required");
      return;
    }
    if (newBankData?.branch.trim().length < 0) {
      toast.error("Branch is required");
      return;
    }
    if (newBankData?.address.trim().length < 0) {
      toast.error("Address is required");
      return;
    }
    if (newBankData?.ifsc.trim().length < 0) {
      toast.error("IFSC is required");
      return;
    }

    //api call with id receiving from category table
    try {
      const response = await AxiosInterceptors.post(
        api_getBank,
        newBankData,
        ApiHeader()
      );
      if (response?.data?.status) {
        setOpenCreateModal(false);
        toast.success("New Bank Added successfully");
        fetchAllBank();
        setNewBankData({ name: "" });
      }
    } catch (error) {
      console.log(error, "error in adding new bank");
      toast.error(error?.response?.data?.message || "Error in adding new bank");
    } finally {
      setApiLoading(false);
    }
  };

  //getting category data to update
  const getBankByIdHandler = async (id) => {
    setApiLoading(true);
    let url = api_getBank;
    //api call with id receiving from category table
    console.log(url + "/" + id);
    try {
      const response = await AxiosInterceptors.get(`${url}/${id}`, ApiHeader());
      if (response?.data?.status) {
        setNewBankData({
          name: response?.data?.data?.name,
          branch: response?.data?.data?.branch,
          ifsc: response?.data?.data?.ifsc,
          address: response?.data?.data?.address,
        });
        setBankId(response?.data?.data?.id);
      }
    } catch (error) {
      console.log(error, "error in getting bank info");
      toast.error(
        error?.response?.data?.message || "Error in getting Bank Info"
      );
    } finally {
      setApiLoading(false);
    }
  };

  //updating status of category
  const updateStatusHandler = async (id, bankName) => {
    //api call with id to update status
    try {
      const response = await AxiosInterceptors.post(
        api_updateBankStatus,
        { id },
        ApiHeader()
      );
      if (response?.data?.status) {
        toast.success(`${bankName} Status updated successfully`);
        fetchAllBank();
      }
    } catch (error) {
      console.log(error, "error in updating bank status");
      toast.error(error?.response?.data?.message || "Error in updating status");
    }
  };

  //updating name of category
  const updateBankHandler = async () => {
    setApiLoading(true);
    try {
      const response = await AxiosInterceptors.post(
        api_updateBank,
        { ...newBankData, id: bankId },
        ApiHeader()
      );
      if (response?.data?.status) {
        setOpenCreateModal(false);
        toast.success(`Bank Information updated successfully`);
        fetchAllBank();
      }
    } catch (error) {
      console.log(error, "error in updating bank details");
      toast.error(
        error?.response?.data?.message || "Error in updating bank details"
      );
    } finally {
      setApiLoading(false);
    }
  };

  const columns = [
    {
      Header: "Bank Id",
      accessor: "id",
      Cell: ({ cell }) => <div className='pr-2'>{cell.row.values.id}</div>,
    },
    {
      Header: "Bank Name",
      accessor: "name",
      Cell: ({ cell }) => <div className='pr-2'>{cell.row.values.name} </div>,
    },
    {
      Header: "Branch",
      accessor: "branch",
      Cell: ({ cell }) => <div className='pr-2'>{cell.row.values.branch} </div>,
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
              getBankByIdHandler(cell.row.values.id);
            }}
          >
            <FaEdit color={"#4338CA"} fontSize={18} />
          </button>
        </>
      ),
    },
  ];

  const modalData = [
    {
      label: "Bank Name",
      name: "name",
      value: newBankData.name,
      defaultVal: newBankData.name,
    },
    {
      label: "IFSC Code",
      name: "ifsc",
      value: newBankData.ifsc,
      defaultVal: newBankData.ifsc,
    },
    {
      label: "Branch",
      name: "branch",
      value: newBankData.branch,
      defaultVal: newBankData.branch,
    },
    {
      label: "Address",
      name: "address",
      value: newBankData.address,
      defaultVal: newBankData.address,
    },
  ];

  useEffect(() => {
    fetchAllBank();
  }, []);

  return (
    <>
      <TitleBar titleBarVisibility={true} titleText={"Bank Master"} />

      {/* <h1 className='  pl-4 flex'>
        <span className='font-semibold text-indigo-900'>Bank Master</span>{" "}
        
      </h1> */}

      {/* master table */}
      <div className='bg-white p-8 rounded-md m-4 border border-blue-500'>
        <div className='flex justify-between m-4'>
          <h1 className='text-xl font-semibold text-indigo-900 '>
            Bank Master List
          </h1>
          <button
            className={`bg-[#4338CA] mb-3 mr-5 py-2.5 px-4 text-white rounded hover:bg-white hover:text-[#4338ca] border hover:border-[#4338ca] flex float-right `}
            onClick={() => {
              setModalAction("add");
              setOpenCreateModal(true);
            }}
          >
            <IoMdAdd className='m-1 text-[1rem]' />
            Add New Bank
          </button>
        </div>

        <MasterTable
          tableRowHandler={tableRowHandler}
          isLoading={isLoading}
          handleOpen={() => setOpenCreateModal(true)}
          open={openCreateModal}
          //   tableViewLabel={"View Bank "}
          data={banksData}
          columns={columns}
          fetchedData={banksData}
          updatedState={setNewCategoryUpdate}
          activeStatus={setActiveStatus}
          updateLoader={apiLoading}
        />
      </div>

      {/* create Bank modal */}
      <CreateModalCommon
        handleClose={() => setOpenCreateModal(false)}
        label={"Bank"}
        heading={"Add new Bank"}
        nameStatus={"status"}
        onChange={changeHandler}
        open={openCreateModal}
        createNewHandler={createNewBankHandler}
        onClose={cancelHandler}
        page={modalAction}
        updateHandler={updateBankHandler}
        loadingState={apiLoading}
        fields={modalData}
      />
    </>
  );
}
