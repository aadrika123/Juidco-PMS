import React, { useContext, useEffect, useState, useRef } from "react";
import Modal from "react-modal";
import { FiAlertCircle, FiKey } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { contextVar } from "@/Components/context/contextVar";
import BarLoader from "@/Components/Common/Loaders/BarLoader";
import { localstorageRemoveEntire } from "@/Components/Common/localstorage";
import ulb_data from "@/Components/Common/DynamicData";
import PermittedModuleCard from "./PermittedModuleCard";
import { Tooltip } from "react-tooltip";
import NotificationComponent from "./NotificationComponent";
import ProjectApiList from "@/Components/api/ProjectApiList";
import axios from "axios";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsBell } from "react-icons/bs";
import { BiLogOutCircle } from "react-icons/bi";

const TopHeader = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [notificationState, setnotificationState] = useState(false);
  const [permittedModuleList, setpermittedModuleList] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const userDropdownRef = useRef(null);

  const { toggleBar, settoggleBar } = useContext(contextVar);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const { api_moduleList } = ProjectApiList();
  const { brand_tag } = ulb_data();

  const navigate = useNavigate();
  const userName = userDetails?.userName || "User";

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const closeModal2 = () => setIsOpen2(false);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "none",
      borderRadius: "12px",
      padding: "0",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
  };

  const logoutCallback = () => {
    setisLoading(false);
    localstorageRemoveEntire();
    navigate("/");
  };

  const LogOutUser = () => {
    setIsOpen(false);
    logoutCallback();
  };

  const fetchModuleList = () => {
    axios.post(api_moduleList, {}).then((res) => {
      setpermittedModuleList(res?.data?.data || []);
    });
  };

  useEffect(() => {
    fetchModuleList();
  }, []);

  const getUserInitials = () =>
    userDetails?.userName
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <>
      {isLoading && <BarLoader />}
      {/* ================= HEADER ================= */}
      <header className="bg-white border-b shadow-sm px-4 py-2 flex items-center justify-between print:hidden">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-[#1a4d8c] text-white flex items-center justify-center font-bold">
              UD
            </div>
            <div>
              <p className="font-semibold leading-tight">{brand_tag}</p>
              <p className="text-xs text-gray-500">Urban Development</p>
            </div>
          </div>

          {/* Sidebar Toggle */}
          <button
            onClick={() => settoggleBar(!toggleBar)}
            className="ml-2 p-2 rounded hover:bg-gray-100"
          >
            <svg
              className="w-5 h-5 text-gray-700"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M4 6h16v2H4zM4 11h16v2H4zM4 16h16v2H4z" />
            </svg>
          </button>

          {/* Modules Button */}
          <button
            onClick={() => setIsOpen2(true)}
            className="ml-4 bg-[#1a4d8c] text-white px-4 py-1.5 rounded-lg text-sm flex items-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z" />
            </svg>
            Modules
          </button>

          {/* ULB Name */}
          <div className="ml-4 flex items-center gap-2 text-gray-800 font-medium">
            <svg
              className="w-4 h-4 text-[#1a4d8c]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L3 7v2h18V7l-9-5zM5 10v9h3v-6h2v6h4v-6h2v6h3v-9H5z" />
            </svg>
            {userDetails?.ulb || "No Ulb Specified"}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {/* Notification */}

          {/* User */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}

            {/* User Profile */}
            <div className="relative" ref={userDropdownRef}>
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200  group"
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-[#1a4d8c] rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    {getUserInitials()}
                  </div>
                </div>
                <div className="hidden md:block text-left">
                  <p className="font-semibold text-gray-800">{userName}</p>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                    showUserDropdown ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* User Dropdown Menu */}
              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-fadeIn">
                  {/* Menu Items */}
                  <div className="py-2">
                    <button
                      onClick={() =>
                        window.location.replace("/settings/dashboard/home")
                      }
                      className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-blue-50 transition-colors duration-150 text-left"
                    >
                      <HiOutlineUserCircle className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-800">My Profile</p>
                        <p className="text-sm text-gray-500">
                          View your profile
                        </p>
                      </div>
                    </button>

                    <button
                      onClick={() =>
                        window.location.replace(
                          "/settings/dashboard/change-password"
                        )
                      }
                      className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-blue-50 transition-colors duration-150 text-left border-t border-gray-100"
                    >
                      <FiKey className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-800">
                          Change Password
                        </p>
                        <p className="text-sm text-gray-500">
                          Update your password
                        </p>
                      </div>
                    </button>

                    <button
                      onClick={() =>
                        window.location.replace(
                          "/settings/dashboard/notification"
                        )
                      }
                      className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-blue-50 transition-colors duration-150 text-left border-t border-gray-100"
                    >
                      <BsBell className="w-5 h-5 text-orange-600" />
                      <div>
                        <p className="font-medium text-gray-800">
                          Notifications
                        </p>
                        <p className="text-sm text-gray-500">
                          Read notifications
                        </p>
                      </div>
                      {/* {notificationCount > 0 && (
                            <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                              {notificationCount}
                            </span>
                          )} */}
                    </button>

                    <button
                      onClick={openModal}
                      className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-red-50 transition-colors duration-150 text-left border-t border-gray-100"
                    >
                      <BiLogOutCircle className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="font-medium text-gray-800">Logout</p>
                        <p className="text-sm text-gray-500">
                          Sign out from system
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      {/* ================= MODALS ================= */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Logout Confirmation"
      >
        <div className="relative p-6">
          <button
            onClick={closeModal}
            type="button"
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
              <FiAlertCircle className="h-10 w-10 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Confirm Logout
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout? You'll need to login again to
              access your account.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={closeModal}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={LogOutUser}
                className="px-6 py-2.5 bg-red-600  text-white font-medium rounded-lg hover:bg-red-700 hover:to-red-800 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={modalIsOpen2}
        onRequestClose={closeModal2}
        className="z-20 h-screen w-screen backdrop-blur-sm flex items-center justify-center overflow-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        contentLabel="Modules"
      >
        <PermittedModuleCard
          closeModuleModal={closeModal2}
          permittedModuleList={permittedModuleList}
        />
      </Modal>
    </>
  );
};

export default TopHeader;
