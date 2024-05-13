//////////////////////////////////////////////////////////////////////////////////////
//    Author - Dipu Singh
//    Version - 1.0
//    Date - 06 Dec 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - 
//    DESCRIPTION - 
//////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { GrClose } from "react-icons/gr";
import { HiCurrencyRupee } from "react-icons/hi";
import RazorpayPaymentScreen from "../../../Components/RazorpayPaymentScreen";
// import { HEADER } from "../../Trade/tradeComponent/TradeApiListFile";
import axios from "axios";
// import WaterApiList from '../../../Components/ApiList/WaterApiList';
// import imgSucess from '../../Water/success.png'
import { useNavigate } from "react-router-dom";
// import AxiosInterceptors from "../../../Components/GlobalData/AxiosInterceptors";
import PetRegAPIList from "../../../Components/ApiList/PetRegAPIList";
import AxiosInterceptors from "../../../Components/ApiList/AxiosInterceptors";


const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        background: "transparent",
        border: "none",
    },
};

function PetPaymentModal(props) {
    // Modal.setAppElement('#yourAppElement');
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [paymentStatus, setPaymentStatus] = useState(false)
    const [transData, setTransData] = useState()

    // const { api_rzpWaterOrderId, api_getTranNo } = WaterApiList();

    const {api_rzpWaterOrderId, api_getTranNo, header } = PetRegAPIList();

    const navigate = useNavigate()

    const paymentData = props.paymentData;
    console.log("paymentData======", paymentData)

    useEffect(() => {
        if (props.openPaymentModal > 0) setIsOpen(true);
    }, [props.openPaymentModal]);

    function afterOpenModal() { }

    function closeModal() {
        setIsOpen(false);
        setPaymentStatus(false);
    }


    const dreturn = (data) => {   // In (DATA) this function returns the Paymen Status, Message and Other Response data form Razorpay Server
        console.log('Payment Status =>', data)
        props?.refechList()
        if (data.status == true) {
            setPaymentStatus(true)
            const payload = {
                "orderId": data.data.razorpay_order_id,
                "paymentId": data.data.razorpay_payment_id
            }

            AxiosInterceptors.post(api_getTranNo, payload, header)
                .then((res) => {
                    console.log("Data after payment success by OrderId and PaymetnID", res)
                    if (res.data.status == true) {
                        setTransData(res.data.data)
                    }
                })
                .catch((err) => console.log("Exception/Error while fetching by OrderiD and Paymetn ID", err))
        }
    }


    const payNow = () => {

        setPaymentStatus(true)

        return

        const payload = {
            "id": paymentData?.connectionCharges?.applicationId,
            "applycationType": paymentData?.connectionCharges?.type
        }
        console.log("Payment Button Clicked..", payload)

        AxiosInterceptors.post(api_rzpWaterOrderId, payload, header)
            .then((res) => {
                console.log("Oder ID Generated", res)

                if (res.data.status == true) {
                    RazorpayPaymentScreen(res.data.data, dreturn)
                }
            })
            .catch((err) => console.log("Error genrating order id", err))
    }

    return (
        <div className="">
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div >
                    {paymentStatus ?
                        <div className="bg-green-200 shadow-2xl border border-sky-200 p-5 m-5 rounded-md">
                            <div onClick={closeModal} className="absolute cursor-pointer bg-green-100 hover:bg-gray-300 p-1 rounded-md"><GrClose /> </div>
                            <div className="flex justify-center">
                                {/* <img src={imgSucess} className="h-20" alt="" srcset="" /> */}
                            </div>
                            <div className='py-1 pl-3 font-semibold text-center text-2xl text-gray-800'> Payment Completed Successfully </div>
                            <p className="text-center"><span className="text-base"> Payment Transaction No</span> <span className="font-bold text-blue-700 text-xl">{transData?.transectionNo}</span></p>
                            <p className="border-b border-gray-300 mx-10 py-1"></p>
                            <div className='grid grid-cols-12 px-8 py-3 leading-8 space-x-8 text-sm'>
                                <div className='md:col-span-6 col-span-12'>
                                    <div className='grid grid-cols-12'>
                                        <div className='col-span-6 font-semibold'>
                                            <p>Application No</p>
                                            <p>Connection Type</p>
                                        </div>
                                        <div className='col-span-6 ml-3'>
                                            <p>{transData?.applicationNo}</p>
                                            <p>{transData?.tranType}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='md:col-span-6 col-span-12'>
                                    <div className='grid grid-cols-12'>
                                        <div className='col-span-6 font-semibold'>
                                            <p>Amount</p>
                                            <p>Payment Date</p>
                                        </div>
                                        <div className='col-span-6'>
                                            <p>{transData?.amount}</p>
                                            <p>{transData?.transectionDate}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-span-12 md:mt-4 mt-10'>
                                    <div className='flex justify-center'>
                                        <button onClick={closeModal} className='mx-2 bg-sky-600 hover:bg-sky-700 transition duration-200 hover:scale-105 font-normal text-white px-6 py-1 text-sm rounded-sm shadow-xl'>Dashboard</button>
                                        <button onClick={() => navigate(`/waterConnReceipt/${transData?.transectionNo}`)} className='mx-2 bg-indigo-600 hover:bg-indigo-700 transition duration-200 hover:scale-105 font-normal text-white px-4 py-2 text-sm  rounded-sm shadow-xl'>View Receipt</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : <div className="bg-sky-200 shadow-2xl border border-red-200 p-5 m-5 rounded-md">
                            <div className=' border-b-2 py-1 pl-3 font-semibold border-red-400 flex'><HiCurrencyRupee size={20} className='mt-0.5 mr-1' />Make Payment </div>
                            <div className='grid grid-cols-12 px-8 py-3 text-sm'>

                                <div className='mr-2 md:col-span-7 col-span-12'>
                                    <div className="border border-gray-500 p-2 rounded shadow-md bg-lime-100 space-y-0">
                                        <p>Application No.</p>
                                        <p className="font-semibold text-2xl">{paymentData?.connectionCharges?.applicationNo}</p>
                                    </div>
                                </div>

                                <div className='ml-2 md:col-span-5 col-span-12'>
                                    <div className="border border-gray-500 p-2 rounded shadow-md bg-lime-100">
                                        <p>Amount</p>
                                        <p className="font-semibold"> <span className="text-lg">₹</span> <span className="text-2xl text-center">{paymentData?.connectionCharges?.amount || "N/A"}</span></p>
                                    </div>
                                </div>

                                <div className='md:col-span-12 col-span-12 mt-5'>
                                    <div className="text-center border border-gray-300 bg-indigo-100 px-2 rounded">
                                        <p>Amount Breakup</p>
                                        <div className="text-left">
                                            <p>Payment For : {paymentData?.connectionCharges?.charge_category}</p>
                                            <p>Connection Fee : ₹ {paymentData?.connectionCharges?.conn_fee}</p>
                                            <p>Penalty : ₹ {paymentData?.connectionCharges?.penalty}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className='md:col-span-12 col-span-12 mt-5'>
                                    <div className="text-center border border-gray-300 bg-indigo-100 px-2 rounded">
                                        <p>Note : You can pay using Card / UPI / Netbanking / Wallet etc.</p>
                                    </div>
                                </div>

                                <div className='col-span-12 md:mt-4 mt-10'>
                                    <div className='flex justify-center'>
                                        <button onClick={closeModal} className='mx-3 bg-red-600 hover:bg-red-700 transition duration-200 hover:scale-105 font-normal text-white px-6 py-2 text-sm rounded-sm shadow-xl'>Cancel</button>
                                        <button onClick={payNow} className='mx-3 bg-indigo-600 hover:bg-indigo-700 transition duration-200 hover:scale-105 font-normal text-white px-5 py-2 text-sm  rounded-sm shadow-xl'>Pay Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </Modal>
        </div>
    );
}

// ReactDOM.render(<App />, appElement);

export default PetPaymentModal;
