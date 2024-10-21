//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash alam
//    Version - 1.0
//    Date - 21/05/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - DinventoryDashboard
//    DESCRIPTION - DinventoryDashboard
//////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import ApiHeader from "@/Components/api/ApiHeader";
import ProjectApiList from "@/Components/api/ProjectApiList";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import Chart from "react-apexcharts";
import employeeService from "@/Components/Lotties/Emploee_Service";
import serviceReq from "@/Components/Lotties/Service _Request";
import approved from "@/Components/Lotties/Total_Approved";
import count from "@/Components/Lotties/Count";
import Lottie from "react-lottie";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import { contextVar } from "@/Components/context/contextVar";
import { useContext } from "react";
import LoaderApi from "@/Components/Common/Loaders/LoaderApi";
import { format, getDay, parse } from "date-fns";

function DinventoryDashboard() {
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

  const { api_getddDashboard } = ProjectApiList();

  const [isLoading, setisLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState([]);
  const [dashboardCountData, setDashboardCountData] = useState({});
  const [activeTab, setActiveTab] = useState("weekly");
  const [monthName, setMonthName] = useState([]);
  const [returnData, setReturnData] = useState([]);
  const [deadData, setDeadData] = useState([]);
  const [assignData, setAssignData] = useState([]);
  const [weekName, setWeekName] = useState([]);
  const [yearName, setyearName] = useState([]);

  const { titleBarVisibility } = useContext(contextVar);

  // get details by to update

  const fetchIaInventoryData = () => {
    setisLoading(true);

    AxiosInterceptors.get(`${api_getddDashboard}`, ApiHeader())
      .then(function (response) {
        setDashboardData(response.data?.data?.graph);
        setDashboardCountData(response.data?.data?.counts);
        setisLoading(false);
      })
      .catch(function (error) {
        console.log("errorrr.... ", error);
        setisLoading(false);
      });
  };

  //setting data for all for graph
  const setDataAccToActiveTab = () => {
    if (activeTab === "monthly") {
      let returnData = [];
      let assignData = [];
      let deadData = [];
      //setting return data
      dashboardData?.returnData?.monthly?.map((info) => {
        const date = parse(info?.month, "yyyy-MM", new Date());
        const monthName = format(date, "MMMM");
        returnData.push(info?.count);
        setMonthName((prev) => {
          if (!prev.includes(monthName)) {
            return [...prev, monthName];
          }
          return prev;
        });

        // setReturnData(monthData);
        setReturnData((prev) => {
          if (
            returnData?.length === dashboardData?.returnData?.monthly?.length
          ) {
            return returnData;
          } else {
            return [...returnData];
          }
        });
      });

      //setting dead data
      dashboardData?.deadData?.monthly?.map((info) => {
        deadData.push(info?.count);
        setDeadData((prev) => {
          if (deadData?.length === dashboardData?.deadData?.monthly?.length) {
            return deadData;
          } else {
            return [...deadData];
          }
        });
      });

      //setting assigned Data
      dashboardData?.assignedData?.monthly?.map((info) => {
        assignData.push(info?.count);
        setAssignData((prev) => {
          if (
            assignData?.length === dashboardData?.assignedData?.monthly?.length
          ) {
            return assignData;
          } else {
            return [...assignData];
          }
        });
      });
    } else if (activeTab === "weekly") {
      let returnData = [];
      let assignData = [];
      let deadData = [];
      //setting return data
      dashboardData?.returnData?.weekly?.map((info) => {
        returnData.push(info?.count);
        setReturnData((prev) => {
          if (
            returnData?.length === dashboardData?.returnData?.weekly?.length
          ) {
            return returnData;
          } else {
            return [...returnData];
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
        deadData.push(info?.count);
        setDeadData((prev) => {
          if (deadData?.length === dashboardData?.deadData?.weekly?.length) {
            return deadData;
          } else {
            return [...deadData];
          }
        });
      });

      //setting assigned Data
      dashboardData?.assignedData?.weekly?.map((info) => {
        assignData.push(info?.count);
        setAssignData((prev) => {
          if (
            assignData?.length === dashboardData?.assignedData?.weekly?.length
          ) {
            return assignData;
          } else {
            return [...assignData];
          }
        });
      });
    } else if (activeTab === "yearly") {
      let returnData = [];
      let assignData = [];
      let deadData = [];
      //setting return data
      dashboardData?.returnData?.yearly?.map((info) => {
        setyearName((prev) => {
          if (!prev.includes(info?.year)) {
            return [...prev, info?.year];
          }
          return prev;
        });

        returnData.push(info?.count);
        setReturnData((prev) => {
          if (
            returnData?.length === dashboardData?.returnData?.yearly?.length
          ) {
            return returnData;
          } else {
            return [...returnData];
          }
        });
      });

      //setting dead data
      dashboardData?.deadData?.yearly?.map((info) => {
        deadData.push(info?.count);
        setDeadData((prev) => {
          if (deadData?.length === dashboardData?.deadData?.yearly?.length) {
            return deadData;
          } else {
            return [...deadData];
          }
        });
      });

      //setting assigned Data
      dashboardData?.assignedData?.yearly?.map((info) => {
        assignData.push(info?.count);
        setAssignData((prev) => {
          if (
            assignData?.length === dashboardData?.assignedData?.yearly?.length
          ) {
            return assignData;
          } else {
            return [...assignData];
          }
        });
      });
    }
  };

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
            : activeTab === "yearly"
            ? yearName
            : [],
      },
    },
    series: [
      {
        name: "Assigned stocks",
        data: assignData || [],
      },
      {
        name: "Return stocks",
        data: returnData || [],
      },
      {
        name: "Dead stocks",
        data: deadData || [],
      },
    ],
  };

  //lotties animation
  const employeeServiceAnimation = {
    loop: true,
    autoplay: true,
    animationData: employeeService,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const serviceReqAnimation = {
    loop: true,
    autoplay: true,
    animationData: serviceReq,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const approvedAnimation = {
    loop: true,
    autoplay: true,
    animationData: approved,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const countAnimation = {
    loop: true,
    autoplay: true,
    animationData: count,
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
          <div className='bg-[#4338CA] text-white w-full rounded p-3 space-y-4 cursor-pointer'>
            <div className='flex'>
              <h1 className='font-bold'>Total Approved Stock Request</h1>
              <Lottie options={approvedAnimation} height={48} width={70} />
            </div>
            <div className='flex justify-between'>
              <h1 className=''>
                {dashboardCountData?.totalApprovedStockReq || 0}
              </h1>
            </div>
          </div>

          <div className='bg-[#4338CA] text-white w-full rounded p-3 space-y-4 cursor-pointer'>
            <div className='flex'>
              <h1 className='font-bold'>Approved Service Requests</h1>
              <Lottie options={serviceReqAnimation} height={52} width={76} />
            </div>
            <div className='flex justify-between'>
              <h1 className=''>
                {dashboardCountData?.totalApprovedServiceReq || 0}{" "}
              </h1>
            </div>
          </div>

          <div className='bg-[#4338CA] text-white w-full rounded p-3 space-y-4 cursor-pointer'>
            <div className='flex'>
              <h1 className='font-bold'>Employee Approved Stock Requests</h1>
              <Lottie
                options={employeeServiceAnimation}
                height={52}
                width={76}
              />
            </div>
            <div className='flex justify-between'>
              <h1 className=''>
                {dashboardCountData?.totalEmpApprovedServiceReq || 0}{" "}
              </h1>
            </div>
          </div>

          <div className='bg-[#4338CA] text-white w-full rounded p-3 space-y-4 cursor-pointer'>
            <div className='flex'>
              <h1 className='font-bold'>Total Handover</h1>
              <Lottie options={countAnimation} height={90} width={100} />
            </div>
            <div className='flex justify-between'>
              <h1 className=''>
                {dashboardCountData?.TotalHandoverCount || 0}
              </h1>
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
            </>
          )}

          {activeTab == "monthly" && (
            <>
              <div className=''>
                <Chart
                  options={options.option}
                  series={options.series}
                  type='bar'
                  style={{ width: "100%" }}
                  height={320}
                  //   width={500}
                />
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
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default DinventoryDashboard;
