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
import { FormControlLabel, Modal, Switch, Typography } from "@mui/material";
import { Box } from "lucide-react";
import ThemeStyle from "@/Components/Common/ThemeStyle";
import { useFormik } from "formik";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  borderRadius: "10px",
};

export default function SupplierMaster() {
  const {
    api_getAllunit,
    api_unitStatusUpdate,
    api_updateUnit,
    api_getAllSupplier,
  } = ProjectApiList();
  const { addButtonColor } = ThemeStyleTanker();
  const { inputStyle, labelStyle, cancelButtonColor } = ThemeStyle();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [newUnit, setNewUnit] = useState({ name: "" });
  const [categoryData, setUnitData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [unitId, setUnitId] = useState();

  const initialValues = {
    rateOfContractFrom: "",
    rateOfContractTo: "",
    supplierName: "",
    supplerAddress: "",
    gstNo: "",
    bankAccName: "",
    bankAccNo: "",
    ifsc_code: "",
    panNo: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values, ">>>>>");
    },
    // validationSchema,
  });

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
      const response = await AxiosInterceptors.get(
        api_getAllSupplier,
        ApiHeader()
      );
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
      Header: "Supplier Name",
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

  const handleOnChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    // {
    //   name == "totalStock" &&
    //     formik.setFieldValue(
    //       "totalStock",
    //       allowNumberInput(value, formik.values.quantity, 100)
    //     );
    // }
    // {
    //   name == "receivedStock" &&
    //     formik.setFieldValue(
    //       "receivedStock",
    //       allowNumberInput(value, formik.values.rate, 100)
    //     );
    // }
    // {
    //   name == "remStock" &&
    //     formik.setFieldValue(
    //       "remStock",
    //       allowNumberInput(value, formik.values.totalRate, 100)
    //     );
    // }
    // {
    //   name == "dead_stock" && calculateRemainingStock(value);
    // }
  };
  return (
    <>
      <TitleBar titleBarVisibility={true} titleText={"Unit Master"} />
      

      {/* master table */}
      <div className='bg-white p-8 rounded-md m-4 border border-blue-500'>
        <div className='flex justify-between m-4'>
        <h1 className='text-xl font-semibold text-indigo-900'>
          Supplier Master
        </h1>
        <button
          className={`bg-[#4338CA] mb-3 mr-5 py-2.5 px-4 text-white rounded hover:bg-white hover:text-[#4338ca] border hover:border-[#4338ca] flex float-right `}
          onClick={() => {
            setModalAction("add");
            setOpenCreateModal(true);
          }}
        >
          <IoMdAdd className="m-1 text-[1rem]" />
          Create Supplier
        </button>
      </div>

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
      {/* <CreateModal
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
      /> */}

      <Modal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        aria-labelledby='modal-modal-title1'
        aria-describedby='modal-modal-description1'
      >
        <div className='fixed inset-0 flex items-center justify-center'>
          <div className='bg-white w-1/2 rounded'>
            <button
              className='bg-slate-200 pt-2 pb-2 pl-4 pr-4 float-right rounded-full hover:text-white hover:bg-slate-600'
              onClick={() => setOpenCreateModal(false)}
            >
              X
            </button>
            {/* <h1>guvjhbnk</h1> */}
            <>
              {/* <hr className='w-full h-2 mb-4' /> */}
              <h1 className='text-2xl pt-5 text-center'>Suppliers Details</h1>

              <div className='px-2 space-y-4 mt-10'>
                <form
                  onSubmit={formik.handleSubmit}
                  onChange={handleOnChange}
                  className='form-group flex-shrink max-w-full px-4 w-full  mb-4'
                >
                  <div className='flex w-full'>
                    <div class='px-4 w-1/2 mb-4'>
                      <label className={`${labelStyle} inline-block mb-2`}>
                        Rate of Contract From
                      </label>

                      <input
                        name='rateOfContractFrom'
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={formik.handleChange}
                        type='date'
                        value={formik.values.rateOfContractFrom}
                      />

                      <p className='text-red-500 text-xs '>
                        {formik.touched.rateOfContractFrom &&
                        formik.errors.rateOfContractFrom
                          ? formik.errors.rateOfContractFrom
                          : null}
                      </p>
                    </div>

                    <div class='px-4 w-1/2 mb-4'>
                      <label className={`${labelStyle} inline-block mb-2`}>
                        Rate of Contract To
                      </label>

                      <input
                        name='rateOfContractTo'
                        className={`${inputStyle} inline-block w-full relative`}
                        type='date'
                        onChange={formik.handleChange}
                        value={formik.values.rateOfContractTo}
                      />

                      <p className='text-red-500 text-xs '>
                        {formik.touched.rateOfContractTo &&
                        formik.errors.rateOfContractTo
                          ? formik.errors.rateOfContractTo
                          : null}
                      </p>
                    </div>
                  </div>

                  <div className='flex w-full'>
                    <div class='px-4 w-1/2 mb-4'>
                      <label className={`${labelStyle} inline-block mb-2`}>
                        Supplier Name
                      </label>

                      <input
                        name='supplierName'
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={formik.handleChange}
                        value={formik.values.supplierName}
                      />

                      <p className='text-red-500 text-xs '>
                        {formik.touched.supplierName &&
                        formik.errors.supplierName
                          ? formik.errors.supplierName
                          : null}
                      </p>
                    </div>

                    <div class='px-4 w-1/2 mb-4'>
                      <label className={`${labelStyle} inline-block mb-2`}>
                        Suppler Address
                      </label>

                      <input
                        name='supplerAddress'
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={formik.handleChange}
                        value={formik.values.supplerAddress}
                      />

                      <p className='text-red-500 text-xs '>
                        {formik.touched.supplerAddress &&
                        formik.errors.supplerAddress
                          ? formik.errors.supplerAddress
                          : null}
                      </p>
                    </div>
                  </div>

                  <div className='flex w-full'>
                    <div class='px-4 w-1/2 mb-4'>
                      <label className={`${labelStyle} inline-block mb-2`}>
                        GST No
                      </label>

                      <input
                        name='gstNo'
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={formik.handleChange}
                        value={formik.values.gstNo}
                      />

                      <p className='text-red-500 text-xs '>
                        {formik.touched.gstNo && formik.errors.gstNo
                          ? formik.errors.gstNo
                          : null}
                      </p>
                    </div>

                    <div class='px-4 w-1/2 mb-4'>
                      <label className={`${labelStyle} inline-block mb-2`}>
                        Bank Account Name
                      </label>

                      <input
                        name='bankAccName'
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={formik.handleChange}
                        value={formik.values.bankAccName}
                      />

                      <p className='text-red-500 text-xs '>
                        {formik.touched.bankAccName && formik.errors.bankAccName
                          ? formik.errors.bankAccName
                          : null}
                      </p>
                    </div>
                  </div>

                  <div className='flex w-full'>
                    <div class='px-4 w-1/2 mb-4'>
                      <label className={`${labelStyle} inline-block mb-2`}>
                        Bank Account No
                      </label>

                      <input
                        name='bankAccNo'
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={formik.handleChange}
                        value={formik.values.bankAccNo}
                      />

                      <p className='text-red-500 text-xs '>
                        {formik.touched.bankAccNo && formik.errors.bankAccNo
                          ? formik.errors.bankAccNo
                          : null}
                      </p>
                    </div>

                    <div class='px-4 w-1/2 mb-4'>
                      <label className={`${labelStyle} inline-block mb-2`}>
                        IFSC Code
                      </label>

                      <input
                        name='ifsc_code'
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={formik.handleChange}
                        value={formik.values.ifsc_code}
                      />

                      <p className='text-red-500 text-xs '>
                        {formik.touched.ifsc_code && formik.errors.ifsc_code
                          ? formik.errors.ifsc_code
                          : null}
                      </p>
                    </div>
                  </div>

                  <div className='flex w-full'>
                    <div class='px-4 w-1/2 mb-4'>
                      <label className={`${labelStyle} inline-block mb-2`}>
                        PAN No
                      </label>

                      <input
                        name='panNo'
                        className={`${inputStyle} inline-block w-full relative`}
                        onChange={formik.handleChange}
                        value={formik.values.panNo}
                      />

                      <p className='text-red-500 text-xs '>
                        {formik.touched.panNo && formik.errors.panNo
                          ? formik.errors.panNo
                          : null}
                      </p>
                    </div>
                  </div>

                  <div className='flex justify-end mb-7 space-x-4'>
                    <button
                      className={`${cancelButtonColor}`}
                      type='reset'
                      onClick={(e) => formik.resetForm()}
                    >
                      Clear
                    </button>
                    <button className={`${addButtonColor}`} type='submit'>
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </>
          </div>
        </div>
        {/* <Box sx={style} tabIndex='-2'>
          <h1>guvjhbnk</h1>
          <>
            <Typography
              id='modal-modal-title'
              variant='h6'
              component='h2'
            ></Typography>
            <hr className='w-full h-2 mb-4' />

            <div className='px-2 space-y-4 mb-10'>
              <div className=' form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-4'>
                <div class='px-4 w-full mb-4'>
                  <label className={`${labelStyle} inline-block mb-2`}>
                    Rate of Contract From
                  </label>

                  <input
                    name='receivedStock'
                    disabled
                    className={`${inputStyle} inline-block w-full relative`}
                    onChange={formik.handleChange}
                    value={formik.values.rateOfContractFrom}
                  />

                  <p className='text-red-500 text-xs '>
                    {formik.touched.rateOfContractFrom &&
                    formik.errors.rateOfContractFrom
                      ? formik.errors.rateOfContractFrom
                      : null}
                  </p>
                </div>

                <div class='px-4 w-full mb-4'>
                  <label className={`${labelStyle} inline-block mb-2`}>
                    Rate of Contract From
                  </label>

                  <input
                    name='receivedStock'
                    disabled
                    className={`${inputStyle} inline-block w-full relative`}
                    onChange={formik.handleChange}
                    value={formik.values.rateOfContractTo}
                  />

                  <p className='text-red-500 text-xs '>
                    {formik.touched.rateOfContractTo &&
                    formik.errors.rateOfContractTo
                      ? formik.errors.rateOfContractTo
                      : null}
                  </p>
                </div>

                <div class='px-4 w-full mb-4'>
                  <label className={`${labelStyle} inline-block mb-2`}>
                    Rate of Contract From
                  </label>

                  <input
                    name='receivedStock'
                    disabled
                    className={`${inputStyle} inline-block w-full relative`}
                    onChange={formik.handleChange}
                    value={formik.values.supplierName}
                  />

                  <p className='text-red-500 text-xs '>
                    {formik.touched.supplierName && formik.errors.supplierName
                      ? formik.errors.supplierName
                      : null}
                  </p>
                </div>

                <div class='px-4 w-full mb-4'>
                  <label className={`${labelStyle} inline-block mb-2`}>
                    Rate of Contract From
                  </label>

                  <input
                    name='receivedStock'
                    disabled
                    className={`${inputStyle} inline-block w-full relative`}
                    onChange={formik.handleChange}
                    value={formik.values.supplerAddress}
                  />

                  <p className='text-red-500 text-xs '>
                    {formik.touched.supplerAddress &&
                    formik.errors.supplerAddress
                      ? formik.errors.supplerAddress
                      : null}
                  </p>
                </div>

                <div class='px-4 w-full mb-4'>
                  <label className={`${labelStyle} inline-block mb-2`}>
                    Rate of Contract From
                  </label>

                  <input
                    name='receivedStock'
                    disabled
                    className={`${inputStyle} inline-block w-full relative`}
                    onChange={formik.handleChange}
                    value={formik.values.gstNo}
                  />

                  <p className='text-red-500 text-xs '>
                    {formik.touched.gstNo && formik.errors.gstNo
                      ? formik.errors.gstNo
                      : null}
                  </p>
                </div>

                <div class='px-4 w-full mb-4'>
                  <label className={`${labelStyle} inline-block mb-2`}>
                    Rate of Contract From
                  </label>

                  <input
                    name='receivedStock'
                    disabled
                    className={`${inputStyle} inline-block w-full relative`}
                    onChange={formik.handleChange}
                    value={formik.values.bankAccName}
                  />

                  <p className='text-red-500 text-xs '>
                    {formik.touched.bankAccName && formik.errors.bankAccName
                      ? formik.errors.bankAccName
                      : null}
                  </p>
                </div>

                <div class='px-4 w-full mb-4'>
                  <label className={`${labelStyle} inline-block mb-2`}>
                    Rate of Contract From
                  </label>

                  <input
                    name='receivedStock'
                    disabled
                    className={`${inputStyle} inline-block w-full relative`}
                    onChange={formik.handleChange}
                    value={formik.values.bankAccNo}
                  />

                  <p className='text-red-500 text-xs '>
                    {formik.touched.bankAccNo && formik.errors.bankAccNo
                      ? formik.errors.bankAccNo
                      : null}
                  </p>
                </div>

                <div class='px-4 w-full mb-4'>
                  <label className={`${labelStyle} inline-block mb-2`}>
                    Rate of Contract From
                  </label>

                  <input
                    name='receivedStock'
                    disabled
                    className={`${inputStyle} inline-block w-full relative`}
                    onChange={formik.handleChange}
                    value={formik.values.ifsc_code}
                  />

                  <p className='text-red-500 text-xs '>
                    {formik.touched.ifsc_code && formik.errors.ifsc_code
                      ? formik.errors.ifsc_code
                      : null}
                  </p>
                </div>

                <div class='px-4 w-full mb-4'>
                  <label className={`${labelStyle} inline-block mb-2`}>
                    Rate of Contract From
                  </label>

                  <input
                    name='receivedStock'
                    disabled
                    className={`${inputStyle} inline-block w-full relative`}
                    onChange={formik.handleChange}
                    value={formik.values.panNo}
                  />

                  <p className='text-red-500 text-xs '>
                    {formik.touched.panNo && formik.errors.panNo
                      ? formik.errors.panNo
                      : null}
                  </p>
                </div>
              </div>
            </div>
            <div className='flex justify-between gap-2 mt-6 px-2'>
              <button className={`${cancelButtonColor}`}>Cancel</button>
            </div>
          </>
        </Box> */}
      </Modal>
    </>
  );
}
