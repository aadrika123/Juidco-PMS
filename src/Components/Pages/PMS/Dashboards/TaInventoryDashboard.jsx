//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash alam
//    Version - 1.0
//    Date - 21/05/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - TaInventoryDashboard
//    DESCRIPTION - TaInventoryDashboard
//////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import ApiHeader from "@/Components/api/ApiHeader";
import ProjectApiList from "@/Components/api/ProjectApiList";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import { contextVar } from "@/Components/context/contextVar";
import { useContext } from "react";
import LoaderApi from "@/Components/Common/Loaders/LoaderApi";
import TotalProc from "@/assets/Images/totalProc.svg";
import RateContractImg from "@/assets/Images/rateContract.svg";
import QcbsImg from "@/assets/Images/QCBS.svg";
import Least from "@/assets/Images/LEAST.svg";

function TaInventoryDashboard() {
  //   const dayName = weekdays[getDay()];
  const { api_getTaDashboard } = ProjectApiList();

  const [isLoading, setisLoading] = useState(false);
  const [dashboardCountData, setDashboardCountData] = useState({});

  const { titleBarVisibility } = useContext(contextVar);

  // get details
  const fetchIaInventoryData = () => {
    setisLoading(true);

    AxiosInterceptors.get(`${api_getTaDashboard}`, ApiHeader())
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
          <div className='w-1/4 shadow-xl'>
            <div className='bg-white h-[15rem] w-full'>
              <img
                src={TotalProc}
                alt='Tender image'
                className='w-full h-full rounded-t-md'
              />
            </div>
            <div className='bg-[#4338CA] text-white w-full rounded p-3 space-y-4 cursor-pointer'>
              <div className='flex'>
                <h1 className='font-bold'>Total tenders</h1>
              </div>
              <div className='flex justify-between'>
                <h1 className=''>
                  {dashboardCountData?.totalApprovedTender || 0}
                </h1>
              </div>
            </div>
          </div>

          <div className='w-1/4 shadow-xl'>
            <div className='bg-white h-[15rem] w-full'>
              <img
                src={Least}
                alt='Tender image'
                className='w-full h-full rounded-t-md'
              />
            </div>
            <div className='bg-[#4338CA] text-white w-full rounded-b-md p-3 space-y-4 cursor-pointer'>
              <div className='flex'>
                <h1 className='font-bold'>Total Least Cost Tenders</h1>
              </div>
              <div className='flex justify-between'>
                <h1 className=''>{dashboardCountData?.totalLeastCost || 0} </h1>
              </div>
            </div>
          </div>

          <div className='w-1/4 shadow-xl'>
            <div className='bg-white h-[15rem] w-full'>
              <img
                src={QcbsImg}
                alt='Tender image'
                className='w-full h-full rounded-t-md'
              />
            </div>

            <div className='bg-[#4338CA] text-white w-full rounded p-3 space-y-4 cursor-pointer'>
              <div className='flex'>
                <h1 className='font-bold'>Total QCBS Tenders</h1>
              </div>
              <div className='flex justify-between'>
                <h1 className=''>{dashboardCountData?.totalQcbs || 0} </h1>
              </div>
            </div>
          </div>

          <div className='w-1/4 shadow-xl'>
            <div className='bg-white h-[15rem] w-full'>
              <img
                src={RateContractImg}
                alt='Tender image'
                className='w-full h-full rounded-t-md'
              />
            </div>

            <div className='bg-[#4338CA] text-white w-full rounded p-3 space-y-4 cursor-pointer'>
              <div className='flex'>
                <h1 className='font-bold'>Total Rate Contract</h1>
              </div>
              <div className='flex justify-between'>
                <h1 className=''>
                  {dashboardCountData?.totalRateContract || 0}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaInventoryDashboard;
