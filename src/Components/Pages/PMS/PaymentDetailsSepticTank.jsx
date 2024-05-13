//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash Alam
//    Version - 1.0
//    Date - 29/09/2023
//    Revision - 1
//    Project - JUIDCO
//    Component  - PaymentDetailsSepticTank
//    DESCRIPTION - PaymentDetailsSepticTank
//    FUNCTIONS - submitForm,        
//    API USED  - api_getSepticTankDetailsById,  api_getSepticTankOrderIdForPayment    
//////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
// import RazorpayPaymentScreen from '../../Components/RazorpayPaymentScreen';
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ApiHeader from "@/Components/api/ApiHeader";
import { useState } from 'react';
import ProjectApiList from "@/Components/api/ProjectApiList";
// import WaterTankerApiList from '../WaterTankerApiList'
import Modal from 'react-modal';
import ThemeStyleTanker from '@/Components/Common/ThemeStyleTanker'



const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        background: "white",
        border: "none",
    },
};

function PaymentDetailsSepticTank(props) {

    // ══════════════════════════════║🔰 CUSTOM STYLE 🔰║═══════════════════════════════════
    const { labelStyle, formStyle } = ThemeStyleTanker()

    // ══════════════════════════════║🔰 API USED 🔰║═══════════════════════════════════
    // const { api_getSepticTankDetailsById, api_getSepticTankOrderIdForPayment } = AdvertisementApiList()
    const { api_getSepticTankDetailsById, api_getSepticTankOrderIdForPayment } = ProjectApiList()

    const [orderId, setorderId] = useState()
    const [paymentDetails, setpaymentDetails] = useState()
    const navigate = useNavigate()
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)
    const afterOpenModal = () => { }


    useEffect(() => {
        if (props.openPaymentModal > 0) setIsOpen(true);
    }, [props.openPaymentModal]);

    // ══════════════════════════════║🔰 activating notification 🔰║═══════════════════════════════════
    const notify = (toastData, type) => {
        toast.dismiss();
        if (type == 'success') {
            toast.success(toastData)
        }
        if (type == 'error') {
            toast.error(toastData)
        }
    };

    // ══════════════════════════════║🔰 function to get details by id 🔰║═══════════════════════════════════
    useEffect(() => {
        fetchDetailsById()
    }, [props?.applicationId])

    const fetchDetailsById = () => {
        const requestBody = {
            applicationId: props?.applicationId
        }
        // console.log("request body category id", requestBody)
        AxiosInterceptors.post(`${api_getSepticTankDetailsById}`, requestBody, ApiHeader())
            .then(function (response) {
                console.log('details by id', response.data.data)
                setpaymentDetails(response.data.data)
            })
            .catch(function (error) {
                console.log('errorrr.... ', error);
            })
    }

    // ══════════════════════════════║🔰PAYMENT METHOD🔰║═══════════════════════════════════
    const dreturn = (data) => {   // In (DATA) this function returns the Paymen Status, Message and Other Response data form Razorpay Server
        console.log('Payment Status =>', data)
        if (data?.status == true) {
            // navigate(`/paymentScreen/${data.data.razorpay_payment_id}/${props?.applicationDetails?.workflow_id}`)
            navigate(`/paymentSuccess-septicTank/${data.data.razorpay_payment_id}`)
            notify("Payment Successfull", "success")
        } else {
            toast.error('Payment failed....')
            notify("Payment Failed", "error")
            navigate('/paymentFailedTanker')
        }
    }


    // ══════════════════════════════║🔰function to pay🔰║═══════════════════════════════════
    const payNow = (e) => {
        // console.log("payment id on click pay", e.target.value)
        let applicationId = e.target.value


        let formUrl
        formUrl = api_getSepticTankOrderIdForPayment
        const requestBody = {
            applicationId: applicationId
        }
        AxiosInterceptors.post(`${formUrl}`, requestBody, ApiHeader())
            .then(function (response) {
                // console.log('generate order id', response.data)
                if (response.data.status == true) {
                    console.log("OrderId Generated True", response.data)
                    console.log("application id =======================>>", applicationId)

                    RazorpayPaymentScreen(response.data.data, dreturn)  //Send Response Data as Object (amount, orderId, ulbId, departmentId, applicationId, workflowId, userId, name, email, contact) will call razorpay payment function to show payment popup     
                }
                else {

                }
                setorderId(response)
            })
            .catch(function (error) {
                alert("Backend Server error. Unable to Generate Order Id");
                // console.log("ERROR :-  Unable to Generate Order Id ", err)
            })
    }
    return (
        <>
            <div className={`${formStyle} bg-white w-1/3 mx-auto flex flex-col `}>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div class={`${formStyle}`}>
                        <div class="relative overflow-hidden">
                            <div class="absolute inset-0 hover:bg-white opacity-0 transition duration-700 hover:opacity-10"></div>
                            <img className="max-w-full h-64 mx-auto animate-wiggle p-12 " src="https://img.freepik.com/free-vector/hand-holding-phone-with-credit-card-screen-man-making-purchase-shopping-paying-online-using-banking-app-flat-vector-illustration-transaction-e-commerce-concept_74855-26014.jpg?w=1380&t=st=1686898919~exp=1686899519~hmac=4b0ddb44860ec647fa33a1a0416ea0c1cc8167693a13fdba3f09058d099f0e76" alt="alt title" />

                        </div>
                        <div class=" flex-1">
                            <div class="mb-2">
                                <h3 class="text-xl  text-center mb-4 text-gray-500 font-openSans font-semibold">Booking no. - {paymentDetails?.booking_no}</h3>
                                <h3 class="text-xl  text-center mb-2 text-[#40AA15] font-openSans font-semibold ">Amount - Rs.{paymentDetails?.payment_amount} </h3>
                            </div>
                        </div>
                        <div>
                            <div className='valid-form flex flex-wrap flex-row mt-4 text-center'>
                                <div className='form-group flex-shrink max-w-full space-x-2 px-4 w-full md:w-1/2 mb-4'>
                                    <label className={`text-md font-bold text-gray-500 inline-block `}>Name</label>
                                    <label className={`${labelStyle} inline-block w-full relative`}>{paymentDetails?.applicant_name}</label>
                                </div>
                                <div className='form-group flex-shrink max-w-full mx-auto space-x-2 px-4 w-full md:w-1/2 mb-4'>
                                    <label className={`text-md font-bold text-gray-500 inline-block`}>Capacity </label>
                                    <label className={`${labelStyle} inline-block w-full relative`}>{paymentDetails?.capacity} (kl)</label>
                                </div>
                            </div>
                            <div className='valid-form flex flex-wrap flex-row  text-center'>
                                <div className='form-group flex-shrink max-w-full mx-auto space-x-2 px-4 w-full md:w-1/2 mb-4'>
                                    <label className={`text-md font-bold text-gray-500 inline-block`}>Email </label>
                                    <label className={`${labelStyle} inline-block w-full relative`}>{paymentDetails?.email}</label>
                                </div>
                                <div className='form-group flex-shrink max-w-full mx-auto space-x-2 px-4 w-full md:w-1/2 mb-4'>
                                    <label className={`text-md font-bold text-gray-500 inline-block`}>Mobile no. </label>
                                    <label className={`${labelStyle} inline-block w-full relative`}>{paymentDetails?.mobile}</label>
                                </div>
                            </div>
                        </div>
                        <div class=" flex-1">
                            <div class=" text-center mt-8 mb-16">
                                <button value={paymentDetails?.applicationId} className={`bg-[#1A4D8C] text-sm px-8 py-2 text-white  rounded leading-5 shadow-lg`} onClick={payNow}>Pay Now</button>
                            </div>

                        </div>
                    </div>
                </Modal>
            </div>
        </>
    )
}

export default PaymentDetailsSepticTank