import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import { GrFormClose } from "react-icons/gr";
import { GrClose } from "react-icons/gr";
import { HiCurrencyRupee } from "react-icons/hi";
import { FiUpload } from 'react-icons/fi';
import axios from "axios";
// import { HEADER } from "../../Trade/tradeComponent/TradeApiListFile";
// import WaterApiList from "../../../Components/ApiList/WaterApiList";
// import { contextVar } from "../../../Components/ContextVar";
// import AxiosInterceptors from "../../../Components/GlobalData/AxiosInterceptors";
import uploadImg from "./upload.gif"
import PetRegAPIList from "../../../Components/ApiList/PetRegAPIList";
import { contextVar } from "../../../Components/Context/Context";
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

function PetRegDocUploadModal(props) {
    const [errorMessage, setErrorMessage] = useState()
    // Modal.setAppElement('#yourAppElement');
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [docType, setDocType] = useState()
    const [ownerId, setOwnerId] = useState()
    const [docPath, setDocPath] = useState()
    const [isUploading, setIsUploading] = useState(false)


    const { notify } = useContext(contextVar)

    const { api_PetRegUploadDocument, header1 } = PetRegAPIList();

    const data = props?.payloadData;

    console.log("Props Data in Doc upload modal..", data)

    useEffect(() => {
        setIsOpen(true);
    }, []);

    function afterOpenModal() { }

    function closeModal() {
        setIsOpen(false);
        setDocType()
        setDocPath()
        props.close(false);
    }


    const docUpload = (e) => {
        e.preventDefault();

        if (docType == undefined || docType == "" || docPath == undefined || docPath == "") {
            return setErrorMessage("Please Select Correct File and Type")
        }

        //Check Extension
        const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf'];
        const fileExtension = docPath?.name?.split('.').pop().toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
            setErrorMessage("Invalid file extension")
            return;
        }

        let formData = new FormData();

        formData.append('applicationId', props?.applicationId);
        formData.append('docCategory', props?.payloadData?.docName);
        formData.append('document', docPath);  //doucment master id
        formData.append('docCode', docType);            //Btn name
        // formData.append('docMstrId', docType);            //Btn name
        // formData.append('docRefName', props?.payloadData?.docName);            //File information
        // formData.append('ownerId', props?.payloadData?.ownerId);   //ownerID


        console.log("Form Data Payload", formData);
        setIsUploading(true)
        AxiosInterceptors.post(api_PetRegUploadDocument, formData, header1)
            .then((res) => {
                if (res.data.status == true) {
                    notify('Document Uploaded Successfully', 'success')
                    console.log("Data Uploaded", res)
                    setIsUploading(false)
                    closeModal()
                    props.refetch()
                } else {
                    setIsUploading(false)
                    notify('Failed to Upload Document', 'error')
                    setErrorMessage("Failed to upload file. Please Select Proper File.")
                }
            })
            .catch((err) => {
                setIsUploading(false)
                notify('Something went wrong', 'error')
                setErrorMessage("Failed to upload file. Please Select Proper File.")
                console.log("Expection...", err)
            })


    };



    return (
        <div className="">
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <form encType="multipart/form" onSubmit={docUpload} >
                    <div className="bg-indigo-200 shadow-2xl border border-sky-200 p-2 rounded-md">
                        <div className="my-2 mx-3">
                            <div onClick={closeModal} className="float-right cursor-pointer hover:bg-gray-300 rounded-sm p-1"> <GrClose /></div>
                            <h1 className="font-semibold md:text-xl text-sm text-gray-700">Upload Document
                                {/* {props?.payloadData?.docName?.replace(/_/g, ' ')} */}
                            </h1>
                        </div>

                        <div className="md:inline-block min-w-full overflow-hidden hidden p-4">
                            <table className="min-w-full leading-normal border">
                                <thead className='bg-sky-100'>
                                    <tr className='font-semibold '>
                                        <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm uppercase">
                                            #
                                        </th>
                                        <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm uppercase">
                                            Document Name
                                        </th>
                                        <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm uppercase">
                                            Document Type
                                        </th>

                                        <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm uppercase">
                                            Upload
                                        </th>
                                        <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm uppercase">
                                            Submit
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        <tr>
                                            <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {1}
                                                </p>
                                            </td>

                                            <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap capitalize">
                                                    {data?.docName?.replace(/_/g, ' ')}
                                                </p>
                                            </td>
                                            <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {/* <select onChange={(e) => setDocType(e.target.selectedOptions[0].text)} className=' outline-blue-600 border border-gray-400 w-40'> */}
                                                    <select onChange={(e) => setDocType(e.target.value)} className=' outline-blue-600 border border-gray-400 w-40'>
                                                        <option>Select Document</option>
                                                        {
                                                            data?.masters?.map((item) => (
                                                                <option value={item.documentCode}>{item.docVal}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </p>
                                            </td>

                                            <td className="px-5 border-b border-gray-200 bg-white text-sm">
                                                <span className="relative inline-block ">
                                                    <span aria-hidden="true" className="absolute inset-0 "></span>
                                                    <span className="relative ">
                                                        <input
                                                            disabled={isUploading}
                                                            name="docPath"
                                                            type="file"
                                                            style={{ display: 'none' }}
                                                            id="contained-button-file"
                                                            onChange={(e) => setDocPath(e.target.files[0])}
                                                        />
                                                        <label className={` ${isUploading ? 'cursor-wait hover:rounded-none' : 'cursor-pointer rounded-sm hover:rounded-md hover:shadow-2xl hover:bg-blue-600 hover:ring-1 hover:ring-blue-800'} bg-blue-500  shadow-lg flex pl-4 pr-5 py-2  text-white font-medium`} htmlFor="contained-button-file"><FiUpload size={16} className='mt-0 ml-0 mr-2 font-medium' />Browse File</label>

                                                    </span>
                                                </span>
                                            </td>
                                            <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                                {isUploading ? <img className="h-8" src={uploadImg} alt="Uploading" /> :
                                                    <button disabled={isUploading} type="submit" className="border disabled:bg-green-300 disabled:text-gray-500 bg-green-600 rounded-md text-white px-4 py-2">Submit</button>
                                                }
                                            </td>
                                        </tr>
                                    }

                                </tbody>
                            </table>

                            <div className='my-2 flex justify-center font-semibold text-red-600 relative'>
                                <p className="absolute">
                                    {errorMessage }
                                </p>
                            </div>

                        </div>



                    </div>
                </form>
            </Modal>
        </div>
    );
}

// ReactDOM.render(<App />, appElement);

export default PetRegDocUploadModal;
