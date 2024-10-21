//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash alam
//    Version - 1.0
//    Date - 21/05/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - LevelInventoryDashboard
//    DESCRIPTION - LevelInventoryDashboard
//////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import ApiHeader from "@/Components/api/ApiHeader";
import ProjectApiList from "@/Components/api/ProjectApiList";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import { contextVar } from "@/Components/context/contextVar";
import { useContext } from "react";
import LoaderApi from "@/Components/Common/Loaders/LoaderApi";
import TenderImg from "@/assets/Images/approved_Tender.svg";
import TotalProc from "@/assets/Images/totalProc.svg";
import ProcessProc from "@/assets/Images/processProc.svg";
import PendingProc from "@/assets/Images/pendingProc.svg";
import RejectedProc from "@/assets/Images/rejectedProc.svg";

function LevelInventoryDashboard() {
  //   const dayName = weekdays[getDay()];

  const { api_getLevelDashboard } = ProjectApiList();

  const [isLoading, setisLoading] = useState(false);
  const [dashboardCountData, setDashboardCountData] = useState({});

  const { titleBarVisibility } = useContext(contextVar);

  // get details
  const fetchIaInventoryData = () => {
    setisLoading(true);

    AxiosInterceptors.get(`${api_getLevelDashboard}`, ApiHeader())
      .then(function (response) {
        setDashboardCountData(response.data?.data?.counts);
        setisLoading(false);
      })
      .catch(function (error) {
        console.log("errorrr.... ", error);
        setisLoading(false);
      });
  };

  useEffect(() => {
    fetchIaInventoryData();
  }, []);

  if (isLoading) {
    return (
      <>
        <LoaderApi />
        <div className='min-h-screen'></div>
      </>
    );
  }
  return (
    <>
      <div className=''>
        <TitleBar
          titleBarVisibility={titleBarVisibility}
          titleText={"Inventory Dashboard"}
        />
      </div>
      <div className='container mx-auto p-2 mt-2'>
        <h1 className='font-bold  text-[2rem] pb-5'>Inventory Dashboard</h1>

        <div className='flex justify-between space-x-2 md:gap-2 md:mt-12'>
          <div className='w-1/4 shadow-2xl'>
            <div className='bg-white h-[15rem] w-full'>
              <img
                src={TotalProc}
                alt='Tender image'
                className='w-full h-full rounded-t-md'
              />
            </div>
            <div className='bg-[#4338CA] text-white w-full rounded p-3 space-y-4 cursor-pointer'>
              <div className='flex'>
                <h1 className='font-bold'>Total Procurements</h1>
              </div>
              <div className='flex justify-between'>
                <h1 className=''>
                  {dashboardCountData?.totalProcurement || 0}
                </h1>
              </div>
            </div>
          </div>

          <div className='w-1/4 shadow-2xl'>
            <div className='bg-white h-[15rem] w-full'>
              <img
                src={PendingProc}
                alt='Tender image'
                className='w-full h-full rounded-t-md'
              />
            </div>
            <div className='bg-[#4338CA] text-white w-full rounded-b-md p-3 space-y-4 cursor-pointer'>
              <div className='flex'>
                <h1 className='font-bold'>Total Pending Procurements</h1>
              </div>
              <div className='flex justify-between'>
                <h1 className=''>
                  {dashboardCountData?.totalNonApprovedProcurement || 0}{" "}
                </h1>
              </div>
            </div>
          </div>

          <div className='w-1/4 shadow-2xl'>
            <div className='bg-white h-[15rem] w-full'>
              <img
                src={ProcessProc}
                alt='Tender image'
                className='w-full h-full rounded-t-md'
              />
            </div>

            <div className='bg-[#4338CA] text-white w-full rounded p-3 space-y-4 cursor-pointer'>
              <div className='flex'>
                <h1 className='font-bold'>Total Active Procurements</h1>
              </div>
              <div className='flex justify-between'>
                <h1 className=''>
                  {dashboardCountData?.totalActiveProcurement || 0}{" "}
                </h1>
              </div>
            </div>
          </div>

          <div className='w-1/4 shadow-2xl'>
            <div className='bg-white h-[15rem] w-full'>
              <img
                src={RejectedProc}
                alt='Tender image'
                className='w-full h-full rounded-t-md'
              />
            </div>

            <div className='bg-[#4338CA] text-white w-full rounded p-3 space-y-4 cursor-pointer'>
              <div className='flex'>
                <h1 className='font-bold'>Total Rejected Procurements</h1>
              </div>
              <div className='flex justify-between'>
                <h1 className=''>
                  {dashboardCountData?.totalRejectedProcurement || 0}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LevelInventoryDashboard;
