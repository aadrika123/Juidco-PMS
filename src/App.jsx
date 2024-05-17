///////////////////////////////////////////////////////////////////////////////////////////////////////////
// 👉 Author      : R U Bharti
// 👉 Component   : App.js
// 👉 Status      : Open
// 👉 Description : This screen is designed for waive off demand.
///////////////////////////////////////////////////////////////////////////////////////////////////////////

// 👉 Importing Packages 👈
import 'animate.css'
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { contextVar } from '@/Components/context/contextVar';
import { getLocalStorageItemJsonParsed } from '@/Components/Common/localstorage';
import Login from '@/Components/Pages/Others/Login';
import ProtectedRoutes from '@/Components/Pages/Others/ProtectedRoutes';
import ErrorPage from '@/Components/Pages/Others/404/ErrorPage';
import TransferPage from '@/Components/Pages/Others/TransferPage';
import ChangePassword from '@/Components/Pages/Others/ChangePassword';
import PetRegWorkflowEntry from './Components/Pages/PetRegistration/PetRegWorkflowEntry';
import SearchPetApplicationForm from './Components/Pages/PetRegistration/SearchPetApplication/SearchPetApplicationForm';
import PetRegistrationIndex from './Components/Pages/PetRegistration/PetRegistrationIndex';
import ViewPetApplication from './Components/Pages/PetRegistration/ViewEditApplication/ViewPetApplication';
import PetOfflinePayment from './Components/Pages/PetRegistration/PatPayment/PetOfflinePayment';
import PetPaymentReceiptIndex from './Components/Pages/PetRegistration/PetPaymentReceipt/PetPaymentReceiptIndex';
// import PetDashboard from './Components/Pages/PetRegistration/PetDashboard/PetDashboard';
import SearchApprovedPetApplication from './Components/Pages/PetRegistration/SearchApprovedPetApplication/SearchApprovedPetApplication';
import ViewApprovedApplication from './Components/Pages/PetRegistration/ViewEditApplication/ViewApprovedApplication';
import PetRenewalFormIndex from './Components/Pages/PetRegistration/Form/PetRenewalFormIndex';
import ApprovedPetApplication from './Components/Pages/PetRegistration/SearchApprovedPetApplication/ApprovedPetApplication';
import RejectPetApplication from './Components/Pages/PetRegistration/SearchApprovedPetApplication/RejectPetApplication';
import PetRegDashboard from './Components/Pages/PetRegistration/PetRegDashboard/PetRegDashboard';
import SearchRejectPetApplication from './Components/Pages/PetRegistration/SearchApprovedPetApplication/SearchRejectPetApplication';
import ViewRejectApplication from './Components/Pages/PetRegistration/ViewEditApplication/ViewRejectApplication';
import PetRegistrationPreviewList from './Components/Pages/PetRegistration/SearchApprovedPetApplication/PetRegistrationPreviewList';
import ViewApprovedPreviewApplication from './Components/Pages/PetRegistration/ViewEditApplication/ViewApprovedPreviewApplication';
import PetLicense from './Components/Pages/PetRegistration/PetPaymentReceipt/PetLicense';
import AddPreProcurement from './Components/Pages/PMS/PrePrecurement/StockReceiver/AddPreProcurement';
import InventoryDashboard from './Components/Pages/PMS/PrePrecurement/StockReceiver/InventoryDashboard';
import InventoryProposalList from './Components/Pages/PMS/PrePrecurement/StockReceiver/InventoryProposalList';
import { QueryClient, QueryClientProvider } from 'react-query';
import AxiosInterceptors from '@/Components/Common/AxiosInterceptors';
import ViewInventoryDetailsById from './Components/Pages/PMS/PrePrecurement/StockReceiver/ViewInventoryDetailsById';
import InventoryProposalListTabs from './Components/Pages/PMS/PrePrecurement/StockReceiver/InventoryProposalListTabs';
import InventoryProposalListTabsDa from './Components/Pages/PMS/PrePrecurement/DepartmentalAdmin/InventoryProposalListTabsDa';
import ViewInventoryDetailsByIdDa from './Components/Pages/PMS/PrePrecurement/DepartmentalAdmin/ViewInventoryDetailsByIdDa';
import EditPreProcurement from './Components/Pages/PMS/PrePrecurement/DepartmentalAdmin/EditPreProcurement';

const queryClient = new QueryClient();


function App() {

  // 👉 State constants 👈
  const [menuList, setmenuList] = useState(getLocalStorageItemJsonParsed('menuList')); // to store menu list
  const [userDetails, setuserDetails] = useState(getLocalStorageItemJsonParsed('userDetails')); // to store user details
  const [titleText, settitleText] = useState('');
  const [refresh, setrefresh] = useState(0)
  const [titleBarVisibility, settitleBarVisibility] = useState(true);
  const [heartBeatCounter, setheartBeatCounter] = useState(1) // to check authentication
  const [toggleBar, settoggleBar] = useState(window.innerWidth <= 763 ? false : true) // toggle state for Side Bar

  // 👉 Manage sidebar to hide and show for responsiveness 👈
  window.addEventListener('resize', function () {
    window.innerWidth <= 763 && settoggleBar(false)
    window.innerWidth >= 1280 && settoggleBar(true)
  });

  // 👉 Context data used globally 👈
  const contextData = {
    notify: (toastData, toastType) => toast[toastType](toastData),
    menuList, setmenuList,
    userDetails, setuserDetails,
    titleText, settitleText,
    titleBarVisibility, settitleBarVisibility,
    heartBeatCounter, setheartBeatCounter,
    toggleBar, settoggleBar,
    refresh, setrefresh
  }

  // 👉 Routes Json 👈
  const allRoutes = [

    { path: '/transfer', element: <TransferPage /> },
    { path: '/change-password', element: <ChangePassword /> },
    // { path: '/home', element: <PetDashboard /> },
    { path: '/home', element: <PetRegDashboard /> },
    { path: '/pet-workflow', element: <PetRegWorkflowEntry /> },
    { path: '/search-pet-registration', element: <SearchPetApplicationForm /> },
    { path: '/search-approved-pet-registration', element: <SearchApprovedPetApplication /> },
    { path: '/PetRegistrationPreviewList/:registration_id', element: <PetRegistrationPreviewList /> },
    { path: '/viewPreviewApplication/:id', element: <ViewApprovedPreviewApplication /> },
    { path: '/search-rejected-pet-registration', element: <SearchRejectPetApplication /> },
    { path: '/approved-pet-application', element: <ApprovedPetApplication /> },
    { path: '/reject-pet-application', element: <RejectPetApplication /> },
    { path: '/pet-registration', element: <PetRegistrationIndex /> },
    { path: '/pet-renewal/:id', element: <PetRenewalFormIndex /> },
    { path: '/viewPetApplication/:id', element: <ViewPetApplication /> },
    { path: '/viewRejectApplication/:id', element: <ViewRejectApplication /> },
    { path: '/viewApprovedApplication/:id', element: <ViewApprovedApplication /> },
    { path: '/pet-payment-offline/:id', element: <PetOfflinePayment /> },
    { path: '/pet-payment-receipt/:transNo', element: <PetPaymentReceiptIndex /> },
    { path: '/pet-license/:id', element: <PetLicense/> },
    
    //---------- PMS-Routes -----------------
    
    //------------ Stock Receiver ---------------
    { path: '/sr-inventory-dashboard', element: <InventoryDashboard/> },
    { path: '/sr-add-pre-procurement', element: <AddPreProcurement/> },
    { path: '/sr-viewInventoryDetailsById/:id/:page', element: <ViewInventoryDetailsById/> },
    { path: '/sr-inventory-proposal', element: <InventoryProposalListTabs/> },
    
    
    //------------ DA ---------------
    { path: '/da-inventory-proposal', element: <InventoryProposalListTabsDa/> },
    { path: '/da-viewInventoryDetailsById/:id/:page', element: <ViewInventoryDetailsByIdDa/> },
    { path: '/da-edit-pre-procurement/:id', element: <EditPreProcurement/> },
    

  ]

  return (
    <QueryClientProvider client={queryClient}>
    <>

      <Toaster />

      <contextVar.Provider value={contextData} axiosInstance={AxiosInterceptors}>

        <Routes>

          <Route index element={<Login />} />

          <Route element={<ProtectedRoutes />}>

            {
              allRoutes?.map((elem) =>
                <Route path={elem?.path} element={elem?.element} />
              )
            }

          </Route>

          <Route path='*' element={<ErrorPage />} />

        </Routes>

      </contextVar.Provider>

    </>
    </QueryClientProvider>
  )
}

export default App
