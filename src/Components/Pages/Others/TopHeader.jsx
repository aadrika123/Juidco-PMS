import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import { FiAlertCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { contextVar } from "@/Components/context/contextVar";
import BarLoader from "@/Components/Common/Loaders/BarLoader";
import { localstorageRemoveEntire } from "@/Components/Common/localstorage";
import ulb_data from "@/Components/Common/DynamicData";
import { BiLogOutCircle } from "react-icons/bi";
import PermittedModuleCard from "./PermittedModuleCard";
import { Tooltip } from "react-tooltip";
import { BiMenuAltLeft } from "react-icons/bi";
import { getLocalStorageItemJsonParsed } from "@/Components/Common/localstorage";
import NotificationSidebar from "./SideBar/NotificationSidebar";
import ProjectApiList from "@/Components/api/ProjectApiList";
import axios from "axios";
import { RiLockPasswordLine } from "react-icons/ri";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import CryptoJS from "crypto-js";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ApiHeader from "@/Components/api/ApiHeader";

const TopHeader = (props) => {
  const [userDetailss, setuserDetails] = useState(
    getLocalStorageItemJsonParsed("userDetails")
  ); // to store user details
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const { toggleBar, settoggleBar, userDetails } = useContext(contextVar);
  const [permittedModuleList, setpermittedModuleList] = useState([])
  const { brand_tag } = ulb_data();
  const { api_moduleList, api_ChangePassword } = ProjectApiList();
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
    setChangePasswordModal(false);
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

  const fetchModuleList = () => {
    axios
     .post(api_moduleList, {})
     .then((res) => {
      console.log("module list: ", res);
      setpermittedModuleList(res?.data?.data);
     });
   };
  
   useEffect(() => {
    fetchModuleList();
    setIsOpen(false);
   }, []);

  function encryptPassword(plainPassword) {
    const secretKey =
      "c2ec6f788fb85720bf48c8cc7c2db572596c585a15df18583e1234f147b1c2897aad12e7bebbc4c03c765d0e878427ba6370439d38f39340d7e";

    const key = CryptoJS.enc.Latin1.parse(
      CryptoJS.SHA256(secretKey).toString(CryptoJS.enc.Latin1)
    );

    const ivString = CryptoJS.SHA256(secretKey).toString().substring(0, 16);
    const iv = CryptoJS.enc.Latin1.parse(ivString);

    const encrypted = CryptoJS.AES.encrypt(plainPassword, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
  }

  const changePasswordFormik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Old password is required"),
      newPassword: Yup.string().min(6, "Password must be at least 6 characters").required("New password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values) => {
      const payload = {
        password: encryptPassword(values.oldPassword),
        newPassword: encryptPassword(values.newPassword),
      };
      
      AxiosInterceptors.post(api_ChangePassword, payload, ApiHeader())
        .then((response) => {
          if (response.data.status) {
            toast.success("Password changed successfully");
            setChangePasswordModal(false);
            changePasswordFormik.resetForm();
          } else {
            toast.error(response.data.message || "Failed to change password");
          }
        })
        .catch((error) => {
          toast.error("Error changing password");
          console.error(error);
        });
    },
  });
  
  

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
            <Tooltip anchorId='change-password' className='z-50' />
            <button
              id='change-password'
              data-tooltip-content='Change Password'
              onClick={() => setChangePasswordModal(true)}
              className='text-2xl font-semibold bg-[#323fb3] text-white rounded-md p-1'
            >
              <RiLockPasswordLine />
            </button>
          </span>
          <span className='sm:visible flex items-center '>
            <Tooltip anchorId='logout' className='z-50' />
            <button
              id='logout'
              data-tooltip-content='Log Out'
              onClick={() => openModal()}
              className='text-2xl font-semibold bg-[#4338CA] text-white rounded-md p-1'
            >
              <BiLogOutCircle />
            </button>
          </span>
          <Tooltip anchorId='notification_icon' className='z-50' />

          <NotificationSidebar />
        </div>
      </div>

      {/* =========== MODAL========= */}
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
        {/* <PermittedModuleCard closeModuleModal={closeModal} /> */}
        <PermittedModuleCard closeModuleModal={closeModal} permittedModuleList={permittedModuleList}/>
      </Modal>

      {/* Change Password Modal */}
      <Modal
        isOpen={changePasswordModal}
        onRequestClose={closeModal}
        className='h-screen w-screen flex items-center justify-center'
        contentLabel='Change Password Modal'
      >
        <div
          className='bg-black absolute h-screen w-screen opacity-50 z-0'
          onClick={closeModal}
        ></div>

        <div className='border bg-white z-50 px-6 py-4 flex flex-col gap-4 animate__animated animate__slideInLeft animate__faster rounded-md w-96'>
          <div className='text-center'>
            <h2 className='text-xl font-semibold border-b pb-2'>Change Password</h2>
          </div>
          
          <form onSubmit={changePasswordFormik.handleSubmit} className='flex flex-col gap-4'>
            <div>
              <label className='block text-sm font-medium mb-1'>Old Password</label>
              <input
                type='password'
                {...changePasswordFormik.getFieldProps('oldPassword')}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              {changePasswordFormik.touched.oldPassword && changePasswordFormik.errors.oldPassword && (
                <span className='text-red-500 text-xs'>{changePasswordFormik.errors.oldPassword}</span>
              )}
            </div>
            
            <div>
              <label className='block text-sm font-medium mb-1'>New Password</label>
              <input
                type='password'
                {...changePasswordFormik.getFieldProps('newPassword')}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              {changePasswordFormik.touched.newPassword && changePasswordFormik.errors.newPassword && (
                <span className='text-red-500 text-xs'>{changePasswordFormik.errors.newPassword}</span>
              )}
            </div>
            
            <div>
              <label className='block text-sm font-medium mb-1'>Confirm Password</label>
              <input
                type='password'
                {...changePasswordFormik.getFieldProps('confirmPassword')}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              {changePasswordFormik.touched.confirmPassword && changePasswordFormik.errors.confirmPassword && (
                <span className='text-red-500 text-xs'>{changePasswordFormik.errors.confirmPassword}</span>
              )}
            </div>
            
            <div className='flex justify-end gap-2 mt-4'>
              <button
                type='button'
                onClick={closeModal}
                className='px-4 py-2 text-sm bg-gray-500 text-white rounded-md hover:bg-gray-600'
              >
                Cancel
              </button>
              <button
                type='submit'
                className='px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600'
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

// export default HeaderIcons
export default TopHeader;
