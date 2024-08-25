// 👉 Importing Packages 👈
import "animate.css";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { contextVar } from "@/Components/context/contextVar";
import { getLocalStorageItemJsonParsed } from "@/Components/Common/localstorage";
import Login from "@/Components/Pages/Others/Login";
import ProtectedRoutes from "@/Components/Pages/Others/ProtectedRoutes";
import ErrorPage from "@/Components/Pages/Others/404/ErrorPage";
import AddPreProcurement from "./Components/Pages/PMS/PrePrecurement/StockReceiver/AddPreProcurement";
import RejectedListTabs from "./Components/Pages/PMS/PrePrecurement/StockReceiver/RejectedListTabs";
import ReleasedListTabs from "./Components/Pages/PMS/PrePrecurement/StockReceiver/ReleasedListTabs";
import InventoryDashboard from "./Components/Pages/PMS/PrePrecurement/StockReceiver/InventoryDashboard";
import { QueryClient, QueryClientProvider } from "react-query";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ViewInventoryDetailsById from "./Components/Pages/PMS/PrePrecurement/StockReceiver/ViewInventoryDetailsById";
import InventoryProposalListTabs from "./Components/Pages/PMS/PrePrecurement/StockReceiver/InventoryProposalListTabs";
import InventoryProposalListTabsDa from "./Components/Pages/PMS/PrePrecurement/DepartmentalAdmin/InventoryProposalListTabsDa";
import ViewInventoryDetailsByIdDa from "./Components/Pages/PMS/PrePrecurement/DepartmentalAdmin/ViewInventoryDetailsByIdDa";
import EditPreProcurement from "./Components/Pages/PMS/PrePrecurement/DepartmentalAdmin/EditPreProcurement";

//postprocurement
import PostProcurementHome from "./Components/Pages/PMS/PostPrecurement/StockReceiver/PostProcurementHome";
import ViewPostInvtDetailsById from "./Components/Pages/PMS/PostPrecurement/StockReceiver/ViewPostInvtDetailsById";
import ViewReceivedInvtById from "./Components/Pages/PMS/ReceivedInventory/StockReciever/ViewReceivedInvtById";
import PostPrecurementListTabsDa from "./Components/Pages/PMS/PostPrecurement/DepartmentalAdmin/PostPrecurementListTabsDa";
import PostPreDetailsById from "./Components/Pages/PMS/PostPrecurement/DepartmentalAdmin/PostPreDetailsById";
import ReceivedInvtHome from "./Components/Pages/PMS/ReceivedInventory/StockReciever/ReceivedInvtHome";
import ReceivedInvtHomeDa from "./Components/Pages/PMS/ReceivedInventory/DepartmentalAdmin/ReceivedInvtHomeDa";
import ViewReceivedInvtByIdDa from "./Components/Pages/PMS/ReceivedInventory/DepartmentalAdmin/ViewReceivedInvtByIdDa";
import InventoryDashboardDa2 from "./Components/Pages/PMS/PrePrecurement/DepartmentalAdmin/InventoryDashboardDa2";
import SrEditPreProcurement from "./Components/Pages/PMS/PrePrecurement/StockReceiver/SrEditPreProcurement";
import TenderForm from "./Components/Pages/PMS/TenderForm/TenderFormIndex";

//export print
import ExportTableData from "./Components/Common/ExportTable/ExportTableData";

//BOQ -- Accountant/DA
import BoqSearch from "./Components/Pages/PMS/BOQ/BoqSearch";
import CreateNewBoq from "./Components/Pages/PMS/BOQ/CreateNewBoq";
import PreviewBoqSummary from "./Components/Pages/PMS/BOQ/PreviewBoqSummary";
import BoqDetailsById from "./Components/Pages/PMS/BOQ/BoqDetailsById";
import BoqDetailsByIdFin from "./Components/Pages/PMS/BOQ/Finance/BoqDetailsById";
import BoqListTabs from "./Components/Pages/PMS/BOQ/BoqListTabs";
import BoqListTabsDa from "./Components/Pages/PMS/BOQ/DA/BoqListTabsDa";
import TenderFormViewDetails from "./Components/Pages/PMS/TenderForm/TenderFormViewDetails";
import AccountantList from "./Components/Pages/PMS/TenderForm/Accountant/AccountantListTabs";
import DATenderTabs from "./Components/Pages/PMS/TenderForm/DepartmentalAdmin/DATenderTabs";
import ViewProcurementDetailsById from "./Components/Pages/PMS/BOQ/ViewProcurementDetailsById";
import DistributerListTabs from "./Components/Pages/PMS/Inventory/DepartmentalDistributer/DistributerListTabs";
import StockRequestProposal from "./Components/Pages/PMS/Inventory/DepartmentalDistributer/StockRequestProposal";
import DDViewDetailbyId from "./Components/Pages/PMS/Inventory/DepartmentalDistributer/DDViewDetailbyId";
import StockRecListTabs from "./Components/Pages/PMS/Inventory/StockReceiver/StockRecListTabs";
import SrViewDetailbyId from "./Components/Pages/PMS/Inventory/StockReceiver/SrViewDetailbyId";
import SRWarrantyClaim from "./Components/Pages/PMS/Inventory/StockReceiver/SRWarrantyClaim";
import SrViewWarrantybyId from "./Components/Pages/PMS/Inventory/StockReceiver/SrViewWarrantybyId";
import DdHandoverList from "./Components/Pages/PMS/Inventory/DepartmentalDistributer/DdHandoverList";
import DDHandoverListTabs from "./Components/Pages/PMS/Inventory/DepartmentalDistributer/DDHandoverListTabs";
import DDViewHandoverbyId from "./Components/Pages/PMS/Inventory/DepartmentalDistributer/DDViewHandoverbyId";

//Master table
import CategoryMaster from "./Components/Pages/PMS/MasterTable/CategoryMaster";
import SubCategoryMaster from "./Components/Pages/PMS/MasterTable/SubCategoryMaster";
import BrandMaster from "./Components/Pages/PMS/MasterTable/BrandMaster";
import UnitMaster from "./Components/Pages/PMS/MasterTable/UnitMaster";
import SupplierMaster from "./Components/Pages/PMS/MasterTable/SupplierMaster";
import ViewLevel1Details from "./Components/Pages/PMS/BOQ/level1/ViewLevel1Details";
import BoqLeveloneTab from "./Components/Pages/PMS/BOQ/level1/BoqLeveloneTab";
import ViewLevel2BoqDetails from "./Components/Pages/PMS/BOQ/level2/ViewLevel2BoqDetails";
import Reports from "./Components/Pages/PMS/Reports/Reports";
import InventoryReports from "./Components/Pages/PMS/Reports/InventoryReports";
import ProductHistoryReports from "./Components/Pages/PMS/Reports/ProductHistoryReports/ProductHistoryReports";
import BiddingInitialForm from "./Components/Pages/PMS/Bidding/InventoryAdmin/BiddingInitialForm";
import BiddingViewById from "./Components/Pages/PMS/Bidding/InventoryAdmin/BiddingViewById";
import TechnicalComparision from "./Components/Pages/PMS/Bidding/BiddingAdmin/BiddingComparision";
import BiddingDetails from "./Components/Pages/PMS/Bidding/BiddingAdmin/BiddingDetailForm/BiddingDetailTabs";
import InventoryAdminTabs from "./Components/Pages/PMS/StockRequest/InventoryAdminTabs/InventoryAdminTabs";
import BiddingType from "./Components/Pages/PMS/Bidding/BiddingAdmin/BiddingType";
import ViewPreProcurementById from "./Components/Pages/PMS/PrePrecurement/InventoryAdmin/ViewPreProcurementById";
import BoqLeveltwoTab from "./Components/Pages/PMS/BOQ/level2/BoqLeveltwoTab";
import BiddingComparisionTabs from "./Components/Pages/PMS/Bidding/BiddingAdmin/BiddingDetailForm/BiddingComparisionTabs";
import BiddingComparision from "./Components/Pages/PMS/Bidding/BiddingAdmin/BiddingComparision";
import TenderingAdminTabs from "./Components/Pages/PMS/Bidding/BiddingAdmin/TenderingAdminTabs";
import BiddingTypeViewById from "./Components/Pages/PMS/Bidding/BiddingAdmin/BiddingTypeViewById";
import BiddingTypeResultView from "./Components/Pages/PMS/Bidding/BiddingAdmin/BiddingTypeResultView";
import BoqListTabsFin from "./Components/Pages/PMS/BOQ/Finance/BoqListTabsFin";
import BiddingSupplierTabs from "./Components/Pages/PMS/Bidding/BiddingAdmin/BiddingSupplier/BiddingSupplierTabs";
import BiddingSupplierById from "./Components/Pages/PMS/Bidding/BiddingAdmin/BiddingSupplier/BiddingSupplierById";
import DdServiceReqTabs from "./Components/Pages/PMS/ServiceRequest/DD/DdServiceReqTabs";
import DaServiceReqTabs from "./Components/Pages/PMS/ServiceRequest/DA/DaServiceReqTabs";
import IaServiceReqTabs from "./Components/Pages/PMS/ServiceRequest/IA/IaServiceReqTabs";

const queryClient = new QueryClient();

function App() {
  // 👉 State constants 👈
  const [menuList, setmenuList] = useState(
    getLocalStorageItemJsonParsed("menuList")
  ); // to store menu list
  const [userDetails, setuserDetails] = useState(
    getLocalStorageItemJsonParsed("userDetails")
  ); // to store user details
  const [titleText, settitleText] = useState("");
  const [refresh, setrefresh] = useState(0);
  const [titleBarVisibility, settitleBarVisibility] = useState(true);
  const [heartBeatCounter, setheartBeatCounter] = useState(1); // to check authentication
  const [biddersCount, setBiddersCount] = useState();
  const [reference_no, setReferenceNo] = useState();
  const [toggleBar, settoggleBar] = useState(
    window.innerWidth <= 763 ? false : true
  ); // toggle state for Side Bar

  // 👉 Manage sidebar to hide and show for responsiveness 👈
  window.addEventListener("resize", function () {
    window.innerWidth <= 763 && settoggleBar(false);
    window.innerWidth >= 1280 && settoggleBar(true);
  });

  // 👉 Context data used globally 👈
  const contextData = {
    notify: (toastData, toastType) => toast[toastType](toastData),
    menuList,
    setmenuList,
    userDetails,
    setuserDetails,
    titleText,
    settitleText,
    titleBarVisibility,
    settitleBarVisibility,
    heartBeatCounter,
    setheartBeatCounter,
    toggleBar,
    settoggleBar,
    refresh,
    setrefresh,
    reference_no,
    setReferenceNo,
  };

  // 👉 Routes Json 👈
  const allRoutes = [
    /////////////////////////{*** master table ***}//////////////////////////////////////

    { path: "/categoryMaster", element: <CategoryMaster /> },
    { path: "/subCategoryMaster/:id", element: <SubCategoryMaster /> },
    { path: "/brandMaster/:id", element: <BrandMaster /> },
    { path: "/unitMaster", element: <UnitMaster /> },
    { path: "/supplierMaster", element: <SupplierMaster /> },

    /////////////////////////{*** Pre-Procurement ***}//////////////////////////////////////

    /////////////////////////{*** (DD) Distributer Inventory ***}//////////////////////////////////////
    {
      path: "/dd-inventory-proposal",
      element: <DistributerListTabs />,
    },
    {
      path: "/dd-stock-proposal/:page",
      element: <StockRequestProposal />,
    },
    {
      path: "/dd-viewDetailsById/:handNo/:page",
      element: <DDViewDetailbyId />,
    },

    //------------ DA ----------
    { path: "/da-inventory-dashboard", element: <InventoryDashboardDa2 /> },
    {
      path: "/da-inventory-proposal",
      element: <InventoryProposalListTabsDa />,
    },
    { path: "/da-edit-pre-procurement/:id", element: <EditPreProcurement /> },
    {
      path: "/da-viewInventoryDetailsById/:id/:page",
      element: <ViewInventoryDetailsByIdDa />,
    },
    {
      path: "/ia-viewPreProcurementById/:id/:page",
      element: <ViewPreProcurementById />,
    },

    // -------------------------- IA ----------------------------

    {
      path: "/inventory-stockRequest",
      element: <InventoryAdminTabs />,
    },
    {
      path: "/iaViewStockRequestById/:id/:page",
      element: <ViewInventoryDetailsById />,
    },

    //  ----------------------  DD Handover --------------------
    {
      path: "/dd-handover",
      element: <DDHandoverListTabs />,
    },
    {
      path: "/dd-viewHandoverById/:id",
      element: <DDViewHandoverbyId />,
    },

    // ----------level 1 and level 2 ------------------------------------

    { path: "/levelone", element: <BoqLeveloneTab /> }, // need to check the status after getting the dataList
    {
      path: "/leveloneView/:id/:page",
      element: <ViewLevel1Details />,
    },

    { path: "/leveltwo", element: <BoqLeveltwoTab /> }, // need to check the status after getting the dataList
    {
      path: "/leveltwo/:id/:page",
      element: <ViewLevel2BoqDetails />,
    },

    // ---------------- Boq ---------------------------------------------
    {
      path: "/create-boq",
      element: <CreateNewBoq />,
    },
    {
      path: "/boqSummary",
      element: <PreviewBoqSummary />,
    },
    {
      path: "/inventoryAdmin-boq",
      element: <BoqListTabsDa />,
    },

    {
      path: "/boq-details-byId/:refNo/:page",
      element: <BoqDetailsById />,
    },

    //-------------finance
    {
      path: "/finance",
      element: <BoqListTabsFin />,
    },
    {
      path: "/boqDetails/:refNo/:page",
      element: <BoqDetailsByIdFin />,
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    //------- Stock Receiver -------
    { path: "/sr-inventory-dashboard", element: <InventoryDashboard /> },
    // { path: "/sr-inventory-proposal", element: <InventoryProposalListTabs /> },

    { path: "/create-pre-procurement/:page", element: <AddPreProcurement /> },
    { path: "/sr-edit-pre-procurement/:id", element: <SrEditPreProcurement /> },
    { path: "/sr-rejectedlist", element: <RejectedListTabs /> },
    { path: "/sr-releasedlist", element: <ReleasedListTabs /> },

    /////////////////////////{*** Post-Procurement ***}//////////////////////////////////////

    //-------------- DA ----------------
    { path: "/ia-post-precurement", element: <PostPrecurementListTabsDa /> },
    {
      path: "/ia-post-precurementbyid/:id/:page",
      element: <PostPreDetailsById />,
    },

    //------- Stock Receiver -----
    { path: "/sr-post-inventory", element: <PostProcurementHome /> },
    {
      path: "/sr-post-InvtDetailsById/:id/:page",
      element: <ViewPostInvtDetailsById />,
    },

    /////////////////////////{*** Received-Inventory ***}//////////////////////////////////////

    //------- DA ------
    { path: "/ia-received-inventory", element: <ReceivedInvtHomeDa /> },
    {
      path: "/ia-received-InvtDetailsById/:id/:page",
      element: <ViewReceivedInvtByIdDa />,
    },

    //-------Stock Receiver -----

    { path: "/sr-received-inventory", element: <ReceivedInvtHome /> },
    {
      path: "/sr-received-InvtDetailsById/:id/:page",
      element: <ViewReceivedInvtById />,
    },

    /////////////////////////{*** Tendering ***}//////////////////////////////////////
    {
      path: "/tendering",
      element: <TenderForm />,
    },
    {
      path: "/tendering-preview/:page",
      element: <TenderFormViewDetails />,
    },
    // {
    //   path: "/tendering-previewPP",
    //   element: <PrintComponent />,
    // },
    {
      path: "/print-preview",
      element: <ExportTableData />,
    },
    {
      path: "/acc-pre-tendring",
      element: <AccountantList />,
    },
    {
      path: "/da-pre-tendring",
      element: <DATenderTabs />,
    },

    /////////////////////////{*** BOQ ***}//////////////////////////////////////

    {
      path: "/accountant-boq",
      element: <BoqListTabs />,
    },
    {
      path: "/viewProcurement/:id",
      element: <ViewProcurementDetailsById />,
    },
    {
      path: "/boq-search", // need to check the status after getting the dataList
      element: <BoqSearch />,
    },

    // {
    //   path: "/notifi",
    //   element: <NotificationSidebar />,
    // },

    /////////////////////////{*** SR Inventory ***}//////////////////////////////////////
    {
      path: "/sr-dist-proposal",
      element: <StockRecListTabs />,
    },
    {
      path: "/sr-viewDetailsById/:handNo",
      element: <SrViewDetailbyId />,
    },

    /////////////////////////{*** SR Warranty ***}//////////////////////////////////////
    {
      path: "/sr-warrantyClaim",
      element: <SRWarrantyClaim />,
    },
    {
      path: "/sr-viewWarrantyById",
      element: <SrViewWarrantybyId />,
    },

    /////////////////////////{*** Reports ***}//////////////////////////////////////
    {
      path: "/reports",
      element: <Reports />,
    },
    {
      path: "/product-history-reports",
      element: <ProductHistoryReports />,
    },
    {
      path: "/inventory-reports",
      element: <InventoryReports />,
    },

    /////////////////////////{*** Bidding ***}//////////////////////////////////////
    {
      path: "/tendering-admin",
      element: <TenderingAdminTabs />,
    },
    {
      path: "/bidding-input-form/:id",
      element: <BiddingInitialForm />,
    },
    {
      path: "/biddingViewById/:id/:page",
      element: <BiddingViewById />,
    },
    {
      path: "/bidding-commparision-tabs",
      element: <BiddingComparisionTabs />,
    },
    {
      path: "/bidding-commparision",
      element: <BiddingComparision />,
    },
    {
      path: "/bidding-details",
      element: <BiddingDetails />,
    },
    {
      path: "/bidding-type",
      element: <BiddingType />,
    },
    {
      path: "/bidding-supplier",
      element: <BiddingSupplierTabs />,
    },
    {
      path: "/bidding-supplierbyid/:id/:page",
      element: <BiddingSupplierById />,
    },
    {
      path: "/bidding-type-result/:id",
      element: <BiddingTypeResultView />,
    },
    {
      path: "/bidding-type-byId/:id",
      element: <BiddingTypeViewById />,
    },

    /////////////////////////{*** Service Request ***}//////////////////////////////////////
    {
      path: "/dd-service-request",
      element: <DdServiceReqTabs />,
    },
    {
      path: "/da-service-request",
      element: <DaServiceReqTabs />,
    },
    {
      path: "/ia-service-request",
      element: <IaServiceReqTabs />,
    },
    // {
    //   path: "/viewServiceReq",
    //   element: <IaServiceReqTabs />,
    // },
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <>
        <Toaster />

        <contextVar.Provider
          value={contextData}
          axiosInstance={AxiosInterceptors}
        >
          <Routes>
            <Route index element={<Login />} />

            <Route element={<ProtectedRoutes />}>
              {allRoutes?.map((elem, index) => (
                <Route path={elem?.path} element={elem?.element} />
              ))}
            </Route>

            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </contextVar.Provider>
      </>
    </QueryClientProvider>
  );
}

export default App;
