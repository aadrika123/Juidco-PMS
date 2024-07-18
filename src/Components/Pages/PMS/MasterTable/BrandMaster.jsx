import { useEffect, useState } from "react";
import {  useLocation, useNavigate, useParams } from "react-router-dom";
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
import { FormControlLabel, Switch } from "@mui/material";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";


export default function CategoryMaster() {
  const { addButtonColor } = ThemeStyleTanker();
  const { api_itemBrand, api_itemBrandNew, api_brandStatusUpdate,api_itemBrandUpdate } =
    ProjectApiList();

  const { id } = useParams();
  const { state } = useLocation();

  const navigate = useNavigate()

  // console.log(id)

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [newBrand, setNewBrand] = useState({ name: "" });
  const [brandData, setBrandData] = useState([]);
  const [brandId, setBrandId] = useState();
  const [loading, setLoading] = useState(false);
  const [modalAction, setModalAction] = useState("");

  //cancel button Handler
  const cancelHandler = () => {
    setOpenCreateModal(false);
  };

  const columns = [
    {
      Header: "Brand Id",
      // accessor: "id",
      Cell: ({ cell }) => <div className="pr-2">{cell.row.values.id}</div>,
    },
    {
      Header: "Brand",
      accessor: "name",
      Cell: ({ cell }) => <div className="pr-2">{cell.row.values.name} </div>,
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
              name=""
              onChange={() =>
                updateStatusHandler(cell.row.values.id, cell.row.values.name)
              }
              // color={"secondary"}
            />
          }
          label={
            cell.row.values.status === true ? (
              <p className="text-green-500 text-center py-1 text-sm delay-500">
                Active
              </p>
            ) : (
              <p className="text-red-500 text-center py-1 text-sm delay-500">
                Inactive
              </p>
            )
          }
        />
      ),
    },
    {
      Header: "Action",
      accessor: "id",
      Cell: ({ cell }) => (
        <>
          <button
            className=""
            onClick={() => {
              setModalAction("edit");
              setOpenCreateModal(true);
              getBrandByIdHandler(cell.row.values.id);
            }}
          >
            <FaEdit color={"#4338CA"} fontSize={18} />
          </button>
        </>
      ),
    },
  ];

  //getting subcategory data to update
  const getBrandByIdHandler = async (id) => {
    setBrandId(id);
    let url = api_itemBrandNew;
    //api call with id receiving from category table
    try {
      const response = await AxiosInterceptors.get(`${url}/${id}`, ApiHeader());
      if (response?.data?.status) {
        setNewBrand({ name: response?.data?.data?.name });
      }
    } catch (error) {
      console.log(error, "error in getting subcategory");
      toast.error(
        error?.response?.data?.message || "Error in getting SubCategory"
      );
    }
  };

  

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



  //creating new brand function
  const createNewBrandHandler = async () => {
    if (newBrand?.name === "") {
      toast.error("Brand name is required");
      return;
    }
    setOpenCreateModal(false);

    //api call with id receiving from category table
    try {
      const response = await AxiosInterceptors.post(
        api_itemBrandNew,
        { ...newBrand, subcategory: id },
        ApiHeader()
      );
      if (response?.data?.status) {
        toast.success("Brand Name created successfully");
        fetchAllBrandsBySubCategory();
        setNewBrand({ name: "" });
      }
    } catch (error) {
      console.log(error, "error in creating brand");
      toast.error(error?.response?.data?.message || "Error in creating brand");
    }
  };

  //input onChange
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setNewBrand((prev) => ({ ...prev, [name]: value }));
  };

  //updating status of category
  const updateStatusHandler = async (id, brandName) => {
    //api call with id to update status
    try {
      const response = await AxiosInterceptors.post(
        api_brandStatusUpdate,
        {  id },
        ApiHeader()
      );
      if (response?.data?.status) {
        toast.success(`Status updated successfully for ${brandName}`);
        fetchAllBrandsBySubCategory();
      }
    } catch (error) {
      console.log(error, "error in updating brand status");
      toast.error(error?.response?.data?.message || "Error in updating Status");
    }
  };

  //updating name of category
  const updateBrandHandler = async () => {
    setOpenCreateModal(false);
    try {
      const response = await AxiosInterceptors.post(
        api_itemBrandUpdate,
        { ...newBrand, id:brandId, subcategory: id },
        ApiHeader()
      );
      if (response?.data?.status) {
        toast.success(`Brand updated successfully`);
        fetchAllBrandsBySubCategory();
      }
    } catch (error) {
      console.log(error, "error in updating brand");
      toast.error(error?.response?.data?.message || "Error in updating Brand");
    }
  };

  useEffect(() => {
    fetchAllBrandsBySubCategory();
  }, []);

  return (
    <>
      <TitleBar titleBarVisibility={true} titleText={"Brand Master"} />
      <h1 className=" text-indigo-900 pl-4 flex">
        Category Master <MdOutlineKeyboardDoubleArrowRight className='m-1 text-[1rem]' /> <span className="cursor-pointer hover:underline" onClick={()=>navigate(-1)}>Sub Category Master</span> <MdOutlineKeyboardDoubleArrowRight className='m-1 text-[1rem]' />  <span className="font-semibold">Brand Master</span> 
      </h1>

      {/* master table */}
      <div className="bg-white p-8 rounded-md m-4 border border-blue-500">

        <div className="flex justify-between m-4">
        <h1 className="text-xl font-semibold text-indigo-900">
          {state || "Brand"} Master
        </h1>
        <button
          className={`bg-[#4338CA] mb-3 mr-5 py-2.5 px-4 text-white rounded hover:bg-white hover:text-[#4338ca] border hover:border-[#4338ca] flex float-right`}
          onClick={() => {
            setModalAction("add");
            setOpenCreateModal(true);
          }}
        >
          <IoMdAdd className='m-1 text-[1rem]' />
          Create Brand
        </button>
      </div>
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
        name={"name"}
        nameStatus={"status"}
        onChange={changeHandler}
        open={openCreateModal}
        placeholder={"Create Brand"}
        value={newBrand.name}
        createNewHandler={createNewBrandHandler}
        onClose={cancelHandler}
        page={modalAction}
        updateHandler={updateBrandHandler}
      />
    </>
  );
}
