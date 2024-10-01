import { useState, useEffect, Fragment } from "react"; // import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import toast from "react-hot-toast";
import { BsBell } from "react-icons/bs";
import { Badge, Card, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ApiHeader from "@/Components/api/ApiHeader";
import ProjectApiList from "@/Components/api/ProjectApiList";
import { FaCircleDot } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa";
import ConfirmationModal from "@/Components/Common/Modal/ConfirmationModal";
import { format, parseISO } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

export default function NotificationSidebar() {
  const { api_fetchNotification, api_readNotification, api_replyNotification } =
    ProjectApiList();

  const navigate = useNavigate();
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [notificationData, setNotificationData] = useState();
  const [notificationCount, setNotificationCount] = useState();
  const [notificationId, setNotificationId] = useState();
  const [notifiRefresh, setNotifiRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [stockHandoverNo, setStockHandoverNo] = useState(false);

  const getNotification = () => {
    AxiosInterceptors.get(`${api_fetchNotification}`, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          setNotificationCount(response?.data);
          setNotificationData(response?.data?.data);

          // setisLoading(false);
        } else {
          // setisLoading(false);
          toast.error(response?.data?.message);
        }
      })
      .catch(function (error) {
        // toast.error("Error while fetching Notifications");
        console.log("==2 details by id error...", error);
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };

  const readNotification = (id) => {
    AxiosInterceptors.post(
      `${api_readNotification}`,
      { notification_id: id },
      ApiHeader()
    )
      .then(function (response) {
        if (response?.data?.status) {
          setNotifiRefresh((prev) => !prev);
        } else {
          toast.error(response?.data?.message);
        }
      })
      .catch(function (error) {
        toast.error("Error in updating status");
        console.log("==2 details by id error...", error);
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };

  const notifiNavigate = (status, id) => {
    readNotification(id);

    if (status == 10) {
      navigate("/sr-inventory-proposal");
    } else if (status == 14) {
      navigate("/sr-rejectedlist");
    } else if (status == 15) {
      navigate("/sr-releasedlist");
    } else if (status == 20) {
      navigate("/da-inventory-proposal");
    } else if (status == 21) {
      navigate("/inventoryAdmin-boq");
    } else if (status == 22) {
      navigate("/da-pre-tendring");
    } else if (status == 30) {
      navigate("/accountant-boq");
    } else if (status == 31) {
      navigate("/accountant-boq");
    } else if (status == 32) {
      navigate("/acc-pre-tendring");
    } else if (status == 11) {
      navigate("/sr-post-inventory");
    } else if (status == 12) {
      navigate("/sr-received-inventory");
    } else if (status == 23) {
      navigate("/da-post-precurement");
    } else if (status == 24) {
      navigate("/da-received-inventory");
    } else {
    }
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const postNotificationAcceptChange = async () => {
    setIsLoading(true);
    let body = {
      stock_handover_no: stockHandoverNo,
      approve: 2,
    };

    AxiosInterceptors.post(`${api_replyNotification}`, body, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          readNotification(notificationId);
          toast.success("Successfully sent the response");
        } else {
          setIsLoading(false);
          toast.error("Error in sending response to Inventory Admin.");
        }
      })
      .catch(function (error) {
        console.log(error, "errrrrrrrrrrrrrrrrrrr");
        setIsLoading(false);
        toast.error(error?.response?.data?.error);
      })
      .finally(() => {
        setIsLoading(false);
        setConfirmationModalOpen(false);
      });
  };

  const postNotificationRejectChange = async () => {
    setIsLoading(true);
    let body = {
      stock_handover_no: stockHandoverNo,
      approve: -2,
    };

    AxiosInterceptors.post(`${api_replyNotification}`, body, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          readNotification(notificationId);
          toast.success("Successfully sent the response");
        } else {
          setIsLoading(false);
          toast.error("Error in sending response to Inventory Admin.");
        }
      })
      .catch(function (error) {
        console.log(error, "errrrrrrrrrrrrrrrrrrr");
        setIsLoading(false);
        toast.error(error?.response?.data?.error);
      })
      .finally(() => {
        setIsLoading(false);
        setConfirmationModalOpen(false);
      });
  };

  useEffect(() => {
    getNotification();
  }, [notifiRefresh]);

  if (confirmationModalOpen) {
    return (
      <>
        <ConfirmationModal
          confirmationHandler={postNotificationAcceptChange}
          handleCancel={postNotificationRejectChange}
          cancelHandler={() => setConfirmationModalOpen(false)}
          message={
            "The requested stock item is not available in Inventory. Do you still want to proceed?"
          }
          sideMessage={"*On ignoring, the stock request will be canceled. "}
          loadingState={isLoading}
          saveBtnLabel={"Confirm"}
          cancelBtnLabel={"Ignore"}
        />
      </>
    );
  }

  const list = (anchor) => (
    <>
      <div className='flex justify-between  bg-white p-2 sticky top-0 border-b'>
        <h1 className='text-black font-semibold text-xl'>Notification</h1>
        <div className='rounded-s-lg  bg-red-500 pl-2 pr-2 text-white'>
          <h1 className=''>{notificationCount?.totalCount}</h1>
        </div>
      </div>

      <Stack
        sx={{
          width: anchor === "top" || anchor === "bottom" ? "auto" : 350,
          backgroundColor: "white",
          height: "100%",
          padding: "5px",
          borderBottom: "2px",
        }}
        spacing={1}
        role='presentation'
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <div className='flex flex-col space-y-2 '>
          {notificationData?.map((data, index) => (
            <Card
              key={index}
              sx={{
                backgroundColor: data?.isSeen == false ? "white" : "#e0dcf4",
                boxShadow: "none",
                transition: "background-color 0.3s ease",
                "&:hover": {
                  backgroundColor: "#e0dcf4",
                },
              }}
              className='p-3 cursor-pointer '
              onClick={() => {
                if (data?.destination === 0 && !data?.isSeen) {
                  const handover_no =
                    data?.description?.match(/[A-Z0-9]{14}/)[0];
                  setStockHandoverNo(handover_no);
                  setConfirmationModalOpen(true);
                  setNotificationId(data?.id);
                } else {
                  notifiNavigate(data?.destination, data?.id);
                }
              }}
            >
              <div className=''>
                <div className='text-blue-700 flex space-x-1 pb-1'>
                  <div className='flex justify-between items-center'>
                    <FaCircleDot className='text-xs mt-[1.5px]' />
                    <p className='text-xs pr-1'>{data?.from || ""}</p>
                    <p className='text-xs'>
                      <FaCircle className='text-[5px] mt-[5px] text-black' />
                    </p>
                    <p className='text-sm text-gray-600 pt-[1px] pl-1'>
                      {/* {console.log(
                        formatInTimeZone(
                          parseISO(data?.createdAt),
                          timeZone,
                          "HH:mm:ss"
                        )
                      )} */}
                      {/* {format(data?.createdAt, "yyyy-MM-dd")} */}
                      {format(parseISO(data?.createdAt), "dd-MM-yyyy")}
                    </p>
                  </div>
                </div>
                <h1 className=' text-black'>{data?.title}</h1>
                <p className='text-xs pt-2 text-black mb-2 '>
                  {data?.description}
                </p>
                {data?.destination === 0 && !data?.isSeen && (
                  <div className='rounded-md  bg-orange-400 text-white px-1 w-fit'>
                    <h1 className='text-[12px]'>
                      {data?.destination === 0 &&
                        "Need Confirmation. Click on Notification."}
                    </h1>
                  </div>
                )}
                {/* <hr className="" /> */}
              </div>
            </Card>
          ))}
        </div>
      </Stack>
    </>
  );

  return (
    <>
      {["right"].map((anchor) => (
        <Fragment key={anchor}>
          <Badge
            color='error'
            badgeContent={notificationCount?.unseenCount || 0}
          >
            <BsBell
              onClick={toggleDrawer(anchor, true)}
              className='text-3xl font-semibold bg-[#4338CA] text-white rounded-md p-1 cursor-pointer '
              data-tooltip-content='Show all notifications.'
            >
              {anchor}
            </BsBell>
          </Badge>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            // styles={{backgroundColor:"blue"}}
          >
            {list(anchor)}
          </Drawer>
        </Fragment>
      ))}
    </>
  );
}
