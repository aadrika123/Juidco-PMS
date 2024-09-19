//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash alam
//    Version - 1.0
//    Date - 21/05/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - IaInventoryDashboard
//    DESCRIPTION - IaInventoryDashboard
//////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import ApiHeader from "@/Components/api/ApiHeader";
import ProjectApiList from "@/Components/api/ProjectApiList";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
//---------------------pms------------------------------
import Chart from "react-apexcharts";
import {
  TempAnimation,
  TempAnimation2,
  DeadStockAnimation,
  LowStockAnimation,
  ReorderAnimation,
  IncreaseAnimation,
} from "@/Components/temp";
import Lottie from "react-lottie";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import { contextVar } from "@/Components/context/contextVar";
import { useContext } from "react";
import LoaderApi from "@/Components/Common/Loaders/LoaderApi";
import { format, getDay, parse } from "date-fns";

function IaInventoryDashboard() {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  //   const dayName = weekdays[getDay()];

  const { api_getiaDashboard } = ProjectApiList();

  const [isLoading, setisLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState([]);
  const [activeTab, setActiveTab] = useState("weekly");
  const [monthName, setMonthName] = useState([]);
  const [returnMonthData, setReturnMonthData] = useState([]);
  const [returnWeekData, setReturnWeekData] = useState([]);
  const [returnYearData, setReturnYearData] = useState([]);
  const [deadMonthData, setDeadMonthData] = useState([]);
  const [deadWeekData, setDeadWeekData] = useState([]);
  const [deadYearData, setDeadYearData] = useState([]);
  const [assignMonthData, setAssignMonthData] = useState([]);
  const [assignWeekData, setAssignWeekData] = useState([]);
  const [assignYearData, setAssignYearData] = useState([]);
  const [weekName, setWeekName] = useState([]);
  const [yearName, setyearName] = useState([]);

  const { titleBarVisibility } = useContext(contextVar);

  // get details by to update

  const fetchIaInventoryData = () => {
    setisLoading(true);

    AxiosInterceptors.get(`${api_getiaDashboard}`, ApiHeader())
      .then(function (response) {
        setDashboardData(response.data?.data?.graph);
        setisLoading(false);
      })
      .catch(function (error) {
        console.log("errorrr.... ", error);
        setisLoading(false);
      });
  };

  const setDataAccToActiveTab = () => {
    if (activeTab === "monthly") {
      let monthData = [];
      //setting return data
      dashboardData?.returnData[activeTab]?.map((info) => {
        const date = parse(info?.month, "yyyy-MM", new Date());
        const monthName = format(date, "MMMM");
        monthData.push(info?.count);
        console.log(monthData, "monthdata");
        setMonthName((prev) => {
          if (!prev.includes(monthName)) {
            return [...prev, monthName];
          }
          return prev;
        });
        setReturnMonthData(monthData);
      });

      //setting dead data
      dashboardData?.deadData[activeTab]?.map((info) => {
        monthData.push(info?.count);
        setDeadMonthData(monthData);
      });

      //setting assigned Data
      dashboardData?.assignedData[activeTab]?.map((info) => {
        monthData.push(info?.count);
        setAssignMonthData(monthData);
      });
    } else if (activeTab === "weekly") {
      //setting return data
      dashboardData?.returnData?.weekly?.map((info) => {
        setReturnMonthData((prev) => {
          if (prev?.length === dashboardData?.returnData?.weekly?.length) {
            return prev;
          } else {
            return [...prev, info?.count];
          }
        });

        const dayName = weekdays[getDay(info?.week)];
        setWeekName((prev) => {
          if (!prev.includes(dayName)) {
            return [...prev, dayName];
          }
          return prev;
        });
      });

      //setting dead data
      dashboardData?.deadData?.weekly?.map((info) => {
        setDeadMonthData((prev) => {
          if (prev?.length === dashboardData?.deadData?.weekly?.length) {
            return prev;
          } else {
            return [...prev, info?.count];
          }
        });
      });

      //setting assigned Data
      dashboardData?.assignedData?.weekly?.map((info) => {
        // setAssignMonthData(weekDays);
        setAssignMonthData((prev) => {
          if (prev?.length === dashboardData?.assignedData?.weekly?.length) {
            return prev;
          } else {
            return [...prev, info?.count];
          }
        });
      });
    } else if (activeTab === "yearly") {
      let monthData = [];
      //setting return data
      dashboardData?.returnData[activeTab]?.map((info) => {
        const date = parse(info?.month, "yyyy-MM", new Date());
        const monthName = format(date, "MMMM");
        monthData.push(info?.count);
        setMonthName((prev) => [...prev, monthName]);
        setReturnMonthData(monthData);
      });

      //setting dead data
      dashboardData?.deadData[activeTab]?.map((info) => {
        const date = parse(info?.month, "yyyy-MM", new Date());
        const monthName = format(date, "MMMM");
        monthData.push(info?.count);
        setMonthName((prev) => [...prev, monthName]);
        setDeadMonthData(monthData);
      });

      //setting assigned Data
      dashboardData?.assignedData[activeTab]?.map((info) => {
        const date = parse(info?.month, "yyyy-MM", new Date());
        const monthName = format(date, "MMMM");
        monthData.push(info?.count);
        setMonthName((prev) => [...prev, monthName]);
        setAssignMonthData(monthData);
      });
    }
  };
  console.log(weekName, "weekname");
  console.log(activeTab, "activeTab");
  console.log(activeTab, "activeTab");

  useEffect(() => {
    fetchIaInventoryData();
  }, []);

  useEffect(() => {
    setDataAccToActiveTab();
  }, [activeTab, dashboardData]);

  if (isLoading) {
    return (
      <>
        <LoaderApi />
        <div className='min-h-screen'></div>
      </>
    );
  }
  console.log(monthName, "monthName");
  // charts
  const options = {
    option: {
      chart: {
        id: "inventory-performance-chart",
        toolbar: { show: false },
      },
      xaxis: {
        categories:
          activeTab === "monthly"
            ? monthName
            : activeTab === "weekly"
            ? weekName
            : [],
      },
    },
    series: [
      {
        name: "Monthly Assign stocks",
        data: assignMonthData || [],
      },
      {
        name: "Return stocks",
        data: returnMonthData || [],
      },
      {
        name: "Dead stocks",
        data: deadMonthData || [],
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
      <div className=''>
        <TitleBar
          titleBarVisibility={titleBarVisibility}
          titleText={"Inventory Dashboard"}
        />
      </div>
      <div className='container mx-auto p-4 mt-6'>
        <h1 className='font-bold  text-[2rem] pb-5'>Inventory Dashboard</h1>

        <div className='flex justify-between space-x-3 gap-2'>
          <div className='bg-[#4338CA] text-white w-full rounded p-3 space-y-4 cursor-pointer flex'>
            <div className='w-2/3 h-full flex flex-col justify-between'>
              <h1 className='font-bold'>Total Stock</h1>
              <h1 className=''>
                769 <span className='text-[0.8rem]'>(3%)</span>
              </h1>
            </div>

            <div className='flex justify-top w-[55px] h-[70px] mt-1'>
              <Lottie options={increaseAnimation} className='w-full h-full' />
            </div>
          </div>

          <div className='bg-[#4338CA] text-white w-full rounded p-3 space-y-4 cursor-pointer'>
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

          <div className='bg-[#4338CA] text-white w-full rounded p-3 space-y-4 cursor-pointer'>
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

          <div className='bg-[#4338CA] text-white w-full rounded p-3 space-y-4 cursor-pointer'>
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
        <div className='mt-10 bg-white rounded-lg shadow-xl border border-blue-500'>
          <h1 className='font-bold  text-[1.5rem] pt-5 pl-5 pb-5'>
            Inventory Performance
          </h1>
          <div className=' flex justify-end'>
            <button
              className={`py-1 px-10 ${
                activeTab === "weekly"
                  ? "border-b-2 border-blue-500 text-white bg-[#4338CA]"
                  : "text-gray-500"
              } focus:outline-none flex border border-gray-300 rounded`}
              onClick={() => setActiveTab("weekly")}
            >
              weekly
            </button>

            <button
              className={`ml-2 py-1 px-10 ${
                activeTab === "monthly"
                  ? "border-b-2 border-blue-500 text-white bg-[#4338CA]"
                  : "text-gray-500"
              } focus:outline-none flex border border-gray-300 rounded`}
              onClick={() => setActiveTab("monthly")}
            >
              Monthly
            </button>

            <button
              className={`ml-2 mr-3 py-1 px-10 ${
                activeTab === "yearly"
                  ? "border-b-2 border-blue-500 text-white bg-[#4338CA]"
                  : "text-gray-500"
              } focus:outline-none flex border border-gray-300 rounded`}
              onClick={() => setActiveTab("yearly")}
            >
              Yearly
            </button>
          </div>

          {activeTab == "weekly" && (
            <>
              <div>
                <Chart
                  options={options.option}
                  series={options.series}
                  type='line'
                  style={{ width: "100%" }}
                  height={320}
                />
              </div>

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
            </>
          )}

          {activeTab == "monthly" && (
            <>
              <div className=''>
                <Chart
                  options={options.option}
                  series={options.series}
                  type='bar'
                  // style={{ width: "100%" }}
                  height={320}
                  width={500}
                />
              </div>

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
            </>
          )}
          {activeTab == "yearly" && (
            <>
              <div>
                <Chart
                  options={options.option}
                  series={options.series}
                  type='area'
                  style={{ width: "100%" }}
                  height={320}
                />
              </div>

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
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default IaInventoryDashboard;
