//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash alam
//    Version - 1.0
//    Date - 22/05/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - InventoryDashboardDa
//    DESCRIPTION - InventoryDashboardDa
//////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import ThemeStyle from "@/Components/Common/ThemeStyle";
import ApiHeader from "@/Components/api/ApiHeader";
import ProjectApiList from "@/Components/api/ProjectApiList";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import { useNavigate } from "react-router-dom";
// import waterTanker from '../../Components/Media/waterTanker.png'
import BarLoader from "@/Components/Common/Loaders/BarLoader";
import { nullToNA } from "@/Components/Common/PowerUps/PowerupFunctions";
//---------------------pms------------------------------
import { FaArrowCircleRight } from "react-icons/fa";
import Chart from "react-apexcharts";
import {
  TempAnimation,
  TempAnimation2,
  DeadStockAnimation,
  LowStockAnimation,
  ReorderAnimation,
  IncreaseAnimation,
} from "@/Components/Lotties/temp";
import Lottie from "react-lottie";

function InventoryDashboardDa() {
  const { labelStyle, headingStyle } = ThemeStyle();
  const { api_UlbDashboard } = ProjectApiList();

  const navigate = useNavigate();
  const [tabIndex, settabIndex] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [agencyData, setagencyData] = useState();
  const [ulbData, setulbData] = useState();

  // get details by to update
  useEffect(() => {
    fetchUlbData();
  }, []);
  const fetchUlbData = () => {
    setisLoading(true);
    const requestBody = {
      deviceId: "dashboard",
    };
    console.log("request body category id", requestBody);
    AxiosInterceptors.post(`${api_UlbDashboard}`, requestBody, ApiHeader())
      .then(function (response) {
        console.log("ulb details", response.data.data);
        setulbData(response.data.data);
        setisLoading(false);
      })
      .catch(function (error) {
        console.log("errorrr.... ", error);
        setisLoading(false);
      });
  };
  // loader
  if (isLoading) {
    return (
      <>
        <BarLoader />
        <div className='min-h-screen'></div>
      </>
    );
  }

  // console.log("agency data", agencyData)

  // charts
  const options = {
    option: {
      chart: {
        id: "inventory-performance-chart",
        toolbar: { show: false },
      },
      xaxis: {
        categories: [
          "April",
          "May",
          "June",
          "July",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    },
    series: [
      {
        name: "Monthly Assign stocks",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 155],
      },
      {
        name: "Return stocks",
        data: [15, 70, 45, 55, 29, 65, 75, 91, 125],
      },
      {
        name: "Dead stocks",
        data: [5, 20, 25, 15, 19, 45, 15, 31, 15],
      },
    ],
  };

  //animation

  const defaultOptions1 = {
    loop: true,
    autoplay: true,
    animationData: TempAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: TempAnimation2,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const deadStockAnimation = {
    loop: true,
    autoplay: true,
    animationData: DeadStockAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const lowStockAnimation = {
    loop: true,
    autoplay: true,
    animationData: LowStockAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const reorderAnimation = {
    loop: true,
    autoplay: true,
    animationData: ReorderAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const increaseAnimation = {
    loop: true,
    autoplay: true,
    animationData: IncreaseAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <div className='container mx-auto p-4 '>
        <h1 className='font-bold  text-[2rem] pb-5'>Inventory Dashboard</h1>

        <div className='flex justify-between space-x-3'>
          <div className='bg-[#4338CA] text-white w-full rounded p-3 space-y-10 cursor-pointer'>
            <div className='flex justify-between'>
              <h1 className='font-bold'>Total Stock</h1>
              <div className='justify-end'>
                <Lottie options={increaseAnimation} height={50} width={100} />
              </div>
            </div>
            <div className='flex justify-between'>
              <h1 className=''>
                769 <span className='text-[0.8rem]'>(3%)</span>
              </h1>
              <div className='justify-end'>
                {/* <FaArrowCircleRight className="mt-2 text-[1.5rem] hover:text-blue-500" /> */}
              </div>
            </div>
          </div>

          <div className='bg-[#4338CA] text-white w-full rounded p-3 space-y-10 cursor-pointer'>
            <div className='flex'>
              <h1 className='font-bold'>Stock Movement</h1>
              <Lottie options={reorderAnimation} height={50} width={100} />
            </div>
            <div className='flex justify-between'>
              <h1 className=''>
                769 <span className='text-[0.8rem]'>(3%)</span>
              </h1>

              {/* <FaArrowCircleRight className="mt-2 text-[1.5rem] hover:text-blue-500" /> */}
            </div>
          </div>

          <div className='bg-[#4338CA] text-white w-full rounded p-3 space-y-10 cursor-pointer'>
            <div className='flex'>
              <h1 className='font-bold'>Remaining Stock</h1>
              <Lottie options={lowStockAnimation} height={50} width={100} />
            </div>
            <div className='flex justify-between'>
              <h1 className=''>
                769 <span className='text-[0.8rem]'>(3%)</span>
              </h1>
              {/* <FaArrowCircleRight className="mt-2 text-[1.5rem] hover:text-blue-500" /> */}
            </div>
          </div>

          <div className='bg-[#4338CA] text-white w-full rounded p-3 space-y-10 cursor-pointer'>
            <div className='flex'>
              <h1 className='font-bold'>Dead Stock</h1>
              <Lottie options={deadStockAnimation} height={50} width={100} />
            </div>
            <div className='flex justify-between'>
              <h1 className=''>
                769{" "}
                <spa className='text-[0.8rem]' n>
                  (3%)
                </spa>
              </h1>
              {/* <FaArrowCircleRight className="mt-2 text-[1.5rem] hover:text-blue-500" /> */}
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className='mt-10'>
          <h1 className='font-bold  text-[1.5rem] pt-5 pl-5 pb-5'>
            Inventory Performance
          </h1>
          <Chart
            options={options.option}
            series={options.series}
            type='line'
            width={1200}
            height={320}
          />

          <div className='text-[15px] p-10 space-y-2'>
            <h1 className='flex'>
              <span>
                <hr className='border-t-2 border-blue-500 w-[1.5rem] mt-1.5 mr-2  border-[5px] mx-auto' />
              </span>
              Monthly Assign stocks - XYZ Value{" "}
            </h1>

            <h1 className='flex'>
              <span>
                <hr className='border-t-2 border-green-500 w-[1.5rem] mt-2 mr-2  border-[5px] mx-auto' />
              </span>
              Return stocks - XYZ Value
            </h1>

            <h1 className='flex'>
              <span>
                <hr className='border-t-2 border-yellow-500 w-[1.5rem] mt-2 mr-2  border-[5px] mx-auto' />
              </span>
              Dead stocks - XYZ Value
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default InventoryDashboardDa;
