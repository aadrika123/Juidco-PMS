import { useEffect, useState } from "react";
import Report from "@/assets/Images/reports.svg";
import ThemeStyle from "@/Components/Common/ThemeStyle";
import { useFormik } from "formik";
import ListTableParent from "@/Components/Common/ListTable2/ListTableParent";
import ProjectApiList from "@/Components/api/ProjectApiList";
import toast from "react-hot-toast";
import "../Styles/muiStyles.css";
import { format, parseISO } from "date-fns";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ApiHeader from "@/Components/api/ApiHeader";
import { indianAmount } from "@/Components/Common/PowerupFunctions";
import { CSVLink } from "react-csv";
import ExportToExcel from "@/Components/Common/ExportTable/ExcelDowload/ExportToExcel";
import { Parser } from "json2csv/dist/json2csv.umd.js";
import { useNavigate } from "react-router-dom";

// Flatten function for nested JSON objects
const flattenObject = (obj, prefix = "") =>
  Object.keys(obj).reduce((acc, key) => {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === "object" && obj[key] !== null) {
      Object.assign(acc, flattenObject(obj[key], newKey));
    } else {
      acc[newKey] = obj[key];
    }
    return acc;
  }, {});

// CSV download function
const downloadCSV = (data) => {
  const parser = new Parser();
  const csv = parser.parse(data);
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "data.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export default function Reports() {
  // const [formData, setFormData] = useState().;
  const { inputStyle, labelStyle } = ThemeStyle();
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [exportData, setExportData] = useState([]);
  const [newExportData, setNewExportData] = useState([]);

  const [pageTrigger, setPageTrigger] = useState(0);

  // console.log(exportData,"---------------------->>>hh")

  const navigate = useNavigate();


  const {
    api_getActiveCategory,
    api_getActiveSubCategory,
    api_getInventoryTotalReport,
    api_getInventoryTotalDeadReport,
    api_getInventoryTotalMovementReport,
    api_getInventoryPreProcReport,
    api_getInventoryLevelReport,
    api_getTenderReport,
    api_getWarrantyReport,
    api_getStockHistoryReport,
    api_getRateContractReport,
    api_getPlacedOrderReport
  } = ProjectApiList();

  const [urlReport, setUrlReport] = useState(api_getInventoryTotalReport);

  const reportType = [
    { id: 1, label: "Total Stock ", value: "total_stock" },
    { id: 2, label: "Stock Movement", value: "stock_movement" },
    { id: 3, label: "Dead Stock", value: "dead_stock" },
    { id: 4, label: "Received Stock", value: "received_stock" },
    { id: 4, label: "Remaining Stock", value: "remaining_stock" },
    { id: 5, label: "Level wise Pending Applications", value: "level_wise" },
    { id: 6, label: "Tendering Type", value: "tender_type" },
    { id: 7, label: "Pre-Procurement Stock", value: "pre_procurement" },
    { id: 8, label: "Post-Procurement Stock", value: "post_procurement" },
    { id: 9, label: "Rate Contract", value: "rate_contract" },
    { id: 10, label: "Stock History Report", value: "stock_history_report" },
    { id: 11, label: "Warranty Claim", value: "warranty_claim" },
    { id: 11, label: "Place Order Report", value: "place_order_report" },
  ];

  const preProcurement = [
    { id: 1, label: "Pending Application", value: "pending" },
    { id: 2, label: "Requested Application", value: "requested" },
    { id: 3, label: "Approved Application", value: "approved" },
    { id: 4, label: "Rejected Application", value: "rejected" },
  ];

  const levels = [
    { id: 1, label: "Inventory Admin", value: "ia" },
    { id: 2, label: "Departmental Distributor", value: "dd" },
    { id: 3, label: "Departmental Admin", value: "da" },
    { id: 4, label: "Tendering Admin", value: "ta" },
    { id: 5, label: "Finance", value: "finance" },
    { id: 6, label: "Level 1", value: "level1" },
    { id: 6, label: "Level 2", value: "level2" },
  ];

  const levelwiseModuleDd = [
    { id: 1, label: "Stock Request", value: "stock-request" },
    { id: 2, label: "Service Request", value: "service-request" },
  ];

  const levelwiseModule = [
    { id: 1, label: "Procurement", value: "procurement" },
  ];

  const tenderType = [
    { id: 1, label: "Least Cost", value: "least_cost" },
    { id: 2, label: "Quality and Cost Based (qcbs)", value: "qcbs" },
    { id: 3, label: "Rate contract", value: "rate_contract" },
  ];

  const levelwiseModuleIa = [
    { id: 1, label: "Stock Request", value: "stock-request" },
    { id: 2, label: "Service Request", value: "service-request" },
    { id: 3, label: "Procurement", value: "procurement" },
    { id: 4, label: "BOQ", value: "boq" },
    { id: 5, label: "Tender", value: "tender" },
  ];

  const levelwiseModuleFin = [{ id: 4, label: "BOQ", value: "boq" }];

  const levelwiseModuleTa = [{ id: 5, label: "Tender", value: "tender" }];

  const postProcurement = [
    { id: 1, label: "Dead Stock ", value: "total_stock" },
    { id: 2, label: "Received Stock", value: "stock_movement" },
    { id: 3, label: "Remaining Stock", value: "dead_stock" },
  ];

  const warrantyStatus = [
    { id: 1, label: "Pending", value: 'pending' },
    { id: 2, label: "Claimed", value: "claimed" },
    { id: 3, label: "Rejected", value: "rejected" },
  ];

  const getUrl = (report_type) => {
    switch (report_type) {
      case "total_stock":
        return api_getInventoryTotalReport;
      case "remaining_stock":
        return api_getInventoryTotalReport;
      case "dead_stock":
        return api_getInventoryTotalDeadReport;
      case "stock_movement":
        return api_getInventoryTotalMovementReport;
      case "pre_procurement":
        return api_getInventoryPreProcReport;
      case "rate_contract":
        return api_getRateContractReport; 
      case "stock_history_report":
        return api_getStockHistoryReport; 
      case "warranty_claim":
        return api_getWarrantyReport;
      case "place_order_report":
        return api_getPlacedOrderReport;
      default:
        return api_getInventoryTotalReport;
    }
  };

  //get all active category
  const getCategory = () => {
    AxiosInterceptors.get(`${api_getActiveCategory}`, ApiHeader())
      .then(function (response) {
        if (response?.data?.status === true) {
          setCategory(response?.data?.data);
          // notify(response?.data?.message, "success");
        } else {
          toast.error(response?.data?.message, "error");
        }
      })
      .catch(function (res) {
        toast.error("Error in fetching Ctaegories");
      });
  };

  //get all active subcategory
  const getSubCategory = (id) => {
    AxiosInterceptors.get(`${api_getActiveSubCategory}/${id}`, ApiHeader())
      .then(function (response) {
        if (response?.data?.status === true) {
          setSubCategory(response?.data?.data);
          // notify(response?.data?.message, "success");
        } else {
          notify(response?.data?.message, "error");
        }
      })
      .catch(function (res) {
        notify("Error in fetching sub category");
      });
  };

  // intitial value
  const initialValues = {
    reportType: "total_stock",
    from_date: "",
    to_date: "",
    category: "",
    subCategory: "",
    preProcurement: "",
    postProcurement: "",
    levels: "",
    module_type: "",
  };

  const tableSelector = (page) => {
    switch (page) {
      case "inbox":
        return "DAIN";
      case "outbox":
        return "DAOUT";
      default:
        return "DAIN";
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      // setFormData(values);
      const reportUrl = getUrl(values.reportType);
      setUrlReport(reportUrl);
      setPageTrigger((prev) => prev + 1);
    },
    // validationSchema,
  });

  //columns ----
  const COLUMNS = [
    {
      Header: "#",
      Cell: ({ row }) => <div className="pr-2">{row.index + 1}</div>,
    },
    {
      Header: "Category",
      accessor: "category",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.values.category?.name} </div>
      ),
    },
    {
      Header: "Sub Category",
      accessor: "subcategory",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.values.subcategory?.name} </div>
      ),
    },
    {
      Header: "Unit",
      accessor: "unit",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.values?.unit?.name}</div>
      ),
    },
    {
      Header: "Description",
      accessor: "description",
      Cell: (
        { cell } // console.log(cell.row.values,"===================celllllll")
      ) => (
        <div className="pr-2 w-[14rem] truncate">
          {cell.row.values.description || "N/A"}
        </div>
      ),
    },
    {
      Header: "Warranty Claim",
      accessor: "warranty",
      Cell: ({ cell }) => (
        <div className="pr-2">
          {cell.row.values.warranty
            ? "Warranty Eligible"
            : "warranty ineligible"}
        </div>
      ),
    },
    {
      Header:
        formik.values.reportType === "total_stock"
          ? "Total"
          : "Total remaining",
      accessor:
        formik.values.reportType === "total_stock"
          ? "quantity"
          : "total_quantity",
      Cell: (
        { cell } // console.log(cell.row.values,"===================celllllll")
      ) => (
        <div className="pr-2">
          {formik.values.reportType === "total_stock"
            ? cell.row.values.quantity
            : cell.row.values.total_quantity}
        </div>
      ),
    },

    // {
    //   Header: "Action",
    //   accessor: "id",
    //   Cell: ({ cell }) => (
    //     <>
    //       <button
    //         className='bg-[#4338CA] text-white px-2 py-1 rounded hover:bg-[#373081]'
    //         onClick={() =>
    //           navigate(
    //             `/da-viewInventoryDetailsById/${cell.row.values.id}/${props.page}`
    //           )
    //         }
    //       >
    //         View
    //       </button>
    //     </>
    //   ),
    // },
  ];

  const COLUMNS_SM = [
    {
      Header: "#",
      Cell: ({ row }) => <div className="pr-2">{row.index + 1}</div>,
    },
    {
      Header: "Stock Handover No",
      accessor: "stock_handover_no",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.values.stock_handover_no} </div>
      ),
    },
    {
      Header: "Category",
      accessor: "category",
      Cell: ({ cell }) => (
        <div className="pr-2">
          {cell.row.original.inventory?.category?.name}{" "}
        </div>
      ),
    },
    {
      Header: "Sub Category",
      accessor: "subcategory",
      Cell: ({ cell }) => (
        <div className="pr-2">
          {cell.row.original.inventory?.subcategory?.name}{" "}
        </div>
      ),
    },
    {
      Header: "Unit",
      accessor: "unit",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.original.inventory?.unit?.name}</div>
      ),
    },
    {
      Header: "Description",
      accessor: "description",
      Cell: (
        { cell } // console.log(cell.row.values,"===================celllllll")
      ) => (
        <div className="pr-2 w-[14rem] truncate">
          {cell.row.original.inventory?.description || "N/A"}
        </div>
      ),
    },
    {
      Header: "Serial No",
      accessor: "serial_no",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.values.serial_no}</div>
      ),
    },
    {
      Header: "Quantity",
      accessor: "quantity",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.values.quantity}</div>
      ),
    },
    {
      Header: "Employee ID",
      accessor: "emp_id",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.original?.stock_request?.emp_id}</div>
      ),
    },
    {
      Header: "Employee Name",
      accessor: "emp_name",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.original?.stock_request?.emp_name}</div>
      ),
    },
    {
      Header: "Handover Date",
      accessor: "date",
      Cell: ({ cell }) => (
        <div className="pr-2">
          {cell.row.original?.stock_request?.stock_handover[0]
            ? new Date(
              cell.row.original?.stock_request?.stock_handover[0]?.createdAt
            )
              .toISOString()
              .split("T")[0]
            : "N/A"}
        </div>
      ),
    },

    // {
    //   Header: "Action",
    //   accessor: "id",
    //   Cell: ({ cell }) => (
    //     <>
    //       <button
    //         className='bg-[#4338CA] text-white px-2 py-1 rounded hover:bg-[#373081]'
    //         onClick={() =>
    //           navigate(
    //             `/da-viewInventoryDetailsById/${cell.row.values.id}/${props.page}`
    //           )
    //         }
    //       >
    //         View
    //       </button>
    //     </>
    //   ),
    // },
  ];

  const COLUMNS_PRO = [
    {
      Header: "#",
      Cell: ({ row }) => <div className="pr-2">{row.index + 1}</div>,
    },
    {
      Header: "Procurement No",
      accessor: "procurement_no",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.values.procurement_no} </div>
      ),
    },
    {
      Header: "Category",
      accessor: "category",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.original.category?.name} </div>
      ),
    },
    {
      Header: "Total Procurement Items",
      accessor: "quantity",
      Cell: ({ cell }) => (
        <div className="pr-2">
          {cell.row.original.procurement_stocks?.length}
        </div>
      ),
    },
    {
      Header: "Total Rate",
      accessor: "total_rate",
      Cell: ({ cell }) => (
        <div className="pr-2">
          {indianAmount(cell.row.original.total_rate)}{" "}
        </div>
      ),
    },

    // {
    //   Header: "Action",
    //   accessor: "id",
    //   Cell: ({ cell }) => (
    //     <>
    //       <button
    //         className='bg-[#4338CA] text-white px-2 py-1 rounded hover:bg-[#373081]'
    //         onClick={() =>
    //           navigate(
    //             `/da-viewInventoryDetailsById/${cell.row.values.id}/${props.page}`
    //           )
    //         }
    //       >
    //         View
    //       </button>
    //     </>
    //   ),
    // },
  ];

  const COLUMNS_DEAD = [
    {
      Header: "#",
      Cell: ({ row }) => <div className="pr-2">{row.index + 1}</div>,
    },
    {
      Header: "Serial No",
      accessor: "serial_no",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.values.serial_no} </div>
      ),
    },
    {
      Header: "Category",
      accessor: "category",
      Cell: ({ cell }) => (
        <div className="pr-2">
          {cell.row.original.inventory?.category?.name}{" "}
        </div>
      ),
    },
    {
      Header: "Sub Category",
      accessor: "subcategory",
      Cell: ({ cell }) => (
        <div className="pr-2">
          {cell.row.original.inventory?.subcategory?.name}{" "}
        </div>
      ),
    },
    {
      Header: "Unit",
      accessor: "unit",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.original.inventory?.unit?.name}</div>
      ),
    },
    {
      Header: "Description",
      accessor: "description",
      Cell: (
        { cell } // console.log(cell.row.values,"===================celllllll")
      ) => (
        <div className="pr-2 w-[14rem] truncate">
          {cell.row.original.inventory?.description || "N/A"}
        </div>
      ),
    },
    {
      Header: "Dead Stock",
      accessor: "quantity",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.values.quantity}</div>
      ),
    },
  ];

  const COLUMNS_RECEIVED = [
    {
      Header: "#",
      Cell: ({ row }) => <div className="pr-2">{row.index + 1}</div>,
    },
    {
      Header: "Category",
      accessor: "category",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.values.category?.name} </div>
      ),
    },
    {
      Header: "Sub Category",
      accessor: "subcategory",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.values.subcategory?.name} </div>
      ),
    },
    {
      Header: "Unit",
      accessor: "unit",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.values?.unit?.name}</div>
      ),
    },
    {
      Header: "Description",
      accessor: "description",
      Cell: (
        { cell } // console.log(cell.row.values,"===================celllllll")
      ) => (
        <div className="pr-2 w-[14rem] truncate">
          {cell.row.values.description || "N/A"}
        </div>
      ),
    },
    {
      Header: "Warranty Claim",
      accessor: "warranty",
      Cell: ({ cell }) => (
        <div className="pr-2">
          {cell.row.values.warranty
            ? "Warranty Eligible"
            : "warranty ineligible"}
        </div>
      ),
    },
    {
      Header:
        formik.values.reportType === "total_stock" ? "Total" : "Total Received",
      accessor:
        formik.values.reportType === "total_stock"
          ? "total_quantity"
          : "quantity",
      Cell: (
        { cell } // console.log(cell.row.values,"===================celllllll")
      ) => (
        <div className="pr-2">
          {formik.values.reportType === "total_stock"
            ? cell.row.values.total_quantity
            : cell.row.values.quantity}
        </div>
      ),
    },

    // {
    //   Header: "Action",
    //   accessor: "id",
    //   Cell: ({ cell }) => (
    //     <>
    //       <button
    //         className='bg-[#4338CA] text-white px-2 py-1 rounded hover:bg-[#373081]'
    //         onClick={() =>
    //           navigate(
    //             `/da-viewInventoryDetailsById/${cell.row.values.id}/${props.page}`
    //           )
    //         }
    //       >
    //         View
    //       </button>
    //     </>
    //   ),
    // },
  ];

  const COLUMNS_lEVEL = [
    {
      Header: "#",
      Cell: ({ row }) => <div className="pr-2">{row.index + 1}</div>,
    },
    {
      Header: "Stock Handover No",
      accessor: "stock_handover_no",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.values.stock_handover_no} </div>
      ),
    },
    {
      Header: "Employee Id",
      accessor: "emp_id",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.original.stock_request?.emp_id}</div>
      ),
    },
    {
      Header: "Employee Name",
      accessor: "emp_name",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.original.stock_request?.emp_name} </div>
      ),
    },
    {
      Header: "Category",
      accessor: "category",
      Cell: ({ cell }) => (
        <div className="pr-2">
          {cell.row.original.stock_request?.inventory?.category?.name}{" "}
        </div>
      ),
    },
    {
      Header: "Sub Category",
      accessor: "subcategory",
      Cell: ({ cell }) => (
        <div className="pr-2">
          {cell.row.original.stock_request?.inventory?.subcategory?.name}{" "}
        </div>
      ),
    },
    {
      Header: "Unit",
      accessor: "unit",
      Cell: ({ cell }) => (
        <div className="pr-2">
          {cell.row.original.stock_request?.inventory?.unit?.name}{" "}
        </div>
      ),
    },
    {
      Header: "Description",
      accessor: "description",
      Cell: ({ cell }) => (
        <div className="pr-2 w-[15rem] truncate">
          {cell.row.original.stock_request?.inventory?.description}{" "}
        </div>
      ),
    },
    {
      Header: "Quantity",
      accessor: "quantity",
      Cell: ({ cell }) => (
        <div className="pr-2">
          {cell.row.original.stock_request?.inventory?.quantity}{" "}
        </div>
      ),
    },
  ];

  const COLUMNS_lEVEL_SERVICE = [
    {
      Header: "#",
      Cell: ({ row }) => <div className="pr-2">{row.index + 1}</div>,
    },
    {
      Header: "Stock Handover No",
      accessor: "stock_handover_no",
      Cell: ({ cell }) => (
        <div className="pr-2">
          {cell.row.original.service_req?.stock_handover_no}{" "}
        </div>
      ),
    },
    {
      Header: "Service No",
      accessor: "service_no",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.values.service_no} </div>
      ),
    },
    {
      Header: "Category",
      accessor: "category",
      Cell: ({ cell }) => (
        <div className="pr-2">
          {cell.row.original.service_req?.inventory?.category?.name}{" "}
        </div>
      ),
    },
    {
      Header: "Sub Category",
      accessor: "subcategory",
      Cell: ({ cell }) => (
        <div className="pr-2">
          {cell.row.original.service_req?.inventory?.subcategory?.name}{" "}
        </div>
      ),
    },
    {
      Header: "Unit",
      accessor: "unit",
      Cell: ({ cell }) => (
        <div className="pr-2">
          {cell.row.original.service_req?.inventory?.unit?.name}{" "}
        </div>
      ),
    },
    {
      Header: "Description",
      accessor: "description",
      Cell: ({ cell }) => (
        <div className="pr-2 w-[12rem] truncate">
          {cell.row.original.service_req?.inventory?.description}{" "}
        </div>
      ),
    },
    {
      Header: "Quantity",
      accessor: "quantity",
      Cell: ({ cell }) => (
        <div className="pr-2">
          {cell.row.original.service_req?.inventory?.quantity}{" "}
        </div>
      ),
    },
  ];

  const FINBOQ = [
    {
      Header: "#",
      Cell: ({ row }) => <div className="pr-2">{row.index + 1}</div>,
    },
    {
      Header: "Procurement No",
      accessor: "procurement_no",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.original?.boq?.procurement_no} </div>
      ),
    },
    {
      Header: "Reference No",
      accessor: "reference_no",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.original?.reference_no} </div>
      ),
    },
    {
      Header: "Category",
      accessor: "category",
      Cell: ({ cell }) => (
        <div className="pr-2">
          {
            cell.row.original.boq?.procurement?.procurement_stocks[0]?.category
              ?.name
          }{" "}
        </div>
      ),
    },
    {
      Header: "Estimated Cost",
      accessor: "estimated_cost",
      Cell: ({ cell }) => (
        <div className="pr-2">
          {indianAmount(cell.row.original.boq?.estimated_cost)}{" "}
        </div>
      ),
    },
  ];

  const COLUMNS_TENDER = [
    {
      Header: "#",
      Cell: ({ row }) => <div className="pr-2">{row.index + 1}</div>,
    },
    {
      Header: "Reference No",
      accessor: "reference_no",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.values.reference_no} </div>
      ),
    },
    {
      Header: "Tendering Type",
      accessor: "tendering_type",
      Cell: ({ cell }) => (
        <div className="pr-2">
          {cell.row.original.tendering_type === "qcbs"
            ? "QCBS"
            : cell.row.original.tendering_type === "least_cost"
              ? "Least Cost"
              : "Rate Contract"}
        </div>
      ),
    },
    {
      Header: "Procurement No",
      accessor: "procurement_no",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.original?.boq?.procurement_no} </div>
      ),
    },
    {
      Header: "Category",
      accessor: "category",
      Cell: ({ cell }) => (
        <div className="pr-2">
          {
            cell.row.original?.boq?.procurement?.procurement_stocks[0]?.category
              ?.name
          }{" "}
        </div>
      ),
    },
    {
      Header: "Date",
      accessor: "date",
      Cell: ({ cell }) => (
        <div className="pr-2">
          {cell.row.original?.createdAt.split("T")[0]}{" "}
        </div>
      ),
    },
    {
      Header: "Estimated Amount",
      accessor: "estimated_cost",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.original?.boq?.estimated_cost} </div>
      ),
    },
  ];

  const COLUMNS_RC = [
    {
      Header: "#",
      Cell: ({ row }) => <div className="pr-2">{row.index + 1}</div>,
    },
    {
      Header: "Category",
      accessor: "category",
      Cell: ({ cell }) => (
        <div className="pr-2">
          {
            cell.row.original?.category?.name
          }{" "}
        </div>
      ),
    },
    {
      Header: "Sub Category",
      accessor: "subcategory",
      Cell: ({ cell }) => (
        <div className="pr-2">
          {
            cell.row.original?.subcategory?.name
          }{" "}
        </div>
      ),
    },
    {
      Header: "Unit",
      accessor: "unit",
      Cell: ({ cell }) => (
        <div className="pr-2">
          {
            cell.row.original?.unit?.name
          }{" "}
        </div>
      ),
    },
    {
      Header: "Description",
      accessor: "description",
      Cell: ({ cell }) => (
        <div className="pr-2">
          {
            cell.row.original?.description
          }{" "}
        </div>
      ),
    },
    {
      Header: "Start Date",
      accessor: "start_date",
      Cell: ({ cell }) => (
        <div className="pr-2">
          {cell.row.original?.start_date.split("T")[0]}{" "}
        </div>
      ),
    },
    {
      Header: "End Date",
      accessor: "end_date",
      Cell: ({ cell }) => (
        <div className="pr-2">
          {cell.row.original?.end_date.split("T")[0]}{" "}
        </div>
      ),
    },
    {
      Header: "Date",
      accessor: "date",
      Cell: ({ cell }) => (
        <div className="pr-2">
          {cell.row.original?.createdAt.split("T")[0]}{" "}
        </div>
      ),
    }
  ];

  const COLUMNS_SHR = [
    {
      Header: "#",
      Cell: ({ row }) => <div className="pr-2">{row.index + 1}</div>,
    },
    // {
    //   Header: "Id",
    //   accessor: "id",
    //   Cell: ({ cell }) => (
    //     <div className="pr-2">{cell.row.values.id} </div>
    //   ),
    // },
    {
      Header: "Category",
      accessor: "category",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.values.category.name} </div>
      ),
    },
    {
      Header: "Subcategory",
      accessor: "subcategory",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.values.subcategory.name} </div>
      ),
    },
    {
      Header: "Unit",
      accessor: "unit",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.values.unit.name} </div>
      ),
    },
    {
      Header: "Description",
      accessor: "description",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.values.description} </div>
      ),
    },
    {
      Header: "Quantity",
      accessor: "quantity",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.values.quantity} {cell.row.values.unit.abbreviation} </div>
      ),
    },
    {
      Header: "Action",
      accessor: "id",
      Cell: ({ cell }) => (
        <>
          <button
            className='bg-[#4338CA] text-white px-2 py-1 rounded hover:bg-[#373081]'
            onClick={() =>
              navigate(
                `/stock-history-reports`, { state: cell.row.values.id }
              )
            }
          >
            View
          </button>
        </>
      ),
    },
    // {
    //   Header: "Procurement No",
    //   accessor: "procurement_no",
    //   Cell: ({ cell }) => (
    //     <div className="pr-2">{cell.row.original?.boq?.procurement_no} </div>
    //   ),
    // },
    // {
    //   Header: "Category",
    //   accessor: "category",
    //   Cell: ({ cell }) => (
    //     <div className="pr-2">
    //       {
    //         cell.row.original?.boq?.procurement?.procurement_stocks[0]?.category
    //           ?.name
    //       }{" "}
    //     </div>
    //   ),
    // },
    // {
    //   Header: "Date",
    //   accessor: "date",
    //   Cell: ({ cell }) => (
    //     <div className="pr-2">
    //       {cell.row.original?.createdAt.split("T")[0]}{" "}
    //     </div>
    //   ),
    // },
    // {
    //   Header: "Estimated Amount",
    //   accessor: "estimated_cost",
    //   Cell: ({ cell }) => (
    //     <div className="pr-2">{cell.row.original?.boq?.estimated_cost} </div>
    //   ),
    // },
  ];

  const COLUMNS_POR = [
    {
      Header: "#",
      Cell: ({ row }) => <div className="pr-2">{row.index + 1}</div>,
    },
    {
      Header: "Procurement No",
      accessor: "procurement_no",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.values.procurement_no} </div>
      ),
    },
    {
      Header: "Category",
      accessor: "category",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.values.category.name} </div>
      ),
    },
   
    {
      Header: "Total Rate",
      accessor: "total_rate",
      Cell: ({ cell }) => (
        <div className="pr-2">{indianAmount(cell.row.values.total_rate)} </div>
      ),
    },
    {
      Header: "Date",
      accessor: "createdAt",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.values.createdAt.split("T")[0]} </div>
      ),
    },
    
  ];

  function getStatusLabel(status) {
    switch (status) {
      case 12:
      case 22:
        return "rejected";
      case 23:
        return "claimed";
      default:
        return "in-progress";
    }
  }

  const COLUMNS_WC = [
    {
      Header: "#",
      Cell: ({ row }) => <div className='pr-2'>{row.index + 1}</div>,
    },
    {
      Header: "Service No",
      accessor: "service_no",
      Cell: ({ cell }) => (
        <div className='pr-2'>{cell.row.values.service_no} </div>
      ),
    },
    {
      Header: "Category",
      accessor: "category",
      Cell: ({ cell }) => (
        <div className='pr-2'>
          {cell.row.original.inventory?.category?.name}{" "}
        </div>
      ),
    },
    {
      Header: "Sub Category",
      accessor: "subcategory",
      Cell: ({ cell }) => (
        <div className='pr-2'>
          {cell.row.original.inventory?.subcategory?.name}{" "}
        </div>
      ),
    },
    {
      Header: "Serial No",
      accessor: "serial_no",
      Cell: ({ cell }) => (
        <div className='pr-2'>{cell.row.original?.service_req_product
          ?.map((product) => product.serial_no)
          .join(', ')}</div>
      ),
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ cell }) => (
        <div className='pr-2'>{getStatusLabel(Number(cell.row.values?.status))}</div>
      ),
    },
    {
      Header: "Date",
      accessor: "date",
      Cell: ({ cell }) => (
        <div className='pr-2'>{cell.row.original?.createdAt ? new Date(cell.row.original?.createdAt).toISOString().split('T')[0] : 'N/A'}</div>
      ),
    },
  ];

  //setting application type on basis of selected levels---

  const applicationType =
    formik.values.levels === "da" || formik.values.levels === "dd"
      ? levelwiseModuleDd
      : formik.values.levels === "finance"
        ? levelwiseModuleFin
        : formik.values.levels === "level1" || formik.values.levels === "level2"
          ? levelwiseModule
          : formik.values.levels === "ta"
            ? levelwiseModuleTa
            : levelwiseModuleIa;

  useEffect(() => {
    getCategory();
  }, []);

  const handleDownload = () => {
    downloadCSV(financeDataExport);
  };

  return (
    <div>
      <div className="bg-[#4338ca] p-2 rounded-md px-6">
        <h2 className="text-xl font-medium flex items-center gap-3 text-white">
          <img alt="report icon" src={Report} />
          Reports
        </h2>
      </div>

      <div className="rounded-md border border-gray-200 bg-white my-2">
        <form
          onSubmit={formik.handleSubmit}
          className=" valid-form flex flex-wrap flex-row py-6 "
        >
          <div className="w-full flex items-center flex-wrap">
            <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4">
              <label className={`${labelStyle} inline-block mb-2 text-sm`}>
                Reports Type
                <span className="text-xl text-red-500 pl-1">*</span>{" "}
              </label>
              <select
                {...formik.getFieldProps("reportType")}
                className={`${inputStyle} inline-block w-full relative`}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                defaultValue={"total_stock"}
              >
                {reportType?.map((items, index) => (
                  <option key={index} value={items?.value}>
                    {items?.label}
                  </option>
                ))}
              </select>
              <p className="text-red-500 text-xs ">
                {formik.touched.category && formik.errors.category
                  ? formik.errors.category
                  : null}
              </p>
            </div>

            <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4">
              <label className={`${labelStyle} inline-block mb-2 text-sm`}>
                From Date
              </label>
              <input
                type="date"
                name="from_date"
                values={formik.values.from_date}
                className={`${inputStyle} inline-block w-full relative`}
                onChange={(e) => {
                  const date = parseISO(e.target.value);
                  const formattedDate = format(date, "yyyy-MM-dd");
                  formik.setFieldValue("from_date", e.target.value);
                }}
              />

              <p className="text-red-500 text-xs ">
                {formik.touched.from_date && formik.errors.from_date
                  ? formik.errors.from_date
                  : null}
              </p>
            </div>

            <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4">
              <label className={`${labelStyle} inline-block mb-2 text-sm`}>
                To Date
              </label>
              <input
                type="date"
                name="to_date"
                value={formik.values.to_date}
                className={`${inputStyle} inline-block w-full relative`}
                onChange={(e) => {
                  const date = parseISO(e.target.value);
                  const formattedDate = format(date, "yyyy-MM-dd");
                  formik.setFieldValue("to_date", formattedDate);
                }}
              />

              <p className="text-red-500 text-xs ">
                {formik.touched.to_date && formik.errors.to_date
                  ? formik.errors.to_date
                  : null}
              </p>
            </div>
          </div>

          <div className="w-full flex flex-wrap">
            <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4">
              <label className={`${labelStyle} inline-block mb-2 text-sm`}>
                Category
              </label>
              <select
                {...formik.getFieldProps("category")}
                className={`${inputStyle} inline-block w-full relative`}
                onChange={(e) => {
                  formik.handleChange(e);
                  getSubCategory(e.target.value);
                }}
              >
                <option value={""}>select</option>
                {category?.length &&
                  category?.map((items, index) => (
                    <option key={index} value={items?.id}>
                      {items?.name}
                    </option>
                  ))}
              </select>
              <p className="text-red-500 text-xs ">
                {formik.touched.category && formik.errors.category
                  ? formik.errors.category
                  : null}
              </p>
            </div>

            <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4">
              <label className={`${labelStyle} inline-block mb-2 text-sm`}>
                Sub Category
              </label>
              <select
                {...formik.getFieldProps("subCategory")}
                className={`${inputStyle} inline-block w-full relative`}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
              >
                <option value={""}>select</option>

                {subCategory?.length &&
                  subCategory?.map((items, index) => (
                    <option key={index} value={items?.id}>
                      {items?.name}
                    </option>
                  ))}
              </select>
              <p className="text-red-500 text-xs ">
                {formik.touched.subCategory && formik.errors.subCategory
                  ? formik.errors.subCategory
                  : null}
              </p>
            </div>
          </div>

          <div className="w-full flex flex-wrap">
            {formik.values.reportType === "pre_procurement" && (
              <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4">
                <label className={`${labelStyle} inline-block mb-2 text-sm`}>
                  Pre-Procurement Status
                </label>
                <select
                  {...formik.getFieldProps("preProcurement")}
                  className={`${inputStyle} inline-block w-full relative`}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                >
                  <option value={""}>select</option>
                  {preProcurement.map((items) => (
                    <option key={items.id} value={items?.value}>
                      {items?.label}
                    </option>
                  ))}
                </select>
                <p className="text-red-500 text-xs ">
                  {formik.touched.preProcurement && formik.errors.preProcurement
                    ? formik.errors.preProcurement
                    : null}
                </p>
              </div>
            )}

            {formik.values.reportType === "post_procurement" && (
              <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4">
                <label className={`${labelStyle} inline-block mb-2 text-sm`}>
                  Post-Procurement Status
                  <span className="text-xl text-red-500 pl-1">*</span>{" "}
                </label>
                <select
                  {...formik.getFieldProps("postProcurement")}
                  className={`${inputStyle} inline-block w-full relative`}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                >
                  <option value={""}>select</option>

                  {postProcurement.map((items) => (
                    <option key={items.id} value={items?.value}>
                      {items?.label}
                    </option>
                  ))}
                </select>
                <p className="text-red-500 text-xs ">
                  {formik.touched.postProcurement &&
                    formik.errors.postProcurement
                    ? formik.errors.postProcurement
                    : null}
                </p>
              </div>
            )}

            {formik.values.reportType === "level_wise" && (
              <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4">
                <label className={`${labelStyle} inline-block mb-2 text-sm`}>
                  Levels
                  <span className="text-xl text-red-500 pl-1">*</span>{" "}
                </label>
                <select
                  {...formik.getFieldProps("levels")}
                  className={`${inputStyle} inline-block w-full relative`}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                >
                  <option value={""}>select</option>

                  {levels.map((items) => (
                    <option key={items.id} value={items?.value}>
                      {items?.label}
                    </option>
                  ))}
                </select>
                {/* <p className='text-red-500 text-xs '>
                  {formik.touched.postProcurement &&
                  formik.errors.postProcurement
                    ? formik.errors.postProcurement
                    : null}
                </p> */}
              </div>
            )}

            {formik.values.reportType === "level_wise" && (
              <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4">
                <label className={`${labelStyle} inline-block mb-2 text-sm`}>
                  Application Type
                  <span className="text-xl text-red-500 pl-1">*</span>{" "}
                </label>
                <select
                  {...formik.getFieldProps("module_type")}
                  className={`${inputStyle} inline-block w-full relative`}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  defaultValue={
                    applicationType?.length === 0 && applicationType[0].value
                  }
                >
                  <option value={""}>select</option>

                  {applicationType.map((items) => (
                    <option key={items.id} value={items?.value}>
                      {items?.label}
                    </option>
                  ))}
                </select>
                {/* <p className='text-red-500 text-xs '>
                  {formik.touched.postProcurement &&
                  formik.errors.postProcurement
                    ? formik.errors.postProcurement
                    : null}
                </p> */}
              </div>
            )}

            {formik.values.reportType === "tender_type" && (
              <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4">
                <label className={`${labelStyle} inline-block mb-2 text-sm`}>
                  Tender type
                </label>
                <select
                  {...formik.getFieldProps("ttype")}
                  className={`${inputStyle} inline-block w-full relative`}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                >
                  <option value={""}>select</option>
                  {tenderType.map((items) => (
                    <option key={items.id} value={items?.value}>
                      {items?.label}
                    </option>
                  ))}
                </select>
                <p className="text-red-500 text-xs ">
                  {formik.touched.ttype && formik.errors.ttype
                    ? formik.errors.ttype
                    : null}
                </p>
              </div>
            )}

            {formik.values.reportType === "warranty_claim" && (
              <div className='form-group flex-shrink max-w-full px-4 w-full md:w-1/3 mb-4'>
                <label className={`${labelStyle} inline-block mb-2 text-sm`}>
                  Warranty Status
                </label>
                <select
                  {...formik.getFieldProps("warranty_status")}
                  className={`${inputStyle} inline-block w-full relative`}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                >
                  <option value={""}>select</option>
                  {warrantyStatus.map((items) => (
                    <option key={items.id} value={items?.value}>
                      {items?.label}
                    </option>
                  ))}
                </select>
                <p className='text-red-500 text-xs '>
                  {formik.touched.ttype && formik.errors.ttype
                    ? formik.errors.ttype
                    : null}
                </p>
              </div>
            )}
          </div>

          <div className="form-group flex-shrink w-full px-4 flex gap-4 justify-end">
            <button
              type="reset"
              className={`mt-4 border border-[#4478b7] text-[#4478b7] hover:bg-[#4478b7]  px-7 py-2 hover:text-white font-semibold rounded leading-5 shadow-lg float-right`}
            >
              Reset
            </button>

            <button
              type="submit"
              className={`mt-4 hover:bg-[#4478b7] bg-blue-700 px-7 py-2 text-white font-semibold rounded leading-5 shadow-lg float-right`}
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="border border-gray-200 rounded-md p-2 bg-white">
        <div className="flex justify-between">
          <div className="">
            <h2 className="text-2xl font-semibold p-2 mb-4">Total Stock</h2>
          </div>
          {/* <div className="space-x-2 flex">
            <div className="">
              <button
                onClick={"handlePrint"}
                className="text-white px-5 py-1.5 rounded hover:bg-[#14452a] bg-[#227447] text-sm"
              >
                Pdf
              </button>
            </div>
            <div className="mt-1">
              <CSVLink
                data={newExportData}
                className=" text-white px-5 py-2 rounded bg-[#227447] text-sm hover:bg-[#14452a]"
              >
                CSV
              </CSVLink>
            </div>

            <div className="">
              <ExportToExcel data={newExportData} />
            </div>
          </div> */}
        </div>

        <div className="p-2">
          <ListTableParent
            // table={tableSelector(props?.page)}
            api={
              formik.values.reportType === "level_wise" &&
                formik?.values?.levels &&
                formik?.values?.module_type
                ? `${api_getInventoryLevelReport}/${formik.values.levels}/${formik.values.module_type}`
                : formik.values.reportType === "tender_type"
                  ? `${api_getTenderReport}`
                  : urlReport
            }
            qparams={
              formik.values.reportType === "tender_type" && formik.values.ttype
                ? `ttype=${formik.values.ttype}`
                : ""
            }
            columns={
              formik.values.reportType === "place_order_report"
                ? COLUMNS_POR :
              formik.values.reportType === "stock_history_report"
                ? COLUMNS_SHR :
                formik.values.reportType === "rate_contract"
                  ? COLUMNS_RC :
                  formik.values.reportType === "stock_movement"
                    ? COLUMNS_SM
                    : formik.values.reportType === "pre_procurement"
                      ? COLUMNS_PRO
                      : formik.values.reportType === "dead_stock"
                        ? COLUMNS_DEAD
                        : formik.values.reportType === "received_stock"
                          ? COLUMNS_RECEIVED
                          : formik.values.reportType === "level_wise" &&
                            formik?.values?.levels &&
                            formik?.values?.module_type &&
                            formik.values.module_type === "service-request"
                            ? COLUMNS_lEVEL_SERVICE
                            : formik.values.reportType === "level_wise" &&
                              formik?.values?.levels &&
                              formik?.values?.module_type &&
                              formik.values.module_type === "boq" &&
                              (formik.values.levels === "finance" ||
                                formik.values.levels === "ia")
                              ? FINBOQ
                              : formik.values.reportType === "level_wise" &&
                                formik?.values?.levels &&
                                formik?.values?.module_type &&
                                formik.values.module_type == "procurement"
                                ? COLUMNS_PRO
                                : formik.values.reportType === "level_wise" &&
                                  formik?.values?.levels &&
                                  formik?.values?.module_type &&
                                  formik.values.module_type !== "service-request"
                                  ? COLUMNS_lEVEL
                                  : formik.values.reportType === "tender_type"
                                    ? COLUMNS_TENDER
                                    : (formik.values.reportType === "warranty_claim")
                                      ? COLUMNS_WC
                                      : COLUMNS
            }
            from={formik.values.from_date}
            to={formik.values.to_date}
            category={formik.values.category}
            subcategory={formik.values.subCategory}
            pageTrigger={pageTrigger}
            status={formik.values.preProcurement}
            setExportData={setExportData}
            flattenObject={flattenObject}
            setNewExportData={setNewExportData}
            warrantyStatus={formik?.values?.warranty_status}
          />
        </div>
      </div>
    </div>
  );
}
