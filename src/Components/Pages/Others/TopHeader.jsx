import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import { FiAlertCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { contextVar } from "@/Components/context/contextVar";
import BarLoader from "@/Components/Common/Loaders/BarLoader";
import { localstorageRemoveEntire } from "@/Components/Common/localstorage";
import ulb_data from "@/Components/Common/DynamicData";
import { AiOutlineBars } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";
import PermittedModuleCard from "./PermittedModuleCard";
import { Tooltip } from "react-tooltip";
import { BsBell } from "react-icons/bs";
import NotificationComponent from "./NotificationComponent";
import { BiMenuAltLeft } from "react-icons/bi";
import { getLocalStorageItemJsonParsed } from "@/Components/Common/localstorage";

const TopHeader = (props) => {
  const [userDetailss, setuserDetails] = useState(
    getLocalStorageItemJsonParsed("userDetails")
  ); // to store user details
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [notificationState, setnotificationState] = useState(false);

  const { toggleBar, settoggleBar, userDetails } = useContext(contextVar);

  const { brand_tag, brand_logo } = ulb_data();

  const navigate = useNavigate();

  function openModal2() {
    setIsOpen2(true);
  }

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
    setIsOpen2(false);
  }
  // CALLBACK FUNCTION
  const logoutCallback = () => {
    setisLoading(false);
    localstorageRemoveEntire();
    navigate("/");
  };

  const LogOutUser = () => {
    closeModal();
    logoutCallback();
  };

  const [imgSrc, setImgSrc] = useState(userDetails?.imageUrl);

  return (
    <>
      {isLoading && <BarLoader />}
      <div className='bg-white flex flex-row justify-between px-2 sm:px-6 border shadow-sm print:hidden py-3'>
        <div className='flex gap-4'>
          <div className='flex items-center md:w-[15rem] justify-between gap-2 sm:gap-4'>
            <div className=''>
              <p className='font-semibold text-xl '>{brand_tag}</p>
              <p className='text-xs '>{userDetailss?.ulb}</p>
            </div>

            <div
              onClick={() => {
                settoggleBar(!toggleBar);
              }}
              className='ml-2'
            >
              <span className='cursor-pointer text-gray-700 text-xl'>
                <BiMenuAltLeft className='text-2xl' />
              </span>
            </div>
          </div>
          <div className='flex gap-2 items-center'>
            <div className='flex '>
              <span
                onClick={() => openModal2()}
                className='bg-gray-200 px-4 py-1 cursor-pointer hover:shadow-md flex justify-center items-center'
              >
                Modules
              </span>
            </div>
            <h1 className='font-bold text-[1.3rem]'>
              Procurement Management System
            </h1>
          </div>
        </div>
        <div className='flex items-center sm:gap-4 gap-2'>
          <span className='sm:visible flex items-center '>
            <Tooltip anchorId='logout' className='z-50' />
            <button
              id='logout'
              data-tooltip-content='Log Out'
              onClick={() => openModal()}
              className='text-2xl font-semibold bg-[#4338CA] text-white rounded p-1'
            >
              <BiLogOutCircle />
            </button>
          </span>
          <Tooltip anchorId='notification_icon' className='z-50' />
          <BsBell
            id='notification_icon'
            data-tooltip-content='Show all notifications.'
            onClick={() => setnotificationState(true)}
            className='text-3xl font-semibold bg-[#4338CA] text-white rounded p-1 cursor-pointer'
          />
        </div>
      </div>

      {/* ===========MODAL========= */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className='h-screen w-screen flex items-center justify-center'
        contentLabel='Logout Modal'
      >
        <div
          className='bg-black absolute h-screen w-screen opacity-50 z-0 '
          onClick={closeModal}
        ></div>

        <div className='border bg-white z-50 px-6 py-4 flex flex-col gap-4 animate__animated animate__slideInLeft animate__faster rounded-md'>
          <div className='flex items-center gap-6'>
            <div className='flex flex-col gap-2'>
              <span className='text-red-500  block rounded-full drop-shadow-md shadow-red-300 ml-24'>
                <FiAlertCircle size={25} />
              </span>
              <span className='text-xl font-semibold border-b pb-1 text-center'>
                Confirmation
              </span>
              <span className='text-base'>Are you sure want to log out ?</span>
            </div>
          </div>
          <div className='flex justify-end gap-2'>
            <button
              className='text-white bg-indigo-500 hover:bg-indigo-600 px-4 py-2 text-sm rounded-md'
              onClick={closeModal}
            >
              No
            </button>
            <button
              className='text-white bg-red-500 hover:bg-red-600 px-4 py-2 text-sm rounded-md'
              onClick={LogOutUser}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modalIsOpen2}
        onRequestClose={closeModal}
        className='z-20 h-screen w-screen backdrop-blur-sm flex flex-row justify-center items-center overflow-auto'
        contentLabel='Example Modal'
      >
        <PermittedModuleCard closeModuleModal={closeModal} />
      </Modal>
      {notificationState && (
        <NotificationComponent setnotificationState={setnotificationState} />
      )}
    </>
  );
};

// export default HeaderIcons
export default TopHeader;
