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
import ExportTableData from "./Components/Common/ExportTable/ExportTableData";
import BoqSearch from "./Components/Pages/PMS/BOQ/BoqSearch";
import CreateNewBoq from "./Components/Pages/PMS/BOQ/CreateNewBoq";
import PreviewBoqSummary from "./Components/Pages/PMS/BOQ/PreviewBoqSummary";

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
  };

  // 👉 Routes Json 👈
  const allRoutes = [
    /////////////////////////{*** Pre-Procurement ***}//////////////////////////////////////

    //------------ Stock Receiver ---------------
    { path: "/sr-inventory-dashboard", element: <InventoryDashboard /> },
    { path: "/sr-inventory-proposal", element: <InventoryProposalListTabs /> },
    {
      path: "/sr-viewInventoryDetailsById/:id/:page",
      element: <ViewInventoryDetailsById />,
    },
    { path: "/sr-add-pre-procurement", element: <AddPreProcurement /> },
    { path: "/sr-edit-pre-procurement/:id", element: <SrEditPreProcurement /> },
    { path: "/sr-rejectedlist", element: <RejectedListTabs /> },
    { path: "/sr-releasedlist", element: <ReleasedListTabs /> },

    //------------ DA ---------------
    // { path: "/da-inventory-dashboard", element: <InventoryDashboardDa /> },
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

    /////////////////////////{*** Post-Procurement ***}//////////////////////////////////////

    //------------ DA ---------------
    { path: "/da-post-precurement", element: <PostPrecurementListTabsDa /> },
    {
      path: "/da-post-precurementbyid/:id/:page",
      element: <PostPreDetailsById />,
    },

    //------------ Stock Receiver ---------------
    { path: "/sr-post-inventory", element: <PostProcurementHome /> },
    {
      path: "/sr-post-InvtDetailsById/:id/:page",
      element: <ViewPostInvtDetailsById />,
    },

    /////////////////////////{*** Received-Inventory ***}//////////////////////////////////////

    //------------ DA ---------------
    { path: "/da-received-inventory", element: <ReceivedInvtHomeDa /> },
    {
      path: "/da-received-InvtDetailsById/:id/:page",
      element: <ViewReceivedInvtByIdDa />,
    },

    //------------ Stock Receiver ---------------

    { path: "/sr-received-inventory", element: <ReceivedInvtHome /> },
    {
      path: "/sr-received-InvtDetailsById/:id/:page",
      element: <ViewReceivedInvtById />,
    },

    /////////////////////////{*** Received-Inventory ***}//////////////////////////////////////
    {
      path: "/tendering",
      element: <TenderForm />,
    },
    {
      path: "/print-preview",
      element: <ExportTableData />,
    },

    /////////////////////////{*** BOQ ***}//////////////////////////////////////

    {
      path: "/boq-search",
      element: <BoqSearch />,
    },
    {
      path: "/create-boq",
      element: <CreateNewBoq />,
    },
    {
      path: "/boqSummary",
      element: <PreviewBoqSummary />,
    },
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
              {allRoutes?.map((elem) => (
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
